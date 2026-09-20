import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function LevelUpModal({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="levelup-overlay" onClick={onClose}>
      <div className="levelup-modal" onClick={(e) => e.stopPropagation()}>
        <div className="levelup-modal__icon" style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center' }}>
          <PixelSprite name="chest" size={36} animated />
          <PixelSprite name="trophy" size={44} animated />
          <PixelSprite name="bot" size={36} animated />
        </div>
        <GlitchHeader as="div" className="levelup-modal__title" text="LEVEL UP!" />
        <div className="levelup-modal__level">Level {data.level} Cyber Master</div>
        <button className="levelup-modal__btn" onClick={onClose}>Continue Quest →</button>
      </div>
    </div>
  );
}
