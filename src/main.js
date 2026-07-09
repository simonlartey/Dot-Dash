// Bootstrap: grab DOM references, build the game, and wire up the controls.
import { createGame } from './game.js';

const refs = {
  dotEl: document.getElementById('dot'),
  playAreaEl: document.getElementById('play-area'),
  scoreEl: document.getElementById('score'),
  timerEl: document.getElementById('timer'),
  finalScoreEl: document.getElementById('final-score'),
  menuOverlayEl: document.getElementById('menu-overlay'),
  gameOverOverlayEl: document.getElementById('game-over-overlay'),
};

const game = createGame(refs);

document.getElementById('start-button').addEventListener('click', game.start);
document.getElementById('replay-button').addEventListener('click', game.start);
