// Split a lesson into short "pages" at ## headings so no page is a wall of text.
const LIMIT = 2400; // characters per page, roughly one screen of reading plus code
const FORCE_NEW = /^(Practice|Recap)\b/;

export function splitPages(md) {
  const lines = md.replace(/\r\n/g, '\n').trim().split('\n');
  const sections = [];
  let cur = [];
  let fence = false;
  lines.forEach((line) => {
    if (line.startsWith('```')) fence = !fence;
    if (!fence && /^## /.test(line) && cur.length) { sections.push(cur.join('\n')); cur = []; }
    cur.push(line);
  });
  if (cur.length) sections.push(cur.join('\n'));

  const pages = [];
  let page = '';
  sections.forEach((sec, i) => {
    const title = (sec.match(/^## (.*)/) || [])[1] || '';
    const forceNew = FORCE_NEW.test(title) && !/^Recap/.test(title);
    if (page && (page.length + sec.length > LIMIT || forceNew)) { pages.push(page); page = ''; }
    page += (page ? '\n\n' : '') + sec;
    if (i === sections.length - 1) pages.push(page);
  });
  return pages.length ? pages : [md];
}
