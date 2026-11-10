import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";
import {
  quantumFieldFragmentShader,
  quantumFieldVertexShader,
} from "./shaders/agiCoreShaders";

const HORIZON_POINTS_VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
varying float vElevation;
varying float vDistFade;

void main() {
  vec3 pos = position;
  float wave1 = sin(pos.x * 0.75 + uTime * 0.65) * cos(pos.y * 0.65 + uTime * 0.45);
  float wave2 = sin((pos.x * 0.4 - pos.y * 0.5) * 1.4 - uTime * 0.85) * 0.45;
  float elev = (wave1 + wave2) * 0.42;

  pos.z += elev;
  pos.x += uPointer.x * 0.35;
  pos.y += uPointer.y * 0.25;

  vElevation = clamp(elev + 0.5, 0.0, 1.0);

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPos;

  float dist = max(-mvPos.z, 1.0);
  vDistFade = smoothstep(14.0, 3.5, dist) * smoothstep(1.2, 3.2, dist);
  gl_PointSize = clamp((10.5 * (0.65 + vElevation * 0.7)) / dist, 1.2, 6.5);
}
`;

const HORIZON_POINTS_FRAG = /* glsl */ `
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform float uIntensity;
varying float vElevation;
varying float vDistFade;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);
  if (d > 0.5) discard;

  float core = smoothstep(0.45, 0.05, d);
  vec3 col = mix(uColorSecondary, uColorPrimary, vElevation);
  col = mix(col, vec3(1.0), core * 0.45);

  gl_FragColor = vec4(col, core * vDistFade * uIntensity * 0.85);
}
`;

export function QuantumFieldCanvas({ intensity = 0.72, className = "" }) {
  const canvasRef = useRef(null);
  const targetColorsRef = useRef(null);
  const { themePreset } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }

    const isMobile = window.innerWidth <= 700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
    renderer.autoClear = false;

    // Layer 1: Orthographic Topographic Contour & Crosshair Matrix Shader
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Layer 2: Perspective 3D Undulating Tensor Wave Horizon
    const fgScene = new THREE.Scene();
    const fgCamera = new THREE.PerspectiveCamera(48, 1, 0.1, 30);
    fgCamera.position.set(0, -2.4, 6.2);
    fgCamera.lookAt(0, 0.3, 0);

    const sc = themePreset.shaderColors;
    const targetPrimary = new THREE.Color(...sc.primary);
    const targetSecondary = new THREE.Color(...sc.secondary);
    const targetTertiary = new THREE.Color(...sc.tertiary);
    const targetVoid = new THREE.Color(...sc.voidBg);

    targetColorsRef.current = {
      primary: targetPrimary,
      secondary: targetSecondary,
      tertiary: targetTertiary,
      voidBg: targetVoid,
    };

    const currentPrimary = targetPrimary.clone();
    const currentSecondary = targetSecondary.clone();
    const currentTertiary = targetTertiary.clone();
    const currentVoid = targetVoid.clone();

    const bgUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorPrimary: { value: currentPrimary },
      uColorSecondary: { value: currentSecondary },
      uColorTertiary: { value: currentTertiary },
      uColorVoid: { value: currentVoid },
      uIntensity: { value: intensity },
    };

    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: quantumFieldVertexShader,
      fragmentShader: quantumFieldFragmentShader,
      uniforms: bgUniforms,
      transparent: true,
      depthWrite: false,
    });
    bgScene.add(new THREE.Mesh(bgGeo, bgMat));

    // 3D Horizon Lattice Points
    const gridX = isMobile ? 26 : 44;
    const gridY = isMobile ? 18 : 26;
    const horizonGeo = new THREE.PlaneGeometry(16, 9, gridX, gridY);
    const horizonUniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorPrimary: { value: currentPrimary },
      uColorSecondary: { value: currentSecondary },
      uIntensity: { value: intensity },
    };
    const horizonMat = new THREE.ShaderMaterial({
      vertexShader: HORIZON_POINTS_VERT,
      fragmentShader: HORIZON_POINTS_FRAG,
      uniforms: horizonUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const horizonPoints = new THREE.Points(horizonGeo, horizonMat);
    horizonPoints.rotation.x = -0.32;
    fgScene.add(horizonPoints);

    let rafId = 0;
    let isVisible = false;
    let isDisposed = false;
    let lastTime = performance.now();
    const ptrTarget = new THREE.Vector2(0, 0);

    const handleResize = () => {
      if (isDisposed || !canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      bgUniforms.uResolution.value.set(w, h);
      fgCamera.aspect = w / Math.max(h, 1);
      fgCamera.updateProjectionMatrix();
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      ptrTarget.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };

    const animate = (now) => {
      if (isDisposed || !isVisible) {
        rafId = 0;
        return;
      }
      rafId = window.requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) * 0.001, 0.05);
      lastTime = now;

      const elapsed = bgUniforms.uTime.value + dt;
      bgUniforms.uTime.value = elapsed;
      horizonUniforms.uTime.value = elapsed;

      bgUniforms.uPointer.value.lerp(ptrTarget, 0.06);
      horizonUniforms.uPointer.value.copy(bgUniforms.uPointer.value);

      const tc = targetColorsRef.current;
      if (tc) {
        currentPrimary.lerp(tc.primary, 0.06);
        currentSecondary.lerp(tc.secondary, 0.06);
        currentTertiary.lerp(tc.tertiary, 0.06);
        currentVoid.lerp(tc.voidBg, 0.06);
      }

      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.render(fgScene, fgCamera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId && !isDisposed) {
          handleResize();
          lastTime = performance.now();
          rafId = window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    handleResize();

    return () => {
      isDisposed = true;
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      bgGeo.dispose();
      bgMat.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intensity]);

  useEffect(() => {
    const tc = targetColorsRef.current;
    const sc = themePreset.shaderColors;
    if (!tc || !sc) return;
    tc.primary.setRGB(...sc.primary);
    tc.secondary.setRGB(...sc.secondary);
    tc.tertiary.setRGB(...sc.tertiary);
    tc.voidBg.setRGB(...sc.voidBg);
  }, [themePreset]);

  return (
    <canvas
      ref={canvasRef}
      className={`quantum-field-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
