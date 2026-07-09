# Dot-Dash

**Dot-Dash** is a fast-paced browser reaction game. A single dot skitters around the play area and the player has one job: click it as many times as possible before the timer runs out. Every hit scores a point and nudges the dot to move a little faster, so the game gets harder the better you do.

This document is the full game plan — the design, the mechanics, the tech stack, and the build roadmap.

---

## 1. Concept

> One dot. One timer. How many clicks can you land before it's too fast to catch?

- **Genre:** Arcade / reaction / hyper-casual
- **Session length:** 30 seconds (default round)
- **Platform:** Web (desktop + mobile, mouse + touch)
- **Audience:** Anyone; pick-up-and-play, no tutorial required
- **Core loop:** Spot the dot → click it → it speeds up and relocates → repeat until time expires → see score → play again

The appeal is the tension curve: early clicks are easy, but each success makes the next one harder, so every run ends in a satisfying scramble.

---

## 2. Core Mechanics

### The Dot
- A circular target rendered inside a fixed play area.
- On each successful click it **teleports** to a new random position (fully inside bounds, never clipping the edge).
- Its **size shrinks** and **relocation speed increases** as the score climbs, raising difficulty.

### Scoring
- `+1` per successful click on the dot.
- Clicking empty space is a **miss** (see difficulty modes below).
- Final score is shown on the game-over screen and compared against the local high score.

### Difficulty Ramp
Difficulty scales continuously with the current score:

| Score band | Dot diameter | Move interval | Notes |
|-----------|-------------|---------------|-------|
| 0–9       | 64 px       | 1200 ms       | Warm-up |
| 10–24     | 52 px       | 900 ms        | Steady |
| 25–49     | 40 px       | 650 ms        | Pressure |
| 50+       | 28 px       | 450 ms        | Frantic |

Values are tunable constants (see `config.js`), not magic numbers scattered through the code.

### Timer
- Round length defaults to **30 seconds**, counting down and visible at all times.
- At `0`, input is locked and the game-over screen appears.

### Miss Handling (mode-dependent)
- **Casual:** misses do nothing — pure score chase.
- **Classic:** misses subtract time (e.g. `-0.5s`) to punish spamming.
- **Sudden Death:** one miss ends the run.

---

## 3. Game States

```
  ┌────────┐   start   ┌─────────┐  time=0   ┌───────────┐
  │  MENU  │ ────────► │ PLAYING │ ────────► │ GAME OVER │
  └────────┘           └─────────┘           └───────────┘
       ▲                                            │
       └──────────────── play again ───────────────┘
```

- **MENU** — title, high score, mode select, Start button.
- **PLAYING** — active dot, live score, live countdown.
- **GAME OVER** — final score, new-high-score flag, Replay + Menu buttons.
- **PAUSED** (optional) — freezes timer and dot; resume/quit.

---

## 4. Screens & UI

- **Title screen:** game name, tagline, current high score, mode toggle, big Start button.
- **HUD (in-game):** score (top-left), countdown timer (top-right), optional pause button.
- **Play area:** bordered, responsive region that holds the dot; centered on screen.
- **Game-over card:** final score, "New High Score!" badge when beaten, Replay / Menu.

UI polish targets: readable at a glance, high-contrast, colorblind-safe dot color, satisfying click feedback (flash/scale/pop + sound).

---

## 5. Tech Stack

Kept intentionally light so it runs anywhere with zero build step for v1.

- **HTML5** — page structure and the play-area container.
- **CSS3** — layout, responsive sizing, animations/transitions.
- **Vanilla JavaScript (ES modules)** — game loop, state, scoring, input.
- **localStorage** — persist high score and preferred mode.
- **No framework required** for MVP. If the project grows (leaderboards, accounts), migrate the UI to a framework and add a backend then — not before.

Rendering: DOM element for the dot in v1 (simplest, accessible, good enough). Revisit `<canvas>` only if we add many simultaneous objects or particle effects.

---

## 6. Project Structure

```
Dot-Dash/
├── index.html        # markup + root containers
├── styles.css        # layout, HUD, screens, dot styling
├── src/
│   ├── main.js       # bootstrap, wires modules to the DOM
│   ├── game.js       # state machine + core loop
│   ├── dot.js        # dot spawn / move / hit-test
│   ├── score.js      # scoring + high-score persistence
│   ├── timer.js      # countdown logic
│   └── config.js     # tunable constants (sizes, speeds, round length)
├── assets/           # sounds, icons
└── README.md
```

---

## 7. Build Roadmap

### Milestone 0 — Skeleton
- [ ] `index.html`, `styles.css`, module scaffolding
- [ ] Static play area with a centered, non-interactive dot

### Milestone 1 — Playable MVP
- [ ] Click the dot to score `+1`
- [ ] Dot relocates to a random in-bounds position on hit
- [ ] 30-second countdown timer
- [ ] Game-over screen with final score
- [ ] Start / Replay flow

### Milestone 2 — The Ramp
- [ ] Difficulty scaling (dot shrinks + moves faster with score)
- [ ] Miss handling and difficulty modes (Casual / Classic / Sudden Death)
- [ ] High-score persistence via localStorage

### Milestone 3 — Juice
- [ ] Click feedback: scale/pop animation + sound
- [ ] Timer-low warning state (color/pulse under 5s)
- [ ] Menu screen with mode selection and high-score display

### Milestone 4 — Polish & Ship
- [ ] Full mobile/touch support and responsive layout
- [ ] Accessibility pass (contrast, focus states, reduced-motion)
- [ ] Deploy (GitHub Pages / Netlify / Vercel)

### Stretch Goals
- [ ] Online leaderboard (needs a backend)
- [ ] Power-ups: freeze-time, x2-score, big-dot
- [ ] Combo multiplier for fast consecutive hits
- [ ] Themes / dot skins
- [ ] Daily challenge with a fixed seed

---

## 8. Getting Started (dev)

Once the MVP exists, it runs with no build step:

```bash
# clone, then serve the folder (any static server works)
npx serve .
# or
python3 -m http.server 8000
```

Open the printed URL in a browser. A static server is used (rather than opening the file directly) so ES modules load correctly.

---

## 9. Design Principles

- **Instant fun** — playable within one second of landing, no tutorial.
- **Fair difficulty** — the ramp should feel earned, never random or cheap.
- **Tunable, not hardcoded** — all feel-related numbers live in `config.js`.
- **Feedback on every action** — hits and misses both look and sound distinct.
- **Small and fast** — no heavy dependencies; loads instantly on mobile.

---

## 10. Success Metrics

- A first-time player understands the game with no instructions.
- Average session ends in a genuine difficulty scramble (not boredom, not chaos).
- Players replay immediately to beat their high score.
- Runs smoothly at 60fps on a mid-range phone.
</content>
</invoke>
