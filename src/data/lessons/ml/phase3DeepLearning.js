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
        "content": `
<h2>⚡ Lesson 1: The Biological & Artificial Perceptron: Weights, Bias & Linear Separability</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Frank Rosenblatt conceived the Perceptron in 1958. While a single perceptron can learn linear logic gates (AND, OR), Minsky & Papert proved in 1969 that it cannot solve non-linear problems like XOR without hidden layers.</em>
</div>

<p>The artificial neuron computes an affine transformation followed by a threshold or non-linear activation:</p>
<pre class=\"ascii-diagram\">
z = ∑_{j=1}^D w_j x_j + b = w^T x + b,   y = f(z)
</pre>
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
        "content": `
<h2>⚡ Lesson 2: Multi-Layer Perceptrons (MLPs) & The Universal Approximation Theorem</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>The Universal Approximation Theorem (Cybenko, 1989; Hornik, 1991) proves that a feedforward network with a single non-linear hidden layer can approximate ANY continuous function on compact subsets of ℝⁿ to arbitrary precision.</em>
</div>

<h3>Why Depth Over Width?</h3>
<p>While a wide, shallow network <em>can</em> approximate any function theoretically, it requires an exponentially large number of neurons. Deep hierarchical networks factor complex functions into modular compositional layers, achieving exponential efficiency with polynomial parameters.</p>
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
        "content": `
<h2>⚡ Lesson 3: Activation Functions: Sigmoid, Tanh, ReLU, Leaky ReLU, ELU, GELU & Swish</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Without non-linear activations, stacking 100 linear layers collapses mathematically into a single linear layer: W₁W₂...Wₙx = W_total x. Activations give networks the power to curve space.</em>
</div>

<h3>Modern Activation Comparison</h3>
<ul>
  <li><strong>ReLU:</strong> $\\max(0, x)$. Constant gradient of 1 for $x > 0$ eliminates vanishing gradients. Suffers from \"Dying ReLU\" if neurons get stuck with $x < 0$ and gradient 0.</li>
  <li><strong>GELU (Gaussian Error Linear Unit):</strong> $x \\cdot \\Phi(x)$. Weights inputs by their percentile value under a normal distribution. Powers BERT, GPT-2/3, and ViT.</li>
  <li><strong>Swish / SiLU:</strong> $x \\cdot \\sigma(\\beta x)$. Smooth, non-monotonic curve with negative curvature that prevents dying neurons. Powers modern LLM backbones like LLaMA 3 and Mistral.</li>
</ul>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>PyTorch separates the user-facing Tensor object from its underlying Storage buffer. Always write device-agnostic code to seamlessly support NVIDIA CUDA, Apple MPS, and CPU fallback.</em>
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
        "content": `
<h2>⚡ Lesson 5: Dynamic Computational Graphs: torch.autograd & Forward/Backward Propagation</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Unlike legacy static frameworks that compiled graphs before execution, PyTorch uses Define-by-Run. The computational graph is constructed dynamically during the forward pass and destroyed after .backward().</em>
</div>

<h3>Autograd Invariants</h3>
<ul>
  <li><code>requires_grad=True</code>: Instructs autograd to record operations on this tensor in the execution DAG.</li>
  <li><code>grad_fn</code>: Every output tensor references the primitive operation that created it (e.g. <code>AddBackward0</code>, <code>MulBackward0</code>).</li>
  <li><code>torch.no_grad()</code>: Disables graph construction during inference, cutting VRAM memory consumption in half.</li>
</ul>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Every layer, block, and model in PyTorch inherits from torch.nn.Module. Understanding parameter registration, sub-module nesting, and hooks is essential for custom model architecture.</em>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>A GPU starved of data runs at 0% efficiency. High-performance ML requires multi-worker DataLoader pipelines with asynchronous memory pinning and dynamic sequence collation.</em>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Initialize weights too small, and activations vanish to zero in deep layers; initialize weights too large, and activations explode to infinity. Principled variance preservation is key.</em>
</div>

