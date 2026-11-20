import b341 from './3.4.1.md?raw';
import b342 from './3.4.2.md?raw';
import b343 from './3.4.3.md?raw';
import b344 from './3.4.4.md?raw';
import b345 from './3.4.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '3.4.1': {
      body: b341,
      starter: {
        python: `def amdahl(p, n):
    return 1 / ((1 - p) + p / n)


for p in (0.50, 0.90, 0.99):
    print(p, [round(amdahl(p, n), 2) for n in (2, 4, 16, 1000)])
`,
        java: javaClass(`    static long burn() {
        long total = 0;
        for (int i = 0; i < 20_000_000; i++) total += (long) i * i;
        return total;
    }

    public static void main(String[] args) throws Exception {
        // Java threads really do run on several cores, unlike Python threads.
        long start = System.nanoTime();
        Thread[] threads = new Thread[4];
        for (int i = 0; i < 4; i++) { threads[i] = new Thread(Main::burn); threads[i].start(); }
        for (Thread t : threads) t.join();
        System.out.println("4 threads finished");
    }`),
      },
    },
    '3.4.2': {
      body: b342,
      starter: {
        python: `def increment(shared, name):
    value = shared["counter"]            # read
    yield f"{name} read {value}"
    value = value + 1                    # compute
    yield f"{name} computed {value}"
    shared["counter"] = value            # write
    yield f"{name} wrote {value}"


def run(schedule):
    shared = {"counter": 0}
    tasks = {"A": increment(shared, "A"), "B": increment(shared, "B")}
    log = [next(tasks[name]) for name in schedule]
    return shared["counter"], log


print(run("AAABBB")[0])
print(run("ABABAB")[0])
`,
        java: javaClass(`    static int counter = 0;

    static synchronized void increment() { counter++; }

    public static void main(String[] args) throws Exception {
        Thread[] threads = new Thread[4];
        for (int i = 0; i < 4; i++) {
            threads[i] = new Thread(() -> { for (int k = 0; k < 10000; k++) increment(); });
            threads[i].start();
        }
        for (Thread t : threads) t.join();
        System.out.println(counter);
    }`),
      },
    },
    '3.4.3': {
      body: b343,
      starter: {
        python: `from collections import Counter


def count_words(lines):
    counts = Counter()
    for line in lines:
        counts.update(line.lower().split())
    return counts


def split(items, parts):
    size, extra = divmod(len(items), parts)
    chunks, start = [], 0
    for i in range(parts):
        end = start + size + (1 if i < extra else 0)
        chunks.append(items[start:end])
        start = end
    return chunks


lines = ["the cat sat", "the dog sat", "a cat and a dog", "the end"] * 1000
partials = [count_words(chunk) for chunk in split(lines, 4)]      # a process pool would run these in parallel
total = sum(partials, Counter())
print(total.most_common(3))
print([len(c) for c in split(list(range(10)), 3)])
`,
        java: javaClass(`    public static void main(String[] args) throws Exception {
        var pool = java.util.concurrent.Executors.newFixedThreadPool(4);
        var futures = new java.util.ArrayList<java.util.concurrent.Future<Long>>();
        for (int part = 0; part < 4; part++) {
            final int lo = part * 250_000, hi = lo + 250_000;
            futures.add(pool.submit(() -> {
                long sum = 0;
                for (long i = lo; i < hi; i++) sum += i * i;
                return sum;
            }));
        }
        long total = 0;
        for (var f : futures) total += f.get();
        pool.shutdown();
        System.out.println(total);
    }`),
      },
    },
    '3.4.4': {
      body: b344,
      starter: {
        python: `import asyncio


async def fetch(name, delay):
    await asyncio.sleep(delay)
    print("finished", name)
    return name.upper()


async def main():
    results = await asyncio.gather(fetch("slow", 0.15), fetch("fast", 0.05), fetch("medium", 0.1))
    print(results)


asyncio.run(main())
`,
        java: javaClass(`    public static void main(String[] args) throws Exception {
        var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor();
        var f1 = executor.submit(() -> { Thread.sleep(150); return "slow"; });
        var f2 = executor.submit(() -> { Thread.sleep(50); return "fast"; });
        System.out.println(f1.get() + " " + f2.get());
        executor.shutdown();
    }`),
      },
    },
    '3.4.5': {
      body: b345,
      starter: {
        python: `import asyncio


async def square(n):
    await asyncio.sleep(0.01 * (4 - n))
    return n * n


async def main():
    async with asyncio.TaskGroup() as group:
        tasks = [group.create_task(square(n)) for n in (1, 2, 3)]
    print([t.result() for t in tasks])

    try:
        async with asyncio.timeout(0.05):
            await asyncio.sleep(5)
    except TimeoutError:
        print("gave up")


asyncio.run(main())
`,
        java: javaClass(`    public static void main(String[] args) throws Exception {
        var latch = new java.util.concurrent.CountDownLatch(3);
        for (int i = 1; i <= 3; i++) {
            final int n = i;
            new Thread(() -> { System.out.println(n * n); latch.countDown(); }).start();
        }
        latch.await();
        System.out.println("all done");
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('Which is true of CPU-bound Python code run in several threads?', ['It runs several times faster', 'It gets little or no speedup because of the GIL', 'It runs on a GPU', 'It cannot run'], 1, 'Only one thread runs Python bytecode at a time, so CPU-bound threads take turns instead of running in parallel.'),
      q('Why do threads speed up I/O-bound work?', ['They use more cores for the I/O', 'Waiting releases the GIL, so other threads can run while one waits', 'They make the network faster', 'I/O does not need Python'], 1, 'The waits overlap. Five 0.2 second waits take about 0.2 seconds instead of 1 second.'),
      q('What is a race condition?', ['A fast program', 'A result that depends on the timing of unsynchronised reads and writes of shared data', 'A deadlock', 'A syntax error'], 1, '`counter += 1` is read, add, write, so two threads can read the same value and one update is lost.'),
      q('What is the best way to share data safely between threads?', ['A global list', 'Pass messages through a queue.Queue, or protect shared data with a lock', 'Use sleep', 'Hope for the best'], 1, 'queue.Queue is thread-safe. Where state must be shared, hold a lock for the shortest time possible.'),
      q('Why must multiprocessing code use `if __name__ == "__main__":`?', ['It is faster', 'A new process may re-import your script, which would start more processes without the guard', 'Python requires it for threads', 'It hides errors'], 1, 'On spawn and forkserver start methods each worker imports the main module again.'),
      q('Why can you not send a lambda to a process pool?', ['Lambdas are slow', 'Arguments and functions are pickled, and a lambda has no importable name', 'Pools only accept classes', 'It works fine'], 1, 'Define worker functions at the top level of a module so they can be pickled by name.'),
      q('What does `await` do inside a coroutine?', ['Blocks the whole program', 'Pauses this coroutine until the awaited thing is done, letting the event loop run others', 'Starts a new thread', 'Raises an error'], 1, 'That pause point is where cooperative multitasking switches between tasks.'),
      q('What is the golden rule of asyncio?', ['Never use await', 'Never block the event loop with slow synchronous calls', 'Always use threads', 'Use global variables'], 1, 'There is one thread. A blocking call such as time.sleep freezes every other task.'),
      q('What does asyncio.TaskGroup guarantee?', ['Tasks run in order', 'When the block ends no task of the group is still running, and one failure cancels the others', 'Tasks run in parallel on many cores', 'Errors are ignored'], 1, 'Structured concurrency: tasks cannot outlive their scope, and errors reach you.'),
      q('What should you do after catching asyncio.CancelledError?', ['Ignore it', 'Clean up and re-raise it', 'Restart the task', 'Print it'], 1, 'Swallowing it breaks timeouts and TaskGroups, which rely on cancellation completing.'),
    ],
  },

  project: {
    title: 'Concurrency Lab',
    body: projectBody,
    starter: {
      python: `import heapq


def round_robin(*generators):
    pass


class Scheduler:
    def __init__(self):
        self.now = 0

    def spawn(self, name, generator):
        pass

    def run(self):
        pass


class TokenBucket:
    def __init__(self, rate, capacity, clock):
        pass

    def allow(self, cost=1):
        pass


def retry_with_backoff(func, attempts, base_delay, sleep):
    pass


class CircuitOpenError(Exception):
    pass


class CircuitBreaker:
    def __init__(self, failure_threshold, reset_timeout, clock):
        pass

    @property
    def state(self):
        pass

    def call(self, func):
        pass


def split_chunks(items, parts):
    pass


def chunked_map(func, items, workers):
    pass


def simulate_pool(durations, workers):
    pass


def speedup(durations, workers):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import time

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

def timed(fn, limit=2.5):
    start = time.perf_counter()
    try:
        r = fn()
    except Exception:
        return None, False
    return r, (time.perf_counter() - start) <= limit

rr = ns.get("round_robin")
if callable(rr):
    check("round_robin interleaves", attempt(lambda: rr(iter([1, 2, 3]), iter("ab"))) == [1, "a", 2, "b", 3], "one value from each live generator per round")
    check("round_robin edge cases", attempt(lambda: (rr(), rr(iter([])), rr(iter([1, 2])), rr((x for x in range(3)), (x * 10 for x in range(1))))) == ([], [], [1, 2], [0, 0, 1, 2]), "no generators, empty generators and uneven lengths all work")
    def lazy():
        def gen(tag):
            i = 0
            while True:
                i += 1
                yield (tag, i)
                if i == 2:
                    return
        return rr(gen("x"), gen("y"))
    check("round_robin drops finished generators", attempt(lazy) == [("x", 1), ("y", 1), ("x", 2), ("y", 2)], "stop asking a generator once it is exhausted")
else:
    check("round_robin", False, "define round_robin(*generators)")

S = ns.get("Scheduler")
if isinstance(S, type):
    def sched():
        s = S()
        def a():
            yield 3
            yield 1
        def b():
            yield 1
            yield 1
            yield 1
        s.spawn("A", a()); s.spawn("B", b())
        log = s.run()
        return log, s.now
    check("Scheduler runs tasks in virtual time", attempt(sched) == ([(0, "A"), (0, "B"), (1, "B"), (2, "B"), (3, "A"), (3, "B"), (4, "A")], 4), "pop the soonest wake-up from a heap. Ties go to whoever went to sleep first")
    def ties():
        s = S()
        def t(n):
            for _ in range(n):
                yield 1
        for name, n in (("x", 1), ("y", 1), ("z", 2)):
            s.spawn(name, t(n))
        return s.run()
    check("Scheduler breaks ties by order", attempt(ties) == [(0, "x"), (0, "y"), (0, "z"), (1, "x"), (1, "y"), (1, "z"), (2, "z")], "use a counter that increases on every push as the tie-breaker")
    def empty():
        s = S()
        return (s.run(), s.now)
    def instant():
        s = S()
        def done():
            return
            yield
        s.spawn("quick", done())
        return (s.run(), s.now)
    check("Scheduler edge cases", attempt(empty) == ([], 0) and attempt(instant) == ([(0, "quick")], 0), "no tasks, and tasks that finish immediately")
    def many():
        s = S()
        def t(i):
            yield (i % 7) + 1
            yield 2
        for i in range(20000):
            s.spawn(i, t(i))
        log = s.run()
        return len(log), s.now
    r, ok = timed(many)
    check("Scheduler handles 20,000 tasks", ok and r == (60000, 9), "a heap makes each step O(log n)")
    def separate():
        a, b = S(), S()
        def t():
            yield 5
        a.spawn("only", t())
        return (a.run(), b.run())
    check("Schedulers do not share state", attempt(separate) == ([(0, "only"), (5, "only")], []), "keep the heap on self")
else:
    check("Scheduler", False, "define class Scheduler")

TB = ns.get("TokenBucket")
if isinstance(TB, type):
    def bucket():
        t = [0.0]
        b = TB(2, 4, lambda: t[0])
        out = [b.allow() for _ in range(5)]
        t[0] = 0.5
        out.append(b.allow())
        out.append(b.allow())
        t[0] = 100
        out.append(b.allow(4))
        out.append(b.allow())
        return out
    check("TokenBucket", attempt(bucket) == [True, True, True, True, False, True, False, True, False], "start full, refill rate * elapsed, cap at capacity")
    def cost():
        t = [0.0]
        b = TB(1, 5, lambda: t[0])
        return [b.allow(3), b.allow(3), b.allow(2), b.allow(1)]
    check("TokenBucket costs and failed requests", attempt(cost) == [True, False, True, False], "a refused request must not use up tokens")
    def refill():
        t = [10.0]
        b = TB(1, 3, lambda: t[0])
        got = [b.allow(), b.allow(), b.allow(), b.allow()]
        t[0] = 11.0
        got.append(b.allow())
        got.append(b.allow())
        return got
    check("TokenBucket refill over time", attempt(refill) == [True, True, True, False, True, False], "the clock may start at any value, not only 0")
else:
    check("TokenBucket", False, "define class TokenBucket")

rb = ns.get("retry_with_backoff")
if callable(rb):
    def flaky(fails):
        state = {"n": 0}
        def f():
            state["n"] += 1
            if state["n"] <= fails:
                raise ConnectionError("down " + str(state["n"]))
            return "ok"
        return f
    def ok_run():
        delays = []
        r = rb(flaky(3), 5, 0.5, delays.append)
        return r, delays
    check("retry_with_backoff succeeds with doubling delays", attempt(ok_run) == ("ok", [0.5, 1.0, 2.0]), "sleep(base_delay * 2 ** attempt) after each failure")
    def fail_run():
        delays = []
        try:
            rb(flaky(99), 3, 1, delays.append)
        except ConnectionError as e:
            return str(e), delays
    check("retry_with_backoff gives up and re-raises the last error", attempt(fail_run) == ("down 3", [1, 2]), "no sleep after the final failed attempt")
    def first_try():
        delays = []
        return rb(lambda: 7, 4, 1, delays.append), delays
    check("retry_with_backoff does not sleep on success", attempt(first_try) == (7, []), "only sleep between failures")
    def one_attempt():
        delays = []
        try:
            rb(flaky(5), 1, 1, delays.append)
        except ConnectionError:
            return delays
    check("retry_with_backoff with a single attempt", attempt(one_attempt) == [], "attempts=1 means one call and no waiting")
else:
    check("retry_with_backoff", False, "define retry_with_backoff(func, attempts, base_delay, sleep)")

CB, COE = ns.get("CircuitBreaker"), ns.get("CircuitOpenError")
if isinstance(CB, type) and isinstance(COE, type) and issubclass(COE, Exception):
    def breaker():
        t = [0.0]
        cb = CB(2, 10, lambda: t[0])
        calls = []
        def fail():
            calls.append("called")
            raise RuntimeError("boom")
        def good():
            calls.append("good")
            return "fine"
        log = [cb.state]
        for _ in range(2):
            try:
                cb.call(fail)
            except RuntimeError:
                pass
        log.append(cb.state)
        try:
            cb.call(good)
        except COE:
            log.append("blocked")
        t[0] = 5
        log.append(cb.state)
        t[0] = 10
        log.append(cb.state)
        log.append(cb.call(good))
        log.append(cb.state)
        return log, calls
    check("CircuitBreaker opens, blocks and recovers", attempt(breaker) == (["closed", "open", "blocked", "open", "half-open", "fine", "closed"], ["called", "called", "good"]), "open after 2 failures, no calls while open, a trial call after reset_timeout")
    def relapse():
        t = [0.0]
        cb = CB(1, 5, lambda: t[0])
        def fail():
            raise ValueError("x")
        try:
            cb.call(fail)
        except ValueError:
            pass
        t[0] = 6
        states = [cb.state]
        try:
            cb.call(fail)
        except ValueError:
            pass
        states.append(cb.state)
        t[0] = 10
        states.append(cb.state)
        t[0] = 11
        states.append(cb.state)
        return states
    check("CircuitBreaker reopens when the trial call fails", attempt(relapse) == ["half-open", "open", "open", "half-open"], "a failed trial restarts the reset timer from now")
    def resets():
        t = [0.0]
        cb = CB(3, 5, lambda: t[0])
        def fail():
            raise ValueError
        def ok():
            return 1
        for _ in range(2):
            try:
                cb.call(fail)
            except ValueError:
                pass
        cb.call(ok)
        for _ in range(2):
            try:
                cb.call(fail)
            except ValueError:
                pass
        return cb.state
    check("CircuitBreaker counts consecutive failures only", attempt(resets) == "closed", "a success resets the failure count")
else:
    check("CircuitBreaker", False, "define CircuitOpenError(Exception) and class CircuitBreaker")

sc = ns.get("split_chunks")
if callable(sc):
    check("split_chunks", [attempt(lambda a=a: sc(*a)) for a in (([1, 2, 3, 4, 5, 6, 7], 3), (list(range(10)), 3), ([1, 2], 4), ([], 2), ([1, 2, 3], 1))] == [[[1, 2, 3], [4, 5], [6, 7]], [[0, 1, 2, 3], [4, 5, 6], [7, 8, 9]], [[1], [2], [], []], [[], []], [[1, 2, 3]]], "divmod gives the size and the number of larger chunks")
    check("split_chunks rejects fewer than one part", raises(lambda: sc([1], 0), ValueError), "raise ValueError for parts below 1")
    r, ok = timed(lambda: sc(list(range(100000)), 7))
    check("split_chunks on 100,000 items", ok and sum(len(c) for c in r) == 100000 and max(len(c) for c in r) - min(len(c) for c in r) <= 1, "slice the list, do not loop item by item with pop(0)")
else:
    check("split_chunks", False, "define split_chunks(items, parts)")

cm = ns.get("chunked_map")
if callable(cm):
    check("chunked_map", attempt(lambda: cm(lambda x: x * x, list(range(7)), 3)) == ([0, 1, 4, 9, 16, 25, 36], [3, 2, 2]), "results in the original order, plus the chunk sizes")
    check("chunked_map edge cases", attempt(lambda: (cm(str, [], 2), cm(len, ["a", "bb"], 5))) == (([], [0, 0]), ([1, 2], [1, 1, 0, 0, 0])), "empty input and more workers than items")
else:
    check("chunked_map", False, "define chunked_map(func, items, workers)")

sp, su = ns.get("simulate_pool"), ns.get("speedup")
if callable(sp):
    check("simulate_pool", attempt(lambda: sp([3, 2, 4, 1], 2)) == (6, [(0, 0, 0, 3), (1, 1, 0, 2), (2, 1, 2, 6), (3, 0, 3, 4)]), "each task goes to the worker that is free the earliest")
    check("simulate_pool ties and edge cases", attempt(lambda: (sp([], 3), sp([5], 3), sp([2, 2, 2], 1)[0], sp([1, 1, 1, 1], 2)[1])) == ((0, []), (5, [(0, 0, 0, 5)]), 6, [(0, 0, 0, 1), (1, 1, 0, 1), (2, 0, 1, 2), (3, 1, 1, 2)]), "equal free times go to the lower worker number")
    import random as _r
    rnd = _r.Random(4)
    durs = [rnd.randint(1, 50) for _ in range(100000)]
    r, ok = timed(lambda: sp(durs, 8))
    free = [0] * 8
    for d in durs:
        i = free.index(min(free))
        free[i] += d
    check("simulate_pool on 100,000 tasks", ok and r is not None and r[0] == max(free), "keep the workers in a heap of (free_time, worker)")
else:
    check("simulate_pool", False, "define simulate_pool(durations, workers)")
if callable(su):
    check("speedup", attempt(lambda: (su([4, 4, 4, 4], 4), su([4, 4, 4, 4], 1), su([], 3), su([3, 2, 4, 1], 2))) == (4.0, 1.0, 1.0, 10 / 6), "total duration divided by the makespan, or 1.0 for no tasks")
else:
    check("speedup", False, "define speedup(durations, workers)")`,
  },
};
