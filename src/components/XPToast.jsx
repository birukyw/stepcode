export default function XPToast({ message }) {
  if (!message) return null;
  return (
    <div className={`xp-toast ${message ? 'xp-toast--visible' : ''}`}>
      {message}
    </div>
  );
}
