# Final Project: Taskforge

Welcome to the Track 3 finale. You are going to build **Taskforge**, the heart of a **background job system**: the kind of machinery behind every "we will email you the report", every video upload, every nightly import. A website adds a job to a **queue** and moves on. **Workers** pick jobs up, run them concurrently, retry the ones that fail, and record what happened, and all of it must **survive a crash**.

It is the hardest project in the course so far, and it uses nearly everything from Track 3: an **exception hierarchy** (3.3.1), **atomic file writes** (3.3.3), **SQLite persistence** with transactions and safe queries (3.3.4), **structured logging** and a **command-line tool** (3.3.5), **asyncio workers** with timeouts and cancellation (3.4.4 and 3.4.5), **dependency injection of the clock** so everything can be tested without waiting (3.5.3), and a design that you can unit test end to end (3.5.2).

> **Important:** The checks run your `async` code for you, so **do not call `asyncio.run(...)` at the top level of your file**. Define things, and let the checks drive them. Also keep everything **deterministic**: always take the time from the injected clock, never from `time.time()` directly inside the engine.

## The pieces

### 1. Errors

`TaskforgeError(Exception)` is the base class. `JobNotFound` and `InvalidJob` both derive from it.

### 2. `atomic_write(path, text)`

Write `text` to `path` so that a failure cannot leave a half-written file: write a temporary file in the **same folder**, then `os.replace` it over the target. If anything fails, the original file stays untouched and no temporary file is left behind.

### 3. `class JobStore(path=":memory:", clock=None)`

A **SQLite** job table. `clock` is a function returning the current time in seconds (default `time.time`), used for the `created_at` and `updated_at` fields. A job is a dictionary with these keys: `id`, `key`, `name`, `payload` (decoded JSON), `status`, `priority`, `attempts`, `max_attempts`, `run_at`, `result` (decoded JSON or `None`), `error` (text or `None`), `created_at`, `updated_at`.

A job's `status` is one of `"pending"`, `"running"`, `"done"` or `"failed"`.

- **`add(name, payload=None, *, priority=0, max_attempts=3, run_at=0, key=None)`** inserts a **pending** job and returns its id (ids start at 1). It raises `InvalidJob` if `name` is not a non-empty string, if `priority` or `max_attempts` is not an integer (a `bool` is not accepted) or `max_attempts` is below 1, or if `payload` cannot be turned into JSON. If a `key` is given and a job with that key already exists, **return the existing job's id and add nothing** (an *idempotent* enqueue).
- **`get(job_id)`** returns the job dictionary, or raises `JobNotFound`.
- **`claim_next(now)`** finds the pending job with the **highest priority** (ties: lowest id) whose `run_at` is **at most** `now`, marks it `"running"`, **adds 1 to its attempts**, and returns the updated job. If nothing is ready, return `None`. A job must never be claimed twice.
- **`complete(job_id, result=None)`** marks a **running** job `"done"` and stores its result (as JSON) and clears its error. Unknown id: `JobNotFound`. A job that is not running: `InvalidJob`.
- **`fail(job_id, error, retry_delay, now, permanent=False)`** records a failure of a **running** job (same two errors as `complete`) and stores the `error` text. If `permanent` is true, or the job has used up its `max_attempts`, the status becomes `"failed"`. Otherwise it goes back to `"pending"` with `run_at = now + retry_delay`. Return the new status.
- **`counts()`** returns a dictionary with the four statuses as keys (always all four, `0` when empty).
- **`unfinished()`** returns how many jobs are pending or running.
- **`recover()`** puts every `"running"` job back to `"pending"` (they were left behind by a crash), and returns how many it recovered.
- **`jobs(status=None)`** returns the list of jobs ordered by id, optionally only those with a given status.
- **`export_jobs(path)`** writes all jobs as JSON (a list, sorted keys, indented) with `atomic_write`, and returns how many it wrote.
- It works as a context manager that closes the connection. A store opened on a **file** path keeps its jobs when it is reopened. **Every value goes into SQL as a parameter**, so a job named `x'); DROP TABLE jobs;--` is just a name.

### 4. `class FakeClock(start=0.0)`

