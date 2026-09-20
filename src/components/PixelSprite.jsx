/**
 * PixelSprite: Ultra-crisp 16-bit retro arcade pixel art SVGs
 * Rendered with shapeRendering="crispEdges" to guarantee sharp pixels.
 */
export default function PixelSprite({
  name = 'bot',
  size = 20,
  animated = false,
  className = '',
  style = {},
}) {
  const pixelClass = [
    'pixel-sprite',
    `pixel-sprite--${name}`,
    animated ? 'pixel-sprite--animated' : '',
    className,
  ].filter(Boolean).join(' ');

  const renderSvg = () => {
    switch (name) {
      case 'bot': // Cyber companion droid with cyan visor & antenna
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Antenna */}
            <rect x="7" y="0" width="2" height="2" fill="#00f0ff" />
            <rect x="7" y="2" width="2" height="2" fill="#8899aa" />
            {/* Head */}
            <rect x="3" y="4" width="10" height="7" fill="#1e293b" />
            <rect x="2" y="5" width="12" height="5" fill="#1e293b" />
            {/* Ears */}
            <rect x="1" y="6" width="1" height="3" fill="#00f0ff" />
            <rect x="14" y="6" width="1" height="3" fill="#00f0ff" />
            {/* Visor Screen */}
            <rect x="4" y="6" width="8" height="3" fill="#001828" />
            <rect x="5" y="7" width="2" height="1" fill="#00f0ff" />
            <rect x="9" y="7" width="2" height="1" fill="#00f0ff" />
            {/* Neck */}
            <rect x="7" y="11" width="2" height="1" fill="#475569" />
            {/* Body */}
            <rect x="4" y="12" width="8" height="3" fill="#0f172a" />
            <rect x="6" y="13" width="4" height="1" fill="#ff0055" />
            <rect x="5" y="15" width="2" height="1" fill="#00f0ff" />
            <rect x="9" y="15" width="2" height="1" fill="#00f0ff" />
          </svg>
        );

      case 'cat': // 16-bit cyber cat with green visor
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Ears */}
            <rect x="3" y="2" width="2" height="3" fill="#f59e0b" />
            <rect x="11" y="2" width="2" height="3" fill="#f59e0b" />
            <rect x="4" y="3" width="1" height="1" fill="#fed7aa" />
            <rect x="11" y="3" width="1" height="1" fill="#fed7aa" />
            {/* Head */}
            <rect x="3" y="5" width="10" height="5" fill="#f59e0b" />
            <rect x="2" y="6" width="12" height="3" fill="#f59e0b" />
            {/* Eyes / Visor */}
            <rect x="4" y="6" width="2" height="2" fill="#10b981" />
            <rect x="10" y="6" width="2" height="2" fill="#10b981" />
            {/* Nose / Mouth */}
            <rect x="7" y="8" width="2" height="1" fill="#fb7185" />
            {/* Body */}
            <rect x="4" y="10" width="8" height="4" fill="#d97706" />
            {/* Paws */}
            <rect x="4" y="14" width="2" height="2" fill="#fed7aa" />
            <rect x="10" y="14" width="2" height="2" fill="#fed7aa" />
            {/* Tail */}
            <rect x="13" y="10" width="1" height="3" fill="#f59e0b" />
            <rect x="14" y="9" width="1" height="2" fill="#f59e0b" />
          </svg>
        );

      case 'coffee': // Retro steaming coffee mug
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Steam */}
            <rect x="5" y="1" width="1" height="2" fill="#94a3b8" />
            <rect x="6" y="2" width="1" height="2" fill="#cbd5e1" />
            <rect x="9" y="0" width="1" height="2" fill="#94a3b8" />
            <rect x="10" y="2" width="1" height="2" fill="#cbd5e1" />
            {/* Mug Body */}
            <rect x="3" y="5" width="8" height="9" fill="#ef4444" />
            <rect x="4" y="6" width="6" height="2" fill="#78350f" />
            <rect x="4" y="14" width="6" height="1" fill="#b91c1c" />
            {/* Mug Handle */}
            <rect x="11" y="6" width="3" height="1" fill="#b91c1c" />
            <rect x="13" y="7" width="1" height="4" fill="#b91c1c" />
            <rect x="11" y="11" width="3" height="1" fill="#b91c1c" />
          </svg>
        );

      case 'bug': // Glitch bug / virus monster
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Antennae */}
            <rect x="4" y="1" width="1" height="2" fill="#ef4444" />
            <rect x="3" y="0" width="1" height="1" fill="#ef4444" />
            <rect x="11" y="1" width="1" height="2" fill="#ef4444" />
            <rect x="12" y="0" width="1" height="1" fill="#ef4444" />
            {/* Head & Body */}
            <rect x="4" y="3" width="8" height="9" fill="#991b1b" />
            <rect x="5" y="4" width="6" height="7" fill="#dc2626" />
            {/* Glowing Eyes */}
            <rect x="5" y="5" width="2" height="2" fill="#fef08a" />
            <rect x="9" y="5" width="2" height="2" fill="#fef08a" />
            <rect x="6" y="6" width="1" height="1" fill="#b91c1c" />
            <rect x="10" y="6" width="1" height="1" fill="#b91c1c" />
            {/* Legs */}
            <rect x="2" y="5" width="2" height="1" fill="#ef4444" />
            <rect x="1" y="6" width="1" height="2" fill="#ef4444" />
            <rect x="12" y="5" width="2" height="1" fill="#ef4444" />
            <rect x="14" y="6" width="1" height="2" fill="#ef4444" />
            <rect x="2" y="9" width="2" height="1" fill="#ef4444" />
            <rect x="1" y="10" width="1" height="2" fill="#ef4444" />
            <rect x="12" y="9" width="2" height="1" fill="#ef4444" />
            <rect x="14" y="10" width="1" height="2" fill="#ef4444" />
          </svg>
        );

      case 'trophy': // 8-bit golden cyber trophy
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Cup */}
            <rect x="4" y="2" width="8" height="6" fill="#eab308" />
            <rect x="5" y="3" width="6" height="4" fill="#facc15" />
            {/* Sparkle */}
            <rect x="6" y="4" width="2" height="2" fill="#ffffff" />
            {/* Handles */}
            <rect x="2" y="3" width="2" height="1" fill="#ca8a04" />
            <rect x="2" y="4" width="1" height="3" fill="#ca8a04" />
            <rect x="3" y="7" width="1" height="1" fill="#ca8a04" />
            <rect x="12" y="3" width="2" height="1" fill="#ca8a04" />
            <rect x="13" y="4" width="1" height="3" fill="#ca8a04" />
            <rect x="12" y="7" width="1" height="1" fill="#ca8a04" />
            {/* Stem & Base */}
            <rect x="7" y="8" width="2" height="3" fill="#ca8a04" />
            <rect x="4" y="11" width="8" height="2" fill="#a16207" />
            <rect x="3" y="13" width="10" height="2" fill="#713f12" />
          </svg>
        );

      case 'sword': // 8-bit broadsword
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Tip & Blade */}
            <rect x="13" y="1" width="2" height="2" fill="#00f0ff" />
            <rect x="11" y="3" width="3" height="2" fill="#38bdf8" />
            <rect x="9" y="5" width="3" height="2" fill="#7dd3fc" />
            <rect x="7" y="7" width="3" height="2" fill="#bae6fd" />
            {/* Center light core */}
            <rect x="11" y="2" width="2" height="2" fill="#ffffff" />
            <rect x="9" y="4" width="2" height="2" fill="#ffffff" />
            <rect x="7" y="6" width="2" height="2" fill="#ffffff" />
            {/* Crossguard */}
            <rect x="4" y="8" width="3" height="1" fill="#f59e0b" />
            <rect x="7" y="9" width="3" height="2" fill="#f59e0b" />
            <rect x="6" y="10" width="3" height="1" fill="#b45309" />
            {/* Hilt */}
            <rect x="3" y="11" width="2" height="2" fill="#78350f" />
            <rect x="1" y="13" width="2" height="2" fill="#b45309" />
            <rect x="0" y="14" width="2" height="2" fill="#f59e0b" />
          </svg>
        );

      case 'chest': // RPG loot chest
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Lid */}
            <rect x="2" y="3" width="12" height="5" fill="#854d0e" />
            <rect x="2" y="3" width="12" height="1" fill="#facc15" />
            <rect x="2" y="7" width="12" height="1" fill="#facc15" />
            <rect x="2" y="3" width="1" height="5" fill="#facc15" />
            <rect x="13" y="3" width="1" height="5" fill="#facc15" />
            {/* Body */}
            <rect x="2" y="8" width="12" height="6" fill="#713f12" />
            <rect x="2" y="8" width="1" height="6" fill="#ca8a04" />
            <rect x="13" y="8" width="1" height="6" fill="#ca8a04" />
            <rect x="2" y="13" width="12" height="1" fill="#ca8a04" />
            {/* Lock / Rune */}
            <rect x="7" y="6" width="2" height="3" fill="#00f0ff" />
          </svg>
        );

      case 'potion': // Mana / Health potion bottle
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Cork */}
            <rect x="6" y="1" width="4" height="2" fill="#a16207" />
            {/* Neck */}
            <rect x="6" y="3" width="4" height="2" fill="#94a3b8" />
            {/* Bottle Body */}
            <rect x="4" y="5" width="8" height="9" fill="#0284c7" />
            <rect x="3" y="7" width="10" height="6" fill="#0369a1" />
            {/* Liquid Highlight */}
            <rect x="5" y="8" width="2" height="4" fill="#38bdf8" />
            <rect x="5" y="6" width="1" height="1" fill="#e0f2fe" />
          </svg>
        );

      case 'heart': // 8-bit Heart
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            <rect x="3" y="3" width="4" height="2" fill="#ef4444" />
            <rect x="9" y="3" width="4" height="2" fill="#ef4444" />
            <rect x="2" y="5" width="12" height="4" fill="#ef4444" />
            <rect x="3" y="5" width="2" height="2" fill="#fca5a5" />
            <rect x="3" y="9" width="10" height="2" fill="#dc2626" />
            <rect x="5" y="11" width="6" height="2" fill="#b91c1c" />
            <rect x="7" y="13" width="2" height="2" fill="#991b1b" />
          </svg>
        );

      case 'chip': // Silicon microchip
      default:
        return (
          <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
            {/* Pins */}
            <rect x="2" y="0" width="1" height="2" fill="#eab308" />
            <rect x="5" y="0" width="1" height="2" fill="#eab308" />
            <rect x="8" y="0" width="1" height="2" fill="#eab308" />
            <rect x="11" y="0" width="1" height="2" fill="#eab308" />
            <rect x="14" y="0" width="1" height="2" fill="#eab308" />
            <rect x="2" y="14" width="1" height="2" fill="#eab308" />
            <rect x="5" y="14" width="1" height="2" fill="#eab308" />
            <rect x="8" y="14" width="1" height="2" fill="#eab308" />
            <rect x="11" y="14" width="1" height="2" fill="#eab308" />
            <rect x="14" y="14" width="1" height="2" fill="#eab308" />
            {/* Body */}
            <rect x="1" y="2" width="14" height="12" fill="#0f172a" />
            {/* Circuit Core */}
            <rect x="5" y="5" width="6" height="6" fill="#0284c7" />
            <rect x="6" y="6" width="4" height="4" fill="#00f0ff" />
          </svg>
        );
    }
  };

  return (
    <span
      className={pixelClass}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        imageRendering: 'pixelated',
        verticalAlign: 'middle',
        ...style,
      }}
    >
      {renderSvg()}
    </span>
  );
}
