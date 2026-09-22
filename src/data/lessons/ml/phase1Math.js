// ─── Phase 1: Mathematical Foundations & Computational Engines ────────────────
// Modules 1–3: Linear Algebra, Multivariable Calculus, Probability & Inference
// Includes 4–5 Animated SVG Math Diagrams per lesson & Fullscreen Theory layout

export const mlPhase1Content = {
  "ml-week-1": {
    "lessons": [
      {
        "title": "Vectors, Coordinate Systems & Multi-Dimensional Tensors",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 1: Vectors, Coordinate Systems & Multi-Dimensional Tensors</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Before neural networks can predict proteins or generate speech, every input—whether an image pixel, audio sample, or token embedding—must be projected into vector space. Master the transition from geometric arrows to high-dimensional memory arrays.
</div>

<h3>🎯 Welcome! What is a Vector in AI?</h3>
<p>If you remember high school geometry, you probably picture an arrow drawn on grid paper with an origin, an angle, and a length. That's a great physical intuition!</p>
<p>In Machine Learning, however, think of a vector as a <strong>data profile</strong>. For instance, if you're predicting apartment rental prices, you might describe an apartment with a list of 4 numbers: <code>[bedrooms, square_feet, distance_to_metro, floor_level]</code>. That list of 4 numbers is a 4-dimensional vector!</p>
<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Real-World Analogy:</strong> A song on Spotify can be described by audio features: <code>[danceability: 0.82, tempo: 128, acousticness: 0.15, valence: 0.74]</code>. When Spotify recommends songs similar to your taste, it is simply finding songs whose feature vectors point in almost the exact same direction in musical space!
</div>
<p>In classical Euclidean geometry, a vector is an arrow endowed with <strong>magnitude (length)</strong> and <strong>direction</strong> originating from an origin point. In machine learning, we generalize this: a vector <strong>x</strong> ∈ ℝ<sup>D</sup> is an ordered <em>D</em>-dimensional array of scalar features representing state or position in a continuous latent manifold.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.1: 2D & 3D VECTOR COORDINATE FRAMES</span>
    <span class=\"math-diagram-badge\">INTERACTIVE ANIMATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 240\">
    <defs>
      <marker id=\"arrow-cyan\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">
        <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#00e5ff\" />
      </marker>
      <marker id=\"arrow-purple\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">
        <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#b388ff\" />
      </marker>
      <marker id=\"arrow-green\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">
        <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#00e676\" />
      </marker>
    </defs>
    <!-- Grid -->
    <path d=\"M 40 40 L 40 200 M 120 40 L 120 200 M 200 40 L 200 200 M 40 120 L 200 120 M 40 200 L 200 200\" stroke=\"rgba(255,255,255,0.06)\" stroke-width=\"1\" />
    <!-- Axes 2D -->
    <line x1=\"40\" y1=\"200\" x2=\"210\" y2=\"200\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <line x1=\"40\" y1=\"200\" x2=\"40\" y2=\"30\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"215\" y=\"205\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"12\">x₁</text>
    <text x=\"35\" y=\"25\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"12\">x₂</text>
    <!-- Vector v = [3, 2] -->
    <line x1=\"40\" y1=\"200\" x2=\"160\" y2=\"100\" stroke=\"#00e5ff\" stroke-width=\"3\" stroke-dasharray=\"4\" class=\"anim-vector-pulse\" marker-end=\"url(#arrow-cyan)\" />
    <circle cx=\"160\" cy=\"100\" r=\"4\" fill=\"#00e5ff\" />
    <text x=\"165\" y=\"95\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">v = [3, 2]ᵀ</text>
    <!-- Projections -->
    <line x1=\"160\" y1=\"100\" x2=\"160\" y2=\"200\" stroke=\"rgba(0, 229, 255, 0.4)\" stroke-dasharray=\"2\" />
    <line x1=\"160\" y1=\"100\" x2=\"40\" y2=\"100\" stroke=\"rgba(0, 229, 255, 0.4)\" stroke-dasharray=\"2\" />

    <!-- 3D Tensor Rank Hierarchy -->
    <g transform=\"translate(270, 20)\">
      <rect x=\"0\" y=\"10\" width=\"80\" height=\"40\" rx=\"4\" fill=\"rgba(0,229,255,0.1)\" stroke=\"#00e5ff\" stroke-width=\"1.5\" />
      <text x=\"40\" y=\"35\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"11\">Rank-1 Vector<tspan x=\"40\" y=\"46\" font-size=\"9\" fill=\"#94a3b8\">(D,)</tspan></text>

      <rect x=\"110\" y=\"10\" width=\"80\" height=\"40\" rx=\"4\" fill=\"rgba(179,136,255,0.1)\" stroke=\"#b388ff\" stroke-width=\"1.5\" />
      <text x=\"150\" y=\"35\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"11\">Rank-2 Matrix<tspan x=\"150\" y=\"46\" font-size=\"9\" fill=\"#94a3b8\">(N, D)</tspan></text>

      <!-- 3D Cube Tensor -->
      <path d=\"M 40 100 L 110 100 L 140 75 L 70 75 Z\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" stroke-width=\"1.5\" />
      <path d=\"M 40 100 L 110 100 L 110 160 L 40 160 Z\" fill=\"rgba(0,230,118,0.1)\" stroke=\"#00e676\" stroke-width=\"1.5\" />
      <path d=\"M 110 100 L 140 75 L 140 135 L 110 160 Z\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" stroke-width=\"1.5\" />
      <text x=\"90\" y=\"135\" text-anchor=\"middle\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">Rank-3 Tensor<tspan x=\"90\" y=\"150\" font-size=\"9\" fill=\"#94a3b8\">(B, T, C)</tspan></text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Vectors are 1D slices of higher-rank tensors. Tensors generalize scalars (rank 0), vectors (rank 1), and matrices (rank 2) into arbitrary dimensional arrays.
  </div>
</div>

<h3>The Tensor Hierarchy in Deep Learning</h3>
<p>Modern machine learning operations manipulate multi-dimensional arrays known as <strong>tensors</strong>. The number of orthogonal indices required to look up a scalar entry is the tensor's <strong>rank</strong> (or order):</p>

<ul>
  <li><strong>Rank 0 (Scalar):</strong> A single numerical quantity s ∈ ℝ (e.g. learning rate α = 0.001, loss Loss <em>L</em> = 0.42).</li>
  <li><strong>Rank 1 (Vector):</strong> A 1D sequence of length <em>D</em>: <strong>x</strong> = [x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>D</sub>]ᵀ (e.g. word embedding vector of dimension 4096).</li>
  <li><strong>Rank 2 (Matrix):</strong> A 2D grid of size M × N: <strong>W</strong> ∈ ℝ<sup>M × N</sup> (e.g. weight projection matrix).</li>
  <li><strong>Rank 3 (3D Tensor):</strong> Batched sequences [B, T, D] where <em>B</em> is batch size, <em>T</em> is sequence token length, and <em>D</em> is embedding dimension.</li>
  <li><strong>Rank 4 (4D Tensor):</strong> Batched image volumes [B, C, H, W] (Batch, Channels, Height, Width).</li>
</ul>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.2: TENSOR MEMORY STRIDING & ROW-MAJOR PACKING</span>
    <span class=\"math-diagram-badge\">MEMORY BLUEPRINT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 520 180\">
    <!-- 2D View -->
    <rect x=\"30\" y=\"30\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" stroke-width=\"1.5\" />
    <text x=\"50\" y=\"55\" fill=\"#00e5ff\" font-family=\"monospace\" text-anchor=\"middle\">A[0,0]</text>
    <rect x=\"70\" y=\"30\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" stroke-width=\"1.5\" />
    <text x=\"90\" y=\"55\" fill=\"#00e5ff\" font-family=\"monospace\" text-anchor=\"middle\">A[0,1]</text>
    <rect x=\"30\" y=\"70\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#b388ff\" stroke-width=\"1.5\" />
    <text x=\"50\" y=\"95\" fill=\"#b388ff\" font-family=\"monospace\" text-anchor=\"middle\">A[1,0]</text>
    <rect x=\"70\" y=\"70\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#b388ff\" stroke-width=\"1.5\" />
    <text x=\"90\" y=\"95\" fill=\"#b388ff\" font-family=\"monospace\" text-anchor=\"middle\">A[1,1]</text>

    <!-- Arrow to Contiguous Buffer -->
    <path d=\"M 130 65 L 180 65\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"155\" y=\"55\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Flatten</text>

    <!-- 1D Linear Buffer -->
    <g transform=\"translate(200, 45)\">
      <rect x=\"0\" y=\"0\" width=\"65\" height=\"40\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" stroke-width=\"1.5\" />
      <text x=\"32\" y=\"24\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">A[0,0]</text>
      <text x=\"32\" y=\"55\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Byte 0</text>

      <rect x=\"65\" y=\"0\" width=\"65\" height=\"40\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" stroke-width=\"1.5\" />
      <text x=\"97\" y=\"24\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">A[0,1]</text>
      <text x=\"97\" y=\"55\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Byte 4</text>

      <rect x=\"130\" y=\"0\" width=\"65\" height=\"40\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" stroke-width=\"1.5\" />
      <text x=\"162\" y=\"24\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">A[1,0]</text>
      <text x=\"162\" y=\"55\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Byte 8</text>

      <rect x=\"195\" y=\"0\" width=\"65\" height=\"40\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" stroke-width=\"1.5\" />
      <text x=\"227\" y=\"24\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">A[1,1]</text>
      <text x=\"227\" y=\"55\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Byte 12</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    In physical RAM, matrices and higher-order tensors do not exist as multi-dimensional grids; they are packed into 1D contiguous byte buffers indexed by stride metadata.
  </div>
</div>

<h3>Tensor Slicing & Memory Strides</h3>
<p>In NumPy and PyTorch, a tensor consists of a pointer to a contiguous memory block plus a <strong>stride tuple</strong>:</p>
<pre class=\"ascii-diagram\">
Stride[k] = Number of elements to step in physical memory to advance 1 index along dimension k.
For contiguous row-major tensor of shape (M, N) with 4-byte float32 elements:
  stride = (N * 4 bytes, 4 bytes)
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.3: VECTOR ADDITION & PARALLELOGRAM LAW</span>
    <span class=\"math-diagram-badge\">VECTOR CALCULUS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 460 200\">
    <!-- Vector u and v -->
    <line x1=\"50\" y1=\"160\" x2=\"180\" y2=\"160\" stroke=\"#00e5ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"110\" y=\"180\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"12\">u = [4, 0]ᵀ</text>

    <line x1=\"50\" y1=\"160\" x2=\"130\" y2=\"60\" stroke=\"#b388ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"65\" y=\"100\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"12\">v = [2, 3]ᵀ</text>

    <!-- Parallelogram dashed lines -->
    <line x1=\"180\" y1=\"160\" x2=\"260\" y2=\"60\" stroke=\"rgba(179,136,255,0.4)\" stroke-dasharray=\"3\" />
    <line x1=\"130\" y1=\"60\" x2=\"260\" y2=\"60\" stroke=\"rgba(0,229,255,0.4)\" stroke-dasharray=\"3\" />

    <!-- Resultant u + v -->
    <line x1=\"50\" y1=\"160\" x2=\"260\" y2=\"60\" stroke=\"#00e676\" stroke-width=\"3\" stroke-dasharray=\"6\" class=\"anim-vector-pulse\" marker-end=\"url(#arrow-green)\" />
    <text x=\"210\" y=\"45\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">u + v = [6, 3]ᵀ</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The Parallelogram Law of Vector Addition: Vector addition operates element-wise, creating a displacement vector in feature space.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.4: BROADCASTING MECHANISM IN TENSOR MATH</span>
    <span class=\"math-diagram-badge\">BROADCASTING ENGINE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 520 160\">
    <!-- Shape (3, 1) -->
    <g transform=\"translate(20, 20)\">
      <rect x=\"0\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(0,229,255,0.2)\" stroke=\"#00e5ff\" />
      <rect x=\"0\" y=\"35\" width=\"35\" height=\"35\" fill=\"rgba(0,229,255,0.2)\" stroke=\"#00e5ff\" />
      <rect x=\"0\" y=\"70\" width=\"35\" height=\"35\" fill=\"rgba(0,229,255,0.2)\" stroke=\"#00e5ff\" />
      <text x=\"17\" y=\"125\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">[3, 1]</text>
    </g>
    <text x=\"80\" y=\"75\" fill=\"#fff\" font-family=\"monospace\" font-size=\"18\">+</text>
    <!-- Shape (1, 3) -->
    <g transform=\"translate(110, 20)\">
      <rect x=\"0\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" />
      <rect x=\"35\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" />
      <rect x=\"70\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" />
      <text x=\"52\" y=\"125\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">[1, 3]</text>
    </g>
    <text x=\"240\" y=\"75\" fill=\"#fff\" font-family=\"monospace\" font-size=\"18\">=</text>
    <!-- Result (3, 3) -->
    <g transform=\"translate(280, 10)\">
      <rect x=\"0\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"35\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"70\" y=\"0\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"0\" y=\"35\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"35\" y=\"35\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"70\" y=\"35\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"0\" y=\"70\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"35\" y=\"70\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <rect x=\"70\" y=\"70\" width=\"35\" height=\"35\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <text x=\"52\" y=\"135\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Output: [3, 3]</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Broadcasting Rules: Trailing dimensions are aligned. Any dimension of size 1 is virtually expanded without allocating redundant memory copies.
  </div>
</div>

<h3>Production Invariants for Production ML</h3>
<ul>
  <li><strong>Memory Contiguity:</strong> Operations like <code>.view()</code> in PyTorch require contiguous memory. If strides are discontinuous (e.g. after transpose), invoke <code>.contiguous()</code> to prevent segmentation faults.</li>
  <li><strong>Batch First vs Channels First:</strong> PyTorch defaults to NCHW (Batch, Channels, Height, Width), whereas TensorFlow often defaults to NHWC. Always verify tensor layout when porting models.</li>
</ul>
`
      },
      {
        "title": "Vector Spaces, Basis, Dot Products & Projections",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 2: Vector Spaces, Basis, Dot Products & Projections</h2>

<h3>🧭 The Intuition: Basis Vectors are Your Coordinate Rulers</h3>
<p>Imagine giving someone directions in a city laid out on a grid. You might say: <em>"Walk 3 blocks East and 2 blocks North."</em> Here, "East" and "North" are your <strong>basis directions</strong>, and "3" and "2" are your coordinates.</p>
<p>In mathematics, a <strong>basis</strong> is the minimal set of reference directions you need to reach <em>every single point</em> in your space without any redundant directions. In 2D space, you need 2 basis vectors; in 100-dimensional AI latent space, you need 100 independent basis vectors!</p>
<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Why Basis Matters in Deep Learning:</strong><br />
  When an embedding model converts sentences into vectors, it is projecting language onto a set of semantic basis vectors. One direction might encode "formality", another encodes "sentiment", and another encodes "tense".
</div>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Cosine similarity in vector databases, self-attention query-key matching, and linear neural layers all reduce to one fundamental operation: the Inner (Dot) Product. Understand its geometric and algebraic soul.
</div>

<p>A <strong>vector space</strong> Vector Space <em>V</em> over ℝ is a collection of vectors closed under vector addition and scalar multiplication. A set of vectors {<strong>v</strong><sub>1</sub>, <strong>v</strong><sub>2</sub>, ..., <strong>v</strong><sub>k</sub>} forms a <strong>basis</strong> for Vector Space <em>V</em> if they are linearly independent and span the entirety of Vector Space <em>V</em>.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.1: STANDARD BASIS VECTORS (î, ĵ) IN ℝ²</span>
    <span class=\"math-diagram-badge\">ORTHOGONAL BASIS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 460 220\">
    <!-- Axes -->
    <line x1=\"60\" y1=\"180\" x2=\"380\" y2=\"180\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <line x1=\"60\" y1=\"180\" x2=\"60\" y2=\"30\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <!-- Basis i-hat -->
    <line x1=\"60\" y1=\"180\" x2=\"160\" y2=\"180\" stroke=\"#00e5ff\" stroke-width=\"3\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"165\" y=\"195\" fill=\"#00e5ff\" font-family=\"monospace\" font-weight=\"bold\">î = [1, 0]ᵀ</text>
    <!-- Basis j-hat -->
    <line x1=\"60\" y1=\"180\" x2=\"60\" y2=\"80\" stroke=\"#b388ff\" stroke-width=\"3\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"15\" y=\"75\" fill=\"#b388ff\" font-family=\"monospace\" font-weight=\"bold\">ĵ = [0, 1]ᵀ</text>
    <!-- Any vector v = 2.5 i + 1.8 j -->
    <line x1=\"60\" y1=\"180\" x2=\"310\" y2=\"40\" stroke=\"#00e676\" stroke-width=\"2.5\" stroke-dasharray=\"4\" class=\"anim-vector-pulse\" marker-end=\"url(#arrow-green)\" />
    <text x=\"260\" y=\"30\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">v = 2.5î + 1.4ĵ</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The canonical standard basis vectors î and ĵ. Any arbitrary vector in ℝ² is uniquely expressed as a linear combination of basis vectors.
  </div>
</div>

<h3>The Dot Product (Inner Product)</h3>
<p>For vectors <strong>a</strong>, <strong>b</strong> ∈ ℝ<sup>D</sup>, their algebraic inner product is:</p>
<pre class=\"ascii-diagram\">
⟨a, b⟩ = a · b = ∑_{i=1}^D a_i b_i = ‖a‖ ‖b‖ cos(θ)
</pre>

<p>Where θ is the angle between the two vectors, and ||<strong>a</strong>|| = √(∑ a<sub>i</sub>²) is the Euclidean <em>L</em><sub>2</sub> norm.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.2: ORTHOGONAL PROJECTION OF A ONTO B</span>
    <span class=\"math-diagram-badge\">VECTOR PROJECTION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 220\">
    <!-- Base vector b -->
    <line x1=\"60\" y1=\"180\" x2=\"400\" y2=\"180\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"410\" y=\"185\" fill=\"#94a3b8\" font-family=\"monospace\">Vector b</text>

    <!-- Vector a -->
    <line x1=\"60\" y1=\"180\" x2=\"240\" y2=\"60\" stroke=\"#b388ff\" stroke-width=\"3\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"220\" y=\"50\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">Vector a</text>

    <!-- Projection line (perpendicular) -->
    <line x1=\"240\" y1=\"60\" x2=\"240\" y2=\"180\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"3\" />
    <rect x=\"228\" y=\"168\" width=\"12\" height=\"12\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1\" />
    <text x=\"250\" y=\"120\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">a - proj_b(a) (Orthogonal Error)</text>

    <!-- Projected vector on b -->
    <line x1=\"60\" y1=\"180\" x2=\"240\" y2=\"180\" stroke=\"#00e676\" stroke-width=\"4\" marker-end=\"url(#arrow-green)\" />
    <text x=\"100\" y=\"205\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">proj_b(a) = (a·b / ‖b‖²) b</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Orthogonal Projection: Vector a decomposed into a component parallel to b, and an orthogonal error component perpendicular to b.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.3: COSINE SIMILARITY & EMBEDDING ALIGNMENT</span>
    <span class=\"math-diagram-badge\">VECTOR SEARCH ENGINE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Arc showing angle theta -->
    <path d=\"M 160 120 A 40 40 0 0 0 145 95\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2\" />
    <text x=\"165\" y=\"105\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\">θ ≈ 30°</text>

    <line x1=\"80\" y1=\"130\" x2=\"250\" y2=\"130\" stroke=\"#00e5ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"260\" y=\"135\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">Embedding: \"King\"</text>

    <line x1=\"80\" y1=\"130\" x2=\"220\" y2=\"50\" stroke=\"#b388ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"230\" y=\"50\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\">Embedding: \"Queen\"</text>

    <text x=\"80\" y=\"25\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"12\">cos(θ) = (a · b) / (‖a‖ ‖b‖) = 0.866 → High Semantic Similarity</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Cosine Similarity: Evaluates directional alignment while ignoring magnitude differences (crucial in text embedding comparisons).
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.4: VECTOR NORMS L1, L2, AND L-INFINITY</span>
    <span class=\"math-diagram-badge\">REGULARIZATION GEOMETRY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- L1 diamond -->
    <g transform=\"translate(80, 90)\">
      <polygon points=\"0,-50 50,0 0,50 -50,0\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" stroke-width=\"2\" />
      <text x=\"0\" y=\"70\" text-anchor=\"middle\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">L1 Norm (Diamond)</text>
      <text x=\"0\" y=\"85\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\">|x₁| + |x₂| ≤ 1 (Lasso)</text>
    </g>
    <!-- L2 circle -->
    <g transform=\"translate(250, 90)\">
      <circle cx=\"0\" cy=\"0\" r=\"50\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" stroke-width=\"2\" />
      <text x=\"0\" y=\"70\" text-anchor=\"middle\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\">L2 Norm (Circle)</text>
      <text x=\"0\" y=\"85\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\">x₁² + x₂² ≤ 1 (Ridge)</text>
    </g>
    <!-- L_inf box -->
    <g transform=\"translate(420, 90)\">
      <rect x=\"-50\" y=\"-50\" width=\"100\" height=\"100\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" stroke-width=\"2\" />
      <text x=\"0\" y=\"70\" text-anchor=\"middle\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">L∞ Norm (Box)</text>
      <text x=\"0\" y=\"85\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\">max(|x₁|, |x₂|) ≤ 1</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Iso-norm contours: The sharp vertices of the L1 diamond intersect objective contours at axes, causing weights to zero out (sparsity).
  </div>
</div>
`
      },
      {
        "title": "Matrix Multiplication Mechanics, GEMM & Memory Cache Striding",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 3: Matrix Multiplication Mechanics, GEMM & Memory Cache Striding</h2>

<h3>🧩 The Mental Model: Batch Processing in Parallel</h3>
<p>If a vector represents <em>one</em> person's data, a <strong>matrix</strong> is simply a spreadsheet containing <em>thousands</em> of people stacked together as rows.</p>
<p>When we multiply a data matrix <strong>X</strong> by a weight matrix <strong>W</strong>, what are we really doing? We are calculating the dot product of every single person against every single feature detector in the layer simultaneously!</p>
<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Teacher's Hardware Insight:</strong><br />
  Why do GPUs exist for AI? Because modern GPUs have specialized hardware units (Tensor Cores) designed to perform 4×4 or 16×16 matrix multiplications in a single clock cycle!
</div>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Over 90% of GPU compute in LLM training is spent executing General Matrix Multiplications (GEMM). Learn how BLAS routines, tiled caching, and systolic arrays turn O(N^3) loops into teraflops of throughput.
</div>

<p>Given matrices <strong>A</strong> ∈ ℝ<sup>M × K</sup> and <strong>B</strong> ∈ ℝ<sup>K × N</sup>, their product <strong>C</strong> = <strong>AB</strong> ∈ ℝ<sup>M × N</sup> has entries:</p>
<pre class=\"ascii-diagram\">
C_{i, j} = ∑_{k=1}^K A_{i, k} · B_{k, j}
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.1: ROW-BY-COLUMN INNER PRODUCT MULTIPLICATION</span>
    <span class=\"math-diagram-badge\">GEMM CORE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Matrix A Row i -->
    <rect x=\"40\" y=\"60\" width=\"120\" height=\"30\" fill=\"rgba(0,229,255,0.2)\" stroke=\"#00e5ff\" stroke-width=\"2\" />
    <text x=\"100\" y=\"80\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Row i of A</text>
    <text x=\"100\" y=\"45\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Matrix A (M × K)</text>

    <!-- Matrix B Col j -->
    <rect x=\"220\" y=\"30\" width=\"30\" height=\"120\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" stroke-width=\"2\" />
    <text x=\"235\" y=\"95\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\" transform=\"rotate(-90 235 95)\">Col j of B</text>
    <text x=\"235\" y=\"20\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Matrix B (K × N)</text>

    <!-- Arrow to Output C[i, j] -->
    <path d=\"M 270 90 L 330 90\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />

    <!-- Matrix C -->
    <rect x=\"350\" y=\"30\" width=\"110\" height=\"110\" fill=\"#0f172a\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <rect x=\"380\" y=\"60\" width=\"30\" height=\"30\" fill=\"rgba(0,230,118,0.4)\" stroke=\"#00e676\" stroke-width=\"2\" class=\"anim-heat-pulse\" />
    <text x=\"395\" y=\"80\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">C[i,j]</text>
    <text x=\"405\" y=\"160\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Matrix C (M × N)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The scalar entry C[i, j] is the dot product between the i-th row of A and the j-th column of B.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.2: MEMORY HIERARCHY & TILED CACHE BLOCKS</span>
    <span class=\"math-diagram-badge\">HARDWARE ARCHITECTURE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Hierarchy Pyramid -->
    <polygon points=\"250,20 170,140 330,140\" fill=\"none\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <!-- L1 -->
    <polygon points=\"250,20 220,60 280,60\" fill=\"rgba(0,229,255,0.2)\" stroke=\"#00e5ff\" />
    <text x=\"250\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">L1 Registers (~1 TB/s)</text>
    <!-- L2 -->
    <polygon points=\"220,60 195,100 305,100 280,60\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" />
    <text x=\"250\" y=\"85\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">L2 Shared SRAM</text>
    <!-- HBM / DRAM -->
    <polygon points=\"195,100 170,140 330,140 305,100\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
    <text x=\"250\" y=\"125\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">GPU HBM3 / DRAM</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Tiled Matrix Multiplication: Algorithms partition huge matrices into sub-blocks that fit into fast on-chip SRAM/registers, avoiding costly memory trips to high-bandwidth RAM.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.3: SYSTOLIC ARRAY DATAFLOW (TPU / TENSOR CORES)</span>
    <span class=\"math-diagram-badge\">HARDWARE ACCELERATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <g transform=\"translate(130, 20)\">
      <!-- 3x3 Grid of PEs -->
      <rect x=\"0\" y=\"0\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"60\" y=\"0\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"120\" y=\"0\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"0\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"60\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"120\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"0\" y=\"100\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"60\" y=\"100\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <rect x=\"120\" y=\"100\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
      <text x=\"20\" y=\"25\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">PE</text>
      <text x=\"80\" y=\"25\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">PE</text>
      <text x=\"140\" y=\"25\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">PE</text>
    </g>
    <!-- Flow arrows -->
    <path d=\"M 60 40 L 115 40\" stroke=\"#b388ff\" stroke-width=\"2\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"40\" y=\"45\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\">Weights</text>

    <path d=\"M 150 0 L 150 15\" stroke=\"#00e676\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\" />
    <text x=\"150\" y=\"-5\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Inputs</text>
  </svg>
  <div class=\"math-diagram-caption\">
    In a Systolic Array, inputs stream vertically and weights stream horizontally through Processing Elements (PEs), accumulating partial sums on each clock cycle without reading/writing back to registers.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.4: COMPUTE-BOUND VS MEMORY-BOUND ROOFLINE MODEL</span>
    <span class=\"math-diagram-badge\">PERFORMANCE PROFILING</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Axes -->
    <line x1=\"60\" y1=\"140\" x2=\"440\" y2=\"140\" stroke=\"#64748b\" stroke-width=\"1.5\" />
    <line x1=\"60\" y1=\"140\" x2=\"60\" y2=\"20\" stroke=\"#64748b\" stroke-width=\"1.5\" />
    <text x=\"250\" y=\"160\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Operational Intensity (FLOPs / Byte)</text>
    <text x=\"40\" y=\"25\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">GFLOP/s</text>

    <!-- Roofline curve -->
    <line x1=\"60\" y1=\"140\" x2=\"220\" y2=\"40\" stroke=\"#00e5ff\" stroke-width=\"3\" />
    <line x1=\"220\" y1=\"40\" x2=\"440\" y2=\"40\" stroke=\"#00e676\" stroke-width=\"3\" />

    <text x=\"130\" y=\"70\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" transform=\"rotate(-35 130 70)\">Memory-Bound</text>
    <text x=\"320\" y=\"30\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">Compute-Bound (Peak FLOPS)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The Roofline Model: Large matrix multiplications have high operational intensity and reach peak compute, whereas token-by-token LLM generation is memory-bandwidth bound.
  </div>
</div>
`
      },
      {
        "title": "Linear Transformations, Determinants & Volume Scaling",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 4: Linear Transformations, Determinants & Volume Scaling</h2>

<h3>🎈 The Intuition: Matrices Warping Space</h3>
<p>Most students are taught that a matrix is a static grid of numbers. But in machine learning, think of a matrix as a <strong>machine that transforms space</strong>.</p>
<p>When you multiply a vector by a matrix, the vector moves: it stretches, shrinks, rotates, or shears! The fundamental rule of a <em>linear</em> transformation is that grid lines remain parallel and evenly spaced, and the origin (0, 0) never moves.</p>
<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 What Does the Determinant Mean?</strong><br />
  Think of drawing a 1×1 square on a sheet of rubber (area = 1). When you stretch the rubber using a matrix, the area of that square changes. The <strong>determinant</strong> is simply the factor by which areas (or volumes) scale! If the determinant is 0, space is squashed completely flat, and you can never reverse the operation.
</div>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Every linear layer in a neural network (y = Wx + b) performs a geometric transformation: stretching, rotating, reflecting, and shearing the latent space. The determinant reveals whether volume is expanded, compressed, or collapsed entirely.
</div>

<p>A mapping T: V to W is a <strong>linear transformation</strong> if it preserves addition and scalar multiplication: T(c<strong>u</strong> + <strong>v</strong>) = cT(<strong>u</strong>) + T(<strong>v</strong>). In finite dimensions, every linear transformation is completely defined by how it transforms the standard basis vectors hat{i} and hat{j}.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.1: GRID SHEAR & ROTATION VIA MATRIX MULTIPLICATION</span>
    <span class=\"math-diagram-badge\">GEOMETRIC TRANSFORMATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Original Unit Square -->
    <g transform=\"translate(50, 40)\">
      <rect x=\"0\" y=\"0\" width=\"80\" height=\"80\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" stroke-width=\"2\" />
      <text x=\"40\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Area = 1</text>
      <text x=\"40\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Original Basis</text>
    </g>

    <!-- Transformation Arrow -->
    <path d=\"M 180 80 L 250 80\" stroke=\"#b388ff\" stroke-width=\"2\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"215\" y=\"70\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">T = [[2, 1], [0, 1.5]]</text>

    <!-- Transformed Parallelogram -->
    <g transform=\"translate(290, 40)\">
      <polygon points=\"0,80 80,80 120,0 40,0\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" stroke-width=\"2\" />
      <text x=\"60\" y=\"45\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Area = |det(T)| = 3.0</text>
      <text x=\"60\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Sheared & Scaled</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    The absolute value of the determinant |det(A)| equals the factor by which areas (or n-dimensional volumes) scale under linear transformation A.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.2: SINGULAR MATRIX COLLAPSE (DET = 0)</span>
    <span class=\"math-diagram-badge\">DIMENSIONAL COLLAPSE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- 2D space squished to a 1D line -->
    <rect x=\"40\" y=\"30\" width=\"100\" height=\"80\" fill=\"rgba(0,229,255,0.1)\" stroke=\"#00e5ff\" />
    <text x=\"90\" y=\"75\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">2D Plane ℝ²</text>

    <path d=\"M 170 70 L 250 70\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"210\" y=\"60\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">det(A) = 0</text>

    <!-- Collapsed 1D Line -->
    <line x1=\"290\" y1=\"110\" x2=\"440\" y2=\"30\" stroke=\"#ef4444\" stroke-width=\"3\" />
    <text x=\"365\" y=\"90\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Collapsed to 1D Line (Irreversible Loss)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Singular Transformation: When det(A) = 0, the transformation squashes space into lower dimensions, destroying information. Such matrices cannot be inverted.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.3: MATRIX INVERSION & IDENTITY PRESERVATION</span>
    <span class=\"math-diagram-badge\">ALGEBRAIC REVERSIBILITY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <g transform=\"translate(60, 40)\">
      <rect x=\"0\" y=\"0\" width=\"80\" height=\"50\" rx=\"4\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
      <text x=\"40\" y=\"30\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"14\" text-anchor=\"middle\">A</text>
    </g>
    <text x=\"170\" y=\"70\" fill=\"#fff\" font-family=\"monospace\" font-size=\"16\">×</text>
    <g transform=\"translate(200, 40)\">
      <rect x=\"0\" y=\"0\" width=\"80\" height=\"50\" rx=\"4\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
      <text x=\"40\" y=\"30\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"14\" text-anchor=\"middle\">A⁻¹</text>
    </g>
    <text x=\"310\" y=\"70\" fill=\"#fff\" font-family=\"monospace\" font-size=\"16\">=</text>
    <g transform=\"translate(340, 40)\">
      <rect x=\"0\" y=\"0\" width=\"80\" height=\"50\" rx=\"4\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" stroke-width=\"2\" />
      <text x=\"40\" y=\"30\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">I (Identity)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Invertible Transformations: If det(A) ≠ 0, A⁻¹ exists and completely undoes the spatial transformation.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.4: ROTATION MATRIX ORTHOGONALITY (SO(2))</span>
    <span class=\"math-diagram-badge\">ISOMETRIC ROTATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Circle with rotated axes -->
    <circle cx=\"250\" cy=\"80\" r=\"60\" fill=\"none\" stroke=\"#475569\" stroke-dasharray=\"2\" />
    <line x1=\"250\" y1=\"80\" x2=\"310\" y2=\"80\" stroke=\"#00e5ff\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <line x1=\"250\" y1=\"80\" x2=\"292\" y2=\"38\" stroke=\"#00e676\" stroke-width=\"2.5\" marker-end=\"url(#arrow-green)\" />
    <path d=\"M 280 80 A 30 30 0 0 0 272 58\" fill=\"none\" stroke=\"#facc15\" />
    <text x=\"290\" y=\"70\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\">θ = 45°</text>
    <text x=\"250\" y=\"160\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">R(θ) = [[cos θ, -sin θ], [sin θ, cos θ]] · det(R) = 1 (Preserves Distance)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Orthogonal Matrices: Preserve vector norms and angles (det = ±1). Used in Rotary Position Embeddings (RoPE) in LLMs like LLaMA 3.
  </div>
</div>
`
      },
      {
        "title": "Orthogonality, Orthonormal Bases & Gram-Schmidt",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 5: Orthogonality, Orthonormal Bases & Gram-Schmidt</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Orthogonal bases eliminate redundancy and prevent numerical instability in deep learning. Learn how QR factorization and Gram-Schmidt orthogonalization construct stable computational coordinates.
</div>

<p>Two vectors <strong>u</strong>, <strong>v</strong> are <strong>orthogonal</strong> if their dot product vanishes: <strong>u</strong> · <strong>v</strong> = 0. A set of vectors is <strong>orthonormal</strong> if they are pairwise orthogonal and each has unit length: ||<strong>u</strong><sub>i</sub>|| = 1.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.1: THE GRAM-SCHMIDT ORTHOGONALIZATION SEQUENCE</span>
    <span class=\"math-diagram-badge\">ORTHOGONALIZATION PIPELINE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Original v1 and v2 -->
    <line x1=\"60\" y1=\"160\" x2=\"220\" y2=\"160\" stroke=\"#00e5ff\" stroke-width=\"3\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"140\" y=\"180\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">u₁ = v₁</text>

    <line x1=\"60\" y1=\"160\" x2=\"180\" y2=\"60\" stroke=\"#b388ff\" stroke-width=\"2\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"110\" y=\"90\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\">v₂</text>

    <!-- Subtraction of projection -->
    <line x1=\"180\" y1=\"60\" x2=\"180\" y2=\"160\" stroke=\"#ef4444\" stroke-dasharray=\"3\" stroke-width=\"1.5\" />

    <!-- Resulting u2 -->
    <line x1=\"60\" y1=\"160\" x2=\"60\" y2=\"60\" stroke=\"#00e676\" stroke-width=\"3\" marker-end=\"url(#arrow-green)\" />
    <text x=\"40\" y=\"50\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">u₂ = v₂ - proj_{u₁}(v₂)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Gram-Schmidt Process: Subtract the projection of v₂ onto u₁ to yield an orthogonal vector u₂ ⟂ u₁.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.2: QR FACTORIZATION ARCHITECTURE (A = QR)</span>
    <span class=\"math-diagram-badge\">NUMERICAL DECOMPOSITION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <g transform=\"translate(50, 30)\">
      <rect x=\"0\" y=\"0\" width=\"80\" height=\"80\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
      <text x=\"40\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"13\" text-anchor=\"middle\">A</text>
      <text x=\"40\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">General Matrix</text>
    </g>
    <text x=\"165\" y=\"75\" fill=\"#fff\" font-family=\"monospace\" font-size=\"18\">=</text>
    <g transform=\"translate(200, 30)\">
      <rect x=\"0\" y=\"0\" width=\"80\" height=\"80\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
      <text x=\"40\" y=\"45\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"13\" text-anchor=\"middle\">Q</text>
      <text x=\"40\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Orthogonal (QᵀQ = I)</text>
    </g>
    <g transform=\"translate(310, 30)\">
      <polygon points=\"0,80 80,80 80,0\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" stroke-width=\"1.5\" />
      <text x=\"55\" y=\"55\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"13\" text-anchor=\"middle\">R</text>
      <text x=\"40\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Upper Triangular</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    QR Decomposition: Decomposes matrix A into orthogonal matrix Q and upper-triangular matrix R. Solves least-squares regression with superior numerical stability compared to the normal equation.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.3: SUBSPACES: NULL SPACE AND COLUMN SPACE</span>
    <span class=\"math-diagram-badge\">FUNDAMENTAL THEOREM</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Col(A) and Null(A^T) -->
    <g transform=\"translate(60, 20)\">
      <rect x=\"0\" y=\"0\" width=\"160\" height=\"100\" fill=\"rgba(0,229,255,0.1)\" stroke=\"#00e5ff\" />
      <text x=\"80\" y=\"35\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Column Space Col(A)</text>
      <line x1=\"80\" y1=\"50\" x2=\"80\" y2=\"90\" stroke=\"#ef4444\" stroke-width=\"2\" />
      <text x=\"80\" y=\"80\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">⟂ Orthogonal</text>
    </g>
    <g transform=\"translate(280, 20)\">
      <rect x=\"0\" y=\"0\" width=\"160\" height=\"100\" fill=\"rgba(179,136,255,0.1)\" stroke=\"#b388ff\" />
      <text x=\"80\" y=\"35\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Null Space Null(Aᵀ)</text>
      <text x=\"80\" y=\"70\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Vectors mapped to 0</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    The Four Fundamental Subspaces: The column space Col(A) is orthogonal to the left nullspace Null(Aᵀ).
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.4: HOUSEHOLDER REFLECTIONS</span>
    <span class=\"math-diagram-badge\">STABLE NUMERICS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Mirror plane -->
    <line x1=\"250\" y1=\"10\" x2=\"250\" y2=\"130\" stroke=\"#475569\" stroke-width=\"2\" stroke-dasharray=\"4\" />
    <text x=\"250\" y=\"145\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Hyperplane Mirror</text>
    <!-- Vector x and reflected Hx -->
    <line x1=\"160\" y1=\"70\" x2=\"250\" y2=\"70\" stroke=\"#00e5ff\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <line x1=\"250\" y1=\"70\" x2=\"340\" y2=\"70\" stroke=\"#00e676\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\" />
    <text x=\"190\" y=\"60\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">x</text>
    <text x=\"300\" y=\"60\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">Hx</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Householder Transformation: Uses reflections across a hyperplane to zero out sub-diagonal entries in QR factorization with machine-precision stability.
  </div>
</div>
`
      },
      {
        "title": "Matrix Decompositions: Eigenvalues, Eigenvectors & Spectral Theorem",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 6: Matrix Decompositions: Eigenvalues, Eigenvectors & Spectral Theorem</h2>

<h3>⚡ The Intuition: The Axis of Pure Stretch</h3>
<p>When a matrix transforms space, it usually knocks vectors off their original line—they rotate and stretch simultaneously. But for almost every matrix, there are special "privileged" directions that <strong>do not rotate at all</strong>. They only stretch or shrink along their original line.</p>
<p>Those special directions are <strong>eigenvectors</strong>, and the factor by which they stretch is their <strong>eigenvalue</strong>!</p>
<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Real-World Analogy: Wind on a Sailboat:</strong> Think of wind pushing against a sail. Most directions make the boat drift sideways, but there is one special heading where the wind pushes the boat straight ahead along its keel without twisting. That heading is an eigenvector of the wind's force!
</div>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When most vectors undergo a matrix transformation, their direction shifts wildly. But special vectors maintain their exact directional heading, simply scaling in magnitude. These are eigenvectors—the axes of principal variance in data science.
</div>

<p>For a square matrix <strong>A</strong> ∈ ℝ<sup>N × N</sup>, a non-zero vector <strong>v</strong> is an <strong>eigenvector</strong> corresponding to <strong>eigenvalue</strong> λ if:</p>
<pre class=\"ascii-diagram\">
A v = λ v   ⟺   (A - λ I) v = 0
</pre>
<p>Non-trivial solutions exist if and only if the characteristic polynomial vanishes: det(<strong>A</strong> - λ <strong>I</strong>) = 0.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.1: EIGENVECTOR INVARIANCE UNDER TRANSFORMATION</span>
    <span class=\"math-diagram-badge\">SPECTRAL INVARIANCE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Standard vector changes direction -->
    <line x1=\"60\" y1=\"150\" x2=\"160\" y2=\"110\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <line x1=\"60\" y1=\"150\" x2=\"130\" y2=\"50\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"3\" />
    <text x=\"165\" y=\"110\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\">Arbitrary vector x</text>
    <text x=\"135\" y=\"45\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">Ax (Rotated!)</text>

    <!-- Eigenvector stays on its span -->
    <line x1=\"60\" y1=\"150\" x2=\"180\" y2=\"90\" stroke=\"#00e676\" stroke-width=\"3\" marker-end=\"url(#arrow-green)\" />
    <line x1=\"60\" y1=\"150\" x2=\"320\" y2=\"20\" stroke=\"#00e676\" stroke-width=\"2\" stroke-dasharray=\"4\" class=\"anim-vector-pulse\" marker-end=\"url(#arrow-green)\" />
    <text x=\"190\" y=\"100\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">v (Eigenvector)</text>
    <text x=\"330\" y=\"25\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">Av = λv (Pure Scaling!)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Eigenvectors preserve their directional span under transformation A. Only their length changes by scalar factor λ.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.2: SPECTRAL THEOREM FOR SYMMETRIC MATRICES</span>
    <span class=\"math-diagram-badge\">ORTHOGONAL DIAGONALIZATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- A = Q Lambda Q^T -->
    <g transform=\"translate(50, 30)\">
      <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
      <text x=\"35\" y=\"40\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">A = Aᵀ</text>
    </g>
    <text x=\"145\" y=\"70\" fill=\"#fff\" font-family=\"monospace\" font-size=\"16\">=</text>
    <g transform=\"translate(170, 30)\">
      <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
      <text x=\"35\" y=\"40\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">Q</text>
    </g>
    <g transform=\"translate(260, 30)\">
      <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" />
      <text x=\"35\" y=\"40\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Λ</text>
      <text x=\"35\" y=\"55\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">diag(λ)</text>
    </g>
    <g transform=\"translate(350, 30)\">
      <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
      <text x=\"35\" y=\"40\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">Qᵀ</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    The Spectral Theorem: Every real symmetric matrix A = Aᵀ possesses real eigenvalues and an orthonormal basis of eigenvectors Q, allowing exact diagonalization A = Q Λ Qᵀ.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.3: COVARIANCE ELLIPSOID & EIGENAXES</span>
    <span class=\"math-diagram-badge\">DATA DISPERSION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Rotated Ellipse -->
    <ellipse cx=\"250\" cy=\"85\" rx=\"110\" ry=\"40\" transform=\"rotate(-25 250 85)\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" stroke-width=\"2\" />
    <!-- Major axis (λ₁) -->
    <line x1=\"150\" y1=\"130\" x2=\"350\" y2=\"40\" stroke=\"#00e5ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"355\" y=\"35\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">e₁ (λ₁ = Max Variance)</text>
    <!-- Minor axis (λ₂) -->
    <line x1=\"235\" y1=\"50\" x2=\"265\" y2=\"120\" stroke=\"#00e676\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\" />
    <text x=\"275\" y=\"125\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">e₂ (λ₂)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Eigenvalues of the data covariance matrix represent the variance along each orthogonal eigenvector axis.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.4: POWER ITERATION CONVERGENCE</span>
    <span class=\"math-diagram-badge\">ALGORITHMIC CONVERGENCE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Spiral steps converging to dominant eigenvector -->
    <path d=\"M 100 120 L 150 95 L 210 75 L 280 60 L 370 45\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2\" stroke-dasharray=\"4\" />
    <circle cx=\"370\" cy=\"45\" r=\"4\" fill=\"#00e676\" />
    <text x=\"380\" y=\"50\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">Dominant Eigenvector v₁</text>
    <text x=\"100\" y=\"140\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">x_{k+1} = A x_k / ‖A x_k‖</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Power Iteration: Repeatedly multiplying a random vector by A and normalizing exponentially isolates the dominant eigenvector corresponding to max |λ|.
  </div>
</div>
`
      },
      {
        "title": "Singular Value Decomposition (SVD) & Low-Rank Approximation",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 7: Singular Value Decomposition (SVD) & Low-Rank Approximation</h2>

<h3>🗝️ The Master Key of Linear Algebra: SVD</h3>
<p>If eigenvalues only work on square matrices, <strong>Singular Value Decomposition (SVD)</strong> is the universal Swiss Army Knife that works on <em>any</em> matrix—tall, wide, square, or gigantic.</p>
<p>SVD proves a breathtaking theorem: <em>any</em> matrix transformation, no matter how chaotic, can be broken down into three simple, elegant steps: a rotation, followed by a stretch along orthogonal axes, followed by a final rotation!</p>
<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Why AI Architects Care About SVD:</strong><br />
  SVD is the mathematical foundation of model compression. Modern techniques like LoRA (Low-Rank Adaptation) use the exact same low-rank principle to compress giant 70-billion-parameter LLMs into nimble adapters that train on everyday hardware.
</div>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  SVD is the pinnacle of linear algebra. It applies to ANY rectangular matrix M × N, factoring it into rotation, scaling, and rotation. It underpins LoRA parameter-efficient fine-tuning, embedding compression, and latent semantic indexing.
</div>

<p>Any arbitrary matrix <strong>A</strong> ∈ ℝ<sup>M × N</sup> factorizes into:</p>
<pre class=\"ascii-diagram\">
A = U Σ V^T
</pre>
<ul>
  <li><strong>U</strong> ∈ ℝ<sup>M × M</sup>: Left singular vectors (orthonormal eigenvectors of <strong>A</strong><strong>A</strong>ᵀ).</li>
  <li><strong>Sigma</strong> ∈ ℝ<sup>M × N</sup>: Diagonal singular values σ<sub>1</sub> ≥ σ<sub>2</sub> ≥ ... ≥ 0 (square roots of eigenvalues of <strong>A</strong>ᵀ<strong>A</strong>).</li>
  <li><strong>V</strong>ᵀ ∈ ℝ<sup>N × N</sup>: Right singular vectors (orthonormal eigenvectors of <strong>A</strong>ᵀ<strong>A</strong>).</li>
</ul>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.1: SVD GEOMETRIC FACTORIZATION</span>
    <span class=\"math-diagram-badge\">ROTATION-STRETCH-ROTATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 520 180\">
    <!-- Step 1: V^T (Rotation) -->
    <g transform=\"translate(30, 40)\">
      <circle cx=\"40\" cy=\"40\" r=\"35\" fill=\"none\" stroke=\"#00e5ff\" />
      <text x=\"40\" y=\"95\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">1. Vᵀ (Rotate)</text>
    </g>
    <!-- Arrow -->
    <path d=\"M 115 80 L 155 80\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <!-- Step 2: Sigma (Stretch) -->
    <g transform=\"translate(170, 40)\">
      <ellipse cx=\"45\" cy=\"40\" rx=\"45\" ry=\"25\" fill=\"none\" stroke=\"#b388ff\" stroke-width=\"2\" />
      <text x=\"45\" y=\"95\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">2. Σ (Stretch σ)</text>
    </g>
    <!-- Arrow -->
    <path d=\"M 265 80 L 305 80\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <!-- Step 3: U (Rotate) -->
    <g transform=\"translate(320, 40)\">
      <ellipse cx=\"45\" cy=\"40\" rx=\"45\" ry=\"25\" transform=\"rotate(35 45 40)\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" stroke-width=\"2\" />
      <text x=\"45\" y=\"95\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">3. U (Rotate Final)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    The SVD Geometric Action: Every linear transformation decomposes into an initial rotation Vᵀ, an axis-aligned scaling by singular values Σ, and a secondary rotation U.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.2: ECKART-YOUNG-MIRSKY THEOREM (LOW-RANK A_k)</span>
    <span class=\"math-diagram-badge\">OPTIMAL COMPRESSION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Full Matrix vs Low Rank -->
    <g transform=\"translate(40, 30)\">
      <rect x=\"0\" y=\"0\" width=\"90\" height=\"80\" fill=\"#1e293b\" stroke=\"#64748b\" />
      <text x=\"45\" y=\"45\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Rank r (Full)</text>
    </g>
    <text x=\"160\" y=\"75\" fill=\"#fff\" font-family=\"monospace\" font-size=\"14\">≈</text>
    <!-- Low Rank Sum -->
    <g transform=\"translate(190, 30)\">
      <rect x=\"0\" y=\"0\" width=\"15\" height=\"80\" fill=\"rgba(0,229,255,0.3)\" stroke=\"#00e5ff\" />
      <text x=\"8\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">u₁</text>
      <text x=\"28\" y=\"45\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\">· σ₁ ·</text>
      <rect x=\"55\" y=\"0\" width=\"90\" height=\"15\" fill=\"rgba(0,229,255,0.3)\" stroke=\"#00e5ff\" />
      <text x=\"100\" y=\"12\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">v₁ᵀ</text>
    </g>
    <text x=\"360\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"14\">+ ... + σ_k u_k v_kᵀ</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Eckart-Young Theorem: The best rank-k approximation minimizing Frobenius norm error ‖A - A_k‖_F is obtained by truncating SVD to the top k singular values.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.3: LORA (LOW-RANK ADAPTATION) DECOMPOSITION</span>
    <span class=\"math-diagram-badge\">LLM ARCHITECTURE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Frozen Weight W0 -->
    <rect x=\"60\" y=\"30\" width=\"80\" height=\"80\" fill=\"#0f172a\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <text x=\"100\" y=\"75\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">W₀ (Frozen)<tspan x=\"100\" y=\"90\" font-size=\"9\">d × k</tspan></text>

    <text x=\"165\" y=\"75\" fill=\"#fff\" font-family=\"monospace\" font-size=\"18\">+</text>

    <!-- LoRA A and B -->
    <rect x=\"200\" y=\"30\" width=\"20\" height=\"80\" fill=\"rgba(179,136,255,0.2)\" stroke=\"#b388ff\" stroke-width=\"2\" />
    <text x=\"210\" y=\"75\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">B (d×r)</text>

    <text x=\"235\" y=\"75\" fill=\"#fff\" font-family=\"monospace\" font-size=\"14\">×</text>

    <rect x=\"255\" y=\"30\" width=\"80\" height=\"20\" fill=\"rgba(0,229,255,0.2)\" stroke=\"#00e5ff\" stroke-width=\"2\" />
    <text x=\"295\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">A (r×k)</text>

    <!-- Formula -->
    <text x=\"380\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">ΔW = B · A<tspan x=\"380\" y=\"92\" font-size=\"9\" fill=\"#94a3b8\">rank r ≪ min(d, k)</tspan></text>
  </svg>
  <div class=\"math-diagram-caption\">
    LoRA in LLMs decomposes weight updates ΔW into low-rank matrices B and A, slashing trainable parameters by 99% while preserving model capability.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.4: SINGULAR VALUE SCREE PLOT</span>
    <span class=\"math-diagram-badge\">ENERGY COMPRESSION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Bars of singular values -->
    <rect x=\"60\" y=\"30\" width=\"20\" height=\"90\" fill=\"#00e5ff\" />
    <rect x=\"90\" y=\"50\" width=\"20\" height=\"70\" fill=\"#00e5ff\" opacity=\"0.8\" />
    <rect x=\"120\" y=\"80\" width=\"20\" height=\"40\" fill=\"#00e5ff\" opacity=\"0.6\" />
    <rect x=\"150\" y=\"100\" width=\"20\" height=\"20\" fill=\"#00e5ff\" opacity=\"0.4\" />
    <rect x=\"180\" y=\"110\" width=\"20\" height=\"10\" fill=\"#00e5ff\" opacity=\"0.2\" />
    <line x1=\"50\" y1=\"120\" x2=\"220\" y2=\"120\" stroke=\"#64748b\" />
    <text x=\"135\" y=\"140\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Index i</text>
    <text x=\"320\" y=\"70\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">Cumulative Energy = ∑ σ_i² / ∑_all σ²</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Singular Value Scree Plot: The steep drop in singular values confirms that real-world high-dimensional data lives on a low-dimensional manifold.
  </div>
</div>
`
      },
      {
        "title": "Principal Component Analysis (PCA) & Dimensionality Reduction",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 8: Principal Component Analysis (PCA) & Dimensionality Reduction</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  High-dimensional spaces suffer from the curse of dimensionality: distances become equidistant and volumes explode exponentially. PCA projects data onto directions of maximum variance, minimizing reconstruction loss.
</div>

<p>Given centered data matrix <strong>X</strong> ∈ ℝ<sup>N × D</sup> (with (1 / N)∑ <strong>x</strong><sub>i</sub> = <strong>0</strong>), the sample covariance matrix is:</p>
<pre class=\"ascii-diagram\">
Σ = (1 / N) X^T X ∈ ℝ^{D × D}
</pre>
<p>The first principal component <strong>w</strong><sub>1</sub> is the unit vector maximizing variance:</p>
<pre class=\"ascii-diagram\">
max_{‖w‖=1} Var(X w) = max_{‖w‖=1} w^T Σ w   ⟹   Σ w_1 = λ_1 w_1
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.1: PCA ORTHOGONAL PROJECTION MAXIMIZING VARIANCE</span>
    <span class=\"math-diagram-badge\">VARIANCE MAXIMIZATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Scatter Points along diagonal -->
    <ellipse cx=\"240\" cy=\"100\" rx=\"120\" ry=\"35\" transform=\"rotate(-30 240 100)\" fill=\"rgba(0,229,255,0.1)\" stroke=\"none\" />
    <circle cx=\"160\" cy=\"140\" r=\"3\" fill=\"#94a3b8\" />
    <circle cx=\"190\" cy=\"130\" r=\"3\" fill=\"#94a3b8\" />
    <circle cx=\"220\" cy=\"110\" r=\"3\" fill=\"#94a3b8\" />
    <circle cx=\"250\" cy=\"90\" r=\"3\" fill=\"#94a3b8\" />
    <circle cx=\"280\" cy=\"80\" r=\"3\" fill=\"#94a3b8\" />
    <circle cx=\"320\" cy=\"60\" r=\"3\" fill=\"#94a3b8\" />

    <!-- PC1 Line -->
    <line x1=\"110\" y1=\"170\" x2=\"370\" y2=\"30\" stroke=\"#00e5ff\" stroke-width=\"3\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"380\" y=\"35\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">PC 1 (Max Variance λ₁)</text>

    <!-- PC2 Line -->
    <line x1=\"215\" y1=\"55\" x2=\"265\" y2=\"145\" stroke=\"#b388ff\" stroke-width=\"2\" marker-end=\"url(#arrow-purple)\" />
    <text x=\"275\" y=\"150\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\">PC 2 (Orthogonal λ₂)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    PC 1 aligns with the direction of maximum spread. Projecting points onto PC 1 preserves maximal information while dropping dimensions.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.2: RECONSTRUCTION ERROR MINIMIZATION</span>
    <span class=\"math-diagram-badge\">LEAST SQUARES DUALITY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Line PC1 -->
    <line x1=\"80\" y1=\"130\" x2=\"420\" y2=\"40\" stroke=\"#00e5ff\" stroke-width=\"2\" />
    <!-- Point and its perpendicular projection -->
    <circle cx=\"250\" cy=\"45\" r=\"4\" fill=\"#facc15\" />
    <text x=\"260\" y=\"45\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\">Data Point x_i</text>
    <line x1=\"250\" y1=\"45\" x2=\"270\" y2=\"75\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"3\" />
    <circle cx=\"270\" cy=\"75\" r=\"4\" fill=\"#00e676\" />
    <text x=\"280\" y=\"90\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\">Projected x̂_i</text>
    <text x=\"210\" y=\"70\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\">Reconstruction Loss: ‖x - x̂‖²</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Equivalence: Maximizing projected variance is mathematically identical to minimizing the sum of squared orthogonal reconstruction errors.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.3: CUMULATIVE EXPLAINED VARIANCE RATIO</span>
    <span class=\"math-diagram-badge\">DIMENSION SELECTION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Axes -->
    <line x1=\"60\" y1=\"130\" x2=\"440\" y2=\"130\" stroke=\"#64748b\" />
    <line x1=\"60\" y1=\"130\" x2=\"60\" y2=\"20\" stroke=\"#64748b\" />
    <!-- 95% threshold line -->
    <line x1=\"60\" y1=\"40\" x2=\"440\" y2=\"40\" stroke=\"#ef4444\" stroke-dasharray=\"4\" />
    <text x=\"445\" y=\"45\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">95% Cutoff</text>
    <!-- Curve -->
    <path d=\"M 60 130 Q 120 70 200 45 T 440 25\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"3\" />
    <text x=\"200\" y=\"150\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">Number of Principal Components k</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Elbow / Threshold Selection: Select the smallest integer k such that cumulative explained variance ratio ∑_{i=1}^k λ_i / ∑ λ ≥ 0.95.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.4: CURSE OF DIMENSIONALITY (DISTANCE EQUIDISTANCE)</span>
    <span class=\"math-diagram-badge\">HIGH-D GEOMETRY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- Ratio d_max - d_min / d_min -> 0 -->
    <text x=\"250\" y=\"45\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">lim_{D → ∞} (dist_max - dist_min) / dist_min = 0</text>
    <text x=\"250\" y=\"80\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">In high-dimensional space, all pairwise sample distances converge to the same value.</text>
    <text x=\"250\" y=\"110\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">PCA and SVD compress data back to where Euclidean distances carry meaningful contrast.</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The Curse of Dimensionality: Volume concentrates on the shell of high-dimensional hyperspheres. Dimensionality reduction restores discriminative distance metrics.
  </div>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "NumPy Linear Algebra & Vector Transformation Engine",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build a Vector Transformation & Projection Engine</h3>
<p>Implement the function <code>orthogonal_projection(a, b)</code> which computes the vector projection of vector <code>a</code> onto vector <code>b</code> using pure NumPy matrix-vector operations.</p>
<p>Formula: proj_{<strong>b</strong>}(<strong>a</strong>) = (<strong>a</strong> · <strong>b</strong> / ||<strong>b</strong>||²) <strong>b</strong></p>
<p>Also implement <code>cosine_similarity(a, b)</code> returning (<strong>a</strong> · <strong>b</strong> / ||<strong>a</strong>|| ||<strong>b</strong>||).</p>
`,
        "starterCode": `import numpy as np

def orthogonal_projection(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    # Compute projection of a onto b
    dot_product = np.dot(a, b)
    b_norm_sq = np.dot(b, b)
    return (dot_product / b_norm_sq) * b

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    # Compute cosine similarity
    dot = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return float(dot / (norm_a * norm_b))

# Test verification
v1 = np.array([3.0, 4.0])
v2 = np.array([1.0, 0.0])

proj = orthogonal_projection(v1, v2)
sim = cosine_similarity(v1, v2)

print(f"Projection: {proj.tolist()}")
print(f"Cosine Similarity: {round(sim, 4)}")
`,
        "expectedOutput": "Projection: [3.0, 0.0]\nCosine Similarity: 0.6",
        "hints": [
          "Use np.dot(a, b) for the dot product.",
          "Use np.linalg.norm() for the Euclidean length."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the geometric meaning of det(A) = 0 for a square matrix A?",
        "options": [
          "The matrix rotates space by 90 degrees.",
          "The matrix collapses space into lower dimensions, resulting in an irreversible loss of volume.",
          "The eigenvalues are all guaranteed to be strictly positive.",
          "The matrix preserves distances between all pairs of vectors."
        ],
        "correctIndex": 1,
        "explanation": "A determinant of zero means the transformation squashes non-zero volumes to zero (e.g. 2D area onto a 1D line or point), making it non-invertible."
      },
      {
        "question": "In SVD (A = U Σ V^T), what do the diagonal values in Σ represent?",
        "options": [
          "The eigenvalues of matrix A directly.",
          "The singular values, which are the square roots of the eigenvalues of A^T A.",
          "The coordinates of the projection error.",
          "The bias terms of each linear layer."
        ],
        "correctIndex": 1,
        "explanation": "Singular values σ_i are the square roots of the non-negative eigenvalues of the symmetric matrix A^T A."
      },
      {
        "question": "Why is the L1 norm preferred over L2 when sparse feature selection is required?",
        "options": [
          "L1 is computationally faster to differentiate than L2.",
          "The L1 norm's diamond iso-contours have sharp corners on the coordinate axes, causing optimization to set non-informative weights strictly to zero.",
          "L1 avoids gradient exploding issues in deep neural networks.",
          "L1 norm equals the determinant of the weight matrix."
        ],
        "correctIndex": 1,
        "explanation": "The geometric vertices of the L1 ball intersect level curves on coordinate axes, driving weights to exact zeros (sparsity)."
      }
    ]
  },

  "ml-week-2": {
    "lessons": [
      {
        "title": "Derivatives, Tangent Hyperplanes & Directional Derivatives",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 1: Derivatives, Tangent Hyperplanes & Directional Derivatives</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Optimization is the heartbeat of learning. Every weight update in a billion-parameter model relies on finding the slope of the loss landscape. Understand how single-variable derivatives generalize into directional derivatives on high-dimensional manifolds.
</div>

<p>The derivative of a single-variable function f(x) represents the instantaneous rate of change and the slope of the tangent line:</p>
<pre class=\"ascii-diagram\">
f'(x) = lim_{h → 0} [f(x + h) - f(x)] / h
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.1: TANGENT LINE AS FIRST-ORDER LINEAR APPROXIMATION</span>
    <span class=\"math-diagram-badge\">CALCULUS CORE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Parabola f(x) = x^2 -->
    <path d=\"M 80 160 Q 250 170 420 40\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2.5\" />
    <!-- Tangent line at x0 -->
    <line x1=\"160\" y1=\"180\" x2=\"360\" y2=\"60\" stroke=\"#b388ff\" stroke-width=\"2\" stroke-dasharray=\"4\" />
    <circle cx=\"260\" cy=\"120\" r=\"5\" fill=\"#facc15\" />
    <text x=\"270\" y=\"115\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\">Point (x₀, f(x₀))</text>
    <text x=\"300\" y=\"150\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\">Tangent Slope f'(x₀)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The tangent line represents the local linear Taylor approximation: f(x) ≈ f(x₀) + f'(x₀)(x - x₀).
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.2: DIRECTIONAL DERIVATIVE ALONG UNIT VECTOR u</span>
    <span class=\"math-diagram-badge\">MULTIVARIABLE EXPANSION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- 3D Contour rings -->
    <ellipse cx=\"250\" cy=\"90\" rx=\"140\" ry=\"60\" fill=\"none\" stroke=\"#334155\" />
    <ellipse cx=\"250\" cy=\"90\" rx=\"90\" ry=\"40\" fill=\"none\" stroke=\"#475569\" />
    <ellipse cx=\"250\" cy=\"90\" rx=\"40\" ry=\"20\" fill=\"none\" stroke=\"#64748b\" />
    <!-- Point and directional vector u -->
    <circle cx=\"210\" cy=\"105\" r=\"4\" fill=\"#00e5ff\" />
    <line x1=\"210\" y1=\"105\" x2=\"280\" y2=\"75\" stroke=\"#00e676\" stroke-width=\"2.5\" marker-end=\"url(#arrow-green)\" />
    <text x=\"290\" y=\"70\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">Direction u (‖u‖ = 1)</text>
    <text x=\"160\" y=\"145\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\">D_u f(x) = ∇f(x) · u = ‖∇f‖ cos(θ)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The directional derivative D_u f is maximized when u points in the exact direction of the gradient ∇f (θ = 0), and vanishes in directions tangent to the contour.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.3: TANGENT HYPERPLANE IN ℝ³</span>
    <span class=\"math-diagram-badge\">HIGH-D GEOMETRY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Tangent Plane quadrilateral -->
    <polygon points=\"120,40 380,20 360,130 100,150\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" stroke-width=\"1.5\" />
    <circle cx=\"240\" cy=\"85\" r=\"5\" fill=\"#facc15\" />
    <!-- Normal vector pointing perpendicular -->
    <line x1=\"240\" y1=\"85\" x2=\"240\" y2=\"15\" stroke=\"#00e5ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"250\" y=\"25\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">Normal Vector n = [∇f, -1]ᵀ</text>
  </svg>
  <div class=\"math-diagram-caption\">
    In higher dimensions, the tangent line generalizes to a tangent hyperplane with normal vector defined by the gradient.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.4: GRADIENT ORTHOGONALITY TO LEVEL SETS</span>
    <span class=\"math-diagram-badge\">OPTIMIZATION INVARIANT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Contour curve f(x, y) = c -->
    <path d=\"M 100 120 Q 250 40 400 120\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" />
    <text x=\"410\" y=\"120\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">Level Curve f(x, y) = c</text>
    <circle cx=\"250\" cy=\"80\" r=\"4\" fill=\"#00e5ff\" />
    <!-- Gradient arrow perpendicular to curve -->
    <line x1=\"250\" y1=\"80\" x2=\"250\" y2=\"15\" stroke=\"#ef4444\" stroke-width=\"3\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"260\" y=\"35\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">∇f (Perpendicular!)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Fundamental Invariant: The gradient vector ∇f at any point is strictly perpendicular (orthogonal) to the level contour passing through that point.
  </div>
</div>
`
      },
      {
        "title": "Partial Derivatives, Gradient Vectors & The Jacobian Matrix",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 2: Partial Derivatives, Gradient Vectors & The Jacobian Matrix</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When functions map from vector spaces to vector spaces (as every neural network layer does), the derivative is no longer a scalar—it is a Jacobian matrix containing every pairwise partial derivative.
</div>

<p>For a scalar-valued function f(<strong>x</strong>): ℝ<sup>D</sup> to ℝ, the <strong>gradient vector</strong> nabla f(<strong>x</strong>) packs all first-order partial derivatives:</p>
<pre class=\"ascii-diagram\">
∇f(x) = [ ∂f/∂x₁,  ∂f/∂x₂,  ...,  ∂f/∂x_D ]^T
</pre>
<p>For vector-valued functions <strong>f</strong>(<strong>x</strong>): ℝ<sup>N</sup> to ℝ<sup>M</sup>, the first-order derivative is the M × N <strong>Jacobian matrix</strong> <strong>J</strong>:</p>
<pre class=\"ascii-diagram\">
J_{i, j} = ∂f_i / ∂x_j
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.1: THE JACOBIAN MATRIX ARCHITECTURE</span>
    <span class=\"math-diagram-badge\">JACOBIAN MAP</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Inputs x1...xN -->
    <g transform=\"translate(50, 40)\">
      <rect x=\"0\" y=\"0\" width=\"50\" height=\"90\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
      <text x=\"25\" y=\"50\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Inputs ℝᴺ</text>
    </g>
    <!-- Arrow -->
    <path d=\"M 120 85 L 170 85\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <!-- Jacobian Box -->
    <g transform=\"translate(180, 25)\">
      <rect x=\"0\" y=\"0\" width=\"140\" height=\"120\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" stroke-width=\"2\" />
      <text x=\"70\" y=\"55\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Jacobian J</text>
      <text x=\"70\" y=\"75\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">J_{i,j} = ∂f_i / ∂x_j</text>
      <text x=\"70\" y=\"95\" fill=\"#e0e7ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Shape: (M × N)</text>
    </g>
    <!-- Arrow -->
    <path d=\"M 340 85 L 390 85\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <!-- Outputs f1...fM -->
    <g transform=\"translate(400, 30)\">
      <rect x=\"0\" y=\"0\" width=\"50\" height=\"110\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" />
      <text x=\"25\" y=\"60\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Outputs ℝᴹ</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    The Jacobian Matrix: Evaluates how each of the M outputs varies with respect to each of the N inputs.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.2: VECTOR-JACOBIAN PRODUCT (VJP) IN AUTOGRAD</span>
    <span class=\"math-diagram-badge\">REVERSE ACCUMULATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- VJP: v^T J -->
    <text x=\"80\" y=\"60\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"13\">vᵀ (Upstream Loss Gradient 1×M)</text>
    <text x=\"230\" y=\"90\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"13\">× J (M×N)</text>
    <path d=\"M 310 85 L 370 85\" stroke=\"#00e676\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\" />
    <text x=\"380\" y=\"90\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"13\" font-weight=\"bold\">= ∇_x L (1×N)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Why PyTorch is fast: Reverse-mode autograd never materializes the full M × N Jacobian matrix; it directly evaluates Vector-Jacobian Products (VJPs) vᵀ J in a single pass.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.3: PARTIAL DERIVATIVE SLICE GEOMETRY</span>
    <span class=\"math-diagram-badge\">CROSS-SECTIONAL SLOPE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- 2D Slice where y is constant -->
    <path d=\"M 80 120 Q 250 20 420 120\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2\" />
    <line x1=\"160\" y1=\"100\" x2=\"340\" y2=\"40\" stroke=\"#facc15\" stroke-width=\"2\" stroke-dasharray=\"3\" />
    <text x=\"250\" y=\"140\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Slice along x-axis holding y = y₀ constant → Slope = ∂f/∂x</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Partial Derivative: The slope of the curve obtained by intersecting the multidimensional surface with a plane parallel to one coordinate axis.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.4: SOFTMAX FUNCTION JACOBIAN</span>
    <span class=\"math-diagram-badge\">CLASSIFICATION LAYER</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Diagonal vs Off-diagonal -->
    <rect x=\"80\" y=\"30\" width=\"150\" height=\"80\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
    <text x=\"155\" y=\"60\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">i = j (Diagonal):<tspan x=\"155\" y=\"80\">p_i (1 - p_i)</tspan></text>

    <rect x=\"270\" y=\"30\" width=\"150\" height=\"80\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
    <text x=\"345\" y=\"60\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">i ≠ j (Off-diagonal):<tspan x=\"345\" y=\"80\">- p_i · p_j</tspan></text>
  </svg>
  <div class=\"math-diagram-caption\">
    The Softmax Jacobian: Shows strong coupled negative gradients across non-target classes, forcing probabilities to compete and sum to 1.
  </div>
</div>
`
      },
      {
        "title": "Second-Order Derivatives, The Hessian Matrix & Curvature",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 3: Second-Order Derivatives, The Hessian Matrix & Curvature</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Gradients tell you which direction goes downhill; the Hessian tells you how fast the gradient itself is changing. Understanding curvature separates first-order SGD from second-order Newton-Raphson methods.
</div>

<p>For a function f(<strong>x</strong>): ℝ<sup>D</sup> to ℝ, the symmetric D × D <strong>Hessian matrix</strong> <strong>H</strong> contains all second-order partial derivatives:</p>
<pre class=\"ascii-diagram\">
H_{i, j} = ∂²f / (∂x_i ∂x_j)
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.1: LOSS LANDSCAPE CURVATURE & HESSIAN EIGENVALUES</span>
    <span class=\"math-diagram-badge\">CURVATURE ANALYSIS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Bowl (Positive Definite) -->
    <g transform=\"translate(50, 40)\">
      <ellipse cx=\"40\" cy=\"40\" rx=\"35\" ry=\"20\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"2\" />
      <text x=\"40\" y=\"85\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">All λ_i > 0<tspan x=\"40\" y=\"98\" fill=\"#94a3b8\">Local Minimum</tspan></text>
    </g>
    <!-- Saddle (Indefinite) -->
    <g transform=\"translate(210, 40)\">
      <path d=\"M 0 20 Q 40 60 80 20 M 0 60 Q 40 20 80 60\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" />
      <text x=\"40\" y=\"85\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Mixed Signs<tspan x=\"40\" y=\"98\" fill=\"#94a3b8\">Saddle Point</tspan></text>
    </g>
    <!-- Crest (Negative Definite) -->
    <g transform=\"translate(370, 40)\">
      <path d=\"M 10 70 Q 40 10 70 70\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2\" />
      <text x=\"40\" y=\"85\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">All λ_i < 0<tspan x=\"40\" y=\"98\" fill=\"#94a3b8\">Local Maximum</tspan></text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Second-Order Extremum Test: The eigenvalues of the Hessian matrix determine the topology: Positive Definite = Minimum, Indefinite = Saddle Point.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.2: CONDITION NUMBER & RAVINE OSCILLATIONS</span>
    <span class=\"math-diagram-badge\">OPTIMIZATION BOTTLENECK</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Elongated valley (ill-conditioned) -->
    <ellipse cx=\"250\" cy=\"85\" rx=\"180\" ry=\"30\" fill=\"none\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <ellipse cx=\"250\" cy=\"85\" rx=\"120\" ry=\"18\" fill=\"none\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <!-- Oscillating trajectory -->
    <path d=\"M 120 70 L 160 105 L 200 65 L 230 100 L 250 85\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" class=\"anim-vector-pulse\" />
    <circle cx=\"250\" cy=\"85\" r=\"4\" fill=\"#00e676\" />
    <text x=\"250\" y=\"145\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Condition Number κ = λ_max / λ_min ≫ 1 causes violent ravines.</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Ill-Conditioned Ravines: High condition numbers cause standard gradient descent to oscillate wildly perpendicular to the valley instead of progressing along it.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.3: NEWTON'S STEP VS GRADIENT DESCENT STEP</span>
    <span class=\"math-diagram-badge\">SECOND-ORDER ACCELERATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Step comparison -->
    <text x=\"80\" y=\"50\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"12\">Gradient Step: Δx = - α ∇f(x) (First Order)</text>
    <text x=\"80\" y=\"90\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">Newton Step: Δx = - H⁻¹ ∇f(x) (Second Order Quadratic Jump)</text>
    <text x=\"80\" y=\"125\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">Newton steps jump directly to the bottom of the local quadratic bowl in 1 step.</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Newton-Raphson Optimization pre-multiplies by the inverse Hessian H⁻¹, perfectly counteracting ill-conditioned curvature.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.4: WHY DEEP LEARNING CANNOT USE EXACT HESSIANS</span>
    <span class=\"math-diagram-badge\">COMPUTATIONAL COMPLEXITY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <rect x=\"80\" y=\"30\" width=\"340\" height=\"80\" fill=\"rgba(239,68,68,0.15)\" stroke=\"#ef4444\" stroke-width=\"1.5\" />
    <text x=\"250\" y=\"55\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Parameter Count N = 8 Billion (8B Model)</text>
    <text x=\"250\" y=\"75\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Hessian Size: N × N = 6.4 × 10¹⁹ floats ≈ 256,000 PETA-BYTES of RAM!</text>
    <text x=\"250\" y=\"95\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Deep Learning must use first-order adaptive approximations (AdamW)!</text>
  </svg>
  <div class=\"math-diagram-caption\">
    O(N²) memory and O(N³) inversion costs make exact second-order optimization impossible for modern deep neural networks.
  </div>
</div>
`
      },
      {
        "title": "The Multivariate Chain Rule (The Engine of Backprop)",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 4: The Multivariate Chain Rule (The Engine of Backprop)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Backpropagation is nothing more and nothing less than the recursive application of the multivariable chain rule on a Directed Acyclic Graph (DAG). Master the flow of upstream, local, and downstream gradients.
</div>

<p>For composite functions z = f(y<sub>1</sub>, y<sub>2</sub>, ..., y<sub>m</sub>) where each y<sub>i</sub> = g<sub>i</sub>(x), the multivariable chain rule sums partial paths:</p>
<pre class=\"ascii-diagram\">
∂z / ∂x = ∑_{i=1}^m (∂z / ∂y_i) · (∂y_i / ∂x)
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.1: COMPUTATIONAL GRAPH NODE ANATOMY</span>
    <span class=\"math-diagram-badge\">AUTOGRAD PRIMITIVE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Node -->
    <circle cx=\"250\" cy=\"90\" r=\"35\" fill=\"#1e293b\" stroke=\"#b388ff\" stroke-width=\"2\" />
    <text x=\"250\" y=\"95\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"14\" text-anchor=\"middle\" font-weight=\"bold\">f(x)</text>

    <!-- Forward Inputs -->
    <line x1=\"80\" y1=\"90\" x2=\"210\" y2=\"90\" stroke=\"#00e5ff\" stroke-width=\"2.5\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"145\" y=\"80\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\">x (Input)</text>

    <!-- Forward Output -->
    <line x1=\"290\" y1=\"90\" x2=\"420\" y2=\"90\" stroke=\"#00e676\" stroke-width=\"2.5\" marker-end=\"url(#arrow-green)\" />
    <text x=\"355\" y=\"80\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\">y = f(x)</text>

    <!-- Backward Gradient (Red) -->
    <line x1=\"420\" y1=\"120\" x2=\"290\" y2=\"120\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"4\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"355\" y=\"135\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">∂L/∂y (Upstream)</text>

    <line x1=\"210\" y1=\"120\" x2=\"80\" y2=\"120\" stroke=\"#ef4444\" stroke-width=\"2\" stroke-dasharray=\"4\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"145\" y=\"135\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">∂L/∂x = (∂L/∂y)·(∂y/∂x)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The Universal Backprop Rule: Downstream Gradient = (Upstream Gradient) × (Local Gradient).
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.2: BRANCHING NODES & GRADIENT ACCUMULATION</span>
    <span class=\"math-diagram-badge\">MULTIPLE CONSUMERS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Split node -->
    <circle cx=\"120\" cy=\"85\" r=\"25\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
    <text x=\"120\" y=\"90\" fill=\"#00e5ff\" font-family=\"monospace\" text-anchor=\"middle\">x</text>

    <circle cx=\"320\" cy=\"45\" r=\"25\" fill=\"#1e293b\" stroke=\"#b388ff\" />
    <text x=\"320\" y=\"50\" fill=\"#b388ff\" font-family=\"monospace\" text-anchor=\"middle\">f₁(x)</text>

    <circle cx=\"320\" cy=\"125\" r=\"25\" fill=\"#1e293b\" stroke=\"#b388ff\" />
    <text x=\"320\" y=\"130\" fill=\"#b388ff\" font-family=\"monospace\" text-anchor=\"middle\">f₂(x)</text>

    <path d=\"M 145 75 L 295 50\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <path d=\"M 145 95 L 295 120\" stroke=\"#475569\" stroke-width=\"1.5\" />

    <text x=\"420\" y=\"90\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">∂L/∂x = ∂L/∂f₁ · ∂f₁/∂x + ∂L/∂f₂ · ∂f₂/∂x</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Gradient Accumulation: When a node's output feeds into multiple downstream paths, their gradient contributions must be SUMMED together.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.3: FORWARD ACCUMULATION VS REVERSE ACCUMULATION</span>
    <span class=\"math-diagram-badge\">COMPLEXITY COMPARISON</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <rect x=\"50\" y=\"30\" width=\"180\" height=\"80\" fill=\"rgba(0,229,255,0.1)\" stroke=\"#00e5ff\" />
    <text x=\"140\" y=\"55\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Forward-Mode Diff</text>
    <text x=\"140\" y=\"75\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">1 Pass per Input Feature</text>
    <text x=\"140\" y=\"95\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">O(N) passes for N inputs</text>

    <rect x=\"270\" y=\"30\" width=\"180\" height=\"80\" fill=\"rgba(0,230,118,0.1)\" stroke=\"#00e676\" />
    <text x=\"360\" y=\"55\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Reverse-Mode (Backprop)</text>
    <text x=\"360\" y=\"75\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">1 Pass for ALL Inputs!</text>
    <text x=\"360\" y=\"95\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">O(1) reverse pass for scalar Loss</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Why Reverse-Mode Diff Rules Machine Learning: Because neural networks have millions of inputs (weights) and ONE scalar output (Loss), reverse mode computes all gradients in a single backward pass!
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.4: SIGMOID ACTIVATION LOCAL GRADIENT DERIVATION</span>
    <span class=\"math-diagram-badge\">LOCAL DERIVATIVE SHORTCUT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <text x=\"250\" y=\"50\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"12\" text-anchor=\"middle\">σ(z) = 1 / (1 + e^{-z})</text>
    <text x=\"250\" y=\"90\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">dσ/dz = σ(z) · (1 - σ(z))</text>
    <text x=\"250\" y=\"120\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">The derivative can be computed directly from the forward output without re-evaluating exp()!</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Analytical Derivative Shortcuts: Common activations have closed-form local derivatives expressed entirely in terms of their forward output value.
  </div>
</div>
`
      },
      {
        "title": "Gradient Descent Dynamics: Batch, Mini-Batch & Stochastic (SGD)",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 5: Gradient Descent Dynamics: Batch, Mini-Batch & Stochastic (SGD)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Should you compute gradients on the entire dataset, a single sample, or a balanced mini-batch? Understand the statistical variance trade-off and GPU parallelism that make mini-batch SGD the industry standard.
</div>

<h3>🏔️ The Intuition: Walking Down a Foggy Mountain</h3>
<p>Imagine you are blindfolded on a rugged mountain in dense fog, and your goal is to reach the lowest valley (the minimum loss). What would you do?</p>
<p>You would feel the ground with your boots in every direction to find which way slopes downward most steeply, and take a step in that direction! That is <strong>Gradient Descent</strong>:</p>
<ul>
  <li><strong>The Loss function:</strong> The mountain's altitude (error).</li>
  <li><strong>The Gradient (∇L):</strong> The direction of steepest uphill ascent.</li>
  <li><strong>Negative Gradient (-∇L):</strong> The direction of steepest downhill descent!</li>
  <li><strong>The Learning Rate (α):</strong> The size of your step. Take too small a step, and you'll freeze on the mountain before reaching the valley. Take too big a leap, and you'll fling yourself off a cliff!</li>
</ul>
<p>Gradient descent updates parameters θ opposite the gradient of the loss Loss <em>L</em>:</p>
<pre class=\"ascii-diagram\">
θ_{t+1} = θ_t - η ∇_θ L(θ_t)
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.1: OPTIMIZATION TRAJECTORIES: BATCH VS MINI-BATCH VS SGD</span>
    <span class=\"math-diagram-badge\">CONVERGENCE PATHS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 200\">
    <!-- Contour ellipses -->
    <ellipse cx=\"320\" cy=\"100\" rx=\"160\" ry=\"70\" fill=\"none\" stroke=\"#334155\" />
    <ellipse cx=\"320\" cy=\"100\" rx=\"100\" ry=\"45\" fill=\"none\" stroke=\"#475569\" />
    <ellipse cx=\"320\" cy=\"100\" rx=\"40\" ry=\"20\" fill=\"none\" stroke=\"#64748b\" />
    <circle cx=\"320\" cy=\"100\" r=\"4\" fill=\"#00e676\" />

    <!-- Batch GD: Smooth blue curve -->
    <path d=\"M 180 160 Q 230 140 320 100\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2.5\" />
    <text x=\"170\" y=\"175\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\">Batch GD (Smooth, Slow)</text>

    <!-- SGD: Wild jagged red path -->
    <path d=\"M 180 160 L 195 130 L 220 155 L 240 120 L 275 140 L 290 90 L 320 100\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"3\" />
    <text x=\"160\" y=\"120\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">Pure SGD (Noisy)</text>

    <!-- Mini-batch: Gold balanced path -->
    <path d=\"M 180 160 Q 210 125 240 135 T 320 100\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2\" />
    <text x=\"240\" y=\"150\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\">Mini-Batch (Gold Standard)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Convergence Comparison: Batch GD is deterministic but slow; Pure SGD introduces high variance; Mini-Batch balances fast GPU hardware utilization with helpful regularization noise.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.2: LEARNING RATE REGIMES: UNDERFITTING VS DIVERGENCE</span>
    <span class=\"math-diagram-badge\">HYPERPARAMETER IMPACT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Too small -->
    <g transform=\"translate(40, 30)\">
      <path d=\"M 10 70 Q 50 10 90 70\" fill=\"none\" stroke=\"#64748b\" />
      <circle cx=\"20\" cy=\"60\" r=\"3\" fill=\"#00e5ff\" />
      <circle cx=\"24\" cy=\"56\" r=\"3\" fill=\"#00e5ff\" />
      <text x=\"50\" y=\"90\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Too Small (Stuck)</text>
    </g>
    <!-- Optimal -->
    <g transform=\"translate(190, 30)\">
      <path d=\"M 10 70 Q 50 10 90 70\" fill=\"none\" stroke=\"#64748b\" />
      <path d=\"M 20 60 L 35 40 L 50 15\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"2\" />
      <text x=\"50\" y=\"90\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Optimal (Fast Convergence)</text>
    </g>
    <!-- Too Large (Divergence) -->
    <g transform=\"translate(340, 30)\">
      <path d=\"M 10 70 Q 50 10 90 70\" fill=\"none\" stroke=\"#64748b\" />
      <path d=\"M 30 50 L 75 30 L 10 10 L 95 -10\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" />
      <text x=\"50\" y=\"90\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Too High (Overshoots / NaN)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Learning Rate Sensitivity: An excessively high learning rate overshoots valleys and causes loss explosion (NaNs); an excessively low rate stalls training.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.3: SGD STOCHASTIC NOISE AS REGULARIZER</span>
    <span class=\"math-diagram-badge\">ESCAPE LOCAL MINIMA</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Loss curve with sharp narrow minimum and flat wide minimum -->
    <path d=\"M 60 40 Q 120 120 180 40 Q 240 100 320 100 Q 400 100 440 40\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"1.5\" />
    <text x=\"120\" y=\"135\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Sharp Minimum (Overfitting)</text>
    <text x=\"320\" y=\"115\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Flat Minimum (Generalizes Well)</text>
    <!-- Stochastic jump -->
    <path d=\"M 120 100 Q 180 20 280 80\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2\" stroke-dasharray=\"3\" />
    <text x=\"200\" y=\"35\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"9\">SGD noise kicks optimizer into flat basins</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Generalization Magic of SGD: Gradient variance from mini-batches acts as implicit regularization, knocking the parameters out of narrow overfitted local minima into wide, robust basins.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 5.4: BATCH SIZE VS GPU OCCUPANCY</span>
    <span class=\"math-diagram-badge\">HARDWARE THROUGHPUT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <rect x=\"80\" y=\"30\" width=\"140\" height=\"70\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
    <text x=\"150\" y=\"55\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Batch Size = 32</text>
    <text x=\"150\" y=\"75\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Underutilizes GPU Cores</text>

    <rect x=\"270\" y=\"30\" width=\"140\" height=\"70\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" />
    <text x=\"340\" y=\"55\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Batch Size = 512 / 1024</text>
    <text x=\"340\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Max Tensor Core Saturation</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Hardware Sizing Rule: Always choose mini-batch sizes as powers of 2 (32, 64, 128, 256) to align with GPU warp execution units (32 threads per warp).
  </div>
</div>
`
      },
      {
        "title": "Momentum, Nesterov Accelerated Gradient & Friction Dynamics",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 6: Momentum, Nesterov Accelerated Gradient & Friction Dynamics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Imagine a heavy bowling ball rolling down the loss mountain: it builds velocity in consistent directions, dampens noisy lateral oscillations, and rolls through small speed bumps. This is the physical intuition behind momentum.
</div>

<p>Classic Momentum introduces a velocity vector <strong>v</strong><sub>t</sub> with friction coefficient β ≈ 0.9:</p>
<pre class=\"ascii-diagram\">
v_t = β v_{t-1} + (1 - β) ∇_θ L(θ_t)
θ_{t+1} = θ_t - η v_t
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.1: MOMENTUM DAMPENING OF LATERAL OSCILLATIONS</span>
    <span class=\"math-diagram-badge\">PHYSICAL TRAJECTORY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Ravine -->
    <line x1=\"60\" y1=\"90\" x2=\"440\" y2=\"90\" stroke=\"#334155\" stroke-width=\"1.5\" />
    <!-- Without Momentum: Zig-zag -->
    <path d=\"M 80 40 L 120 140 L 160 40 L 200 140 L 240 40\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"2\" />
    <text x=\"250\" y=\"45\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\">Standard SGD (Wastes steps bouncing)</text>

    <!-- With Momentum: Smooth trajectory through valley -->
    <path d=\"M 80 40 Q 120 100 180 90 T 360 90\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"3\" />
    <text x=\"370\" y=\"85\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">With Momentum (Smooth Velocity Forward)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Momentum dampens high-frequency oscillations across ravines while compounding velocity along the true descent direction.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.2: STANDARD MOMENTUM VS NESTEROV (LOOK-AHEAD)</span>
    <span class=\"math-diagram-badge\">NESTEROV ACCELERATED GRADIENT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Standard Momentum: Momentum step then gradient step -->
    <g transform=\"translate(50, 20)\">
      <circle cx=\"30\" cy=\"80\" r=\"4\" fill=\"#00e5ff\" />
      <line x1=\"30\" y1=\"80\" x2=\"100\" y2=\"50\" stroke=\"#00e5ff\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
      <text x=\"65\" y=\"55\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"9\">1. Momentum</text>
      <line x1=\"100\" y1=\"50\" x2=\"150\" y2=\"90\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
      <text x=\"135\" y=\"80\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\">2. Current Grad</text>
      <text x=\"90\" y=\"120\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Standard Momentum</text>
    </g>

    <!-- Nesterov: Look ahead then correct -->
    <g transform=\"translate(280, 20)\">
      <circle cx=\"30\" cy=\"80\" r=\"4\" fill=\"#00e676\" />
      <line x1=\"30\" y1=\"80\" x2=\"110\" y2=\"45\" stroke=\"#00e676\" stroke-width=\"2\" stroke-dasharray=\"3\" />
      <text x=\"70\" y=\"55\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\">1. Look-ahead</text>
      <line x1=\"110\" y1=\"45\" x2=\"140\" y2=\"80\" stroke=\"#facc15\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\" />
      <text x=\"135\" y=\"70\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"9\">2. Correct at lookahead</text>
      <text x=\"90\" y=\"120\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">NAG (Nesterov)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Nesterov Accelerated Gradient (NAG): Takes the momentum jump FIRST, evaluates the gradient at the predicted look-ahead point, and applies a smart braking correction.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.3: EXPONENTIALLY WEIGHTED MOVING AVERAGE (EMA)</span>
    <span class=\"math-diagram-badge\">MEMORY DECAY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Exponential decay curve -->
    <path d=\"M 60 30 Q 140 120 440 120\" fill=\"none\" stroke=\"#b388ff\" stroke-width=\"2.5\" />
    <text x=\"150\" y=\"60\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\">Weights decay as β^k = (0.9)^k</text>
    <text x=\"150\" y=\"85\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">Effective historical memory horizon ≈ 1 / (1 - β) = 10 steps</text>
  </svg>
  <div class=\"math-diagram-caption\">
    EMA Smoothing: A momentum coefficient β = 0.9 averages gradients over the last ~10 steps; β = 0.99 averages over ~100 steps.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 6.4: ROLLING OVER SADDLE PLATEAUS</span>
    <span class=\"math-diagram-badge\">SADDLE ESCAPE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- Flat plateau -->
    <path d=\"M 50 30 Q 120 90 200 90 L 320 90 Q 380 90 440 140\" fill=\"none\" stroke=\"#475569\" stroke-width=\"2\" />
    <circle cx=\"260\" cy=\"90\" r=\"5\" fill=\"#00e676\" />
    <text x=\"260\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Zero Gradient Plateau (∇f ≈ 0)</text>
    <text x=\"260\" y=\"115\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Momentum carries velocity through zero-slope flatlands</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Plateau Traversal: When gradients vanish on flat saddle terraces, accumulated momentum prevents the optimizer from stalling.
  </div>
</div>
`
      },
      {
        "title": "Adaptive Optimizers: RMSProp, Adam & AdamW with Decoupled Weight Decay",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 7: Adaptive Optimizers: RMSProp, Adam & AdamW with Decoupled Weight Decay</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Different parameters require different learning rates. Frequent features need smaller, careful steps; rare features need larger updates. Adam combines momentum with second-moment scaling, powering 99% of modern LLMs.
</div>

<p>Adam (Adaptive Moment Estimation) tracks both the <strong>first raw moment</strong> <em>m</em><sub>t</sub> (mean gradient) and the <strong>second uncentered moment</strong> <em>v</em><sub>t</sub> (uncentered variance):</p>
<pre class=\"ascii-diagram\">
m_t = β_1 m_{t-1} + (1 - β_1) g_t           (First Moment: Direction)
v_t = β_2 v_{t-1} + (1 - β_2) g_t^2         (Second Moment: Scale)
m̂_t = m_t / (1 - β_1^t),   v̂_t = v_t / (1 - β_2^t)   (Bias Correction)
θ_{t+1} = θ_t - η · [ m̂_t / (sqrt(v̂_t) + ε) ]
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.1: INDIVIDUAL PARAMETER ADAPTIVE STEP SCALING</span>
    <span class=\"math-diagram-badge\">ADAPTIVE LEARNING RATE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Feature 1: High variance (large gradients) -->
    <g transform=\"translate(50, 30)\">
      <rect x=\"0\" y=\"0\" width=\"180\" height=\"80\" fill=\"rgba(239,68,68,0.15)\" stroke=\"#ef4444\" />
      <text x=\"90\" y=\"35\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Feature A: Giant Gradients</text>
      <text x=\"90\" y=\"55\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Large v_t → Divides by large √v_t</text>
      <text x=\"90\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">→ Tamed, Stable Steps</text>
    </g>

    <!-- Feature 2: Sparse/Low variance (tiny gradients) -->
    <g transform=\"translate(270, 30)\">
      <rect x=\"0\" y=\"0\" width=\"180\" height=\"80\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
      <text x=\"90\" y=\"35\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Feature B: Rare / Tiny Gradients</text>
      <text x=\"90\" y=\"55\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Small v_t → Divides by small √v_t</text>
      <text x=\"90\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">→ Amplified, Effective Steps</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Adaptive Scaling: Dividing by √v_t normalizes the effective step size across all parameter coordinates regardless of scale.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.2: THE BIAS CORRECTION FACTOR AT EARLY TIMESTEPS</span>
    <span class=\"math-diagram-badge\">INITIALIZATION UNBIASING</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Zero initialization cold start curve -->
    <path d=\"M 60 120 Q 150 110 240 50 L 440 45\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2.5\" />
    <text x=\"160\" y=\"90\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\">1 / (1 - β^t) scale factor</text>
    <text x=\"60\" y=\"145\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\">t = 1: Unbiases 1 / (1 - 0.999) = 1000x scaling</text>
    <text x=\"320\" y=\"145\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\">t → ∞: Factor converges to 1.0</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Bias Correction: Because m₀ = 0 and v₀ = 0, early estimates are biased toward zero. Dividing by (1 - β^t) prevents catastrophic slow starts.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.3: ADAM VS ADAMW (DECOUPLED WEIGHT DECAY)</span>
    <span class=\"math-diagram-badge\">LOSCHILOV & HUTTER (2019)</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <rect x=\"50\" y=\"30\" width=\"180\" height=\"80\" fill=\"rgba(239,68,68,0.15)\" stroke=\"#ef4444\" />
    <text x=\"140\" y=\"55\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Flawed L2 in Adam</text>
    <text x=\"140\" y=\"75\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">g_t = ∇L + λ θ</text>
    <text x=\"140\" y=\"95\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">Decay scaled by 1/√v_t (Weakened!)</text>

    <rect x=\"270\" y=\"30\" width=\"180\" height=\"80\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" />
    <text x=\"360\" y=\"55\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">AdamW (Decoupled)</text>
    <text x=\"360\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">θ ← θ - η λ θ - η m̂/√v̂</text>
    <text x=\"360\" y=\"95\" fill=\"#e2e8f0\" font-family=\"monospace\" font-size=\"8\" text-anchor=\"middle\">True weight decay restored!</text>
  </svg>
  <div class=\"math-diagram-caption\">
    AdamW Fix: Decouples weight decay from the adaptive gradient moment v_t. This is why every modern Transformer (LLaMA, GPT-4) trains exclusively on AdamW.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 7.4: OPTIMIZER MEMORY OVERHEAD BREAKDOWN</span>
    <span class=\"math-diagram-badge\">GPU RAM FOOTPRINT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Bar showing 1x params, 1x grads, 2x Adam states -->
    <rect x=\"60\" y=\"40\" width=\"80\" height=\"40\" fill=\"#00e5ff\" />
    <text x=\"100\" y=\"65\" fill=\"#000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Params (4B)</text>

    <rect x=\"140\" y=\"40\" width=\"80\" height=\"40\" fill=\"#b388ff\" />
    <text x=\"180\" y=\"65\" fill=\"#000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Grads (4B)</text>

    <rect x=\"220\" y=\"40\" width=\"80\" height=\"40\" fill=\"#facc15\" />
    <text x=\"260\" y=\"65\" fill=\"#000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Moment m (4B)</text>

    <rect x=\"300\" y=\"40\" width=\"80\" height=\"40\" fill=\"#00e676\" />
    <text x=\"340\" y=\"65\" fill=\"#000\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Variance v (4B)</text>

    <text x=\"250\" y=\"115\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Total: 16 bytes per parameter! (Adam state alone uses 8 bytes/param)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Optimizer State Memory: For a 70B parameter model in FP32, Adam optimizer states alone consume 560 GB of GPU RAM before any activation memory is allocated!
  </div>
</div>
`
      },
      {
        "title": "Loss Landscapes, Convexity, Local Minima & Saddle Points",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 8: Loss Landscapes, Convexity, Local Minima & Saddle Points</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Why do deep neural networks train so successfully despite having non-convex loss functions? In high dimensions, local minima are rare; saddle points with escape routes dominate the topology.
</div>

<p>A set <em>C</em> is convex if the line segment connecting any two points in <em>C</em> lies entirely within <em>C</em>. A function <em>f</em> is <strong>convex</strong> if:</p>
<pre class=\"ascii-diagram\">
f(α x + (1 - α) y) ≤ α f(x) + (1 - α) f(y),   ∀ α ∈ [0, 1]
</pre>
<p>For convex functions, every local minimum is guaranteed to be a <strong>global minimum</strong>.</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.1: HIGH-DIMENSIONAL SADDLE ESCAPE MECHANISM</span>
    <span class=\"math-diagram-badge\">D-DIMENSIONAL SADDLE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Saddle 3D wireframe -->
    <path d=\"M 80 50 Q 250 140 420 50 M 80 130 Q 250 40 420 130\" fill=\"none\" stroke=\"#b388ff\" stroke-width=\"2\" />
    <circle cx=\"250\" cy=\"90\" r=\"5\" fill=\"#facc15\" />
    <text x=\"250\" y=\"80\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Saddle Point (∇f = 0)</text>
    <!-- Escape Arrow downhill -->
    <path d=\"M 255 95 Q 310 120 370 140\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"3\" marker-end=\"url(#arrow-green)\" />
    <text x=\"380\" y=\"135\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">Escape Trajectory</text>
  </svg>
  <div class=\"math-diagram-caption\">
    In 1,000,000 dimensions, for a stationary point to be a local minimum, ALL 1,000,000 eigenvalues must be positive (probability ≈ (1/2)^1,000,000 ≈ 0). Almost all critical points are saddle points with negative eigenvalues allowing escape.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.2: LOSS LANDSCAPE SMOOTHING VIA SKIP CONNECTIONS</span>
    <span class=\"math-diagram-badge\">LI ET AL. (2018) VISUALIZATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Without skip connections: Rugged chaotic peaks -->
    <g transform=\"translate(50, 30)\">
      <path d=\"M 10 70 L 30 20 L 50 80 L 70 10 L 90 60 L 110 15 L 130 70\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" />
      <text x=\"70\" y=\"95\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Without Residuals (Chaotic)</text>
    </g>
    <!-- With ResNet skip connections: Smooth convex-like bowl -->
    <g transform=\"translate(280, 30)\">
      <path d=\"M 10 70 Q 75 10 140 70\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"3\" />
      <circle cx=\"75\" cy=\"40\" r=\"4\" fill=\"#00e676\" />
      <text x=\"75\" y=\"95\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">With Skip Connections (Smooth)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Filter Normalization & Residuals: Residual connections (ResNet, Transformers) prevent shattered gradient landscapes, transforming rugged terrain into smooth convex bowls.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.3: CONVEX HULL AND JENSEN'S INEQUALITY</span>
    <span class=\"math-diagram-badge\">CONVEXITY FOUNDATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <path d=\"M 100 120 Q 250 20 400 120\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2\" />
    <line x1=\"150\" y1=\"85\" x2=\"350\" y2=\"85\" stroke=\"#facc15\" stroke-width=\"2\" />
    <circle cx=\"250\" cy=\"85\" r=\"4\" fill=\"#facc15\" />
    <circle cx=\"250\" cy=\"45\" r=\"4\" fill=\"#00e5ff\" />
    <text x=\"250\" y=\"140\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Jensen's: E[f(X)] ≥ f(E[X]) for convex functions (Core of VAEs and EM)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Jensen's Inequality: The secant line of a convex function always lies on or above the graph of the function.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 8.4: VANISHING GRADIENT IN DEEP SATURATED NETWORKS</span>
    <span class=\"math-diagram-badge\">DEPTH DEGRADATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- Decreasing arrows through layers -->
    <rect x=\"50\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
    <rect x=\"150\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
    <rect x=\"250\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
    <rect x=\"350\" y=\"50\" width=\"40\" height=\"40\" fill=\"#1e293b\" stroke=\"#00e5ff\" />
    <line x1=\"340\" y1=\"70\" x2=\"300\" y2=\"70\" stroke=\"#ef4444\" stroke-width=\"5\" marker-end=\"url(#arrow-cyan)\" />
    <line x1=\"240\" y1=\"70\" x2=\"200\" y2=\"70\" stroke=\"#ef4444\" stroke-width=\"2.5\" marker-end=\"url(#arrow-cyan)\" />
    <line x1=\"140\" y1=\"70\" x2=\"100\" y2=\"70\" stroke=\"#ef4444\" stroke-width=\"0.8\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"250\" y=\"120\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Backpropagating through Sigmoids: Gradients multiply by |σ'| ≤ 0.25 → Vanishes to 0!</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Vanishing Gradient Trap: Repeatedly multiplying by small local derivatives (max 0.25 in Sigmoid) causes gradients at early layers to vanish exponentially.
  </div>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Custom Scalar Automatic Differentiation (Autograd) Engine",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build Micro-Autograd from Scratch</h3>
<p>Implement a scalar <code>Value</code> node that tracks computational graph operations (addition, multiplication) and executes reverse-mode automatic differentiation via <code>.backward()</code>.</p>
<p>Ensure that branching nodes accumulate gradients properly (e.g. <code>a + a</code> must yield <code>a.grad == 2.0</code>).</p>
`,
        "starterCode": `class Value:
    def __init__(self, data, _children=()):
        self.data = float(data)
        self.grad = 0.0
        self._backward = lambda: None
        self._prev = set(_children)

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data + other.data, (self, other))
        def _backward():
            self.grad += out.grad
            other.grad += out.grad
        out._backward = _backward
        return out

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other))
        def _backward():
            self.grad += other.data * out.grad
            other.grad += self.data * out.grad
        out._backward = _backward
        return out

    def backward(self):
        # Topological sort of computation graph
        topo = []
        visited = set()
        def build_topo(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev:
                    build_topo(child)
                topo.append(v)
        build_topo(self)

        self.grad = 1.0
        for node in reversed(topo):
            node._backward()

# Verify: L = (x * y) + x
x = Value(2.0)
y = Value(3.0)
L = (x * y) + x
L.backward()

print(f"L data: {L.data}")
print(f"dL/dx: {x.grad}")
print(f"dL/dy: {y.grad}")
`,
        "expectedOutput": "L data: 8.0\ndL/dx: 4.0\ndL/dy: 2.0",
        "hints": [
          "For L = x*y + x, dL/dx = y + 1 = 3 + 1 = 4.0.",
          "For L = x*y + x, dL/dy = x = 2.0."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why does Reverse-Mode Automatic Differentiation scale better than Forward-Mode for deep neural networks?",
        "options": [
          "Because forward mode requires matrix inverses at every layer.",
          "Because neural networks have millions of input parameters (weights) but a single scalar Loss output; reverse mode computes all parameter gradients in one backward pass.",
          "Because reverse mode does not require building a computational graph in memory.",
          "Because forward mode cannot differentiate non-linear activation functions."
        ],
        "correctIndex": 1,
        "explanation": "Forward-mode requires one pass per input variable (millions of passes). Reverse-mode computes derivatives of a scalar output with respect to all inputs in a single reverse sweep."
      },
      {
        "question": "What is the primary difference between L2 weight decay in standard Adam vs AdamW?",
        "options": [
          "Standard Adam uses L1 penalty instead of L2.",
          "In standard Adam, the L2 weight gradient is added to g_t and divided by √v_t, causing decay to be scaled down for weights with large gradients. AdamW decouples weight decay directly from gradient updates.",
          "AdamW only updates biases while freezing weights.",
          "AdamW uses second-order Hessian computation."
        ],
        "correctIndex": 1,
        "explanation": "Loschilov & Hutter (2019) demonstrated that Adam couples weight decay with adaptive scaling √v_t. AdamW decouples weight decay, applying it directly to θ."
      },
      {
        "question": "What does a negative eigenvalue in the Hessian matrix indicate at a critical point where ∇f = 0?",
        "options": [
          "The point is a strict local minimum along all directions.",
          "There exists an orthogonal direction along which the loss curves downwards, indicating the point is an escapable saddle point.",
          "The learning rate must be set to negative values.",
          "The matrix cannot be stored in RAM."
        ],
        "correctIndex": 1,
        "explanation": "A negative eigenvalue means the second derivative along that eigenvector direction is negative (downward concave), providing a direction of negative curvature to escape the critical point."
      }
    ]
  },

  "ml-week-3": {
    "lessons": [
      {
        "title": "Random Variables, Densities & Cumulative Distributions (CDF)",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 1: Random Variables, Densities & Cumulative Distributions (CDF)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Machine learning models make predictions under uncertainty. Probability density functions describe continuous feature likelihoods, while cumulative distributions allow sampling and quantile thresholding.
</div>

<p>A continuous random variable <em>X</em> has a <strong>Probability Density Function (PDF)</strong> f<sub>X</sub>(x) ≥ 0 such that the probability of <em>X</em> falling in interval [a, b] is the integral:</p>
<pre class=\"ascii-diagram\">
P(a ≤ X ≤ b) = ∫_a^b f_X(x) dx,   where   ∫_{-∞}^{∞} f_X(x) dx = 1
</pre>
<p>The <strong>Cumulative Distribution Function (CDF)</strong> F<sub>X</sub>(x) = P(X ≤ x) = ∈t_{-∈fty}^x f<sub>X</sub>(t) dt maps ℝ to [0, 1].</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.1: PDF AREA INTEGRATION VS CDF VALUE</span>
    <span class=\"math-diagram-badge\">PROBABILITY DUALITY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- PDF Bell curve with shaded tail -->
    <g transform=\"translate(30, 20)\">
      <path d=\"M 10 110 Q 75 110 90 20 Q 105 110 170 110\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2\" />
      <path d=\"M 10 110 Q 75 110 90 20 L 90 110 Z\" fill=\"rgba(0,229,255,0.3)\" />
      <text x=\"90\" y=\"135\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">PDF Area ∫_{-∞}^x f(t)dt</text>
    </g>
    <!-- Arrow -->
    <path d=\"M 220 75 L 270 75\" stroke=\"#64748b\" stroke-width=\"2\" marker-end=\"url(#arrow-cyan)\" />
    <text x=\"245\" y=\"65\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Equals</text>
    <!-- CDF Sigmoid-like rise -->
    <g transform=\"translate(290, 20)\">
      <path d=\"M 10 110 Q 70 110 90 65 T 170 20\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"2.5\" />
      <circle cx=\"90\" cy=\"65\" r=\"4\" fill=\"#00e676\" />
      <text x=\"90\" y=\"135\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">CDF Value F(x) = 0.5</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    The fundamental connection: The area under the PDF up to point x equals the height of the CDF F(x).
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.2: INVERSE CDF SAMPLING (REPARAMETERIZATION)</span>
    <span class=\"math-diagram-badge\">GENERATIVE SAMPLING</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Uniform sample u in [0, 1] mapped through F^-1 to x -->
    <rect x=\"60\" y=\"50\" width=\"120\" height=\"40\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
    <text x=\"120\" y=\"75\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Uniform u ~ U[0, 1]</text>
    <path d=\"M 190 70 L 250 70\" stroke=\"#facc15\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\" />
    <text x=\"220\" y=\"60\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">F⁻¹(u)</text>
    <rect x=\"260\" y=\"50\" width=\"160\" height=\"40\" fill=\"rgba(0,230,118,0.15)\" stroke=\"#00e676\" />
    <text x=\"340\" y=\"75\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Sample x ~ Target P(X)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Inverse Transform Sampling: Any continuous distribution can be sampled by generating uniform random noise u and passing it through the quantile function F⁻¹(u).
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.3: DISCRETE PMF VS CONTINUOUS PDF</span>
    <span class=\"math-diagram-badge\">DISCRETE VS CONTINUOUS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- PMF bars -->
    <rect x=\"60\" y=\"50\" width=\"15\" height=\"60\" fill=\"#00e5ff\" />
    <rect x=\"85\" y=\"30\" width=\"15\" height=\"80\" fill=\"#00e5ff\" />
    <rect x=\"110\" y=\"70\" width=\"15\" height=\"40\" fill=\"#00e5ff\" />
    <text x=\"95\" y=\"130\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Discrete PMF: P(X=k) = p_k</text>

    <!-- PDF curve -->
    <path d=\"M 260 110 Q 325 20 390 110\" fill=\"none\" stroke=\"#b388ff\" stroke-width=\"2\" />
    <text x=\"325\" y=\"130\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Continuous PDF: P(X=x) = 0!</text>
  </svg>
  <div class=\"math-diagram-caption\">
    For a continuous random variable, the probability of hitting an exact real number is 0; probabilities only exist over intervals.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 1.4: QUANTILE SPLIT (P-VALUE REGION)</span>
    <span class=\"math-diagram-badge\">STATISTICAL THRESHOLD</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <path d=\"M 80 100 Q 250 10 420 100\" fill=\"none\" stroke=\"#475569\" stroke-width=\"1.5\" />
    <!-- 5% critical tail -->
    <path d=\"M 360 70 Q 390 90 420 100 L 360 100 Z\" fill=\"rgba(239,68,68,0.4)\" stroke=\"#ef4444\" />
    <text x=\"380\" y=\"60\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">α = 0.05 Tail</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Critical Rejection Regions: Shading the extreme tail of the distribution identifies rare events (p-values below threshold α).
  </div>
</div>
`
      },
      {
        "title": "Common Distributions: Gaussian, Bernoulli, Binomial & Poisson",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 2: Common Distributions: Gaussian, Bernoulli, Binomial & Poisson</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Every machine learning loss function is rooted in a probability distribution: Mean Squared Error assumes Gaussian noise; Binary Cross-Entropy assumes Bernoulli trials; Count regression assumes Poisson rates.
</div>

<p>The <strong>Univariate Normal (Gaussian)</strong> distribution Normal distribution <em>N</em>(μ, σ²) is defined by:</p>
<pre class=\"ascii-diagram\">
p(x; μ, σ) = (1 / [σ √(2π)]) · exp( - (x - μ)² / (2σ²) )
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.1: THE GAUSSIAN 68-95-99.7 EMPIRICAL RULE</span>
    <span class=\"math-diagram-badge\">NORMAL DISTRIBUTION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Bell curve -->
    <path d=\"M 50 140 Q 200 140 250 30 Q 300 140 450 140\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2.5\" />
    <line x1=\"250\" y1=\"140\" x2=\"250\" y2=\"30\" stroke=\"#64748b\" stroke-dasharray=\"3\" />
    <text x=\"250\" y=\"155\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">μ</text>

    <!-- 1 sigma lines -->
    <line x1=\"200\" y1=\"140\" x2=\"200\" y2=\"75\" stroke=\"#00e676\" stroke-width=\"1.5\" />
    <line x1=\"300\" y1=\"140\" x2=\"300\" y2=\"75\" stroke=\"#00e676\" stroke-width=\"1.5\" />
    <text x=\"250\" y=\"80\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">68.2% in [μ - σ, μ + σ]</text>

    <!-- 2 sigma labels -->
    <text x=\"250\" y=\"110\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">95.4% in [μ - 2σ, μ + 2σ]</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The 68-95-99.7 Rule: Under a Gaussian distribution, 99.7% of all data lies within 3 standard deviations of the mean.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.2: BERNOULLI VS BINOMIAL DISTRIBUTION</span>
    <span class=\"math-diagram-badge\">DISCRETE TRIALS</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Bernoulli: single coin flip -->
    <g transform=\"translate(60, 30)\">
      <rect x=\"0\" y=\"30\" width=\"30\" height=\"50\" fill=\"#ef4444\" />
      <rect x=\"45\" y=\"10\" width=\"30\" height=\"70\" fill=\"#00e676\" />
      <text x=\"15\" y=\"95\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">0 (1-p)</text>
      <text x=\"60\" y=\"95\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">1 (p)</text>
      <text x=\"37\" y=\"120\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Bernoulli (Single Trial)</text>
    </g>

    <!-- Binomial: sum of n trials -->
    <g transform=\"translate(250, 30)\">
      <rect x=\"0\" y=\"60\" width=\"12\" height=\"20\" fill=\"#00e5ff\" />
      <rect x=\"18\" y=\"40\" width=\"12\" height=\"40\" fill=\"#00e5ff\" />
      <rect x=\"36\" y=\"20\" width=\"12\" height=\"60\" fill=\"#00e5ff\" />
      <rect x=\"54\" y=\"10\" width=\"12\" height=\"70\" fill=\"#00e5ff\" />
      <rect x=\"72\" y=\"20\" width=\"12\" height=\"60\" fill=\"#00e5ff\" />
      <rect x=\"90\" y=\"40\" width=\"12\" height=\"40\" fill=\"#00e5ff\" />
      <rect x=\"108\" y=\"60\" width=\"12\" height=\"20\" fill=\"#00e5ff\" />
      <text x=\"60\" y=\"120\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Binomial B(n, p) = ∑ Bernoulli</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Binary Classification: A single binary output y ∈ {0, 1} follows Bernoulli(p). Logistic regression directly outputs parameter p.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.3: POISSON DISTRIBUTION (EVENT COUNTS OVER TIME)</span>
    <span class=\"math-diagram-badge\">RATE PARAMETER λ</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 150\">
    <!-- Poisson distribution shape -->
    <path d=\"M 60 110 L 90 60 L 120 30 L 150 40 L 180 70 L 210 95 L 240 110\" fill=\"none\" stroke=\"#facc15\" stroke-width=\"2\" />
    <text x=\"280\" y=\"60\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\">P(X = k) = (λ^k e^{-λ}) / k!</text>
    <text x=\"280\" y=\"85\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\">Mean = λ, Variance = λ</text>
    <text x=\"280\" y=\"110\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\">Used for API traffic, call rates, click counts</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Poisson Modeling: Models the arrival rate of independent discrete events occurring in a fixed time window.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 2.4: MULTIVARIATE GAUSSIAN CONTOURS</span>
    <span class=\"math-diagram-badge\">COVARIANCE MATRIX Σ</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- Uncorrelated vs Correlated Ellipse -->
    <g transform=\"translate(80, 20)\">
      <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#00e5ff\" stroke-width=\"2\" />
      <text x=\"50\" y=\"105\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Σ = σ² I (Spherical)</text>
    </g>
    <g transform=\"translate(300, 20)\">
      <ellipse cx=\"50\" cy=\"50\" rx=\"50\" ry=\"20\" transform=\"rotate(-35 50 50)\" fill=\"none\" stroke=\"#b388ff\" stroke-width=\"2\" />
      <text x=\"50\" y=\"105\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Σ has covariance (Rotated)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Multivariate Normal: Covariance matrix Σ governs the orientation and stretch of probability density contours in high dimensions.
  </div>
</div>
`
      },
      {
        "title": "Expected Value, Variance, Covariance & Correlation Matrices",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 3: Expected Value, Variance, Covariance & Correlation Matrices</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Expectation is the center of gravity; variance is the dispersion; covariance reveals whether two features rise together or oppose one another. Feature decorrelation is the gateway to efficient deep learning.
</div>

<p>The <strong>Expected Value</strong> mathbb{E}[X] of a continuous random variable is its probability-weighted average:</p>
<pre class=\"ascii-diagram\">
E[X] = ∫_{-∞}^{∞} x f_X(x) dx,   Var(X) = E[(X - E[X])²] = E[X²] - (E[X])²
</pre>
<p>For two random variables <em>X</em> and <em>Y</em>, their <strong>Covariance</strong> is Cov(X, Y) = mathbb{E}[(X - mathbb{E}[X])(Y - mathbb{E}[Y])].</p>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.1: CORRELATION COEFFICIENTS (r = +1, 0, -1)</span>
    <span class=\"math-diagram-badge\">PEARSON CORRELATION</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 170\">
    <!-- Positive r = 0.9 -->
    <g transform=\"translate(40, 20)\">
      <line x1=\"10\" y1=\"80\" x2=\"90\" y2=\"10\" stroke=\"#00e676\" stroke-width=\"2\" />
      <circle cx=\"20\" cy=\"70\" r=\"2\" fill=\"#94a3b8\" />
      <circle cx=\"40\" cy=\"60\" r=\"2\" fill=\"#94a3b8\" />
      <circle cx=\"60\" cy=\"40\" r=\"2\" fill=\"#94a3b8\" />
      <circle cx=\"80\" cy=\"20\" r=\"2\" fill=\"#94a3b8\" />
      <text x=\"50\" y=\"105\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">r ≈ +0.9 (Positive)</text>
    </g>
    <!-- Zero r = 0 -->
    <g transform=\"translate(190, 20)\">
      <circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"none\" stroke=\"#64748b\" stroke-dasharray=\"2\" />
      <text x=\"50\" y=\"105\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">r ≈ 0 (Uncorrelated)</text>
    </g>
    <!-- Negative r = -0.9 -->
    <g transform=\"translate(340, 20)\">
      <line x1=\"10\" y1=\"10\" x2=\"90\" y2=\"80\" stroke=\"#ef4444\" stroke-width=\"2\" />
      <text x=\"50\" y=\"105\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">r ≈ -0.9 (Inverse)</text>
    </g>
  </svg>
  <div class=\"math-diagram-caption\">
    Pearson Correlation r = Cov(X, Y) / (σ_X σ_Y) is scale-invariant and bounded strictly between -1 and +1.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.2: COVARIANCE MATRIX HEATMAP TOPOLOGY</span>
    <span class=\"math-diagram-badge\">MATRIX ARCHITECTURE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- 3x3 Heatmap Grid -->
    <g transform=\"translate(170, 20)\">
      <rect x=\"0\" y=\"0\" width=\"40\" height=\"40\" fill=\"#00e676\" opacity=\"0.9\" />
      <rect x=\"40\" y=\"0\" width=\"40\" height=\"40\" fill=\"#b388ff\" opacity=\"0.4\" />
      <rect x=\"80\" y=\"0\" width=\"40\" height=\"40\" fill=\"#334155\" opacity=\"0.2\" />
      <rect x=\"0\" y=\"40\" width=\"40\" height=\"40\" fill=\"#b388ff\" opacity=\"0.4\" />
      <rect x=\"40\" y=\"40\" width=\"40\" height=\"40\" fill=\"#00e676\" opacity=\"0.9\" />
      <rect x=\"80\" y=\"40\" width=\"40\" height=\"40\" fill=\"#ef4444\" opacity=\"0.5\" />
      <rect x=\"0\" y=\"80\" width=\"40\" height=\"40\" fill=\"#334155\" opacity=\"0.2\" />
      <rect x=\"40\" y=\"80\" width=\"40\" height=\"40\" fill=\"#ef4444\" opacity=\"0.5\" />
      <rect x=\"80\" y=\"80\" width=\"40\" height=\"40\" fill=\"#00e676\" opacity=\"0.9\" />
    </g>
    <text x=\"320\" y=\"60\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\">Diagonal: Var(X_i)</text>
    <text x=\"320\" y=\"85\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"10\">Off-Diagonal: Cov(X_i, X_j)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Symmetric Positive Semi-Definite: Covariance matrices have non-negative diagonal variance terms and symmetric off-diagonal covariances.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.3: BATCH NORMALIZATION VARIANCE REDUCTION</span>
    <span class=\"math-diagram-badge\">INTERNAL COVARIATE SHIFT</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- Unnormalized shift vs normalized N(0, 1) -->
    <path d=\"M 60 90 Q 120 20 180 90\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1.5\" />
    <path d=\"M 140 100 Q 200 40 260 100\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1.5\" stroke-dasharray=\"3\" />
    <text x=\"160\" y=\"125\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Drifting Distributions</text>

    <path d=\"M 320 90 Q 380 20 440 90\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" stroke-width=\"2.5\" />
    <text x=\"380\" y=\"125\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Normalized: x̂ = (x - μ_B) / √(σ_B² + ε)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Batch Normalization forces intermediate layer activations to maintain mean 0 and variance 1 across training steps.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 3.4: LINEARITY OF EXPECTATION</span>
    <span class=\"math-diagram-badge\">ALGEBRAIC PROPERTY</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 130\">
    <text x=\"250\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"13\" text-anchor=\"middle\">E[a X + b Y] = a E[X] + b E[Y]</text>
    <text x=\"250\" y=\"75\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Holds regardless of whether X and Y are independent or correlated!</text>
    <text x=\"250\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y)</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Fundamental Rule: Expectation is an inherently linear operator across any combination of random variables.
  </div>
</div>
`
      },
      {
        "title": "Conditional Probability, Bayes' Theorem & Likelihood",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 4: Conditional Probability, Bayes' Theorem & Likelihood</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  How should beliefs update when new experimental data arrives? Bayes' theorem provides the mathematical framework for learning from evidence.
</div>

<p>The conditional probability of event <em>A</em> given event <em>B</em> is P(A|B) = (P(A cap B) / P(B)). Reversing the condition yields <strong>Bayes' Theorem</strong>:</p>
<pre class=\"ascii-diagram\">
P(θ | D) = [ P(D | θ) · P(θ) ] / P(D)
Posterior = [ Likelihood · Prior ] / Marginal Evidence
</pre>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.1: BAYESIAN INFERENCE FOUR-WAY RELATIONSHIP</span>
    <span class=\"math-diagram-badge\">BAYESIAN ARCHITECTURE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 180\">
    <!-- Prior -->
    <rect x=\"30\" y=\"40\" width=\"100\" height=\"45\" fill=\"rgba(0,229,255,0.15)\" stroke=\"#00e5ff\" />
    <text x=\"80\" y=\"65\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Prior P(θ)</text>
    <text x=\"80\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Prior Beliefs</text>

    <text x=\"150\" y=\"65\" fill=\"#fff\" font-family=\"monospace\" font-size=\"16\">×</text>

    <!-- Likelihood -->
    <rect x=\"170\" y=\"40\" width=\"120\" height=\"45\" fill=\"rgba(179,136,255,0.15)\" stroke=\"#b388ff\" />
    <text x=\"230\" y=\"65\" fill=\"#b388ff\" font-family=\"monospace\" font-size=\"11\" text-anchor=\"middle\">Likelihood P(D|θ)</text>
    <text x=\"230\" y=\"105\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Data Evidence</text>

    <text x=\"310\" y=\"65\" fill=\"#fff\" font-family=\"monospace\" font-size=\"16\">∝</text>

    <!-- Posterior -->
    <rect x=\"330\" y=\"40\" width=\"140\" height=\"45\" fill=\"rgba(0,230,118,0.2)\" stroke=\"#00e676\" stroke-width=\"2\" />
    <text x=\"400\" y=\"65\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Posterior P(θ|D)</text>
    <text x=\"400\" y=\"105\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">Updated World View</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Posterior is proportional to Prior times Likelihood. The denominator P(D) = ∫ P(D|θ) P(θ) dθ acts as a normalizing constant.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.2: BAYESIAN TREE & LAW OF TOTAL PROBABILITY</span>
    <span class=\"math-diagram-badge\">PROBABILITY TREE</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 160\">
    <!-- Tree branching from root -->
    <circle cx=\"60\" cy=\"80\" r=\"6\" fill=\"#fff\" />
    <line x1=\"65\" y1=\"75\" x2=\"180\" y2=\"35\" stroke=\"#00e5ff\" stroke-width=\"2\" />
    <text x=\"120\" y=\"45\" fill=\"#00e5ff\" font-family=\"monospace\" font-size=\"9\">P(Spam) = 0.2</text>
    <line x1=\"65\" y1=\"85\" x2=\"180\" y2=\"125\" stroke=\"#64748b\" stroke-width=\"2\" />
    <text x=\"120\" y=\"120\" fill=\"#64748b\" font-family=\"monospace\" font-size=\"9\">P(Ham) = 0.8</text>

    <!-- Leaves -->
    <text x=\"240\" y=\"35\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"10\">P(\"Buy\"|Spam) = 0.9</text>
    <text x=\"240\" y=\"130\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"10\">P(\"Buy\"|Ham) = 0.05</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Law of Total Probability: P(Evidence) is computed by summing the evidence probability across all mutually exclusive hypotheses.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.3: BASE RATE FALLACY VISUALIZER</span>
    <span class=\"math-diagram-badge\">COGNITIVE PARADOX</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <rect x=\"50\" y=\"30\" width=\"380\" height=\"70\" fill=\"rgba(239,68,68,0.1)\" stroke=\"#ef4444\" />
    <text x=\"240\" y=\"55\" fill=\"#ef4444\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Rare Disease (0.1% Base Rate) with 99% Test Accuracy</text>
    <text x=\"240\" y=\"75\" fill=\"#facc15\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">If you test positive, actual P(Sick|Positive) is only ~9%!</text>
    <text x=\"240\" y=\"92\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">False positives from the 99.9% healthy group overwhelm true positives.</text>
  </svg>
  <div class=\"math-diagram-caption\">
    Base Rate Fallacy: When the prior P(θ) is tiny, false positives outnumber true positives even with highly accurate classifiers.
  </div>
</div>

<div class=\"math-diagram-box\">
  <div class=\"math-diagram-header\">
    <span class=\"math-diagram-title\">⚡ DIAGRAM 4.4: LIKELIHOOD FUNCTION SURFACE</span>
    <span class=\"math-diagram-badge\">PARAMETER SCAN</span>
  </div>
  <svg class=\"math-svg-canvas\" viewBox=\"0 0 500 140\">
    <!-- Bell shaped likelihood curve with marked peak -->
    <path d=\"M 60 110 Q 250 10 440 110\" fill=\"none\" stroke=\"#b388ff\" stroke-width=\"2.5\" />
    <circle cx=\"250\" cy=\"60\" r=\"5\" fill=\"#00e676\" />
    <text x=\"250\" y=\"45\" fill=\"#00e676\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Peak: θ_MLE = argmax L(θ|D)</text>
    <text x=\"250\" y=\"130\" fill=\"#94a3b8\" font-family=\"monospace\" font-size=\"10\" text-anchor=\"middle\">Parameter Candidate θ</text>
  </svg>
  <div class=\"math-diagram-caption\">
    The Likelihood Function L(θ; D) views data as fixed and treats parameter θ as the variable to be optimized.
  </div>
</div>
`
      },
      {
        "title": "Maximum Likelihood Estimation (MLE) & The Log-Likelihood",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 5: Maximum Likelihood Estimation (MLE) & The Log-Likelihood</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Why do we minimize Cross-Entropy Loss in classification and Mean Squared Error in regression? Because both are mathematically identical to Maximum Likelihood Estimation under Bernoulli and Gaussian noise models!
</div>

<p>Assuming <em>N</em> independent, identically distributed (i.i.d.) observations Dataset <em>D</em> = {x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>N</sub>}, the joint likelihood is a product of probabilities:</p>
<pre class=\"ascii-diagram\">
L(θ; D) = ∏_{i=1}^N p(x_i | θ)
</pre>
<p>Because products of small probabilities trigger floating-point underflow (e.g. 0.001<sup>1000</sup> → 0), we take the natural logarithm, converting products into numerically stable sums:</p>
<pre class="ascii-diagram">
log L(θ; D) = ∑_{i=1}^N log p(x<sub>i</sub> | θ)
θ_{MLE} = argmin_θ [ - ∑_{i=1}^N log p(x<sub>i</sub> | θ) ]   (Negative Log-Likelihood NLL)
</pre>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 5.1: LOG TRANSFORMATION TURNS PRODUCTS INTO SUMS</span>
    <span class="math-diagram-badge">LOG TRICK</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 170">
    <g transform="translate(40, 30)">
      <rect x="0" y="0" width="180" height="80" fill="rgba(239,68,68,0.15)" stroke="#ef4444" />
      <text x="90" y="40" fill="#ef4444" font-family="monospace" font-size="11" text-anchor="middle">∏ p(x<sub>i</sub> | θ)</text>
      <text x="90" y="65" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Catastrophic Underflow! (0.000...)</text>
    </g>
    <path d="M 230 70 L 270 70" stroke="#facc15" stroke-width="2" marker-end="url(#arrow-green)" />
    <text x="250" y="60" fill="#facc15" font-family="monospace" font-size="10" text-anchor="middle">ln()</text>
    <g transform="translate(280, 30)">
      <rect x="0" y="0" width="180" height="80" fill="rgba(0,230,118,0.15)" stroke="#00e676" stroke-width="2" />
      <text x="90" y="40" fill="#00e676" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">∑ log p(x<sub>i</sub> | θ)</text>
      <text x="90" y="65" fill="#00e676" font-family="monospace" font-size="9" text-anchor="middle">Stable Addition in FP32</text>
    </g>
  </svg>
  <div class="math-diagram-caption">
    The log function is strictly monotonically increasing: maximizing log L(θ) yields the exact same optimal θ as maximizing L(θ).
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 5.2: GAUSSIAN MLE DERIVATION EQUALS MSE LOSS</span>
    <span class="math-diagram-badge">LOSS EQUIVALENCE</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 150">
    <text x="250" y="40" fill="#00e5ff" font-family="monospace" font-size="12" text-anchor="middle">- log p(y | x; θ) = - log [ (1 / σ√2π) exp(- (y - f_θ(x))² / 2σ²) ]</text>
    <text x="250" y="80" fill="#00e676" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">= (1 / 2σ²) ∑ (y<sub>i</sub> - f_θ(x<sub>i</sub>))² + const</text>
    <text x="250" y="115" fill="#facc15" font-family="monospace" font-size="11" text-anchor="middle">Minimizing Negative Log-Likelihood under Gaussian noise IS Mean Squared Error!</text>
  </svg>
  <div class="math-diagram-caption">
    MSE is not an arbitrary metric: it is the mathematically optimal Maximum Likelihood estimator for targets with Gaussian-distributed errors.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 5.3: BERNOULLI MLE EQUALS CROSS-ENTROPY LOSS</span>
    <span class="math-diagram-badge">CLASSIFICATION PROOF</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 140">
    <text x="250" y="45" fill="#b388ff" font-family="monospace" font-size="12" text-anchor="middle">P(y | x) = p^y · (1 - p)^{1 - y}</text>
    <text x="250" y="85" fill="#00e676" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">NLL = - [ y log(p) + (1 - y) log(1 - p) ]</text>
    <text x="250" y="115" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Binary Cross-Entropy (BCE) Loss is the exact negative log-likelihood of a Bernoulli trial.</text>
  </svg>
  <div class="math-diagram-caption">
    Cross-Entropy Loss is the exact negative log-likelihood of Bernoulli data.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 5.4: ASYMPTOTIC NORMALITY OF MLE ESTIMATORS</span>
    <span class="math-diagram-badge">FISHER INFORMATION</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 130">
    <text x="250" y="50" fill="#00e5ff" font-family="monospace" font-size="12" text-anchor="middle">√N (θ<sub>M</sub>LE - θ<sub>t</sub>rue) ⟶ N(0, I(θ)⁻¹)</text>
    <text x="250" y="85" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">As dataset size N → ∞, the MLE estimator achieves the theoretical minimum possible variance (Cramér-Rao Bound).</text>
  </svg>
  <div class="math-diagram-caption">
    Cramér-Rao Lower Bound: MLE is asymptotically efficient, achieving the lowest possible variance among all unbiased estimators.
  </div>
</div>
`
      },
      {
        "title": "Maximum A Posteriori (MAP) Estimation & Bayesian Priors as Regularization",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 6: Maximum A Posteriori (MAP) Estimation & Bayesian Priors as Regularization</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Weight decay (L2 regularization) and Lasso (L1 regularization) are not heuristic hacks: they are the exact mathematical consequence of MAP estimation with Gaussian and Laplace priors over weights!
</div>

<p>While MLE seeks\θmaximizing data likelihoodP(\<em>D</em>|\θ), **Maximum A Posteriori (MAP)** seeks the mode of the posterior distribution:</p>
<pre class="ascii-diagram">
θ_{MAP} = argmax_θ [ log P(D | θ) + log P(θ) ]
</pre>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 6.1: GAUSSIAN PRIOR DERIVES L2 WEIGHT DECAY</span>
    <span class="math-diagram-badge">RIDGE REGULARIZATION DUALITY</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 160">
    <!-- Prior p(w) ~ N(0, sigma<sub>0</sub>²) -->
    <text x="250" y="40" fill="#00e5ff" font-family="monospace" font-size="12" text-anchor="middle">Prior: p(w) ∝ exp( - ‖w‖² / (2 σ₀²) )</text>
    <text x="250" y="80" fill="#00e676" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">log p(w) = - [ 1 / (2 σ₀²) ] ‖w‖² + const</text>
    <text x="250" y="115" fill="#facc15" font-family="monospace" font-size="11" text-anchor="middle">Objective: Loss(θ) + λ ‖w‖²  where λ = 1 / (2 σ₀²)</text>
  </svg>
  <div class="math-diagram-caption">
    L2 Weight Decay Equivalence: Placing a zero-mean Gaussian prior over neural network weights is mathematically equivalent to L2 regularization.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 6.2: LAPLACE PRIOR DERIVES L1 LASSO REGULARIZATION</span>
    <span class="math-diagram-badge">SPARSITY EMERGENCE</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 160">
    <!-- Sharp peaked Laplace distribution -->
    <g transform="translate(60, 30)">
      <path d="M 10 90 L 70 10 L 130 90" fill="none" stroke="#b388ff" stroke-width="2.5" />
      <text x="70" y="115" fill="#b388ff" font-family="monospace" font-size="9" text-anchor="middle">Laplace Prior p(w) ∝ exp(-|w|/b)</text>
    </g>
    <!-- Arrow -->
    <path d="M 210 70 L 260 70" stroke="#facc15" stroke-width="2" marker-end="url(#arrow-green)" />
    <g transform="translate(280, 45)">
      <text x="100" y="20" fill="#00e676" font-family="monospace" font-size="12" font-weight="bold">Objective: Loss(θ) + λ ∑ |w<sub>i</sub>|</text>
      <text x="100" y="45" fill="#94a3b8" font-family="monospace" font-size="10">Sharp peak at 0 drives weights to exact 0</text>
    </g>
  </svg>
  <div class="math-diagram-caption">
    L1 Lasso Equivalence: Placing a zero-mean Laplace prior over weights induces L1 sparsity, setting unimportant weights to strictly zero.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 6.3: MLE VS MAP UNDER SMALL VS INFINITE DATA</span>
    <span class="math-diagram-badge">ASYMPTOTIC CONVERGENCE</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 140">
    <rect x="50" y="30" width="180" height="70" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" />
    <text x="140" y="55" fill="#00e5ff" font-family="monospace" font-size="10" text-anchor="middle">Small N (Few samples)</text>
    <text x="140" y="75" fill="#e2e8f0" font-family="monospace" font-size="9" text-anchor="middle">Prior P(θ) dominates</text>

    <rect x="270" y="30" width="180" height="70" fill="rgba(0,230,118,0.15)" stroke="#00e676" />
    <text x="360" y="55" fill="#00e676" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Infinite N (Big Data)</text>
    <text x="360" y="75" fill="#00e676" font-family="monospace" font-size="9" text-anchor="middle">Likelihood overwhelms prior → θ<sub>M</sub>AP = θ<sub>M</sub>LE</text>
  </svg>
  <div class="math-diagram-caption">
    Asymptotic Equivalence: As dataset size grows to infinity, data likelihood overwhelms the prior, causing MAP to converge onto MLE.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 6.4: UNIFORM (UNINFORMATIVE) PRIOR COLLAPSE</span>
    <span class="math-diagram-badge">PRIOR COLLAPSE</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 120">
    <text x="250" y="45" fill="#facc15" font-family="monospace" font-size="12" text-anchor="middle">If P(θ) = Uniform Constant:  log P(θ) = C</text>
    <text x="250" y="80" fill="#00e676" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">argmax_θ [ log P(D | θ) + C ] = argmax_θ log P(D | θ) = θ<sub>M</sub>LE</text>
  </svg>
  <div class="math-diagram-caption">
    MLE is simply a special case of MAP with a completely flat, uninformative uniform prior.
  </div>
</div>
`
      },
      {
        "title": "Hypothesis Testing, Confidence Intervals & Central Limit Theorem",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 7: Hypothesis Testing, Confidence Intervals & Central Limit Theorem</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Did your new recommendation model actually improve click-through rate, or was the gain a random fluke of sampling variance? Master A/B testing statistical significance, Z-scores, and p-values.
</div>

<p>The <strong>Central Limit Theorem (CLT)</strong> guarantees that the sum (or average) of <em>N</em> independent random variables with mean <em>μ</em> and finite variance <em>σ</em>² converges to a normal distribution as <em>N</em> → ∞, regardless of the underlying distribution's shape:</p>
<pre class="ascii-diagram">
X̄<sub>N</sub> ~ N( μ,  σ² / N )
</pre>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 7.1: CENTRAL LIMIT THEOREM DISTRIBUTION CONVERGENCE</span>
    <span class="math-diagram-badge">CLT SIMULATION</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 180">
    <!-- Uniform original shape -->
    <g transform="translate(50, 40)">
      <rect x="0" y="20" width="80" height="50" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" />
      <text x="40" y="90" fill="#00e5ff" font-family="monospace" font-size="9" text-anchor="middle">Original (Uniform)</text>
    </g>
    <!-- Arrow -->
    <path d="M 150 65 L 200 65" stroke="#facc15" stroke-width="2" marker-end="url(#arrow-green)" />
    <text x="175" y="55" fill="#facc15" font-family="monospace" font-size="9" text-anchor="middle">Avg N=50</text>
    <!-- Normal bell -->
    <g transform="translate(220, 20)">
      <path d="M 20 80 Q 75 10 130 80" fill="none" stroke="#00e676" stroke-width="3" />
      <text x="75" y="105" fill="#00e676" font-family="monospace" font-size="10" font-weight="bold" text-anchor="middle">Sample Means ~ N(μ, σ²/N)</text>
    </g>
  </svg>
  <div class="math-diagram-caption">
    The miracle of the CLT: Even when individual data is wildly skewed or uniform, sample averages are always normally distributed.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 7.2: NULL HYPOTHESIS TESTING & P-VALUE REJECTION</span>
    <span class="math-diagram-badge">A/B TESTING CORE</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 160">
    <path d="M 60 120 Q 250 20 440 120" fill="none" stroke="#475569" stroke-width="1.5" />
    <line x1="370" y1="120" x2="370" y2="65" stroke="#ef4444" stroke-width="2" stroke-dasharray="3" />
    <path d="M 370 65 Q 405 95 440 120 L 370 120 Z" fill="rgba(239,68,68,0.4)" />
    <text x="395" y="55" fill="#ef4444" font-family="monospace" font-size="10">p-value &lt; 0.05</text>
    <text x="250" y="145" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">Null Hypothesis H₀: No true difference between Model A and Model B</text>
  </svg>
  <div class="math-diagram-caption">
    p-value: The probability of observing a performance gap at least this extreme purely by chance under the assumption that H₀ is true.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 7.3: TYPE I ERROR (ALPHA) VS TYPE II ERROR (BETA)</span>
    <span class="math-diagram-badge">DECISION MATRIX</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 150">
    <rect x="80" y="30" width="150" height="60" fill="rgba(239,68,68,0.15)" stroke="#ef4444" />
    <text x="155" y="55" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">Type I Error (α): False Alarm</text>
    <text x="155" y="75" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">Rejecting true H₀</text>

    <rect x="260" y="30" width="150" height="60" fill="rgba(250,204,21,0.15)" stroke="#facc15" />
    <text x="335" y="55" fill="#facc15" font-family="monospace" font-size="10" text-anchor="middle">Type II Error (β): Missed Signal</text>
    <text x="335" y="75" fill="#94a3b8" font-family="monospace" font-size="8" text-anchor="middle">Failing to reject false H₀</text>
  </svg>
  <div class="math-diagram-caption">
    Statistical Power (1 - β): The probability of correctly detecting a genuine improvement when one truly exists.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 7.4: 95% CONFIDENCE INTERVAL DERIVATION</span>
    <span class="math-diagram-badge">ESTIMATION BOUNDS</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 130">
    <text x="250" y="45" fill="#00e676" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">CI = X̄ ± 1.96 · (σ / √N)</text>
    <text x="250" y="80" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">95% of identically computed confidence intervals contain the true population parameter μ.</text>
  </svg>
  <div class="math-diagram-caption">
    Standard Error: Decreases with 1/√N; quadrupling data collection cuts uncertainty margins in half.
  </div>
</div>
`
      },
      {
        "title": "Information Theory: Entropy, Cross-Entropy & KL Divergence (Data Drift)",
        "layout": "fullscreen",
        "noCode": true,
        "content": `
<h2>📐 Lesson 8: Information Theory: Entropy, Cross-Entropy & KL Divergence (Data Drift)</h2>

<h3>🎲 The Intuition: How Surprised Are You?</h3>
<p>Imagine your weather app tells you: <em>"Tomorrow in the Sahara Desert, it will be sunny."</em> How much new information did you gain? Almost none! You already expected it to be sunny.</p>
<p>Now imagine your app says: <em>"Tomorrow in the Sahara Desert, it will snow 4 feet!"</em> That message contains a massive amount of information because it was completely unexpected.</p>
<p><strong>Entropy</strong> is simply the mathematical measurement of <em>average surprise or uncertainty</em>. In Machine Learning, when a model is confident and correct, its Cross-Entropy loss approaches 0. When it is confused or making wild guesses, Cross-Entropy explodes!</p>



<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Claude Shannon's information theory answers how much surprise a signal contains. Kullback-Leibler (KL) divergence measures the statistical distance between distributions, powering production data drift monitors and RLHF alignment.
</div>

<p>The <strong>Shannon Entropy</strong>H(P)of a discrete distributionPmeasures expected surprise or uncertainty:</p>
<pre class="ascii-diagram">
H(P) = - ∑_{x} P(x) log₂ P(x)
</pre>
<p>The <strong>Kullback-Leibler (KL) Divergence</strong> from distributionQto true distributionPmeasures information loss:</p>
<pre class="ascii-diagram">
D_{KL}(P ‖ Q) = ∑_{x} P(x) log [ P(x) / Q(x) ] = H(P, Q) - H(P) ≥ 0
</pre>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 8.1: KL DIVERGENCE AS EXTRA BITS OF ENCODING</span>
    <span class="math-diagram-badge">INFORMATION COMPRESSION</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 180">
    <!-- True Distribution P -->
    <path d="M 60 120 Q 150 20 240 120" fill="none" stroke="#00e5ff" stroke-width="2.5" />
    <text x="150" y="50" fill="#00e5ff" font-family="monospace" font-size="11">True P(x)</text>

    <!-- Model Distribution Q -->
    <path d="M 140 120 Q 230 40 320 120" fill="none" stroke="#b388ff" stroke-width="2.5" stroke-dasharray="3" />
    <text x="270" y="60" fill="#b388ff" font-family="monospace" font-size="11">Model Q(x)</text>

    <text x="250" y="155" fill="#00e676" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">D_{KL}(P ‖ Q) = Extra bits expended when using Q instead of P</text>
  </svg>
  <div class="math-diagram-caption">
    Gibbs' Inequality: D_{KL}(P ‖ Q) ≥ 0 with equality if and only if P = Q almost everywhere.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 8.2: DATA DRIFT DETECTION IN PRODUCTION MLOPS</span>
    <span class="math-diagram-badge">MODEL MONITORING</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 160">
    <g transform="translate(50, 30)">
      <rect x="0" y="0" width="160" height="80" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" />
      <text x="80" y="35" fill="#00e5ff" font-family="monospace" font-size="10" text-anchor="middle">Training Baseline P(X)</text>
      <text x="80" y="60" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Golden Reference Data</text>
    </g>
    <path d="M 220 70 L 270 70" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-cyan)" />
    <g transform="translate(280, 30)">
      <rect x="0" y="0" width="160" height="80" fill="rgba(239,68,68,0.15)" stroke="#ef4444" />
      <text x="80" y="35" fill="#ef4444" font-family="monospace" font-size="10" text-anchor="middle">Live Production Q<sub>t</sub>(X)</text>
      <text x="80" y="60" fill="#ef4444" font-family="monospace" font-size="9" text-anchor="middle">D<sub>K</sub>L &gt; 0.1 → ALERT: DRIFT!</text>
    </g>
  </svg>
  <div class="math-diagram-caption">
    Production Drift Gate: MLOps monitors compute KL divergence between live inference feature streams and training baselines to trigger automated pipeline retraining.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 8.3: KL ASYMMETRY (FORWARD VS REVERSE KL)</span>
    <span class="math-diagram-badge">ZERO-AVOIDING VS ZERO-FORCING</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 150">
    <rect x="50" y="30" width="180" height="75" fill="rgba(0,229,255,0.15)" stroke="#00e5ff" />
    <text x="140" y="55" fill="#00e5ff" font-family="monospace" font-size="10" text-anchor="middle">Forward KL D(P ‖ Q)</text>
    <text x="140" y="75" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">Mean-seeking (Covers all modes)</text>

    <rect x="270" y="30" width="180" height="75" fill="rgba(179,136,255,0.15)" stroke="#b388ff" />
    <text x="360" y="55" fill="#b388ff" font-family="monospace" font-size="10" text-anchor="middle">Reverse KL D(Q ‖ P)</text>
    <text x="360" y="75" fill="#00e676" font-family="monospace" font-size="9" text-anchor="middle">Mode-seeking (Locks onto single sharp mode)</text>
  </svg>
  <div class="math-diagram-caption">
    Asymmetry Property: D<sub>K</sub>L(P ‖ Q) ≠ D<sub>K</sub>L(Q ‖ P). Reverse KL is used in VAEs and RLHF policy optimization to avoid generating nonsensical intermediate tokens.
  </div>
</div>

<div class="math-diagram-box">
  <div class="math-diagram-header">
    <span class="math-diagram-title">⚡ DIAGRAM 8.4: JENSEN-SHANNON DIVERGENCE (SYMMETRIC DISTANCE)</span>
    <span class="math-diagram-badge">GAN STABILITY</span>
  </div>
  <svg class="math-svg-canvas" viewBox="0 0 500 130">
    <text x="250" y="45" fill="#00e676" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">JSD(P ‖ Q) = 1/2 D_{KL}(P ‖ M) + 1/2 D_{KL}(Q ‖ M)</text>
    <text x="250" y="75" fill="#94a3b8" font-family="monospace" font-size="10" text-anchor="middle">where M = 1/2 (P + Q). Bounded in [0, 1] with symmetric property JSD(P ‖ Q) = JSD(Q ‖ P).</text>
  </svg>
  <div class="math-diagram-caption">
    Jensen-Shannon Divergence: Symmetrizes KL divergence, providing a true metric distance for Generative Adversarial Networks (GANs).
  </div>
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "MLE and MAP Parameter Estimation Algorithms in Python",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Parameter Estimation & KL Divergence</h3>
<p>Implement <code>gaussian<sub>m</sub>le(samples)</code> which returns the sample mean and variance(\μ_{MLE}, \σ^2_{MLE}).</p>
<p>Also implement <code>discrete_kl_divergence(p, q)</code> returning ∑ pᵢ log₂(pᵢ / qᵢ).</p>
`,
        "starterCode": `import numpy as np

def gaussian_mle(samples: np.ndarray):
    # Compute MLE estimates for mean and variance
    mu = float(np.mean(samples))
    variance = float(np.var(samples)) # MLE uses N in denominator
    return mu, variance

def discrete_kl_divergence(p: np.ndarray, q: np.ndarray) -> float:
    # Compute D_KL(P || Q) in bits (base 2)
    # Avoid log(0) with small epsilon
    eps = 1e-12
    p = np.clip(p, eps, 1.0)
    q = np.clip(q, eps, 1.0)
    return float(np.sum(p * np.log2(p / q)))

# Test verification
data = np.array([10.0, 12.0, 14.0, 12.0, 12.0])
p_dist = np.array([0.5, 0.5])
q_dist = np.array([0.25, 0.75])

mu, var = gaussian_mle(data)
kl = discrete_kl_divergence(p_dist, q_dist)

print(f"MLE Mean: {round(mu, 2)}, Variance: {round(var, 2)}")
print(f"KL Divergence: {round(kl, 4)} bits")
`,
        "expectedOutput": "MLE Mean: 12.0, Variance: 1.6\nKL Divergence: 0.2075 bits",
        "hints": [
          "Use np.mean(samples) and np.var(samples).",
          "For KL divergence, ensure sum(p * np.log2(p / q)) is returned."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the relationship between Cross-Entropy H(P, Q) and KL Divergence D_KL(P || Q)?",
        "options": [
          "H(P, Q) = D_KL(P || Q) - H(P)",
          "H(P, Q) = H(P) + D_KL(P || Q)",
          "H(P, Q) = 1 / D_KL(P || Q)",
          "They are only related if P is a Gaussian distribution."
        ],
        "correctIndex": 1,
        "explanation": "Cross-Entropy equals the entropy of true distribution H(P) plus the relative entropy D_KL(P || Q). Minimizing cross-entropy directly minimizes KL divergence."
      },
      {
        "question": "Why is L1 Lasso regularization considered an instance of Maximum A Posteriori (MAP) estimation?",
        "options": [
          "Because it assumes an uninformative uniform prior.",
          "Because placing an independent zero-mean Laplace prior p(w) ∝ exp(-|w|/b) on weights produces an exact |w| penalty in the log-posterior objective.",
          "Because it maximizes the margin in support vector machines.",
          "Because Laplace distributions have infinite variance."
        ],
        "correctIndex": 1,
        "explanation": "The negative log of the Laplace density is proportional to the absolute value |w|, producing the L1 norm penalty."
      },
      {
        "question": "Why does Reverse KL D_KL(Q || P) exhibit mode-seeking behavior in generative modeling?",
        "options": [
          "Whenever Q(x) > 0 and P(x) ≈ 0, the term Q(x) log(Q(x)/P(x)) explodes to infinity, forcing Q to assign zero probability to any region where P is zero.",
          "Because reverse KL is symmetric.",
          "Because it averages all modes together into a blur.",
          "Because it is computed with base-10 logarithms."
        ],
        "correctIndex": 0,
        "explanation": "To keep D_KL(Q || P) finite, Q(x) must be zero wherever P(x) is zero (zero-forcing property), causing the model to concentrate entirely on a single mode."
      }
    ]
  }
};
