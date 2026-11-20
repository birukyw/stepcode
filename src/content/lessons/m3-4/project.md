# Project: Concurrency Lab

Real concurrent systems are tested without real threads whenever possible, because real threads are unpredictable. The trick is to build the **logic** of concurrency (scheduling, rate limiting, retries, circuit breaking, chunking, pooling) so that it takes **time and sleeping as inputs**. Then every behaviour can be checked exactly.

You will build nine tools. They are the same ideas as the lessons, shrunk to deterministic pure Python: a cooperative scheduler with virtual time, an interleaver, a token-bucket rate limiter, retries with exponential backoff, a circuit breaker, chunk splitting, a chunked map, and a worker-pool simulator.

## The tools

**1. `round_robin(*generators)`** takes several generators and returns **one list** with their yielded values interleaved: one value from each generator in turn, until all are exhausted. A generator that finishes drops out. `round_robin(iter([1, 2, 3]), iter("ab"))` gives `[1, "a", 2, "b", 3]`.

**2. `class Scheduler`** is a cooperative event loop with **virtual time**.
- `spawn(name, generator)` registers a task.
- A task is a generator. Each time it `yield`s a number, it asks to sleep that many seconds of virtual time.
- `run()` runs everything and returns the log: a list of `(time, name)` pairs, one for **every time a task is resumed** (including its first start at time 0, and the final resume in which it finishes), in the order they happened.
- Always run the task that wakes up soonest. If several wake at the same time, the one that **went to sleep (or was spawned) first** runs first.
- After `run()`, the attribute `now` holds the final virtual time.

**3. `class TokenBucket(rate, capacity, clock)`** is a rate limiter. It starts **full** with `capacity` tokens. Tokens refill at `rate` per second (use the `clock()` function, which returns the current time in seconds), never going above `capacity`. `allow(cost=1)` returns `True` and removes `cost` tokens if enough are available, otherwise `False` (and removes nothing).

**4. `retry_with_backoff(func, attempts, base_delay, sleep)`** calls `func()` and returns its result. If it raises an `Exception`, wait and try again, up to `attempts` calls in total. The wait after the first failure is `base_delay`, then `2 * base_delay`, then `4 * base_delay`, and so on, performed by calling the given `sleep(seconds)` function. **Do not wait after the last failed attempt.** If every attempt fails, raise the **last** exception.

**5. `class CircuitBreaker(failure_threshold, reset_timeout, clock)`** protects a failing dependency. Define `class CircuitOpenError(Exception)`. `call(func)` works like this:
- **closed** (normal): call `func()`. A success resets the failure count to 0. A failure increases it, re-raises the error, and once the count reaches `failure_threshold` the breaker **opens** (remember the time).
- **open**: while less than `reset_timeout` seconds have passed since it opened, raise `CircuitOpenError` **without calling** `func`.
- **half-open**: after `reset_timeout`, allow **one trial** call. Success closes the breaker (failures back to 0). Failure opens it again and restarts the timer, and the error is re-raised.
- The property `state` returns `"closed"`, `"open"` or `"half-open"` according to the clock.

**6. `split_chunks(items, parts)`** splits a list into exactly `parts` consecutive chunks whose sizes differ by at most 1, **larger chunks first**, keeping the order. There may be empty chunks if `parts` is larger than the list. `parts` below 1 raises `ValueError`.

**7. `chunked_map(func, items, workers)`** applies `func` to every item by mapping chunk by chunk (as a process pool would). It returns `(results, chunk_sizes)`: the results in the **original order**, and the list of chunk sizes from `split_chunks`.

**8. `simulate_pool(durations, workers)`** simulates a pool where each task, **in the given order**, is assigned to the worker that becomes free earliest (ties go to the lower worker number). It returns `(makespan, schedule)`: the total time until everything is done, and a list of `(task_index, worker, start, end)` in task order. Tasks start at time 0 for the first `workers` tasks. With no tasks, the makespan is `0`.

**9. `speedup(durations, workers)`** is the total of all durations divided by the makespan from `simulate_pool`, or `1.0` when there are no tasks.

> **Tip:** The scheduler is the lesson-3.4.4 event loop. Keep a heap of `(wake_time, order, name, generator)` entries, where `order` is a counter that increases on every push (this is also what keeps equal times first-come-first-served and stops Python from comparing generators).

> **Watch out:** The checks also run **20,000 tasks** through the scheduler and a pool of **100,000** durations, so use a heap, not a list that you sort again and again.

## Stretch goals

- Let a scheduler task `yield` the string `"done"` to finish early, and add a `Scheduler.cancel(name)`.
- Give `TokenBucket` a `wait_time(cost=1)` method returning how long to wait until the request would be allowed.
- Add jitter (a random extra delay) to `retry_with_backoff`, using an injected random function so tests stay deterministic.

