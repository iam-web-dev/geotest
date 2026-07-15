let ctx;
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function tone(freq, duration, type = 'sine', gain = 0.08, delay = 0) {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(c.destination);
    const t0 = c.currentTime + delay;
    osc.start(t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    osc.stop(t0 + duration + 0.02);
  } catch {}
}

export const playCorrect = () => { tone(880, 0.12, 'sine', 0.09); tone(1320, 0.15, 'sine', 0.07, 0.08); };
export const playWrong = () => { tone(180, 0.25, 'sawtooth', 0.08); };
export const playTick = () => { tone(440, 0.05, 'square', 0.03); };
export const playFinish = () => { tone(660, 0.12, 'sine', 0.08); tone(880, 0.12, 'sine', 0.08, 0.1); tone(1100, 0.2, 'sine', 0.08, 0.2); };

export function vibrate(pattern = 30) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}
