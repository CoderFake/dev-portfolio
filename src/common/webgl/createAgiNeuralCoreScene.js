import * as THREE from "three";
import {
  agiParticleFragmentShader,
  agiParticleVertexShader,
  precisionRingFragmentShader,
  precisionRingVertexShader,
  synapticArcFragmentShader,
  synapticArcVertexShader,
} from "./shaders/agiCoreShaders";

/**
 * High-Precision Three.js WebGL 2.0 Holographic Telemetry & Neural Constellation Engine.
 *
 * Designed as an architectural 3D layer framing the full-screen 3D CGI Engineer:
 * - Zero solid blobs or opaque meshes blocking the character.
 * - 3 Concentric Gyroscopic CAD / Jarvis Telemetry Rings with degree ticks & laser scanners.
 * - Outer 3D Neural Constellation & Curved Bezier Synaptic Pathways with traveling photon packets.
 * - Volumetric Depth Tensor Particles with mouse parallax & scroll reactivity.
 */
export function createAgiNeuralCoreScene(canvas, initialColors, options = {}) {
  const isMobileViewport = window.innerWidth <= 700;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileViewport ? 1.25 : 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  const haloGroup = new THREE.Group();
  rootGroup.add(haloGroup);

  const targetPrimary = new THREE.Color(...(initialColors?.primary || [0, 0.94, 1]));
  const targetSecondary = new THREE.Color(...(initialColors?.secondary || [0.55, 0.36, 0.96]));
  const targetTertiary = new THREE.Color(...(initialColors?.tertiary || [0.96, 0.25, 0.37]));

  const currentPrimary = targetPrimary.clone();
  const currentSecondary = targetSecondary.clone();
  const currentTertiary = targetTertiary.clone();

  // -------------------------------------------------------------------------
  // 1. Precision CAD / Jarvis Gyroscopic Telemetry Rings (Open Face Halo)
  // -------------------------------------------------------------------------
  const ringsGroup = new THREE.Group();
  haloGroup.add(ringsGroup);

  // Gentle orbital tilts so the rings frame AROUND the head without slicing across the face
  const ringSpecs = [
    { inner: 1.92, outer: 2.06, rotX: 0.22, rotY: -0.18, speed: 0.14, idx: 0.0 },
    { inner: 2.28, outer: 2.44, rotX: -0.18, rotY: 0.22, speed: -0.1, idx: 1.0 },
    { inner: 2.66, outer: 2.8, rotX: 0.14, rotY: -0.24, speed: 0.08, idx: 2.0 },
  ];

  const ringMeshes = ringSpecs.map((spec) => {
    const geo = new THREE.RingGeometry(spec.inner, spec.outer, 128, 1);
    const mat = new THREE.ShaderMaterial({
      vertexShader: precisionRingVertexShader,
      fragmentShader: precisionRingFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRingIndex: { value: spec.idx },
        uPulse: { value: 0 },
        uOpacity: { value: 0.82 },
        uColorPrimary: { value: currentPrimary },
        uColorSecondary: { value: currentSecondary },
        uColorTertiary: { value: currentTertiary },
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.set(spec.rotX, spec.rotY, 0);
    mesh.userData = spec;
    ringsGroup.add(mesh);
    return mesh;
  });

  // -------------------------------------------------------------------------
  // 2. Outer Coronal Constellation Hubs & Perimeter Synaptic Pathways
  //    (Keep center r_xy < 2.02 completely open so nothing crosses the face)
  // -------------------------------------------------------------------------
  const hubCount = 28;
  const hubs = [];

  for (let i = 0; i < hubCount; i += 1) {
    const angle = (i / hubCount) * Math.PI * 2;
    const rXY = 2.06 + (i % 3) * 0.26;
    const zDepth = ((i % 5) - 2) * 0.16;
    hubs.push(
      new THREE.Vector3(
        rXY * Math.cos(angle),
        rXY * Math.sin(angle),
        zDepth
      )
    );
  }

  const arcCount = 28;
  const segmentsPerArc = 20;
  const totalArcVerts = arcCount * segmentsPerArc * 2;
  const arcPositions = new Float32Array(totalArcVerts * 3);
  const arcProgress = new Float32Array(totalArcVerts);
  const arcSeeds = new Float32Array(totalArcVerts);

  let vertCursor = 0;
  for (let a = 0; a < arcCount; a += 1) {
    // Connect adjacent perimeter hubs so arcs curve around the halo rim, never across the face
    const startHub = hubs[a % hubs.length];
    const endHub = hubs[(a + (a % 2 === 0 ? 2 : 3)) % hubs.length];
    const midPoint = startHub
      .clone()
      .add(endHub)
      .multiplyScalar(0.5);
    const midLenXY = Math.hypot(midPoint.x, midPoint.y) || 1;
    const targetRimRadius = 2.42 + (a % 3) * 0.16;
    midPoint.x = (midPoint.x / midLenXY) * targetRimRadius;
    midPoint.y = (midPoint.y / midLenXY) * targetRimRadius;

    const curve = new THREE.QuadraticBezierCurve3(startHub, midPoint, endHub);
    const pts = curve.getPoints(segmentsPerArc);
    const seed = (a * 0.41) % 1.0;

    for (let s = 0; s < segmentsPerArc; s += 1) {
      const p0 = pts[s];
      const p1 = pts[s + 1];

      arcPositions[vertCursor * 3] = p0.x;
      arcPositions[vertCursor * 3 + 1] = p0.y;
      arcPositions[vertCursor * 3 + 2] = p0.z;
      arcProgress[vertCursor] = s / segmentsPerArc;
      arcSeeds[vertCursor] = seed;
      vertCursor += 1;

      arcPositions[vertCursor * 3] = p1.x;
      arcPositions[vertCursor * 3 + 1] = p1.y;
      arcPositions[vertCursor * 3 + 2] = p1.z;
      arcProgress[vertCursor] = (s + 1) / segmentsPerArc;
      arcSeeds[vertCursor] = seed;
      vertCursor += 1;
    }
  }

  const arcGeo = new THREE.BufferGeometry();
  arcGeo.setAttribute("position", new THREE.BufferAttribute(arcPositions, 3));
  arcGeo.setAttribute("aArcProgress", new THREE.BufferAttribute(arcProgress, 1));
  arcGeo.setAttribute("aArcSeed", new THREE.BufferAttribute(arcSeeds, 1));

  const arcUniforms = {
    uTime: { value: 0 },
    uPulse: { value: 0 },
    uOpacity: { value: 0.72 },
    uColorPrimary: { value: currentPrimary },
    uColorSecondary: { value: currentSecondary },
  };

  const arcMat = new THREE.ShaderMaterial({
    vertexShader: synapticArcVertexShader,
    fragmentShader: synapticArcFragmentShader,
    uniforms: arcUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const synapticArcs = new THREE.LineSegments(arcGeo, arcMat);
  haloGroup.add(synapticArcs);

  // -------------------------------------------------------------------------
  // 3. Volumetric Tensor & Constellation Beacons (Outer Coronal Ring Only)
  // -------------------------------------------------------------------------
  const particleCount = isMobileViewport ? 320 : 620;
  const pPositions = new Float32Array(particleCount * 3);
  const pScales = new Float32Array(particleCount);
  const pPhases = new Float32Array(particleCount);
  const pColorMix = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i += 1) {
    if (i < hubCount) {
      // Exact constellation hub beacons
      const h = hubs[i];
      pPositions[i * 3] = h.x;
      pPositions[i * 3 + 1] = h.y;
      pPositions[i * 3 + 2] = h.z;
      pScales[i] = 1.65;
    } else {
      // Outer coronal ring dust (rXY >= 2.02 so zero particles sit on the character's face)
      const rXY = 2.02 + Math.pow(Math.random(), 0.75) * 3.1;
      const theta = Math.random() * Math.PI * 2;
      const zDepth = (Math.random() - 0.5) * 1.4;
      pPositions[i * 3] = rXY * Math.cos(theta);
      pPositions[i * 3 + 1] = rXY * Math.sin(theta) * 0.92;
      pPositions[i * 3 + 2] = zDepth;
      pScales[i] = 0.45 + Math.random() * 1.05;
    }
    pPhases[i] = Math.random() * Math.PI * 2;
    pColorMix[i] = Math.random();
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
  particleGeo.setAttribute("aScale", new THREE.BufferAttribute(pScales, 1));
  particleGeo.setAttribute("aPhase", new THREE.BufferAttribute(pPhases, 1));
  particleGeo.setAttribute("aColorMix", new THREE.BufferAttribute(pColorMix, 1));

  const particleUniforms = {
    uTime: { value: 0 },
    uPulse: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uColorPrimary: { value: currentPrimary },
    uColorSecondary: { value: currentSecondary },
    uColorTertiary: { value: currentTertiary },
  };

  const particleMat = new THREE.ShaderMaterial({
    vertexShader: agiParticleVertexShader,
    fragmentShader: agiParticleFragmentShader,
    uniforms: particleUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particlePoints = new THREE.Points(particleGeo, particleMat);
  haloGroup.add(particlePoints);

  // -------------------------------------------------------------------------
  // Interactive State & Responsive Calibration
  // -------------------------------------------------------------------------
  let rafId = 0;
  let isVisible = true;
  let isDisposed = false;
  let mode = options.initialMode || "agi-core";
  let pulseValue = 0;
  let speedMultiplier = 1.0;
  let targetHaloScale = 1.0;
  let targetRingOpacity = 0.78;

  const pointerTarget = new THREE.Vector2(0, 0);
  const pointerCurrent = new THREE.Vector2(0, 0);

  const applyModeParams = (nextMode) => {
    mode = nextMode;
    if (mode === "hologram") {
      speedMultiplier = 1.15;
      targetHaloScale = 1.06;
      targetRingOpacity = 0.92;
      arcUniforms.uOpacity.value = 0.88;
    } else if (mode === "overdrive") {
      speedMultiplier = 2.1;
      targetHaloScale = 1.14;
      targetRingOpacity = 1.0;
      arcUniforms.uOpacity.value = 1.0;
    } else {
      speedMultiplier = 1.0;
      targetHaloScale = 1.0;
      targetRingOpacity = 0.75;
      arcUniforms.uOpacity.value = 0.68;
    }
    pulseValue = Math.min(pulseValue + 0.85, 1.35);
  };

  applyModeParams(mode);

  let videoEl = null;
  const halfFrustumHeight = 7.2 * Math.tan(THREE.MathUtils.degToRad(38 * 0.5));

  // Frame-measured face/head center trajectory (fx, fy in 1920x1080 video normalized coords)
  // across the entire 6.65s 60fps video from t = 0.0s to t = 6.65s
  const MALE_VIDEO_FACE_KEYFRAMES = [
    { t: 0.0, fx: 0.722, fy: 0.31, scale: 0.92 },
    { t: 1.0, fx: 0.718, fy: 0.31, scale: 0.93 },
    { t: 2.0, fx: 0.692, fy: 0.315, scale: 0.96 },
    { t: 2.5, fx: 0.668, fy: 0.32, scale: 1.0 },
    { t: 3.0, fx: 0.642, fy: 0.325, scale: 1.05 },
    { t: 3.5, fx: 0.605, fy: 0.33, scale: 1.12 },
    { t: 4.0, fx: 0.568, fy: 0.338, scale: 1.2 },
    { t: 4.5, fx: 0.532, fy: 0.345, scale: 1.28 },
    { t: 5.0, fx: 0.502, fy: 0.352, scale: 1.33 },
    { t: 6.0, fx: 0.492, fy: 0.355, scale: 1.36 },
    { t: 6.7, fx: 0.49, fy: 0.355, scale: 1.37 },
  ];

  // Frame-measured trajectory for /videos/engineer-female.mp4 (6.65s 60fps speed-ramped)
  const FEMALE_VIDEO_FACE_KEYFRAMES = [
    { t: 0.0, fx: 0.712, fy: 0.285, scale: 0.9 },
    { t: 1.0, fx: 0.718, fy: 0.288, scale: 0.9 },
    { t: 2.0, fx: 0.678, fy: 0.295, scale: 0.94 },
    { t: 2.5, fx: 0.652, fy: 0.302, scale: 0.98 },
    { t: 3.0, fx: 0.618, fy: 0.32, scale: 1.04 },
    { t: 3.5, fx: 0.578, fy: 0.345, scale: 1.14 },
    { t: 4.0, fx: 0.532, fy: 0.38, scale: 1.24 },
    { t: 4.5, fx: 0.502, fy: 0.395, scale: 1.32 },
    { t: 5.0, fx: 0.482, fy: 0.415, scale: 1.36 },
    { t: 5.5, fx: 0.478, fy: 0.42, scale: 1.37 },
    { t: 6.7, fx: 0.478, fy: 0.42, scale: 1.37 },
  ];

  const getActiveKeyframes = () => {
    const src = (videoEl?.currentSrc || videoEl?.getAttribute("src") || "").toLowerCase();
    return src.includes("female") ? FEMALE_VIDEO_FACE_KEYFRAMES : MALE_VIDEO_FACE_KEYFRAMES;
  };

  const sampleVideoTrajectory = (t) => {
    const keyframes = getActiveKeyframes();
    if (t <= keyframes[0].t) return keyframes[0];
    const last = keyframes[keyframes.length - 1];
    if (t >= last.t) return last;

    for (let i = 0; i < keyframes.length - 1; i += 1) {
      const k0 = keyframes[i];
      const k1 = keyframes[i + 1];
      if (t >= k0.t && t <= k1.t) {
        const alpha = (t - k0.t) / Math.max(0.0001, k1.t - k0.t);
        return {
          fx: k0.fx + (k1.fx - k0.fx) * alpha,
          fy: k0.fy + (k1.fy - k0.fy) * alpha,
          scale: k0.scale + (k1.scale - k0.scale) * alpha,
        };
      }
    }
    return last;
  };

  // Exact projection from 1920x1080 video (fx, fy) through CSS object-fit: cover into Three.js world space
  const projectVideoPoseToWorld = (videoTime) => {
    const W = canvas.clientWidth || window.innerWidth || 1440;
    const H = canvas.clientHeight || window.innerHeight || 900;
    const aspect = W / Math.max(H, 1);
    const sample = sampleVideoTrajectory(videoTime);

    // Measure actual video element box (on mobile/tablet the video sits in the top 46-52svh stage)
    const cRect = canvas.getBoundingClientRect();
    const vRect = videoEl ? videoEl.getBoundingClientRect() : cRect;
    const vW = vRect.width || W;
    const vH = vRect.height || H;
    const vLeft = vRect.left - cRect.left;
    const vTop = vRect.top - cRect.top;

    const coverScale = Math.max(vW / 1920, vH / 1080);
    const renderedW = 1920 * coverScale;
    const renderedH = 1080 * coverScale;

    // Normalized progress of the character moving from right (0.722) to center (0.49)
    const moveProgress = Math.max(
      0,
      Math.min(1, (0.722 - sample.fx) / (0.722 - 0.49))
    );

    // Smoothly pan the video's object-position-x with the character so his face + companion stay framed
    let objPosX = 1.0;
    if (W <= 700) {
      objPosX = 0.78 - moveProgress * 0.22; // 78% -> 56%
    } else if (W <= 1024) {
      objPosX = 0.84 - moveProgress * 0.28; // 84% -> 56%
    } else {
      objPosX = 1.0 - moveProgress * 0.5; // 100% -> 50%
    }

    if (videoEl) {
      videoEl.style.objectPosition = `${(objPosX * 100).toFixed(2)}% 50%`;
    }

    const offsetX = (vW - renderedW) * objPosX;
    const offsetY = (vH - renderedH) * 0.5;

    const screenX = vLeft + offsetX + sample.fx * renderedW;
    const screenY = vTop + offsetY + sample.fy * renderedH;

    const ndcX = (screenX / Math.max(W, 1)) * 2 - 1;
    const ndcY = 1 - (screenY / Math.max(H, 1)) * 2;

    const halfFrustumWidth = halfFrustumHeight * aspect;
    const videoHeightRatio = vH / Math.max(H, 1);
    const tierScale =
      W <= 700
        ? Math.max(0.28, aspect * 0.72) * Math.max(0.65, videoHeightRatio * 1.35)
        : W <= 1024
          ? Math.max(0.46, Math.min(0.78, aspect * 0.75)) * Math.max(0.72, videoHeightRatio * 1.25)
          : 1.0;

    return {
      x: ndcX * halfFrustumWidth,
      y: ndcY * halfFrustumHeight,
      scale: sample.scale * tierScale,
    };
  };

  const handleResize = () => {
    if (!canvas || isDisposed) return;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };

  const handlePointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    pointerTarget.set(nx, ny);
  };

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  handleResize();

  const initialPose = projectVideoPoseToWorld(0);
  rootGroup.position.set(initialPose.x, initialPose.y, 0);
  rootGroup.scale.setScalar(initialPose.scale);

  let lastTime = performance.now();

  const renderFrame = (now) => {
    if (isDisposed || !isVisible) {
      rafId = 0;
      return;
    }
    rafId = window.requestAnimationFrame(renderFrame);

    const dt = Math.min((now - lastTime) * 0.001, 0.05);
    lastTime = now;

    // Frame-accurate tracking from t = 0.0s to t = 6.65s mapped through exact object-fit: cover math
    if (!videoEl || !videoEl.isConnected) {
      videoEl = canvas.closest("section")?.querySelector("[data-hero-video]") || null;
    }
    const videoTime = videoEl ? videoEl.currentTime || 0 : 0;
    const targetPose = projectVideoPoseToWorld(videoTime);

    rootGroup.position.x += (targetPose.x - rootGroup.position.x) * 0.28;
    rootGroup.position.y += (targetPose.y - rootGroup.position.y) * 0.28;
    const nextRootScale =
      rootGroup.scale.x + (targetPose.scale - rootGroup.scale.x) * 0.28;
    rootGroup.scale.setScalar(nextRootScale);

    currentPrimary.lerp(targetPrimary, 0.07);
    currentSecondary.lerp(targetSecondary, 0.07);
    currentTertiary.lerp(targetTertiary, 0.07);

    pointerCurrent.lerp(pointerTarget, 0.07);
    pulseValue = Math.max(0, pulseValue - dt * 1.25);

    const elapsed = particleUniforms.uTime.value + dt * speedMultiplier;
    particleUniforms.uTime.value = elapsed;
    particleUniforms.uPulse.value = pulseValue;
    particleUniforms.uPointer.value.copy(pointerCurrent);

    arcUniforms.uTime.value = elapsed;
    arcUniforms.uPulse.value = pulseValue;

    const nextScale =
      haloGroup.scale.x + (targetHaloScale - haloGroup.scale.x) * 0.07;
    haloGroup.scale.setScalar(nextScale);

    // Gentle 3D orbital precession + mouse parallax
    haloGroup.rotation.y = elapsed * 0.08 + pointerCurrent.x * 0.25;
    haloGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.08 - pointerCurrent.y * 0.18;

    ringMeshes.forEach((mesh, idx) => {
      const spec = mesh.userData;
      mesh.material.uniforms.uTime.value = elapsed;
      mesh.material.uniforms.uPulse.value = pulseValue;
      mesh.material.uniforms.uOpacity.value +=
        (targetRingOpacity - mesh.material.uniforms.uOpacity.value) * 0.08;
      mesh.rotation.z += dt * spec.speed * speedMultiplier;
      mesh.rotation.x =
        spec.rotX + Math.sin(elapsed * 0.2 + idx) * 0.07 - pointerCurrent.y * 0.12;
      mesh.rotation.y =
        spec.rotY + Math.cos(elapsed * 0.16 + idx) * 0.07 + pointerCurrent.x * 0.12;
    });

    renderer.render(scene, camera);
  };

  rafId = window.requestAnimationFrame(renderFrame);

  return {
    setThemeColors(shaderColors) {
      if (!shaderColors) return;
      if (shaderColors.primary) targetPrimary.setRGB(...shaderColors.primary);
      if (shaderColors.secondary) targetSecondary.setRGB(...shaderColors.secondary);
      if (shaderColors.tertiary) targetTertiary.setRGB(...shaderColors.tertiary);
      pulseValue = Math.min(pulseValue + 0.5, 1.3);
    },
    setMode(nextMode) {
      applyModeParams(nextMode);
    },
    triggerPulse() {
      pulseValue = 1.35;
    },
    setVisible(visible) {
      if (isVisible === visible) return;
      isVisible = visible;
      if (visible && !rafId && !isDisposed) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(renderFrame);
      }
    },
    dispose() {
      isDisposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      ringMeshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      arcGeo.dispose();
      arcMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    },
  };
}
