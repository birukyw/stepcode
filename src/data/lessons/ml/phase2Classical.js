// ─── Phase 2: Classical Machine Learning & Feature Engineering ────────────────
// Modules 4–7: Data Wrangling, Supervised Models, Ensembles & Unsupervised Clustering

export const mlPhase2Content = {
  "ml-week-4": {
    "lessons": [
      {
        "title": "Vectorized Data Transformations with NumPy Arrays & Memory Views",
        "language": "python",
        "starterCode": `import numpy as np

# Creating contiguous NumPy arrays
X = np.arange(12, dtype=np.float32).reshape(3, 4)

print("Original Array:")
print(X)
print("Shape:", X.shape, "| Strides:", X.strides)

# Vectorized transformation: Zero-copy in-place operations
X_norm = (X - np.mean(X, axis=0)) / (np.std(X, axis=0) + 1e-7)

print("\\nStandardized Features (Mean 0, Std 1):")
print(np.round(X_norm, 2))
`,
        "content": `
<h2>📊 Lesson 1: Vectorized Data Transformations with NumPy Arrays & Memory Views</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Python loops are notoriously slow for numerical computation. Vectorization exploits SIMD (Single Instruction, Multiple Data) CPU registers to execute operations simultaneously across contiguous memory blocks.</em>
</div>

<p>In standard Python, looping over a list of 1,000,000 floats incurs dynamic type checking, pointer chasing, and reference count overhead on every iteration. NumPy arrays, by contrast, store raw C buffers of contiguous memory with fixed data types (<code>dtype</code>).</p>

<h3>NumPy Views vs Deep Copies</h3>
<p>Understanding memory ownership is critical for production data pipelines:</p>
<ul>
  <li><strong>Memory View:</strong> Slicing an array (e.g. <code>sub = arr[::2]</code>) does <em>not</em> allocate new memory. It creates a lightweight view sharing the original buffer with modified strides. Mutating <code>sub</code> mutates <code>arr</code>!</li>
  <li><strong>Deep Copy:</strong> Operations like <code>arr.copy()</code> allocate a separate buffer. Boolean masking and fancy integer indexing (e.g. <code>arr[arr > 5]</code>) always return copies, not views.</li>
</ul>

<h3>SIMD Vectorization & Universal Functions (ufuncs)</h3>
<p>NumPy's <code>ufuncs</code> (like <code>np.exp</code>, <code>np.sin</code>, <code>np.add</code>) bypass Python's GIL and invoke optimized C/Fortran SIMD vector instructions (AVX-512, NEON), processing 8 to 16 floating-point values per clock cycle.</p>
`
      },
      {
        "title": "High-Performance Tabular Wrangling with Polars and Pandas",
        "language": "python",
        "starterCode": `import numpy as np

# Simulating high-performance columnar transformations
data = {
    'user_id': np.array([101, 102, 103, 104]),
    'age': np.array([25, 42, 31, 55]),
    'income': np.array([55000.0, 110000.0, 72000.0, 140000.0])
}

# Columnar aggregation: Log-transform income and filter
log_income = np.log1p(data['income'])
high_earner_mask = data['age'] > 30

print("Users over 30 Log Income:")
print(log_income[high_earner_mask])
`,
        "content": `
<h2>📊 Lesson 2: High-Performance Tabular Wrangling with Polars and Pandas</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Pandas has historically ruled data science, but modern production ML uses Apache Arrow and Rust-powered engines like Polars for multi-threaded, memory-efficient columnar query optimization.</em>
</div>

<p>Traditional Pandas relies on NumPy 1D arrays under the hood, leading to heavy memory duplication and single-threaded operations. Modern feature engineering pipelines leverage columnar memory layouts (<strong>Apache Arrow</strong>) where columns are stored contiguously in memory, dramatically accelerating aggregations, filters, and SIMD vector scans.</p>

<h3>Lazy Execution & Query Plans in Polars</h3>
<p>Polars introduces lazy execution graphs (<code>pl.scan_parquet()</code>): instead of executing operations eagerly step-by-step, it constructs an Abstract Syntax Tree (AST), applies predicate pushdown (filtering before reading disk), projection pushdown (reading only required columns), and executes in parallel across all CPU cores.</p>
`
      },
      {
        "title": "Handling Missing Data: Imputation Strategies (Mean, KNN, Iterative)",
        "language": "python",
        "starterCode": `import numpy as np

# Feature matrix with Missing Values (NaN)
X = np.array([
    [1.0, 2.0, np.nan],
    [3.0, np.nan, 1.0],
    [5.0, 6.0, 2.0],
    [np.nan, 8.0, 3.0]
])

# Mean Imputation
col_means = np.nanmean(X, axis=0)
inds = np.where(np.isnan(X))
X_imputed = X.copy()
X_imputed[inds] = np.take(col_means, inds[1])

print("Imputed Feature Matrix:")
print(np.round(X_imputed, 2))
`,
        "content": `
<h2>📊 Lesson 3: Handling Missing Data: Imputation Strategies (Mean, KNN, Iterative)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Data missing at random vs missing not at random dictates your survival in production. Blithely filling NaNs with zeros or column means introduces massive bias and degrades decision boundaries.</em>
</div>

<h3>Missing Data Taxonomies</h3>
<ul>
  <li><strong>MCAR (Missing Completely at Random):</strong> Missingness is entirely independent of observed and unobserved data (e.g. random sensor glitch). Listwise deletion or mean imputation does not introduce structural bias.</li>
  <li><strong>MAR (Missing at Random):</strong> Missingness depends on observed features (e.g. younger users less likely to report income, but age is known). Imputation using regression or KNN conditioned on observed features is valid.</li>
  <li><strong>MNAR (Missing Not at Random):</strong> Missingness directly depends on the unobserved value itself (e.g. high-income earners refusing to answer income questions). Requires missingness indicator flags.</li>
</ul>

<h3>Advanced Imputation: KNN and Iterative (MICE)</h3>
<p><strong>KNN Imputation:</strong> Finds the $k$-nearest samples based on non-missing features and takes their distance-weighted average.<br/>
<strong>MICE (Multiple Imputation by Chained Equations / IterativeImputer):</strong> Models each feature with missing values as a function of all other features in a round-robin regression loop.</p>
`
      },
      {
        "title": "Outlier Detection: Z-Score, IQR & Robust Scalers",
        "language": "python",
        "starterCode": `import numpy as np

# Feature with extreme anomaly
vals = np.array([10.0, 12.0, 11.0, 13.0, 12.5, 11.8, 999.0])

# Z-Score detection
mean = np.mean(vals)
std = np.std(vals)
z_scores = np.abs((vals - mean) / std)

# IQR Detection
q25, q75 = np.percentile(vals, [25, 75])
iqr = q75 - q25
lower_bound = q25 - 1.5 * iqr
upper_bound = q75 + 1.5 * iqr

print("Outlier via IQR (> upper bound):", vals[vals > upper_bound])
`,
        "content": `
<h2>📊 Lesson 4: Outlier Detection: Z-Score, IQR & Robust Scalers</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>A single extreme outlier can wildly tilt an Ordinary Least Squares regression plane or explode gradients in neural network training. Learn robust statistical estimators resistant to contamination.</em>
</div>

<h3>Z-Score vs Interquartile Range (IQR)</h3>
<p>The standard Z-score $z = \\frac{x - \\mu}{\\sigma}$ relies on mean $\\mu$ and standard deviation $\\sigma$—both of which are heavily distorted by the very outliers you are trying to detect! (Breakdown point = 0%).</p>
<p><strong>The Interquartile Range (IQR)</strong> uses order statistics (the 25th and 75th percentiles $Q_1, Q_3$):</p>
<pre class=\"ascii-diagram\">
IQR = Q_3 - Q_1
Lower Threshold = Q_1 - 1.5 · IQR
Upper Threshold = Q_3 + 1.5 · IQR
</pre>
<p>Data points outside $[Q_1 - 1.5\\cdot\\text{IQR}, Q_3 + 1.5\\cdot\\text{IQR}]$ are tagged as statistical outliers.</p>
`
      },
      {
        "title": "Categorical Encoding: One-Hot, Ordinal, Target Encoding & High-Cardinality Traps",
        "language": "python",
        "starterCode": `import numpy as np

# Categorical column with 3 levels
categories = ['Red', 'Green', 'Blue', 'Green', 'Red']
unique_cats = sorted(list(set(categories)))

# Manual One-Hot Encoding
one_hot = np.zeros((len(categories), len(unique_cats)), dtype=np.float32)
for i, cat in enumerate(categories):
    one_hot[i, unique_cats.index(cat)] = 1.0

print("Unique Categories:", unique_cats)
print("One-Hot Encoded Matrix:")
print(one_hot)
`,
        "content": `
<h2>📊 Lesson 5: Categorical Encoding: One-Hot, Ordinal, Target Encoding & High-Cardinality Traps</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Categorical variables cannot enter linear algebra matrix operations directly. Choosing the wrong encoding leads to either artificial ordinal ranking or catastrophic dimensionality explosion.</em>
</div>

<h3>Encoding Taxonomy</h3>
<ul>
  <li><strong>One-Hot Encoding:</strong> Creates binary dummy indicator columns for each category. Best for low-cardinality features ($< 50$ distinct categories). In linear models, drop one category to avoid multicollinearity (the dummy variable trap).</li>
  <li><strong>Ordinal Encoding:</strong> Maps ordered labels to integers (e.g. Small: 0, Medium: 1, Large: 2). Never use ordinal encoding on nominal data (e.g. countries) in linear models, as it introduces spurious distance assumptions.</li>
  <li><strong>Target (Mean) Encoding:</strong> Replaces each category with the average target value $y$ for that category. High risk of target leakage! Must use out-of-fold (OOF) smoothing: $\\hat{S}_c = \\frac{n_c \\bar{y}_c + m \\bar{y}_{global}}{n_c + m}$.</li>
</ul>
`
      },
      {
        "title": "Feature Scaling: MinMax, StandardScaler, RobustScaler & Normalizer",
        "language": "python",
        "starterCode": `import numpy as np

data = np.array([[100.0, 0.001], [200.0, 0.002], [150.0, 0.005], [5000.0, 0.003]])

# StandardScaler: zero mean, unit variance
mean = np.mean(data, axis=0)
std = np.std(data, axis=0)
scaled_standard = (data - mean) / std

# MinMaxScaler: bounded in [0, 1]
min_val = np.min(data, axis=0)
max_val = np.max(data, axis=0)
scaled_minmax = (data - min_val) / (max_val - min_val)

print("Standard Scaled (First row):", np.round(scaled_standard[0], 3))
print("MinMax Scaled (First row):", np.round(scaled_minmax[0], 3))
`,
        "content": `
<h2>📊 Lesson 6: Feature Scaling: MinMax, StandardScaler, RobustScaler & Normalizer</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Distance-based models (KNN, SVM) and gradient-based algorithms (Neural Networks, Logistic Regression) fail when features have differing scales. Understand the mathematical guarantees of each scaler.</em>
</div>

<h3>The Four Core Scalers</h3>
<ol>
  <li><strong>StandardScaler:</strong> $z = \\frac{x - \\mu}{\\sigma}$. Centers mean to 0, unit variance 1. Essential for PCA and gradient descent. Sensitive to outliers.</li>
  <li><strong>MinMaxScaler:</strong> $x_{scaled} = \\frac{x - x_{min}}{x_{max} - x_{min}}$. Compresses values into strictly $[0, 1]$. Useful when bounded intervals are required (e.g. image pixel intensities).</li>
  <li><strong>RobustScaler:</strong> $x_{robust} = \\frac{x - \\text{median}}{\\text{IQR}}$. Uses median and interquartile range; immune to outlier skew.</li>
  <li><strong>Normalizer (L2):</strong> Scales each sample vector to unit Euclidean norm $\\|x\\|_2 = 1$. Essential for cosine distance comparisons in text retrieval.</li>
</ol>
`
      },
      {
        "title": "Exploratory Data Analysis (EDA) Best Practices & Correlation Diagnostics",
        "language": "python",
        "starterCode": `import numpy as np

# Simulating 4 features with high collinearity between feature 0 and 1
np.random.seed(42)
f0 = np.random.randn(100)
f1 = f0 * 0.95 + np.random.randn(100) * 0.1 # High collinearity!
f2 = np.random.randn(100)
f3 = np.random.randn(100)

X = np.column_stack([f0, f1, f2, f3])
corr_matrix = np.corrcoef(X, rowvar=False)

print("Correlation Matrix:")
print(np.round(corr_matrix, 2))
print("\\nCollinear Pair (0, 1) Correlation:", round(corr_matrix[0, 1], 3))
`,
        "content": `
<h2>📊 Lesson 7: Exploratory Data Analysis (EDA) Best Practices & Correlation Diagnostics</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Never throw raw data into a neural network or XGBoost without diagnostics. Multicollinearity inflates coefficient variance, and target distribution skew degrades loss convergence.</em>
</div>

<h3>Multicollinearity & Variance Inflation Factor (VIF)</h3>
<p>When two or more predictor features are highly linearly correlated, the matrix $\\mathbf{X}^T\\mathbf{X}$ approaches singularity, causing linear regression coefficients to become wildly unstable. VIF measures this inflation:</p>
<pre class=\"ascii-diagram\">
VIF_j = 1 / (1 - R_j²)
</pre>
<p>A $\\text{VIF} > 5$ or $10$ indicates severe multicollinearity requiring feature removal or PCA projection.</p>
`
      }
    ],
    "exercises": [
      {
        "title": "Production-Grade Preprocessing Pipeline in Scikit-Learn",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an Automated Preprocessing Pipeline</h3>
<p>Implement a function <code>build_standard_preprocessor(numeric_data)</code> that centers data to zero mean and scales to unit variance, while replacing any NaN entries with the column mean.</p>
`,
        "starterCode": `import numpy as np

def preprocess_features(X: np.ndarray) -> np.ndarray:
    # 1. Compute column means ignoring NaNs
    col_means = np.nanmean(X, axis=0)
    # 2. Impute NaNs with column means
    inds = np.where(np.isnan(X))
    X_clean = X.copy()
    X_clean[inds] = np.take(col_means, inds[1])
    # 3. Standardize to zero mean and unit variance
    means = np.mean(X_clean, axis=0)
    stds = np.std(X_clean, axis=0) + 1e-8
    return (X_clean - means) / stds

# Test verification
raw = np.array([
    [10.0, np.nan],
    [20.0, 5.0],
    [30.0, 15.0]
])

processed = preprocess_features(raw)
print("Processed Matrix Shape:", processed.shape)
print("Col 0 Mean (approx 0):", round(float(np.mean(processed[:, 0])), 2))
print("Col 0 Std (approx 1):", round(float(np.std(processed[:, 0])), 2))
`,
        "expectedOutput": "Processed Matrix Shape: (3, 2)\nCol 0 Mean (approx 0): 0.0\nCol 0 Std (approx 1): 1.0",
        "hints": [
          "Use np.nanmean to calculate column means without crashing on NaNs.",
          "Subtract mean and divide by standard deviation."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why is Target (Mean) Encoding dangerous if applied naively without out-of-fold cross-validation?",
        "options": [
          "It converts numbers into categorical strings.",
          "It causes severe target leakage where the model memorizes target values from rare categories, resulting in extreme train overfitting and validation collapse.",
          "It forces all features to sum to zero.",
          "It requires GPU matrix operations."
        ],
        "correctIndex": 1,
        "explanation": "Target encoding directly leaks the ground-truth label y into the feature matrix. Without out-of-fold smoothing or noise addition, the model simply memorizes the target."
      },
      {
        "question": "What is the primary difference between StandardScaler and RobustScaler?",
        "options": [
          "StandardScaler scales values to [0, 1], while RobustScaler does not.",
          "StandardScaler uses mean and standard deviation (which are sensitive to outliers); RobustScaler uses median and interquartile range (IQR), making it resistant to extreme outliers.",
          "RobustScaler only works on GPU.",
          "StandardScaler is non-linear."
        ],
        "correctIndex": 1,
        "explanation": "The median and IQR have high breakdown points, preventing extreme anomalies from skewing the scaling parameters."
      }
    ]
  },

  "ml-week-5": {
    "lessons": [
      {
        "title": "Ordinary Least Squares (OLS) Regression & Closed-Form Normal Equation",
        "language": "python",
        "starterCode": `import numpy as np

# Generating synthetic linear data y = 2x + 1 + noise
np.random.seed(42)
x = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = 2.0 * x + 1.0 + np.random.randn(5) * 0.1

# Design matrix X with intercept bias column
X = np.column_stack([np.ones_like(x), x])

# Closed-form Normal Equation: w = (X^T X)^-1 X^T y
w = np.linalg.inv(X.T @ X) @ X.T @ y

print("Estimated Bias (Intercept):", round(w[0], 3))
print("Estimated Slope (Weight):", round(w[1], 3))
`,
        "content": `
<h2>📈 Lesson 1: Ordinary Least Squares (OLS) Regression & Closed-Form Normal Equation</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Linear regression is the foundational baseline of supervised machine learning. Understand how setting the loss gradient to zero yields the celebrated Normal Equation.</em>
</div>

<p>Given design matrix $\\mathbf{X} \\in \\mathbb{R}^{N \\times D}$ and target vector $\\mathbf{y} \\in \\mathbb{R}^N$, the Residual Sum of Squares (RSS) is:</p>
<pre class=\"ascii-diagram\">
L(w) = ‖y - X w‖² = (y - X w)^T (y - X w)
</pre>
<p>Differentiating with respect to $\\mathbf{w}$ and setting the gradient to zero:</p>
<pre class=\"ascii-diagram\">
∇_w L(w) = - 2 X^T (y - X w) = 0   ⟹   X^T X w = X^T y
w_{OLS} = (X^T X)⁻¹ X^T y   (The Normal Equation)
</pre>
`
      },
      {
        "title": "Regularized Linear Models: L1 Lasso, L2 Ridge & ElasticNet",
        "language": "python",
        "starterCode": `import numpy as np

# Ridge Regression Closed-Form: w = (X^T X + alpha * I)^-1 X^T y
X = np.array([[1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
y = np.array([3.0, 5.0, 7.0])
alpha = 0.5

# Identity matrix (ignoring bias shrinkage in strict implementations)
I = np.eye(X.shape[1])
w_ridge = np.linalg.inv(X.T @ X + alpha * I) @ X.T @ y

print("Ridge Weights:", np.round(w_ridge, 3))
`,
        "content": `
<h2>📈 Lesson 2: Regularized Linear Models: L1 Lasso, L2 Ridge & ElasticNet</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>When features outnumber samples ($D > N$) or collinearity strikes, $X^T X$ is non-invertible. Regularization adds curvature to the loss surface, penalizing parameter magnitude and preventing overfitting.</em>
</div>

<h3>The Regularization Trinity</h3>
<ul>
  <li><strong>Ridge Regression (L2):</strong> $\\mathcal{L} + \\lambda \\|\\mathbf{w}\\|_2^2$. Shrinks weights smoothly toward zero. Solves multicollinearity by ensuring $\\mathbf{X}^T\\mathbf{X} + \\lambda \\mathbf{I}$ is strictly positive definite.</li>
  <li><strong>Lasso Regression (L1):</strong> $\\mathcal{L} + \\lambda \\|\\mathbf{w}\\|_1$. Drives weights to exact zero, performing automatic feature selection. Non-differentiable at zero; solved via sub-gradient descent or Coordinate Descent.</li>
  <li><strong>ElasticNet:</strong> Convex combination of L1 and L2 penalties: $\\lambda_1 \\|\\mathbf{w}\\|_1 + \\lambda_2 \\|\\mathbf{w}\\|_2^2$. Combines feature selection with grouped feature sharing.</li>
</ul>
`
      },
      {
        "title": "Logistic Regression, Odds Ratios, Logits & Sigmoid Decision Boundaries",
        "language": "python",
        "starterCode": `import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

# Linear combination of features
weights = np.array([0.5, 1.2]) # bias, slope
x_sample = np.array([1.0, 2.5]) # [intercept, feature]

logit = np.dot(weights, x_sample)
prob = sigmoid(logit)
odds = prob / (1.0 - prob)

print("Logit (log-odds):", round(logit, 3))
print("Predicted Probability P(y=1):", round(prob, 4))
print("Odds Ratio:", round(odds, 3))
`,
        "content": `
<h2>📈 Lesson 3: Logistic Regression, Odds Ratios, Logits & Sigmoid Decision Boundaries</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Linear regression predicts continuous unconstrained numbers (-∞ to +∞). To classify probabilities bounded strictly in [0, 1], we map logits through the Sigmoid activation function.</em>
</div>

<p>The <strong>Logit</strong> is the natural logarithm of the odds:</p>
<pre class=\"ascii-diagram\">
log [ p / (1 - p) ] = w^T x = z   ⟹   p = σ(z) = 1 / (1 + e^{-z})
</pre>
<p>The decision boundary is the hyperplane where $P(y=1|\\mathbf{x}) = 0.5$, corresponding to $\\mathbf{w}^T \\mathbf{x} = 0$.</p>
`
      },
      {
        "title": "Multi-Class Classification: One-vs-Rest (OvR) vs Multinomial Softmax",
        "language": "python",
        "starterCode": `import numpy as np

def softmax(logits):
    # Numerically stable softmax (subtract max)
    exp_shifted = np.exp(logits - np.max(logits))
    return exp_shifted / np.sum(exp_shifted)

raw_logits = np.array([2.0, 1.0, 0.1])
probabilities = softmax(raw_logits)

print("Class Probabilities:")
for i, p in enumerate(probabilities):
    print(f"Class {i}: {round(p * 100, 2)}%")
`,
        "content": `
<h2>📈 Lesson 4: Multi-Class Classification: One-vs-Rest (OvR) vs Multinomial Softmax</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>When classifying more than two categories (e.g. 1000 ImageNet classes), models either train K separate binary classifiers (One-vs-Rest) or output a unified probability distribution via Softmax.</em>
</div>

<h3>Softmax Normalization</h3>
<p>Given a vector of unnormalized class scores (logits) $\\mathbf{z} \\in \\mathbb{R}^K$:</p>
<pre class=\"ascii-diagram\">
Softmax(z)_k = exp(z_k) / ∑_{j=1}^K exp(z_j)
</pre>
<p><strong>Numerical Stability Trap:</strong> Evaluating $e^{z_k}$ when $z_k = 1000$ triggers overflow (INF). In production, always subtract the maximum logit before exponentiating: $e^{z_k - \\max(\\mathbf{z})}$.</p>
`
      },
      {
        "title": "Support Vector Machines (SVMs): Maximum Margin Separators & Support Vectors",
        "language": "python",
        "starterCode": `import numpy as np

# Geometric Margin intuition
# Points on the margin satisfy: y_i * (w^T x_i + b) = 1
w = np.array([2.0, 0.0]) # Separating plane vertical at x=0
margin = 2.0 / np.linalg.norm(w)

print("Margin Width (2 / ||w||):", margin)
`,
        "content": `
<h2>📈 Lesson 5: Support Vector Machines (SVMs): Maximum Margin Separators & Support Vectors</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Many linear separators can split two classes. SVM finds the unique hyperplane that maximizes the geometric margin between classes, offering strong statistical generalization bounds.</em>
</div>

<p>The distance from the separating hyperplane $\\mathbf{w}^T\\mathbf{x} + b = 0$ to the nearest data point is the margin $\\gamma = \\frac{1}{\\|\\mathbf{w}\\|}$. Maximizing margin is equivalent to minimizing $\\frac{1}{2}\\|\\mathbf{w}\\|^2$ subject to:</p>
<pre class=\"ascii-diagram\">
y_i (w^T x_i + b) ≥ 1,   ∀ i
</pre>
<p>Only the data points lying directly on the margin boundaries—the <strong>Support Vectors</strong>—determine the decision boundary. All other training samples can be deleted without changing the model!</p>
`
      },
      {
        "title": "Non-Linear Boundaries & The Kernel Trick (RBF, Polynomial)",
        "language": "python",
        "starterCode": `import numpy as np

def rbf_kernel(x1, x2, gamma=1.0):
    dist_sq = np.sum((x1 - x2)**2)
    return np.exp(-gamma * dist_sq)

p1 = np.array([0.0, 0.0])
p2 = np.array([1.0, 1.0])

print("RBF Kernel Similarity (Close):", round(rbf_kernel(p1, p1), 3))
print("RBF Kernel Similarity (Distant):", round(rbf_kernel(p1, p2), 4))
`,
        "content": `
<h2>📈 Lesson 6: Non-Linear Boundaries & The Kernel Trick (RBF, Polynomial)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>When data is not linearly separable in the input space, project it into infinite-dimensional Hilbert space. The Kernel Trick computes dot products in high dimensions without ever explicitly calculating the coordinates!</em>
</div>

<h3>The Kernel Trick (Mercer's Theorem)</h3>
<p>A kernel function $K(\\mathbf{x}, \\mathbf{z}) = \\langle \\phi(\\mathbf{x}), \\phi(\\mathbf{z}) \\rangle$ computes the inner product in a high-dimensional feature space directly in input space:</p>
<ul>
  <li><strong>Radial Basis Function (RBF / Gaussian) Kernel:</strong> $K(\\mathbf{x}, \\mathbf{z}) = \\exp(-\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2)$. Corresponds to an <em>infinite-dimensional</em> feature space!</li>
  <li><strong>Polynomial Kernel:</strong> $K(\\mathbf{x}, \\mathbf{z}) = (\\mathbf{x}^T\\mathbf{z} + c)^d$. Computes all feature interaction cross-terms up to degree $d$.</li>
</ul>
`
      },
      {
        "title": "Comprehensive Classification Metrics: Precision, Recall, F1, ROC-AUC & PR-AUC",
        "language": "python",
        "starterCode": `import numpy as np

# Confusion matrix: TP, FP, FN, TN
tp, fp, fn, tn = 80, 20, 10, 890

precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * (precision * recall) / (precision + recall)

print(f"Precision: {round(precision, 3)} (When model flags positive, it is right {round(precision*100)}% of time)")
print(f"Recall: {round(recall, 3)} (Model catches {round(recall*100)}% of all actual positives)")
print(f"F1-Score: {round(f1, 3)}")
`,
        "content": `
<h2>📈 Lesson 7: Comprehensive Classification Metrics: Precision, Recall, F1, ROC-AUC & PR-AUC</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Accuracy is a dangerous metric on imbalanced datasets. If 99% of transactions are legitimate, a model predicting 'legitimate' 100% of the time achieves 99% accuracy while missing every single fraud event.</em>
</div>

<h3>When to Use ROC-AUC vs PR-AUC</h3>
<ul>
  <li><strong>ROC-AUC (Receiver Operating Characteristic):</strong> Plots True Positive Rate vs False Positive Rate across all thresholds. Immune to class balance shifts, but overly optimistic on massive imbalanced negatives.</li>
  <li><strong>PR-AUC (Precision-Recall Curve):</strong> Plots Precision vs Recall. Focuses strictly on the minority positive class. The industry standard metric for fraud detection, rare disease diagnosis, and search ranking.</li>
</ul>
`
      },
      {
        "title": "Regression Metrics & Residual Diagnostics: MSE, RMSE, MAE, R² & Heteroscedasticity",
        "language": "python",
        "starterCode": `import numpy as np

y_true = np.array([10.0, 20.0, 30.0, 40.0])
y_pred = np.array([12.0, 19.0, 28.0, 45.0])

residuals = y_true - y_pred
mse = np.mean(residuals**2)
rmse = np.sqrt(mse)
mae = np.mean(np.abs(residuals))

# R^2 score
ss_tot = np.sum((y_true - np.mean(y_true))**2)
ss_res = np.sum(residuals**2)
r2 = 1.0 - (ss_res / ss_tot)

print(f"MSE: {round(mse, 2)} | RMSE: {round(rmse, 2)} | MAE: {round(mae, 2)}")
print(f"R² Score: {round(r2, 4)}")
`,
        "content": `
<h2>📈 Lesson 8: Regression Metrics & Residual Diagnostics: MSE, RMSE, MAE, R² & Heteroscedasticity</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>A high R² does not guarantee a healthy model. Inspecting the residual plot reveals non-linear patterns, outliers, and heteroscedasticity (variance changing across prediction ranges).</em>
</div>

<h3>Regression Invariants</h3>
<ul>
  <li><strong>MSE vs MAE:</strong> MSE penalizes large errors quadratically (heavy penalty on outliers); MAE penalizes errors linearly (robust to anomalies).</li>
  <li><strong>Heteroscedasticity:</strong> If residual error variance expands as predictions grow (a cone shape on residual plot), the constant variance assumption is violated; apply log transform $\\log(y)$ to stabilize variance.</li>
</ul>
`
      }
    ],
    "exercises": [
      {
        "title": "Linear & Logistic Regression from Scratch with Pure Gradient Descent",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build Gradient Descent Regression from Scratch</h3>
<p>Implement a pure Python/NumPy gradient descent optimizer for binary logistic regression that updates weight vector $\\mathbf{w}$ using Cross-Entropy loss gradients.</p>
`,
        "starterCode": `import numpy as np

def train_logistic_regression(X, y, lr=0.1, epochs=200):
    N, D = X.shape
    w = np.zeros(D)
    for _ in range(epochs):
        # Forward pass: logit and sigmoid
        z = np.dot(X, w)
        p = 1.0 / (1.0 + np.exp(-np.clip(z, -25, 25)))
        # Gradient: dL/dw = (1/N) * X^T (p - y)
        grad = (1.0 / N) * np.dot(X.T, (p - y))
        w -= lr * grad
    return w

# Synthetic test
np.random.seed(42)
X_test = np.array([[1.0, -2.0], [1.0, -1.0], [1.0, 1.0], [1.0, 2.0]]) # bias col + feature
y_test = np.array([0.0, 0.0, 1.0, 1.0])

weights = train_logistic_regression(X_test, y_test, lr=0.5, epochs=300)
preds = (1.0 / (1.0 + np.exp(-X_test @ weights))) >= 0.5

print("Trained Weights:", np.round(weights, 2))
print("All Predictions Match Labels:", np.array_equal(preds, y_test))
`,
        "expectedOutput": "All Predictions Match Labels: True",
        "hints": [
          "The gradient of BCE loss with respect to weights is (1/N) * X^T * (p - y).",
          "Ensure z is clipped to prevent exp() overflow."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the primary motivation for using PR-AUC over ROC-AUC in severely imbalanced fraud detection tasks?",
        "options": [
          "PR-AUC is faster to compute on GPUs.",
          "ROC-AUC can present an overly optimistic score because the huge number of True Negatives suppresses the False Positive Rate (FPR = FP / (FP + TN)). PR-AUC evaluates precision and recall strictly on the rare positive class.",
          "PR-AUC only applies to regression problems.",
          "ROC-AUC requires the Normal equation."
        ],
        "correctIndex": 1,
        "explanation": "When the negative class is massive (e.g. 99.9% non-fraud), TN is huge, keeping FPR near 0 even when FP is high. PR-AUC directly exposes false positives through Precision."
      },
      {
        "question": "What is the Kernel Trick in Support Vector Machines?",
        "options": [
          "Running the SVM inside the Linux operating system kernel for speed.",
          "Computing dot products in high-dimensional feature spaces using a kernel function K(x, z) directly in low-dimensional input coordinates without explicitly projecting the features.",
          "Using decision trees as kernels.",
          "Pruning support vectors."
        ],
        "correctIndex": 1,
        "explanation": "The Kernel Trick calculates ⟨ϕ(x), ϕ(z)⟩ without evaluating ϕ(x), enabling infinite-dimensional separation (RBF kernel) at low computational cost."
      }
    ]
  },

  "ml-week-6": {
    "lessons": [
      {
        "title": "Decision Trees: Recursive Binary Splitting & Axis-Aligned Boundaries",
        "language": "python",
        "starterCode": `import numpy as np

# A Decision Tree decision boundary is axis-aligned:
# e.g., if feature_0 > 2.5 and feature_1 <= 1.0 -> Class A
sample = np.array([3.0, 0.5])
prediction = "Class A" if (sample[0] > 2.5 and sample[1] <= 1.0) else "Class B"

print("Sample:", sample, "| Predicted:", prediction)
`,
        "content": `
<h2>🌲 Lesson 1: Decision Trees: Recursive Binary Splitting & Axis-Aligned Boundaries</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Decision trees make no linearity assumptions. They recursively partition the feature space into hyper-rectangles using greedy axis-aligned orthogonal splits.</em>
</div>

<p>Unlike linear models that construct hyperplanes $\\mathbf{w}^T\\mathbf{x} + b = 0$, decision trees split feature space along individual orthogonal coordinate axes (e.g. $x_j \\le t$). This makes them naturally invariant to monotonic feature scaling (StandardScaler is not required for tree models!).</p>
`
      },
      {
        "title": "Split Criteria: Gini Impurity, Information Gain & Shannon Entropy",
        "language": "python",
        "starterCode": `import numpy as np

def gini_impurity(labels):
    _, counts = np.unique(labels, return_counts=True)
    probs = counts / len(labels)
    return 1.0 - np.sum(probs**2)

def entropy(labels):
    _, counts = np.unique(labels, return_counts=True)
    probs = counts / len(labels)
    return -np.sum(probs * np.log2(probs + 1e-12))

pure = np.array([1, 1, 1, 1])
split = np.array([1, 1, 0, 0])

print("Pure Gini (0.0):", gini_impurity(pure), "| Entropy:", entropy(pure))
print("Split Gini (0.5):", gini_impurity(split), "| Entropy (1.0 bit):", round(entropy(split), 2))
`,
        "content": `
<h2>🌲 Lesson 2: Split Criteria: Gini Impurity, Information Gain & Shannon Entropy</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>At each node, the tree evaluates every possible feature and threshold, selecting the split that maximizes the reduction in impurity (Information Gain).</em>
</div>

<h3>Split Metrics</h3>
<ul>
  <li><strong>Gini Impurity:</strong> $I_G(p) = 1 - \\sum_{k=1}^K p_k^2$. Measures the probability that a randomly chosen element is incorrectly classified if labeled randomly according to the class distribution. Computationally faster (no logarithms).</li>
  <li><strong>Shannon Entropy:</strong> $H(p) = - \\sum_{k=1}^K p_k \\log_2 p_k$. Measures expected bits of uncertainty. Information Gain = $H(\\text{parent}) - \\sum \\frac{N_j}{N} H(\\text{child}_j)$.</li>
</ul>
`
      },
      {
        "title": "Pruning, Overfitting Controls & Tree Regularization Parameters",
        "language": "python",
        "starterCode": `import numpy as np

# Key Tree Regularization Hyperparameters:
params = {
    'max_depth': 6,            # Prevents trees from growing to depth 50+
    'min_samples_split': 10,   # Minimum samples required to split a node
    'min_samples_leaf': 5,     # Minimum samples in leaf node
    'max_features': 'sqrt',    # Subsamples features per split
    'ccp_alpha': 0.01          # Cost-Complexity Pruning penalty
}

print("Production Regularization Hyperparameters Configured.")
`,
        "content": `
<h2>🌲 Lesson 3: Pruning, Overfitting Controls & Tree Regularization Parameters</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>An unconstrained decision tree will grow until every single training leaf contains exactly 1 sample—achieving 100% training accuracy while memorizing noise. Regularization is mandatory.</em>
</div>

<h3>Cost-Complexity Pruning (ccp_alpha)</h3>
<p>Minimal cost-complexity pruning defines a cost function indexed by parameter $\\alpha \\ge 0$:</p>
<pre class=\"ascii-diagram\">
R_α(T) = R(T) + α |T|
</pre>
<p>Where $R(T)$ is the total leaf misclassification rate and $|T|$ is the number of terminal leaves. Increasing $\\alpha$ collapses weak branches into single leaves.</p>
`
      },
      {
        "title": "Ensemble Theory: The Bias-Variance Decomposition, Bagging vs Boosting",
        "language": "python",
        "starterCode": `import numpy as np

# Bagging reduces variance:
# The variance of the average of N independent estimators is Var / N
var_single = 10.0
for n_estimators in [1, 5, 25, 100]:
    var_ensemble = var_single / n_estimators
    print(f"Estimators: {n_estimators:3d} -> Ensemble Variance: {var_ensemble:.3f}")
`,
        "content": `
<h2>🌲 Lesson 4: Ensemble Theory: The Bias-Variance Decomposition, Bagging vs Boosting</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>The fundamental trade-off: High-variance models (deep trees) can be averaged to kill variance (Bagging); high-bias models (shallow stumps) can be chained sequentially to kill bias (Boosting).</em>
</div>

<h3>The Two Pillars of Ensembling</h3>
<ul>
  <li><strong>Bagging (Bootstrap Aggregation):</strong> Trains hundreds of high-variance, deep estimators in parallel on randomized bootstrap samples. Averaging predictions reduces variance without increasing bias (Random Forest).</li>
  <li><strong>Boosting:</strong> Trains weak learners (shallow trees) sequentially. Each subsequent learner fits the residual error of the previous ensemble, systematically driving bias to zero (GBDT, XGBoost).</li>
</ul>
`
      },
      {
        "title": "Random Forests: Bootstrap Aggregation, Out-of-Bag (OOB) Error & Feature Importance",
        "language": "python",
        "starterCode": `import numpy as np

# Theoretical OOB Probability:
# Probability a sample is NEVER picked in N bootstrap draws of size N:
# lim_{N -> inf} (1 - 1/N)^N = 1/e ≈ 36.8%
N = 10000
p_never_picked = (1.0 - 1.0 / N)**N

print(f"Theoretical Out-Of-Bag (OOB) Ratio: {round(p_never_picked * 100, 2)}%")
print("~36.8% of training data acts as a free built-in validation test set for every tree!")
`,
        "content": `
<h2>🌲 Lesson 5: Random Forests: Bootstrap Aggregation, Out-of-Bag (OOB) Error & Feature Importance</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Random Forests decorrelate trees by injecting double randomness: random data rows (bootstrap sampling) and random feature subsets at every split.</em>
</div>

<h3>Out-of-Bag (OOB) Validation</h3>
<p>In a bootstrap sample drawn with replacement, the probability of an observation being selected is $1 - (1 - 1/N)^N \\approx 1 - 1/e \\approx 63.2\\%$. The remaining **36.8%** of samples are never seen by that tree, serving as a free, unbiased cross-validation score without needing a separate validation split!</p>
`
      },
      {
        "title": "Gradient Boosted Decision Trees (GBDT): AdaBoost & Sequential Residuals",
        "language": "python",
        "starterCode": `import numpy as np

# GBDT sequential residual fitting intuition
y_true = np.array([10.0, 20.0, 30.0])

# Step 0: Baseline constant prediction (mean)
f0 = np.mean(y_true)
residuals_0 = y_true - f0

print("Initial Constant Prediction:", f0)
print("Residuals for Tree 1 to Fit:", residuals_0)
`,
        "content": `
<h2>🌲 Lesson 6: Gradient Boosted Decision Trees (GBDT): AdaBoost & Sequential Residuals</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Gradient boosting is gradient descent in function space. Rather than adjusting weights θ, each new tree h_m(x) fits the negative gradient (residuals) of the loss function.</em>
</div>

<p>Given model $F_{m-1}(\\mathbf{x})$, compute pseudo-residuals:</p>
<pre class=\"ascii-diagram\">
r_{i, m} = - [ ∂ L(y_i, F(x_i)) / ∂ F(x_i) ]_{F = F_{m-1}}
Fit tree h_m(x) to predict r_{i, m}
F_m(x) = F_{m-1}(x) + η · h_m(x)   (where η is the learning rate / shrinkage)
</pre>
`
      },
      {
        "title": "Industrial Gradient Boosters: XGBoost (Histogram Bucketing & Second-Order Approximations)",
        "language": "python",
        "starterCode": `import numpy as np

# XGBoost Second-Order Taylor Expansion of Loss:
# L(y, F + f) ≈ L(y, F) + g_i * f_i + 1/2 * h_i * f_i^2
# where g_i = ∂L/∂F (gradient) and h_i = ∂²L/∂F² (hessian)
print("XGBoost uses both first-order gradients (g_i) and second-order Hessians (h_i)!")
`,
        "content": `
<h2>🌲 Lesson 7: Industrial Gradient Boosters: XGBoost (Histogram Bucketing & Second-Order Approximations)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>XGBoost (Tianqi Chen, 2016) revolutionized competitive machine learning by combining exact second-order Taylor expansions with hardware cache-aware histogram building.</em>
</div>

<h3>The XGBoost Scoring Function</h3>
<p>The optimal leaf weight $w_j^*$ and split score gain are evaluated analytically using first-order $g_i$ and second-order $h_i$ derivatives:</p>
<pre class=\"ascii-diagram\">
w_j^* = - [ ∑_{i ∈ I_j} g_i ] / [ ∑_{i ∈ I_j} h_i + λ ]
Gain = 1/2 [ (G_L² / (H_L + λ)) + (G_R² / (H_R + λ)) - (G^2 / (H + λ)) ] - γ
</pre>
<p>Where $\\lambda$ is the L2 leaf penalty and $\\gamma$ is the minimum gain required to make a split.</p>
`
      },
      {
        "title": "LightGBM (GOSS & EFB) and CatBoost (Ordered Boosting for Categoricals)",
        "language": "python",
        "starterCode": `import numpy as np

# Key performance mechanisms
print("LightGBM Innovations:")
print("1. GOSS (Gradient-based One-Side Sampling): Keeps samples with large gradients, randomly samples small gradients.")
print("2. EFB (Exclusive Feature Bundling): Bundles mutually exclusive sparse features.")
print("\\nCatBoost Innovation:")
print("1. Ordered Boosting: Eliminates target leakage in categorical target encoding.")
`,
        "content": `
<h2>🌲 Lesson 8: LightGBM (GOSS & EFB) and CatBoost (Ordered Boosting for Categoricals)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>When datasets reach tens of millions of rows, LightGBM trains up to 15x faster than standard XGBoost, while CatBoost handles raw categorical features without manual preprocessing.</em>
</div>

<h3>LightGBM: Leaf-wise vs Level-wise Growth</h3>
<p>Most tree libraries grow trees level-by-level (depth-wise). LightGBM grows trees **leaf-wise** (best-first), splitting the single leaf that produces the greatest loss reduction. This achieves lower loss with fewer splits, guarded by <code>max_depth</code> to prevent overfitting.</p>
`
      }
    ],
    "exercises": [
      {
        "title": "Optuna Hyperparameter Optimization for Gradient Boosters",
        "language": "python",
        "description": `
<h3>⚔️ CAPSTONE EXERCISE: Automated Hyperparameter Tuning with Optuna</h3>
<p>Define an objective function that evaluates max depth and learning rate parameters, finding the configuration that minimizes cross-entropy validation loss.</p>
`,
        "starterCode": `import numpy as np

def simulate_tree_loss(depth, learning_rate):
    # Simulated validation loss function with a global minimum around depth=6, lr=0.05
    return float((depth - 6.0)**2 * 0.05 + (np.log10(learning_rate) - np.log10(0.05))**2 + 0.35)

best_loss = float('inf')
best_params = {}

# Grid / Bayesian scan
for depth in [4, 6, 8]:
    for lr in [0.01, 0.05, 0.1]:
        loss = simulate_tree_loss(depth, lr)
        if loss < best_loss:
            best_loss = loss
            best_params = {'max_depth': depth, 'learning_rate': lr}

print(f"Optimal Depth: {best_params['max_depth']}")
print(f"Optimal Learning Rate: {best_params['learning_rate']}")
print(f"Minimum Validation Loss: {round(best_loss, 3)}")
`,
        "expectedOutput": "Optimal Depth: 6\nOptimal Learning Rate: 0.05\nMinimum Validation Loss: 0.35",
        "hints": [
          "Scan parameters to find the point where validation loss is minimized."
        ]
      }
    ],
    "project": {
      "title": "End-to-End Customer Churn Prediction Engine with Optuna",
      "requirements": [
        "Feature engineering pipeline handling categorical and continuous variables",
        "Stratified K-Fold cross validation split preventing target leakage",
        "XGBoost or LightGBM model configuration with Early Stopping",
        "Optuna bayesian optimization trial loop tuning tree depth and learning rate",
        "Evaluation using Precision-Recall AUC (PR-AUC) and confusion matrix diagnostics"
      ],
      "description": `
<p>Build a production customer churn prediction engine using industrial gradient boosting. Implement cross-validation, handle class imbalance, optimize hyperparameters with Optuna, and log precision/recall metrics.</p>
`
    },
    "quiz": [
      {
        "question": "Why does Random Forest reduce model variance without increasing model bias?",
        "options": [
          "Because it uses linear regression at each leaf.",
          "Because averaging N independent, identically distributed estimators with variance σ² yields an ensemble variance of σ² / N, while the expected value (bias) remains unchanged.",
          "Because it eliminates all correlation between features.",
          "Because it runs on multiple CPU cores."
        ],
        "correctIndex": 1,
        "explanation": "Bagging works by the law of large numbers: averaging uncorrelated estimators divides variance by N while preserving the underlying estimator's low bias."
      },
      {
        "question": "What is the primary advantage of LightGBM's leaf-wise (best-first) tree growth over traditional level-wise tree growth?",
        "options": [
          "It guarantees the tree will be symmetric.",
          "It chooses to split the single leaf that provides the largest reduction in loss, achieving lower loss with fewer total splits.",
          "It eliminates the need for gradient calculations.",
          "It works without target labels."
        ],
        "correctIndex": 1,
        "explanation": "Leaf-wise growth prioritizes the highest loss reduction leaf anywhere in the tree, leading to higher accuracy and efficiency."
      }
    ]
  },

  "ml-week-7": {
    "lessons": [
      {
        "title": "Clustering Foundations & K-Means Optimization Objective (Lloyd's Algorithm)",
        "language": "python",
        "starterCode": `import numpy as np

# K-Means Objective: Inertia (Within-Cluster Sum of Squares WCSS)
# J = ∑_{k=1}^K ∑_{i ∈ C_k} || x_i - μ_k ||²
points = np.array([[1.0, 2.0], [1.5, 1.8], [5.0, 8.0], [6.0, 9.0]])
centroid_1 = np.array([1.25, 1.9])
centroid_2 = np.array([5.5, 8.5])

# Distance computation
d1 = np.sum((points[:2] - centroid_1)**2)
d2 = np.sum((points[2:] - centroid_2)**2)
total_inertia = d1 + d2

print("Within-Cluster Sum of Squares (Inertia):", round(total_inertia, 3))
`,
        "content": `
<h2>🔍 Lesson 1: Clustering Foundations & K-Means Optimization Objective (Lloyd's Algorithm)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Unsupervised learning operates without labels. K-Means partitions N observations into K clusters such that each point belongs to the cluster with the nearest mean (centroid).</em>
</div>

<p>K-Means seeks centroids $\\mu_1, \\dots, \\mu_K$ minimizing **Inertia** (Within-Cluster Sum of Squares):</p>
<pre class=\"ascii-diagram\">
J = ∑_{k=1}^K ∑_{x_i ∈ C_k} ‖x_i - μ_k‖²
</pre>
<h3>Lloyd's Two-Step Alternating Minimization</h3>
<ol>
  <li><strong>Assignment Step:</strong> Assign each data point $\\mathbf{x}_i$ to the closest centroid: $c_i = \\text{argmin}_k \\|\\mathbf{x}_i - \\mu_k\\|^2$.</li>
  <li><strong>Update Step:</strong> Recompute each centroid as the center of mass of its assigned points: $\\mu_k = \\frac{1}{|C_k|} \\sum_{i \\in C_k} \\mathbf{x}_i$.</li>
</ol>
`
      },
      {
        "title": "K-Means++ Initialization, Elbow Method & Inertia Plateaus",
        "language": "python",
        "starterCode": `import numpy as np

# K-Means++ picks first centroid at random, then subsequent centroids
# with probability proportional to squared distance D(x)^2 from nearest centroid!
print("K-Means++ Initialization: P(x is chosen) ∝ D(x)²")
print("Guarantees an expected O(log K) approximation to the optimal clustering!")
`,
        "content": `
<h2>🔍 Lesson 2: K-Means++ Initialization, Elbow Method & Inertia Plateaus</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Randomly initializing K-Means centroids often causes the algorithm to get trapped in disastrous local minima. K-Means++ spaces initial centroids far apart, guaranteeing an $O(\\log K)$ approximation bound.</em>
</div>

<h3>The Elbow Method for Optimal K</h3>
<p>As $K$ increases, inertia monotonically decreases (reaching 0 when $K = N$). The **Elbow Method** plots inertia against $K$; the point of diminishing returns—where the curve bends sharply like an elbow—indicates the natural cluster count.</p>
`
      },
      {
        "title": "Density-Based Spatial Clustering (DBSCAN) & Core/Border/Noise Identification",
        "language": "python",
        "starterCode": `import numpy as np

# DBSCAN classifies points into:
# Core point: >= MinPts within radius ε
# Border point: < MinPts within ε, but within ε of a Core point
# Noise point: neither
print("DBSCAN parameters: eps (ε radius) and min_samples")
print("Key power: Finds arbitrary non-spherical shapes (rings, crescents) & isolates noise!")
`,
        "content": `
<h2>🔍 Lesson 3: Density-Based Spatial Clustering (DBSCAN) & Core/Border/Noise Identification</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>K-Means assumes clusters are spherical and equal-sized. DBSCAN groups points based on spatial density, discovering arbitrary non-linear shapes (concentric rings) and automatically tagging outliers as noise (-1).</em>
</div>

<h3>DBSCAN Mechanics</h3>
<ul>
  <li><strong>Core Points:</strong> Samples with at least <code>min_samples</code> within neighborhood radius $\\epsilon$.</li>
  <li><strong>Border Points:</strong> Samples within $\\epsilon$ of a Core point, but containing fewer than <code>min_samples</code> themselves.</li>
  <li><strong>Noise Points:</strong> Any sample that is neither Core nor Border. Ignored in cluster assignment.</li>
</ul>
`
      },
      {
        "title": "Hierarchical Agglomerative Clustering, Linkage Criteria & Dendrograms",
        "language": "python",
        "starterCode": `import numpy as np

# Hierarchical clustering starts with N individual clusters
# and iteratively merges the closest pair according to linkage criteria.
print("Linkage Criteria:")
print("1. Ward: Minimizes variance growth of merged clusters.")
print("2. Complete: Maximum pairwise distance between points in clusters.")
print("3. Single: Minimum pairwise distance (prone to chaining).")
print("4. Average: Mean pairwise distance.")
`,
        "content": `
<h2>🔍 Lesson 4: Hierarchical Agglomerative Clustering, Linkage Criteria & Dendrograms</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Hierarchical clustering constructs a multi-scale tree of nested clusters (a Dendrogram). You don't need to specify K in advance; simply cut the tree at the desired resolution height.</em>
</div>

<h3>Linkage Strategies</h3>
<p>The choice of linkage distance $D(A, B)$ governs cluster morphology:</p>
<ul>
  <li><strong>Ward's Linkage:</strong> Merges clusters that minimize the increase in total within-cluster variance. Produces clean, compact clusters.</li>
  <li><strong>Single Linkage:</strong> $\\min_{a \\in A, b \\in B} d(a, b)$. Vulnerable to "chaining" where thin strings of noise bridge disparate clusters.</li>
  <li><strong>Complete Linkage:</strong> $\\max_{a \\in A, b \\in B} d(a, b)$. Enforces tight diameter bounds.</li>
</ul>
`
      },
      {
        "title": "Cluster Validation Metrics: Silhouette Coefficient, Davies-Bouldin & Calinski-Harabasz",
        "language": "python",
        "starterCode": `import numpy as np

# Silhouette formula for sample i:
# s(i) = (b(i) - a(i)) / max(a(i), b(i))
# where a(i) is mean intra-cluster distance, b(i) is mean nearest-cluster distance
a_i = 0.2 # tight cluster
b_i = 1.0 # far from neighbor
s_i = (b_i - a_i) / max(a_i, b_i)

print(f"Silhouette Coefficient for Sample: {round(s_i, 3)} (High quality cluster!)")
`,
        "content": `
<h2>🔍 Lesson 5: Cluster Validation Metrics: Silhouette Coefficient, Davies-Bouldin & Calinski-Harabasz</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Without ground-truth labels, how do you evaluate clustering quality? Intrinsic validation metrics evaluate compactness (samples close to their cluster center) versus separation (clusters far apart from each other).</em>
</div>

<h3>The Silhouette Score: $s \\in [-1, +1]$</h3>
<p>For each sample $i$, let $a(i)$ be the mean distance to all other points in the same cluster, and $b(i)$ be the mean distance to points in the nearest neighbor cluster:</p>
<pre class=\"ascii-diagram\">
s(i) = [ b(i) - a(i) ] / max( a(i), b(i) )
</pre>
<ul>
  <li><strong>$s \\approx +1$:</strong> Sample is far from neighboring clusters and tightly bound to its own.</li>
  <li><strong>$s \\approx 0$:</strong> Sample lies directly on the boundary between two clusters.</li>
  <li><strong>$s < 0$:</strong> Sample was likely assigned to the wrong cluster.</li>
</ul>
`
      },
      {
        "title": "Non-Linear Visual Embeddings: t-SNE (Perplexity & Student-t)",
        "language": "python",
        "starterCode": `import numpy as np

# t-SNE uses Student-t distribution in low-dimensional space:
# q_ij = (1 + ||y_i - y_j||^2)^-1 / ∑_k∑_l (1 + ||y_k - y_l||^2)^-1
# Heavy tails solve the 'Crowding Problem'!
print("t-SNE: Minimizes KL divergence D_KL(P || Q) between high-D and low-D probabilities.")
`,
        "content": `
<h2>🔍 Lesson 6: Non-Linear Visual Embeddings: t-SNE (Perplexity & Student-t)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>PCA can only perform linear rotations and projections. t-SNE (t-Distributed Stochastic Neighbor Embedding) captures complex manifold topology by matching pairwise Gaussian probabilities in high dimensions with heavy-tailed Student-t probabilities in 2D.</em>
</div>

<h3>The Crowding Problem & Student-t Solution</h3>
<p>In high dimensions, the volume of a sphere expands exponentially, leaving vast room for moderately distant points. When projected into 2D, all these points crowd together into the center. By using a heavy-tailed Cauchy/Student-t distribution ($1 / (1 + d^2)$) in 2D, moderate distances in high dimensions are pushed outward, creating distinct separated visual islands.</p>
`
      },
      {
        "title": "UMAP (Uniform Manifold Approximation and Projection) & Topological Data Analysis",
        "language": "python",
        "starterCode": `import numpy as np

# UMAP preserves both local AND global structure better than t-SNE
print("UMAP advantages over t-SNE:")
print("1. Significantly faster runtime (O(N^1.14) vs O(N^2)).")
print("2. Preserves global topology (macro cluster relationships).")
print("3. Supports projecting new unseen test samples into existing embeddings.")
`,
        "content": `
<h2>🔍 Lesson 7: UMAP & Topological Data Analysis</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Built on Riemannian geometry and algebraic topology, UMAP models data as a fuzzy simplicial complex. It is dramatically faster than t-SNE and preserves global manifold structure.</em>
</div>

<h3>UMAP vs t-SNE in Production</h3>
<p>While t-SNE is strictly a visualization tool (you cannot project new inference samples into an existing t-SNE space), UMAP learns a generalizable parametric embedding. You can fit UMAP on training documents, and at runtime project new user queries into the exact same latent coordinates!</p>
`
      },
      {
        "title": "Anomaly Detection: Isolation Forests & Local Outlier Factor (LOF)",
        "language": "python",
        "starterCode": `import numpy as np

# Isolation Forest concept:
# Anomalies are few and different -> They are isolated in very few random splits!
tree_depths_normal = [12, 14, 11, 15] # Normal points take deep splits to isolate
tree_depths_anomaly = [2, 3, 2, 4]     # Anomalies isolated almost immediately!

print("Mean Path Length Normal:", np.mean(tree_depths_normal))
print("Mean Path Length Anomaly:", np.mean(tree_depths_anomaly))
`,
        "content": `
<h2>🔍 Lesson 8: Anomaly Detection: Isolation Forests & Local Outlier Factor (LOF)</h2>

<div class=\"callout callout--quest\">
  <strong>🧠 AI ARCHITECT CODEX:</strong> <em>Instead of modeling what normal data looks like and flagging deviations, Isolation Forests exploit the core nature of anomalies: they are 'few and different' and thus require far fewer random splits to isolate.</em>
</div>

<h3>Isolation Forest Path Lengths</h3>
<p>An Isolation Tree randomly selects a feature and a random split value between that feature's min and max. Because anomalies sit in low-density sparse regions, random cuts isolate them near the root of the tree. The anomaly score is a function of the average path length $h(x)$ across all random trees:</p>
<pre class=\"ascii-diagram\">
Score(x) = 2^{ - E[h(x)] / c(n) }
</pre>
<p>If Score approaches 1.0, the point is an anomaly; scores well below 0.5 indicate normal clustered instances.</p>
`
      }
    ],
    "exercises": [
      {
        "title": "Customer Segmentation Pipeline with Automated Cluster Evaluation",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an Automated Customer Segmentation Evaluator</h3>
<p>Implement <code>evaluate_k_clusters(X, k_values)</code> that fits K-Means across multiple $K$ candidates and returns the best $K$ that maximizes the mean Silhouette score.</p>
`,
        "starterCode": `import numpy as np

def compute_mock_silhouette(X, k):
    # Simulated silhouette score peak at K=3
    return float(0.75 - abs(k - 3) * 0.18)

def find_best_k(X, k_range=[2, 3, 4, 5]):
    best_k = k_range[0]
    best_score = -1.0
    for k in k_range:
        score = compute_mock_silhouette(X, k)
        if score > best_score:
            best_score = score
            best_k = k
    return best_k, best_score

# Test evaluation
mock_data = np.random.randn(100, 4)
optimal_k, top_score = find_best_k(mock_data)

print(f"Optimal Cluster Count K: {optimal_k}")
print(f"Peak Silhouette Score: {round(top_score, 2)}")
`,
        "expectedOutput": "Optimal Cluster Count K: 3\nPeak Silhouette Score: 0.75",
        "hints": [
          "Loop over k_range and keep track of the maximum score."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why does DBSCAN not require you to specify the number of clusters K in advance?",
        "options": [
          "Because it uses gradient descent to learn K.",
          "Because it connects points based on continuous density (points within radius ε having min_samples neighbors), naturally discovering however many disconnected dense regions exist in the dataset.",
          "Because it is a supervised algorithm.",
          "Because it uses the Normal equation."
        ],
        "correctIndex": 1,
        "explanation": "DBSCAN relies on spatial density parameters (ε, min_samples) to trace arbitrary dense components, discovering the cluster count organically."
      },
      {
        "question": "How does an Isolation Forest identify anomalous data points?",
        "options": [
          "By calculating the distance to the nearest K-Means centroid.",
          "By measuring the average path length across random binary trees; anomalies are isolated in very few random splits, resulting in significantly shorter path lengths.",
          "By evaluating the Hessian matrix determinant.",
          "By training an autoencoder neural network."
        ],
        "correctIndex": 1,
        "explanation": "Anomalies reside in sparse regions and are isolated near the root of random partition trees, producing abnormally short path lengths."
      }
    ]
  }
};
