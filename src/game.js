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

  const score = createScore({
    onChange: updateScore,
  });

  const timer = createTimer({
    seconds: CONFIG.roundSeconds,
    onTick: (remaining) => {
      timerEl.textContent = remaining;
    },
    onComplete: end,
  });

  function getDifficultyLevel(currentScore) {
    return CONFIG.difficultyLevels
      .filter((level) => currentScore >= level.minimumScore)
      .at(-1);
  }

  function updateScore(value) {
    scoreEl.textContent = value;

    const difficultyLevel = getDifficultyLevel(value);
    dot.setSize(difficultyLevel.dotSize);
  }

  function start() {
    menuOverlayEl.classList.add('is-hidden');
    gameOverOverlayEl.classList.add('is-hidden');

    score.reset();
    dot.show();
    dot.move();
    timer.start();
  }

  function handleHit() {
    if (dotEl.classList.contains('is-hidden')) {
      return;
    }

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
