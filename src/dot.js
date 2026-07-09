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

  return {
    show,
    hide,
    move,
    setSize,
  };
}
