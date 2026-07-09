// Game state machine: wires the dot, score, and timer together and drives the
// MENU -> PLAYING -> GAME OVER flow.
import { CONFIG } from './config.js';
import { createDot } from './dot.js';
import { createScore } from './score.js';
import { createTimer } from './timer.js';
import { playHit, playMiss } from './sound.js';

export function createGame(refs) {
  const {
    dotEl,
    playAreaEl,
    scoreEl,
    timerEl,
    finalScoreEl,
    highScoreEl,
    newHighBadgeEl,
    menuOverlayEl,
    gameOverOverlayEl,
  } = refs;

  const dot = createDot({ dotEl, playAreaEl });

  const score = createScore({
    onChange: updateScore,
    storageKey: CONFIG.storageKeys.highScore,
  });

  const timer = createTimer({
    seconds: CONFIG.roundSeconds,
    onTick: updateTimer,
    onComplete: end,
  });

  // The mode the current round is being played under.
  let currentMode = CONFIG.modes[0];

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

  function updateTimer(remaining) {
    const display = Math.max(0, remaining);
    timerEl.textContent = display;
    timerEl.classList.toggle(
      'is-low',
      display > 0 && display <= CONFIG.timerLowThreshold,
    );
  }

  function isPlaying() {
    return !dotEl.classList.contains('is-hidden');
  }

  function start(mode) {
    currentMode = mode ?? currentMode;

    menuOverlayEl.classList.add('is-hidden');
    gameOverOverlayEl.classList.add('is-hidden');
    newHighBadgeEl.classList.add('is-hidden');
    timerEl.classList.remove('is-low');

    score.reset();
    dot.show();
    dot.move();
    timer.start();
  }

  function handleHit() {
    if (!isPlaying()) return;

    score.increment();
    dot.move();
    dot.pop();
    playHit();
  }

  // A click anywhere in the play area that isn't the dot is a miss. Its effect
  // depends on the active mode.
  function handleMiss(event) {
    if (!isPlaying()) return;
    if (event.target === dotEl) return; // that click was a hit

    playMiss();

    if (currentMode.missEndsGame) {
      end();
      return;
    }

    if (currentMode.missPenaltySeconds > 0) {
      timer.penalize(currentMode.missPenaltySeconds);
    }
  }

  function end() {
    timer.stop();
    dot.hide();
    timerEl.classList.remove('is-low');

    const isNewHigh = score.commitHigh();
    finalScoreEl.textContent = score.get();
    highScoreEl.textContent = score.getHigh();
    newHighBadgeEl.classList.toggle('is-hidden', !isNewHigh);

    gameOverOverlayEl.classList.remove('is-hidden');
  }

  dotEl.addEventListener('click', handleHit);
  playAreaEl.addEventListener('click', handleMiss);

  return {
    start,
    getHighScore: score.getHigh,
  };
}
