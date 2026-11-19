# Project: Playlist Studio

You are building the back end of a small music app. A library of tracks already exists. Your job is to build a playlist from it, edit that playlist, slice it up in different ways, and report on it, without ever damaging the original library.

This project uses everything in the module: indexing and slicing, list methods, the difference between a copy and an alias, tuples with unpacking, and string joining.

## The data

```python
library = ["Aurora", "Basalt", "Cinder", "Delta", "Ember"]
lengths = [("Aurora", 215), ("Basalt", 187), ("Cinder", 242), ("Delta", 198), ("Ember", 260)]
```

`lengths` pairs each title with its running time in seconds.

## What to build

Complete these in order. The checks look for the named variables.

1. **Copy.** Create `playlist` as an **independent copy** of `library`. Changing `playlist` must never change `library`.
2. **Edit.** On `playlist`, add `"Fjord"` at the end, insert `"Intro"` at the very start, and remove `"Cinder"`. You should end up with `Intro, Aurora, Basalt, Delta, Ember, Fjord`.
3. **Slices.** Create three views of the edited playlist:
    - `top3`: the first three tracks.
    - `tail_reversed`: the last three tracks, in reverse order.
    - `every_other`: every second track, starting with the first.
4. **Sorting.** Create `by_length`: the titles from `library` sorted by the number of letters, shortest first. Do **not** sort `library` itself.
5. **Longest track.** Loop over `lengths`, unpacking each pair into `title` and `seconds`, and record `longest_title` and `longest_seconds`.
6. **Running time.** Compute `total_time` as a string such as `18:22`, from the sum of all lengths. Use `divmod`, and pad the seconds to two digits.
7. **Banner.** Create `banner` by joining the playlist titles with `" | "`, then print it.

> **Tip:** After each step, `print` the variable to see what you have. The most common mistake in this project is step 1: if you write `playlist = library`, steps 2 and 4 will damage the library, and the checks will say so.

> **Watch out:** `sorted(library, key=len)` is a new list. `library.sort(key=len)` changes the original and returns `None`.

## Stretch goals

- Move `"Ember"` to the front of the playlist using `pop` and `insert`.
- Print each track as `1. Intro`, `2. Aurora`, ... using `enumerate`.
- Find the shortest track the same way you found the longest.

## Hints

+++ Copy hint
`library.copy()`, `library[:]` and `list(library)` all make independent copies. A plain `playlist = library` does not.
+++

+++ Slice hint
`top3` is `playlist[:3]`. The last three reversed is `playlist[-3:][::-1]`, or `playlist[:-4:-1]`. Every other track is `playlist[::2]`.
+++

+++ Full solution
```python
library = ["Aurora", "Basalt", "Cinder", "Delta", "Ember"]
lengths = [("Aurora", 215), ("Basalt", 187), ("Cinder", 242), ("Delta", 198), ("Ember", 260)]

playlist = library.copy()
playlist.append("Fjord")
playlist.insert(0, "Intro")
playlist.remove("Cinder")

top3 = playlist[:3]
tail_reversed = playlist[-3:][::-1]
every_other = playlist[::2]

by_length = sorted(library, key=len)

longest_title = ""
longest_seconds = 0
for title, seconds in lengths:
    if seconds > longest_seconds:
        longest_title = title
        longest_seconds = seconds

total_seconds = 0
for title, seconds in lengths:
    total_seconds += seconds
minutes, secs = divmod(total_seconds, 60)
total_time = f"{minutes}:{secs:02d}"

banner = " | ".join(playlist)
print(banner)
```
+++