A controllable clock for tests. Calling it returns the current time. `advance(seconds)` moves time forward. `async sleep(seconds)` advances the time by `seconds` **and** then yields control to the event loop (`await asyncio.sleep(0)`). Separate clocks must not share state.

### 5. `class Engine(store, handlers, *, concurrency=2, clock=None, sleep=None, timeout=None, base_delay=1.0, poll=0.05, logger=None)`

The worker pool. `handlers` maps a job name to an **async function** that takes the payload and returns a JSON-friendly result. `clock` returns the time (default `time.time`) and `sleep` is an async function (default `asyncio.sleep`). `logger` defaults to `logging.getLogger("taskforge")`.

**`async run()`** processes jobs until there is nothing left to do, then returns a dictionary `{"done": n, "failed": n, "retried": n}` for this run (also kept in `engine.stats`). It works like this:

- First it calls `store.recover()`, because jobs found **running** at start were left behind by a crash.
- It starts `concurrency` **worker tasks inside an `asyncio.TaskGroup`**. Each worker repeats: claim a job with `store.claim_next(clock())`. If there is none: if `store.unfinished()` is `0`, the worker finishes, otherwise it `await sleep(poll)` and tries again.
- To process a job it looks up the handler by name and awaits it with the job's payload, inside `asyncio.timeout(timeout)` when a `timeout` is set.
- **Success:** `store.complete(id, result)` and count it as `done`.
- **No handler for that name:** `store.fail(..., permanent=True)` on the first attempt, count it as `failed`.
- **Any `Exception` from the handler** (including a timeout): record `f"{type(err).__name__}: {err}"` with `store.fail`, using `retry_delay = base_delay * 2 ** (attempts - 1)` where `attempts` is the job's attempt count after claiming. If it became `"pending"` count a `retried`, if it became `"failed"` count a `failed`.
- If the whole run is **cancelled**, running jobs are simply left as `"running"` for the next `recover()`.
- It must never run more than `concurrency` handlers at the same time.

**Logging.** Use `extra={"fields": {...}}` so the structured logger of piece 6 can print the fields. Log `"job done"` at INFO with `{"job_id": id, "name": name}`, `"job retry"` at WARNING with `{"job_id": id, "name": name, "attempt": n}`, and `"job failed"` at ERROR with `{"job_id": id, "name": name, "error": text}`.

### 6. `make_json_logger(name, stream, level="INFO")`

Returns a logger that writes **one JSON object per line** to `stream` with the keys `level`, `logger` and `message`, plus every entry of the record's `fields` dictionary when it has one. Keys are sorted. Messages below `level` are dropped, it must **not** pass records to the root logger, and calling it twice for the same name must not duplicate output.

### 7. The command line: `parse_args(argv)` and `main(argv, store, out)`

`parse_args` uses `argparse` and returns a dictionary:

- `["add", "email", "--payload", '{"to": "a@b.c"}', "--priority", "2", "--max-attempts", "5", "--key", "welcome-1"]` gives `{"command": "add", "name": "email", "payload": {"to": "a@b.c"}, "priority": 2, "max_attempts": 5, "key": "welcome-1"}`. The defaults are payload `None`, priority `0`, max attempts `3`, key `None`. A payload that is not valid JSON makes the parser exit (`SystemExit`).
- `["status"]` gives `{"command": "status"}`.
- `["list"]` gives `{"command": "list", "status": None}`, and `["list", "--status", "done"]` sets it (choices: the four statuses).
- `["show", "7"]` gives `{"command": "show", "id": 7}`.

`main(argv, store, out)` runs a command against the store, prints to the text stream `out`, and returns an **exit code** (`0` for success):

- `add` prints `added job N`. If a `key` matched an existing job, it prints `duplicate of job N` instead.
- `status` prints four lines, in this order: `pending: n`, `running: n`, `done: n`, `failed: n`.
- `list` prints one line per job: `<id> <name> <status>`.
- `show` prints the job as JSON (`json.dumps(job, sort_keys=True)`).
- A missing job, or an invalid one, prints `error: <message>` and returns `1`. Parsing problems are left to `argparse` (they raise `SystemExit`).

