import b161 from './1.6.1.md?raw';
import b162 from './1.6.2.md?raw';
import b163 from './1.6.3.md?raw';
import b164 from './1.6.4.md?raw';
import b165 from './1.6.5.md?raw';
import b166 from './1.6.6.md?raw';
import projectBody from './project.md?raw';

const javaMain = (body) => `import java.util.*;

public class Main {
    public static void main(String[] args) {
${body.split('\n').map((l) => (l ? '        ' + l : l)).join('\n')}
    }
}
`;

export default {
  lessons: {
    '1.6.1': {
      body: b161,
      starter: {
        python: `ages = {"Ada": 36, "Linus": 28, "Grace": 85}

print(ages["Grace"])
print("Linus" in ages)

ages["Guido"] = 69
print(ages)
`,
        java: javaMain(`Map<String, Integer> ages = new LinkedHashMap<>();
ages.put("Ada", 36);
ages.put("Linus", 28);
ages.put("Grace", 85);

System.out.println(ages.get("Grace"));
System.out.println(ages.containsKey("Linus"));`),
      },
    },
    '1.6.2': {
      body: b162,
      starter: {
        python: `text = "the cat and the hat and the bat"
counts = {}

for word in text.split():
    counts[word] = counts.get(word, 0) + 1

print(counts)
print(max(counts, key=counts.get))
`,
        java: javaMain(`String text = "the cat and the hat and the bat";
Map<String, Integer> counts = new LinkedHashMap<>();

for (String word : text.split(" ")) {
    counts.put(word, counts.getOrDefault(word, 0) + 1);
}

System.out.println(counts);`),
      },
    },
    '1.6.3': {
      body: b163,
      starter: {
        python: `scores = {"Ada": 91, "Linus": 84, "Grace": 97}

for name, score in scores.items():
    print(f"{name} scored {score}")

ranking = sorted(scores.items(), key=lambda pair: pair[1], reverse=True)
print(ranking)
`,
        java: javaMain(`Map<String, Integer> scores = new LinkedHashMap<>();
scores.put("Ada", 91);
scores.put("Linus", 84);
scores.put("Grace", 97);

for (Map.Entry<String, Integer> e : scores.entrySet()) {
    System.out.println(e.getKey() + " scored " + e.getValue());
}`),
      },
    },
    '1.6.4': {
      body: b164,
      starter: {
        python: `morning = {"Ada", "Linus", "Grace", "Guido"}
evening = {"Grace", "Guido", "Margaret", "Tim"}

print(sorted(morning | evening))
print(sorted(morning & evening))
print(sorted(morning - evening))
print(sorted(morning ^ evening))
`,
        java: javaMain(`Set<String> morning = new TreeSet<>(List.of("Ada", "Linus", "Grace", "Guido"));
Set<String> evening = new TreeSet<>(List.of("Grace", "Guido", "Margaret", "Tim"));

Set<String> both = new TreeSet<>(morning);
both.retainAll(evening);
System.out.println(both);`),
      },
    },
    '1.6.5': {
      body: b165,
      starter: {
        python: `library = [
    {"title": "Dune", "year": 1965, "rating": 4.3},
    {"title": "Neuromancer", "year": 1984, "rating": 3.9},
    {"title": "Hyperion", "year": 1989, "rating": 4.2},
]

for book in library:
    print(f"{book['title']:<12} {book['year']}  {book['rating']}")

best = max(library, key=lambda b: b["rating"])
print("Best rated:", best["title"])
`,
        java: javaMain(`List<Map<String, Object>> library = new ArrayList<>();
library.add(Map.of("title", "Dune", "year", 1965));
library.add(Map.of("title", "Hyperion", "year", 1989));

for (Map<String, Object> book : library) {
    System.out.println(book.get("title") + " " + book.get("year"));
}`),
      },
    },
    '1.6.6': {
      body: b166,
      starter: {
        python: `docs = {
    1: "Python is a popular programming language.",
    2: "Snakes such as the python are not venomous.",
    3: "Learning a programming language takes practice.",
    4: "The python language was named after a comedy group.",
}


def tokenize(text):
    cleaned = ""
    for ch in text.lower():
        cleaned += ch if ch.isalnum() or ch == " " else " "
    return cleaned.split()


def build_index(docs):
    index = {}
    for doc_id, text in docs.items():
        for word in tokenize(text):
            index.setdefault(word, set()).add(doc_id)
    return index


index = build_index(docs)
print(sorted(index["python"]))
`,
        java: javaMain(`Map<String, Set<Integer>> index = new TreeMap<>();
String[] docs = {"python is popular", "the python snake", "learning python"};

for (int i = 0; i < docs.length; i++) {
    for (String word : docs[i].split(" ")) {
        index.computeIfAbsent(word, k -> new TreeSet<>()).add(i + 1);
    }
}
System.out.println(index.get("python"));`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'Why is `x in big_list` slow for a large list?',
        options: ['Lists are stored on disk', 'Python checks the items one by one, so the work grows with the list', 'The `in` operator sorts the list first', 'It is not slow'],
        answer: 1,
        explain: 'A list membership test is a linear search: O(n). A dictionary or set lookup is O(1) on average.',
      },
      {
        q: 'What happens?',
        code: 'stock = {"apples": 12}\nprint(stock["plums"])',
        options: ['It prints None', 'It prints 0', 'KeyError', 'It prints {}'],
        answer: 2,
        explain: 'Square-bracket lookup raises KeyError for a missing key. Use `stock.get("plums", 0)` for a default.',
      },
      {
        q: 'Which line counts words correctly, starting from an empty dictionary `counts`?',
        options: ['counts[w] += 1', 'counts[w] = counts.get(w, 0) + 1', 'counts.get(w) += 1', 'counts[w] = 1'],
        answer: 1,
        explain: '`get(w, 0)` returns 0 the first time a word appears, so the count starts correctly. `counts[w] += 1` raises KeyError on the first occurrence.',
      },
      {
        q: 'Which of these can be a dictionary key?',
        options: ['[1, 2]', '(1, 2)', '{1, 2}', '{"a": 1}'],
        answer: 1,
        explain: 'Keys must be hashable, which means immutable. Tuples are; lists, sets and dictionaries are not.',
      },
      {
        q: 'What does `for k, v in d.items():` give you on each iteration?',
        options: ['Only keys', 'Only values', 'A key and its value', 'The index and the key'],
        answer: 2,
        explain: '`items()` yields (key, value) pairs, which the loop unpacks into `k` and `v`.',
      },
      {
        q: 'What is the result of `{"a": 1, "b": 2} | {"b": 3}`?',
        options: ["{'a': 1, 'b': 2}", "{'a': 1, 'b': 3}", "{'b': 3}", 'A TypeError'],
        answer: 1,
        explain: 'The `|` operator merges, and the right-hand side wins when keys clash.',
      },
      {
        q: 'What is `type({})`?',
        options: ["<class 'set'>", "<class 'dict'>", "<class 'list'>", "<class 'tuple'>"],
        answer: 1,
        explain: 'Empty curly braces make a dictionary. Write an empty set as `set()`.',
      },
      {
        q: 'Given `a = {1, 2, 3}` and `b = {2, 3, 4}`, what is `a - b`?',
        options: ['{1}', '{4}', '{1, 4}', '{2, 3}'],
        answer: 0,
        explain: 'Difference keeps the items of `a` that are not in `b`.',
      },
      {
        q: 'Which expression safely reads a city from records where the address may be missing?',
        options: ['o["customer"]["address"]["city"]', 'o.get("customer", {}).get("address", {}).get("city")', 'o["customer"].get("address")["city"]', 'o.city'],
        answer: 1,
        explain: 'Each `.get(..., {})` returns an empty dictionary when a level is missing, so the chain never crashes.',
      },
      {
        q: 'In a search engine, what does an inverted index map?',
        options: ['Documents to their length', 'Words to the documents that contain them', 'Documents to their authors', 'Words to their definitions'],
        answer: 1,
        explain: 'It maps each word to the set of documents containing it, so a search is one lookup instead of a scan.',
      },
    ],
  },

  project: {
    title: 'Recipe Finder',
    body: projectBody,
    starter: {
      python: `recipes = {
    "r1": "Tomato pasta with garlic and basil.",
    "r2": "Garlic bread with butter.",
    "r3": "Basil pesto pasta with pine nuts and garlic.",
    "r4": "Tomato soup with cream and basil.",
    "r5": "Chocolate cake with butter and cream.",
}


def tokenize(text):
    pass


def word_counts(text):
    pass


def build_index(recipes):
    pass


def search_all(index, query):
    pass


def search_any(index, query):
    pass


def rank(recipes, query):
    pass
`,
      java: javaMain('// Checks run on Python. Try the same search engine in Java if you like.'),
    },
    checks: `def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

def _tok(text):
    cleaned = ""
    for ch in text.lower():
        cleaned += ch if ch.isalnum() or ch == " " else " "
    return cleaned.split()

R = {
    "r1": "Tomato pasta with garlic and basil.",
    "r2": "Garlic bread with butter.",
    "r3": "Basil pesto pasta with pine nuts and garlic.",
    "r4": "Tomato soup with cream and basil.",
    "r5": "Chocolate cake with butter and cream.",
}
_idx = {}
for _rid, _t in R.items():
    for _w in _tok(_t):
        _idx.setdefault(_w, set()).add(_rid)

def _all(q):
    ws = _tok(q)
    if not ws:
        return []
    r = _idx.get(ws[0], set())
    for w in ws[1:]:
        r = r & _idx.get(w, set())
    return sorted(r)

def _any(q):
    r = set()
    for w in _tok(q):
        r = r | _idx.get(w, set())
    return sorted(r)

def _rank(q):
    qs = _tok(q)
    out = []
    for rid, t in R.items():
        toks = _tok(t)
        s = sum(toks.count(w) for w in qs)
        if s > 0:
            out.append((s, rid))
    out.sort(key=lambda p: (-p[0], p[1]))
    return [rid for s, rid in out]

check("tokenize strips punctuation and lowercases", call("tokenize", "Garlic bread, with butter!") == ["garlic", "bread", "with", "butter"], "replace non-letters with spaces, then split")
check("word_counts", call("word_counts", "the cat and the hat") == {"the": 2, "cat": 1, "and": 1, "hat": 1}, "counts[w] = counts.get(w, 0) + 1")
idx = call("build_index", R)
check("build_index maps words to sets of ids", isinstance(idx, dict) and idx.get("basil") == {"r1", "r3", "r4"} and idx.get("butter") == {"r2", "r5"}, "index.setdefault(word, set()).add(recipe_id)")
if isinstance(idx, dict):
    check("search_all garlic pasta", call("search_all", idx, "garlic pasta") == _all("garlic pasta"), "intersect the sets, return sorted(...)")
    check("search_all with an unknown word", call("search_all", idx, "garlic unicorn") == [], "use index.get(word, set())")
    check("search_all with an empty query", call("search_all", idx, "") == [], "return [] when there are no words")
    check("search_any cream bread", call("search_any", idx, "cream bread") == _any("cream bread"), "union the sets, return sorted(...)")
check("rank tomato basil", call("rank", R, "tomato basil") == _rank("tomato basil"), "score = total occurrences, sort by (-score, id)")
check("rank with ties broken by id", call("rank", R, "with") == _rank("with"), "every recipe scores 1, so the order is r1, r2, r3, r4, r5")
check("rank leaves out zero scores", call("rank", R, "chocolate") == ["r5"], "only keep recipes with score > 0")`,
  },
};
