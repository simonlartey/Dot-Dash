// Bootstrap: grab DOM references, build the game, and wire up the controls.
import { CONFIG } from './config.js';
import { createGame } from './game.js';

const refs = {
  dotEl: document.getElementById('dot'),
  playAreaEl: document.getElementById('play-area'),
  scoreEl: document.getElementById('score'),
  timerEl: document.getElementById('timer'),
  finalScoreEl: document.getElementById('final-score'),
  highScoreEl: document.getElementById('high-score'),
  newHighBadgeEl: document.getElementById('new-high-badge'),
  menuOverlayEl: document.getElementById('menu-overlay'),
  gameOverOverlayEl: document.getElementById('game-over-overlay'),
};

const game = createGame(refs);

// --- mode selection ---------------------------------------------------------
const modeSelectEl = document.getElementById('mode-select');
const modeHintEl = document.getElementById('mode-hint');

function loadPreferredModeId() {
  try {
    const saved = localStorage.getItem(CONFIG.storageKeys.mode);
    if (CONFIG.modes.some((mode) => mode.id === saved)) return saved;
  } catch {
    // ignore unavailable storage
  }
  return CONFIG.defaultModeId;
}

function savePreferredModeId(id) {
  try {
    localStorage.setItem(CONFIG.storageKeys.mode, id);
  } catch {
    // persistence is best-effort
  }
}

let selectedModeId = loadPreferredModeId();

function selectedMode() {
  return CONFIG.modes.find((mode) => mode.id === selectedModeId);
}

function selectMode(id) {
  selectedModeId = id;
  savePreferredModeId(id);
  syncModeButtons();
}

function syncModeButtons() {
  for (const button of modeSelectEl.children) {
    const isSelected = button.dataset.modeId === selectedModeId;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-checked', String(isSelected));
  }
  modeHintEl.textContent = selectedMode().description;
}

for (const mode of CONFIG.modes) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mode-button';
  button.textContent = mode.label;
  button.dataset.modeId = mode.id;
  button.setAttribute('role', 'radio');
  button.addEventListener('click', () => selectMode(mode.id));
  modeSelectEl.appendChild(button);
}

syncModeButtons();

// --- initial high score + controls ------------------------------------------
refs.highScoreEl.textContent = game.getHighScore();

document
  .getElementById('start-button')
  .addEventListener('click', () => game.start(selectedMode()));
document
  .getElementById('replay-button')
  .addEventListener('click', () => game.start(selectedMode()));
