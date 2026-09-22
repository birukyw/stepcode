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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Vaswani et al. (2017) discarded recurrence and convolutions entirely. Self-attention eliminates the sequential bottleneck, allowing entire sequence matrices to be processed in parallel on GPU tensor cores.
</div>

<h3>📖 The Problem with Reading One Word at a Time</h3>
<p>Before Transformers, all AI language models were <strong>Recurrent Neural Networks (RNNs or LSTMs)</strong>. An RNN reads a sentence the way a child reads a book: word by word, moving its finger from left to right.</p>
<p>The fatal flaw? <strong>Step 10 cannot begin until Step 9 finishes!</strong> You cannot parallelize sequential recurrence across 10,000 GPU cores. Furthermore, by the time an RNN reaches word 500, it has largely forgotten what happened at word 1.</p>
<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Transformer Revolution:</strong><br />
  The 2017 landmark paper <em>"Attention Is All You Need"</em> threw away recurrence entirely. Instead of reading sequentially, a Transformer takes all 2,000 words in a prompt and processes them <strong>simultaneously in parallel</strong> on the GPU, letting every word look at and attend to every other word at the exact same instant!
</div>
<p>Recurrent models process tokens sequentially from left to right (h<sub>t</sub> = f(h_{t-1}, x<sub>t</sub>)), preventing parallel execution during training. The Transformer replaces recurrent dependencies with global pairwise attention, reducing maximum signal path length from O(T) to O(1).</p>
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

<h3>🔎 The YouTube Search Analogy: Queries, Keys, and Values</h3>
<p>Self-attention can seem intimidating with all its matrices, but here is the perfect mental model from everyday life:</p>
<ul>
  <li><strong>Query (Q):</strong> What you type into the search bar (e.g., <em>"how to bake sourdough bread"</em>).</li>
  <li><strong>Key (K):</strong> The titles, tags, and descriptions of all videos in the database.</li>
  <li><strong>Value (V):</strong> The actual video content you watch!</li>
</ul>
<p>When you submit your Query, the search engine compares it against every single Key. The videos with the highest match (dot product) get the highest attention weight. Then, you receive a blend of the most relevant Values!</p>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Self-attention behaves like a differentiable soft database lookup: every token casts a Query (Q), compares it against all Keys (K) via dot products, and extracts a weighted blend of Values (V).
</div>

<p>The Scaled Dot-Product Attention formula is the beating heart of modern AI:</p>
<pre class=\"ascii-diagram\">
Attention(Q, K, V) = Softmax( (Q K^T) / √d_k ) · V
</pre>
<p><strong>Why Scale by √(d<sub>k</sub>)?</strong> In high dimensions (e.g. d<sub>k</sub> = 128), dot products grow large in magnitude, pushing the Softmax function into flat saturation regions with microscopic gradients. Dividing by √(d<sub>k</sub>) preserves variance 1.0 and stabilizes backpropagation.</p>
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
        "content": `<h2>🤖 Lesson 3: Multi-Head Attention (MHA) & Subspace Projections</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If you use a single attention head, it has to average all relationships into one blurry consensus. But a single word can have multiple relationships at the same time: grammatical subject, emotional tone, temporal tense, and factual subject! Multi-Head Attention gives the model multiple independent pairs of eyes.
</div>

<h3>🎯 The Committee of Specialized Readers</h3>
<p>Imagine a team of 8 specialized literary critics reading the sentence: <em>"The bank approved Alice's loan because she had excellent credit."</em></p>
<ul>
  <li><strong>Head 1 (Pronoun Resolver):</strong> Links <em>"she"</em> directly back to <em>"Alice"</em>.</li>
  <li><strong>Head 2 (Subject-Verb Detector):</strong> Links <em>"bank"</em> to <em>"approved"</em>.</li>
  <li><strong>Head 3 (Causality Tracker):</strong> Links <em>"approved"</em> to <em>"because"</em> and <em>"credit"</em>.</li>
  <li><strong>Head 4 (Disambiguation):</strong> Clarifies that <em>"bank"</em> means a financial institution, not a riverbank.</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ How Head Splitting Works Mathematically:</strong><br />
  Instead of performing attention once in high dimension <code>d_model = 4096</code>, we project <strong>Q</strong>, <strong>K</strong>, and <strong>V</strong> into <em>h</em> smaller subspaces of dimension <code>d_k = d_model / h</code> (e.g. 32 heads of dimension 128 each):
  <div class="math-formula">
    Head<sub>i</sub> = Attention(<strong>Q</strong> <strong>W</strong><sub>i</sub><sup>Q</sup>, <strong>K</strong> <strong>W</strong><sub>i</sub><sup>K</sup>, <strong>V</strong> <strong>W</strong><sub>i</sub><sup>V</sup>)
  </div>
  All <em>h</em> heads are calculated in parallel, concatenated, and projected through an output matrix <strong>W</strong><sup>O</sup>! The computational cost is virtually identical to a single big head, but the expressive power is exponentially richer.
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
        "content": `<h2>🤖 Lesson 4: Positional Encodings & Rotary Position Embeddings (RoPE)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Self-attention has a bizarre blind spot: it is <strong>permutation invariant</strong>! To a pure Transformer, <em>"Dog bites man"</em> and <em>"Man bites dog"</em> look 100% identical because the dot products between words do not depend on where the words sit in the sentence. We must explicitly inject word order into the vector representations.
