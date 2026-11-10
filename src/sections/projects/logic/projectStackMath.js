export function computeProjectCardPose(activeIndex, cardIndex, totalCards, isMobile) {
  const delta = cardIndex - activeIndex;
  const absDelta = Math.abs(delta);
  const sign = delta < 0 ? -1 : 1;

  return {
    xPercent: delta * (isMobile ? 28 : 35),
    y: absDelta === 0 ? -12 : Math.min(absDelta * absDelta * (isMobile ? 8 : 10), 215),
    z: absDelta === 0 ? 190 : -70 - 72 * absDelta,
    scale: absDelta === 0 ? 1 : Math.max(0.94 - 0.075 * absDelta, 0.54),
    rotationY: absDelta === 0 ? 0 : -sign * Math.min(8 + 4 * absDelta, 27),
    rotationX: absDelta === 0 ? 0 : Math.min(2 * absDelta, 9),
    rotationZ: absDelta === 0 ? 0 : sign * Math.min(6 * absDelta, 28),
    opacity: absDelta === 0 ? 1 : Math.max(0.92 - 0.16 * absDelta, 0),
    zIndex: totalCards - absDelta,
  };
}
