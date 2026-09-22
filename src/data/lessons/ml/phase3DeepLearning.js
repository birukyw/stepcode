// ─── Phase 3: Deep Learning Fundamentals with PyTorch ─────────────────────────
// Modules 8–11: PyTorch Core, Training Dynamics, CNNs & Sequence Models

export const mlPhase3Content = {
  "ml-week-8": {
    "lessons": [
      {
        "title": "The Biological & Artificial Perceptron: Weights, Bias & Linear Separability",
        "language": "python",
        "starterCode": `import numpy as np

# Rosenblatt Perceptron step function: y = 1 if w^T x + b >= 0 else 0
weights = np.array([1.5, -2.0])
bias = 0.5

sample = np.array([2.0, 1.0])
activation = np.dot(weights, sample) + bias
output = 1 if activation >= 0 else 0

print("Activation:", activation)
print("Binary Decision:", output)
`,
        "content": `<h2>⚡ Lesson 1: The Biological & Artificial Perceptron</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In 1958, Frank Rosenblatt created the Perceptron at the Cornell Aeronautical Laboratory. The New York Times reported that it was the embryo of an electronic computer that would soon <em>"walk, talk, see, write, reproduce itself and be conscious of its existence."</em> While the media hype was premature, the mathematical blueprint Rosenblatt established remains the atomic building block of all modern deep learning!
</div>

<h3>🎯 How a Neuron Thinks: Weighing Evidence</h3>
<p>Imagine you are deciding whether to go to a music festival this weekend. You subconsciously weigh several factors:</p>
<ul>
  <li>Will it rain? (Weight: -5 &rarr; Bad weather heavily discourages you)</li>
  <li>Are your friends going? (Weight: +4 &rarr; Strong positive push)</li>
  <li>Is the ticket affordable? (Weight: +3 &rarr; Moderate positive push)</li>
</ul>
<p>You add up the weighted scores, add your personal baseline inclination (the <strong>bias</strong>), and if the total sum exceeds zero, you buy the ticket! That is an <strong>artificial neuron</strong>:</p>

<div class="math-formula">
  z = ∑<sub>j=1</sub><sup>D</sup> w<sub>j</sub> x<sub>j</sub> + b = <strong>w</strong>ᵀ<strong>x</strong> + b
</div>
<p>The sum <em>z</em> is passed through an activation function: <code>y = f(z)</code>.</p>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The 1969 Winter of AI: The XOR Limitation</strong><br />
  In 1969, Marvin Minsky and Seymour Papert published a famous book proving that a single perceptron can <strong>never</strong> solve the exclusive-OR (XOR) logic gate! Why? Because a single perceptron can only draw a straight line. If you plot XOR on a 2D plane, red and blue points sit diagonally opposite each other—no single straight wooden ruler can ever separate them. This discovery halted neural network funding for over a decade until researchers embraced <strong>multi-layer networks</strong>!
</div>
`
      },
      {
        "title": "Multi-Layer Perceptrons (MLPs) & The Universal Approximation Theorem",
        "language": "python",
        "starterCode": `import numpy as np

# MLP forward pass with 1 hidden layer and ReLU activation
X = np.array([[1.0, 2.0]]) # 1 sample, 2 features
W1 = np.array([[0.5, -0.2, 0.1], [0.3, 0.8, -0.5]]) # 2x3 weights
b1 = np.array([0.1, 0.0, -0.1])

W2 = np.array([[1.2], [-0.8], [0.4]]) # 3x1 weights
b2 = np.array([0.05])

# Forward pass
h = np.maximum(0, X @ W1 + b1) # ReLU activation
out = h @ W2 + b2

print("Hidden Representation h:", np.round(h, 3))
print("Final Output:", np.round(out, 3))
`,
        "content": `<h2>⚡ Lesson 2: Multi-Layer Perceptrons & Universal Approximation</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If a single neuron is limited to straight lines, what happens when you stack hundreds of them in layers with non-linear activations? The network gains the ability to <strong>bend, fold, and warp coordinate space</strong>.
</div>

<h3>🎯 The Origami Analogy: Folding Space</h3>
<p>Imagine red and blue dots painted on a single flat sheet of paper such that they cannot be separated by a straight scissors cut.</p>
<p>What if you fold the paper in half along a crease? Suddenly, all the red dots end up on the top fold, and all the blue dots end up on the bottom fold! Now, one straight cut separates them cleanly.</p>
<p>Each hidden layer in a neural network is essentially a folding of geometric space, transforming messy, tangled real-world data into a representation where classes become linearly separable!</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Universal Approximation Theorem (Cybenko, 1989; Hornik, 1991):</strong><br />
  A feedforward neural network with just <strong>one single hidden layer</strong> containing a finite number of non-linear neurons can approximate <em>any</em> continuous function on compact subsets of ℝⁿ to arbitrary precision!
  <br /><br />
  <em>The Catch:</em> While one giant wide layer can theoretically approximate anything, it might require an astronomical number of neurons (e.g. 10⁵⁰). <strong>Deeper networks</strong> (many layers) can approximate complex functions exponentially more efficiently by learning hierarchical features (edges &rarr; textures &rarr; parts &rarr; objects)!
</div>
`
      },
      {
        "title": "Activation Functions: Sigmoid, Tanh, ReLU, Leaky ReLU, ELU, GELU & Swish",
        "language": "python",
        "starterCode": `import numpy as np

x = np.array([-2.0, -0.5, 0.0, 0.5, 2.0])

# Modern Activations
relu = np.maximum(0, x)
gelu = 0.5 * x * (1 + np.tanh(np.sqrt(2 / np.pi) * (x + 0.044715 * x**3)))
swish = x / (1.0 + np.exp(-x)) # SiLU: x * sigmoid(x)

print("Input:", x)
print("ReLU: ", np.round(relu, 2))
print("GELU (Used in GPT/BERT):", np.round(gelu, 2))
print("Swish/SiLU (Used in LLaMA):", np.round(swish, 2))
`,
        "content": `<h2>⚡ Lesson 3: The Zoo of Activation Functions</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Without non-linear activation functions, stacking 100 neural network layers is completely pointless! Mathematically, a linear transformation of a linear transformation is just another single linear transformation: <code>W₃(W₂(W₁x)) = (W₃W₂W₁)x = W_total x</code>. Activation functions give neural networks the superpower to curve space.
</div>

<h3>🎯 Evolution of Activations</h3>

<div class="teacher-callout teacher-callout--trap">
  <strong>1. Sigmoid: σ(z) = 1 / (1 + e⁻ᶻ)</strong><br />
  Historical favorite, but has two fatal flaws:
  <ul>
    <li><strong>Vanishing Gradient:</strong> When <code>|z| &gt; 4</code>, the curve becomes completely flat. The derivative drops to near zero, freezing backpropagation!</li>
    <li><strong>Not Zero-Centered:</strong> Output is strictly positive [0, 1], causing zig-zagging gradient dynamics.</li>
  </ul>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>2. ReLU (Rectified Linear Unit): f(z) = max(0, z)</strong><br />
  The breakthrough of the 2010s! For positive values, the derivative is a constant <strong>1.0</strong>. Gradients flow backwards through dozens of layers without vanishing. Extremely fast to compute (just a simple CPU/GPU threshold comparison).
  <br />
  <em>Beware "Dying ReLU":</em> If a neuron gets pushed into the negative zone, its gradient becomes 0 permanently and it never wakes up.
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>3. Modern LLM Champions: GELU & Swish (SiLU)</strong><br />
  Modern foundation models (GPT-4, LLaMA-3, Claude) do not use plain ReLU. They use smooth, probabilistic activations:
  <ul>
    <li><strong>GELU (Gaussian Error Linear Unit):</strong> Weights inputs by their percentile in a standard normal distribution: <code>x &middot; Φ(x)</code>. Used in BERT, GPT-2, GPT-3, ViT.</li>
    <li><strong>Swish / SiLU:</strong> <code>x &middot; σ(x)</code>. Smooth, non-monotonic curve that outperforms ReLU in deep vision and language models. Used in LLaMA-3 (SwiGLU).</li>
  </ul>
</div>
`
      },
      {
        "title": "PyTorch Core Architecture: Tensors, Storage Strides, CUDA & Device Agnosticism",
        "language": "python",
        "starterCode": `import numpy as np

# Simulating device-agnostic PyTorch tensor patterns:
# device = "cuda" if torch.cuda.is_available() else ("mps" if torch.backends.mps.is_available() else "cpu")
device = "cuda:0" # Simulated GPU device handle

class MockTensor:
    def __init__(self, data, device="cpu"):
        self.data = np.array(data, dtype=np.float32)
        self.device = device
    
    def to(self, new_device):
        return MockTensor(self.data, device=new_device)

t = MockTensor([1.0, 2.0, 3.0])
t_gpu = t.to(device)

print(f"Tensor on device: {t_gpu.device} with shape: {t_gpu.data.shape}")
`,
        "content": `
<h2>⚡ Lesson 4: PyTorch Core Architecture: Tensors, Storage Strides, CUDA & Device Agnosticism</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  PyTorch separates the user-facing Tensor object from its underlying Storage buffer. Always write device-agnostic code to seamlessly support NVIDIA CUDA, Apple MPS, and CPU fallback.
</div>

<h3>Storage Buffers & Pointer Offsets</h3>
<p>Multiple tensors can share the same underlying contiguous 1D <code>Storage</code> array. Slicing, reshaping, and transposing alter the tensor's <code>shape</code>, <code>stride</code>, and <code>storage_offset</code> without copying a single byte of GPU memory!</p>
`
      },
      {
        "title": "Dynamic Computational Graphs: torch.autograd & Forward/Backward Propagation",
        "language": "python",
        "starterCode": `import numpy as np

# Simulating torch.autograd dynamic graph construction
# loss = (w * x - y)^2
x = 3.0
y = 10.0
w = 2.0 # prediction = 6.0

# Forward
pred = w * x
diff = pred - y
loss = diff ** 2

# Backward pass (Chain Rule: dloss/dw = dloss/ddiff * ddiff/dpred * dpred/dw)
dloss_ddiff = 2 * diff
ddiff_dpred = 1.0
dpred_dw = x

dloss_dw = dloss_ddiff * ddiff_dpred * dpred_dw

print("Loss:", loss)
print("dLoss/dw (Gradient):", dloss_dw)
`,
        "content": `<h2>⚡ Lesson 5: Computational Graphs & Autograd</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In the old days of machine learning, researchers spent weeks deriving partial derivatives on whiteboards by hand. If you changed your loss function, you had to re-derive everything from scratch! PyTorch's <strong>Autograd</strong> engine changed everything by turning calculus into automated software execution.
</div>

<h3>🎯 The Tape Recorder Analogy</h3>
<p>Imagine PyTorch as a smart audio tape recorder:</p>
<ol>
  <li><strong>Forward Pass:</strong> As you perform tensor operations (<code>y = w * x + b</code>), PyTorch records every operation and its mathematical recipe onto a dynamic Directed Acyclic Graph (DAG).</li>
  <li><strong>Loss Calculation:</strong> You compute a scalar error metric (e.g. MSE or CrossEntropy).</li>
  <li><strong>Backward Pass (<code>loss.backward()</code>):</strong> PyTorch hits "Rewind"! It plays the tape backward from the final loss, automatically applying the <strong>Chain Rule of calculus</strong> to calculate <code>∂Loss / ∂w</code> for every parameter where <code>requires_grad=True</code>!</li>
</ol>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Teacher's Memory Rule:</strong><br />
  When doing inference or evaluating on validation data, ALWAYS wrap your code in <code>with torch.no_grad():</code>! This tells PyTorch to stop recording the tape, saving over 50% of GPU VRAM and speeding up execution significantly.
</div>
`
      },
      {
        "title": "Object-Oriented Architecture with torch.nn.Module & Parameter Registration",
        "language": "python",
        "starterCode": `import numpy as np

# Python class mirroring torch.nn.Module structure
class LinearLayer:
    def __init__(self, in_features, out_features):
        # Kaiming uniform weight init simulation
        limit = np.sqrt(6.0 / in_features)
        self.weight = np.random.uniform(-limit, limit, (out_features, in_features))
        self.bias = np.zeros(out_features)
    
    def forward(self, x):
        return x @ self.weight.T + self.bias
    
    def __call__(self, x):
        return self.forward(x)

layer = LinearLayer(4, 2)
inp = np.random.randn(3, 4)
out = layer(inp)

print("Input Batch Shape:", inp.shape)
print("Output Batch Shape:", out.shape)
`,
        "content": `
<h2>⚡ Lesson 6: Object-Oriented Architecture with torch.nn.Module & Parameter Registration</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Every layer, block, and model in PyTorch inherits from torch.nn.Module. Understanding parameter registration, sub-module nesting, and hooks is essential for custom model architecture.
</div>

<h3>Parameter Registration</h3>
<p>Assigning an instance of <code>nn.Parameter</code> to an attribute inside an <code>nn.Module</code> automatically registers it in <code>self.parameters()</code>. This enables optimizers to track parameters recursively across arbitrarily deep sub-module hierarchies.</p>
`
      },
      {
        "title": "Data Ingestion: Custom torch.utils.data.Dataset, DataLoader & Batch Collation",
        "language": "python",
        "starterCode": `import numpy as np

# Custom Dataset pattern: __len__ and __getitem__
class SyntheticDataset:
    def __init__(self, size=100):
        self.data = np.random.randn(size, 8)
        self.labels = np.random.randint(0, 2, size=size)
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]

dataset = SyntheticDataset(size=50)
sample_x, sample_y = dataset[0]

print("Dataset Total Samples:", len(dataset))
print("Sample 0 Feature Dim:", sample_x.shape, "| Label:", sample_y)
`,
        "content": `
<h2>⚡ Lesson 7: Data Ingestion: Custom torch.utils.data.Dataset, DataLoader & Batch Collation</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  A GPU starved of data runs at 0% efficiency. High-performance ML requires multi-worker DataLoader pipelines with asynchronous memory pinning and dynamic sequence collation.
</div>

<h3>Key DataLoader Optimizations</h3>
<ul>
  <li><code>num_workers > 0</code>: Uses multi-process worker pools to load and preprocess data in the background while the GPU trains.</li>
  <li><code>pin_memory=True</code>: Allocates tensors in page-locked CPU host memory, accelerating DMA transfers to CUDA VRAM.</li>
  <li><code>collate_fn</code>: Custom batch assembly function. Essential for NLP to pad variable-length token sequences to the longest sequence in each batch dynamically.</li>
</ul>
`
      },
      {
        "title": "Weight Initialization Strategies: Xavier/Glorot vs He/Kaiming",
        "language": "python",
        "starterCode": `import numpy as np

fan_in, fan_out = 512, 512

# Xavier / Glorot Initialization (for Sigmoid / Tanh)
# Var(W) = 2 / (fan_in + fan_out)
std_xavier = np.sqrt(2.0 / (fan_in + fan_out))

# He / Kaiming Initialization (for ReLU / GELU)
# Var(W) = 2 / fan_in (accounts for half the neurons being zeroed by ReLU)
std_kaiming = np.sqrt(2.0 / fan_in)

print(f"Xavier Std Dev:  {round(std_xavier, 5)}")
print(f"Kaiming Std Dev: {round(std_kaiming, 5)} (Stronger variance to survive ReLU activation!)")
`,
        "content": `
<h2>⚡ Lesson 8: Weight Initialization Strategies: Xavier/Glorot vs He/Kaiming</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Initialize weights too small, and activations vanish to zero in deep layers; initialize weights too large, and activations explode to infinity. Principled variance preservation is key.
</div>

<h3>The Mathematical Derivation</h3>
<p>To preserve signal variance Var(y) = Var(x) through linear layer y = Wx:</p>
<ul>
  <li><strong>Xavier/Glorot:</strong> Assumes symmetric linear/tanh activations: W sim Normal distribution <em>N</em>≤ft(0, (2 / fan<sub>i</sub>n + fan<sub>o</sub>ut)right).</li>
  <li><strong>He/Kaiming:</strong> Accounts for ReLU zeroing out exactly half the distribution: W sim Normal distribution <em>N</em>≤ft(0, (2 / fan<sub>i</sub>n)right). Standard in all modern deep networks.</li>
</ul>
`
      }
    ],
    "exercises": [
      {
        "title": "Build and Train a Modular Deep Feedforward Network in Pure Python/NumPy",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an MLP with ReLU and Backpropagation</h3>
<p>Complete the forward pass and backpropagation for a 2-layer neural network with ReLU hidden activations.</p>
`,
        "starterCode": `import numpy as np

def train_mlp_step(X, y, W1, b1, W2, b2, lr=0.1):
    N = X.shape[0]
    # 1. Forward Pass
    z1 = X @ W1 + b1
    h1 = np.maximum(0, z1) # ReLU
    scores = h1 @ W2 + b2
    probs = 1.0 / (1.0 + np.exp(-np.clip(scores, -20, 20)))
    
    # Loss: BCE
    loss = -np.mean(y * np.log(probs + 1e-12) + (1 - y) * np.log(1 - probs + 1e-12))
    
    # 2. Backward Pass
    dscores = (probs - y) / N
    dW2 = h1.T @ dscores
    db2 = np.sum(dscores, axis=0)
    
    dh1 = dscores @ W2.T
    dz1 = dh1 * (z1 > 0) # ReLU derivative
    dW1 = X.T @ dz1
    db1 = np.sum(dz1, axis=0)
    
    # 3. Update
    W1 -= lr * dW1
    b1 -= lr * db1
    W2 -= lr * dW2
    b2 -= lr * db2
    
    return float(loss), W1, b1, W2, b2

# Test run
np.random.seed(42)
X = np.array([[0.5, 0.2], [-0.3, 0.8]])
y = np.array([[1.0], [0.0]])
W1 = np.random.randn(2, 4) * 0.1
b1 = np.zeros(4)
W2 = np.random.randn(4, 1) * 0.1
b2 = np.zeros(1)

initial_loss, W1, b1, W2, b2 = train_mlp_step(X, y, W1, b1, W2, b2)
print("Initial Loss:", round(initial_loss, 3))
print("Step executed without errors: True")
`,
        "expectedOutput": "Step executed without errors: True",
        "hints": [
          "ReLU derivative is 1 for z > 0 and 0 otherwise.",
          "Ensure shapes align during transpose matrix multiplications."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why is He/Kaiming initialization preferred over Xavier initialization when using ReLU activation functions?",
        "options": [
          "Because Xavier initialization is mathematically invalid for GPUs.",
          "Because ReLU sets all negative activations to zero, cutting the output variance in half. Kaiming initialization compensates by doubling the variance (using 2 / fan_in instead of 1 / fan_in).",
          "Because Kaiming initialization eliminates the bias term.",
          "Because Xavier initialization requires calculating the Hessian."
        ],
        "correctIndex": 1,
        "explanation": "ReLU drops half the inputs on average, cutting activation variance by half. Kaiming initialization multiplies the variance by 2 to prevent signals from fading to zero in deep networks."
      },
      {
        "question": "What is the primary role of pin_memory=True in a PyTorch DataLoader?",
        "options": [
          "It locks the model weights in CPU cache.",
          "It allocates host tensors in pinned (page-locked) CPU memory, enabling much faster direct DMA transfer to CUDA GPU memory.",
          "It saves memory by compressing floats to 8-bit integers.",
          "It disables gradients during data preprocessing."
        ],
        "correctIndex": 1,
        "explanation": "Pinned memory allows the GPU to use Direct Memory Access (DMA) to copy tensors directly from host RAM without CPU operating system paging overhead."
      }
    ]
  },

  "ml-week-9": {
    "lessons": [
      {
        "title": "Underfitting vs Overfitting Diagnostics: Learning Curves",
        "language": "python",
        "starterCode": `import numpy as np

# Diagnostic Rules of Learning Curves:
# High Bias (Underfitting): Both Train and Val loss plateau at unacceptable high error.
# High Variance (Overfitting): Train loss keeps plummeting to 0 while Val loss starts climbing upward.
print("Learning Curve Diagnostics: The Gap between Train and Validation Loss reveals generalization error.")
`,
        "content": `
<h2>⚖️ Lesson 1: Underfitting vs Overfitting Diagnostics: Learning Curves</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Before changing your model architecture, plot the training and validation loss curves. The shape of the gap precisely diagnoses whether you suffer from high bias (underfitting) or high variance (overfitting).
</div>

<h3>Diagnostic Prescriptions</h3>
<ul>
  <li><strong>Underfitting:</strong> Increase model capacity (deeper network, wider layers), reduce regularization penalty, or add richer input features.</li>
  <li><strong>Overfitting:</strong> Add data augmentation, increase dropout, enable weight decay, collect more data, or apply early stopping.</li>
</ul>
`
      },
      {
        "title": "Regularization: L2 Weight Decay, L1 Penalty & DropConnect",
        "language": "python",
        "starterCode": `import numpy as np

# Weight Decay update formula:
# W_{t+1} = (1 - lr * weight_decay) * W_t - lr * grad_W
w = np.array([2.0, -1.5, 0.5])
lr = 0.01
decay = 0.05
grad = np.array([0.1, -0.05, 0.02])

w_next = (1.0 - lr * decay) * w - lr * grad
print("Updated Weights with Weight Decay:", np.round(w_next, 4))
`,
        "content": `<h2>⚖️ Lesson 2: Deep Learning Regularization: Weight Decay</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Modern deep neural networks often have more parameters than training samples (e.g. 10 million parameters for 50,000 images). If left unconstrained, the network will simply memorize every training pixel, including background noise and watermarks! Regularization forces the network to learn compact, generalizable rules.
</div>

<h3>🎯 Weight Decay in Deep Learning</h3>
<p>In standard L2 regularization, we add a penalty proportional to the sum of squared weights: <code>λ ∑ w²</code>. In gradient descent, this modifies the update rule:</p>

<div class="math-formula">
  w &larr; w - α ( ∇Loss + λ w ) = (1 - α λ) w - α ∇Loss
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Slow Leak Analogy:</strong><br />
  Notice the factor <code>(1 - α λ)</code>! At every single optimization step, every weight is multiplied by a number slightly less than 1.0 (e.g. 0.9999). It is like a slow tire leak: unless a weight actively proves that it is essential for reducing the loss, it will slowly shrink toward zero!
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Adam vs AdamW: The Landmark Discovery</strong><br />
  In 2017, Loshchilov & Hutter proved that standard Adam implemented L2 regularization incorrectly when combined with adaptive learning rates. They created <strong>AdamW (Decoupled Weight Decay)</strong>, which applies weight decay directly to the weights outside the momentum buffer. Today, AdamW is the universal standard optimizer for transformers and LLMs!
</div>
`
      },
      {
        "title": "Dropout Mechanics: Inverted Dropout at Training vs Inference",
        "language": "python",
        "starterCode": `import numpy as np

def inverted_dropout(h, p=0.2, training=True):
    if not training or p == 0:
        return h
    # Scale by 1/(1-p) during training so inference requires NO scaling!
    mask = (np.random.rand(*h.shape) >= p) / (1.0 - p)
    return h * mask

activations = np.ones((2, 5))
dropped = inverted_dropout(activations, p=0.4, training=True)

print("Inverted Dropout Output (Zeroed neurons scaled by 1/(1-p)):")
print(np.round(dropped, 2))
`,
        "content": `<h2>⚖️ Lesson 3: Dropout Mechanics: Inverted Dropout</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In 2012, Geoffrey Hinton and his team introduced a radical idea: <em>what if during training, we randomly switch off half the neurons in the network on every single forward pass?</em>
</div>

<h3>🎯 The Bank Teller Analogy</h3>
<p>Geoffrey Hinton was inspired by fraud prevention in banking:</p>
<p><em>"If bank tellers conspire together, they can coordinate fraud. But if the bank frequently shuffles staff randomly between branches, no conspiracy can form—every employee must learn to do their job independently!"</em></p>
<p>In a neural network, neurons often become lazy by relying on co-adaptations (relying on a neighbor neuron to catch their mistakes). <strong>Dropout</strong> breaks co-adaptations: because any neuron might vanish at any millisecond, every neuron must learn robust, independent representations!</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Inverted Dropout: Why Scale During Training?</strong><br />
  If you drop 50% of neurons (dropout probability p = 0.5), the total sum of activations during training would be halved compared to testing!
  <br />
  Rather than scaling down activations at test time, modern frameworks use <strong>Inverted Dropout</strong>: during training, remaining activations are scaled UP by <code>1 / (1 - p)</code>:
  <div class="math-formula">y = (mask &middot; x) / (1 - p)</div>
  Now at test time, you do zero extra math—just turn dropout off completely (<code>model.eval()</code>)!
</div>
`
      },
      {
        "title": "Normalization Layers: Batch Normalization Mechanics & Running Stats",
        "language": "python",
        "starterCode": `import numpy as np

# BatchNorm computes batch mean and variance across the batch dimension
batch = np.array([[1.0, 10.0], [2.0, 20.0], [3.0, 30.0]]) # 3 samples, 2 features
mu_B = np.mean(batch, axis=0)
var_B = np.var(batch, axis=0)

batch_normed = (batch - mu_B) / np.sqrt(var_B + 1e-5)
print("Batch Normalized (Col means ≈ 0, vars ≈ 1):")
print(np.round(batch_normed, 2))
`,
        "content": `<h2>⚖️ Lesson 4: Batch Normalization Mechanics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  As deep networks train, the weights in early layers change constantly. This means the input distribution to layer 20 changes every single batch! Layer 20 is constantly trying to hit a moving target. Sergey Ioffe and Christian Szegedy (2015) called this <strong>Internal Covariate Shift</strong> and solved it with <strong>Batch Normalization (BatchNorm)</strong>.
</div>

<h3>🎯 The Mechanics: Zero Mean, Unit Variance</h3>
<p>For every mini-batch of size <em>B</em>, BatchNorm calculates the batch mean and batch variance across the batch dimension, normalizes the activations, and then scales and shifts them with two learnable parameters (γ and β):</p>

<div class="math-formula">
  x̂ = (x - μ<sub>B</sub>) / √(σ<sub>B</sub>² + ε),    y = γ x̂ + β
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Why Learnable Scale (γ) and Shift (β)?</strong><br />
  If strictly forcing mean 0 and variance 1 destroys important information, the network can easily learn <code>γ = σ</code> and <code>β = μ</code> to undo the normalization! The network has the freedom to choose its own optimal activation scale.
</div>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The Fatal Flaw of BatchNorm:</strong><br />
  BatchNorm depends on having a large batch size (e.g. B &ge; 32) to compute accurate statistics. For small batches (B = 2) or variable-length sequences (NLP and LLMs), BatchNorm fails completely! That is why Transformers use <strong>Layer Normalization</strong> instead.
</div>
`
      },
      {
        "title": "Modern Normalization: Layer Normalization, Group Normalization & RMSNorm",
        "language": "python",
        "starterCode": `import numpy as np

# LayerNorm normalizes across the feature dimension for EACH sample independently!
sample = np.array([2.0, 4.0, 6.0, 8.0])
mu_L = np.mean(sample)
var_L = np.var(sample)
ln_out = (sample - mu_L) / np.sqrt(var_L + 1e-5)

# RMSNorm (used in LLaMA): Skips mean centering, scales only by Root Mean Square
rms = np.sqrt(np.mean(sample**2) + 1e-5)
rmsnorm_out = sample / rms

print("LayerNorm: ", np.round(ln_out, 3))
print("RMSNorm (LLaMA):", np.round(rmsnorm_out, 3))
`,
        "content": `<h2>⚖️ Lesson 5: Modern Normalization: LayerNorm & RMSNorm</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If BatchNorm normalizes across the batch dimension (vertically), <strong>Layer Normalization (LayerNorm)</strong> normalizes across the feature dimension (horizontally) for each individual sample independently!
</div>

<h3>🎯 BatchNorm vs LayerNorm Visualized</h3>
<ul>
  <li><strong>BatchNorm:</strong> Computes mean and variance across all <em>different samples</em> in the batch for a single feature. Requires large batches and breaks if batch size = 1.</li>
  <li><strong>LayerNorm:</strong> Computes mean and variance across all <em>hidden features</em> of a single token. Completely independent of batch size! Works perfectly for streaming, batch size 1, and variable-length text.</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ RMSNorm: The Speed Secret of Modern LLMs (LLaMA-3, Mistral)</strong><br />
  In 2019, Zhang & Sennrich asked a provocative question: <em>Do we actually need to calculate and subtract the mean (μ) in LayerNorm?</em>
  <br />
  They discovered that 99% of LayerNorm's benefits come from scaling by the variance, not shifting the mean! <strong>RMSNorm (Root Mean Square Normalization)</strong> skips mean subtraction entirely:
  <div class="math-formula">x̂ = x / RMS(x),   where RMS(x) = √( (1/d) ∑ x<sub>i</sub>² + ε )</div>
  This saves 7%–10% of training time per step on GPUs with zero loss in model accuracy!
</div>
`
      },
      {
        "title": "Learning Rate Schedulers: Cosine Annealing, OneCycleLR & Warmup",
        "language": "python",
        "starterCode": `import numpy as np

# Cosine Annealing Schedule with Warmup:
# Initial warmup from 0 to lr_max, then smooth cosine decay to lr_min
def cosine_lr(step, total_steps=1000, warmup_steps=100, lr_max=1e-3, lr_min=1e-5):
    if step < warmup_steps:
        return lr_max * (step / warmup_steps)
    progress = (step - warmup_steps) / (total_steps - warmup_steps)
    return lr_min + 0.5 * (lr_max - lr_min) * (1.0 + np.cos(np.pi * progress))

print("Step 50 (Warmup):", round(cosine_lr(50), 6))
print("Step 100 (Peak):  ", round(cosine_lr(100), 6))
print("Step 550 (Mid):   ", round(cosine_lr(550), 6))
print("Step 1000 (Min):  ", round(cosine_lr(1000), 6))
`,
        "content": `<h2>⚡ Lesson 5: Learning Rate Schedulers & Warmup Dynamics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Setting a static learning rate for an entire training run is like driving a car with a brick on the accelerator! At the start of training, your weights are random chaos—take steps that are too aggressive, and the network will explode. Near the end of training, you are navigating delicate local valleys—take steps that are too large, and you will overshoot the optimal minimum. Schedulers dynamically adapt your velocity.
</div>

<h3>🎯 Warmup: Why Start Slow?</h3>
<p>In modern deep learning and transformer training, we almost always use <strong>Linear Warmup</strong> for the first 500 to 2,000 steps. We start with a tiny learning rate near 0, and ramp it up linearly to the target learning rate.</p>
<p>Why? Because in the very first few batches, adaptive optimizers like Adam have empty momentum and variance buffers. Warmup prevents premature weight destruction during this unstable initialization phase!</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Cosine Annealing: The Gold Standard Decay</strong><br />
  After warmup, how should the learning rate decrease?
  <ul>
    <li><strong>Step Decay:</strong> Drops the learning rate abruptly by 10x every 30 epochs. Creates jerky, sudden learning shifts.</li>
    <li><strong>Cosine Annealing:</strong> Decays smoothly following a cosine curve:
      <div class="math-formula">η<sub>t</sub> = η<sub>min</sub> + ½ (η<sub>max</sub> - η<sub>min</sub>) ( 1 + cos(π t / T<sub>max</sub>) )</div>
      It provides a gentle glide path that lets the model explore widely in the middle epochs and settle precisely into flat, robust minima at the end!
    </li>
  </ul>
</div>
`
      },
      {
        "title": "Numerical Stability: Gradient Clipping (Norm vs Value) & NaN Diagnostics",
        "language": "python",
        "starterCode": `import numpy as np

# Gradient Clipping by Global L2 Norm
grads = [np.array([10.0, 20.0]), np.array([30.0, 40.0])]
max_norm = 5.0

# 1. Compute global L2 norm
total_norm = np.sqrt(sum(np.sum(g**2) for g in grads))
print("Original Global Norm:", round(total_norm, 2))

# 2. Clip if exceeds max_norm
if total_norm > max_norm:
    clip_factor = max_norm / (total_norm + 1e-6)
    clipped_grads = [g * clip_factor for g in grads]
else:
    clipped_grads = grads

new_norm = np.sqrt(sum(np.sum(g**2) for g in clipped_grads))
print("Clipped Global Norm:", round(new_norm, 2))
`,
        "content": `<h2>⚡ Lesson 6: Gradient Clipping & Numerical Stability</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Nothing ruins a deep learning engineer's day faster than checking on a 14-hour training run only to see <code>Loss: NaN</code>! A single catastrophic gradient spike can throw your weights into astronomical numbers, causing IEEE 754 floating point overflow.
</div>

<h3>🎯 Gradient Clipping: Putting a Speed Limiter on the Optimizer</h3>
<p>When training recurrent networks, transformers, or deep RL agents, steep cliffs in the loss landscape occasionally produce gigantic gradient vectors. <strong>Gradient Clipping</strong> places a ceiling on how large an update can be:</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Clip by Norm vs Clip by Value:</strong>
  <ul>
    <li><strong>Clip by Value:</strong> Hard caps every individual gradient entry: <code>g<sub>i</sub> = clip(g<sub>i</sub>, -c, c)</code>. <em>Dangerous:</em> It distorts the actual direction of the gradient vector!</li>
    <li><strong>Clip by Norm (The Industry Standard):</strong> Scales the entire gradient vector down proportionally if its total L2 Euclidean norm exceeds a threshold <code>max_norm</code>:
      <div class="math-formula"><strong>g</strong> &larr; <strong>g</strong> &times; ( max_norm / max(||<strong>g</strong>||₂, max_norm) )</div>
      This preserves the <strong>exact direction</strong> of steepest descent while guaranteeing the step length never exceeds <code>max_norm</code>!
    </li>
  </ul>
</div>
`
      },
      {
        "title": "Mixed Precision Training: FP16 / BF16 & torch.cuda.amp",
        "language": "python",
        "starterCode": `import numpy as np

# Float Formats:
# FP32: 1 sign, 8 exponent, 23 mantissa (Standard single precision)
# FP16: 1 sign, 5 exponent, 10 mantissa (Prone to underflow, requires Loss Scaling!)
# BF16: 1 sign, 8 exponent, 7 mantissa (Same dynamic range as FP32, ideal for Deep Learning!)
print("BF16 (Bfloat16) matches FP32 exponent range: eliminates gradient underflow without loss scalers!")
`,
        "content": `<h2>⚡ Lesson 7: Mixed Precision Training (FP16 & BF16)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Historically, all scientific computing ran in 32-bit floating point precision (FP32). But deep learning is astonishingly resilient to small rounding errors! By switching from 32-bit to 16-bit precision, you cut GPU memory consumption in half and unlock Tensor Core hardware speeds that are <strong>2x to 4x faster</strong>!
</div>

<h3>🎯 FP16 vs BF16: Understanding the Bit Layout</h3>
<p>Both formats use 16 bits of memory (2 bytes instead of 4), but distribute their bits differently:</p>

<table class="comparison-table">
  <thead>
    <tr><th>Format</th><th>Sign Bit</th><th>Exponent (Range)</th><th>Mantissa (Precision)</th><th>Best Use Case</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>FP32 (Standard)</strong></td><td>1 bit</td><td>8 bits</td><td>23 bits</td><td>Master weight copies, loss calculation</td></tr>
    <tr><td><strong>FP16 (Half)</strong></td><td>1 bit</td><td>5 bits</td><td>10 bits</td><td>Requires GradScaler to prevent underflow</td></tr>
    <tr><td><strong>BF16 (Bfloat16)</strong></td><td>1 bit</td><td>8 bits</td><td>7 bits</td><td><strong>Universal standard for modern LLMs!</strong> Has the exact same dynamic range as FP32, so it never underflows!</td></tr>
  </tbody>
</table>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Automatic Mixed Precision (AMP) in PyTorch:</strong><br />
  PyTorch provides <code>torch.cuda.amp.autocast()</code>: it automatically runs fast matrix multiplications and convolutions in 16-bit, while keeping sensitive operations (like Softmax and reductions) in stable 32-bit!
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "PyTorch Training Harness with Checkpointing and Early Stopping",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an Early Stopping Controller</h3>
<p>Implement an <code>EarlyStopping</code> monitor class that tracks validation loss and flags <code>should_stop = True</code> if validation loss fails to improve for <code>patience</code> consecutive epochs.</p>
`,
        "starterCode": `class EarlyStopping:
    def __init__(self, patience=3, min_delta=0.0):
        self.patience = patience
        self.min_delta = min_delta
        self.best_loss = float('inf')
        self.counter = 0
        self.should_stop = False

    def step(self, val_loss):
        if val_loss < self.best_loss - self.min_delta:
            self.best_loss = val_loss
            self.counter = 0
        else:
            self.counter += 1
            if self.counter >= self.patience:
                self.should_stop = True
        return self.should_stop

# Simulate validation losses: improving then worsening
losses = [0.8, 0.6, 0.5, 0.52, 0.54, 0.55]
monitor = EarlyStopping(patience=3)

stopped_at_epoch = None
for epoch, loss in enumerate(losses):
    if monitor.step(loss):
        stopped_at_epoch = epoch
        break

print("Early Stopping Triggered at Epoch:", stopped_at_epoch)
print("Best Validation Loss Saved:", monitor.best_loss)
`,
        "expectedOutput": "Early Stopping Triggered at Epoch: 5\nBest Validation Loss Saved: 0.5",
        "hints": [
          "Reset counter to 0 when loss improves; increment counter when loss worsens."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why is Bfloat16 (BF16) preferred over FP16 for training Large Language Models?",
        "options": [
          "BF16 uses only 8 bits instead of 16 bits.",
          "BF16 allocates 8 bits to the exponent (identical to FP32), preserving the full dynamic range and eliminating numerical gradient underflow without requiring complex loss scaling.",
          "BF16 has higher mantissa precision than FP32.",
          "BF16 is supported on older CPU chips."
        ],
        "correctIndex": 1,
        "explanation": "FP16 only has 5 exponent bits, causing small gradients to underflow to zero. BF16 has 8 exponent bits (same dynamic range as FP32), preventing underflow."
      },
      {
        "question": "What is the difference between Batch Normalization and Layer Normalization?",
        "options": [
          "BatchNorm normalizes across the batch dimension for each channel independently; LayerNorm normalizes across the feature channels for each sample independently.",
          "LayerNorm requires batch size to be at least 1024.",
          "BatchNorm can only be used on GPUs.",
          "LayerNorm is an unsupervised clustering algorithm."
        ],
        "correctIndex": 0,
        "explanation": "BatchNorm computes statistics across samples in a batch. LayerNorm computes statistics across features within each individual sample."
      }
    ]
  },

  "ml-week-10": {
    "lessons": [
      {
        "title": "Limitations of Dense Networks for Images: Spatial Invariance",
        "language": "python",
        "starterCode": `import numpy as np

# A 224x224 RGB image flattened into a dense layer with 4096 hidden units:
image_pixels = 224 * 224 * 3 # 150,528 inputs
hidden_units = 4096
weight_count = image_pixels * hidden_units

print(f"Flattened Input Size: {image_pixels:,} floats")
print(f"Single Dense Layer Weights: {weight_count:,} parameters (~616 Million parameters for 1 layer!)")
print("CNNs solve this through Local Receptive Fields and Weight Sharing.")
`,
        "content": `
<h2>👁️ Lesson 1: Limitations of Dense Networks for Images: Spatial Invariance</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If you flatten a 4K image into an MLP, parameter counts explode into the billions on the first layer alone, destroying spatial locality. Convolutional networks use local receptive fields and weight sharing to achieve translation equivariance.
</div>
`
      },
      {
        "title": "The Convolutional Operation: Kernels, Filters & Cross-Correlation",
        "language": "python",
        "starterCode": `import numpy as np

# 2D 3x3 Edge Detection Sobel Kernel
sobel_x = np.array([
    [-1.0, 0.0, 1.0],
    [-2.0, 0.0, 2.0],
    [-1.0, 0.0, 1.0]
])

# 3x3 Image patch with vertical edge
patch = np.array([
    [10.0, 10.0, 80.0],
    [10.0, 10.0, 80.0],
    [10.0, 10.0, 80.0]
])

# 2D cross-correlation (element-wise product and sum)
edge_response = np.sum(sobel_x * patch)
print("Sobel Edge Response:", edge_response)
`,
        "content": `<h2>👁️ Lesson 2: The Convolutional Operation</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If you connect every pixel of a 1,000 &times; 1,000 color image to a regular neural network layer with 1,000 neurons, you would need <strong>3 BILLION weights</strong> for just one single layer! The model would run out of memory instantly and overfit to high heaven. How does human vision solve this? We use local feature detectors that work everywhere!
</div>

<h3>🎯 The Sliding Stencil Analogy</h3>
<p>Imagine holding a small 3 &times; 3 cardboard stencil with cutouts that detect vertical edges. You slide this stencil across every position on a photograph from top-left to bottom-right. Everywhere you find a vertical edge, you make a mark on your paper.</p>
<p>That is a <strong>Convolutional Kernel</strong>! Instead of learning billions of separate weights for every pixel, the network learns one tiny 3 &times; 3 matrix of numbers that slides across the entire image!</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Two Superpowers of CNNs:</strong>
  <ul>
    <li><strong>Weight Sharing:</strong> The exact same 3 &times; 3 kernel weights are reused across every single pixel location. Parameters drop from millions to just 9 weights!</li>
    <li><strong>Translation Invariance:</strong> A cat's ear has the same shape whether the cat is sitting in the top-left corner or sleeping in the bottom-right corner. The kernel detects it everywhere equally!</li>
  </ul>
</div>
`
      },
      {
        "title": "Spatial Geometry: Padding (Valid vs Same), Stride & Dilations",
        "language": "python",
        "starterCode": `import numpy as np

# Output dimension formula:
# O = floor((W - K + 2P) / S) + 1
W = 32 # Input width
K = 3  # Kernel size
P = 1  # Padding
S = 1  # Stride

out_dim = int(np.floor((W - K + 2 * P) / S) + 1)
print(f"Input: {W}x{W} -> Output: {out_dim}x{out_dim} ('Same' padding preserves dimensions!)")
`,
        "content": `<h2>👁️ Lesson 3: Spatial Geometry: Padding, Stride & Dilation</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Every time a 3 &times; 3 convolutional filter slides across an image, the output feature map shrinks by 2 pixels along each dimension. If you stack 10 layers, a 32 &times; 32 image shrinks to 12 &times; 12, and the edges of the image are barely inspected! Spatial geometry controls how dimensions evolve through the network.
</div>

<h3>🎯 The Convolution Output Size Formula</h3>
<p>Commit this master formula to memory—it is asked in every computer vision interview:</p>

<div class="math-formula">
  Output_Size = ⌊ (Input_Size - Kernel_Size + 2 &times; Padding) / Stride ⌋ + 1
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Three Levers:</strong>
  <ul>
    <li><strong>Padding (Valid vs Same):</strong> <em>"Valid"</em> means 0 padding (the image shrinks). <em>"Same"</em> means adding border pixels (usually zeros) so the output spatial dimensions exactly match the input dimensions (e.g. padding = 1 for a 3 &times; 3 kernel).</li>
    <li><strong>Stride:</strong> The step size of the sliding stencil. Stride = 1 moves 1 pixel at a time; Stride = 2 skips every other pixel, downsampling the spatial resolution by 50% without needing a separate pooling layer!</li>
    <li><strong>Dilation (Atrous Convolution):</strong> Expands the kernel by inserting spaces between weights. Increases the <strong>Receptive Field</strong> exponentially without increasing parameter count! Used in audio models (WaveNet) and semantic segmentation.</li>
  </ul>
</div>
`
      },
      {
        "title": "Downsampling & Receptive Fields: Max Pooling vs Average Pooling",
        "language": "python",
        "starterCode": `import numpy as np

# Max Pooling 2x2 with Stride 2
patch_4x4 = np.array([
    [1, 3, 2, 4],
    [5, 6, 7, 8],
    [3, 2, 1, 0],
    [9, 4, 2, 1]
])

pooled = np.array([
    [np.max(patch_4x4[0:2, 0:2]), np.max(patch_4x4[0:2, 2:4])],
    [np.max(patch_4x4[2:4, 0:2]), np.max(patch_4x4[2:4, 2:4])]
])

print("2x2 Max Pooled Matrix (Selects dominant feature activations):")
print(pooled)
`,
        "content": `
<h2>👁️ Lesson 4: Downsampling & Receptive Fields: Max Pooling vs Average Pooling</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Pooling progressively downsamples spatial dimensions, expanding the receptive field of subsequent layers while providing translational invariance.
</div>
`
      },
      {
        "title": "Foundational Architectures: LeNet, AlexNet & VGG (3x3 Factorization)",
        "language": "python",
        "starterCode": `import numpy as np

# VGG Insight: Stacking two 3x3 convolutions has the exact same receptive field (5x5)
# as one 5x5 convolution, but uses fewer parameters!
params_5x5 = 5 * 5 * 1 # 25 weights
params_two_3x3 = 2 * (3 * 3 * 1) # 18 weights (28% parameter reduction + extra non-linearity!)

print(f"One 5x5 Kernel Params: {params_5x5}")
print(f"Two 3x3 Kernels Params: {params_two_3x3}")
`,
        "content": `<h2>👁️ Lesson 5: Vision Architectures: LeNet, AlexNet & VGG</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  To appreciate modern vision models, we must understand the three evolutionary milestones that brought deep learning from academic obscurity to the forefront of technology.
</div>

<h3>🎯 The Three Milestones</h3>
<ul>
  <li><strong>LeNet-5 (Yann LeCun, 1998):</strong> The pioneer! Designed to recognize handwritten zip codes on checks for US banks. Established the classic pattern: <code>Conv &rarr; Pool &rarr; Conv &rarr; Pool &rarr; Fully Connected</code>.</li>
  <li><strong>AlexNet (Krizhevsky, Sutskever, Hinton, 2012):</strong> The Big Bang of modern AI! Won the ImageNet challenge by an unprecedented margin of 10.8%. Key innovations: trained on GPUs, used ReLU instead of Sigmoid, and introduced Dropout to prevent overfitting on 60 million parameters.</li>
  <li><strong>VGG-16 / VGG-19 (Simonyan & Zisserman, 2014):</strong> Proved that depth and simplicity beat large filters!</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The VGG Genius: 3 &times; 3 Factorization:</strong><br />
  Why did VGG replace AlexNet's 7 &times; 7 and 11 &times; 11 filters with tiny 3 &times; 3 filters?
  <br /><br />
  Two stacked 3 &times; 3 convolutional layers cover an effective <strong>5 &times; 5 receptive field</strong>, but use only <code>2 &times; (3² &times; C) = 18 C</code> parameters instead of <code>5² &times; C = 25 C</code> (a 28% reduction)! Furthermore, stacking two layers introduces <strong>two non-linear activations</strong> instead of one, allowing the network to learn much richer, more discriminative representations!
</div>
`
      },
      {
        "title": "Deep Residual Networks (ResNet): Skip Connections & Identity Mapping",
        "language": "python",
        "starterCode": `import numpy as np

# ResNet Residual Bottleneck: F(x) + x
# Gradients flow directly through identity connection without vanishing: d(F+x)/dx = dF/dx + 1
print("ResNet Identity Gradient Shortcut: ∂(F(x) + x) / ∂x = ∂F/∂x + I")
print("Even if ∂F/∂x vanishes to 0, the gradient 1 passes straight through backwards!")
`,
        "content": `<h2>👁️ Lesson 6: Deep Residual Networks (ResNet)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In 2015, computer vision researchers hit a wall. In theory, deeper networks should always perform at least as well as shallow networks (since extra layers could just learn the identity function). But in practice, a 56-layer network had <em>higher training error</em> than a 20-layer network! Kaiming He and his team resolved this crisis with one of the most influential papers in AI history: <strong>ResNet</strong>.
</div>

<h3>🎯 The Express Elevator: The Skip Connection</h3>
<p>Imagine a skyscraper with 150 floors. If you have to take a rickety staircase through every single floor, by floor 80 you are exhausted and out of breath (the gradient has vanished!).</p>
<p>Kaiming He added an <strong>express elevator</strong> (a skip connection):</p>

<div class="math-formula">
  <strong>y</strong> = F(<strong>x</strong>) + <strong>x</strong>
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Why F(x) + x is Pure Genius:</strong><br />
  Instead of forcing the layer to learn the entire output mapping from scratch, the layer only needs to learn the <strong>residual difference</strong> <code>F(x) = y - x</code>!
  <br /><br />
  If an extra layer isn't needed, the optimizer simply sets its weights to zero (<code>F(x) = 0</code>), and the input <code>x</code> passes through completely unharmed (<code>y = 0 + x = x</code>). During backpropagation, the gradient flows directly through the <code>+ x</code> identity highway all the way back to the earliest layers with zero attenuation!
</div>
`
      },
      {
        "title": "Transfer Learning & Fine-Tuning Pretrained Vision Models",
        "language": "python",
        "starterCode": `import numpy as np

# Transfer Learning Strategy:
# 1. Freeze backbone features (feature extractor)
# 2. Train custom classification head on new dataset
# 3. (Optional) Unfreeze top blocks and fine-tune with tiny learning rate (1e-5)
print("Transfer Learning: Leverages general visual primitives (edges, textures) learned from millions of images.")
`,
        "content": `<h2>👁️ Lesson 7: Transfer Learning & Pretrained Vision Backbones</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Training a vision model from scratch requires millions of labeled images, hundreds of GPU hours, and weeks of tuning. In production, you almost <strong>never</strong> train from scratch. You leverage <strong>Transfer Learning</strong>: taking a network trained on millions of diverse images (ImageNet) and adapting it to your specific task with just a few hundred samples!
</div>

<h3>🎯 The Hierarchical Feature Pyramid</h3>
<p>Early convolutional layers learn universal visual primitives: horizontal edges, vertical gradients, color contrasts, and simple textures. These features are identical whether you are classifying MRI scans, satellite photos, or self-driving car cameras!</p>
<p>Only the final layers learn task-specific concepts (e.g. dog breeds vs tumor patterns).</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Two Fine-Tuning Strategies:</strong>
  <ul>
    <li><strong>Feature Extraction (Linear Probing):</strong> Freeze the entire convolutional backbone (set <code>param.requires_grad = False</code>) and replace only the final classification head (<code>model.fc</code>). Fast, lightweight, and prevents overfitting on small datasets (&lt; 1,000 images).</li>
    <li><strong>Full Fine-Tuning with Differential Learning Rates:</strong> Unfreeze the entire network, but train the early layers with a very small learning rate (e.g. 1e-5) to preserve universal features, while training the new head with a higher learning rate (e.g. 1e-3). Yields highest possible accuracy!</li>
  </ul>
</div>
`
      },
      {
        "title": "Object Detection & Segmentation Overview: YOLO, IoU & NMS",
        "language": "python",
        "starterCode": `import numpy as np

# Intersection over Union (IoU) between bounding boxes
def compute_iou(box1, box2):
    # box format: [x1, y1, x2, y2]
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])
    
    intersection = max(0, x2 - x1) * max(0, y2 - y1)
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union = area1 + area2 - intersection
    return intersection / union if union > 0 else 0.0

b1 = [10, 10, 50, 50]
b2 = [20, 20, 50, 50]
print("Intersection over Union (IoU):", round(compute_iou(b1, b2), 3))
`,
        "content": `<h2>👁️ Lesson 8: Object Detection: YOLO, IoU & Non-Maximum Suppression</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Image classification answers: <em>"What is in this picture?"</em>. Object detection answers: <em>"What is in this picture, AND WHERE IS IT?"</em>. The model must output both class probabilities and precise spatial bounding box coordinates <code>[x, y, width, height]</code> for multiple objects simultaneously.
</div>

<h3>🎯 The Three Pillars of Modern Object Detection</h3>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>1. YOLO (You Only Look Once):</strong><br />
  Before YOLO, systems used two stages: proposing 2,000 potential object regions and then classifying each one (taking seconds per frame). YOLO frames detection as a <strong>single regression problem</strong>: it divides the image into an S &times; S grid and predicts all bounding boxes and class probabilities in a single forward pass, running at 60+ FPS in real time!
</div>

<div class="teacher-callout teacher-callout--intuition">
  <strong>2. IoU (Intersection over Union):</strong><br />
  How do we score whether a predicted bounding box is accurate?
  <div class="math-formula">IoU = Area of Overlap / Area of Union</div>
  An IoU &ge; 0.5 is considered a decent detection; IoU &ge; 0.75 is high-precision localization.
</div>

<div class="teacher-callout teacher-callout--trap">
  <strong>3. NMS (Non-Maximum Suppression):</strong><br />
  A single dog might trigger 15 overlapping bounding boxes from neighboring grid cells! NMS cleans this up: it takes the box with highest confidence, suppresses all other boxes that have high IoU overlap with it, and repeats until only one clean box remains per object.
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Build a ResNet Residual Block with Identity Shortcuts",
        "language": "python",
        "description": `
<h3>⚔️ CAPSTONE EXERCISE: Build an Identity Residual Block</h3>
<p>Implement a forward pass through a residual block computing y = ReLU(W<sub>2</sub> · ReLU(W<sub>1</sub> x) + x).</p>
`,
        "starterCode": `import numpy as np

def residual_block_forward(x, W1, W2):
    # 1. Conv 1 + ReLU
    h1 = np.maximum(0, x @ W1)
    # 2. Conv 2
    h2 = h1 @ W2
    # 3. Residual connection + Final ReLU
    out = np.maximum(0, h2 + x)
    return out

# Verification
np.random.seed(42)
x = np.array([[1.0, -2.0, 3.0]])
W1 = np.random.randn(3, 3) * 0.1
W2 = np.random.randn(3, 3) * 0.1

res_out = residual_block_forward(x, W1, W2)
print("Residual Block Output Shape:", res_out.shape)
print("Forward executed successfully: True")
`,
        "expectedOutput": "Residual Block Output Shape: (1, 3)\nForward executed successfully: True",
        "hints": [
          "Sum h2 and x before the final ReLU activation."
        ]
      }
    ],
    "project": {
      "title": "Automated Medical Image Diagnosis / Defect Classifier",
      "requirements": [
        "Data augmentation pipeline (random flips, rotations, color jitter)",
        "Pretrained vision backbone (ResNet-50 or ConvNeXt) transfer learning",
        "Fine-tuning with differential learning rates for head vs backbone",
        "Evaluation using ROC-AUC and Confusion Matrix at fixed sensitivity thresholds",
        "Inference pipeline exporting torchscript or ONNX model"
      ],
      "description": `
<p>Build a production medical image diagnosis or defect classifier. Fine-tune a pretrained deep residual network, apply validation metrics, and export an optimized ONNX inference artifact.</p>
`
    },
    "quiz": [
      {
        "question": "Why does stacking two 3x3 convolutional layers outperform a single 5x5 convolutional layer?",
        "options": [
          "It uses 5x5 kernels in the background.",
          "It achieves the exact same 5x5 receptive field while reducing parameter count by 28% and adding an extra non-linear activation layer for richer expressive capacity.",
          "It avoids using stride.",
          "It eliminates the need for backpropagation."
        ],
        "correctIndex": 1,
        "explanation": "Two 3x3 layers cover a 5x5 area with 2*(3*3) = 18 weights vs 25 weights, plus two non-linearities instead of one."
      }
    ]
  },

  "ml-week-11": {
    "lessons": [
      {
        "title": "Text Tokenization, Subwords & Vocabulary Building",
        "language": "python",
        "starterCode": `import numpy as np

# Word-level vocabulary mapping
text = "deep learning models process sequences"
tokens = text.split()
vocab = {token: idx for idx, token in enumerate(tokens)}

encoded = [vocab[t] for t in tokens]
print("Vocabulary:", vocab)
print("Encoded Token IDs:", encoded)
`,
        "content": `
<h2>📜 Lesson 1: Text Tokenization, Subwords & Vocabulary Building</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Computers do not read words; they manipulate integer token IDs. Word-level tokenization suffers from Out-Of-Vocabulary (OOV) tokens, while character-level tokenization yields overly long sequences. Subword tokenization (BPE) bridges the divide.
</div>
`
      },
      {
        "title": "Word Embeddings: Word2Vec (Skip-Gram / CBOW) & FastText",
        "language": "python",
        "starterCode": `import numpy as np

# Vector arithmetic in semantic embedding space:
# King - Man + Woman ≈ Queen
king = np.array([0.9, 0.2, 0.7])
man = np.array([0.8, 0.1, 0.1])
woman = np.array([0.1, 0.8, 0.1])

predicted_queen = king - man + woman
print("Synthesized Queen Embedding Vector:", np.round(predicted_queen, 2))
`,
        "content": `<h2>📖 Lesson 1: Word Embeddings: Word2Vec & FastText</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Before Word2Vec (Mikolov et al., 2013), computers treated words as isolated symbols using one-hot encoding: <code>"cat" = [1, 0, 0, ...]</code> and <code>"kitten" = [0, 1, 0, ...]</code>. To a computer, "cat" was just as unrelated to "kitten" as it was to "bulldozer"! Word embeddings gave language geometry.
</div>

<h3>🎯 The Distributional Hypothesis</h3>
<p>Linguist J.R. Firth famously said in 1957: <em>"You shall know a word by the company it keeps."</em></p>
<p>If you see sentences like <em>"She petted the cute little ___"</em> and <em>"The ___ drank a bowl of milk"</em>, you can easily guess the missing word is a cat or kitten because of their surrounding context!</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Vector Arithmetic in Semantic Space:</strong><br />
  When words are mapped to continuous 300-dimensional vectors, spatial relationships reflect semantic relationships:
  <div class="math-formula">Vector("King") - Vector("Man") + Vector("Woman") &approx; Vector("Queen")</div>
  The direction from "Man" to "Woman" encodes grammatical gender, and adding it to "King" lands right on "Queen"!
</div>

<h3>⚙️ Word2Vec vs FastText</h3>
<ul>
  <li><strong>Word2Vec:</strong> Treats every word as an atomic unit. If a user types a typo (e.g. <code>"amazng"</code>), Word2Vec treats it as an unknown Out-Of-Vocabulary (OOV) token.</li>
  <li><strong>FastText:</strong> Breaks words into subword character n-grams (e.g. <code>&lt;am, ama, maz, azn, zng, ng&gt;</code>). It can construct meaningful embeddings even for brand new slang and misspelled words!</li>
</ul>
`
      },
      {
        "title": "Recurrent Neural Networks (RNNs) & Backprop Through Time (BPTT)",
        "language": "python",
        "starterCode": `import numpy as np

# Simple RNN step: h_t = tanh(W_xh * x_t + W_hh * h_{t-1} + b)
W_xh = np.random.randn(4, 2) * 0.1 # input dim 2, hidden dim 4
W_hh = np.random.randn(4, 4) * 0.1
h_prev = np.zeros(4)

x_t = np.array([1.0, 0.5])
h_t = np.tanh(W_xh.T @ x_t + W_hh @ h_prev)

print("Updated Hidden State h_t:", np.round(h_t, 3))
`,
        "content": `
<h2>📜 Lesson 3: Recurrent Neural Networks (RNNs) & Backprop Through Time (BPTT)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  RNNs maintain a recurring hidden state vector h_t that acts as the model's memory, cycling through sequences step by step.
</div>
`
      },
      {
        "title": "The Vanishing/Exploding Gradient Problem in Long Horizons",
        "language": "python",
        "starterCode": `import numpy as np

# When backpropagating across T timesteps, gradients multiply by W_hh^T
# If spectral radius of W_hh < 1, gradient vanishes exponentially to 0!
eigenvalue = 0.8
for timesteps in [5, 15, 30, 60]:
    gradient_decay = eigenvalue ** timesteps
    print(f"Horizon T={timesteps:2d} -> Gradient Scale: {gradient_decay:.6f}")
`,
        "content": `<h2>📖 Lesson 3: The Vanishing Gradient Problem in Sequences</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Imagine playing the game of <em>Telephone</em> with a line of 100 people whispering a secret phrase to one another. What are the chances the 100th person hears the exact original phrase? Virtually zero! In Recurrent Neural Networks (RNNs), this communication breakdown is the <strong>Vanishing and Exploding Gradient Problem</strong>.
</div>

<h3>🎯 The Mathematics of Repeated Multiplication</h3>
<p>In an RNN unrolled over <em>T</em> time steps, calculating the gradient of the loss at step <em>T</em> with respect to the initial hidden state involves multiplying the recurrent weight matrix <strong>W</strong><sub>hh</sub> by itself <em>T</em> times:</p>

<div class="math-formula">
  ∂h<sub>T</sub> / ∂h<sub>1</sub> = ∏<sub>t=2</sub><sup>T</sup> ( <strong>W</strong><sub>hh</sub>ᵀ &middot; diag(f'(z<sub>t</sub>)) )
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Math of Disappearance:</strong>
  <ul>
    <li><strong>If eigenvalues &lt; 1.0:</strong> Think of multiplying <code>0.9</code> by itself 50 times: <code>0.9⁵⁰ &approx; 0.005</code>. By step 100, the gradient is <code>0.00002</code>! The network completely forgets what happened at the start of the sentence.</li>
    <li><strong>If eigenvalues &gt; 1.0:</strong> Think of multiplying <code>1.2</code> by itself 50 times: <code>1.2⁵⁰ &approx; 9,100</code>! The gradients explode to infinity, causing numerical overflow and <code>NaN</code> weight crashes.</li>
  </ul>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Two Solutions:</strong><br />
  For exploding gradients, we use <strong>Gradient Clipping</strong> (capping maximum gradient norm). For vanishing gradients, we abandoned plain RNNs and invented <strong>LSTMs, GRUs, and Transformers</strong>!
</div>
`
      },
      {
        "title": "Long Short-Term Memory (LSTM) Networks: Gated Cell States",
        "language": "python",
        "starterCode": `import numpy as np

# LSTM Gating Formulas:
# Forget gate: f_t = σ(W_f [h_{t-1}, x_t] + b_f)
# Input gate:  i_t = σ(W_i [h_{t-1}, x_t] + b_i)
# Cell update: C_t = f_t * C_{t-1} + i_t * tanh(W_c [h_{t-1}, x_t] + b_c)
print("LSTM Cell State C_t acts as a continuous highway where gradients flow without decay!")
`,
        "content": `<h2>📖 Lesson 4: Long Short-Term Memory (LSTM) Networks</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In 1997, Sepp Hochreiter and Jürgen Schmidhuber solved the RNN vanishing gradient problem by inventing the <strong>LSTM (Long Short-Term Memory)</strong>. It powered Siri, Google Translate, and speech recognition for over two decades.
</div>

<h3>🎯 The Conveyor Belt Analogy: The Cell State (C<sub>t</sub>)</h3>
<p>Think of an LSTM as a conveyor belt running through a factory line:</p>
<p>The core innovation is the <strong>Cell State (C<sub>t</sub>)</strong>—a linear highway that runs straight down the entire sequence with only minor linear interactions. Gradients can flow down this conveyor belt across 1,000 steps without vanishing!</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Three Specialized Gatekeepers:</strong>
  <ul>
    <li><strong>1. The Forget Gate (f<sub>t</sub>):</strong> <em>"What old information should we discard?"</em> (e.g., when a story switches from talking about "Bob" to "Alice", forget Bob's male pronouns). <code>f<sub>t</sub> = σ(W<sub>f</sub> &middot; [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>)</code></li>
    <li><strong>2. The Input Gate (i<sub>t</sub>):</strong> <em>"What new information is worth storing?"</em> (e.g., store that Alice is a software engineer).</li>
    <li><strong>3. The Output Gate (o<sub>t</sub>):</strong> <em>"What filtered piece of our memory should we output right now?"</em></li>
  </ul>
</div>
`
      },
      {
        "title": "Gated Recurrent Units (GRU) & Bidirectional Sequence Encoding (BiLSTM)",
        "language": "python",
        "starterCode": `import numpy as np

# BiLSTM concatenates forward hidden state h_fwd and backward hidden state h_bwd
h_fwd = np.array([0.5, 0.8])
h_bwd = np.array([-0.2, 0.4])
h_bi = np.concatenate([h_fwd, h_bwd])

print("Bidirectional Context Representation:", h_bi)
`,
        "content": `<h2>📖 Lesson 5: GRUs & Bidirectional Encodings</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  LSTMs solved the vanishing gradient problem, but with 4 gates per cell, they are heavy and slow to compute. In 2014, Kyunghyun Cho and his team introduced the <strong>GRU (Gated Recurrent Unit)</strong>—a streamlined alternative that merges memory states and cuts computation by 25%.
</div>

<h3>🎯 GRU: Two Gates Instead of Three</h3>
<ul>
  <li><strong>Reset Gate (r<sub>t</sub>):</strong> Decides how much of the past hidden state to forget when computing candidate memories.</li>
  <li><strong>Update Gate (z<sub>t</sub>):</strong> Simultaneously acts as both the forget gate and input gate! It balances how much old memory to keep versus how much new candidate state to inject:
    <div class="math-formula">h<sub>t</sub> = (1 - z<sub>t</sub>) &odot; h<sub>t-1</sub> + z<sub>t</sub> &odot; h̃<sub>t</sub></div>
  </li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Bidirectional LSTMs: Seeing Both Past and Future</strong><br />
  In a regular LSTM, when reading word 5, the model only knows words 1 through 4. But in human reading, future context resolves ambiguities!
  <br /><br />
  Consider: <em>"The <strong>bank</strong> was overflowing with floodwater"</em> vs <em>"The <strong>bank</strong> approved my mortgage"</em>. You cannot know the meaning of "bank" until you read the later words!
  <br /><br />
  A <strong>Bidirectional LSTM (BiLSTM)</strong> runs two parallel recurrent passes: one forward (left-to-right) and one backward (right-to-left), concatenating both hidden states <code>[h_forward, h_backward]</code> so every word is imbued with complete global context!
</div>
`
      },
      {
        "title": "Sequence-to-Sequence Modeling & The Bahdanau Attention Mechanism",
        "language": "python",
        "starterCode": `import numpy as np

# Bahdanau Additive Attention Alignment Score:
# score(s_{i-1}, h_j) = v_a^T tanh(W_a s_{i-1} + U_a h_j)
# Generates attention weights α_ij summing to 1 across all source tokens!
print("Bahdanau Attention: Allows the decoder to dynamically focus on relevant input tokens.")
`,
        "content": `<h2>📖 Lesson 6: The Bahdanau Attention Mechanism</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In 2014, Dzmitry Bahdanau and Yoshua Bengio introduced an idea that would permanently reshape artificial intelligence: the <strong>Attention Mechanism</strong>. It was originally created to fix a glaring bottleneck in machine translation.
</div>

<h3>🎯 The Mental Funnel Bottleneck</h3>
<p>In traditional Encoder-Decoder models, the encoder had to read an entire 50-word sentence and compress all of its meaning into a <strong>single fixed-size vector</strong> (the bottleneck context vector). It was like asking a human translator to read an entire chapter of a book, close their eyes, memorize it in one thought, and then translate the whole chapter from memory!</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Spotlight Analogy: Bahdanau Attention</strong><br />
  Instead of forcing the whole sentence into one fixed vector, Bahdanau gave the decoder a <strong>movable spotlight (attention weights)</strong>!
  <br /><br />
  When the decoder is translating the German word <em>"Katze"</em> into English, it shines its spotlight directly back at the German word <em>"Katze"</em> and its immediate neighbors in the original sentence. It dynamically looks at the exact right words at the exact right millisecond!
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Stepping Stone to Transformers:</strong><br />
  Bahdanau proved that attention alone was far more powerful than the recurrent networks it was attached to. Three years later in 2017, researchers at Google published <em>"Attention Is All You Need"</em>—removing the RNN entirely and giving birth to the Transformer architecture that powers modern AI!
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Sentiment Analysis and Text Classification with Bidirectional LSTMs",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an LSTM Step Simulator</h3>
<p>Implement the forget gate and input update for a simulated LSTM cell state: C<sub>t</sub> = f<sub>t</sub> · C_{t-1} + i<sub>t</sub> · tilde{C}<sub>t</sub>.</p>
`,
        "starterCode": `import numpy as np

def lstm_cell_update(c_prev, f_gate, i_gate, c_cand):
    # c_t = f_gate * c_prev + i_gate * c_cand
    return f_gate * c_prev + i_gate * c_cand

c_0 = np.array([1.0, 2.0])
f_t = np.array([0.9, 0.1]) # retain first dim, forget second dim
i_t = np.array([0.2, 0.8])
c_new = np.array([0.5, 3.0])

c_1 = lstm_cell_update(c_0, f_t, i_t, c_new)
print("Updated Cell State C_1:", np.round(c_1, 2))
`,
        "expectedOutput": "Updated Cell State C_1: [1.  2.6]",
        "hints": [
          "Element-wise multiplication of forget gate with c_prev added to input gate with c_cand."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the primary architectural innovation of the LSTM that prevents vanishing gradients?",
        "options": [
          "Using Cosine Annealing learning rates.",
          "The linear Cell State C_t highway with additive updates (C_t = f_t * C_{t-1} + i_t * c_tilde), which allows gradients to flow backwards through time without continuous exponential matrix multiplications.",
          "Replacing floats with 8-bit integers.",
          "Deleting all bias parameters."
        ],
        "correctIndex": 1,
        "explanation": "Because the cell state update is linear and additive (controlled by gates), the gradient can backpropagate without repeatedly decaying through non-linear matrix products."
      }
    ]
  }
};