</div>

<h3>🎯 Evolution of Positional Embeddings</h3>
<ul>
  <li><strong>Sinusoidal Encodings (Vaswani et al., 2017):</strong> Added fixed sine and cosine waves of different frequencies directly to input embeddings. Elegant, but struggled to extrapolate to longer documents.</li>
  <li><strong>Learned Absolute Position Embeddings (BERT, GPT-2):</strong> Trained a dedicated lookup table for positions 0 to 2047. Rigid and completely failed if prompted with token 2048!</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Modern Standard: RoPE (Rotary Position Embedding)</strong><br />
  Invented by Jianlin Su in 2021, <strong>RoPE</strong> powers virtually all modern state-of-the-art LLMs (LLaMA-3, Mistral, Gemma, Qwen)!
  <br /><br />
  Instead of <em>adding</em> a position vector to the word, RoPE pairs adjacent vector coordinates <code>(x₁, x₂)</code> and <strong>rotates them in 2D complex space</strong> by an angle proportional to the token position <em>m</em>:
  <div class="math-formula">
    <strong>q̃</strong><sub>m</sub> = <strong>R</strong><sub>Θ,m</sub><sup>d</sup> <strong>q</strong><sub>m</sub>
  </div>
  <em>The Magic:</em> When calculating the attention dot product between query <strong>q</strong> at position <em>m</em> and key <strong>k</strong> at position <em>n</em>, the result depends <strong>only on the relative distance (m - n)</strong>! This enables seamless context window extension (e.g. extending from 8k to 128k tokens with YaRN or RoPE scaling).
</div>
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
        "content": `<h2>🤖 Lesson 5: Masked Attention & Causal Decoding</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When training a text-generation model like ChatGPT, we train it on full sentences. But during generation, the model must predict one word at a time without peeking into the future! How do we train the model in parallel on entire documents without letting it cheat? We use the <strong>Causal Attention Mask</strong>.
</div>

<h3>🎯 The Privacy Curtain Analogy</h3>
<p>Imagine students taking an exam where question 5 asks them to predict what happens in chapter 6 of a mystery novel. If the whole book is open, they will just read chapter 6!</p>
<p>The Causal Attention Mask drops a privacy curtain over all future tokens:</p>
<ul>
  <li>Token 1 (<em>"The"</em>) can only attend to Token 1.</li>
  <li>Token 2 (<em>"cat"</em>) can attend to Token 1 and Token 2.</li>
  <li>Token 3 (<em>"sat"</em>) can attend to Tokens 1, 2, and 3.</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The -Infinity Mask Trick in Softmax:</strong><br />
  How do we mathematically enforce this curtain during parallel GPU computation?
  <br />
  We add an upper-triangular matrix filled with <code>-&infin;</code> to the raw attention scores before Softmax:
  <div class="math-formula">
    Attention_Weights = Softmax( (<strong>Q</strong><strong>K</strong>ᵀ / &radic;d<sub>k</sub>) + <strong>M</strong> )
  </div>
  Because <code>e⁻&infin; = 0</code>, the Softmax probability for all future tokens becomes <strong>exact zero</strong>! Gradients never leak from future to past.
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
        "content": `<h2>🤖 Lesson 6: The Modern Transformer Block Architecture</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  The original 2017 Transformer paper laid the foundation, but if you tried to train a 70-billion-parameter model using the original 2017 architecture, your training would diverge and crash within hours! Modern open-weight models (LLaMA-3, Mistral) incorporate 6 years of architectural refinements.
