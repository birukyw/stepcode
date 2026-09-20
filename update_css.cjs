const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Add Themes
const themes = `
/* ─── Themes ──────────────────────────────────────────────────── */
[data-theme="neon"] {
  --bg-body:       #0d0221;
  --bg-nav:        #13032b;
  --bg-card:       #19053b;
  --bg-card-hover: #22084c;
  --bg-editor:     #090117;
  --bg-terminal:   #060111;
  --bg-input:      #200a45;

  --border:        #ff2a6d;
  --border-light:  #ff5b8c;
  --border-dim:    #7a0f30;

  --cyan:          #05d9e8;
  --green:         #01ffc3;
  --green-bright:  #3bffd4;
  --yellow:        #f3e600;
  --yellow-dim:    #b3a900;
  --red:           #ff2a6d;
  --blue:          #01a2ff;
  --purple:        #d901ff;
  --orange:        #ff7b00;
  --white:         #f0f6fc;
}

[data-theme="synthwave"] {
  --bg-body:       #1a1a2e;
  --bg-nav:        #16213e;
  --bg-card:       #0f3460;
  --bg-card-hover: #14437a;
  --bg-editor:     #131324;
  --bg-terminal:   #0d0d19;
  --bg-input:      #1c4075;

  --border:        #e94560;
  --border-light:  #f0697f;
  --border-dim:    #822736;

  --cyan:          #4fc3f7;
  --green:         #4caf50;
  --green-bright:  #66bb6a;
  --yellow:        #f7c948;
  --yellow-dim:    #b59334;
  --red:           #e94560;
  --blue:          #42a5f5;
  --purple:        #ab47bc;
  --orange:        #ff9800;
  --white:         #e1e8f0;
}

[data-theme="forest"] {
  --bg-body:       #0a1a0a;
  --bg-nav:        #0f260f;
  --bg-card:       #143314;
  --bg-card-hover: #1a401a;
  --bg-editor:     #050d05;
  --bg-terminal:   #030803;
  --bg-input:      #1a401a;

  --border:        #00ff41;
  --border-light:  #4dff79;
  --border-dim:    #008020;

  --cyan:          #00ffcc;
  --green:         #00ff41;
  --green-bright:  #4dff79;
  --yellow:        #ffb300;
  --yellow-dim:    #b37d00;
  --red:           #ff3333;
  --blue:          #3399ff;
  --purple:        #cc33ff;
  --orange:        #ff9933;
  --white:         #e0ffe0;
}

[data-theme="arctic"] {
  --bg-body:       #e8ecf1;
  --bg-nav:        #d1dbe5;
  --bg-card:       #ffffff;
  --bg-card-hover: #f5f8fa;
  --bg-editor:     #f8fafd;
  --bg-terminal:   #eef2f6;
  --bg-input:      #f0f4f8;

  --border:        #cbd5e1;
  --border-light:  #94a3b8;
  --border-dim:    #e2e8f0;

  --cyan:          #0284c7;
  --green:         #16a34a;
  --green-bright:  #22c55e;
  --yellow:        #d97706;
  --yellow-dim:    #b45309;
  --red:           #e53e3e;
  --blue:          #1d4ed8;
  --purple:        #9333ea;
  --orange:        #ea580c;
  --white:         #1e293b;
  
  --text-secondary:#64748b;
  --text-dim:      #94a3b8;
}

/* Base default (Midnight) stays in :root, text colors for arctic overriden above */
[data-theme="arctic"] body {
  color: var(--white); /* which is dark #1e293b in this theme */
}
`;

css = css.replace(/(--nav-height:\s*56px;\s*\n\s*--sidebar-width:\s*300px;\s*\n})/, "$1\n" + themes);

// 2. Fix pixel font line-height & letter-spacing
css = css.replace(/line-height:\s*1\.5;/, "line-height: 2.2;\n  letter-spacing: 2px;");

// 3. Reduce pixel font font-sizes.
// We'll target specific pixel font selectors we know
// Let's use string replacements for the specific known font-sizes
css = css.replace(/\.navbar__title {([\s\S]*?)font-size:\s*16px;/, ".navbar__title {$1font-size: 13px;");
css = css.replace(/\.course-hero__badge {([\s\S]*?)font-size:\s*10px;/, ".course-hero__badge {$1font-size: 8px;");
css = css.replace(/\.course-hero__title {([\s\S]*?)font-size:\s*clamp\(18px,\s*3vw,\s*28px\);/, ".course-hero__title {$1font-size: clamp(14px, 2.5vw, 22px);");
css = css.replace(/\.course-hero__cta {([\s\S]*?)font-size:\s*14px;/, ".course-hero__cta {$1font-size: 11px;");
css = css.replace(/\.chapter-number {([\s\S]*?)font-size:\s*14px;/, ".chapter-number {$1font-size: 11px;");
css = css.replace(/\.chapter-title {([\s\S]*?)font-size:\s*16px;/, ".chapter-title {$1font-size: 13px;");
css = css.replace(/\.sidebar-card__title {([\s\S]*?)font-size:\s*13px;/, ".sidebar-card__title {$1font-size: 10px;");
css = css.replace(/\.lesson-bottom-bar__title {([\s\S]*?)font-size:\s*16px;/, ".lesson-bottom-bar__title {$1font-size: 12px;");
css = css.replace(/\.terminal-header {([\s\S]*?)font-size:\s*13px;/, ".terminal-header {$1font-size: 10px;");
css = css.replace(/\.editor-tab {([\s\S]*?)font-size:\s*13px;/, ".editor-tab {$1font-size: 10px;");
css = css.replace(/\.btn {([\s\S]*?)font-size:\s*14px;/, ".btn {$1font-size: 11px;");
css = css.replace(/\.phase-page__title {([\s\S]*?)font-size:\s*32px;/, ".phase-page__title {$1font-size: 24px;");

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS updated successfully.');
