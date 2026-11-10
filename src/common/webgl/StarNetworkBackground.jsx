import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";

const MODE_TO_ID = {
  sphere: 0,
  wave: 1,
  tunnel: 2,
  spiderweb: 3,
  gravity: 4,
  network: 5,
  agent: 6,
};

const SECTION_MODE_MAP = [
  { selector: "#contact", mode: "sphere" },
  { selector: "#services", mode: "wave" },
  { selector: "#certificates", mode: "tunnel" },
  { selector: "#proof", mode: "gravity" },
  { selector: "#skills", mode: "wave" },
  { selector: "#experience", mode: "network" },
  { selector: ".statement", mode: "spiderweb" },
  { selector: "#projects", mode: "sphere" },
  { selector: "#about", mode: "agent" },
];

let wasmModulePromise = null;

async function loadStarNetworkWasm() {
  if (!wasmModulePromise) {
    wasmModulePromise = (async () => {
      const response = await fetch("/wasm/star_network_engine.wasm");
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          const { instance } = await WebAssembly.instantiateStreaming(response, {});
          return instance.exports;
        } catch {
          const fallbackResp = await fetch("/wasm/star_network_engine.wasm");
          const bytes = await fallbackResp.arrayBuffer();
          const { instance } = await WebAssembly.instantiate(bytes, {});
          return instance.exports;
        }
      }
      const bytes = await response.arrayBuffer();
      const { instance } = await WebAssembly.instantiate(bytes, {});
      return instance.exports;
    })();
  }
  return wasmModulePromise;
}

/**
 * Rust + WebAssembly (SIMD128) 3D Star & Multi-Agent Constellation Network
 * Applied strictly to the lower sections below Hero (#top) for zero GPU contention.
 */