<h3>The Mathematical Derivation</h3>
<p>To preserve signal variance $\\text{Var}(y) = \\text{Var}(x)$ through linear layer $y = Wx$:</p>
<ul>
  <li><strong>Xavier/Glorot:</strong> Assumes symmetric linear/tanh activations: $W \\sim \\mathcal{N}\\left(0, \\frac{2}{\\text{fan\\_in} + \\text{fan\\_out}}\\right)$.</li>
  <li><strong>He/Kaiming:</strong> Accounts for ReLU zeroing out exactly half the distribution: $W \\sim \\mathcal{N}\\left(0, \\frac{2}{\\text{fan\\_in}}\\right)$. Standard in all modern deep networks.</li>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Before changing your model architecture, plot the training and validation loss curves. The shape of the gap precisely diagnoses whether you suffer from high bias (underfitting) or high variance (overfitting).</em>
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
        "content": `
<h2>⚖️ Lesson 2: Regularization: L2 Weight Decay, L1 Penalty & DropConnect</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Overparameterized networks memorize random noise. Weight decay smoothly shrinks large weights toward zero, ensuring smooth decision boundaries with lower Lipschitz constants.</em>
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
        "content": `
<h2>⚖️ Lesson 3: Dropout Mechanics: Inverted Dropout at Training vs Inference</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Dropout (Srivastava et al., 2014) randomly zeroes out activations with probability p during training, preventing neurons from co-adapting and simulating an ensemble of 2ⁿ sub-networks.</em>
</div>

<h3>Why Inverted Dropout?</h3>
<p>Traditional dropout required multiplying weights by $(1 - p)$ at test time. Modern frameworks use **Inverted Dropout**: activations during training are scaled up by $\\frac{1}{1 - p}$, leaving the forward pass during inference completely untouched and computationally free!</p>
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
        "content": `
<h2>⚖️ Lesson 4: Normalization Layers: Batch Normalization Mechanics & Running Stats</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Batch Normalization (Ioffe & Szegedy, 2015) smooths the loss landscape, enabling 10x higher learning rates and eliminating sensitivity to initial weight variance.</em>
</div>

<h3>Training vs Inference Invariant</h3>
<p>During training, BatchNorm normalizes using the <em>current mini-batch</em> mean and variance while maintaining an exponentially moving average (running statistics). At inference time (<code>model.eval()</code>), it freezes the running statistics to ensure deterministic predictions independent of batch size.</p>
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
        "content": `
<h2>⚖️ Lesson 5: Modern Normalization: Layer Normalization, Group Normalization & RMSNorm</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>BatchNorm breaks down for variable-length NLP sequences and batch size 1. LayerNorm and RMSNorm normalize across the hidden feature dimension, operating identically during training and inference.</em>
</div>

<h3>RMSNorm (Root Mean Square Normalization)</h3>
<p>Zhang & Sennrich (2019) demonstrated that the computational benefits of LayerNorm come almost entirely from scaling by the variance rather than centering the mean. **RMSNorm** drops mean subtraction:</p>
<pre class=\"ascii-diagram\">
x̂_i = x_i / RMS(x) · γ_i,   where   RMS(x) = √( (1/D) ∑ x_i² + ε )
</pre>
<p>RMSNorm reduces normalization compute time by ~50% and is used in LLaMA 1, 2, 3 and Gemma.</p>
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
        "content": `
<h2>⚖️ Lesson 6: Learning Rate Schedulers: Cosine Annealing, OneCycleLR & Warmup</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>A constant learning rate is a rookie mistake. Warmup stabilizes initial noisy gradients, while Cosine Annealing gently settles parameters into wide, flat minima at the end of training.</em>
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
        "content": `
<h2>⚖️ Lesson 7: Numerical Stability: Gradient Clipping (Norm vs Value) & NaN Diagnostics</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Exploding gradients can destroy weeks of training progress in a single step. Gradient clipping by global norm preserves the gradient vector's direction while capping its length.</em>
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
        "content": `
<h2>⚖️ Lesson 8: Mixed Precision Training: FP16 / BF16 & torch.cuda.amp</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Training in FP32 wastes memory bandwidth and leaves GPU Tensor Cores idling. Mixed Precision (BF16/FP16) doubles training throughput and cuts VRAM memory consumption in half.</em>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>If you flatten a 4K image into an MLP, parameter counts explode into the billions on the first layer alone, destroying spatial locality. Convolutional networks use local receptive fields and weight sharing to achieve translation equivariance.</em>
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
        "content": `
