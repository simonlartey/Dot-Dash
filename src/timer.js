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

  return { start, stop };
}