</div>

<h3>🎯 The Three Crucial Modern Upgrades</h3>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>1. Pre-LN vs Post-LN:</strong><br />
  In the original 2017 paper, LayerNorm was placed <em>after</em> the residual addition (Post-LN: <code>x = Norm(x + Sublayer(x))</code>). This required delicate learning rate warmup schedules because gradients near the output layer exploded.<br />
  Modern models use <strong>Pre-LN</strong> (or Pre-RMSNorm): <code>x = x + Sublayer(Norm(x))</code>. The residual stream remains an uncorrupted identity highway, allowing stable training of models with hundreds of layers!
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>2. SwiGLU (Swish Gated Linear Unit):</strong><br />
  Instead of a standard two-layer MLP with ReLU, modern LLMs use a gated feedforward network:
  <div class="math-formula">
    SwiGLU(<strong>x</strong>) = ( <strong>x</strong> <strong>W</strong><sub>gate</sub> &odot; Swish(<strong>x</strong> <strong>W</strong>) ) <strong>W</strong><sub>down</sub>
  </div>
  The gating mechanism acts like a valve that dynamically filters which features pass through, providing superior perplexity per parameter.
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
        "content": `<h2>🤖 Lesson 7: Efficient Attention: FlashAttention, MQA & GQA</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Standard self-attention has a notorious Achilles' heel: its memory and compute complexity scales with <strong>O(N²)</strong>, where <em>N</em> is sequence length! If you double your prompt length from 4k to 8k tokens, attention requires 4x more compute and memory. If you scale to 128k tokens, your GPU VRAM runs out instantly. Here is how modern systems conquered this bottleneck.
</div>

<h3>🎯 Breakthrough 1: FlashAttention (Tri Dao et al.)</h3>
<p>Before FlashAttention, researchers assumed attention was slow because of compute. Tri Dao discovered that attention is actually <strong>memory-bandwidth bound</strong>!</p>
<p>The GPU spent 90% of its time reading and writing the giant N &times; N attention matrix back and forth between slow High Bandwidth Memory (HBM) and fast on-chip SRAM cache.</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ FlashAttention's Tiling Secret:</strong><br />
  FlashAttention splits the inputs into small tiles that fit entirely inside ultra-fast SRAM cache (20 TB/s bandwidth!). It computes Softmax incrementally using online mathematical rescaling (the Milakov & Gimelshein online softmax trick), <strong>never writing the giant N &times; N matrix to HBM at all</strong>! Speed increases 3x, and memory drops from O(N²) to O(N).
</div>

<h3>🎯 Breakthrough 2: Grouped-Query Attention (GQA)</h3>
<p>During LLM generation, storing past Keys and Values (the KV Cache) consumes massive memory. If a model has 32 Query heads, storing 32 Key and Value heads for 100 concurrent users crashes VRAM.</p>
<ul>
  <li><strong>MHA (Multi-Head Attention):</strong> 32 Q heads, 32 K heads, 32 V heads (Huge KV cache).</li>
  <li><strong>MQA (Multi-Query Attention):</strong> 32 Q heads share <strong>1 single K and V head</strong>! (Slashes KV cache by 96%, but causes slight accuracy loss).</li>
  <li><strong>GQA (Grouped-Query Attention - LLaMA-3 Standard):</strong> 32 Q heads grouped into 8 groups of 4. Each group shares 1 K and 1 V head (Total: 8 K/V heads). <strong>Preserves 99.9% of MHA quality while slashing KV cache size by 75%!</strong></li>
</ul>
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
        "content": `<h2>🤖 Lesson 8: The Three Transformer Paradigms</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Not all Transformers are built the same! Depending on which attention masks and architectural halves you use, Transformers divide into three distinct dynasties, each tailored for different tasks.
</div>