export function StarNetworkBackground({ mode = "auto" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const modeIdRef = useRef(MODE_TO_ID[mode] ?? MODE_TO_ID.agent);
  const themeColorsRef = useRef([0.0, 0.94, 1.0]);
  const { themePreset } = useTheme();

  useEffect(() => {
    if (themePreset?.shaderColors?.primary) {
      themeColorsRef.current = themePreset.shaderColors.primary;
    }
  }, [themePreset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width <= 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / Math.max(height, 1), 0.1, 1000);
    camera.position.z = 45;

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

    // Cap pixel ratio to 1.25 on mobile and 1.5 on desktop for locked 60-120fps
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));

    // Pre-rendered radial glow dot sprite
    const createGlowingDotTexture = () => {
      const canvasDot = document.createElement("canvas");
      canvasDot.width = 64;
      canvasDot.height = 64;
      const ctx = canvasDot.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.12)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvasDot);
    };

    const dotTexture = createGlowingDotTexture();

    const PARTICLE_COUNT = isMobile ? 280 : 480;
    const AGENT_COUNT = isMobile ? 10 : 15;
    const MAX_CONNECTIONS = isMobile ? 340 : 560;

    // 1. Star Nodes Geometry
    const nodesGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(PARTICLE_COUNT * 3);
    const nodeColors = new Float32Array(PARTICLE_COUNT * 3);
    const nodePosAttr = new THREE.BufferAttribute(nodePositions, 3);
    const nodeColAttr = new THREE.BufferAttribute(nodeColors, 3);
    nodePosAttr.setUsage(THREE.DynamicDrawUsage);
    nodeColAttr.setUsage(THREE.DynamicDrawUsage);
    nodesGeometry.setAttribute("position", nodePosAttr);
    nodesGeometry.setAttribute("color", nodeColAttr);

    const nodesMaterial = new THREE.PointsMaterial({
      size: 1.08,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodesSystem = new THREE.Points(nodesGeometry, nodesMaterial);
    scene.add(nodesSystem);

    // 2. Wandering Agent Hubs Geometry
    const agentsGeometry = new THREE.BufferGeometry();
    const agentPositions = new Float32Array(AGENT_COUNT * 3);
    const agentColors = new Float32Array(AGENT_COUNT * 3);
    const agentPosAttr = new THREE.BufferAttribute(agentPositions, 3);
    const agentColAttr = new THREE.BufferAttribute(agentColors, 3);
    agentPosAttr.setUsage(THREE.DynamicDrawUsage);
    agentColAttr.setUsage(THREE.DynamicDrawUsage);
    agentsGeometry.setAttribute("position", agentPosAttr);
    agentsGeometry.setAttribute("color", agentColAttr);

    const agentsMaterial = new THREE.PointsMaterial({
      size: 3.5,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const agentsSystem = new THREE.Points(agentsGeometry, agentsMaterial);
    scene.add(agentsSystem);

    // 3. Constellation Lines Geometry
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
    const lineColAttr = new THREE.BufferAttribute(lineColors, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineColAttr.setUsage(THREE.DynamicDrawUsage);
    linesGeometry.setAttribute("position", linePosAttr);
    linesGeometry.setAttribute("color", lineColAttr);
    linesGeometry.setDrawRange(0, 0);

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const linesSystem = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesSystem);

    let isDisposed = false;
    let rafId = 0;
    let isActiveInLowerSections = false;
    let wasmExports = null;
    let wasmViews = null;

    const rebuildWasmViews = (exports) => {
      const memBuffer = exports.memory.buffer;
      wasmViews = {
        buffer: memBuffer,
        nodePos: new Float32Array(
          memBuffer,
          exports.get_node_positions_ptr(),
          PARTICLE_COUNT * 3
        ),
        nodeCol: new Float32Array(
          memBuffer,
          exports.get_node_colors_ptr(),
          PARTICLE_COUNT * 3
        ),
        agentPos: new Float32Array(
          memBuffer,
          exports.get_agent_positions_ptr(),
          AGENT_COUNT * 3
        ),
        agentCol: new Float32Array(
          memBuffer,
          exports.get_agent_colors_ptr(),
          AGENT_COUNT * 3
        ),
        linePos: new Float32Array(
          memBuffer,
          exports.get_line_positions_ptr(),
          MAX_CONNECTIONS * 6
        ),
        lineCol: new Float32Array(
          memBuffer,
          exports.get_line_colors_ptr(),
          MAX_CONNECTIONS * 6
        ),
      };
    };

    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed || !isActiveInLowerSections || !wasmExports) {
        rafId = 0;
        return;
      }
      rafId = window.requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const [tr, tg, tb] = themeColorsRef.current;

      // Single Rust WebAssembly SIMD call: updates all nodes, agents & line segments
      const activeLineVertices = wasmExports.step_simulation(
        time,
        modeIdRef.current,
        tr,
        tg,
        tb
      );

      if (!wasmViews || wasmViews.buffer !== wasmExports.memory.buffer) {
        rebuildWasmViews(wasmExports);
      }

      // Zero-allocation typed array block copy from Wasm linear memory to VBOs
      nodePositions.set(wasmViews.nodePos);
      nodeColors.set(wasmViews.nodeCol);
      nodePosAttr.needsUpdate = true;
      nodeColAttr.needsUpdate = true;

      agentPositions.set(wasmViews.agentPos);
      agentColors.set(wasmViews.agentCol);
      agentPosAttr.needsUpdate = true;
      agentColAttr.needsUpdate = true;

      if (activeLineVertices > 0) {
        linePositions.set(
          wasmViews.linePos.subarray(0, activeLineVertices * 3)
        );
        lineColors.set(
          wasmViews.lineCol.subarray(0, activeLineVertices * 3)
        );
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
      }
      linesGeometry.setDrawRange(0, activeLineVertices);

      const rotY = time * 0.03;
      const rotX = time * 0.01;
      nodesSystem.rotation.y = rotY;
      nodesSystem.rotation.x = rotX;
      agentsSystem.rotation.y = rotY;
      agentsSystem.rotation.x = rotX;
      linesSystem.rotation.y = rotY;
      linesSystem.rotation.x = rotX;

      renderer.render(scene, camera);
    };

    const startLoopIfNeeded = () => {
      if (!rafId && isActiveInLowerSections && wasmExports && !isDisposed) {
        clock.getDelta();
        rafId = window.requestAnimationFrame(animate);
      }
    };

    loadStarNetworkWasm()
      .then((exports) => {
        if (isDisposed) return;
        wasmExports = exports;
        wasmExports.init_simulation(PARTICLE_COUNT, AGENT_COUNT, MAX_CONNECTIONS);
        rebuildWasmViews(wasmExports);
        startLoopIfNeeded();
      })
      .catch(() => {});

    // Sync active section mode & pause completely while on top Hero (#top)
    let scrollRafId = 0;
    const evaluateScrollState = () => {
      scrollRafId = 0;
      if (isDisposed) return;

      const heroEl = document.getElementById("top");
      const heroBottom = heroEl
        ? heroEl.getBoundingClientRect().bottom
        : window.innerHeight - window.scrollY;

      // Activate Star Network as soon as lower sections enter viewport
      const shouldBeActive = heroBottom < window.innerHeight * 0.92;
      if (shouldBeActive !== isActiveInLowerSections) {
        isActiveInLowerSections = shouldBeActive;
        container.style.opacity = shouldBeActive ? "1" : "0";
        if (shouldBeActive) {
          startLoopIfNeeded();
        }
      }

      if (!shouldBeActive || mode !== "auto") return;

      const probeY = window.innerHeight * 0.45;
      for (const item of SECTION_MODE_MAP) {
        const el = document.querySelector(item.selector);
        if (!el) continue;
        const target = el.parentElement?.classList.contains("pin-spacer")
          ? el.parentElement
          : el;
        const rect = target.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          modeIdRef.current = MODE_TO_ID[item.mode] ?? MODE_TO_ID.sphere;
          return;
        }
      }
    };

    const handleScroll = () => {
      if (!scrollRafId) {
        scrollRafId = window.requestAnimationFrame(evaluateScrollState);
      }
    };

    const handleResize = () => {
      if (isDisposed) return;
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      evaluateScrollState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    evaluateScrollState();

    return () => {
      isDisposed = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      if (scrollRafId) window.cancelAnimationFrame(scrollRafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      dotTexture.dispose();
      nodesGeometry.dispose();
      nodesMaterial.dispose();
      agentsGeometry.dispose();
      agentsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="star-network-layout-backdrop"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="star-network-canvas" />
    </div>
  );
}
