// Game state machine: wires the dot, score, and timer together and drives the
// MENU -> PLAYING -> GAME OVER flow.
import { CONFIG } from './config.js';
import { createDot } from './dot.js';
import { createScore } from './score.js';
import { createTimer } from './timer.js';

export function createGame(refs) {
  const {
    dotEl,
    playAreaEl,
    scoreEl,
    timerEl,
    finalScoreEl,
    menuOverlayEl,
    gameOverOverlayEl,
  } = refs;

  const dot = createDot({ dotEl, playAreaEl });
  const score = createScore({ onChange: (value) => (scoreEl.textContent = value) });
  const timer = createTimer({
    seconds: CONFIG.roundSeconds,
    onTick: (remaining) => (timerEl.textContent = remaining),
    onComplete: end,
  });

  function start() {
    menuOverlayEl.classList.add('is-hidden');
    gameOverOverlayEl.classList.add('is-hidden');
    score.reset();
    dot.show();
    timer.start();
  }

  // A hit only counts while the dot is live (guards clicks after time runs out).
  function handleHit() {
    if (dotEl.classList.contains('is-hidden')) return;
    score.increment();
    dot.move();
  }

  function end() {
    timer.stop();
    dot.hide();
    finalScoreEl.textContent = score.get();
    gameOverOverlayEl.classList.remove('is-hidden');
  }

  dotEl.addEventListener('click', handleHit);

  return { start };
}
