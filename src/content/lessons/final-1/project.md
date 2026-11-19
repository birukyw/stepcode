# Final Project: The Lost Terminal

This is the Track 1 finale, and it is the hardest project so far. You are going to build the **engine of a text adventure game**: a tiny world you can walk through with typed commands, where doors are locked, rooms are dark, and treasure is waiting.

Everything from the track is in here: dictionaries for the world, a tuple-returning parser, list and string handling, loops, sets of rules, and the pure-function discipline from module 1.5. The game must never change the data it was given, because a real engine needs to replay and undo moves.

## The world

```python
world = {
    "cave": {"desc": "A damp cave. Light spills from the north.", "exits": {"north": "tunnel"}, "items": ["lamp"]},
    "tunnel": {"desc": "A narrow tunnel that smells of old paper.", "exits": {"south": "cave", "east": "library"}, "items": []},
    "library": {"desc": "Dusty shelves tower over you.", "exits": {"west": "tunnel", "north": "vault"}, "items": ["key", "book"]},
    "vault": {"desc": "A glittering vault.", "exits": {"south": "library"}, "items": ["gold"]},
}
```

The player starts in the `cave`. Taking the `gold` wins the game.

## The six functions

**1. `parse(command)`** turns text into a `(verb, noun)` tuple.

- Lowercase the text. The first word is the verb, and the rest, joined by single spaces, is the noun. An empty command is `("", "")`.
- `n`, `s`, `e`, `w` alone, and the full words `north`, `south`, `east`, `west`, mean `("go", "north")` and so on.
- `get` means `take`. `i` means `inventory`. `l` means `look`.
- In `go n`, the noun `n` also expands to `north`.

