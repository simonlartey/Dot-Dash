// The dot: showing, hiding, and teleporting to a random in-bounds position.
export function createDot({ dotEl, playAreaEl }) {
  function show() {
    dotEl.classList.remove('is-hidden');
    move();
  }

  function hide() {
    dotEl.classList.add('is-hidden');
  }

  // Teleport to a random spot fully inside the play area (never clipping edges).
  function move() {
    const area = playAreaEl.getBoundingClientRect();
    const size = dotEl.offsetWidth;

    const maxX = Math.max(0, area.width - size);
    const maxY = Math.max(0, area.height - size);

    dotEl.style.left = `${Math.random() * maxX}px`;
    dotEl.style.top = `${Math.random() * maxY}px`;
  }

  return { show, hide, move };
}
