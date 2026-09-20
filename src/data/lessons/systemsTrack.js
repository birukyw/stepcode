// ─── Low-Level Systems & C/C++ Track ──────────────────────────────────

export const systemsTrackContent = {
  'sys-week-1': {
    lessons: [
      {
        title: 'C Memory Model & Pointer Fundamentals',
        language: 'cpp',
        starterCode: `#include <stdio.h>\n\nint main() {\n    int val = 42;\n    int *ptr = &val; // ptr stores the memory address of val\n\n    printf("Value: %d\\n", val);\n    printf("Address: %p\\n", (void*)ptr);\n    printf("Dereferenced: %d\\n", *ptr);\n\n    // Modify value directly through the pointer\n    *ptr = 100;\n    printf("Updated val: %d\\n", val);\n\n    return 0;\n}\n`,
        content: `
<h2>The C Memory Model & Direct Addressing ⚙️</h2>
<p>In high-level languages like Python or JavaScript, memory management is hidden by a Garbage Collector. In C, you work directly with the CPU's memory layout:</p>

<h3>Core Concepts</h3>
<ul>
  <li><strong>Memory Address (<code>&val</code>):</strong> The specific numerical hexadecimal location in virtual memory where a variable resides.</li>
  <li><strong>Pointer (<code>int *ptr</code>):</strong> A variable whose value is the memory address of another variable.</li>
  <li><strong>Dereferencing (<code>*ptr</code>):</strong> Accessing or modifying the data stored at the memory address pointed to.</li>
</ul>
        `,
      },
      {
        title: 'Stack vs Heap & Dynamic Allocation (malloc/free)',
        language: 'cpp',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate an array of 5 integers on the Heap\n    int n = 5;\n    int *arr = (int*)malloc(n * sizeof(int));\n\n    if (arr == NULL) {\n        printf("Memory allocation failed!\\n");\n        return 1;\n    }\n\n    for (int i = 0; i < n; i++) {\n        arr[i] = (i + 1) * 10;\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n\n    // Always free heap memory to prevent memory leaks!\n    free(arr);\n    arr = NULL;\n    printf("Memory safely freed.\\n");\n\n    return 0;\n}\n`,
        content: `
<h2>Stack vs. Heap Memory 🧠</h2>
<p>Programs divide memory into two primary runtime segments:</p>
<ol>
  <li><strong>The Stack:</strong> Fast, fixed-size, automatically managed by CPU stack frames. Local function variables live here and are automatically popped off when the function returns.</li>
  <li><strong>The Heap:</strong> Large, flexible, dynamically allocated at runtime using <code>malloc()</code> or <code>calloc()</code>. You are responsible for calling <code>free()</code>; forgetting causes <strong>Memory Leaks</strong>.</li>
</ol>
        `,
      },
    ],
    exercises: [
      {
        title: 'Swap Two Numbers Using Pointers',
        language: 'cpp',
        description: `<p>Implement a function <code>swap(int *a, int *b)</code> that swaps the values of two integers in-place using pointers.</p>`,
        starterCode: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x = %d, y = %d\\n", x, y);\n    return 0;\n}\n`,
        expectedOutput: `x = 20, y = 10`,
        hints: [`Use a temporary variable to hold the value of *a before reassigning.`],
      },
    ],
    quiz: [
      {
        question: 'What happens if you allocate memory on the heap with malloc() but never call free()?',
        options: [
          'The OS reclaims it immediately after each line executes',
          'A memory leak occurs until the process terminates',
          'The compiler gives a syntax error',
          'It is converted to stack memory',
        ],
        correctIndex: 1,
        explanation: 'Unfreed heap memory remains allocated to the process, causing a memory leak.',
      },
    ],
  },
};
