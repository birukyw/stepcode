import { Fragment, useState } from 'react';
import { Icon } from './art/Illustrations';

// Small markdown subset used by lesson bodies:
//   # ## ### headings, paragraphs, - bullets, 1. numbered lists, | tables |
//   > callouts  (start with **Tip:** / **Warning:** / **Why it matters:** / **Note:**)
//   ```python ... ```   runnable snippet ("Open in editor"); ```python error  = raises on purpose
//   ```python local     code that needs real threads or processes: shows "Copy" instead of "Open in editor"
//   ```text ... ```     plain output, not runnable
//   +++ Title ... +++   collapsible block (used for solutions)
//   **bold**  *italic*  `inline code`

const BOLD = '\\*\\*(?:`[^`]*`|[^*`])+\\*\\*';
const ITAL = '\\*(?!\\s)(?:`[^`]*`|[^*`])+\\*';
const INLINE_RE = new RegExp('(`[^`]+`|' + BOLD + '|' + ITAL + ')', 'g');

function inline(text, keyPrefix = '') {
  return text.split(INLINE_RE).map((part, i) => {
    const key = keyPrefix + i;
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{inline(part.slice(2, -2), key + 'b')}</strong>;
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={key}>{inline(part.slice(1, -1), key + 'i')}</em>;
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

const CALLOUT = /^\*\*(Tip|Warning|Why it matters|Note|Watch out|Remember|Challenge):\*\*\s*/;

function parse(src) {
  const lines = src.replace(/\r\n/g, '\n').trim().split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith('+++ ')) {
      const title = line.slice(4).trim();
      const inner = [];
      i++;
      while (i < lines.length && lines[i].trim() !== '+++') inner.push(lines[i++]);
      i++;
      blocks.push({ type: 'details', title, body: inner.join('\n') });
      continue;
    }

    const fence = line.match(/^```(\w*)\s*(\w*)/);
    if (fence) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      blocks.push({ type: 'code', lang: fence[1] || 'python', flag: fence[2], text: code.join('\n') });
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)/);
    if (h) { blocks.push({ type: 'h', level: h[1].length, text: h[2] }); i++; continue; }

    if (line.startsWith('>')) {
      const q = [];
      while (i < lines.length && lines[i].startsWith('>')) q.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push({ type: 'quote', text: q.join(' ') });
      continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
      blocks.push({ type: 'table', head: cells(rows[0]), rows: rows.slice(2).map(cells) });
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, ''));
      blocks.push({ type: 'list', items });
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ''));
      blocks.push({ type: 'olist', items });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(```|\+\+\+|#{1,3}\s|>|\||[-*]\s|\d+\.\s)/.test(lines[i])) para.push(lines[i++]);
    blocks.push({ type: 'p', text: para.join(' ') });
  }
  return blocks;
}

function QuizCard({ data }) {
  const [picked, setPicked] = useState(null);
  const done = picked !== null;
  return (
    <aside className="qcard">
      <p className="qcard__label">Quick check</p>
      <p className="qcard__q">{inline(data.q)}</p>
      {data.code && <pre className="qcard__code"><code>{data.code}</code></pre>}
      <ul className="qcard__opts">
        {data.options.map((o, i) => (
          <li key={i}>
            <button type="button" disabled={done} onClick={() => setPicked(i)}
              className={`qcard__opt ${done ? (i === data.answer ? 'is-right' : i === picked ? 'is-wrong' : 'is-dim') : ''}`}>
              {inline(o)}
            </button>
          </li>
        ))}
      </ul>
      {done && <p className={`qcard__why ${picked === data.answer ? 'is-right' : 'is-wrong'}`}><strong>{picked === data.answer ? 'Correct. ' : 'Not quite. '}</strong>{inline(data.explain)}</p>}
    </aside>
  );
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };
  return <button type="button" onClick={copy}>{done ? 'Copied' : 'Copy code'}</button>;
}

export default function Markdown({ source, onRunSnippet, nested = false }) {
  return (
    <div className={nested ? 'article article--nested' : 'article'}>
      {parse(source).map((b, idx) => {
        switch (b.type) {
          case 'h': {
            const Tag = `h${b.level}`;
            return <Tag key={idx}>{inline(b.text)}</Tag>;
          }
          case 'p':
            return <p key={idx}>{inline(b.text)}</p>;
          case 'quote': {
            const m = b.text.match(CALLOUT);
            const kind = m ? (m[1] === 'Warning' || m[1] === 'Watch out' ? 'warn' : m[1] === 'Why it matters' ? 'why' : m[1] === 'Challenge' ? 'challenge' : 'tip') : 'tip';
            return (
              <aside className={`callout callout--${kind}`} key={idx}>
                {m && <strong className="callout__label"><Icon name={kind === 'warn' ? 'flag' : kind === 'why' ? 'star' : kind === 'challenge' ? 'trophy' : 'bolt'} size={16} /> {m[1]}</strong>}
                <span>{inline(m ? b.text.replace(CALLOUT, '') : b.text)}</span>
              </aside>
            );
          }
          case 'list':
            return <ul key={idx}>{b.items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ul>;
          case 'olist':
            return <ol key={idx}>{b.items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ol>;
          case 'table':
            return (
              <div className="article__table" key={idx}>
                <table>
                  <thead><tr>{b.head.map((c, j) => <th key={j}>{inline(c)}</th>)}</tr></thead>
                  <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{inline(c)}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
          case 'details':
            return (
              <details className="solution" key={idx}>
                <summary>{b.title}</summary>
                <Markdown source={b.body} onRunSnippet={onRunSnippet} nested />
              </details>
            );
          case 'code': {
            if (b.lang === 'quiz') {
              try { return <QuizCard key={idx} data={JSON.parse(b.text)} />; } catch { return null; }
            }
            const isLocal = b.flag === 'local';
            const runnable = (b.lang === 'python' || b.lang === 'java') && onRunSnippet && !isLocal;
            return (
              <figure className={`snippet ${b.lang === 'text' ? 'snippet--out' : ''}`} key={idx}>
                <figcaption>
                  <span>{b.lang === 'text' ? 'output' : b.lang}{b.flag === 'error' ? ' · raises an error' : ''}{isLocal ? ' · run it on your computer' : ''}</span>
                  {runnable && (
                    <button type="button" onClick={() => onRunSnippet(b.text, b.lang)}>Open in editor</button>
                  )}
                  {isLocal && <CopyButton text={b.text} />}
                </figcaption>
                <pre><code>{b.text}</code></pre>
              </figure>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
