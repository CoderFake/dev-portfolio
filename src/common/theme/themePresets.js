/**
 * Standout CGI / WebGL / AGI Theme Presets.
 *
 * Each preset defines both CSS variables for DOM/UI styling and normalized
 * RGB vectors (0..1) for real-time Three.js GLSL shader uniforms.
 */

export const THEME_PRESETS = {
  "cyber-agi": {
    id: "cyber-agi",
    labelVi: "CYBER AGI",
    labelEn: "CYBER AGI",
    swatch: "#00f0ff",
    swatchSecondary: "#8b5cf6",
    cssVars: {
      "--paper": "#eef2ff",
      "--paper-elevated": "#f6f8ff",
      "--paper-muted": "#dfe6fa",
      "--ink": "#070b19",
      "--muted": "#4a5578",
      "--line": "rgba(15, 25, 60, 0.14)",
      "--blue": "#00d2ff",
      "--accent-primary": "#00f0ff",
      "--accent-secondary": "#8b5cf6",
      "--accent-tertiary": "#f43f5e",
      "--accent-solid": "#4f46e5",
      "--accent-glow": "rgba(0, 240, 255, 0.38)",
      "--dark-void": "#04060e",
      "--dark-surface": "#090d1e",
      "--dark-elevated": "#101735",
      "--dark-ink": "#f2f6ff",
      "--dark-muted": "#94a3c8",
      "--dark-line": "rgba(0, 240, 255, 0.18)",
      "--hero-bg":
        "radial-gradient(circle at 74% 44%, rgba(139, 92, 246, 0.22) 0%, rgba(0, 240, 255, 0.12) 28%, rgba(5, 8, 20, 0.96) 66%), linear-gradient(135deg, #03050c 0%, #070c1f 52%, #040611 100%)",
      "--stage-bg":
        "radial-gradient(circle at 50% 42%, #15224c 0%, #0a1128 48%, #040711 100%)",
      "--statement-bg":
        "radial-gradient(circle at 78% 50%, rgba(139, 92, 246, 0.24) 0%, rgba(0, 240, 255, 0.08) 42%, #050814 100%)",
      "--proof-bg":
        "radial-gradient(60% 52% at 75% 88%, rgba(0, 240, 255, 0.18), transparent 80%), linear-gradient(160deg, #060a18 0%, #0b1229 100%)",
      "--contact-bg":
        "radial-gradient(52% 48% at 22% 78%, rgba(244, 63, 94, 0.55) 0%, rgba(139, 92, 246, 0.38) 38%, transparent 78%), radial-gradient(56% 55% at 68% 75%, rgba(0, 240, 255, 0.48) 0%, rgba(79, 70, 229, 0.45) 48%, transparent 84%), linear-gradient(155deg, #050814 4%, #0d1536 48%, #1a103c 100%)",
    },
    shaderColors: {
      primary: [0.0, 0.94, 1.0], // #00F0FF Electric Cyan
      secondary: [0.55, 0.36, 0.96], // #8B5CF6 Hyper Violet
      tertiary: [0.96, 0.25, 0.37], // #F43F5E Laser Rose
      voidBg: [0.02, 0.03, 0.07],
    },
  },
  "solar-flare": {
    id: "solar-flare",
    labelVi: "SOLAR CGI",
    labelEn: "SOLAR CGI",
    swatch: "#ff5500",
    swatchSecondary: "#ffb800",
    cssVars: {
      "--paper": "#fff6ed",
      "--paper-elevated": "#fffaf5",
      "--paper-muted": "#f7e6d4",
      "--ink": "#140904",
      "--muted": "#6e5040",
      "--line": "rgba(45, 20, 5, 0.14)",
      "--blue": "#ff5500",
      "--accent-primary": "#ff5500",
      "--accent-secondary": "#ffb800",
      "--accent-tertiary": "#ff1e56",
      "--accent-solid": "#ea580c",
      "--accent-glow": "rgba(255, 85, 0, 0.4)",
      "--dark-void": "#090504",
      "--dark-surface": "#150b07",
      "--dark-elevated": "#26120a",
      "--dark-ink": "#fff5eb",
      "--dark-muted": "#c9a690",
      "--dark-line": "rgba(255, 120, 40, 0.22)",
      "--hero-bg":
        "radial-gradient(circle at 74% 44%, rgba(255, 85, 0, 0.25) 0%, rgba(255, 184, 0, 0.12) 30%, rgba(10, 5, 3, 0.96) 66%), linear-gradient(135deg, #080403 0%, #160a05 52%, #090403 100%)",
      "--stage-bg":
        "radial-gradient(circle at 50% 42%, #38170b 0%, #1c0b05 48%, #090403 100%)",
      "--statement-bg":
        "radial-gradient(circle at 78% 50%, rgba(255, 85, 0, 0.25) 0%, rgba(255, 184, 0, 0.08) 42%, #0b0504 100%)",
      "--proof-bg":
        "radial-gradient(60% 52% at 75% 88%, rgba(255, 85, 0, 0.22), transparent 80%), linear-gradient(160deg, #0c0604 0%, #1d0d07 100%)",
      "--contact-bg":
        "radial-gradient(52% 48% at 22% 78%, rgba(255, 30, 86, 0.55) 0%, rgba(255, 85, 0, 0.42) 38%, transparent 78%), radial-gradient(56% 55% at 68% 75%, rgba(255, 184, 0, 0.44) 0%, rgba(217, 70, 15, 0.45) 48%, transparent 84%), linear-gradient(155deg, #090403 4%, #240e06 48%, #310b19 100%)",
    },
    shaderColors: {
      primary: [1.0, 0.33, 0.0], // #FF5500 Molten Orange
      secondary: [1.0, 0.72, 0.0], // #FFB800 Cyber Gold
      tertiary: [1.0, 0.12, 0.34], // #FF1E56 Crimson Plasma
      voidBg: [0.04, 0.02, 0.015],
    },
  },
  "quantum-emerald": {
    id: "quantum-emerald",
    labelVi: "QUANTUM AI",
    labelEn: "QUANTUM AI",
    swatch: "#00ff9d",
    swatchSecondary: "#00d2ff",
    cssVars: {
      "--paper": "#ecfdf5",
      "--paper-elevated": "#f4fef9",
      "--paper-muted": "#d5f5e6",
      "--ink": "#04160f",
      "--muted": "#3b6654",
      "--line": "rgba(6, 45, 30, 0.14)",
      "--blue": "#00c47a",
      "--accent-primary": "#00ff9d",
      "--accent-secondary": "#00d2ff",
      "--accent-tertiary": "#a3e635",
      "--accent-solid": "#059669",
      "--accent-glow": "rgba(0, 255, 157, 0.38)",
      "--dark-void": "#030b08",
      "--dark-surface": "#061711",
      "--dark-elevated": "#0b291e",
      "--dark-ink": "#ecfdf5",
      "--dark-muted": "#86b8a4",
      "--dark-line": "rgba(0, 255, 157, 0.2)",
      "--hero-bg":
        "radial-gradient(circle at 74% 44%, rgba(0, 255, 157, 0.22) 0%, rgba(0, 210, 255, 0.12) 30%, rgba(3, 11, 8, 0.96) 66%), linear-gradient(135deg, #020806 0%, #061812 52%, #030a07 100%)",
      "--stage-bg":
        "radial-gradient(circle at 50% 42%, #0c3527 0%, #061c14 48%, #030a07 100%)",
      "--statement-bg":
        "radial-gradient(circle at 78% 50%, rgba(0, 255, 157, 0.22) 0%, rgba(0, 210, 255, 0.08) 42%, #040d09 100%)",
      "--proof-bg":
        "radial-gradient(60% 52% at 75% 88%, rgba(0, 255, 157, 0.2), transparent 80%), linear-gradient(160deg, #040e0a 0%, #082017 100%)",
      "--contact-bg":
        "radial-gradient(52% 48% at 22% 78%, rgba(0, 255, 157, 0.5) 0%, rgba(5, 150, 105, 0.38) 38%, transparent 78%), radial-gradient(56% 55% at 68% 75%, rgba(0, 210, 255, 0.45) 0%, rgba(16, 185, 129, 0.4) 48%, transparent 84%), linear-gradient(155deg, #030b08 4%, #08261c 48%, #062535 100%)",
    },
    shaderColors: {
      primary: [0.0, 1.0, 0.62], // #00FF9D Bio Emerald
      secondary: [0.0, 0.82, 1.0], // #00D2FF Ice Cyan
      tertiary: [0.64, 0.9, 0.21], // #A3E635 Cyber Lime
      voidBg: [0.015, 0.04, 0.03],
    },
  },
};

export const THEME_ORDER = ["cyber-agi", "solar-flare", "quantum-emerald"];
