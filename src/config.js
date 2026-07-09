// Tunable game settings. All difficulty and feel values should live here
// instead of being scattered throughout the game logic.
export const CONFIG = {
  roundSeconds: 30,

  // Seconds remaining at which the timer switches to its low-time warning.
  timerLowThreshold: 5,

  difficultyLevels: [
    {
      minimumScore: 0,
      dotSize: 64,
    },
    {
      minimumScore: 10,
      dotSize: 52,
    },
    {
      minimumScore: 25,
      dotSize: 40,
    },
    {
      minimumScore: 50,
      dotSize: 28,
    },
  ],

  // Difficulty modes govern how a miss (clicking empty space) is handled.
  // Penalties are whole seconds so they read cleanly on the integer countdown.
  defaultModeId: 'casual',
  modes: [
    {
      id: 'casual',
      label: 'Casual',
      description: 'Pure score chase — misses do nothing.',
      missPenaltySeconds: 0,
      missEndsGame: false,
    },
    {
      id: 'classic',
      label: 'Classic',
      description: 'A miss costs you 2 seconds.',
      missPenaltySeconds: 2,
      missEndsGame: false,
    },
    {
      id: 'sudden-death',
      label: 'Sudden Death',
      description: 'One miss ends the run.',
      missPenaltySeconds: 0,
      missEndsGame: true,
    },
  ],

  storageKeys: {
    highScore: 'dotdash.highScore',
    mode: 'dotdash.mode',
  },
};
