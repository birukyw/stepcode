// ─── Phase 4: Modern Generative AI, Transformers, and LLMs ──────────────────
// Modules 12–15: Transformer Architecture, LLM Training & Fine-Tuning, RAG & Agents

export const mlPhase4Content = {
  "ml-week-12": {
    "lessons": [
      {
        "title": "The Architectural Paradigm Shift: Attention Is All You Need vs Recurrence",
        "language": "python",
        "starterCode": `import numpy as np

# RNN vs Transformer Compute Scaling:
# RNN: Sequential O(T) steps. Step t cannot begin until step t-1 completes!
# Transformer: O(1) sequential steps! All T tokens attend to each other in parallel via GEMM!
seq_len = 2048
print(f"For Sequence Length T={seq_len}:")
print(f"RNN requires {seq_len} sequential recurrent steps (Cannot parallelize on GPU!).")
print("Transformer executes all 2048 tokens simultaneously in parallel matrix operations!")
`,
        "content": `
<h2>🤖 Lesson 1: The Architectural Paradigm Shift: Attention Is All You Need vs Recurrence</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Vaswani et al. (2017) discarded recurrence and convolutions entirely. Self-attention eliminates the sequential bottleneck, allowing entire sequence matrices to be processed in parallel on GPU tensor cores.</em>
</div>

<p>Recurrent models process tokens sequentially from left to right ($h_t = f(h_{t-1}, x_t)$), preventing parallel execution during training. The Transformer replaces recurrent dependencies with global pairwise attention, reducing maximum signal path length from $O(T)$ to $O(1)$.</p>
`
      },
      {
        "title": "The Core Mechanism: Queries (Q), Keys (K), Values (V) & Scaled Dot-Product",
        "language": "python",
        "starterCode": `import numpy as np

def scaled_dot_product_attention(Q, K, V):
    d_k = Q.shape[-1]
    # 1. Compute dot-product affinity scores: Q * K^T / sqrt(d_k)
    scores = (Q @ K.T) / np.sqrt(d_k)
    # 2. Softmax normalization across keys
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    # 3. Value aggregation
    output = weights @ V
    return output, weights

# Simulating 3 tokens with embedding dim 4
tokens = np.array([[1.0, 0.0, 1.0, 0.0], [0.0, 1.0, 0.0, 1.0], [1.0, 1.0, 0.0, 0.0]])
out, attn = scaled_dot_product_attention(tokens, tokens, tokens)

print("Attention Weights Matrix (Rows sum to 1):")
print(np.round(attn, 3))
print("Context Output Shape:", out.shape)
`,
        "content": `
<h2>🤖 Lesson 2: The Core Mechanism: Queries (Q), Keys (K), Values (V) & Scaled Dot-Product</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Self-attention behaves like a differentiable soft database lookup: every token casts a Query (Q), compares it against all Keys (K) via dot products, and extracts a weighted blend of Values (V).</em>
</div>

<p>The Scaled Dot-Product Attention formula is the beating heart of modern AI:</p>
<pre class=\"ascii-diagram\">
Attention(Q, K, V) = Softmax( (Q K^T) / √d_k ) · V
</pre>
<p><strong>Why Scale by $\\sqrt{d_k}$?</strong> In high dimensions (e.g. $d_k = 128$), dot products grow large in magnitude, pushing the Softmax function into flat saturation regions with microscopic gradients. Dividing by $\\sqrt{d_k}$ preserves variance 1.0 and stabilizes backpropagation.</p>
`
      },
      {
        "title": "Multi-Head Attention (MHA): Subspace Projections & Head Splitting",
        "language": "python",
        "starterCode": `import numpy as np

# Multi-Head Attention splitting:
# Given d_model = 4096 and num_heads = 32:
d_model = 4096
num_heads = 32
d_k = d_model // num_heads # 128 dimensions per head!

print(f"Total Model Dim: {d_model}")
print(f"Heads: {num_heads} | Head Dimension d_k: {d_k}")
print("Each head projects into a different subspace to track syntax, coreference, semantics simultaneously!")
`,
        "content": `
<h2>🤖 Lesson 3: Multi-Head Attention (MHA): Subspace Projections & Head Splitting</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>A single attention head averages all relationships into a single blur. Multi-Head Attention splits the model dimension into H heads, allowing the network to simultaneously attend to syntactic agreements, pronoun antecedents, and factual associations.</em>
</div>
`
      },
      {
        "title": "Positional Encodings: Sinusoidal, Learned & Rotary Position Embeddings (RoPE)",
        "language": "python",
        "starterCode": `import numpy as np

# Rotary Position Embedding (RoPE) 2D rotation matrix:
# Rotates query and key vectors by angle m * θ
def rope_2d(vector, pos, theta=10000.0):
    angle = pos * (theta ** 0)
    R = np.array([
        [np.cos(angle), -np.sin(angle)],
        [np.sin(angle),  np.cos(angle)]
    ])
    return R @ vector

q = np.array([1.0, 0.0])
q_pos1 = rope_2d(q, pos=1)
q_pos2 = rope_2d(q, pos=2)

print("Original Vector:   ", q)
print("Rotated at Pos 1:  ", np.round(q_pos1, 3))
print("Rotated at Pos 2:  ", np.round(q_pos2, 3))
`,
        "content": `
<h2>🤖 Lesson 4: Positional Encodings: Sinusoidal, Learned & Rotary Position Embeddings (RoPE)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Self-attention is permutation-invariant: scrambling the word order produces the exact same output. Positional encodings inject sequence order into the latent space.</em>
</div>

<h3>RoPE (Rotary Position Embeddings)</h3>
<p>Used in LLaMA 3, Mistral, and PaLM, RoPE encodes position by multiplying queries and keys by an orthogonal 2D rotation matrix for each frequency band. The dot product $\\langle R_m q, R_n k \\rangle = q^T R_{n-m} k$ depends strictly on the <strong>relative distance</strong> $(n - m)$, allowing models to extrapolate context lengths seamlessly.</p>
`
      },
      {
        "title": "Masked Self-Attention & Causal Autoregressive Generation",
        "language": "python",
        "starterCode": `import numpy as np

# Causal Attention Mask for Sequence of Length 4:
# Future positions (above diagonal) are masked with -infinity (-1e9)
T = 4
causal_mask = np.triu(np.ones((T, T)), k=1) * -1e9
print("Causal Attention Mask (Tokens cannot peek into future!):")
print(causal_mask)

# Softmax on [-1e9] yields exactly 0.0 probability!
exp_masked = np.exp(causal_mask)
print("\\nPost-Softmax Attention Coefficients:")
print(np.tril(np.ones((T, T))))
`,
        "content": `
<h2>🤖 Lesson 5: Masked Self-Attention & Causal Autoregressive Generation</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>During autoregressive generation (GPT-4), tokens must not cheat by attending to future tokens. Causal masking sets future attention scores to -∞ before Softmax, ensuring e^{-∞} = 0.</em>
</div>
`
      },
      {
        "title": "The Complete Transformer Block: Pre-LN, SwiGLU & Residuals",
        "language": "python",
        "starterCode": `import numpy as np

# SwiGLU Feed-Forward Network (used in LLaMA 3):
# SwiGLU(x) = (Swish(x W_gate) ⊙ (x W_up)) W_down
def swiglu_forward(x, W_gate, W_up, W_down):
    swish_gate = (x @ W_gate) / (1.0 + np.exp(-(x @ W_gate)))
    up_proj = x @ W_up
    return (swish_gate * up_proj) @ W_down

x = np.random.randn(1, 4)
Wg = np.random.randn(4, 8) * 0.1
Wu = np.random.randn(4, 8) * 0.1
Wd = np.random.randn(8, 4) * 0.1

out = swiglu_forward(x, Wg, Wu, Wd)
print("SwiGLU FFN Output Shape:", out.shape)
`,
        "content": `
<h2>🤖 Lesson 6: The Complete Transformer Block: Pre-LN, SwiGLU & Residuals</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Original Transformers used Post-LayerNorm, requiring fragile learning rate warmups. Modern LLMs use Pre-LN (normalizing inputs BEFORE attention and FFN) and SwiGLU gated activations for rock-solid stability.</em>
</div>
`
      },
      {
        "title": "Efficient Attention: FlashAttention, MQA & Grouped-Query Attention (GQA)",
        "language": "python",
        "starterCode": `import numpy as np

# GQA (Grouped-Query Attention) used in LLaMA 3 8B:
# 32 Query Heads share 8 Key-Value Heads!
q_heads = 32
kv_heads = 8
ratio = q_heads // kv_heads

print(f"LLaMA 3 GQA: {q_heads} Query Heads grouped into {kv_heads} KV Heads.")
print(f"Reduces KV-Cache VRAM memory consumption by {ratio}x during multi-turn generation!")
`,
        "content": `
<h2>🤖 Lesson 7: Efficient Attention: FlashAttention, MQA & Grouped-Query Attention (GQA)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Standard attention requires O(T²) GPU memory to materialize the full N × N attention matrix. FlashAttention (Dao et al., 2022) uses kernel fusion and online Softmax tiling to compute exact attention in O(T) SRAM without ever reading/writing the N × N matrix to VRAM!</em>
</div>

<h3>Grouped-Query Attention (GQA)</h3>
<p>Multi-Head Attention (MHA) allocates separate Key and Value heads for every Query head, causing the KV-cache to consume tens of gigabytes in serving. **Grouped-Query Attention (GQA)** shares a single KV head across multiple Query heads (e.g. 4 Q heads per 1 KV head), slashing KV cache memory by 75% with zero degradation in reasoning benchmarks.</p>
`
      },
      {
        "title": "Architectural Paradigms: Encoder-Only (BERT), Decoder-Only (GPT) & T5",
        "language": "python",
        "starterCode": `import numpy as np

# Comparison Matrix:
# Encoder-Only (BERT): Bidirectional attention. Best for Classification, NER, Embeddings.
# Decoder-Only (GPT, LLaMA): Causal masked attention. Best for Text Generation, Reasoning, Coding.
# Encoder-Decoder (T5): Full encoder cross-attended by decoder. Best for Translation, Summarization.
print("Decoder-Only (GPT/LLaMA) has won the scaling war for General Intelligence & In-Context Learning!")
`,
        "content": `
<h2>🤖 Lesson 8: Architectural Paradigms: Encoder-Only (BERT), Decoder-Only (GPT) & T5</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Why did the industry consolidate around Decoder-Only architectures? Causal auto-regressive pre-training naturally learns in-context few-shot learning and instruction following, while scaling flawlessly with compute.</em>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Implement a nano-GPT Scaled Dot-Product Attention Layer in Pure Python",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build Scaled Dot-Product Attention</h3>
<p>Implement <code>attention(Q, K, V)</code> that applies causal upper-triangular masking and Softmax scaling to compute context representations.</p>
`,
        "starterCode": `import numpy as np

def causal_attention(Q, K, V):
    d_k = Q.shape[-1]
    T = Q.shape[0]
    # 1. Dot product
    scores = (Q @ K.T) / np.sqrt(d_k)
    # 2. Causal mask (fill upper triangle with -1e9)
    mask = np.triu(np.ones((T, T)), k=1) * -1e9
    scores = scores + mask
    # 3. Softmax
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    # 4. Value blend
    return weights @ V

# Test verification
np.random.seed(42)
Q = np.random.randn(3, 4)
K = np.random.randn(3, 4)
V = np.random.randn(3, 4)

out = causal_attention(Q, K, V)
print("Output Shape:", out.shape)
print("Causal Attention Computed Successfully: True")
`,
        "expectedOutput": "Output Shape: (3, 4)\nCausal Attention Computed Successfully: True",
        "hints": [
          "Use np.triu(..., k=1) to construct the causal mask."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why does Scaled Dot-Product Attention divide by √d_k?",
        "options": [
          "To convert dot products into probabilities.",
          "Because for large d_k, dot products grow large in magnitude, pushing the Softmax into saturated regions with vanishingly small gradients. Dividing by √d_k preserves unit variance.",
          "To reduce the number of heads.",
          "To enable 8-bit quantization."
        ],
        "correctIndex": 1,
        "explanation": "If components of Q and K have mean 0 and variance 1, their dot product has variance d_k. Dividing by √d_k pulls the variance back to 1.0, keeping Softmax gradients alive."
      },
      {
        "question": "What is the primary advantage of FlashAttention over standard PyTorch attention?",
        "options": [
          "It uses an approximation that skips 50% of tokens.",
          "It tiles the computation into fast on-chip GPU SRAM, computing exact Softmax and attention incrementally without ever writing the full N × N attention matrix to slow GPU High Bandwidth Memory (HBM).",
          "It only works on CPU.",
          "It removes positional encodings."
        ],
        "correctIndex": 1,
        "explanation": "FlashAttention is an exact (non-approximated) algorithm that restructures operations to minimize memory traffic between high-bandwidth memory (HBM) and on-chip SRAM."
      }
    ]
  },

  "ml-week-13": {
    "lessons": [
      {
        "title": "Modern Tokenization: Byte-Pair Encoding (BPE), SentencePiece & TikToken",
        "language": "python",
        "starterCode": `import numpy as np

# BPE frequency merging simulation
corpus = "low lower newest lowest"
# BPE iteratively counts adjacent character pairs and merges the most frequent pair
print("BPE Core Principle: Iteratively merge frequent subword byte pairs into single vocabulary tokens.")
`,
        "content": `
<h2>⚡ Lesson 1: Modern Tokenization: Byte-Pair Encoding (BPE), SentencePiece & TikToken</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Tokenization defines the vocabulary of the model. Subword tokenization (BPE) ensures common words are single tokens, while rare or code tokens are broken into reusable sub-morphemes.</em>
</div>
`
      },
      {
        "title": "Pre-training at Scale: Data Preparation, Deduplication & Quality Filtering",
        "language": "python",
        "starterCode": `import numpy as np

# MinHash Locality Sensitive Hashing (LSH) for Deduplication:
# Computes Jaccard similarity across billions of web pages in linear time
print("Pre-training Pipeline: Web Crawling -> MinHash Deduplication -> Perplexity Quality Filter -> BPE Tokenizer")
`,
        "content": `
<h2>⚡ Lesson 2: Pre-training at Scale: Data Preparation, Deduplication & Quality Filtering</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>\"Garbage in, garbage out.\" Training on deduplicated, high-quality curated data (Common Crawl filtered with fastText classifiers, synthetic textbooks) is the secret behind state-of-the-art models.</em>
</div>
`
      },
      {
        "title": "Compute Budgeting & Scaling Laws: Kaplan vs Chinchilla Frontiers",
        "language": "python",
        "starterCode": `import numpy as np

# Chinchilla Optimal Compute Law (Hoffmann et al., 2022):
# Model parameters N and training tokens D should scale EQUALLY:
# For optimal compute, a model should be trained on ~20 tokens per parameter!
params = 8e9 # 8B model
optimal_tokens = params * 20
print(f"For an 8B Parameter Model, Chinchilla minimum token count: {optimal_tokens / 1e9:.1f} Billion Tokens")
print("LLaMA 3 trained on 15 Trillion tokens (over-training for extreme inference efficiency!).")
`,
        "content": `
<h2>⚡ Lesson 3: Compute Budgeting & Scaling Laws: Kaplan vs Chinchilla Frontiers</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Kaplan et al. (OpenAI, 2020) thought model size was paramount. Hoffmann et al. (DeepMind Chinchilla, 2022) corrected this: models were severely undertrained; tokens and parameters must scale in equal 1:1 proportion.</em>
</div>
`
      },
      {
        "title": "Autoregressive Decoding Strategies: Greedy, Temperature, Top-K & Top-P (Nucleus)",
        "language": "python",
        "starterCode": `import numpy as np

def sample_temperature(logits, temperature=0.7):
    # Temperature scaling: logits / T
    scaled = logits / max(temperature, 1e-5)
    exp_scaled = np.exp(scaled - np.max(scaled))
    probs = exp_scaled / np.sum(exp_scaled)
    return probs

logits = np.array([5.0, 3.0, 1.0])
print("T = 0.2 (Cold, Sharp, Focused):", np.round(sample_temperature(logits, 0.2), 3))
print("T = 1.0 (Standard Softmax):     ", np.round(sample_temperature(logits, 1.0), 3))
print("T = 2.0 (Hot, Creative, Random): ", np.round(sample_temperature(logits, 2.0), 3))
`,
        "content": `
<h2>⚡ Lesson 4: Autoregressive Decoding Strategies: Greedy, Temperature, Top-K & Top-P (Nucleus)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>How does an LLM turn logits into fluent language? Temperature scales entropy, Top-K caps candidate count, and Top-P (Nucleus) samples from the dynamic smallest set whose cumulative probability exceeds p.</em>
</div>
`
      },
      {
        "title": "Parameter-Efficient Fine-Tuning (PEFT): Low-Rank Adaptation (LoRA) Mechanics",
        "language": "python",
        "starterCode": `import numpy as np

# LoRA Forward: y = W_0 x + (B @ A) * (alpha / r) * x
d_in, d_out, r = 4096, 4096, 16
alpha = 32.0

orig_params = d_in * d_out
lora_params = (d_in * r) + (r * d_out)
reduction = (1.0 - lora_params / orig_params) * 100

print(f"Full Linear Layer Parameters: {orig_params:,}")
print(f"LoRA Rank-16 Parameters:     {lora_params:,} ({round(reduction, 2)}% parameter reduction!)")
`,
        "content": `
<h2>⚡ Lesson 5: Parameter-Efficient Fine-Tuning (PEFT): Low-Rank Adaptation (LoRA) Mechanics</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Fine-tuning all 70B weights requires multi-node GPU clusters. Hu et al. (2021) showed weight updates ΔW have low intrinsic rank. LoRA freezes base weights and trains lightweight rank-r adapters B and A.</em>
</div>
`
      },
      {
        "title": "Quantized Low-Rank Adaptation (QLoRA): 4-bit NormalFloat (NF4) & Paged Optimizers",
        "language": "python",
        "starterCode": `import numpy as np

# QLoRA Memory Savings:
# 8B model in FP16: 8 * 2 bytes = 16 GB VRAM
# 8B model in 4-bit NF4: 8 * 0.5 bytes = 4 GB VRAM!
# Fits easily on a single consumer GPU (RTX 4090 / 3090)!
print("QLoRA allows fine-tuning an 8B model on a single 16GB/24GB consumer GPU with zero performance loss.")
`,
        "content": `
<h2>⚡ Lesson 6: Quantized Low-Rank Adaptation (QLoRA): 4-bit NormalFloat (NF4) & Paged Optimizers</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Dettmers et al. (2023) introduced QLoRA: quantizing frozen base model weights into 4-bit NormalFloat (NF4) with double quantization, enabling fine-tuning on a single consumer GPU.</em>
</div>
`
      },
      {
        "title": "Supervised Fine-Tuning (SFT): Instruction Datasets & Prompt Templates",
        "language": "python",
        "starterCode": `import numpy as np

# Standard ChatML Prompt Template:
prompt = """<|im_start|>system
You are a senior AI systems architect.<|im_end|>
<|im_start|>user
How does QLoRA work?<|im_end|>
<|im_start|>assistant
"""
print("Formatted ChatML Training Prompt:")
print(prompt)
`,
        "content": `
<h2>⚡ Lesson 7: Supervised Fine-Tuning (SFT): Instruction Datasets & Prompt Templates</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>A pre-trained model merely predicts the next token on the raw web. SFT trains the model to act as a helpful conversational agent using instruction-response pairs formatted with special tokens.</em>
</div>
`
      },
      {
        "title": "Alignment & Preference Optimization: RLHF with PPO vs Direct Preference Optimization (DPO)",
        "language": "python",
        "starterCode": `import numpy as np

# DPO Loss formula (Rafailov et al., 2023):
# Minimizes cross-entropy directly on preferred (y_w) vs dispreferred (y_l) completions
# without needing a separate reward model or RL actor-critic loops!
print("DPO replaces fragile RLHF PPO pipelines with an exact, stable closed-form classification loss!")
`,
        "content": `
<h2>⚡ Lesson 8: Alignment & Preference Optimization: RLHF with PPO vs Direct Preference Optimization (DPO)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>How do we prevent models from hallucinating or answering dangerous queries? DPO mathematically re-parameterizes the reward model directly into the policy loss, eliminating complex PPO reinforcement learning loops.</em>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "LoRA Adapter Weight Projection Simulator",
        "language": "python",
        "description": `
<h3>⚔️ CAPSTONE EXERCISE: Implement a LoRA Forward Layer</h3>
<p>Implement the LoRA forward calculation: $h = x W_0 + \\frac{\\alpha}{r} (x A) B$.</p>
`,
        "starterCode": `import numpy as np

def lora_forward(x, W0, A, B, alpha=32.0, r=8):
    # Base frozen projection
    base_out = x @ W0
    # LoRA adapter branch: x @ A @ B * (alpha / r)
    lora_out = (x @ A @ B) * (alpha / r)
    return base_out + lora_out

# Test verification
np.random.seed(42)
x = np.random.randn(1, 16)
W0 = np.random.randn(16, 16) * 0.1
A = np.random.randn(16, 8) * 0.1
B = np.zeros((8, 16)) # LoRA B initialized to 0 at start!

# When B=0, output must exactly equal base_out!
out = lora_forward(x, W0, A, B)
expected = x @ W0

print("Exact Match with Base Model on Init:", np.allclose(out, expected))
`,
        "expectedOutput": "Exact Match with Base Model on Init: True",
        "hints": [
          "B is initialized to 0 so the initial adapter is an identity transformation."
        ]
      }
    ],
    "project": {
      "title": "Fine-Tune an 8B Open Model (LLaMA-3/Mistral) with QLoRA",
      "requirements": [
        "Dataset preparation with tokenization and prompt templates",
        "BitsAndBytes 4-bit NF4 quantization configuration",
        "PEFT LoRA adapter targeting query, key, value, and output projection matrices",
        "SFTTrainer setup with gradient accumulation and BF16 mixed precision",
        "Evaluation against benchmark validation prompts and adapter export"
      ],
      "description": `
<p>Fine-tune an open-source 8B model (LLaMA 3 or Mistral) on a specialized domain dataset using 4-bit QLoRA. Configure memory-efficient training, monitor loss, and merge adapter weights for production serving.</p>
`
    },
    "quiz": [
      {
        "question": "Why is matrix B initialized to all zeros when setting up a LoRA adapter (ΔW = B · A)?",
        "options": [
          "To save GPU memory.",
          "Because initializing B to zero guarantees that ΔW = 0 at the start of training, ensuring the model's pre-trained capabilities are 100% preserved before gradient updates begin.",
          "Because matrix A is already initialized to zero.",
          "Because PyTorch cannot compute gradients on non-zero weights."
        ],
        "correctIndex": 1,
        "explanation": "With B = 0, BA = 0 initially, meaning the network starts at the exact pre-trained baseline state without any sudden output shifts."
      }
    ]
  },

  "ml-week-14": {
    "lessons": [
      {
        "title": "The Knowledge Cutoff & Hallucination Problem: Architecture of RAG Systems",
        "language": "python",
        "starterCode": `import numpy as np

# RAG Architecture in 3 steps:
# 1. Retrieve: Embed user query -> Query Vector DB -> Top-K chunks
# 2. Augment: Construct prompt containing retrieved context
# 3. Generate: LLM synthesizes grounded answer
print("RAG grounds LLM responses with fresh external enterprise knowledge!")
`,
        "content": `
<h2>🔎 Lesson 1: The Knowledge Cutoff & Hallucination Problem: Architecture of RAG Systems</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>LLMs hallucinate when asked about internal corporate documentation or real-time events. RAG (Retrieval-Augmented Generation) transforms generation from ungrounded memory recall into an open-book exam.</em>
</div>
`
      },
      {
        "title": "Dense Embeddings vs Sparse Search (BM25) & Hybrid Search Reciprocal Rank Fusion",
        "language": "python",
        "starterCode": `import numpy as np

# Reciprocal Rank Fusion (RRF) formula:
# RRF_score(doc) = ∑_{ranker} 1 / (k + rank_ranker(doc)), where k ≈ 60
def rrf_score(dense_rank, sparse_rank, k=60):
    return (1.0 / (k + dense_rank)) + (1.0 / (k + sparse_rank))

print("Doc ranked #1 in Dense and #2 in Sparse RRF Score:", round(rrf_score(1, 2), 5))
print("Combines semantic similarity with exact keyword matching!")
`,
        "content": `
<h2>🔎 Lesson 2: Dense Embeddings vs Sparse Search (BM25) & Hybrid Search Reciprocal Rank Fusion</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Dense embeddings capture synonyms and concepts, but struggle with exact model numbers, acronyms, and product IDs. Hybrid Search combines BM25 keyword matching with dense vectors via Reciprocal Rank Fusion (RRF).</em>
</div>
`
      },
      {
        "title": "Document Ingestion & Text Chunking Strategies: Semantic vs Recursive Character",
        "language": "python",
        "starterCode": `import numpy as np

# Recursive Character Chunking:
# Splits text by paragraph (\\n\\n), then sentence (\\n), then space ( ), respecting semantic boundaries.
print("Chunking Invariant: Chunks must be small enough to stay focused, but large enough to retain context.")
print("Always maintain a 10% - 20% token overlap between consecutive chunks!")
`,
        "content": `
<h2>🔎 Lesson 3: Document Ingestion & Text Chunking Strategies: Semantic vs Recursive Character</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Naive fixed-length chunking cuts sentences in half, severing semantic context. Modern chunkers use recursive delimiter hierarchies and semantic similarity shifts between adjacent paragraphs.</em>
</div>
`
      },
      {
        "title": "Approximate Nearest Neighbor (ANN) Vector Indexing: HNSW and IVF-PQ",
        "language": "python",
        "starterCode": `import numpy as np

# Exact search: O(N) comparisons against ALL vectors (too slow for millions of vectors!)
# HNSW (Hierarchical Navigable Small World): Skip-list graph search in O(log N) time!
print("HNSW builds a multi-layer proximity graph, searching nearest neighbors in sub-millisecond latencies.")
`,
        "content": `
<h2>🔎 Lesson 4: Approximate Nearest Neighbor (ANN) Vector Indexing: HNSW and IVF-PQ</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Comparing an embedding against 100 million vectors takes seconds. ANN indexing (HNSW, IVF-PQ) trades microscopic precision for 1,000x speedups, delivering top-k results in under 5 milliseconds.</em>
</div>
`
      },
      {
        "title": "Vector Databases in Production: Chroma, Qdrant, Milvus & pgvector",
        "language": "python",
        "starterCode": `import numpy as np

# pgvector in PostgreSQL:
# SELECT id, content FROM documents ORDER BY embedding <=> query_embedding LIMIT 5;
print("Vector DB Landscape: Qdrant / Milvus for dedicated scale; pgvector for unified relational + vector stacks.")
`,
        "content": `
<h2>🔎 Lesson 5: Vector Databases in Production: Chroma, Qdrant, Milvus & pgvector</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Dedicated vector databases (Qdrant, Milvus) offer distributed sharding and disk-backed indexing, while pgvector allows enterprise teams to store vectors alongside existing SQL relational data.</em>
</div>
`
      },
      {
        "title": "Advanced RAG: Re-ranking with Cross-Encoders & HyDE (Hypothetical Embeddings)",
        "language": "python",
        "starterCode": `import numpy as np

# Re-ranking Pipeline:
# 1. Bi-Encoder retrieves Top-100 candidates in 5ms (Fast)
# 2. Cross-Encoder re-ranks Top-100 into Top-5 using full token-to-token attention (High Precision)
print("Two-Stage Retrieval: Bi-Encoder for high recall; Cross-Encoder for high precision reranking.")
`,
        "content": `
<h2>🔎 Lesson 6: Advanced RAG: Re-ranking with Cross-Encoders & HyDE (Hypothetical Embeddings)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Bi-encoders compare queries and documents separately, missing complex cross-interactions. Two-stage retrieval retrieves top-100 candidates with bi-encoders and reranks the top-5 with deep Cross-Encoders.</em>
</div>
`
      },
      {
        "title": "Multi-Hop Retrieval, Document Summarization & Parent-Document Retrieval",
        "language": "python",
        "starterCode": `import numpy as np

# Parent-Document Retrieval:
# Embed small child chunks (for accurate vector matching),
# but pass the larger parent section to the LLM (for full context during generation)!
print("Parent-Document Retrieval: Solves the tension between search precision and synthesis context.")
`,
        "content": `
<h2>🔎 Lesson 7: Multi-Hop Retrieval, Document Summarization & Parent-Document Retrieval</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Complex questions require synthesizing information across multiple documents. Multi-hop agents decompose user queries into sub-questions and query the database iteratively.</em>
</div>
`
      },
      {
        "title": "Evaluation of RAG Systems: The Ragas Framework",
        "language": "python",
        "starterCode": `import numpy as np

# Ragas 4-Point Evaluation Metric:
# 1. Faithfulness: Is the answer derived strictly from the context (No Hallucinations)?
# 2. Answer Relevance: Does the answer address the user question?
# 3. Context Recall: Were all ground-truth facts retrieved?
# 4. Context Precision: Were the retrieved chunks high-signal?
print("Ragas Framework: Automated LLM-as-a-Judge evaluation of enterprise RAG pipelines.")
`,
        "content": `
<h2>🔎 Lesson 8: Evaluation of RAG Systems: The Ragas Framework</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>You cannot improve what you do not measure. The Ragas framework uses LLM-as-a-judge to evaluate Faithfulness, Answer Relevance, Context Recall, and Context Precision.</em>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Build a Vector Search Engine with Cosine Reranking",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an In-Memory Vector Search Engine</h3>
<p>Implement a function <code>retrieve_top_k(query_vec, doc_matrix, k=2)</code> that computes cosine similarities and returns the indices of the top-k most similar documents.</p>
`,
        "starterCode": `import numpy as np

def retrieve_top_k(query_vec, doc_matrix, k=2):
    # Normalize query and docs
    q_norm = query_vec / (np.linalg.norm(query_vec) + 1e-8)
    doc_norms = doc_matrix / (np.linalg.norm(doc_matrix, axis=1, keepdims=True) + 1e-8)
    # Cosine similarities
    similarities = doc_norms @ q_norm
    # Top-K indices
    top_indices = np.argsort(-similarities)[:k]
    return top_indices.tolist()

# Test run
docs = np.array([
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.9, 0.1, 0.0]
])
query = np.array([1.0, 0.0, 0.0])

top_k = retrieve_top_k(query, docs, k=2)
print("Top-K Document Indices:", top_k)
`,
        "expectedOutput": "Top-K Document Indices: [0, 2]",
        "hints": [
          "Use np.argsort(-similarities) to get descending ranking."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the primary purpose of a Cross-Encoder in a two-stage RAG retrieval pipeline?",
        "options": [
          "To generate synthetic queries.",
          "To re-rank top candidate chunks by passing the query and chunk jointly through full cross-attention, capturing fine-grained semantic interactions that bi-encoders miss.",
          "To index vectors into HNSW graphs.",
          "To compress text to 4-bit integers."
        ],
        "correctIndex": 1,
        "explanation": "Bi-encoders encode queries and docs independently. Cross-encoders attend across both simultaneously, delivering much higher ranking precision."
      }
    ]
  },

  "ml-week-15": {
    "lessons": [
      {
        "title": "Foundations of Agentic Systems: ReAct (Reason + Act) & Chain-of-Thought",
        "language": "python",
        "starterCode": `import numpy as np

# ReAct Loop:
# Thought: I need to check the user balance in the SQL database.
# Action: query_sql(user_id=42)
# Observation: balance = $1,500.00
# Thought: The balance is sufficient. I will proceed with the confirmation.
# Answer: Your account balance is $1,500.00.
print("ReAct: Interleaves internal reasoning thoughts with external tool actions and environment observations.")
`,
        "content": `
<h2>🤖 Lesson 1: Foundations of Agentic Systems: ReAct (Reason + Act) & Chain-of-Thought</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Static prompts are dead. Autonomous agents use reasoning loops (ReAct: Reason + Act) to inspect tools, formulate multi-step plans, observe real-world API outputs, and iteratively self-correct.</em>
</div>
`
      },
      {
        "title": "Function Calling & Structured Output Generation with Pydantic & Instructor",
        "language": "python",
        "starterCode": `import numpy as np

# Schema-guaranteed output structure
schema = {
    "name": "search_database",
    "description": "Searches corporate records",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {"type": "string"},
            "limit": {"type": "integer", "default": 5}
        },
        "required": ["query"]
    }
}

print("Tool Parameter Schema definition for LLM Function Calling:")
print(schema)
`,
        "content": `
<h2>🤖 Lesson 2: Function Calling & Structured Output Generation with Pydantic & Instructor</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Production systems cannot parse unpredictable natural language text. Function calling constrains the model's logits via grammar-guided decoding to output valid, validated JSON adhering strictly to Pydantic schemas.</em>
</div>
`
      },
      {
        "title": "Tool Definition, Parameter Schemas, Error Recovery & Calling Lifecycles",
        "language": "python",
        "starterCode": `import numpy as np

# Tool Calling Lifecycle:
# 1. LLM returns ToolCall(name="query_db", args={"user": "alice"})
# 2. Host orchestrator executes function safely in sandbox
# 3. Host passes ToolMessage(content="Result: Active") back into message history
print("Tool Loop: System -> User -> Assistant (ToolCall) -> Tool (Result) -> Assistant (Final Answer)")
`,
        "content": `
<h2>🤖 Lesson 3: Tool Definition, Parameter Schemas, Error Recovery & Calling Lifecycles</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Tools will fail: APIs throw 500 errors, SQL syntax breaks. Robust agent design feeds error messages back into the conversation history, allowing the LLM to analyze the traceback and self-correct on the next iteration.</em>
</div>
`
      },
      {
        "title": "Stateful Multi-Agent Architectures: State Machines & LangGraph",
        "language": "python",
        "starterCode": `import numpy as np

# Multi-Agent State Machine Graph:
# Node A (Researcher) -> Node B (Critic / Reviewer) -> [Approved? -> End | Rejected? -> Node A]
print("LangGraph / CrewAI: Models complex workflows as cyclical directed graphs with shared typed state.")
`,
        "content": `
<h2>🤖 Lesson 4: Stateful Multi-Agent Architectures: State Machines & LangGraph</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Single agent prompts break down under multi-phase workflows. Multi-agent state machines partition tasks into specialized roles (Researcher, Coder, Critic) coordinated via explicit state transitions and guardrails.</em>
</div>
`
      },
      {
        "title": "Agent Memory Systems: Working Memory, Vector Long-Term Memory & Reflection",
        "language": "python",
        "starterCode": `import numpy as np

# Memory Tiers:
# 1. Short-term Working Memory: The immediate context window (chat history).
# 2. Episodic Memory: Vector DB of past task summaries and user preferences.
# 3. Semantic Memory: Knowledge base of world facts and domain documentation.
print("Agent Memory Architecture: Bridges the transient context window with persistent long-term storage.")
`,
        "content": `
<h2>🤖 Lesson 5: Agent Memory Systems: Working Memory, Vector Long-Term Memory & Reflection</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Context windows are expensive and ephemeral. Agents use episodic memory to persist user preferences and past execution trajectories across independent user sessions.</em>
</div>
`
      },
      {
        "title": "Human-in-the-Loop (HITL), Approval Gates, Tool Sandboxing & Execution Isolation",
        "language": "python",
        "starterCode": `import numpy as np

# Safe Agent Invariant:
# Read operations (search, read_file) execute automatically.
# Destructive operations (delete_db, send_email, execute_shell) trigger Human Approval Gate!
print("Human-in-the-Loop (HITL): Critical actions halt execution until authenticated human signoff.")
`,
        "content": `
<h2>🤖 Lesson 6: Human-in-the-Loop (HITL), Approval Gates, Tool Sandboxing & Execution Isolation</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Never give an autonomous agent unconstrained shell or database access. Isolate code execution in ephemeral Docker/gVisor sandboxes and enforce human approval gates on write/delete actions.</em>
</div>
`
      },
      {
        "title": "Planning Frameworks: Tree-of-Thoughts (ToT) & Multi-Path Reflection",
        "language": "python",
        "starterCode": `import numpy as np

# Tree of Thoughts:
# Generates multiple reasoning branches, evaluates the promise of each branch with an evaluation prompt,
# and backtracks when a branch hits an impasse.
print("Tree-of-Thoughts: Explores non-linear search spaces with lookahead and backtracking.")
`,
        "content": `
<h2>🤖 Lesson 7: Planning Frameworks: Tree-of-Thoughts (ToT) & Multi-Path Reflection</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Linear chain-of-thought cannot recover from early flawed assumptions. Tree-of-Thoughts enables the model to explore multiple speculative paths, evaluate their promise, and backtrack.</em>
</div>
`
      },
      {
        "title": "Evaluating Autonomous Agents: Tool Accuracy, Trajectory Evaluation & Benchmarks",
        "language": "python",
        "starterCode": `import numpy as np

# Agent Evaluation Metrics:
# 1. Tool Call Accuracy: Did the agent call the correct tool with valid schema arguments?
# 2. Step Efficiency: How many intermediate steps were required to complete the task?
# 3. Final Task Success Rate: Did the final state satisfy the acceptance test suite?
print("Agent Benchmarks (e.g. SWE-bench): Automated grading against real-world GitHub issues.")
`,
        "content": `
<h2>🤖 Lesson 8: Evaluating Autonomous Agents: Tool Accuracy, Trajectory Evaluation & Benchmarks</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Benchmarking agents requires evaluating both the final deliverable and the trajectory: did it take unnecessary steps, get trapped in loops, or hallucinate non-existent tool arguments?</em>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Build a Deterministic Function Calling Dispatcher in Python",
        "language": "python",
        "description": `
<h3>⚔️ CAPSTONE EXERCISE: Build an Agent Tool Dispatcher</h3>
<p>Implement a function <code>execute_tool_call(tool_name, arguments, registry)</code> that validates and dispatches tool execution safely.</p>
`,
        "starterCode": `def add(a, b): return a + b
def multiply(a, b): return a * b

registry = {"add": add, "multiply": multiply}

def execute_tool_call(tool_name, arguments, registry):
    if tool_name not in registry:
        return {"error": f"Tool '{tool_name}' not found"}
    fn = registry[tool_name]
    try:
        result = fn(**arguments)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"error": str(e)}

call = execute_tool_call("multiply", {"a": 6, "b": 7}, registry)
print("Execution Result:", call)
`,
        "expectedOutput": "Execution Result: {'status': 'success', 'result': 42}",
        "hints": [
          "Validate tool existence before unpacking arguments."
        ]
      }
    ],
    "project": {
      "title": "Autonomous Software Debugging & PR Reviewer Agent with Tool Calling",
      "requirements": [
        "Pydantic schemas for file system and Git tools (read_file, run_tests, git_diff)",
        "ReAct execution loop with maximum iteration bounds and traceback feedback",
        "Automated unit test execution and patch generation",
        "Human approval gate before committing or creating pull requests",
        "Trajectory logging recording thoughts, tool calls, and final resolutions"
      ],
      "description": `
<p>Build an autonomous software debugging agent that ingests a failing unit test, uses tools to inspect source files, executes test suites in a sandbox, generates code patches, and submits a pull request with an explanatory summary.</p>
`
    },
    "quiz": [
      {
        "question": "What is the primary benefit of the ReAct (Reason + Act) prompting framework for autonomous agents?",
        "options": [
          "It compiles Python code into C++.",
          "It forces the LLM to output its reasoning trace (Thought) before calling a tool (Action), improving planning quality and allowing the model to adapt based on tool observations.",
          "It removes the need for APIs.",
          "It trains a new model from scratch."
        ],
        "correctIndex": 1,
        "explanation": "Interleaving reasoning thoughts with external actions prevents premature tool calls and allows the agent to self-correct based on feedback."
      }
    ]
  }
};
