/* Runs learner Python in a Web Worker with Pyodide (Python compiled to WebAssembly).
   Output is streamed back as it is written, so a stuck program still shows what it printed. */
const VERSION = 'v0.26.4';
importScripts(`https://cdn.jsdelivr.net/pyodide/${VERSION}/full/pyodide.js`);

const WRAPPER = `
import sys, traceback, builtins

def _stepcode_run(src):
    g = {"__name__": "__main__", "__builtins__": builtins}
    try:
        code = compile(src, "main.py", "exec")
    except SyntaxError as e:
        traceback.print_exception(type(e), e, None)
        return
    try:
        exec(code, g)
    except SystemExit:
        pass
    except BaseException as e:
        traceback.print_exception(type(e), e, e.__traceback__.tb_next)
`;

// Programs that use asyncio run on the page's own event loop. asyncio.run() cannot start a second loop
// inside the browser, so a top-level asyncio.run(x) becomes "await x", which the loop can do.
const ASYNC_WRAPPER = `
import ast, asyncio, inspect

class _TopLevelRun(ast.NodeTransformer):
    def visit_FunctionDef(self, node):
        return node
    visit_AsyncFunctionDef = visit_FunctionDef
    visit_Lambda = visit_FunctionDef
    visit_ClassDef = visit_FunctionDef

    def visit_Call(self, node):
        self.generic_visit(node)
        f = node.func
        if isinstance(f, ast.Attribute) and f.attr == "run" and isinstance(f.value, ast.Name) and f.value.id == "asyncio" and len(node.args) == 1 and not node.keywords:
            return ast.copy_location(ast.Await(value=node.args[0]), node)
        return node

async def _stepcode_run_async(src):
    g = {"__name__": "__main__", "__builtins__": builtins}
    try:
        tree = ast.parse(src, "main.py")
        tree = ast.fix_missing_locations(_TopLevelRun().visit(tree))
        code = compile(tree, "main.py", "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    except SyntaxError as e:
        traceback.print_exception(type(e), e, None)
        return
    try:
        result = eval(code, g)
        if inspect.iscoroutine(result):
            await result
    except SystemExit:
        pass
    except BaseException as e:
        tb = e.__traceback__
        traceback.print_exception(type(e), e, tb.tb_next if tb else None)
`;

let pyodide = null;
let current = null; // { id, bytes }
const MAX_BYTES = 64 * 1024;
const decoder = new TextDecoder();

function emit(buf) {
  if (!current) return buf.length;
  if (current.bytes >= MAX_BYTES) return buf.length;
  const text = decoder.decode(buf, { stream: true });
  current.bytes += buf.length;
  postMessage({ type: 'out', id: current.id, text: current.bytes >= MAX_BYTES ? text + '\n[Output cut off]' : text });
  return buf.length;
}

const ready = (async () => {
  pyodide = await loadPyodide({ indexURL: `https://cdn.jsdelivr.net/pyodide/${VERSION}/full/` });
  pyodide.setStdout({ write: emit });
  pyodide.setStderr({ write: emit });
  await pyodide.runPythonAsync(WRAPPER);
  await pyodide.runPythonAsync(ASYNC_WRAPPER);
  postMessage({ type: 'ready' });
})().catch((err) => postMessage({ type: 'fatal', message: String(err && err.message ? err.message : err) }));

onmessage = async (e) => {
  const { id, code, stdin } = e.data;
  await ready;
  if (!pyodide) return;
  current = { id, bytes: 0 };
  const lines = (stdin || '').split('\n');
  if (lines.length && lines[lines.length - 1] === '') lines.pop();
  pyodide.setStdin({ stdin: () => (lines.length ? lines.shift() : undefined) });
  try {
    try { await pyodide.loadPackagesFromImports(code); } catch (err) { /* packages are optional */ }
    postMessage({ type: 'running', id });
    if (/\basyncio\b/.test(code)) {
      await pyodide.globals.get('_stepcode_run_async')(code);
    } else {
      pyodide.globals.get('_stepcode_run')(code);
    }
  } catch (err) {
    emit(new TextEncoder().encode('\n' + String(err && err.message ? err.message : err) + '\n'));
  }
  current = null;
  postMessage({ type: 'done', id });
};
