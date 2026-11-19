# Project: Recipe Finder

You are building the search box for a recipe site. Using the inverted-index technique from lesson 1.6.6, write six functions that turn a small recipe collection into a fast, ranked search. This is the Track 1 capstone project, so it uses everything: strings, loops, functions, lists, dictionaries and sets.

## The data

```python
recipes = {
    "r1": "Tomato pasta with garlic and basil.",
    "r2": "Garlic bread with butter.",
    "r3": "Basil pesto pasta with pine nuts and garlic.",
    "r4": "Tomato soup with cream and basil.",
    "r5": "Chocolate cake with butter and cream.",
}
```

## The functions

**1. `tokenize(text)`** returns a list of lowercase words with punctuation removed. `tokenize("Garlic bread, with butter!")` is `['garlic', 'bread', 'with', 'butter']`.

**2. `word_counts(text)`** returns a dictionary from each token to how many times it appears.

**3. `build_index(recipes)`** returns an inverted index: a dictionary from each word to the **set** of recipe IDs that contain it.

**4. `search_all(index, query)`** returns a **sorted list** of the IDs that contain **every** word in the query. Unknown words mean no results. An empty query returns `[]`.

**5. `search_any(index, query)`** returns a sorted list of the IDs that contain **at least one** query word.

**6. `rank(recipes, query)`** returns a list of IDs ordered by score, highest first, where the score is the total number of times the query words appear in that recipe. Leave out recipes that score 0. Break ties by ID, alphabetically.

> **Tip:** Build and test them in order, since each one uses the ones before it. `print(build_index(recipes)["basil"])` is a good sanity check.

> **Watch out:** the checks compare exact results, so `search_all` and `search_any` must return sorted **lists**, not sets.

## Stretch goals

- Add stop words, so `with` and `and` are ignored.
- Add a `suggest(index, prefix)` function that returns every indexed word starting with `prefix`, sorted.
- Print the top three results for a query as a small formatted table.

## Hints

+++ Index hint
Loop over `recipes.items()`. For each token of each recipe, use `index.setdefault(word, set()).add(recipe_id)`.
+++

+++ Ranking hint
For each recipe, build `word_counts(text)` and add up `counts.get(word, 0)` for each query word. Collect `(score, recipe_id)` pairs, then sort with `key=lambda p: (-p[0], p[1])` and return just the IDs.
+++

+++ Full solution
```python
recipes = {
    "r1": "Tomato pasta with garlic and basil.",
    "r2": "Garlic bread with butter.",
    "r3": "Basil pesto pasta with pine nuts and garlic.",
    "r4": "Tomato soup with cream and basil.",
    "r5": "Chocolate cake with butter and cream.",
}


def tokenize(text):
    cleaned = ""
    for ch in text.lower():
        if ch.isalnum() or ch == " ":
            cleaned += ch
        else:
            cleaned += " "
    return cleaned.split()


def word_counts(text):
    counts = {}
    for word in tokenize(text):
        counts[word] = counts.get(word, 0) + 1
    return counts


def build_index(recipes):
    index = {}
    for recipe_id, text in recipes.items():
        for word in tokenize(text):
            index.setdefault(word, set()).add(recipe_id)
    return index


def search_all(index, query):
    words = tokenize(query)
    if not words:
        return []
    result = index.get(words[0], set())
    for word in words[1:]:
        result = result & index.get(word, set())
    return sorted(result)


def search_any(index, query):
    result = set()
    for word in tokenize(query):
        result = result | index.get(word, set())
    return sorted(result)


def rank(recipes, query):
    query_words = tokenize(query)
    scored = []
    for recipe_id, text in recipes.items():
        counts = word_counts(text)
        score = 0
        for word in query_words:
            score += counts.get(word, 0)
        if score > 0:
            scored.append((score, recipe_id))
    scored.sort(key=lambda p: (-p[0], p[1]))
    result = []
    for score, recipe_id in scored:
        result.append(recipe_id)
    return result
```
+++
