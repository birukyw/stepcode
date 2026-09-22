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

print("nStandardized Features (Mean 0, Std 1):")
print(np.round(X_norm, 2))
`,
        "content": `
<h2>📊 Lesson 1: Vectorized Data Transformations with NumPy Arrays & Memory Views</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Python loops are notoriously slow for numerical computation. Vectorization exploits SIMD (Single Instruction, Multiple Data) CPU registers to execute operations simultaneously across contiguous memory blocks.
</div>

<h3>🐢 The Problem with Pure Python Loops</h3>
<p>Imagine a factory assembly line where every worker has to inspect an item, ask what it is, check its barcode, and write down a receipt before passing it along. That's a standard Python <code>for</code> loop! For every single number in a list of 1,000,000 numbers, Python checks its type, looks up its memory pointer, and updates reference counts.</p>
<p>NumPy flips the script. Instead of loose, scattered items, NumPy packs raw numbers into <strong>one solid, continuous block of computer memory</strong> (a contiguous C buffer). When you add two NumPy arrays, the CPU uses <strong>SIMD (Single Instruction, Multiple Data)</strong> registers to crunch 8 or 16 numbers in a single clock cycle!</p>
<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The Beginner's Trap: Mutating a "View" by Accident</strong><br />
  When you slice a NumPy array like <code>sub = arr[0:5]</code>, NumPy <em>does not make a copy</em>! It gives you a "view"—a window looking at the exact same physical memory. If you change <code>sub[0] = 999</code>, your original <code>arr</code> is mutated too! If you want an independent copy, always explicitly call <code>arr[0:5].copy()</code>.
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
        "content": `<h2>📊 Lesson 2: High-Performance Tabular Wrangling with Polars and Pandas</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  For over a decade, Pandas was the undisputed king of data science in Python. But as datasets grew from megabytes into gigabytes, Pandas hit a wall: it is single-threaded, eager-by-default, and clones memory aggressively. Modern production machine learning leverages <strong>Polars</strong>—a lightning-fast DataFrame library written in Rust on top of Apache Arrow that executes queries in parallel across all your CPU cores!
</div>

<h3>🎯 Eager vs Lazy Execution: Why Waiting is Smarter</h3>
<p>Imagine going grocery shopping with a piece of paper. With <strong>eager execution</strong> (standard Pandas), every time you read an item on your list, you walk to the shelf, grab one item, walk to the cash register, pay for it, and then go back into the store for the second item. That sounds absurd, right?</p>
<p>Yet that is exactly what Pandas does! When you chain operations like <code>df.filter(...).groupby(...).select(...)</code>, Pandas creates an entire intermediate DataFrame in RAM at every single step.</p>
<p><strong>Lazy execution</strong> (Polars) works like a smart shopper: it reads your entire grocery list, reorganizes the items by store aisle, eliminates duplicate trips, and grabs everything in one single optimized pass through the store!</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Real-World Analogy: The Query Optimizer</strong><br />
  If you have a 10 GB dataset with 50 columns, but your final query only needs 2 columns and filters for rows where <code>age &gt; 30</code>:
  <ul>
    <li><strong>Pandas:</strong> Loads all 10 GB into RAM, filters all rows, and then drops 48 columns (often causing an Out-Of-Memory crash).</li>
    <li><strong>Polars LazyFrame:</strong> Uses <em>Predicate Pushdown</em> and <em>Projection Pushdown</em> to read <strong>only the 2 necessary columns</strong> from disk directly, using less than 400 MB of RAM!</li>
  </ul>
</div>

<h3>⚙️ Key Differences at a Glance</h3>
<table class="comparison-table">
  <thead>
    <tr><th>Feature</th><th>Pandas (Classic)</th><th>Polars (Modern)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Underlying Engine</strong></td><td>C / NumPy arrays</td><td>Rust + Apache Arrow Columnar Format</td></tr>
    <tr><td><strong>Execution Model</strong></td><td>Eager only</td><td>Lazy evaluation with query graph optimization</td></tr>
    <tr><td><strong>Parallelism</strong></td><td>Single-threaded (GIL bound)</td><td>Multi-threaded (saturates all CPU cores)</td></tr>
    <tr><td><strong>Memory Efficiency</strong></td><td>Frequent memory copies</td><td>Zero-copy memory sharing and string caches</td></tr>
  </tbody>
</table>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Teacher's Golden Rule:</strong><br />
  Always use <code>scan_parquet()</code> or <code>scan_csv()</code> in Polars instead of <code>read_csv()</code>. That gives you a <code>LazyFrame</code> where you can define your filtering and feature extraction pipeline, and call <code>.collect()</code> only at the very end when you are ready to train your model!
</div>
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
        "content": `<h2>📊 Lesson 3: Handling Missing Data: Imputation Strategies</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Missing data is not just an inconvenience—it is often a signal in disguise! Blindly replacing missing values with the column average is one of the most common mistakes junior data scientists make. Understanding <em>why</em> data is missing dictates whether your model will thrive or fail miserably in production.
</div>

<h3>🎯 The Three Flavors of Missingness</h3>
<p>Before writing a single line of code, you must diagnose the mechanism behind the missing data:</p>
<ul>
  <li><strong>MCAR (Missing Completely at Random):</strong> The missingness has no relationship with any observed or unobserved data. Example: A lab technician accidentally drops a test tube. You can safely drop these rows or use simple imputation.</li>
  <li><strong>MAR (Missing at Random):</strong> The missingness depends on other observed features. Example: Older patients are less likely to report their social media handle, but age is recorded. If you condition on age, the missingness becomes random.</li>
  <li><strong>MNAR (Missing Not at Random):</strong> The missingness depends on the unobserved value itself! Example: High-income individuals refusing to report their salary on a survey. Here, the fact that data is missing is a massive predictive feature!</li>
</ul>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Real-World Analogy: The Silent Customer</strong><br />
  If a customer leaves the "customer feedback rating" blank, does that mean they had an "average" experience (3 out of 5 stars)? Absolutely not! Often, silent customers are either completely satisfied (nothing went wrong) or so furious they uninstalled the app immediately. Replacing missing feedback with the average destroys this vital nuance.
</div>

<h3>⚙️ Imputation Strategies Compared</h3>
<ul>
  <li><strong>Simple Mean/Median:</strong> Fast and easy, but artificially shrinks the variance of your feature and distorts covariance between variables.</li>
  <li><strong>KNN Imputer:</strong> Finds the <em>k</em> most similar rows based on other features and averages their values. Great for tabular data with strong local correlations.</li>
  <li><strong>Iterative Imputer (MICE - Multivariate Imputation by Chained Equations):</strong> Models each feature with missing values as a function of all other features in a round-robin regression loop. State of the art for statistical rigor!</li>
</ul>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The Leakage Trap:</strong><br />
  Never fit your imputer on the full dataset! Fit your imputer strictly on the <strong>training set</strong>, and then use it to transform the test set. If you compute the mean using both train and test data, future test information leaks into your model!
