// ─── Ambient 8-bit Chiptune Audio Generator (Web Audio API) ─────────────
let audioCtx = null;
let isPlaying = false;
let loopInterval = null;

const NOTES = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C D E G A C D E

function playNote(freq, time, duration = 0.4) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle'; // Gentle retro mellow tone
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.035, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  } catch {}
}

export function toggleAmbientSound(onStateChange) {
  if (isPlaying) {
    stopAmbientSound();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startAmbientSound();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startAmbientSound() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlaying = true;
    let step = 0;
    
    // Play an ambient arpeggio pattern every 400ms
    const scheduleNext = () => {
      if (!isPlaying || !audioCtx) return;
      const now = audioCtx.currentTime;
      const noteIdx = [0, 2, 4, 3, 5, 4, 2, 1][step % 8];
      playNote(NOTES[noteIdx], now, 0.45);
      step++;
    };

    scheduleNext();
    loopInterval = setInterval(scheduleNext, 420);
  } catch (err) {
    console.warn('Audio playback not supported:', err);
  }
}

export function stopAmbientSound() {
  isPlaying = false;
  if (loopInterval) {
    clearInterval(loopInterval);
    loopInterval = null;
  }
  if (audioCtx) {
    try {
      audioCtx.suspend();
    } catch {}
  }
}

export function getIsAudioPlaying() {
  return isPlaying;
}
