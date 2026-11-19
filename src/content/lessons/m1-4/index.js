import b141 from './1.4.1.md?raw';
import b142 from './1.4.2.md?raw';
import b143 from './1.4.3.md?raw';
import b144 from './1.4.4.md?raw';
import b145 from './1.4.5.md?raw';
import b146 from './1.4.6.md?raw';
import projectBody from './project.md?raw';

const javaMain = (body) => `public class Main {
    public static void main(String[] args) {
${body.split('\n').map((l) => (l ? '        ' + l : l)).join('\n')}
    }
}
`;

export default {
  lessons: {
    '1.4.1': {
      body: b141,
      starter: {
        python: `colors = ["red", "green", "blue"]

print(colors[0])
print(colors[-1])
print(len(colors))

for i, color in enumerate(colors):
    print(i, color)
`,
        java: javaMain(`String[] colors = {"red", "green", "blue"};

System.out.println(colors[0]);
System.out.println(colors[colors.length - 1]);
System.out.println(colors.length);

for (int i = 0; i < colors.length; i++) {
    System.out.println(i + " " + colors[i]);
}`),
      },
    },
    '1.4.2': {
      body: b142,
      starter: {
        python: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:6])
print(numbers[::2])
print(numbers[-3:])
print(numbers[::-1])
`,
        java: javaMain(`String text = "0123456789";

System.out.println(text.substring(2, 6));
System.out.println(text.substring(text.length() - 3));
System.out.println(new StringBuilder(text).reverse());`),
      },
    },
    '1.4.3': {
      body: b143,
      starter: {
        python: `tasks = ["write", "test"]

tasks.append("ship")
tasks.insert(0, "plan")
print(tasks)

last = tasks.pop()
print(last, tasks)

print(sorted(tasks))
print(tasks)
`,
        java: javaMain(`java.util.List<String> tasks = new java.util.ArrayList<>(java.util.List.of("write", "test"));

tasks.add("ship");
tasks.add(0, "plan");
System.out.println(tasks);

String last = tasks.remove(tasks.size() - 1);
System.out.println(last + " " + tasks);`),
      },
    },
    '1.4.4': {
      body: b144,
      starter: {
        python: `template = ["sword", "potion"]

player_one = template        # try .copy() here
player_two = template        # and here

player_one.append("shield")

print(player_one)
print(player_two)
`,
        java: javaMain(`java.util.List<String> template = new java.util.ArrayList<>(java.util.List.of("sword", "potion"));

java.util.List<String> playerOne = template;   // try new ArrayList<>(template)
java.util.List<String> playerTwo = template;

playerOne.add("shield");

System.out.println(playerOne);
System.out.println(playerTwo);`),
      },
    },
    '1.4.5': {
      body: b145,
      starter: {
        python: `students = [("Ada", 91), ("Linus", 84), ("Grace", 97)]

for name, score in students:
    print(f"{name:<6} {score}")

first, *rest = [10, 20, 30, 40]
print(first, rest)

hours, minutes = divmod(197, 60)
print(hours, minutes)
`,
        java: javaMain(`int total = 197;
int hours = total / 60;
int minutes = total % 60;
System.out.println(hours + " " + minutes);`),
      },
    },
    '1.4.6': {
      body: b146,
      starter: {
        python: `phrase = "A man, a plan, a canal: Panama"

cleaned = ""
for ch in phrase.lower():
    if ch.isalpha():
        cleaned += ch

print(cleaned)
print(cleaned == cleaned[::-1])
`,
        java: javaMain(`String phrase = "A man, a plan, a canal: Panama";
StringBuilder cleaned = new StringBuilder();

for (char ch : phrase.toLowerCase().toCharArray()) {
    if (Character.isLetter(ch)) {
        cleaned.append(ch);
    }
}

System.out.println(cleaned);
System.out.println(cleaned.toString().equals(cleaned.reverse().toString()));`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'What is `letters[-1]` for `letters = ["a", "b", "c", "d"]`?',
        options: ['"a"', '"c"', '"d"', 'An IndexError'],
        answer: 2,
        explain: 'Negative indexes count from the end, so -1 is the last item.',
      },
      {
        q: 'What happens?',
        code: 'items = ["x", "y", "z"]\nprint(items[3])',
        options: ['It prints "z"', 'It prints None', 'IndexError: list index out of range', 'It prints "x"'],
        answer: 2,
        explain: 'A list of 3 items has indexes 0, 1 and 2. Index 3 does not exist.',
      },
      {
        q: 'What does this print?',
        code: 'nums = [10, 20, 30, 40, 50]\nprint(nums[1:4])',
        options: ['[10, 20, 30, 40]', '[20, 30, 40]', '[20, 30, 40, 50]', '[20, 30]'],
        answer: 1,
        explain: 'A slice starts at index 1 and stops before index 4, so it has 4 - 1 = 3 items.',
      },
      {
        q: 'Which expression reverses the list `nums`, leaving `nums` itself unchanged?',
        options: ['nums.reverse()', 'nums[::-1]', 'nums[-1]', 'nums.sort()'],
        answer: 1,
        explain: '`nums[::-1]` builds a reversed copy. `nums.reverse()` changes the list in place and returns None.',
      },
      {
        q: 'What does this print?',
        code: 'a = [1, 2]\na.append([3, 4])\nprint(len(a))',
        options: ['2', '3', '4', '5'],
        answer: 1,
        explain: '`append` adds the whole list as a single item, so the list now has three items: 1, 2 and [3, 4].',
      },
      {
        q: 'What does this print?',
        code: 'scores = [3, 1, 2]\nscores = scores.sort()\nprint(scores)',
        options: ['[1, 2, 3]', '[3, 1, 2]', 'None', 'An error'],
        answer: 2,
        explain: '`sort()` changes the list in place and returns None. Assigning that to `scores` throws the list away.',
      },
      {
        q: 'After this code, what does `a` contain?',
        code: 'a = [1, 2, 3]\nb = a\nb.append(4)',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'An error'],
        answer: 1,
        explain: '`b = a` makes a second name for the same list, so changing it through `b` changes what `a` sees.',
      },
      {
        q: 'Which line makes an independent copy of a flat list `a`?',
        options: ['b = a', 'b = a.copy()', 'b == a', 'b = a is a'],
        answer: 1,
        explain: '`a.copy()` (like `a[:]` or `list(a)`) creates a new list. A plain assignment only adds another name.',
      },
      {
        q: 'What happens?',
        code: 'point = (3, 4)\npoint[0] = 9',
        options: ['point becomes (9, 4)', 'TypeError: tuple does not support item assignment', 'IndexError', 'point becomes [9, 4]'],
        answer: 1,
        explain: 'Tuples are immutable. To change one you build a new tuple.',
      },
      {
        q: 'What are `first` and `rest` after this line?',
        code: 'first, *rest = [10, 20, 30, 40]',
        options: ['first = 10, rest = [20, 30, 40]', 'first = [10], rest = 20', 'first = 10, rest = 20', 'It is a SyntaxError'],
        answer: 0,
        explain: 'The starred name collects everything that is left over into a list.',
      },
      {
        q: 'What does this print?',
        code: 'word = "python"\nword = "P" + word[1:]\nprint(word)',
        options: ['python', 'Python', 'Ppython', 'A TypeError'],
        answer: 1,
        explain: 'Strings cannot be edited in place, but you can build a new one and attach the name to it.',
      },
    ],
  },

  project: {
    title: 'Playlist Studio',
    body: projectBody,
    starter: {
      python: `library = ["Aurora", "Basalt", "Cinder", "Delta", "Ember"]
lengths = [("Aurora", 215), ("Basalt", 187), ("Cinder", 242), ("Delta", 198), ("Ember", 260)]

# 1. playlist: an independent copy of library
playlist = library


# 2. Add "Fjord" at the end, "Intro" at the start, and remove "Cinder"


# 3. Slices of the edited playlist
top3 = []
tail_reversed = []
every_other = []

# 4. by_length: titles of library, shortest first (do not change library)
by_length = []

# 5. Longest track: loop over lengths and unpack each pair
longest_title = ""
longest_seconds = 0


# 6. total_time as "M:SS"
total_time = ""

# 7. banner: playlist titles joined with " | ", then print it
banner = ""
`,
      java: javaMain('// Checks run on Python. Try the same playlist in Java if you like.'),
    },
    checks: `check("library is untouched", ns.get("library") == ["Aurora", "Basalt", "Cinder", "Delta", "Ember"], "playlist must be a copy: library.copy()")
check("playlist is a separate list", ns.get("playlist") is not ns.get("library"), "use library.copy() or library[:]")
check("playlist is edited correctly", ns.get("playlist") == ["Intro", "Aurora", "Basalt", "Delta", "Ember", "Fjord"], "append Fjord, insert Intro at 0, remove Cinder")
check("top3", ns.get("top3") == ["Intro", "Aurora", "Basalt"], "playlist[:3]")
check("tail_reversed", ns.get("tail_reversed") == ["Fjord", "Ember", "Delta"], "playlist[-3:][::-1]")
check("every_other", ns.get("every_other") == ["Intro", "Basalt", "Ember"], "playlist[::2]")
check("by_length", ns.get("by_length") == ["Delta", "Ember", "Aurora", "Basalt", "Cinder"], "sorted(library, key=len)")
check("longest_title", ns.get("longest_title") == "Ember", "keep the title with the biggest seconds")
check("longest_seconds", ns.get("longest_seconds") == 260, "")
check("total_time is 18:22", ns.get("total_time") == "18:22", "sum the seconds, divmod by 60, pad seconds with :02d")
check("banner text", ns.get("banner") == "Intro | Aurora | Basalt | Delta | Ember | Fjord", "' | '.join(playlist)")
check("banner printed", "Intro | Aurora | Basalt | Delta | Ember | Fjord" in out, "print(banner)")`,
  },
};