</div>
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
        "content": `<h2>📊 Lesson 4: Outlier Detection: Z-Score, IQR & Robust Scalers</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  An outlier is a data point that deviates so significantly from other observations that it arouses suspicion that it was generated by a different mechanism. One single typo (e.g. entering an age of 250 instead of 25) can pull an Ordinary Least Squares regression line completely off course!
</div>

<h3>🎯 Two Philosophies: Parametric vs Non-Parametric Detection</h3>
<p>How do we identify points that don't belong? We have two primary statistical lenses:</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Method 1: The Z-Score Rule (Parametric)</strong><br />
  The Z-score measures how many standard deviations a point lies from the mean:
  <div class="math-formula">z = (x - μ) / σ</div>
  If data follows a Gaussian (normal) distribution, 99.7% of points fall within <code>|z| &le; 3</code>. Any point with <code>|z| &gt; 3</code> is a strong outlier candidate!
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Method 2: The IQR Fence (Non-Parametric & Robust)</strong><br />
  What if your data is skewed or multimodal? The mean and standard deviation themselves get distorted by the outliers! The <strong>Interquartile Range (IQR)</strong> uses the median, which doesn't budge:
  <div class="math-formula">IQR = Q3 - Q1</div>
  We erect statistical "fences":
  <ul>
    <li>Lower Fence: <code>Q1 - 1.5 &times; IQR</code></li>
    <li>Upper Fence: <code>Q3 + 1.5 &times; IQR</code></li>
  </ul>
  Any data point outside these fences is flagged as an outlier.
</div>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ Never Blindly Delete Outliers!</strong><br />
  In fraud detection, cybersecurity, and rare disease diagnosis, the outliers <strong>are</strong> the positive labels you are trying to predict! Always investigate whether an outlier represents measurement error or a genuine breakthrough event.
</div>
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
        "content": `<h2>📊 Lesson 5: Categorical Encoding Strategies</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Machine learning models are mathematical engines—they understand numbers, vectors, and matrices, but they cannot multiply the string <code>"New York"</code> by a weight. How you translate human categories into numbers determines the geometric structure your model perceives.
</div>

<h3>🎯 The Cardinality Spectrum</h3>
<p>Let's break down the best encoding strategy depending on the nature of your category:</p>

<ul>
  <li><strong>Ordinal Encoding:</strong> Use this ONLY when there is an inherent natural ordering (e.g. <code>["Cold": 0, "Warm": 1, "Hot": 2]</code> or education levels <code>["High School": 0, "Bachelors": 1, "PhD": 2]</code>). Never use ordinal encoding for unordered categories like colors, because the model will falsely assume that <code>Green (2)</code> is twice as large as <code>Red (1)</code>!</li>
  <li><strong>One-Hot Encoding:</strong> Creates a binary 0/1 column for each distinct category. Ideal for low-cardinality categories (&lt; 20 distinct values), like marital status or device type.</li>
  <li><strong>Target (Mean) Encoding:</strong> For high-cardinality features (like US Zip Codes with 40,000 values), One-Hot encoding would explode your memory with 40,000 sparse columns! Target encoding replaces each category with the average target value for that category (e.g., average house price in that zip code).</li>
</ul>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The Target Encoding Catastrophe: Data Leakage!</strong><br />
  If you compute target averages on the entire dataset, your model will easily achieve 100% training accuracy and completely fail on new data! Always use <strong>out-of-fold target encoding</strong> with smoothing:
  <div class="math-formula">S<sub>i</sub> = λ &times; Mean(Target | Category<sub>i</sub>) + (1 - λ) &times; Global_Target_Mean</div>
  where λ is a smoothing weight that prevents rare categories from having extreme values.
