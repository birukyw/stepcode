import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Icon } from './art/Illustrations';

const SettingsContext = createContext(null);
const KEY = 'stepcode_settings';
const DEFAULTS = { theme: 'dark', fontScale: 1.1 };

const read = () => {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { /* ignore */ }
  const q = new URLSearchParams(window.location.search).get('theme'); // handy for sharing a light or dark link
  return { ...DEFAULTS, ...saved, ...(q === 'light' || q === 'dark' ? { theme: q } : {}) };
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(read);
  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.style.setProperty('--fs', String(settings.fontScale));
    try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings]);
  const update = (patch) => setSettings((s) => ({ ...s, ...patch }));
  return <SettingsContext.Provider value={{ settings, update, reset: () => setSettings(DEFAULTS) }}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);

/** Gear button with a popover. More settings can be added as rows. */
export function SettingsButton({ className = '' }) {
  const { settings, update, reset } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className={`settings ${className}`} ref={ref}>
      <button type="button" className="settings__btn" aria-label="Settings" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon name="gear" size={20} />
      </button>
      {open && (
        <div className="settings__pop" role="dialog" aria-label="Settings">
          <h3>Settings</h3>

          <div className="settings__row">
            <span className="settings__label">Theme</span>
            <div className="settings__seg" role="group" aria-label="Theme">
              {[['dark', 'Dark'], ['light', 'Light']].map(([id, label]) => (
                <button key={id} type="button" aria-pressed={settings.theme === id} className={settings.theme === id ? 'is-on' : ''} onClick={() => update({ theme: id })}>{label}</button>
              ))}
            </div>
          </div>

          <div className="settings__row settings__row--col">
            <label className="settings__label" htmlFor="fs-slider">Font size <b>{Math.round(settings.fontScale * 100)}%</b></label>
            <input id="fs-slider" type="range" min="0.9" max="1.5" step="0.05" value={settings.fontScale} onChange={(e) => update({ fontScale: parseFloat(e.target.value) })} />
            <div className="settings__ticks"><span>Smaller</span><span>Larger</span></div>
          </div>

          <button type="button" className="settings__reset" onClick={reset}>Reset to defaults</button>
        </div>
      )}
    </div>
  );
}
