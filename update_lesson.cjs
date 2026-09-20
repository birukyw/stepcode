const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'LessonPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes("import Split")) {
  content = content.replace(/import \{ runCode \} from '\.\.\/utils\/api';/, "import { runCode } from '../utils/api';\nimport Split from 'react-split';");
}

// Replace layout wrapper
content = content.replace(/<div className="lesson-layout">/, '<Split className="lesson-layout" sizes={[40, 60]} gutterSize={8} snapOffset={0}>');
content = content.replace(/<\/div>\s*\{\/\* Bottom bar \*\/\}/, '</Split>\n\n      {/* Bottom bar */}');

// Group editor parts and terminal for vertical split
content = content.replace(
  /<div className="lesson-panel-right">([\s\S]*?)<div className="terminal-panel">/, 
  '<Split className="lesson-panel-right" direction="vertical" sizes={[70, 30]} gutterSize={8} snapOffset={0}>\n          <div style={{ display: \'flex\', flexDirection: \'column\', height: \'100%\', minHeight: 0 }}>\n$1          </div>\n\n          <div className="terminal-panel">'
);

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Bottom bar \*\/\}/, 
  '</div>\n          </Split>\n      </Split>\n\n      {/* Bottom bar */}'
);

// Update terminal placeholder text
content = content.replace(
  /<span className="terminal-placeholder__icon">.*?<\/span>\s*Click <strong>Run<\/strong> to view your results/s,
  '<span className="terminal-placeholder__icon">&lt; &gt;</span>\n                  Click <strong>Run</strong> to view your results'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('LessonPage layout updated.');