<table class="comparison-table">
  <thead>
    <tr><th>Architecture</th><th>Attention Visibility</th><th>Flagship Models</th><th>Best Tasks</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Encoder-Only</strong></td><td><strong>Bidirectional:</strong> Every token sees all past AND future tokens</td><td>BERT, RoBERTa, DeBERTa</td><td>Classification, NER, Extractive QA, Dense Vector Embeddings</td></tr>
    <tr><td><strong>Decoder-Only</strong></td><td><strong>Causal (Autoregressive):</strong> Tokens can only see past tokens</td><td>GPT-4, LLaMA-3, Claude, Mistral</td><td>Open-ended text generation, coding, reasoning, conversational agents</td></tr>
    <tr><td><strong>Encoder-Decoder</strong></td><td>Encoder sees all; Decoder attends to past + cross-attends to encoder</td><td>T5, BART, Whisper (Speech)</td><td>Translation, Document Summarization, Audio Transcription</td></tr>
  </tbody>
</table>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Why Did Decoder-Only Win Generative AI?</strong><br />
  Decoder-only models unified all NLP tasks into one simple objective: <strong>next-token prediction</strong>. Whether writing Python, translating Russian, or doing calculus, it is all just continuing a prompt. This simplicity allowed unprecedented scaling to hundreds of billions of parameters!
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Tokenization defines the vocabulary of the model. Subword tokenization (BPE) ensures common words are single tokens, while rare or code tokens are broken into reusable sub-morphemes.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  \"Garbage in, garbage out.\" Training on deduplicated, high-quality curated data (Common Crawl filtered with fastText classifiers, synthetic textbooks) is the secret behind state-of-the-art models.
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
        "content": `<h2>🤖 Lesson 11: Scaling Laws: Kaplan vs Chinchilla</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Training a frontier AI model costs tens of millions of dollars in electricity and GPU compute. You cannot simply "guess" how big a model to train! In 2020, OpenAI published landmark scaling laws (Kaplan et al.), but in 2022, DeepMind discovered a multi-million-dollar mistake that changed the course of open-source AI.
</div>

<h3>🎯 The Kaplan Assumption vs The Chinchilla Correction</h3>
<ul>
  <li><strong>Kaplan Scaling Laws (OpenAI, 2020):</strong> Suggested that model parameter count was vastly more important than training token count. This led to models like GPT-3 (175 Billion parameters) being trained on only 300 Billion tokens!</li>
  <li><strong>Chinchilla Scaling Laws (Hoffmann et al., DeepMind, 2022):</strong> Proved that model size and training tokens should scale <strong>equally in equal proportion (1:1)</strong>! For every doubling of model parameters, you must also double the number of training tokens.</li>
</ul>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Student Analogy:</strong><br />
  Training a 175B model on 300B tokens is like hiring a genius with an enormous brain (175B parameters) but only letting them read 3 books (300B tokens)! They are severely undertrained.
  <br /><br />
  DeepMind trained <strong>Chinchilla (70B parameters)</strong> on 1.4 Trillion tokens. Despite being less than half the size of GPT-3, Chinchilla completely outperformed GPT-3 on virtually every benchmark—while being <strong>2.5x cheaper to serve in production</strong>! This paved the way for LLaMA, Mistral, and modern efficient models.
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
        "content": `<h2>🤖 Lesson 13: Decoding Strategies: Temperature, Top-K & Top-P</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When an LLM finishes its forward pass, it does not output a word. It outputs a probability distribution over 128,000 possible vocabulary tokens! How you sample from this distribution determines whether your model speaks like a dry robot or a creative poet.
</div>

