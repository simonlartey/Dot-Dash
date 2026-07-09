// Lightweight click feedback tones synthesised with the Web Audio API — no
// audio files to ship. Degrades silently where Web Audio is unavailable.
let context = null;

function getContext() {
  if (typeof window === 'undefined') return null;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  if (!context) context = new AudioCtx();
  // Browsers start the context suspended until a user gesture.
  if (context.state === 'suspended') context.resume();

  return context;
}

function blip({ frequency, duration, type = 'sine', gain = 0.08 }) {
  const ctx = getContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const amp = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;

  const now = ctx.currentTime;
  amp.gain.setValueAtTime(gain, now);
  amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(amp);
  amp.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

export function playHit() {
  blip({ frequency: 660, duration: 0.12, type: 'triangle', gain: 0.1 });
}

export function playMiss() {
  blip({ frequency: 150, duration: 0.16, type: 'sine', gain: 0.07 });
}
