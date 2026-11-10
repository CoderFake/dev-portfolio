import { useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { createAgiNeuralCoreScene } from "./createAgiNeuralCoreScene";

export function AgiNeuralCoreCanvas({ mode = "agi-core", pulseTrigger = 0, className = "" }) {
  const canvasRef = useRef(null);
  const controllerRef = useRef(null);
  const { themePreset } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let controller = null;
    try {
      controller = createAgiNeuralCoreScene(canvas, themePreset.shaderColors, {
        initialMode: mode,
      });
      controllerRef.current = controller;
    } catch {
      // Graceful fallback if WebGL context is unavailable
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        controller?.setVisible(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      controller?.dispose();
      controllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controllerRef.current?.setThemeColors(themePreset.shaderColors);
  }, [themePreset]);

  useEffect(() => {
    controllerRef.current?.setMode(mode);
  }, [mode]);

  useEffect(() => {
    if (pulseTrigger > 0) {
      controllerRef.current?.triggerPulse();
    }
  }, [pulseTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className={`agi-neural-core-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
