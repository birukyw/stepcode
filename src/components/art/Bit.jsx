/* Bit, the StepCode guide: the original pixel-art robot. Rows of characters, '.' is transparent.
   mood: idle | happy | wink | think | read | cheer | sad */

const PAL = { d: '#0a0b17', k: '#1a1530', y: '#ffd84d', p: '#8b6cff', e: '#ffffff', P: '#5b3fd1', m: '#7ef0d8' };

const FACES = {
  idle: ['.dpeeppeepd.', '.dpkkppkkpd.', '.dpkkppkkpd.', '.dppkkkkppd.'],
  blink: ['.dppppppppd.', '.dpkkppkkpd.', '.dppppppppd.', '.dppkkkkppd.'],
  wink: ['.dpeeppeepd.', '.dpkkppkkpd.', '.dpkkpppppd.'.padEnd(12, '.'), '.dppkkkkppd.'],
  sad: ['.dpeeppeepd.', '.dpkkppkkpd.', '.dppppppppd.', '.dpppkkpppd.'],
  think: ['.dpeeppeepd.', '.dpkkppkkpd.', '.dpkkppkkpd.', '.dpppkkpppd.'],
};
FACES.happy = FACES.idle; FACES.read = FACES.think; FACES.cheer = FACES.idle;


const rowsFor = (face) => [
  '.....yy.....', '.....dd.....', '..dddddddd..', '.dppppppppd.',
  ...face,
  '.dppppppppd.', '..dddddddd..', '...dd..dd...', '..ddd..ddd..',
];

function Grid({ rows }) {
  const out = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const c = PAL[row[x]];
      if (c) out.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c} />);
    }
  });
  return out;
}

export default function Bit({ mood = 'idle', size = 56, float = false, title, className = '' }) {
  const face = FACES[mood] || FACES.idle;
  const h = Math.round((size * 13) / 12);
  return (
    <svg
      className={`bit-svg ${float ? 'bit-svg--float' : ''} bit-svg--${mood} ${className}`}
      viewBox="0 0 12 13" width={size} height={h} shapeRendering="crispEdges"
      role={title ? 'img' : 'presentation'} aria-label={title} aria-hidden={title ? undefined : true}
    >
      <g><Grid rows={rowsFor(face)} /></g>
      {mood === 'idle' && (
        <g className="bit__eyes-blink"><Grid rows={rowsFor(FACES.blink)} /></g>
      )}
    </svg>
  );
}
