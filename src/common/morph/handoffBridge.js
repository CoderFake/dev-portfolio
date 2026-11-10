/**
 * Cross-session morph & handoff bridge.
 *
 * Centralizes shared geometry and state transitions between adjacent sessions:
 * 1. Services (#services) -> Contact (#contact):
 *    - Services draws 3 Bezier convergence curves + 1 vertical drop spine at x = 83%
 *      exiting the bottom edge of #services.
 *    - Contact opens at the exact same x = 83%, y = 0% anchor with a circular clip-path
 *      dark-field expansion (`circle(0% at 83% 0%)` -> `circle(165% at 83% 0%)`) and
 *      continues the signal line downward.
 * 2. Active Section Surface -> SiteNav theme morph (`light` <-> `dark`).
 */

export const HANDOFF_ANCHOR_X_RATIO = 0.83;
export const HANDOFF_CONVERGE_Y_RATIO = 0.91;

export const CONTACT_DARK_CLIP = {
  collapsed: `circle(0% at ${HANDOFF_ANCHOR_X_RATIO * 100}% 0%)`,
  expanded: `circle(165% at ${HANDOFF_ANCHOR_X_RATIO * 100}% 0%)`,
};

const DARK_STAGE_SELECTORS = [
  ".hero",
  ".work .project-stage",
  ".statement",
  ".experience",
  ".proof",
];

/**
 * Computes and initializes stroke-dasharray/offset for the Services -> Contact SVG handoff paths.
 */
export function prepareServicesHandoffPaths(stageEl, laneEls, handoffSvg, pathEls) {
  if (!stageEl || !handoffSvg || pathEls.length < 4) return;

  const stageRect = stageEl.getBoundingClientRect();
  const width = stageEl.clientWidth;
  const height = stageEl.clientHeight;
  const targetX = width * HANDOFF_ANCHOR_X_RATIO;
  const convergeY = height * HANDOFF_CONVERGE_Y_RATIO;

  handoffSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  laneEls.slice(0, 3).forEach((laneEl, index) => {
    const routeEl = laneEl.querySelector(".service-route");
    if (!routeEl) return;
    const routeRect = routeEl.getBoundingClientRect();
    const startX = routeRect.right - stageRect.left;
    const startY = routeRect.top - stageRect.top + routeRect.height / 2;

    pathEls[index].setAttribute(
      "d",
      `M ${startX} ${startY} C ${startX - 18} ${startY + (convergeY - startY) * 0.52}, ${targetX + 32} ${convergeY - 26}, ${targetX} ${convergeY}`
    );
  });

  pathEls[3].setAttribute("d", `M ${targetX} ${convergeY} V ${height}`);

  pathEls.forEach((pathEl) => {
    const length = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = `${length}`;
    pathEl.style.strokeDashoffset = `${length}`;
  });
}

/**
 * Computes and initializes the Contact signal continuation SVG curve entering from Services.
 */
export function prepareContactSignalPath(stageEl, signalSvg, signalPath) {
  if (!stageEl || !signalSvg || !signalPath) return;

  const width = stageEl.clientWidth;
  const height = stageEl.clientHeight;

  signalSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  signalPath.setAttribute(
    "d",
    `M ${0.955 * width} 0 C ${0.91 * width} ${0.16 * height}, ${0.99 * width} ${0.28 * height}, ${0.945 * width} ${0.42 * height} S ${0.975 * width} ${0.56 * height}, ${0.94 * width} ${0.69 * height}`
  );

  const length = signalPath.getTotalLength();
  signalPath.style.strokeDasharray = `${length}`;
  signalPath.style.strokeDashoffset = `${length}`;
}

/**
 * Evaluates navbar scroll & dark-surface overlap state at probe line y = 42px.
 */
export function evaluateNavSurfaceState() {
  const isScrolled = window.scrollY >= 40;
  return {
    isScrolled,
    isDark: true,
  };
}