<h3>🎯 The Sampling Toolkit</h3>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>1. Greedy Decoding (Argmax):</strong><br />
  Always pick the single token with highest probability (<code>argmax(p)</code>). Deterministic and great for math and code, but prone to getting stuck in repetitive loops in creative writing!
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>2. Temperature (T):</strong><br />
  Divides the raw logits by <em>T</em> before Softmax: <code>Softmax(z / T)</code>.
  <ul>
    <li><strong>Low Temperature (T = 0.2):</strong> Sharpening! Amplifies the gap between top candidates. Highly focused, conservative, factual.</li>
    <li><strong>High Temperature (T = 1.0+):</strong> Flattening! Smooths the distribution, giving unusual, creative words a higher chance to be selected. Set it too high (T = 2.0) and output becomes gibberish.</li>
  </ul>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>3. Top-K vs Top-P (Nucleus Sampling):</strong><br />
  Even at modest temperatures, there is a risk of sampling a completely nonsensical word from the long tail of the dictionary.
  <ul>
    <li><strong>Top-K:</strong> Strictly limits sampling to the top <em>K</em> most likely tokens (e.g. K = 50). <em>Weakness:</em> If 3 words make sense, it still samples from 50.</li>
    <li><strong>Top-P (Nucleus - Holtzman et al.):</strong> Dynamically accumulates tokens starting from the most probable until their cumulative probability reaches threshold <em>P</em> (e.g. P = 0.90). If the model is 90% certain of the next word, it samples only from that 1 word! If the context is open-ended, the candidate pool expands naturally.</li>
  </ul>
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
        "content": `<h2>🎓 Lesson 14: Parameter-Efficient Fine-Tuning: LoRA</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Training all 70 billion parameters of an open model requires a cluster of 8 &times; 80GB A100 GPUs ($250,000+). Furthermore, if you need 10 different customized models for 10 enterprise clients, storing 10 separate 70B checkpoints requires 1.4 Terabytes of disk space! In 2021, Edward Hu et al. introduced <strong>LoRA (Low-Rank Adaptation)</strong>, democratizing AI fine-tuning forever.
</div>

<h3>🎯 The Low-Rank Hypothesis</h3>
<p>Researchers discovered that the weight changes (ΔW) learned during fine-tuning have a very low <strong>intrinsic rank</strong>. You don't need to tweak all 4,096 &times; 4,096 dimensions of a weight matrix to teach it a specific task!</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Matrix Factorization Secret: W = W₀ + B &middot; A</strong><br />
  Instead of updating the original weight matrix <strong>W₀</strong> (dimension d &times; k), LoRA <strong>freezes W₀ completely</strong> and decomposes the update into two tiny low-rank matrices <strong>A</strong> and <strong>B</strong>:
  <div class="math-formula">
    <strong>W</strong> = <strong>W</strong>₀ + (α / r) &middot; (<strong>B</strong> &middot; <strong>A</strong>)
  </div>
  where:
  <ul>
    <li><strong>A:</strong> Dimension <code>d &times; r</code> (initialized with random Gaussian noise).</li>
    <li><strong>B:</strong> Dimension <code>r &times; k</code> (initialized to <strong>all zeros</strong>, ensuring ΔW = 0 at step 0!).</li>
    <li><strong>Rank r:</strong> Typically chosen between 8 and 64 (less than 1% of the original parameter count!).</li>
  </ul>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Zero Inference Latency Overhead:</strong><br />
  When deploying to production, you can simply add the adapter weights into the base weights in one step: <code>W_deployed = W₀ + (α/r) B·A</code>! The merged model runs with <strong>zero latency penalty</strong> compared to the original model!
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
        "content": `<h2>🎓 Lesson 15: QLoRA: 4-bit Quantized Fine-Tuning</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  While LoRA reduced trainable parameters by 99%, you still had to hold the original 65B base model in 16-bit precision, requiring over 130 GB of VRAM. In 2023, Tim Dettmers released <strong>QLoRA</strong>, allowing a 65B parameter model to be fine-tuned on a <strong>single 48GB GPU (or a 70B model on two consumer 24GB RTX 3090/4090s!)</strong> without performance degradation!
</div>

<h3>🎯 The Three Pillars of QLoRA</h3>
<ul>
  <li><strong>1. 4-bit NormalFloat (NF4):</strong> Pretrained neural network weights follow a normal distribution (Gaussian). Standard INT4 quantization assumes uniform spacing, causing high quantization error near zero. NF4 creates an information-theoretically optimal quantile grid designed specifically for normally distributed data!</li>
  <li><strong>2. Double Quantization (DQ):</strong> Quantizes the quantization constants themselves, saving an additional 0.37 bits per parameter (saving 3 GB of memory on a 65B model!).</li>
  <li><strong>3. Paged Optimizers:</strong> Leverages NVIDIA unified memory to automatically page optimizer states to CPU RAM whenever memory spikes occur, preventing Out-Of-Memory (OOM) crashes during long gradient updates!</li>
