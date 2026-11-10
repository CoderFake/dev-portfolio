/**
 * High-Precision Architectural GLSL Shaders for Three.js WebGL 2.0
 * Designed for crisp, futuristic CAD / AGI Telemetry, Neural Constellations & 3D Laser Grids.
 */

// ---------------------------------------------------------------------------
// 1. Precision CAD / Jarvis Telemetry Ring Shader (Ultra-Fine Ticks & Scanners)
// ---------------------------------------------------------------------------
export const precisionRingVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const precisionRingFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uRingIndex;
uniform float uPulse;
uniform float uOpacity;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorTertiary;

varying vec2 vUv;
varying vec3 vPos;

void main() {
  float angle = atan(vPos.y, vPos.x);
  float normAngle = (angle + 3.14159265) / 6.2831853;
  float radial = vUv.y; // 0.0 (inner) -> 1.0 (outer)

  // Razor-sharp inner & outer micron guide rails
  float innerRail = smoothstep(0.045, 0.0, abs(radial - 0.06));
  float outerRail = smoothstep(0.045, 0.0, abs(radial - 0.94));

  // Segmented gap mask so rings look like engineered CAD armatures, not solid circles
  float segmentMask = step(0.18, fract(normAngle * (3.0 + uRingIndex)));

  // High-density precision degree ticks (180 minor, 24 major)
  float minorTick = smoothstep(0.12, 0.0, abs(fract(normAngle * 180.0) - 0.5))
    * step(0.38, radial) * step(radial, 0.62);
  float majorTick = smoothstep(0.055, 0.0, abs(fract(normAngle * 24.0) - 0.5))
    * step(0.14, radial) * step(radial, 0.86);

  // Sweeping laser telemetry scanner
  float dir = mod(uRingIndex, 2.0) < 0.5 ? 1.0 : -1.0;
  float speed = dir * (0.16 + uRingIndex * 0.05);
  float scanPhase = fract(normAngle - uTime * speed);
  float scanBeam = smoothstep(0.0, 0.28, scanPhase) * smoothstep(0.31, 0.26, scanPhase);
  float scanCenter = smoothstep(0.38, 0.0, abs(radial - 0.5));

  float intensity = (innerRail * 0.65 + outerRail * 0.45) * segmentMask
    + minorTick * 0.42
    + majorTick * 0.95
    + scanBeam * scanCenter * (0.85 + uPulse * 0.6);

  vec3 baseCol = uRingIndex < 0.5
    ? uColorPrimary
    : (uRingIndex < 1.5 ? uColorSecondary : uColorTertiary);
  vec3 col = mix(baseCol, vec3(1.0), majorTick * 0.65 + scanBeam * 0.5);

  float alpha = clamp(intensity * uOpacity, 0.0, 0.95);
  if (alpha < 0.015) discard;

  gl_FragColor = vec4(col, alpha);
}
`;

// ---------------------------------------------------------------------------
// 2. Synaptic Light-Packet Arc Shader (Traveling Photons Along 3D Curves)
// ---------------------------------------------------------------------------
export const synapticArcVertexShader = /* glsl */ `
attribute float aArcProgress;
attribute float aArcSeed;

varying float vArcProgress;
varying float vArcSeed;

