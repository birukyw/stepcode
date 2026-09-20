import { useState, useEffect, useRef } from 'react';

const GLITCH_CHARS = '01<>/\\#$*!?_~^%&{}[]=+-';

/**
 * Cyberpunk Coding Glitch Header Component
 * @param {string} as - HTML tag to render ('h1', 'h2', 'h3', 'span', 'div')
 * @param {string} text - Text to display and animate
 * @param {string} className - Additional CSS class names
 * @param {boolean} scramble - Whether to trigger the hacker decode scramble on load
 * @param {object} style - Inline styles
 */
export default function GlitchHeader({
  as: Component = 'h1',
  text = '',
  children,
  className = '',
  scramble = true,
  style = {},
  ...props
}) {
  const content = text || (typeof children === 'string' ? children : '');
  const [displayText, setDisplayText] = useState(content);
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    if (!content || !scramble) {
      setDisplayText(content);
      return;
    }

    let iteration = 0;
    const maxIterations = content.length;
    setIsGlitching(true);

    const interval = setInterval(() => {
      setDisplayText(() => {
        return content
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return content[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('');
      });

      iteration += 1 / 2; // Smooth gradual reveal

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(content);
        setTimeout(() => setIsGlitching(false), 300);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [content, scramble]);

  const handleMouseEnter = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  const finalClass = [
    'cyber-glitch-header',
    isGlitching ? 'is-glitching' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={finalClass}
      data-text={content}
      onMouseEnter={handleMouseEnter}
      style={style}
      {...props}
    >
      {children && typeof children !== 'string' ? children : displayText}
    </Component>
  );
}
