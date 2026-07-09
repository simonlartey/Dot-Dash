// Tunable constants — all feel-related numbers live here, not scattered in code.
// Milestone 1 (MVP) keeps this small; the difficulty ramp lands in Milestone 2.
// Tunable game settings. All difficulty values should live here instead of
// being scattered throughout the game logic.
export const CONFIG = {
  roundSeconds: 30,

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
};