> **Tip:** Build and test in this order: errors, then `JobStore` (everything else stands on it), then `FakeClock`, then `Engine`, then logging, then the CLI. Each piece is independent, so you can pass its checks before moving on.

> **Watch out:** `JobStore` runs on a single connection that several coroutines share. Because `asyncio` switches tasks only at `await`, and your store methods are plain synchronous calls, they never interleave. That is a real benefit of cooperative scheduling.

## Stretch goals

- Add a `schedule_in(seconds)` helper, so `add(..., run_at=clock() + seconds)` is one call.
- Add `retry(job_id)` to the store and the CLI for jobs that ended `"failed"`.
- Add a **dead-letter** table: jobs that end `"failed"` are copied there with their last error.
- Add a rate limit to the engine with the token bucket from the Concurrency Lab.

## Hints

+++ Store hints
Create the table with `CREATE TABLE IF NOT EXISTS jobs (...)`, with `key TEXT UNIQUE` and a `CHECK (status IN (...))`. Set `conn.row_factory = sqlite3.Row` and convert rows with `dict(row)`, then decode `payload` and `result` with `json.loads`. Wrap every write in `with self.conn:`. `claim_next` is a `SELECT ... ORDER BY priority DESC, id ASC LIMIT 1` followed by an `UPDATE` in the same transaction.
+++

+++ Engine hints
The worker loop is the lesson 3.4.5 queue pattern, with the database as the queue. `attempts` after claiming is already in the job dictionary that `claim_next` returned, so the backoff is `base_delay * 2 ** (job["attempts"] - 1)`. Catch `Exception`, **not** `BaseException`, so cancellation passes through. Use one `async with asyncio.TaskGroup() as group:` and create the workers inside it.
+++

+++ Logging and CLI hints
For `make_json_logger`, a `Formatter` subclass whose `format` builds a dictionary from `record.levelname`, `record.name`, `record.getMessage()` and `getattr(record, "fields", {})`. For the CLI, use `add_subparsers(dest="command", required=True)`, and give `--payload` a `type=` function that calls `json.loads` and raises `argparse.ArgumentTypeError` on bad input.
+++

