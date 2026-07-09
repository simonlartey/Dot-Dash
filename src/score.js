// Score tracking plus high-score persistence via localStorage.
export function createScore({ onChange, storageKey }) {
  let value = 0;
  let high = readHigh();

  function readHigh() {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = Number(raw);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    } catch {
      // localStorage can throw in private mode / sandboxed contexts.
      return 0;
    }
  }

  function reset() {
    value = 0;
    onChange(value);
  }

  function increment() {
    value += 1;
    onChange(value);
  }

  function get() {
    return value;
  }

  function getHigh() {
    return high;
  }

  // Persist the current score if it beats the stored best. Returns whether a
  // new high score was set.
  function commitHigh() {
    if (value <= high) return false;

    high = value;
    try {
      localStorage.setItem(storageKey, String(high));
    } catch {
      // Persistence is best-effort; the in-memory high still updates.
    }
    return true;
  }

  return { reset, increment, get, getHigh, commitHigh };
}