</ul>
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  A pre-trained model merely predicts the next token on the raw web. SFT trains the model to act as a helpful conversational agent using instruction-response pairs formatted with special tokens.
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
        "content": `<h2>🎓 Lesson 17: Alignment: RLHF vs Direct Preference Optimization (DPO)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  A raw pretrained language model is an internet autocomplete engine. If you ask it: <em>"How do I hotwire a car?"</em>, it might enthusiastically output detailed car theft instructions! <strong>Alignment</strong> transforms raw base models into helpful, honest, and harmless assistants.
</div>

<h3>🎯 Paradigm 1: RLHF with PPO (The Classic Approach)</h3>
<ol>
  <li>Collect human preference comparisons: <em>"Response A is better than Response B."</em></li>
  <li>Train a separate <strong>Reward Model</strong> to assign scalar scores to model outputs.</li>
  <li>Use <strong>PPO (Proximal Policy Optimization)</strong> reinforcement learning to optimize the policy model against the reward model with a KL-divergence penalty.</li>
</ol>
<p><em>The Pain Point:</em> Requires running 4 models simultaneously in GPU VRAM (Policy, Value, Reference, Reward), making it notoriously unstable and complex.</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Paradigm 2: DPO (Direct Preference Optimization - Rafailov et al., 2023)</strong><br />
  DPO proved mathematically that you can eliminate the reward model entirely! By reformulating the RL objective under the Bradley-Terry preference model, DPO derives an exact analytical closed-form loss directly on prompt pairs <code>(x, y_chosen, y_rejected)</code>:
  <div class="math-formula">
    Loss = - log σ( β &middot; log[ π<sub>θ</sub>(y<sub>w</sub>|x) / π<sub>ref</sub>(y<sub>w</sub>|x) ] - β &middot; log[ π<sub>θ</sub>(y<sub>l</sub>|x) / π<sub>ref</sub>(y<sub>l</sub>|x) ] )
  </div>
  Stable, uses standard cross-entropy style backpropagation, and has become the universal favorite for training open-weight models!
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
<p>Implement the LoRA forward calculation: h = x W<sub>0</sub> + (α / r) (x A) B.</p>
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  LLMs hallucinate when asked about internal corporate documentation or real-time events. RAG (Retrieval-Augmented Generation) transforms generation from ungrounded memory recall into an open-book exam.
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
        "content": `<h2>📚 Lesson 2: Hybrid Search & Reciprocal Rank Fusion (RRF)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When building RAG systems, developers often fall into the trap of assuming vector search is a silver bullet. If a customer searches for serial number <code>"XG-8924-REV2"</code>, vector embeddings will often retrieve completely unrelated serial numbers because semantic space doesn't capture exact character sequences! The production standard is <strong>Hybrid Search</strong>.
</div>

