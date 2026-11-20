import b from './project.md?raw';

export default {
  moduleId: 'm3-5',
  project: {
    title: 'Taskforge',
    body: b,
    starter: {
      python: `import argparse
import asyncio
import json
import logging
import os
import sqlite3
import tempfile
import time


class TaskforgeError(Exception):
    pass


class JobNotFound(TaskforgeError):
    pass


class InvalidJob(TaskforgeError):
    pass


def atomic_write(path, text):
    pass


class JobStore:
    def __init__(self, path=":memory:", clock=None):
        pass

    def add(self, name, payload=None, *, priority=0, max_attempts=3, run_at=0, key=None):
        pass

    def get(self, job_id):
        pass

    def claim_next(self, now):
        pass

    def complete(self, job_id, result=None):
        pass

    def fail(self, job_id, error, retry_delay, now, permanent=False):
        pass

    def counts(self):
        pass

    def unfinished(self):
        pass

    def recover(self):
        pass

    def jobs(self, status=None):
        pass

    def export_jobs(self, path):
        pass

    def close(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()
        return False


class FakeClock:
    def __init__(self, start=0.0):
        pass

    def __call__(self):
        pass

    def advance(self, seconds):
        pass

    async def sleep(self, seconds):
        pass


class Engine:
    def __init__(self, store, handlers, *, concurrency=2, clock=None, sleep=None,
                 timeout=None, base_delay=1.0, poll=0.05, logger=None):
        pass

    async def run(self):
        pass


def make_json_logger(name, stream, level="INFO"):
    pass


def parse_args(argv):
    pass


def main(argv, store, out):
    pass
`,
      java: 'public class Main {\n    public static void main(String[] args) {\n        // Checks run on Python. Try the same engine in Java if you like.\n    }\n}\n',
    },
    checks: `import asyncio, io, json, logging, os, tempfile, time

def attempt(fn, default="<error>"):
    try:
        return fn()
    except Exception:
        return default

def raises(fn, kind=Exception):
    try:
        fn()
        return False
    except kind:
        return True
    except Exception:
        return False

async def aattempt(make, default="<error>"):
    try:
        return await make()
    except Exception as e:
        return default

_quiet = logging.getLogger("taskforge-quiet")
_quiet.addHandler(logging.NullHandler())
_quiet.propagate = False

class _Clock:
    def __init__(self, start=0.0):
        self.now = start
    def __call__(self):
        return self.now
    async def sleep(self, seconds):
        self.now += seconds
        await asyncio.sleep(0)

TE, JNF, IJ = ns.get("TaskforgeError"), ns.get("JobNotFound"), ns.get("InvalidJob")
check("Error hierarchy", all(isinstance(c, type) for c in (TE, JNF, IJ)) and issubclass(TE, Exception) and issubclass(JNF, TE) and issubclass(IJ, TE), "TaskforgeError(Exception), with JobNotFound and InvalidJob deriving from it")

tmp = tempfile.mkdtemp()
aw = ns.get("atomic_write")
target = os.path.join(tmp, "data.txt")
if callable(aw):
    attempt(lambda: aw(target, "first"))
    attempt(lambda: aw(target, "second"))
    ok1 = os.path.exists(target) and open(target).read() == "second"
    failed = raises(lambda: aw(target, 12345))
    check("atomic_write writes and replaces files", ok1, "temp file in the same folder, then os.replace")
    check("atomic_write keeps the old file when the write fails and leaves no temp files", failed and open(target).read() == "second" and [n for n in os.listdir(tmp) if n != "data.txt"] == [], "clean up the temp file in the failure path")
else:
    check("atomic_write", False, "define atomic_write(path, text)")

ST = ns.get("JobStore")
if isinstance(ST, type):
    def fresh(clock=None):
        return ST(":memory:", clock) if clock else ST()
    def add_get():
        c = _Clock(100.0)
        s = fresh(c)
        i = s.add("email", {"to": "a@b.c", "n": [1, 2]}, priority=2, max_attempts=5, key="k1")
        j = s.get(i)
        keys = ("id", "key", "name", "payload", "status", "priority", "attempts", "max_attempts", "run_at", "result", "error", "created_at", "updated_at")
        want = {"id": 1, "key": "k1", "name": "email", "payload": {"to": "a@b.c", "n": [1, 2]}, "status": "pending", "priority": 2, "attempts": 0, "max_attempts": 5, "run_at": 0, "result": None, "error": None, "created_at": 100.0, "updated_at": 100.0}
        return i, {k: j[k] for k in keys} == want
    check("JobStore.add and get", attempt(add_get) == (1, True), "INSERT with parameters, then SELECT and decode the JSON columns")
    def defaults():
        s = fresh()
        a = s.add("x")
        b = s.add("y", None)
        j = s.get(a)
        return (a, b, j["payload"], j["priority"], j["max_attempts"], j["status"], j["key"])
    check("JobStore.add defaults and ids", attempt(defaults) == (1, 2, None, 0, 3, "pending", None), "payload defaults to None, priority 0, max_attempts 3")
    def bad_adds():
        s = fresh()
        out = []
        cases = [dict(name=""), dict(name="  "), dict(name=5), dict(name="a", priority=1.5), dict(name="a", priority=True), dict(name="a", max_attempts=0), dict(name="a", max_attempts=True), dict(name="a", payload={1, 2})]
        for kw in cases:
            name = kw.pop("name")
            try:
                s.add(name, **{k: v for k, v in kw.items() if k != "payload"}, **({"payload": kw["payload"]} if "payload" in kw else {}))
                out.append("accepted")
            except IJ:
                out.append("InvalidJob")
            except Exception as e:
                out.append(type(e).__name__)
        return out, len(s.jobs())
    check("JobStore.add validates", attempt(bad_adds) == (["InvalidJob"] * 8, 0), "raise InvalidJob for bad names, non-integer or boolean numbers, max_attempts < 1 and payloads that are not JSON")
    check("JobStore.get unknown id", raises(lambda: fresh().get(99), JNF), "raise JobNotFound")
    def idem():
        s = fresh()
        a = s.add("welcome", {"n": 1}, key="w1")
        b = s.add("welcome", {"n": 2}, key="w1")
        c = s.add("other", key="o1")
        return a, b, c, len(s.jobs()), s.get(a)["payload"]
    check("JobStore.add with a key is idempotent", attempt(idem) == (1, 1, 2, 2, {"n": 1}), "return the existing id for a known key and add nothing")
    def claim_order():
        s = fresh()
        s.add("low")
        s.add("high1", priority=5)
        s.add("high2", priority=5)
        s.add("mid", priority=2)
        s.add("later", priority=9, run_at=50)
        names = []
        while True:
            j = s.claim_next(10)
            if j is None:
                break
            names.append(j["name"])
        later = s.claim_next(50)["name"]
        return names, later, s.claim_next(1000)
    check("JobStore.claim_next order and run_at", attempt(claim_order) == (["high1", "high2", "mid", "low"], "later", None), "highest priority first, then lowest id, and only jobs with run_at <= now")
    def claim_state():
        s = fresh()
        i = s.add("a")
        j = s.claim_next(0)
        again = s.claim_next(0)
        return j["id"] == i, j["status"], j["attempts"], again, s.get(i)["status"]
    check("JobStore.claim_next marks the job running", attempt(claim_state) == (True, "running", 1, None, "running"), "status running, attempts + 1, and never claim a job twice")
    def complete():
        s = fresh()
        i = s.add("a")
        s.claim_next(0)
        s.complete(i, {"ok": True, "n": [1, 2]})
        j = s.get(i)
        return j["status"], j["result"], j["error"]
    check("JobStore.complete", attempt(complete) == ("done", {"ok": True, "n": [1, 2]}, None), "store the result as JSON and clear the error")
    def complete_errors():
        s = fresh()
        i = s.add("a")
        r1 = raises(lambda: s.complete(i), IJ)
        r2 = raises(lambda: s.complete(99), JNF)
        s.claim_next(0)
        s.complete(i)
        r3 = raises(lambda: s.complete(i), IJ)
        r4 = raises(lambda: s.fail(i, "x", 1, 0), IJ)
        r5 = raises(lambda: s.fail(99, "x", 1, 0), JNF)
        return r1, r2, r3, r4, r5
    check("JobStore.complete and fail only accept running jobs", attempt(complete_errors) == (True,) * 5, "InvalidJob when the job is not running, JobNotFound when it does not exist")
    def fail_flow():
        s = fresh()
        i = s.add("a", max_attempts=2)
        s.claim_next(0)
        st1 = s.fail(i, "boom", 5, 10)
        j1 = s.get(i)
        early = s.claim_next(14)
        s.claim_next(15)
        st2 = s.fail(i, "boom again", 5, 20)
        j2 = s.get(i)
        return st1, (j1["status"], j1["run_at"], j1["error"], j1["attempts"]), early, st2, (j2["status"], j2["error"], j2["attempts"])
    check("JobStore.fail retries then gives up", attempt(fail_flow) == ("pending", ("pending", 15, "boom", 1), None, "failed", ("failed", "boom again", 2)), "pending with run_at = now + retry_delay until attempts reach max_attempts, then failed")
    def fail_perm():
        s = fresh()
        i = s.add("a", max_attempts=5)
        s.claim_next(0)
        return s.fail(i, "fatal", 0, 0, permanent=True), s.get(i)["status"]
    check("JobStore.fail with permanent=True", attempt(fail_perm) == ("failed", "failed"), "skip the retries")
    def counts():
        s = fresh()
        empty = s.counts()
        for n in "abcd":
            s.add(n)
        s.claim_next(0)
        j = s.claim_next(0)
        s.complete(j["id"])
        return empty, s.counts(), s.unfinished()
    check("JobStore.counts and unfinished", attempt(counts) == ({"pending": 0, "running": 0, "done": 0, "failed": 0}, {"pending": 2, "running": 1, "done": 1, "failed": 0}, 3), "always return all four statuses")
    def recover():
        s = fresh()
        for n in "abc":
            s.add(n)
        s.claim_next(0); s.claim_next(0)
        n = s.recover()
        return n, s.counts()["pending"], s.counts()["running"], s.recover()
    check("JobStore.recover", attempt(recover) == (2, 3, 0, 0), "turn running jobs back into pending and return how many")
    def listing():
        s = fresh()
        for n in "abc":
            s.add(n)
        j = s.claim_next(0)
        s.complete(j["id"], 1)
        return [x["name"] for x in s.jobs()], [x["name"] for x in s.jobs("pending")], [x["name"] for x in s.jobs("done")], s.jobs("failed")
    check("JobStore.jobs", attempt(listing) == (["a", "b", "c"], ["b", "c"], ["a"], []), "ordered by id, optionally filtered by status")
    dbfile = os.path.join(tmp, "jobs.db")
    def persist():
        with ST(dbfile) as s:
            i = s.add("keep", {"x": 1}, key="same")
        with ST(dbfile) as s2:
            j = s2.get(i)
            again = s2.add("keep", key="same")
            return j["name"], j["payload"], again, len(s2.jobs())
    check("JobStore persists to a file", attempt(persist) == ("keep", {"x": 1}, 1, 1), "sqlite3.connect(path), commit, and a UNIQUE key column")
    def export():
        s = fresh()
        s.add("b", {"n": 1}); s.add("a")
        path = os.path.join(tmp, "export.json")
        n = s.export_jobs(path)
        data = json.load(open(path))
        return n, [d["name"] for d in data], data[0]["payload"], [f for f in os.listdir(tmp) if f.endswith(".tmp")]
    check("JobStore.export_jobs", attempt(export) == (2, ["b", "a"], {"n": 1}, []), "a JSON list ordered by id, written with atomic_write")
    def injection():
        s = fresh()
        evil = "x'); DROP TABLE jobs;--"
        i = s.add(evil, {"q": evil}, key=evil)
        return s.get(i)["name"] == evil and len(s.jobs()) == 1 and s.counts()["pending"] == 1
    check("JobStore is safe from SQL injection", attempt(injection) is True, "use ? placeholders for every value")
    def ctx():
        with fresh() as s:
            c = s.conn
        try:
            c.execute("select 1")
            return False
        except Exception:
            return True
    check("JobStore works as a context manager", attempt(ctx) is True, "close the connection on exit")
else:
    check("JobStore", False, "define class JobStore")

FC = ns.get("FakeClock")
if isinstance(FC, type):
    c = attempt(lambda: FC())
    check("FakeClock starts and advances", attempt(lambda: (c(), c.advance(2.5), c(), FC(10)(), c.advance(1), c())) == (0.0, None, 2.5, 10, None, 3.5), "a callable with advance(seconds)")
    async def fc_sleep():
        k = FC(5.0)
        await k.sleep(2)
        await k.sleep(0.5)
        return k(), FC()()
    check("FakeClock.sleep advances time without really waiting", await aattempt(fc_sleep) == (7.5, 0.0), "async def sleep(self, seconds): advance, then await asyncio.sleep(0)")
else:
    check("FakeClock", False, "define class FakeClock")

EN = ns.get("Engine")
if isinstance(ST, type) and isinstance(EN, type):
    def mk(handlers, **kw):
        clock = _Clock()
        store = ST(":memory:", clock)
        opts = dict(concurrency=2, clock=clock, sleep=clock.sleep, poll=1, logger=_quiet)
        opts.update(kw)
        return clock, store, EN(store, handlers, **opts)

    async def t_basic():
        async def double(p):
            return p["n"] * 2
        clock, store, eng = mk({"double": double})
        ids = [store.add("double", {"n": i}) for i in range(5)]
        stats = await asyncio.wait_for(eng.run(), 10)
        return stats, [store.get(i)["status"] for i in ids], [store.get(i)["result"] for i in ids], store.counts()["done"], eng.stats
    r = await aattempt(t_basic)
    check("Engine runs every job", r == ({"done": 5, "failed": 0, "retried": 0}, ["done"] * 5, [0, 2, 4, 6, 8], 5, {"done": 5, "failed": 0, "retried": 0}), "workers claim jobs until unfinished() is 0, and run() returns the stats")

    async def t_json_result():
        async def h(p):
            return {"ok": True, "items": [1, 2], "none": None}
        clock, store, eng = mk({"h": h})
        i = store.add("h")
        await asyncio.wait_for(eng.run(), 10)
        return store.get(i)["result"]
    check("Engine stores handler results as JSON", await aattempt(t_json_result) == {"ok": True, "items": [1, 2], "none": None}, "pass the handler's return value to store.complete")

    async def t_empty():
        clock, store, eng = mk({})
        return await asyncio.wait_for(eng.run(), 5)
    check("Engine.run on an empty queue returns at once", await aattempt(t_empty) == {"done": 0, "failed": 0, "retried": 0}, "a worker with nothing to claim and nothing unfinished simply stops")

    async def t_peak(conc):
        state = {"active": 0, "peak": 0}
        async def h(p):
            state["active"] += 1
            state["peak"] = max(state["peak"], state["active"])
            await asyncio.sleep(0.01)
            state["active"] -= 1
        clock, store, eng = mk({"h": h}, concurrency=conc)
        for _ in range(8):
            store.add("h")
        await asyncio.wait_for(eng.run(), 10)
        return state["peak"], store.counts()["done"]
    check("Engine runs jobs concurrently up to the limit", (await aattempt(lambda: t_peak(3))) == (3, 8) and (await aattempt(lambda: t_peak(1))) == (1, 8) and (await aattempt(lambda: t_peak(5)))[0] == 5, "start exactly concurrency workers, and never more")

    async def t_priority():
        order = []
        async def h(p):
            order.append(p)
        clock, store, eng = mk({"h": h}, concurrency=1)
        store.add("h", "low")
        store.add("h", "b", priority=5)
        store.add("h", "c", priority=5)
        store.add("h", "d", priority=1)
        await asyncio.wait_for(eng.run(), 10)
        return order
    check("Engine respects priorities", await aattempt(t_priority) == ["b", "c", "d", "low"], "claim_next already orders by priority")

    async def t_retry():
        times = []
        async def flaky(p):
            times.append(clock())
            if len(times) < 3:
                raise ConnectionError("down " + str(len(times)))
            return "ok"
        clock, store, eng = mk({"flaky": flaky}, concurrency=1, base_delay=2)
        i = store.add("flaky", max_attempts=3)
        stats = await asyncio.wait_for(eng.run(), 10)
        j = store.get(i)
        return times, stats, (j["status"], j["attempts"], j["result"], j["error"])
    check("Engine retries with exponential backoff", await aattempt(t_retry) == ([0, 2, 6], {"done": 1, "failed": 0, "retried": 2}, ("done", 3, "ok", None)), "retry_delay = base_delay * 2 ** (attempts - 1): the attempts happen at times 0, 2 and 6")

    async def t_giveup():
        async def boom(p):
            raise ValueError("boom")
        clock, store, eng = mk({"boom": boom}, base_delay=1)
        i = store.add("boom", max_attempts=2)
        stats = await asyncio.wait_for(eng.run(), 10)
        j = store.get(i)
        return stats, j["status"], j["attempts"], j["error"]
    check("Engine gives up after max_attempts", await aattempt(t_giveup) == ({"done": 0, "failed": 1, "retried": 1}, "failed", 2, "ValueError: boom"), "the error text is f'{type(err).__name__}: {err}'")

    async def t_nohandler():
        clock, store, eng = mk({})
        i = store.add("mystery", max_attempts=5)
        stats = await asyncio.wait_for(eng.run(), 10)
        j = store.get(i)
        return stats, j["status"], j["attempts"], "mystery" in j["error"]
    check("Engine fails jobs with no handler immediately", await aattempt(t_nohandler) == ({"done": 0, "failed": 1, "retried": 0}, "failed", 1, True), "store.fail(..., permanent=True)")

    async def t_timeout():
        async def slow(p):
            await asyncio.sleep(5)
        clock, store, eng = mk({"slow": slow}, timeout=0.02)
        i = store.add("slow", max_attempts=1)
        stats = await asyncio.wait_for(eng.run(), 10)
        j = store.get(i)
        return stats, j["status"], j["error"].startswith("TimeoutError")
    check("Engine times out slow jobs", await aattempt(t_timeout) == ({"done": 0, "failed": 1, "retried": 0}, "failed", True), "async with asyncio.timeout(self.timeout): around the handler")

    async def t_recover():
        async def h(p):
            return "recovered"
        clock, store, eng = mk({"h": h})
        i = store.add("h")
        store.claim_next(0)
        stats = await asyncio.wait_for(eng.run(), 10)
        j = store.get(i)
        return stats, j["status"], j["attempts"]
    check("Engine recovers jobs left running by a crash", await aattempt(t_recover) == ({"done": 1, "failed": 0, "retried": 0}, "done", 2), "call store.recover() when run() starts")

    async def t_delayed():
        seen = []
        async def h(p):
            seen.append((p, clock()))
        clock, store, eng = mk({"h": h}, concurrency=1)
        store.add("h", "now")
        store.add("h", "later", run_at=3)
        await asyncio.wait_for(eng.run(), 10)
        return seen
    check("Engine waits for delayed jobs", await aattempt(t_delayed) == [("now", 0), ("later", 3)], "when nothing is ready but jobs are unfinished, await sleep(poll) and try again")

    async def t_cancel():
        started = asyncio.Event()
        async def hang(p):
            started.set()
            await asyncio.sleep(10)
        clock, store, eng = mk({"hang": hang}, concurrency=1)
        i = store.add("hang")
        task = asyncio.create_task(eng.run())
        await asyncio.wait_for(started.wait(), 5)
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass
        return store.get(i)["status"]
    check("Cancelling the engine leaves the job running", await aattempt(t_cancel) == "running", "catch Exception, not BaseException, so cancellation passes through untouched")

    async def t_logs():
        records = []
        class Grab(logging.Handler):
            def emit(self, record):
                records.append((record.levelname, record.getMessage(), dict(getattr(record, "fields", {}))))
        lg = logging.getLogger("taskforge-check")
        lg.handlers.clear()
        lg.addHandler(Grab())
        lg.setLevel(logging.DEBUG)
        lg.propagate = False
        calls = {"n": 0}
        async def ok(p):
            return 1
        async def flaky(p):
            calls["n"] += 1
            if calls["n"] == 1:
                raise ValueError("once")
        async def bad(p):
            raise KeyError("bad")
        clock, store, eng = mk({"ok": ok, "flaky": flaky, "bad": bad}, concurrency=1, logger=lg)
        a = store.add("ok"); b = store.add("flaky"); c = store.add("bad", max_attempts=1)
        await asyncio.wait_for(eng.run(), 10)
        return sorted(records, key=lambda r: (r[1], r[2]["job_id"])), (a, b, c)
    r = await aattempt(t_logs)
    want = [("INFO", "job done", {"job_id": 1, "name": "ok"}), ("INFO", "job done", {"job_id": 2, "name": "flaky"}), ("ERROR", "job failed", {"job_id": 3, "name": "bad", "error": "KeyError: 'bad'"}), ("WARNING", "job retry", {"job_id": 2, "name": "flaky", "attempt": 1})]
    check("Engine logs structured events", r != "<error>" and sorted(r[0], key=lambda x: (x[1], x[2]["job_id"])) == sorted(want, key=lambda x: (x[1], x[2]["job_id"])), "logger.info('job done', extra={'fields': {...}}), warning for 'job retry', error for 'job failed'")

    async def t_many():
        async def h(p):
            return p
        clock, store, eng = mk({"h": h}, concurrency=5)
        for i in range(300):
            store.add("h", i)
        start = time.perf_counter()
        stats = await asyncio.wait_for(eng.run(), 30)
        return stats["done"], time.perf_counter() - start < 5
    check("Engine handles 300 jobs", await aattempt(t_many) == (300, True), "keep claim_next and complete efficient: one transaction each")
else:
    check("Engine", False, "define JobStore and Engine")

mjl = ns.get("make_json_logger")
if callable(mjl):
    def jl():
        s = io.StringIO()
        lg = mjl("tf.json.check", s, "INFO")
        lg.debug("hidden")
        lg.info("started")
        lg.warning("slow", extra={"fields": {"job_id": 7, "ms": 12}})
        lg2 = mjl("tf.json.check", s, "INFO")
        lg2.error("once")
        lines = s.getvalue().splitlines()
        return [json.loads(l) for l in lines], lg.propagate
    check("make_json_logger writes JSON lines", attempt(jl) == ([{"level": "INFO", "logger": "tf.json.check", "message": "started"}, {"job_id": 7, "level": "WARNING", "logger": "tf.json.check", "message": "slow", "ms": 12}, {"level": "ERROR", "logger": "tf.json.check", "message": "once"}], False), "a Formatter that json.dumps a dict with level, logger, message and the fields. Clear old handlers and set propagate = False")
    def jl_sorted():
        s = io.StringIO()
        lg = mjl("tf.json.sorted", s)
        lg.info("m", extra={"fields": {"z": 1, "a": 2}})
        return s.getvalue().strip()
    check("make_json_logger sorts keys", attempt(jl_sorted) == '{"a": 2, "level": "INFO", "logger": "tf.json.sorted", "message": "m", "z": 1}', "json.dumps(data, sort_keys=True)")
else:
    check("make_json_logger", False, "define make_json_logger")

pa, mn = ns.get("parse_args"), ns.get("main")
if callable(pa):
    cases = [
        (["add", "email", "--payload", '{"to": "a@b.c"}', "--priority", "2", "--max-attempts", "5", "--key", "welcome-1"], {"command": "add", "name": "email", "payload": {"to": "a@b.c"}, "priority": 2, "max_attempts": 5, "key": "welcome-1"}),
        (["add", "ping"], {"command": "add", "name": "ping", "payload": None, "priority": 0, "max_attempts": 3, "key": None}),
        (["status"], {"command": "status"}),
        (["list"], {"command": "list", "status": None}),
        (["list", "--status", "done"], {"command": "list", "status": "done"}),
        (["show", "7"], {"command": "show", "id": 7}),
    ]
    check("parse_args", all(attempt(lambda a=a: pa(a)) == want for a, want in cases), "argparse subparsers with dest='command', and --max-attempts stored as max_attempts")
    import contextlib as _cl
    def exits(argv):
        with _cl.redirect_stderr(io.StringIO()):
            try:
                pa(argv)
                return False
            except SystemExit:
                return True
    check("parse_args rejects bad input", exits([]) and exits(["explode"]) and exits(["add", "x", "--payload", "{nope"]) and exits(["list", "--status", "sleeping"]) and exits(["show", "abc"]) and exits(["add"]), "argparse exits on a missing command, bad JSON, an unknown status or a non-number id")
else:
    check("parse_args", False, "define parse_args")
if callable(mn) and isinstance(ST, type):
    def cli():
        store = ST()
        out = io.StringIO()
        codes = []
        codes.append(mn(["add", "email", "--key", "k"], store, out))
        codes.append(mn(["add", "email", "--key", "k"], store, out))
        codes.append(mn(["add", "report", "--payload", '{"n": 1}'], store, out))
        store.claim_next(0)
        codes.append(mn(["status"], store, out))
        codes.append(mn(["list"], store, out))
        codes.append(mn(["list", "--status", "pending"], store, out))
        codes.append(mn(["show", "2"], store, out))
        return codes, out.getvalue().splitlines()
    r = attempt(cli)
    lines = r[1] if r != "<error>" else []
    check("main prints results and returns 0", r != "<error>" and r[0] == [0] * 7 and lines[:10] == ["added job 1", "duplicate of job 1", "added job 2", "pending: 1", "running: 1", "done: 0", "failed: 0", "1 email running", "2 report pending", "2 report pending"], "added job N / duplicate of job N, four status lines in order, and '<id> <name> <status>' per job")
    check("main show prints the job as JSON", r != "<error>" and len(lines) == 11 and json.loads(lines[10])["name"] == "report" and json.loads(lines[10])["payload"] == {"n": 1} and lines[10] == json.dumps(json.loads(lines[10]), sort_keys=True), "print(json.dumps(job, sort_keys=True), file=out)")
    def cli_errors():
        store = ST()
        out = io.StringIO()
        a = mn(["show", "99"], store, out)
        b = mn(["add", "  "], store, out)
        return a, b, [l.startswith("error: ") for l in out.getvalue().splitlines()]
    check("main reports errors with exit code 1", attempt(cli_errors) == (1, 1, [True, True]), "catch TaskforgeError, print 'error: <message>' and return 1")
else:
    check("main", False, "define main(argv, store, out)")`,
  },
};