**2. `initial_state(world)`** returns a new state dictionary with the keys `"room"` (start `"cave"`), `"inventory"` (empty list), `"items"` (a dictionary from room name to a **copy** of that room's item list), `"moves"` (0) and `"won"` (False). Changing the state must never change `world`.

**3. `describe(world, state)`** returns the description of the current room, a line `Exits:` listing the exits in alphabetical order, and, only if the room holds items, a line `Items:` listing them alphabetically:

```text
Dusty shelves tower over you.
Exits: north, west
Items: book, key
```

**4. `step(world, state, command)`** performs one command and returns `(new_state, message)`. It must **not** modify `world` or `state`. The rules:

| Command | Result |
|---|---|
| `go <direction>` | Move if the exit exists, add 1 to `moves`, and the message is `describe(...)` of the new room. |
| no such exit | `You can't go that way.` |
| entering the tunnel without the lamp | `It is too dark to go that way without a lamp.` |
| entering the vault without the key | `The vault door is locked.` |
| `take <item>` | Move the item from the room to the inventory: `Taken: lamp.` If it is not there: `There is no sword here.` |
| taking the gold | `won` becomes True and the message is `Taken: gold. You win in 3 moves!` using the real number of moves. |
| `drop <item>` | Move it from the inventory into the room: `Dropped: lamp.` If you do not have it: `You are not carrying lamp.` |
| `inventory` | `You carry: key, lamp` (alphabetical), or `You are carrying nothing.` |
| `look` | The same text as `describe`. |
| anything else | `I don't understand that.` |

**5. `play(world, commands)`** runs a list of commands from a fresh state and returns the list of messages. It stops as soon as the game is won and ignores any commands after that.

**6. `main()`** is yours to design. Use a `while` loop with `input()` to let someone play for real. This one is not checked.

> **Tip:** Write `parse` first and test it with a handful of `print` calls. Then `initial_state` and `describe`. Only then write `step`, one verb at a time. Run the checks after each function. They tell you exactly which case breaks.

> **Watch out:** `step` must not mutate its inputs. The easiest fix is `import copy` and `state = copy.deepcopy(state)` on the first line. The checks verify that the original state and the world are unchanged after every call.

## Stretch goals

- Add a `score`: 10 points per item taken, minus 1 per move, shown on the win message.
- Add a new room with a locked door that needs the book to open.
- Add `help` and `quit` commands to `main()`.
- Save and load the state with `json.dumps` and `json.loads`.

## Hints

+++ parse hint
Split into words with `.split()`. Handle the empty list first. Use the `DIRECTIONS` dictionary for the one-letter aliases, and `DIRECTIONS.get(noun, noun)` to expand `go n`.
+++

+++ step hint
Get `(verb, noun)` from `parse`. Then use an `if`/`elif` chain, one branch per verb, each returning `(state, message)`. For `go`, check the three failure cases first, and only then change `state["room"]` and `state["moves"]`.
+++

+++ Full solution
```python
import copy

DIRECTIONS = {"n": "north", "s": "south", "e": "east", "w": "west"}

world = {
    "cave": {"desc": "A damp cave. Light spills from the north.", "exits": {"north": "tunnel"}, "items": ["lamp"]},
    "tunnel": {"desc": "A narrow tunnel that smells of old paper.", "exits": {"south": "cave", "east": "library"}, "items": []},
    "library": {"desc": "Dusty shelves tower over you.", "exits": {"west": "tunnel", "north": "vault"}, "items": ["key", "book"]},
    "vault": {"desc": "A glittering vault.", "exits": {"south": "library"}, "items": ["gold"]},
}


def parse(command):
    words = command.lower().split()
    if not words:
        return ("", "")
    verb = words[0]
    noun = " ".join(words[1:])
    if verb in DIRECTIONS:
        return ("go", DIRECTIONS[verb])
    if verb in DIRECTIONS.values():
        return ("go", verb)
    if verb == "get":
        verb = "take"
    elif verb == "i":
        verb = "inventory"
    elif verb == "l":
        verb = "look"
    if verb == "go":
        noun = DIRECTIONS.get(noun, noun)
    return (verb, noun)


def initial_state(world):
    return {
        "room": "cave",
        "inventory": [],
        "items": {name: list(room["items"]) for name, room in world.items()},
        "moves": 0,
        "won": False,
    }


def describe(world, state):
    room = world[state["room"]]
    text = room["desc"] + "\nExits: " + ", ".join(sorted(room["exits"]))
    items = state["items"][state["room"]]
    if items:
        text += "\nItems: " + ", ".join(sorted(items))
    return text


def step(world, state, command):
    state = copy.deepcopy(state)
    verb, noun = parse(command)
    room = state["room"]
    if verb == "go":
        target = world[room]["exits"].get(noun)
        if target is None:
            return state, "You can't go that way."
        if target == "tunnel" and "lamp" not in state["inventory"]:
            return state, "It is too dark to go that way without a lamp."
        if target == "vault" and "key" not in state["inventory"]:
            return state, "The vault door is locked."
        state["room"] = target
        state["moves"] += 1
        return state, describe(world, state)
    if verb == "take":
        if noun not in state["items"][room]:
            return state, "There is no " + noun + " here."
        state["items"][room].remove(noun)
        state["inventory"].append(noun)
        if noun == "gold":
            state["won"] = True
            return state, "Taken: gold. You win in " + str(state["moves"]) + " moves!"
        return state, "Taken: " + noun + "."
    if verb == "drop":
        if noun not in state["inventory"]:
            return state, "You are not carrying " + noun + "."
        state["inventory"].remove(noun)
        state["items"][room].append(noun)
        return state, "Dropped: " + noun + "."
    if verb == "inventory":
        if not state["inventory"]:
            return state, "You are carrying nothing."
        return state, "You carry: " + ", ".join(sorted(state["inventory"]))
    if verb == "look":
        return state, describe(world, state)
    return state, "I don't understand that."


def play(world, commands):
    state = initial_state(world)
    messages = []
    for command in commands:
        if state["won"]:
            break
        state, message = step(world, state, command)
        messages.append(message)
    return messages
```
+++