+++ Full solution
```python
import argparse
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
    folder = os.path.dirname(os.path.abspath(path))
    fd, tmp = tempfile.mkstemp(dir=folder, suffix=".tmp")
    try:
        with os.fdopen(fd, "w") as f:
            f.write(text)
        os.replace(tmp, path)
    except BaseException:
        if os.path.exists(tmp):
            os.remove(tmp)
        raise


STATUSES = ("pending", "running", "done", "failed")


class JobStore:
    def __init__(self, path=":memory:", clock=None):
        self.clock = clock or time.time
        self.conn = sqlite3.connect(path)
        self.conn.row_factory = sqlite3.Row
        with self.conn:
            self.conn.execute(
                "CREATE TABLE IF NOT EXISTS jobs ("
                "id INTEGER PRIMARY KEY AUTOINCREMENT, "
                "key TEXT UNIQUE, "
                "name TEXT NOT NULL, "
                "payload TEXT NOT NULL, "
                "status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'done', 'failed')), "
                "priority INTEGER NOT NULL DEFAULT 0, "
                "attempts INTEGER NOT NULL DEFAULT 0, "
                "max_attempts INTEGER NOT NULL, "
                "run_at REAL NOT NULL DEFAULT 0, "
                "result TEXT, "
                "error TEXT, "
                "created_at REAL, "
                "updated_at REAL)"
            )
            self.conn.execute("CREATE INDEX IF NOT EXISTS idx_jobs_ready ON jobs (status, priority, run_at)")

    @staticmethod
    def _decode(row):
        job = dict(row)
        job["payload"] = json.loads(job["payload"])
        job["result"] = json.loads(job["result"]) if job["result"] is not None else None
        return job

    def add(self, name, payload=None, *, priority=0, max_attempts=3, run_at=0, key=None):
        if not isinstance(name, str) or not name.strip():
            raise InvalidJob("name must be a non-empty string")
        for label, value in (("priority", priority), ("max_attempts", max_attempts)):
            if isinstance(value, bool) or not isinstance(value, int):
                raise InvalidJob(label + " must be an integer")
        if max_attempts < 1:
            raise InvalidJob("max_attempts must be at least 1")
        try:
            text = json.dumps(payload)
        except (TypeError, ValueError):
            raise InvalidJob("payload must be JSON serializable") from None
        now = self.clock()
        with self.conn:
            if key is not None:
                row = self.conn.execute("SELECT id FROM jobs WHERE key = ?", (key,)).fetchone()
                if row:
                    return row["id"]
            cur = self.conn.execute(
                "INSERT INTO jobs (key, name, payload, status, priority, max_attempts, run_at, created_at, updated_at) "
                "VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?)",
                (key, name, text, priority, max_attempts, run_at, now, now),
            )
        return cur.lastrowid

    def get(self, job_id):
        row = self.conn.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        if row is None:
            raise JobNotFound(job_id)
        return self._decode(row)

    def claim_next(self, now):
        with self.conn:
            row = self.conn.execute(
                "SELECT id FROM jobs WHERE status = 'pending' AND run_at <= ? "
                "ORDER BY priority DESC, id ASC LIMIT 1",
                (now,),
            ).fetchone()
            if row is None:
                return None
            self.conn.execute(
                "UPDATE jobs SET status = 'running', attempts = attempts + 1, updated_at = ? WHERE id = ?",
                (self.clock(), row["id"]),
            )
        return self.get(row["id"])

    def _running(self, job_id):
        job = self.get(job_id)
        if job["status"] != "running":
            raise InvalidJob("job " + str(job_id) + " is not running")
        return job

    def complete(self, job_id, result=None):
        self._running(job_id)
        try:
            text = json.dumps(result) if result is not None else None
        except (TypeError, ValueError):
            raise InvalidJob("result must be JSON serializable") from None
        with self.conn:
            self.conn.execute(
                "UPDATE jobs SET status = 'done', result = ?, error = NULL, updated_at = ? WHERE id = ?",
                (text, self.clock(), job_id),
            )

    def fail(self, job_id, error, retry_delay, now, permanent=False):
        job = self._running(job_id)
        if permanent or job["attempts"] >= job["max_attempts"]:
            status, run_at = "failed", job["run_at"]
        else:
            status, run_at = "pending", now + retry_delay
        with self.conn:
            self.conn.execute(
                "UPDATE jobs SET status = ?, run_at = ?, error = ?, updated_at = ? WHERE id = ?",
                (status, run_at, error, self.clock(), job_id),
            )
        return status

    def counts(self):
        found = dict(self.conn.execute("SELECT status, count(*) FROM jobs GROUP BY status").fetchall())
        return {status: found.get(status, 0) for status in STATUSES}

    def unfinished(self):
        return self.conn.execute("SELECT count(*) FROM jobs WHERE status IN ('pending', 'running')").fetchone()[0]

    def recover(self):
        with self.conn:
            cur = self.conn.execute("UPDATE jobs SET status = 'pending' WHERE status = 'running'")
        return cur.rowcount

    def jobs(self, status=None):
        if status is None:
            rows = self.conn.execute("SELECT * FROM jobs ORDER BY id").fetchall()
        else:
            rows = self.conn.execute("SELECT * FROM jobs WHERE status = ? ORDER BY id", (status,)).fetchall()
        return [self._decode(r) for r in rows]

    def export_jobs(self, path):
        data = self.jobs()
        atomic_write(path, json.dumps(data, indent=2, sort_keys=True))
        return len(data)

    def close(self):
        self.conn.close()

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()
        return False


class FakeClock:
    def __init__(self, start=0.0):
        self.now = start

    def __call__(self):
        return self.now

    def advance(self, seconds):
        self.now += seconds

    async def sleep(self, seconds):
        self.now += seconds
        await asyncio.sleep(0)


class Engine:
    def __init__(self, store, handlers, *, concurrency=2, clock=None, sleep=None,
                 timeout=None, base_delay=1.0, poll=0.05, logger=None):
        self.store = store
        self.handlers = handlers
        self.concurrency = concurrency
        self.clock = clock or time.time
        self.sleep = sleep or asyncio.sleep
        self.timeout = timeout
        self.base_delay = base_delay
        self.poll = poll
        self.logger = logger or logging.getLogger("taskforge")
        self.stats = {"done": 0, "failed": 0, "retried": 0}

    async def run(self):
        self.stats = {"done": 0, "failed": 0, "retried": 0}
        self.store.recover()
        async with asyncio.TaskGroup() as group:
            for _ in range(self.concurrency):
                group.create_task(self._worker())
        return dict(self.stats)

    async def _worker(self):
        while True:
            job = self.store.claim_next(self.clock())
            if job is None:
                if self.store.unfinished() == 0:
                    return
                await self.sleep(self.poll)
                continue
            await self._process(job)

    async def _process(self, job):
        fields = {"job_id": job["id"], "name": job["name"]}
        handler = self.handlers.get(job["name"])
        if handler is None:
            text = "no handler for " + repr(job["name"])
            self.store.fail(job["id"], text, 0, self.clock(), permanent=True)
            self.stats["failed"] += 1
            self.logger.error("job failed", extra={"fields": {**fields, "error": text}})
            return
        try:
            if self.timeout is None:
                result = await handler(job["payload"])
            else:
                async with asyncio.timeout(self.timeout):
                    result = await handler(job["payload"])
        except Exception as err:
            text = f"{type(err).__name__}: {err}"
            delay = self.base_delay * 2 ** (job["attempts"] - 1)
            status = self.store.fail(job["id"], text, delay, self.clock())
            if status == "pending":
                self.stats["retried"] += 1
                self.logger.warning("job retry", extra={"fields": {**fields, "attempt": job["attempts"]}})
            else:
                self.stats["failed"] += 1
                self.logger.error("job failed", extra={"fields": {**fields, "error": text}})
        else:
            self.store.complete(job["id"], result)
            self.stats["done"] += 1
            self.logger.info("job done", extra={"fields": fields})


class _JsonFormatter(logging.Formatter):
    def format(self, record):
        data = {"level": record.levelname, "logger": record.name, "message": record.getMessage()}
        data.update(getattr(record, "fields", {}))
        return json.dumps(data, sort_keys=True)


def make_json_logger(name, stream, level="INFO"):
    logger = logging.getLogger(name)
    logger.handlers.clear()
    handler = logging.StreamHandler(stream)
    handler.setFormatter(_JsonFormatter())
    logger.addHandler(handler)
    logger.setLevel(getattr(logging, level))
    logger.propagate = False
    return logger


def _json_arg(text):
    try:
        return json.loads(text)
    except ValueError:
        raise argparse.ArgumentTypeError("not valid JSON: " + text)


def parse_args(argv):
    parser = argparse.ArgumentParser(prog="taskforge")
    sub = parser.add_subparsers(dest="command", required=True)

    add = sub.add_parser("add")
    add.add_argument("name")
    add.add_argument("--payload", type=_json_arg, default=None)
    add.add_argument("--priority", type=int, default=0)
    add.add_argument("--max-attempts", type=int, default=3, dest="max_attempts")
    add.add_argument("--key", default=None)

    sub.add_parser("status")

    listing = sub.add_parser("list")
    listing.add_argument("--status", choices=list(STATUSES), default=None)

    show = sub.add_parser("show")
    show.add_argument("id", type=int)

    args = vars(parser.parse_args(argv))
    return args


def main(argv, store, out):
    args = parse_args(argv)
    command = args["command"]
    try:
        if command == "add":
            before = len(store.jobs())
            job_id = store.add(args["name"], args["payload"], priority=args["priority"],
                               max_attempts=args["max_attempts"], key=args["key"])
            if len(store.jobs()) == before:
                print("duplicate of job " + str(job_id), file=out)
            else:
                print("added job " + str(job_id), file=out)
        elif command == "status":
            for status, count in store.counts().items():
                print(f"{status}: {count}", file=out)
        elif command == "list":
            for job in store.jobs(args["status"]):
                print(job["id"], job["name"], job["status"], file=out)
        else:
            print(json.dumps(store.get(args["id"]), sort_keys=True), file=out)
    except TaskforgeError as err:
        print("error: " + str(err), file=out)
        return 1
    return 0
```
+++