</div>
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
        "content": `<h2>📊 Lesson 6: Feature Scaling Mechanics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Imagine training a model to predict health risk using two features: <em>Age</em> (ranging from 18 to 90) and <em>Income</em> (ranging from $20,000 to $500,000). To an unscaled gradient descent optimizer or distance metric, a change of $1,000 in income will appear 1,000 times more important than a change of 1 year in age!
</div>

<h3>🎯 Four Scalers Every Data Scientist Must Know</h3>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>1. StandardScaler (Z-score Normalization):</strong><br />
  Centers data to mean 0 and scales to unit variance (standard deviation 1):
  <div class="math-formula">x' = (x - μ) / σ</div>
  This is the default workhorse for Linear Regression, Logistic Regression, Support Vector Machines, and Neural Networks!
</div>

<div class="teacher-callout teacher-callout--intuition">
  <strong>2. MinMaxScaler (Range Bound [0, 1]):</strong><br />
  Compresses values into a bounded interval:
  <div class="math-formula">x' = (x - x<sub>min</sub>) / (x<sub>max</sub> - x<sub>min</sub>)</div>
  Great for image pixel intensities [0, 255] or algorithms that require strictly positive bounded inputs.
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>3. RobustScaler (Outlier-Proof):</strong><br />
  Subtracts the median and divides by the Interquartile Range (IQR). Because the median and IQR do not care about extreme outliers, this scaler preserves realistic feature relationships even in messy data!
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Teacher's Secret: Which Models Don't Care About Scaling?</strong><br />
  Tree-based models (Decision Trees, Random Forests, XGBoost, LightGBM) are completely invariant to monotonic feature scaling! A decision tree split at <code>Income &gt; $50,000</code> behaves identically to a split at <code>Income_scaled &gt; 0.42</code>.
</div>
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
print("nCollinear Pair (0, 1) Correlation:", round(corr_matrix[0, 1], 3))
`,
        "content": `
<h2>📊 Lesson 7: Exploratory Data Analysis (EDA) Best Practices & Correlation Diagnostics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Never throw raw data into a neural network or XGBoost without diagnostics. Multicollinearity inflates coefficient variance, and target distribution skew degrades loss convergence.
</div>

<h3>Multicollinearity & Variance Inflation Factor (VIF)</h3>
<p>When two or more predictor features are highly linearly correlated, the matrix <strong>X</strong>ᵀ<strong>X</strong> approaches singularity, causing linear regression coefficients to become wildly unstable. VIF measures this inflation:</p>
<pre class="ascii-diagram">
VIF_j = 1 / (1 - R_j²)
</pre>
<p>A VIF > 5 or 10 indicates severe multicollinearity requiring feature removal or PCA projection.</p>
`
      }
    ],
    "exercises": [
      {
        "title": "Production-Grade Preprocessing Pipeline in Scikit-Learn",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build an Automated Preprocessing Pipeline</h3>
<p>Implement a function <code>build<sub>s</sub>tandard<sub>p</sub>reprocessor(numeric<sub>d</sub>ata)</code> that centers data to zero mean and scales to unit variance, while replacing any NaN entries with the column mean.</p>
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
        "expectedOutput": "Processed Matrix Shape: (3, 2)nCol 0 Mean (approx 0): 0.0nCol 0 Std (approx 1): 1.0",
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

# Closed-form Normal Equation: w = (Xᵀ X)^-1 Xᵀ y
w = np.linalg.inv(X.T @ X) @ X.T @ y

print("Estimated Bias (Intercept):", round(w[0], 3))
print("Estimated Slope (Weight):", round(w[1], 3))
`,
        "content": `<h2>📈 Lesson 1: Ordinary Least Squares (OLS) Regression</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Linear regression is the foundational bedrock of all predictive modeling. Before jumping to deep neural networks, understand how ordinary least squares works: it fits a straight line (or hyperplane) through data points to minimize the sum of squared vertical distances.
</div>

<h3>🎯 The Physical Model: Elastic Rubber Bands</h3>
<p>Imagine you have a scatter plot of data points on a table, and you hold a stiff wooden stick above them. Attach tiny elastic rubber bands from each point vertically to the stick.</p>
<p>When you release your hands, where does the stick balance? It settles at the exact slope and intercept that minimizes the total elastic potential energy stored in all the rubber bands! That physical equilibrium point is the <strong>Ordinary Least Squares (OLS)</strong> solution.</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Why Squared Residuals?</strong><br />
  Why do we minimize the sum of <em>squared</em> errors (e²) instead of absolute errors (|e|)?
  <ul>
    <li><strong>Calculus Friendly:</strong> The square function is smooth and differentiable everywhere, yielding a clean closed-form formula!</li>
    <li><strong>Penalizes Huge Mistakes:</strong> An error of 4 units produces a penalty of 16 (4²), whereas an error of 10 units produces a penalty of 100 (10²). The model works exponentially harder to avoid large outliers.</li>
  </ul>
</div>

<h3>⚙️ The Mathematical Formulation</h3>
<p>Given a feature matrix <strong>X</strong> ∈ ℝ<sup>N &times; D</sup> and target vector <strong>y</strong> ∈ ℝ<sup>N</sup>, our goal is to find the optimal weight vector <strong>w</strong>:</p>

<div class="math-formula">
  Loss(<strong>w</strong>) = ||<strong>y</strong> - <strong>Xw</strong>||² = (<strong>y</strong> - <strong>Xw</strong>)ᵀ(<strong>y</strong> - <strong>Xw</strong>)
</div>

<p>Taking the gradient with respect to <strong>w</strong> and setting it to zero yields the famous <strong>Normal Equation</strong>:</p>

<div class="math-formula">
  <strong>w</strong> = (<strong>X</strong>ᵀ<strong>X</strong>)⁻¹ <strong>X</strong>ᵀ<strong>y</strong>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ When to Use the Normal Equation vs Gradient Descent:</strong><br />
  Inverting the D &times; D matrix <code>(XᵀX)</code> takes O(D³) time. If you have 50 features, the Normal Equation solves instantaneously in closed form! But if you have 100,000 features (like in NLP or deep learning), matrix inversion is impossible, and iterative <strong>Gradient Descent</strong> is required.
</div>
`
      },
      {
        "title": "Regularized Linear Models: L1 Lasso, L2 Ridge & ElasticNet",
        "language": "python",
        "starterCode": `import numpy as np

# Ridge Regression Closed-Form: w = (Xᵀ X + alpha * I)^-1 Xᵀ y
X = np.array([[1.0, 2.0], [1.0, 3.0], [1.0, 4.0]])
y = np.array([3.0, 5.0, 7.0])
alpha = 0.5

# Identity matrix (ignoring bias shrinkage in strict implementations)
I = np.eye(X.shape[1])
w_ridge = np.linalg.inv(X.T @ X + alpha * I) @ X.T @ y

print("Ridge Weights:", np.round(w_ridge, 3))
`,
        "content": `<h2>📈 Lesson 2: Regularized Linear Models: Ridge, Lasso & ElasticNet</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  In the real world, data is full of collinearity (features that say almost the exact same thing) and noise. When ordinary linear regression tries too hard to fit every data point, weights explode to massive positive and negative values. Regularization is our tool to tame wild weights and prevent overfitting.
</div>

<h3>🎯 Gravity vs Marie Kondo: The Two Regularization Philosophies</h3>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Two Mental Models:</strong>
  <ul>
    <li><strong>Ridge Regression (L2 Penalty):</strong> Think of Ridge as <strong>gravity</strong>. It places a gentle, continuous downward pull on the magnitude of all weights. Weights shrink closer to zero, but rarely become exactly zero. Everyone gets scaled down together.</li>
    <li><strong>Lasso Regression (L1 Penalty):</strong> Think of Lasso as <strong>Marie Kondo</strong>. It inspects each feature and asks: <em>"Does this feature spark predictive joy?"</em> If not, it ruthlessly throws it out by driving its weight to <strong>exact zero</strong>, giving you automated feature selection!</li>
  </ul>
</div>

<h3>⚙️ The Math Behind the Trinity</h3>
<p>Let's compare the optimization objectives side by side:</p>

<div class="math-formula">
  <strong>Ridge (L2):</strong> Loss = ||<strong>y</strong> - <strong>Xw</strong>||² + λ ||<strong>w</strong>||₂² = RSS + λ ∑ w<sub>j</sub>²
</div>
<p>Ridge has an elegant analytical closed-form solution that guarantees invertibility even when features outnumber samples: <code>w = (XᵀX + λI)⁻¹ Xᵀy</code>.</p>

<div class="math-formula">
  <strong>Lasso (L1):</strong> Loss = ||<strong>y</strong> - <strong>Xw</strong>||² + λ ||<strong>w</strong>||₁ = RSS + λ ∑ |w<sub>j</sub>|
</div>
<p>Because the absolute value function has sharp corners at zero, Lasso's loss contours intersect the coordinate axes at exact zeros.</p>

<div class="math-formula">
  <strong>ElasticNet:</strong> Loss = RSS + λ₁ ||<strong>w</strong>||₁ + λ₂ ||<strong>w</strong>||₂²
</div>
<p>Combines the best of both worlds: it selects sparse features like Lasso, while sharing credit among correlated groups of features like Ridge.</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Teacher's Rule of Thumb:</strong><br />
  If you suspect that most features are useful and correlated, use <strong>Ridge</strong>. If you suspect that only 5 out of 100 features actually matter, use <strong>Lasso</strong>. If you aren't sure and have correlated features, use <strong>ElasticNet</strong>!
</div>
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
        "content": `<h2>📈 Lesson 3: Logistic Regression & The Sigmoid Boundary</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Despite having "regression" in its name, Logistic Regression is the world's most popular algorithm for <strong>binary classification</strong>! It answers questions like: <em>"Will this customer churn?"</em>, <em>"Is this transaction fraudulent?"</em>, or <em>"Is this email spam?"</em>.
</div>

<h3>🎯 Why Linear Regression Fails for Classification</h3>
<p>If you try to fit a straight line to predict binary outcomes (0 or 1), your line will happily predict numbers like -0.5 or +2.4! But probabilities must strictly live inside the range [0.0, 1.0].</p>
<p>How do we bend a straight line so it stays between 0 and 1? We pass the linear score <code>z = wᵀx + b</code> through the magical <strong>Sigmoid function</strong>:</p>

<div class="math-formula">
  σ(z) = 1 / (1 + e<sup>-z</sup>)
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Odds Ratio & The Logit Link:</strong><br />
  If the probability of rain is 80% (p = 0.8), the probability of no rain is 20% (1 - p = 0.2).<br />
  The <strong>Odds</strong> are <code>0.8 / 0.2 = 4 to 1</code>.<br />
  The <strong>Logit (log-odds)</strong> is <code>ln(4) &approx; 1.386</code>.<br />
  Logistic regression simply assumes that the <em>log-odds</em> of the positive event is a linear combination of the features: <code>ln(p / (1 - p)) = wᵀx + b</code>!
</div>

<h3>⚙️ The Binary Cross-Entropy Loss</h3>
<p>Because the Sigmoid is non-linear, using Mean Squared Error would create a bumpy loss surface full of local traps. Instead, we use <strong>Binary Cross-Entropy (Log Loss)</strong>:</p>

<div class="math-formula">
  Loss = - [ y &middot; log(p) + (1 - y) &middot; log(1 - p) ]
</div>
<p>Notice what happens: if the true label is y = 1 and your model predicts p = 0.99, the loss is near zero. But if your model confidently predicts p = 0.01, the log loss approaches infinity! The model is severely penalized for being confident and wrong.</p>
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
        "content": `<h2>📈 Lesson 4: Multi-Class Classification & Softmax Mechanics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  What happens when you have more than two outcomes—such as classifying an image into <em>Cat</em>, <em>Dog</em>, or <em>Bird</em>? We have two primary strategies: training a committee of binary classifiers (One-vs-Rest) or using a unified probability distribution (Multinomial Softmax).
</div>

<h3>🎯 Strategy 1: One-vs-Rest (OvR)</h3>
<p>If you have <em>K</em> classes, you train <em>K</em> independent binary classifiers:</p>
<ul>
  <li>Classifier 1: Cat vs (Dog or Bird)</li>
  <li>Classifier 2: Dog vs (Cat or Bird)</li>
  <li>Classifier 3: Bird vs (Cat or Dog)</li>
</ul>
<p>When a new sample arrives, you run it through all 3 classifiers and pick the one with the highest confidence score. Simple and highly parallelizable!</p>

<h3>🎯 Strategy 2: Multinomial Softmax</h3>
<p>In deep learning and modern classification, we prefer a single unified layer that produces raw scores (logits) <code>[z₁, z₂, ..., z<sub>K</sub>]</code> and normalizes them into a true probability distribution using the <strong>Softmax function</strong>:</p>

<div class="math-formula">
  p<sub>k</sub> = e<sup>z<sub>k</sub></sup> / ∑<sub>j=1</sub><sup>K</sup> e<sup>z<sub>j</sub></sup>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Why Softmax Uses the Exponential (eᶻ):</strong>
  <ul>
    <li><strong>Guarantees Positivity:</strong> <code>eᶻ &gt; 0</code> for any real number, ensuring probabilities can never be negative.</li>
    <li><strong>Winner-Takes-All Dynamic:</strong> Because the exponential curve grows rapidly, the highest logit gets amplified, giving the model clear, confident decision boundaries!</li>
    <li><strong>Sum to 1:</strong> Dividing by the sum of all exponentials ensures the output always sums strictly to 1.0 (a valid probability distribution).</li>
  </ul>
</div>
`
      },
      {
        "title": "Support Vector Machines (SVMs): Maximum Margin Separators & Support Vectors",
        "language": "python",
        "starterCode": `import numpy as np

# Geometric Margin intuition
# Points on the margin satisfy: y_i * (wᵀ x_i + b) = 1
w = np.array([2.0, 0.0]) # Separating plane vertical at x=0
margin = 2.0 / np.linalg.norm(w)

print("Margin Width (2 / ||w||):", margin)
`,
        "content": `<h2>📈 Lesson 5: Support Vector Machines (SVMs) & Maximum Margin</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Imagine drawing a dividing line between red and blue dots. There are infinitely many straight lines that separate the two classes! But which one is the safest? Which one will perform best on unseen future data? That is the profound question Support Vector Machines answer.
</div>

<h3>🎯 The Street Analogy: Maximizing the Highway Width</h3>
<p>Imagine the decision boundary is the center line of a highway. You want to make the highway as wide as possible without touching any houses (data points) on either side!</p>
<p>The width of this clear zone is called the <strong>margin</strong>. An SVM finds the unique hyperplane that maximizes this margin distance. The data points that sit right on the boundary edges of the highway are called <strong>Support Vectors</strong>.</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Why Support Vectors are Special:</strong><br />
  Notice something extraordinary: only the points touching the margin (the Support Vectors) determine where the line goes! You could move or delete 95% of the other data points far away in their safe zones, and the SVM decision boundary would <strong>not change by a single millimeter</strong>!
</div>

<h3>⚙️ The Margin Formulation</h3>
<p>For a separating hyperplane <code>wᵀx + b = 0</code>, the geometric distance to the nearest point is <code>1 / ||w||</code>. Maximizing the margin <code>1 / ||w||</code> is mathematically equivalent to minimizing:</p>

<div class="math-formula">
  min 1/2 ||<strong>w</strong>||²   subject to   y<sub>i</sub>(<strong>w</strong>ᵀ<strong>x</strong><sub>i</sub> + b) &ge; 1
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Soft Margin & The C Parameter:</strong><br />
  What if data is noisy and cannot be cleanly separated? We introduce slack variables <code>ξ<sub>i</sub></code> and a trade-off parameter <strong>C</strong>:
  <ul>
    <li><strong>Large C:</strong> Strict teacher. Penalizes any margin violation heavily. Narrow margin, higher risk of overfitting.</li>
    <li><strong>Small C:</strong> Lenient teacher. Allows some points to cross the margin in exchange for a wider, more generalizable highway.</li>
  </ul>
</div>
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
        "content": `<h2>📈 Lesson 6: The Kernel Trick & Non-Linear SVMs</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  What do you do when data cannot be separated by a straight line—for example, when red dots form a circle surrounded by an outer ring of blue dots? The classical answer was to manually craft new features. The genius of Support Vector Machines is the <strong>Kernel Trick</strong>.
</div>

<h3>🎯 The Trampoline Analogy: Jumping to Higher Dimensions</h3>
<p>Imagine red marbles placed in the center of a circular trampoline, and blue marbles placed around the outer rim. Looking from directly above in 2D, you cannot draw any straight line to separate them.</p>
<p>Now, push down on the center of the trampoline! The red marbles sink in the z-axis (height), while the blue marbles stay elevated. In 3D space, you can now slide a flat sheet of cardboard horizontally between the two groups!</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Kernel Trick: Magic Without the Cost</strong><br />
  Normally, projecting data into 10,000 dimensions would be computationally impossible. The <strong>Kernel Trick</strong> proves that we never actually need to calculate the high-dimensional coordinates! We only need to compute the <strong>dot product (similarity)</strong> between pairs of points in the original space:
  <div class="math-formula">K(<strong>x</strong>, <strong>z</strong>) = &Phi;(<strong>x</strong>)ᵀ &Phi;(<strong>z</strong>)</div>
</div>

<h3>⚙️ Popular Kernels</h3>
<ul>
  <li><strong>Linear Kernel:</strong> <code>K(x, z) = xᵀz</code>. Fast, best when features are already very high-dimensional (like text classification).</li>
  <li><strong>Polynomial Kernel:</strong> <code>K(x, z) = (xᵀz + c)ᵈ</code>. Captures interactions between features up to degree <em>d</em>.</li>
  <li><strong>RBF (Radial Basis Function / Gaussian) Kernel:</strong>
    <div class="math-formula">K(<strong>x</strong>, <strong>z</strong>) = exp(-γ ||<strong>x</strong> - <strong>z</strong>||²)</div>
    Corresponds to an <strong>infinite-dimensional feature space</strong>! It measures similarity as a bell-shaped decay based on Euclidean distance.
  </li>
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
        "content": `<h2>📈 Lesson 7: The Master Guide to Classification Metrics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If you only remember one lesson from classical machine learning, let it be this: <strong>Accuracy is a dangerous trap!</strong> If only 0.1% of transactions are credit card fraud, a model that predicts "Not Fraud" for every single person achieves 99.9% accuracy—while being completely useless in practice.
</div>

<h3>🎯 The Confusion Matrix: Your Compass</h3>
<table class="comparison-table">
  <thead>
    <tr><th></th><th>Predicted Positive (1)</th><th>Predicted Negative (0)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Actual Positive (1)</strong></td><td>True Positive (TP)</td><td>False Negative (FN - Missed!)</td></tr>
    <tr><td><strong>Actual Negative (0)</strong></td><td>False Positive (FP - False Alarm)</td><td>True Negative (TN)</td></tr>
  </tbody>
</table>

<h3>⚙️ The Core Metrics Explained Simply</h3>
<ul>
  <li><strong>Precision (Quality of Positives):</strong> Out of all cases where the model predicted Positive, how many were actually Positive?
    <div class="math-formula">Precision = TP / (TP + FP)</div>
    <em>Critical when false alarms are expensive:</em> e.g., Spam filters (you don't want an important job offer sent to the junk folder).
  </li>
  <li><strong>Recall / Sensitivity (Completeness):</strong> Out of all actual Positive cases in the real world, how many did the model catch?
    <div class="math-formula">Recall = TP / (TP + FN)</div>
    <em>Critical when missing a positive is deadly:</em> e.g., Cancer detection or airport security screening.
  </li>
  <li><strong>F1-Score:</strong> The harmonic mean of Precision and Recall:
    <div class="math-formula">F1 = 2 &times; (Precision &times; Recall) / (Precision + Recall)</div>
    Use the harmonic mean because it punishes extreme imbalances: if either Precision or Recall is zero, F1 drops to zero.
  </li>
  <li><strong>ROC-AUC (Area Under ROC Curve):</strong> Evaluates model ranking performance across <em>all possible classification thresholds</em>. A score of 0.5 is random guessing; 1.0 is perfection.</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Teacher's Rule for Imbalanced Datasets:</strong><br />
  When your positive class is rare (&lt; 5%), ROC-AUC can still look deceptively high because True Negatives dominate the calculation. Always plot the <strong>Precision-Recall Curve (PR-AUC)</strong> for imbalanced problems!
</div>
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

# R² score
ss_tot = np.sum((y_true - np.mean(y_true))**2)
ss_res = np.sum(residuals**2)
r2 = 1.0 - (ss_res / ss_tot)

print(f"MSE: {round(mse, 2)} | RMSE: {round(rmse, 2)} | MAE: {round(mae, 2)}")
print(f"R² Score: {round(r2, 4)}")
`,
        "content": `<h2>📈 Lesson 8: Regression Metrics & Residual Diagnostics</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  How do you know if your regression model is truly capturing the underlying phenomenon, or just drawing a lazy average? In regression, error metrics tell you how far off your predictions are, but <strong>residual plots</strong> reveal what your model failed to learn!
</div>

<h3>🎯 The Error Metric Toolkit</h3>
<ul>
  <li><strong>MAE (Mean Absolute Error):</strong> Average of absolute differences <code>(1/N) ∑ |y - ŷ|</code>. Easy to explain to business executives: <em>"On average, our house price predictions are off by $15,000."</em> Robust to outliers.</li>
  <li><strong>MSE (Mean Squared Error):</strong> Average of squared differences <code>(1/N) ∑ (y - ŷ)²</code>. Penalizes large errors heavily, but the units are squared dollars (hard to interpret).</li>
  <li><strong>RMSE (Root Mean Squared Error):</strong> <code>√MSE</code>. Back in the original units of the target, while still penalizing large outliers more than MAE.</li>
  <li><strong>R² (Coefficient of Determination):</strong> Proportion of target variance explained by your model:
    <div class="math-formula">R² = 1 - (SS<sub>res</sub> / SS<sub>tot</sub>)</div>
    R² = 1.0 is perfect; R² = 0.0 means your model performs no better than always predicting the baseline mean.
  </li>
</ul>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ Beware Heteroscedasticity!</strong><br />
  Always plot your residuals (<code>y - ŷ</code>) against predicted values (<code>ŷ</code>). If you see a "cone" or "fan" shape where errors get wider as predictions grow, your data exhibits <strong>heteroscedasticity</strong> (non-constant variance). Fix it by taking the logarithm of your target variable: <code>y_log = np.log1p(y)</code>!
</div>
`
      }
    ],
    "exercises": [
      {
        "title": "Linear & Logistic Regression from Scratch with Pure Gradient Descent",
        "language": "python",
        "description": `
<h3>⚔️ LAB CHALLENGE: Build Gradient Descent Regression from Scratch</h3>
<p>Implement a pure Python/NumPy gradient descent optimizer for binary logistic regression that updates weight vector<strong>w</strong>using Cross-Entropy loss gradients.</p>
`,
        "starterCode": `import numpy as np

def train_logistic_regression(X, y, lr=0.1, epochs=200):
    N, D = X.shape
    w = np.zeros(D)
    for _ in range(epochs):
        # Forward pass: logit and sigmoid
        z = np.dot(X, w)
        p = 1.0 / (1.0 + np.exp(-np.clip(z, -25, 25)))
        # Gradient: dL/dw = (1/N) * Xᵀ (p - y)
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
          "The gradient of BCE loss with respect to weights is (1/N) * Xᵀ * (p - y).",
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
        "content": `<h2>🌲 Lesson 1: Decision Trees & Binary Splitting</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If you have ever played the childhood game <em>20 Questions</em>, you already understand how Decision Trees work! You start with a big, broad question, split the world in two, and ask progressively narrower questions until you reach a conclusion.
</div>

<h3>🎯 How a Tree Thinks</h3>
<p>Unlike linear models that weigh all features simultaneously into a single formula, a Decision Tree cuts feature space with <strong>axis-aligned orthogonal splits</strong> (e.g. <em>"Is Age &gt; 35?"</em> &rarr; <em>"Is Income &gt; $50,000?"</em>).</p>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 The Great Advantages of Decision Trees:</strong>
  <ul>
    <li><strong>Complete Interpretability:</strong> You can print out the rules and read them like an flowchart. Highly valued in healthcare, finance, and legal compliance.</li>
    <li><strong>Scale-Free:</strong> Does not require feature scaling! A split on raw dollars works identically to a split on normalized values.</li>
    <li><strong>Handles Mixed Types:</strong> Naturally consumes both numeric and categorical variables.</li>
  </ul>
</div>

<h3>⚙️ The Greedy Splitting Algorithm (CART)</h3>
<p>At every node, the tree exhaustively evaluates every available feature and every possible threshold value. It greedily selects the single split that maximizes the <strong>purity gain</strong> of the resulting left and right child subsets.</p>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The Dark Side: High Variance and Overfitting</strong><br />
  Without constraints, a decision tree will continue growing until every single leaf contains exactly one data point! It achieves 100% training accuracy by memorizing noise. To prevent this, always constrain trees using <code>max_depth</code>, <code>min_samples_split</code>, and <code>min_samples_leaf</code>.
</div>
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
        "content": `<h2>🌲 Lesson 2: Split Criteria: Gini vs Entropy</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  How does a decision tree decide which question is the best question to ask? It uses mathematical measures of <strong>impurity</strong>. The purer a child node (meaning all its samples belong to the exact same class), the better the split!
</div>

<h3>🎯 The Two Masters of Purity</h3>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>1. Gini Impurity:</strong><br />
  Measures the probability that a randomly chosen element from the set would be incorrectly labeled if it were randomly labeled according to the distribution of labels in the subset:
  <div class="math-formula">I<sub>G</sub>(p) = 1 - ∑<sub>k=1</sub><sup>K</sup> p<sub>k</sub>²</div>
  If a node is 100% pure (all Cat), <code>p<sub>cat</sub> = 1.0</code>, and <code>I<sub>G</sub> = 1 - 1² = 0</code> (minimum impurity)!
</div>

<div class="teacher-callout teacher-callout--intuition">
  <strong>2. Shannon Entropy & Information Gain:</strong><br />
  Measures the average bits of uncertainty or surprise in the distribution:
  <div class="math-formula">H(p) = - ∑<sub>k=1</sub><sup>K</sup> p<sub>k</sub> log<sub>2</sub>(p<sub>k</sub>)</div>
  <strong>Information Gain</strong> is simply the reduction in entropy achieved by partitioning the dataset according to a split:
  <div class="math-formula">Gain = H(Parent) - [ (N<sub>L</sub>/N) H(Left) + (N<sub>R</sub>/N) H(Right) ]</div>
</div>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ Which One Should You Use?</strong><br />
  In practice, Gini Impurity and Entropy yield nearly identical decision boundaries over 98% of the time! However, <strong>Gini is computationally faster</strong> because it does not require calculating expensive logarithms. That's why Gini is the default in Scikit-Learn!
</div>
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  An unconstrained decision tree will grow until every single training leaf contains exactly 1 sample—achieving 100% training accuracy while memorizing noise. Regularization is mandatory.
</div>

<h3>Cost-Complexity Pruning (ccp<sub>a</sub>lpha)</h3>
<p>Minimal cost-complexity pruning defines a cost function indexed by parameteralpha ge 0:</p>
<pre class="ascii-diagram">
R_α(T) = R(T) + α |T|
</pre>
<p>WhereR(T)is the total leaf misclassification rate and|T|is the number of terminal leaves. Increasingalphacollapses weak branches into single leaves.</p>
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
        "content": `<h2>🤝 Lesson 4: Ensemble Theory: The Bias-Variance Tradeoff</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Ensemble learning is the single most powerful technique in competitive machine learning (Kaggle). The core premise is inspiring: <em>a committee of diverse, imperfect learners can combine to make near-perfect decisions!</em>
</div>

<h3>🎯 The Bias-Variance Decomposition</h3>
<p>Every machine learning prediction error decomposes into three mathematical components:</p>
<div class="math-formula">
  Expected Error = Bias² + Variance + Irreducible Noise
</div>
<ul>
  <li><strong>Bias (Underfitting):</strong> Assumptions made by the model. High bias models (like a straight line for quadratic data) consistently miss the true relationship.</li>
  <li><strong>Variance (Overfitting):</strong> Sensitivity to small fluctuations in the training set. High variance models (like deep unconstrained trees) memorize training noise.</li>
</ul>

<h3>⚙️ The Two Great Ensemble Paradigms</h3>

<table class="comparison-table">
  <thead>
    <tr><th>Ensemble Type</th><th>Bagging (Bootstrap Aggregating)</th><th>Boosting</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Core Goal</strong></td><td>Reduces <strong>Variance</strong></td><td>Reduces <strong>Bias</strong></td></tr>
    <tr><td><strong>Base Learners</strong></td><td>Deep, complex models with high variance (e.g. full trees)</td><td>Shallow, simple models with high bias (e.g. tree stumps)</td></tr>
    <tr><td><strong>Training Flow</strong></td><td><strong>Parallel & Independent:</strong> Every model trains on a random bootstrap sample simultaneously</td><td><strong>Sequential:</strong> Every new model trains specifically on the errors (residuals) of previous models</td></tr>
    <tr><td><strong>Flagship Example</strong></td><td><strong>Random Forest</strong></td><td><strong>XGBoost, LightGBM, CatBoost</strong></td></tr>
  </tbody>
</table>
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
        "content": `<h2>🌲 Lesson 5: Random Forests & The Wisdom of Crowds</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  If you ask one person to guess the weight of an ox at a country fair, their guess might be way off. But if you ask 500 different people and average their guesses, the crowd's estimate is astonishingly close to the true weight. This is the <strong>Wisdom of Crowds</strong>, and it is the exact engine behind Random Forests!
</div>

<h3>🎯 The Two Sources of Randomness</h3>
<p>A single decision tree is notorious for high variance. How does a Random Forest make 500 decision trees disagree with each other so their errors cancel out?</p>

<ul>
  <li><strong>1. Bootstrap Sampling (Bagging):</strong> Each tree is trained on a random sample of the dataset chosen with replacement. Approximately 63.2% of rows are included in any tree, while the remaining 36.8% are left out!</li>
  <li><strong>2. Feature Subsampling:</strong> At every single split inside every tree, the algorithm only considers a random subset of features (typically <code>√D</code> features). This prevents one dominant feature from monopolizing all trees!</li>
</ul>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Free Validation Set: Out-of-Bag (OOB) Score:</strong><br />
  Because ~36.8% of training samples were never seen by a given tree, you can evaluate each sample using only the trees that didn't train on it! This gives you an <strong>Out-of-Bag error score</strong> that acts as a built-in cross-validation score without needing a separate validation split!
</div>
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Gradient boosting is gradient descent in function space. Rather than adjusting weights θ, each new tree h<sub>m</sub>(x) fits the negative gradient (residuals) of the loss function.
</div>

<p>Given modelF_{m-1}(<strong>x</strong>), compute pseudo-residuals:</p>
<pre class="ascii-diagram">
r_{i, m} = - [ ∂ L(y<sub>i</sub>, F(x<sub>i</sub>)) / ∂ F(x<sub>i</sub>) ]_{F = F_{m-1}}
Fit tree h<sub>m</sub>(x) to predict r_{i, m}
F<sub>m</sub>(x) = F_{m-1}(x) + η · h<sub>m</sub>(x)   (where η is the learning rate / shrinkage)
</pre>
`
      },
      {
        "title": "Industrial Gradient Boosters: XGBoost (Histogram Bucketing & Second-Order Approximations)",
        "language": "python",
        "starterCode": `import numpy as np

# XGBoost Second-Order Taylor Expansion of Loss:
# L(y, F + f) ≈ L(y, F) + g_i * f_i + 1/2 * h_i * f_i²
# where g_i = ∂L/∂F (gradient) and h_i = ∂²L/∂F² (hessian)
print("XGBoost uses both first-order gradients (g_i) and second-order Hessians (h_i)!")
`,
        "content": `<h2>⚡ Lesson 7: XGBoost Architecture & Second-Order Approximations</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When Tianqi Chen introduced XGBoost in 2014, it took the machine learning world by storm, dominating Kaggle competitions. XGBoost is not just a tree algorithm—it is a masterpiece of software engineering and second-order optimization.
</div>

<h3>🎯 The Secret Weapon: Second-Order Taylor Expansion</h3>
<p>Standard gradient boosting only uses the first derivative (the gradient <em>g<sub>i</sub></em>). XGBoost takes the <strong>second derivative (the Hessian <em>h<sub>i</sub></em>)</strong> of the loss function:</p>

<div class="math-formula">
  Loss &approx; ∑ [ Loss(y<sub>i</sub>, ŷ<sub>i</sub>) + g<sub>i</sub> f(x<sub>i</sub>) + 1/2 h<sub>i</sub> f²(x<sub>i</sub>) ] + Ω(f)
</div>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Why the Hessian Matters:</strong><br />
  The gradient tells you which direction to step; the Hessian tells you how fast the slope is curving! Knowing the curvature allows XGBoost to take optimal step sizes and calculate exact analytical optimal leaf weights:
  <div class="math-formula">w* = - ∑ g<sub>i</sub> / ( ∑ h<sub>i</sub> + λ )</div>
  where λ is the L2 leaf regularization parameter that prevents leaf values from exploding.
</div>

<h3>⚙️ Hardware Innovations in XGBoost</h3>
<ul>
  <li><strong>Histogram Binning:</strong> Continuous features are sorted once and binned into discrete integer buckets (e.g. 256 bins), reducing memory usage by 80% and speeding up split search by 10x!</li>
  <li><strong>Cache-Aware Access:</strong> Allocates internal buffers in CPU L1/L2 cache to avoid memory stalls during gradient accumulation.</li>
  <li><strong>Sparsity-Aware Splitting:</strong> Automatically learns a default branch direction for missing values, meaning you don't even need to impute NaNs before training!</li>
</ul>
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
print("nCatBoost Innovation:")
print("1. Ordered Boosting: Eliminates target leakage in categorical target encoding.")
`,
        "content": `
<h2>🌲 Lesson 8: LightGBM (GOSS & EFB) and CatBoost (Ordered Boosting for Categoricals)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  When datasets reach tens of millions of rows, LightGBM trains up to 15x faster than standard XGBoost, while CatBoost handles raw categorical features without manual preprocessing.
</div>

<h3>LightGBM: Leaf-wise vs Level-wise Growth</h3>
<p>Most tree libraries grow trees level-by-level (depth-wise). LightGBM grows trees **leaf-wise** (best-first), splitting the single leaf that produces the greatest loss reduction. This achieves lower loss with fewer splits, guarded by <code>max<sub>d</sub>epth</code> to prevent overfitting.</p>
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
        "expectedOutput": "Optimal Depth: 6nOptimal Learning Rate: 0.05nMinimum Validation Loss: 0.35",
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
        "content": `<h2>🪐 Lesson 1: Clustering Foundations & K-Means Optimization</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Welcome to <strong>Unsupervised Learning</strong>! Up until now, our models had a teacher grading their homework with ground-truth labels (<em>y</em>). In clustering, there are no labels. The algorithm must discover hidden geometric patterns and natural groupings on its own!
</div>

<h3>🎯 The Planetary Analogy: Centers of Gravity</h3>
<p>Imagine dropping <em>K</em> magnets onto a table covered in scattered iron filings. What happens?</p>
<ol>
  <li><strong>Assignment:</strong> Each iron filing flies to the magnet closest to it.</li>
  <li><strong>Update:</strong> Each magnet moves to the center of gravity of its newly formed cluster.</li>
  <li><strong>Repeat:</strong> The filings adjust to the new magnet positions, the magnets move again, and within a few cycles, everything locks into stable harmony!</li>
</ol>

<div class="teacher-callout teacher-callout--analogy">
  <strong>🌍 Lloyd's Algorithm (K-Means) in Two Simple Steps:</strong>
  <ul>
    <li><strong>Step 1 (Assignment):</strong> Assign each point <strong>x</strong><sub>i</sub> to its nearest centroid <strong>μ</strong><sub>k</sub>:
      <div class="math-formula">c<sub>i</sub> = argmin<sub>k</sub> ||<strong>x</strong><sub>i</sub> - <strong>μ</strong><sub>k</sub>||²</div>
    </li>
    <li><strong>Step 2 (Update):</strong> Recalculate each centroid as the mean of all points assigned to it:
      <div class="math-formula"><strong>μ</strong><sub>k</sub> = (1 / |C<sub>k</sub>|) ∑<sub>i ∈ C<sub>k</sub></sub> <strong>x</strong><sub>i</sub></div>
    </li>
  </ul>
</div>

<h3>⚙️ The Inertia Objective</h3>
<p>K-Means seeks to minimize the Within-Cluster Sum of Squares (Inertia):</p>
<div class="math-formula">
  Inertia = ∑<sub>k=1</sub><sup>K</sup> ∑<sub>i ∈ C<sub>k</sub></sub> ||<strong>x</strong><sub>i</sub> - <strong>μ</strong><sub>k</sub>||²
</div>

<div class="teacher-callout teacher-callout--trap">
  <strong>⚠️ The Weaknesses of K-Means:</strong>
  <ul>
    <li>Assumes clusters are <strong>spherical</strong> and roughly equal in size.</li>
    <li>Extremely sensitive to initial centroid placement (can get stuck in bad local minima).</li>
    <li>Sensitive to outliers (since outliers pull the mean centroid off course).</li>
  </ul>
</div>
`
      },
      {
        "title": "K-Means++ Initialization, Elbow Method & Inertia Plateaus",
        "language": "python",
        "starterCode": `import numpy as np

# K-Means++ picks first centroid at random, then subsequent centroids
# with probability proportional to squared distance D(x)² from nearest centroid!
print("K-Means++ Initialization: P(x is chosen) ∝ D(x)²")
print("Guarantees an expected O(log K) approximation to the optimal clustering!")
`,
        "content": `
<h2>🔍 Lesson 2: K-Means++ Initialization, Elbow Method & Inertia Plateaus</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Randomly initializing K-Means centroids often causes the algorithm to get trapped in disastrous local minima. K-Means++ spaces initial centroids far apart, guaranteeing anO(log K)approximation bound.
</div>

<h3>The Elbow Method for Optimal K</h3>
<p>AsKincreases, inertia monotonically decreases (reaching 0 whenK = N). The **Elbow Method** plots inertia againstK; the point of diminishing returns—where the curve bends sharply like an elbow—indicates the natural cluster count.</p>
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
        "content": `<h2>🪐 Lesson 3: Density-Based Clustering (DBSCAN)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  What if your clusters aren't nice round circles? What if they look like winding rivers, crescents, or intertwined spirals? K-Means will fail completely on these shapes. Enter <strong>DBSCAN (Density-Based Spatial Clustering of Applications with Noise)</strong>!
</div>

<h3>🎯 The Island Archipelago Analogy</h3>
<p>Imagine looking down at an ocean with islands and scattered swimmers. Where there is high density of land, you have an island. The swimmers floating alone in deep water aren't part of any island—they are <strong>noise</strong>!</p>
<p>DBSCAN groups points based on density connectivity, and has the superpower of <strong>not forcing every point into a cluster</strong>. It is one of the best anomaly detectors in machine learning.</p>

<div class="teacher-callout teacher-callout--pro-tip">
  <strong>⭐ The Two Hyperparameters:</strong>
  <ul>
    <li><strong>ε (Epsilon):</strong> The radius of the neighborhood around each point.</li>
    <li><strong>MinPts:</strong> The minimum number of points required within the ε-neighborhood to declare a dense region.</li>
  </ul>
</div>

<h3>⚙️ The Three Types of Points</h3>
<ul>
  <li><strong>Core Point:</strong> Has at least <code>MinPts</code> within distance <code>ε</code>. These form the dense hearts of clusters.</li>
  <li><strong>Border Point:</strong> Has fewer than <code>MinPts</code> within distance <code>ε</code>, but lives within the neighborhood of a Core Point. It is part of the cluster's boundary.</li>
  <li><strong>Noise Point:</strong> Neither a Core nor a Border point. Flagged with cluster label <code>-1</code>!</li>
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Hierarchical clustering constructs a multi-scale tree of nested clusters (a Dendrogram). You don't need to specify K in advance; simply cut the tree at the desired resolution height.
</div>

<h3>Linkage Strategies</h3>
<p>The choice of linkage distanceD(A, B)governs cluster morphology:</p>
<ul>
  <li><strong>Ward's Linkage:</strong> Merges clusters that minimize the increase in total within-cluster variance. Produces clean, compact clusters.</li>
  <li><strong>Single Linkage:</strong>min_{a ∈ A, b ∈ B} d(a, b). Vulnerable to "chaining" where thin strings of noise bridge disparate clusters.</li>
  <li><strong>Complete Linkage:</strong>max_{a ∈ A, b ∈ B} d(a, b). Enforces tight diameter bounds.</li>
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Without ground-truth labels, how do you evaluate clustering quality? Intrinsic validation metrics evaluate compactness (samples close to their cluster center) versus separation (clusters far apart from each other).
</div>

<h3>The Silhouette Score:s ∈ [-1, +1]</h3>
<p>For each samplei, leta(i)be the mean distance to all other points in the same cluster, andb(i)be the mean distance to points in the nearest neighbor cluster:</p>
<pre class="ascii-diagram">
s(i) = [ b(i) - a(i) ] / max( a(i), b(i) )
</pre>
<ul>
  <li><strong>s approx +1:</strong> Sample is far from neighboring clusters and tightly bound to its own.</li>
  <li><strong>s approx 0:</strong> Sample lies directly on the boundary between two clusters.</li>
  <li><strong>s < 0:</strong> Sample was likely assigned to the wrong cluster.</li>
</ul>
`
      },
      {
        "title": "Non-Linear Visual Embeddings: t-SNE (Perplexity & Student-t)",
        "language": "python",
        "starterCode": `import numpy as np

# t-SNE uses Student-t distribution in low-dimensional space:
# q_ij = (1 + ||y_i - y_j||²)^-1 / ∑_k∑_l (1 + ||y_k - y_l||²)^-1
# Heavy tails solve the 'Crowding Problem'!
print("t-SNE: Minimizes KL divergence D_KL(P || Q) between high-D and low-D probabilities.")
`,
        "content": `
<h2>🔍 Lesson 6: Non-Linear Visual Embeddings: t-SNE (Perplexity & Student-t)</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  PCA can only perform linear rotations and projections. t-SNE (t-Distributed Stochastic Neighbor Embedding) captures complex manifold topology by matching pairwise Gaussian probabilities in high dimensions with heavy-tailed Student-t probabilities in 2D.
</div>

<h3>The Crowding Problem & Student-t Solution</h3>
<p>In high dimensions, the volume of a sphere expands exponentially, leaving vast room for moderately distant points. When projected into 2D, all these points crowd together into the center. By using a heavy-tailed Cauchy/Student-t distribution (1 / (1 + d^2)) in 2D, moderate distances in high dimensions are pushed outward, creating distinct separated visual islands.</p>
`
      },
      {
        "title": "UMAP (Uniform Manifold Approximation and Projection) & Topological Data Analysis",
        "language": "python",
        "starterCode": `import numpy as np

# UMAP preserves both local AND global structure better than t-SNE
print("UMAP advantages over t-SNE:")
print("1. Significantly faster runtime (O(N^1.14) vs O(N²)).")
print("2. Preserves global topology (macro cluster relationships).")
print("3. Supports projecting new unseen test samples into existing embeddings.")
`,
        "content": `
<h2>🔍 Lesson 7: UMAP & Topological Data Analysis</h2>

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Built on Riemannian geometry and algebraic topology, UMAP models data as a fuzzy simplicial complex. It is dramatically faster than t-SNE and preserves global manifold structure.
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

<div class="teacher-callout teacher-callout--intuition">
  <strong>💡 The Teacher's Perspective:</strong><br />
  Instead of modeling what normal data looks like and flagging deviations, Isolation Forests exploit the core nature of anomalies: they are 'few and different' and thus require far fewer random splits to isolate.
</div>

<h3>Isolation Forest Path Lengths</h3>
<p>An Isolation Tree randomly selects a feature and a random split value between that feature's min and max. Because anomalies sit in low-density sparse regions, random cuts isolate them near the root of the tree. The anomaly score is a function of the average path lengthh(x)across all random trees:</p>
<pre class="ascii-diagram">
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
<p>Implement <code>evaluate_k_clusters(X, k_values)</code> that fits K-Means across multiple <em>K</em> candidates and returns the best <em>K</em> that maximizes the mean Silhouette score.</p>
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
        "expectedOutput": "Optimal Cluster Count K: 3nPeak Silhouette Score: 0.75",
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
