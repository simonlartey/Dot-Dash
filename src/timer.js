// Countdown timer. Ticks once per second, reports remaining time, and fires
// a callback when it reaches zero.
export function createTimer({ seconds, onTick, onComplete }) {
  let remaining = seconds;
  let intervalId = null;

  function start() {
    stop();
    remaining = seconds;
    onTick(remaining);

    intervalId = setInterval(() => {
      remaining -= 1;
      onTick(remaining);

      if (remaining <= 0) {
        stop();
        onComplete();
      }
    }, 1000);
  }

  function stop() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Subtract time immediately (used by mode miss penalties). Ends the round if
  // the penalty runs the clock out.
  function penalize(penaltySeconds) {
    remaining -= penaltySeconds;
    onTick(remaining);

    if (remaining <= 0) {
      stop();
      onComplete();
    }
  }

  return { start, stop, penalize };
}
