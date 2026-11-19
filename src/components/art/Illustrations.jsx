
/* Vector illustrations: line icons, generative track art, hero composition. */

const ICON_PATHS = {
  book: 'M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4zM8 8h6M8 12h6',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  brackets: 'M9 4H6v16h3M15 4h3v16h-3',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  cpu: 'M7 7h10v10H7zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
  graph: 'M4 20V4M4 20h16M8 15l4-5 3 3 5-7',
  spark: 'M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3',
  check: 'M5 12l5 5 9-10',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  quiz: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  play: 'M7 5l12 7-12 7V5z',
  terminal: 'M4 5h16v14H4zM8 10l3 2-3 2M13 15h4',
  flame: 'M12 3c.8 3.2 4.5 4.8 4.5 9.2a4.5 4.5 0 0 1-9 0c0-2 .9-3.3 2-4.4.2 1.6.9 2.4 1.9 2.7C11 8.6 11.3 5.8 12 3z',
  bolt: 'M13 3 5 13.5h5.5L9.5 21 19 9.5h-5.5L13 3z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5.5a2.5 2.5 0 0 0 2.5 4M16 6h2.5a2.5 2.5 0 0 1-2.5 4M12 13v4M9 20h6M10 17h4',
  gear: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19.4 13.5l1.6 1.2-1.6 2.8-1.9-.6a7 7 0 0 1-1.6 1l-.4 2h-3.2l-.4-2a7 7 0 0 1-1.6-1l-1.9.6-1.6-2.8 1.6-1.2a7 7 0 0 1 0-2l-1.6-1.2 1.6-2.8 1.9.6a7 7 0 0 1 1.6-1l.4-2h3.2l.4 2a7 7 0 0 1 1.6 1l1.9-.6 1.6 2.8-1.6 1.2a7 7 0 0 1 0 2z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  puzzle: 'M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4H4a2 2 0 1 1 0-4h2V6h4V4z',
};

export function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name] || ICON_PATHS.code} />
    </svg>
  );
}

const TOKENS = {
  kw: 'tok-kw', fn: 'tok-fn', str: 'tok-str', com: 'tok-com',
};

/** Hero composition: tilted editor + terminal over a horizon grid. */
export function HeroArt() {
  return (
    <div className="heroart" aria-hidden="true">
      <div className="heroart__stack">
        <div className="hcard hcard--lesson">
          <span className="hcard__label">1.1.1 The Sequential Machine</span>
          <i className="hcard__bar"><b style={{ width: '38%' }} /></i>
        </div>

        <div className="hcard hcard--code">
          <div className="hcard__top"><i /><i /><i /><span>main.py</span></div>
          <pre>
            <span className={TOKENS.kw}>def</span> <span className={TOKENS.fn}>greet</span>(name):{'\n'}
            {'    '}<span className={TOKENS.kw}>return</span> <span className={TOKENS.str}>f"Hello, {'{'}name{'}'}"</span>{'\n'}
            {'\n'}
            <span className={TOKENS.kw}>for</span> n <span className={TOKENS.kw}>in</span> [<span className={TOKENS.str}>"Ada"</span>, <span className={TOKENS.str}>"Linus"</span>]:{'\n'}
            {'    '}<span className={TOKENS.fn}>print</span>(greet(n))
          </pre>
        </div>

        <div className="hcard hcard--term">
          <div className="hcard__top"><span>Terminal</span><em>ran in 0.04s</em></div>
          <pre><span className="tok-prompt">$</span> python main.py{'\n'}Hello, Ada{'\n'}Hello, Linus</pre>
        </div>
      </div>
    </div>
  );
}

export const MODULE_ICON_NAMES = ['code', 'brackets', 'layers', 'target', 'flask', 'graph', 'cpu', 'flag', 'book', 'spark'];