void main() {
  vArcProgress = aArcProgress;
  vArcSeed = aArcSeed;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const synapticArcFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uPulse;
uniform float uOpacity;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;

varying float vArcProgress;
varying float vArcSeed;

void main() {
  float speed = 0.38 + vArcSeed * 0.35;
  float head = fract(uTime * speed + vArcSeed * 5.1);
  float dist = abs(vArcProgress - head);
  float photon = exp(-dist * 18.0) * (1.15 + uPulse * 0.8);

  float taper = sin(vArcProgress * 3.14159265);
  float alpha = (0.08 + photon * 0.92) * taper * uOpacity;
  if (alpha < 0.01) discard;

  vec3 col = mix(uColorSecondary, uColorPrimary, vArcProgress);
  col = mix(col, vec3(1.0), clamp(photon * 0.75, 0.0, 1.0));

  gl_FragColor = vec4(col, alpha);
}
`;

// ---------------------------------------------------------------------------
// 3. Crisp Depth Tensor Particle & Beacon Shader
// ---------------------------------------------------------------------------
export const agiParticleVertexShader = /* glsl */ `
uniform float uTime;
uniform float uPulse;
uniform vec2 uPointer;

attribute float aScale;
attribute float aPhase;
attribute float aColorMix;

varying float vColorMix;
varying float vAlpha;

void main() {
  vColorMix = aColorMix;

  vec3 pos = position;
  // Gentle anti-gravity drift & orbital sway
  pos.y += sin(uTime * 0.55 + aPhase) * 0.18;
  pos.x += cos(uTime * 0.42 + aPhase * 1.3) * 0.14 + uPointer.x * 0.24 * aScale;
  pos.y += uPointer.y * 0.18 * aScale;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float dist = max(-mvPosition.z, 1.0);
  float pulseBoost = 1.0 + uPulse * 0.45 * sin(aPhase * 3.0 + uTime * 4.0);
  gl_PointSize = clamp((13.0 * aScale * pulseBoost) / dist, 1.2, 11.0);
  vAlpha = smoothstep(10.0, 2.5, dist) * (0.45 + 0.55 * sin(uTime * 1.4 + aPhase));
}
`;

export const agiParticleFragmentShader = /* glsl */ `
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorTertiary;

varying float vColorMix;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);
  if (d > 0.5) discard;

  float core = smoothstep(0.22, 0.0, d);
  float glow = exp(-d * 7.0) * 0.65;

  vec3 col = vColorMix < 0.5
    ? mix(uColorPrimary, uColorSecondary, vColorMix * 2.0)
    : mix(uColorSecondary, uColorTertiary, (vColorMix - 0.5) * 2.0);
  col = mix(col, vec3(1.0), core * 0.8);

  gl_FragColor = vec4(col, (core + glow) * vAlpha);
}
`;

// ---------------------------------------------------------------------------
// 4. Precision Cyber-Grid & Data-Stream Shader (Section Backdrops)
// ---------------------------------------------------------------------------
export const quantumFieldVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export const quantumFieldFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorTertiary;
uniform vec3 uColorVoid;
uniform float uIntensity;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 ptr = uPointer * 0.38 * vec2(aspect, 1.0);

  // 1. Crisp architectural micro-grid & "+" calibration crosshairs
  vec2 gridCoord = p * 7.5;
  vec2 cell = fract(gridCoord) - 0.5;
  vec2 cellId = floor(gridCoord);

  float lineX = smoothstep(0.012, 0.0, abs(cell.x));
  float lineY = smoothstep(0.012, 0.0, abs(cell.y));
  float baseGrid = max(lineX, lineY) * 0.075;

  // Crosshair "+" at grid intersections
  float crossX = smoothstep(0.018, 0.0, abs(cell.x)) * step(abs(cell.y), 0.09);
  float crossY = smoothstep(0.018, 0.0, abs(cell.y)) * step(abs(cell.x), 0.09);
  float crossHair = max(crossX, crossY) * 0.28;

  // 2. High-speed data light-packets racing along grid rails
  float seedX = fract(sin(cellId.y * 127.1) * 43758.5453);
  float packetX = exp(-abs(fract(gridCoord.x * 0.25 - uTime * (0.22 + seedX * 0.25) - seedX) - 0.5) * 18.0)
    * lineY * step(0.65, seedX);

  float seedY = fract(cos(cellId.x * 269.5) * 18342.231);
  float packetY = exp(-abs(fract(gridCoord.y * 0.25 - uTime * (0.18 + seedY * 0.22) - seedY) - 0.5) * 18.0)
    * lineX * step(0.68, seedY);

  // 3. Smooth volumetric studio light-well following pointer
  float ptrDist = length(p - ptr);
  float ptrHalo = exp(-ptrDist * 2.2) * 0.24;
  float radarRing = smoothstep(0.025, 0.0, abs(fract(ptrDist * 1.2 - uTime * 0.2) - 0.5))
    * exp(-ptrDist * 1.35) * 0.22;

  // Radial vignette so center/edges blend smoothly into dark section surface
  float vignette = smoothstep(1.25, 0.15, length(p * vec2(0.72, 0.92)));

  vec3 col = uColorVoid * 0.35;
  col += uColorSecondary * (baseGrid + crossHair * 0.65) * vignette;
  col += uColorPrimary * ((packetX + packetY) * 0.95 + crossHair * 0.45 + radarRing + ptrHalo * 0.65) * vignette;
  col += uColorTertiary * (ptrHalo * 0.32);

  gl_FragColor = vec4(col, uIntensity);
}
`;