<h2>👁️ Lesson 2: The Convolutional Operation: Kernels, Filters & Cross-Correlation</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Convolution slides a small learnable parameter matrix (kernel) across the image tensor, calculating dot products to produce an activation feature map.</em>
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
        "content": `
<h2>👁️ Lesson 3: Spatial Geometry: Padding (Valid vs Same), Stride & Dilations</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Without padding, convolutions shrink feature maps by (K - 1) on every single layer, stripping away boundary information. Padding preserves spatial geometry.</em>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Pooling progressively downsamples spatial dimensions, expanding the receptive field of subsequent layers while providing translational invariance.</em>
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
        "content": `
<h2>👁️ Lesson 5: Foundational Architectures: LeNet, AlexNet & VGG (3x3 Factorization)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>VGG (Simonyan & Zisserman, 2014) proved that large kernels (7x7, 11x11) are obsolete. Stacking consecutive 3x3 kernels provides the same receptive field with fewer parameters and more non-linear activation layers.</em>
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
        "content": `
<h2>👁️ Lesson 6: Deep Residual Networks (ResNet): Skip Connections & Identity Mapping</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>He et al. (2015) trained networks over 150 layers deep using Residual Skip Connections: y = F(x) + x. The identity shortcut ensures gradients pass straight back through deep layers without vanishing.</em>
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
        "content": `
<h2>👁️ Lesson 7: Transfer Learning & Fine-Tuning Pretrained Vision Models</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Never train vision models from scratch on small datasets. Pretrained ImageNet representations generalize universally. Fine-tune pre-trained weights for specialized defect classification or medical scans.</em>
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
        "content": `
<h2>👁️ Lesson 8: Object Detection & Segmentation Overview: YOLO, IoU & NMS</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Object detection predicts both class probabilities and spatial bounding box coordinates. YOLO (You Only Look Once) frames detection as a single regression pass, achieving real-time 60+ FPS inference.</em>
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
<p>Implement a forward pass through a residual block computing $y = \\text{ReLU}(W_2 \\cdot \\text{ReLU}(W_1 x) + x)$.</p>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Computers do not read words; they manipulate integer token IDs. Word-level tokenization suffers from Out-Of-Vocabulary (OOV) tokens, while character-level tokenization yields overly long sequences. Subword tokenization (BPE) bridges the divide.</em>
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
        "content": `
<h2>📜 Lesson 2: Word Embeddings: Word2Vec (Skip-Gram / CBOW) & FastText</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>\"You shall know a word by the company it keeps\" (J.R. Firth, 1957). Word2Vec projects high-dimensional sparse one-hot words into dense continuous geometric manifolds.</em>
</div>
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

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>RNNs maintain a recurring hidden state vector h_t that acts as the model's memory, cycling through sequences step by step.</em>
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
        "content": `
<h2>📜 Lesson 4: The Vanishing/Exploding Gradient Problem in Long Horizons</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Standard RNNs cannot retain memories past ~10 to 20 tokens because backpropagating through long recurrent loops causes gradients to vanish to absolute zero.</em>
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
        "content": `
<h2>📜 Lesson 5: Long Short-Term Memory (LSTM) Networks: Gated Cell States</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Hochreiter & Schmidhuber (1997) solved the vanishing gradient problem with the LSTM. The linear cell state acts as an uninterrupted highway where memories can persist across thousands of steps.</em>
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
        "content": `
<h2>📜 Lesson 6: Gated Recurrent Units (GRU) & Bidirectional Sequence Encoding (BiLSTM)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>GRUs combine the forget and input gates into a single update gate, training 30% faster than LSTMs while retaining memory capability.</em>
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
        "content": `
<h2>📜 Lesson 7: Sequence-to-Sequence Modeling & The Bahdanau Attention Mechanism</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Traditional Seq2Seq compressed an entire paragraph into a single bottleneck vector. Bahdanau et al. (2014) introduced attention, allowing models to dynamically query source tokens on every decoding step—the direct ancestor of the Transformer!</em>
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
<p>Implement the forget gate and input update for a simulated LSTM cell state: $C_t = f_t \\cdot C_{t-1} + i_t \\cdot \\tilde{C}_t$.</p>
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
