// The dot: showing, hiding, resizing, and teleporting to a random
// in-bounds position.
export function createDot({ dotEl, playAreaEl }) {
  function show() {
    dotEl.classList.remove('is-hidden');
  }

  function hide() {
    dotEl.classList.add('is-hidden');
  }

  function setSize(size) {
    dotEl.style.width = `${size}px`;
    dotEl.style.height = `${size}px`;
  }

  // Teleport to a random spot fully inside the play area.
  function move() {
    const area = playAreaEl.getBoundingClientRect();
    const size = dotEl.offsetWidth;

    const maxX = Math.max(0, area.width - size);
    const maxY = Math.max(0, area.height - size);

    dotEl.style.left = `${Math.random() * maxX}px`;
    dotEl.style.top = `${Math.random() * maxY}px`;
  }

  // Quick scale-pop for click feedback. Uses the Web Animations API so it
  // retriggers cleanly on rapid hits; skipped when unsupported or when the
  // player prefers reduced motion.
  function pop() {
    if (typeof dotEl.animate !== 'function') return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    dotEl.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
      { duration: 140, easing: 'ease-out' },
    );
  }

  return {
    show,
    hide,
    move,
    setSize,
    pop,
  };
}
