const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Add "lemon" theme (light yellow + light green)
const newTheme = `
[data-theme="lemon"] {
  --bg-body:       #fffde7;
  --bg-nav:        #fff9c4;
  --bg-card:       #ffffff;
  --bg-card-hover: #f1f8e9;
  --bg-editor:     #fafafa;
  --bg-terminal:   #f5f5f5;
  --bg-input:      #f9fbe7;

  --border:        #cddc39;
  --border-light:  #dce775;
  --border-dim:    #e6ee9c;

  --cyan:          #8bc34a;
  --green:         #4caf50;
  --green-bright:  #81c784;
  --yellow:        #ffeb3b;
  --yellow-dim:    #fbc02d;
  --red:           #e57373;
  --blue:          #64b5f6;
  --purple:        #ba68c8;
  --orange:        #ffb74d;
  
  --white:         #1b5e20; /* Dark green for text readability on light bg */
  --text-secondary:#388e3c;
  --text-dim:      #81c784;
}

[data-theme="lemon"] body {
  color: var(--white);
}

/* 2. Text Gradients for themes (duo/trio palettes for fonts) */
[data-theme="neon"] .text-pixel, [data-theme="neon"] [style*="font-pixel"],
[data-theme="neon"] .navbar__title, [data-theme="neon"] .course-hero__title, [data-theme="neon"] .chapter-title, [data-theme="neon"] .phase-page__title {
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="synthwave"] .text-pixel, [data-theme="synthwave"] [style*="font-pixel"],
[data-theme="synthwave"] .navbar__title, [data-theme="synthwave"] .course-hero__title, [data-theme="synthwave"] .chapter-title, [data-theme="synthwave"] .phase-page__title {
  background: linear-gradient(90deg, var(--red), var(--yellow), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="forest"] .text-pixel, [data-theme="forest"] [style*="font-pixel"],
[data-theme="forest"] .navbar__title, [data-theme="forest"] .course-hero__title, [data-theme="forest"] .chapter-title, [data-theme="forest"] .phase-page__title {
  background: linear-gradient(90deg, var(--green-bright), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="arctic"] .text-pixel, [data-theme="arctic"] [style*="font-pixel"],
[data-theme="arctic"] .navbar__title, [data-theme="arctic"] .course-hero__title, [data-theme="arctic"] .chapter-title, [data-theme="arctic"] .phase-page__title {
  background: linear-gradient(90deg, var(--blue), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme="lemon"] .text-pixel, [data-theme="lemon"] [style*="font-pixel"],
[data-theme="lemon"] .navbar__title, [data-theme="lemon"] .course-hero__title, [data-theme="lemon"] .chapter-title, [data-theme="lemon"] .phase-page__title {
  background: linear-gradient(90deg, #1b5e20, #8bc34a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`;

css = css.replace(/(\[data-theme="arctic"\] body {\s*color: var\(--white\);\s*\/\* which is dark #1e293b in this theme \*\/\s*})/, "$1\n\n" + newTheme);

// 3. Borders - increase rounding
css = css.replace(/--radius:\s*8px;/, "--radius: 14px;");
css = css.replace(/--radius-lg:\s*12px;/, "--radius-lg: 20px;");

// 4. Make fonts taller and thinner
// Using transform: scaleY(1.3) scaleX(0.85)
const fontStretch = `
  transform: scaleY(1.3) scaleX(0.85);
  display: inline-block;
  transform-origin: left center;
`;
// Let's add this to the main pixel font selector block. We will replace letter-spacing as well.
css = css.replace(/line-height:\s*2\.2;\n\s*letter-spacing:\s*2px;/, "line-height: 2.5;\n  letter-spacing: 1px;\n" + fontStretch);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS tweaked successfully.');