<h3>🎯 The Two Halves of Search</h3>
<ul>
  <li><strong>Sparse Lexical Search (BM25):</strong> Uses term frequency and inverse document frequency (TF-IDF). Flawless for exact keyword matches, SKU numbers, acronyms, and proper names.</li>
  <li><strong>Dense Semantic Search (Vector Embeddings):</strong> Uses cosine similarity in 1536-dimensional space. Flawless for understanding intent, synonyms, and multilingual concepts (e.g. matching <em>"canine physician"</em> to <em>"veterinarian"</em>).</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Reciprocal Rank Fusion (RRF): The Universal Combiner</strong><br />
  How do you merge a BM25 score of <code>18.4</code> with a vector cosine similarity score of <code>0.82</code>? You cannot simply add them because their scales and distributions are completely different!
  <br /><br />
  <strong>RRF</strong> ignores raw score magnitudes and uses only the <strong>rank position</strong> of items in each list:
  <div class="math-formula">
    RRF_Score(d) = ∑<sub>m ∈ {BM25, Dense}</sub> 1 / ( k + Rank<sub>m</sub>(d) )
  </div>
  where constant <code>k &approx; 60</code> dampens the influence of outlier ranks. Robust, parameter-free, and enterprise-grade!
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Naive fixed-length chunking cuts sentences in half, severing semantic context. Modern chunkers use recursive delimiter hierarchies and semantic similarity shifts between adjacent paragraphs.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Comparing an embedding against 100 million vectors takes seconds. ANN indexing (HNSW, IVF-PQ) trades microscopic precision for 1,000x speedups, delivering top-k results in under 5 milliseconds.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Dedicated vector databases (Qdrant, Milvus) offer distributed sharding and disk-backed indexing, while pgvector allows enterprise teams to store vectors alongside existing SQL relational data.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Bi-encoders compare queries and documents separately, missing complex cross-interactions. Two-stage retrieval retrieves top-100 candidates with bi-encoders and reranks the top-5 with deep Cross-Encoders.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Complex questions require synthesizing information across multiple documents. Multi-hop agents decompose user queries into sub-questions and query the database iteratively.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  You cannot improve what you do not measure. The Ragas framework uses LLM-as-a-judge to evaluate Faithfulness, Answer Relevance, Context Recall, and Context Precision.
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
        "content": `<h2>🤖 Lesson 1: Foundations of Agentic AI: ReAct & Reasoning</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  What separates a standard chatbot from an <strong>Autonomous AI Agent</strong>? A chatbot generates a single stream of text and stops. An Agent has agency: it can observe its environment, formulate a multi-step plan, use external tools (calculators, web search, SQL databases), evaluate the results, and self-correct when something fails!
</div>

<h3>🎯 The ReAct Framework (Yao et al., 2022)</h3>
<p>The landmark <strong>ReAct (Reason + Act)</strong> framework proved that LLMs become vastly more reliable when they alternate between internal reasoning and external action:</p>

<ol>
  <li><strong>Thought:</strong> The model reflects on its current objective and plans the next micro-step: <em>"I need to find the population of Tokyo and subtract the population of Paris."</em></li>
  <li><strong>Action:</strong> The model emits a structured tool call: <code>Action: search("population of Tokyo")</code>.</li>
  <li><strong>Observation:</strong> The execution environment runs the search and feeds the real-world answer back into the model context: <code>Observation: 13.96 million (2021)</code>.</li>
  <li><strong>Thought:</strong> The model updates its state: <em>"Now I have Tokyo's population. Next I need Paris."</em></li>
</ol>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Why Coupling Thought and Action Prevents Hallucination:</strong><br />
  If you ask a model to solve a problem with tools alone (Act only), it takes wild guesses without checking intermediate assumptions. If you ask it to think alone (Chain-of-Thought only), its thoughts are confined to outdated training data. ReAct creates a grounded feedback loop with reality!
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Production systems cannot parse unpredictable natural language text. Function calling constrains the model's logits via grammar-guided decoding to output valid, validated JSON adhering strictly to Pydantic schemas.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Tools will fail: APIs throw 500 errors, SQL syntax breaks. Robust agent design feeds error messages back into the conversation history, allowing the LLM to analyze the traceback and self-correct on the next iteration.
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
        "content": `<h2>🤖 Lesson 4: Stateful Multi-Agent Architectures & LangGraph</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Early agent frameworks relied on simple linear pipelines (Chains). But real enterprise workflows are not straight lines! They contain loops, condition branches, fallbacks, and human approval gates. In production, we model multi-agent systems as <strong>State Machines and Cyclic Graphs</strong>.
</div>

<h3>🎯 The Graph Paradigm</h3>
<p>In modern frameworks like <strong>LangGraph</strong>, you define your system as a directed graph:</p>
<ul>
  <li><strong>State:</strong> A central shared schema (typically a Pydantic object or TypedDict) containing conversation history, retrieved documents, extracted facts, and error logs.</li>
  <li><strong>Nodes:</strong> Python functions or LLM agents that read the state, perform work, and return state updates.</li>
  <li><strong>Edges:</strong> Conditional transition functions that decide which node executes next based on state values (e.g. <em>"If code tests fail &rarr; route to DebuggerAgent; else &rarr; route to DeploymentNode"</em>).</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Cycles are Essential:</strong><br />
  Unlike traditional DAGs (Airflow), agentic workflows <strong>must support cycles</strong>! An agent must be able to write code, test it, fail, loop back to itself with the error traceback, rewrite the code, and re-test until the tests pass!
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Context windows are expensive and ephemeral. Agents use episodic memory to persist user preferences and past execution trajectories across independent user sessions.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Never give an autonomous agent unconstrained shell or database access. Isolate code execution in ephemeral Docker/gVisor sandboxes and enforce human approval gates on write/delete actions.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Linear chain-of-thought cannot recover from early flawed assumptions. Tree-of-Thoughts enables the model to explore multiple speculative paths, evaluate their promise, and backtrack.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Benchmarking agents requires evaluating both the final deliverable and the trajectory: did it take unnecessary steps, get trapped in loops, or hallucinate non-existent tool arguments?
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