## Hints

+++ Scheduler and interleaving hints
`round_robin`: keep a list of live generators, loop over it, call `next(g, sentinel)`, and drop the ones that return the sentinel. `Scheduler.run`: push `(0, counter, name, gen)` for each spawned task, pop the smallest, record `(time, name)`, call `next(gen)`, and push it back at `time + delay` if it yielded. If it raises `StopIteration`, the task is finished.
+++

+++ Rate limiting, retries and breaker hints
`TokenBucket`: on every call, add `(now - last) * rate` tokens, cap at `capacity`, and set `last = now` before deciding. `retry_with_backoff`: `for attempt in range(attempts)`, and sleep with `base_delay * 2 ** attempt` only if this was not the last attempt. `CircuitBreaker`: store `failures` and `opened_at` (or `None`). The `state` property is `closed` when `opened_at is None`, otherwise `open` or `half-open` depending on the elapsed time.
+++

+++ Chunking and pool hints
`split_chunks`: `size, extra = divmod(len(items), parts)`, then the first `extra` chunks get `size + 1` items. `simulate_pool`: a heap of `(free_time, worker)` for all workers starting at `(0, w)`. Pop the smallest, schedule the task there, and push `(end, worker)` back.
+++

+++ Full solution
```python
import heapq


def round_robin(*generators):
    live = list(generators)
    out = []
    sentinel = object()
    while live:
        still = []
        for gen in live:
            value = next(gen, sentinel)
            if value is not sentinel:
                out.append(value)
                still.append(gen)
        live = still
    return out


class Scheduler:
    def __init__(self):
        self._heap = []
        self._counter = 0
        self.now = 0

    def spawn(self, name, generator):
        heapq.heappush(self._heap, (0, self._counter, name, generator))
        self._counter += 1

    def run(self):
        log = []
        while self._heap:
            when, _, name, gen = heapq.heappop(self._heap)
            self.now = when
            log.append((when, name))
            try:
                delay = next(gen)
            except StopIteration:
                continue
            heapq.heappush(self._heap, (when + delay, self._counter, name, gen))
            self._counter += 1
        return log


class TokenBucket:
    def __init__(self, rate, capacity, clock):
        self.rate = rate
        self.capacity = capacity
        self.clock = clock
        self.tokens = capacity
        self.last = clock()

    def allow(self, cost=1):
        now = self.clock()
        self.tokens = min(self.capacity, self.tokens + (now - self.last) * self.rate)
        self.last = now
        if self.tokens >= cost:
            self.tokens -= cost
            return True
        return False


def retry_with_backoff(func, attempts, base_delay, sleep):
    last = None
    for attempt in range(attempts):
        try:
            return func()
        except Exception as err:
            last = err
            if attempt < attempts - 1:
                sleep(base_delay * 2 ** attempt)
    raise last


class CircuitOpenError(Exception):
    pass


class CircuitBreaker:
    def __init__(self, failure_threshold, reset_timeout, clock):
        self.failure_threshold = failure_threshold
        self.reset_timeout = reset_timeout
        self.clock = clock
        self.failures = 0
        self.opened_at = None

    @property
    def state(self):
        if self.opened_at is None:
            return "closed"
        if self.clock() - self.opened_at >= self.reset_timeout:
            return "half-open"
        return "open"

    def call(self, func):
        state = self.state
        if state == "open":
            raise CircuitOpenError("circuit is open")
        try:
            result = func()
        except Exception:
            self.failures += 1
            if state == "half-open" or self.failures >= self.failure_threshold:
                self.opened_at = self.clock()
            raise
        self.failures = 0
        self.opened_at = None
        return result


def split_chunks(items, parts):
    if parts < 1:
        raise ValueError("parts must be at least 1")
    size, extra = divmod(len(items), parts)
    chunks, start = [], 0
    for i in range(parts):
        end = start + size + (1 if i < extra else 0)
        chunks.append(list(items[start:end]))
        start = end
    return chunks


def chunked_map(func, items, workers):
    chunks = split_chunks(items, workers)
    results = []
    for chunk in chunks:
        results.extend(func(x) for x in chunk)
    return results, [len(c) for c in chunks]


def simulate_pool(durations, workers):
    free = [(0, w) for w in range(workers)]
    heapq.heapify(free)
    schedule = []
    makespan = 0
    for index, duration in enumerate(durations):
        start, worker = heapq.heappop(free)
        end = start + duration
        schedule.append((index, worker, start, end))
        makespan = max(makespan, end)
        heapq.heappush(free, (end, worker))
    return makespan, schedule


def speedup(durations, workers):
    if not durations:
        return 1.0
    makespan, _ = simulate_pool(durations, workers)
    return sum(durations) / makespan
```
+++
