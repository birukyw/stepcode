import b from './project.md?raw';

export default {
  moduleId: 'm1-6',
  project: {
    title: 'The Lost Terminal',
    body: b,
    starter: {
      python: `import copy

DIRECTIONS = {"n": "north", "s": "south", "e": "east", "w": "west"}

world = {
    "cave": {"desc": "A damp cave. Light spills from the north.", "exits": {"north": "tunnel"}, "items": ["lamp"]},
    "tunnel": {"desc": "A narrow tunnel that smells of old paper.", "exits": {"south": "cave", "east": "library"}, "items": []},
    "library": {"desc": "Dusty shelves tower over you.", "exits": {"west": "tunnel", "north": "vault"}, "items": ["key", "book"]},
    "vault": {"desc": "A glittering vault.", "exits": {"south": "library"}, "items": ["gold"]},
}


def parse(command):
    pass


def initial_state(world):
    pass


def describe(world, state):
    pass


def step(world, state, command):
    pass


def play(world, commands):
    pass


# Try it out
print(play(world, ["look", "take lamp", "go north"]))
`,
      java: 'public class Main {\n    public static void main(String[] args) {\n        // Checks run on Python. Try the same adventure in Java if you like.\n    }\n}\n',
    },
    checks: `import copy as _cp

_R_DIR = {"n": "north", "s": "south", "e": "east", "w": "west"}

_r_world = {
    "cave": {"desc": "A damp cave. Light spills from the north.", "exits": {"north": "tunnel"}, "items": ["lamp"]},
    "tunnel": {"desc": "A narrow tunnel that smells of old paper.", "exits": {"south": "cave", "east": "library"}, "items": []},
    "library": {"desc": "Dusty shelves tower over you.", "exits": {"west": "tunnel", "north": "vault"}, "items": ["key", "book"]},
    "vault": {"desc": "A glittering vault.", "exits": {"south": "library"}, "items": ["gold"]},
}


def _r_parse(command):
    words = command.lower().split()
    if not words:
        return ("", "")
    verb = words[0]
    noun = " ".join(words[1:])
    if verb in _R_DIR:
        return ("go", _R_DIR[verb])
    if verb in _R_DIR.values():
        return ("go", verb)
    if verb == "get":
        verb = "take"
    elif verb == "i":
        verb = "inventory"
    elif verb == "l":
        verb = "look"
    if verb == "go":
        noun = _R_DIR.get(noun, noun)
    return (verb, noun)


def _r_initial_state(world):
    return {"room": "cave", "inventory": [], "items": {name: list(room["items"]) for name, room in world.items()}, "moves": 0, "won": False}


def _r_describe(world, state):
    room = world[state["room"]]
    text = room["desc"] + "\\nExits: " + ", ".join(sorted(room["exits"]))
    items = state["items"][state["room"]]
    if items:
        text += "\\nItems: " + ", ".join(sorted(items))
    return text


def _r_step(world, state, command):
    state = _cp.deepcopy(state)
    verb, noun = _r_parse(command)
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
        return state, _r_describe(world, state)
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
        return state, _r_describe(world, state)
    return state, "I don't understand that."


def _r_play(world, commands):
    state = _r_initial_state(world)
    messages = []
    for command in commands:
        if state["won"]:
            break
        state, message = _r_step(world, state, command)
        messages.append(message)
    return messages

W = _cp.deepcopy(_r_world)

def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

PARSE_CASES = ["go north", "N", "  TAKE   lamp ", "get key", "i", "look", "l", "", "dance wildly", "go n", "W", "north", "take rusty lamp", "GO   East", "inventory"]
check("parse: verbs, nouns and aliases", all(call("parse", c) == _r_parse(c) for c in PARSE_CASES), "check " + str([c for c in PARSE_CASES if call("parse", c) != _r_parse(c)][:2]))

s0 = call("initial_state", W)
check("initial_state has the right shape", s0 == _r_initial_state(W), "keys: room, inventory, items, moves, won")
if isinstance(s0, dict) and isinstance(s0.get("items"), dict):
    s0["items"]["cave"].append("x")
    check("initial_state copies the item lists", W == _r_world, "use list(room['items']) so the world is not shared")

def walk(cmds):
    ref_state = _r_initial_state(W)
    my_state = call("initial_state", W)
    for c in cmds:
        ref_state, ref_msg = _r_step(W, ref_state, c)
        res = call("step", W, my_state, c)
        if not (isinstance(res, tuple) and len(res) == 2):
            return "step must return (state, message), got " + repr(res)[:40]
        my_state, my_msg = res
        if my_msg != ref_msg:
            return "after " + repr(c) + " expected " + repr(ref_msg)[:70] + " but got " + repr(my_msg)[:70]
        if my_state != ref_state:
            return "after " + repr(c) + " the state is wrong: " + repr(my_state)[:80]
    return ""

SCENES = {
    "describe the start": ["look"],
    "the dark tunnel needs a lamp": ["go north", "take lamp", "go north", "look"],
    "bad exits": ["go west", "go up", "south"],
    "the locked vault": ["take lamp", "n", "e", "n", "take key", "n", "look"],
    "take and drop": ["inventory", "take sword", "take lamp", "inventory", "drop lamp", "drop lamp", "look", "take lamp"],
    "unknown commands": ["dance", "", "take", "go"],
    "winning": ["get lamp", "n", "e", "take key", "north", "take gold"],
}
for name, cmds in SCENES.items():
    err = walk(cmds)
    check("step: " + name, err == "", err)

before = _cp.deepcopy(s0 if False else _r_initial_state(W))
st_in = call("initial_state", W)
snapshot = _cp.deepcopy(st_in)
world_snapshot = _cp.deepcopy(W)
for c in ["take lamp", "drop lamp", "go north", "look", "inventory"]:
    call("step", W, st_in, c)
check("step never changes its inputs", st_in == snapshot and W == world_snapshot, "copy the state first: state = copy.deepcopy(state)")

WIN = ["get lamp", "n", "e", "take key", "n", "take gold", "look", "go south"]
check("play returns every message", call("play", W, ["take lamp", "look"]) == _r_play(W, ["take lamp", "look"]), "one message per command")
check("play stops when the game is won", call("play", W, WIN) == _r_play(W, WIN) and len(_r_play(W, WIN)) == 6, "stop looping once state['won'] is True")
check("the win message counts the moves", str(call("play", W, WIN)[-1:]) == "['Taken: gold. You win in 3 moves!']", "use the real moves count")`,
  },
};
