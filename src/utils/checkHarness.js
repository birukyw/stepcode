// Wraps learner code with a Python test harness for module projects.
// Project checks are plain Python using: ns (learner's namespace), out (captured stdout),
// check(name, condition, hint), close(a, b, tol) and run_with_inputs([...]) -> stdout.
// Set interactive=true for projects that call input(); the first run is then skipped.

export function buildCheckScript(userCode, checks, { interactive = false } = {}) {
  const src = JSON.stringify(userCode);
  return `import io, sys, builtins, contextlib, traceback

_src = ${src}
_results = []

def check(name, cond, hint=""):
    ok = bool(cond)
    _results.append((name, ok, hint))
    print(("PASS  " if ok else "FAIL  ") + name + ("" if ok or not hint else "  (" + hint + ")"), flush=True)

def close(a, b, tol=0.01):
    try:
        return abs(a - b) <= tol
    except Exception:
        return False

def run_with_inputs(values):
    it = iter(values)
    real = builtins.input
    def fake(prompt=""):
        print(prompt, end="")
        return next(it)
    builtins.input = fake
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(compile(_src, "main.py", "exec"), {"__name__": "__main__"})
    except StopIteration:
        buf.write("\\n[program asked for more input than expected]")
    except BaseException:
        buf.write("\\n" + traceback.format_exc())
    finally:
        builtins.input = real
    return buf.getvalue()

ns = {"__name__": "__main__"}
out = ""
if not ${interactive ? 'True' : 'False'}:
    _buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(_buf):
            exec(compile(_src, "main.py", "exec"), ns)
    except BaseException:
        print(_buf.getvalue(), end="")
        traceback.print_exc()
        print("\\nYour code raised an error, so the checks did not run.")
        sys.exit(1)
    out = _buf.getvalue()
    print(out, end="")
    print("\\n--- checks ---")
else:
    print("--- checks ---")

${checks}

_failed = [r for r in _results if not r[1]]
print("ALL CHECKS PASSED" if not _failed else str(len(_failed)) + " of " + str(len(_results)) + " checks failed")
`;
}
