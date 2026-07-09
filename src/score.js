// Score tracking. High-score persistence arrives in Milestone 2.
export function createScore({ onChange }) {
  let value = 0;

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

  return { reset, increment, get };
}
