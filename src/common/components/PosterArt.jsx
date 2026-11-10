export const DEFAULT_POSTER_PRESETS = [
  { label: "SAAS WIDGET / RAG", word: "EC.", kind: "store" },
  { label: "MULTI-AGENT / ADS", word: "AM.", kind: "media" },
  { label: "DOCUMENT AI / LLM", word: "CL.", kind: "commerce" },
  { label: "ORCHESTRATOR / ADK", word: "MP.", kind: "partner" },
  { label: "NVIDIA RAG / TENSOR", word: "NR.", kind: "farm" },
  { label: "SPEECH AI / EDTECH", word: "HL.", kind: "mini" },
  { label: "AI STUDIO / MINDMAP", word: "NB.", kind: "news" },
  { label: "A2UI / AGENT CHAT", word: "AC.", kind: "super" },
  { label: "REALTIME / TELEMETRY", word: "YL.", kind: "game" },
  { label: "AGENTIC RAG / MILVUS", word: "IC.", kind: "match" },
  { label: "YOLO VISION / EDGE AI", word: "MH.", kind: "concert" },
];

export function PosterArt({ kind = "store", image = "", alt = "" }) {
  return (
    <div className={`poster-art poster-art--${kind} poster-art--ai`} aria-hidden="true">
      <div className="poster-ai-grid" />
      <div className="poster-art-ring poster-art-ring--one" />
      <div className="poster-art-ring poster-art-ring--two" />

      <div className="poster-art-core poster-art-core--ai">
        {image ? (
          <img
            className="poster-custom-image"
            src={image}
            alt={alt}
            loading="lazy"
          />
        ) : null}

        {!image && kind === "media" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <circle cx="120" cy="100" r="68" stroke="currentColor" strokeOpacity="0.22" strokeDasharray="4 6" />
            <path
              d="M120 100 L56 52 M120 100 L184 52 M120 100 L56 148 M120 100 L184 148 M120 100 L120 34"
              stroke="var(--poster-accent)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="56" cy="52" r="14" fill="rgba(5,10,24,0.85)" stroke="var(--poster-accent)" strokeWidth="2" />
            <circle cx="184" cy="52" r="14" fill="rgba(5,10,24,0.85)" stroke="var(--poster-accent)" strokeWidth="2" />
            <circle cx="56" cy="148" r="14" fill="rgba(5,10,24,0.85)" stroke="var(--poster-accent)" strokeWidth="2" />
            <circle cx="184" cy="148" r="14" fill="rgba(5,10,24,0.85)" stroke="var(--poster-accent)" strokeWidth="2" />
            <circle cx="120" cy="34" r="11" fill="rgba(5,10,24,0.85)" stroke="currentColor" strokeWidth="2" />
            <rect
              x="88"
              y="70"
              width="64"
              height="60"
              rx="14"
              fill="rgba(6,12,28,0.92)"
              stroke="var(--poster-accent)"
              strokeWidth="2.5"
            />
            <text x="120" y="105" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800">
              AI
            </text>
            <text x="120" y="120" textAnchor="middle" fill="var(--poster-accent)" fontSize="7" fontWeight="700" letterSpacing="1.5">
              AGENTS
            </text>
          </svg>
        )}

        {!image && kind === "news" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <rect
              x="34"
              y="26"
              width="172"
              height="148"
              rx="14"
              fill="rgba(6,12,28,0.86)"
              stroke="var(--poster-accent)"
              strokeWidth="2"
            />
            <path
              d="M74 68 H166 M74 92 H142 M74 116 H158"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M68 146 C96 122 144 122 172 146"
              stroke="var(--poster-accent)"
              strokeWidth="2.2"
              strokeDasharray="3 4"
            />
            <circle cx="68" cy="146" r="8" fill="var(--poster-accent)" />
            <circle cx="120" cy="130" r="10" fill="#ffffff" />
            <circle cx="172" cy="146" r="8" fill="var(--poster-accent)" />
            <rect x="54" y="42" width="64" height="16" rx="8" fill="var(--poster-accent)" fillOpacity="0.22" />
            <text x="86" y="53" textAnchor="middle" fill="var(--poster-accent)" fontSize="8" fontWeight="800" letterSpacing="1.2">
              RAG · LLM
            </text>
          </svg>
        )}

        {!image && kind === "super" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <polygon
              points="120,26 184,63 184,137 120,174 56,137 56,63"
              fill="rgba(6,12,28,0.82)"
              stroke="var(--poster-accent)"
              strokeWidth="2.2"
            />
            <polygon
              points="120,48 164,74 164,126 120,152 76,126 76,74"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="120" cy="100" r="26" fill="var(--poster-accent)" fillOpacity="0.18" stroke="#ffffff" strokeWidth="2" />
            <text x="120" y="105" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="800" letterSpacing="1">
              A2UI
            </text>
            <circle cx="120" cy="26" r="5" fill="var(--poster-accent)" />
            <circle cx="184" cy="63" r="5" fill="var(--poster-accent)" />
            <circle cx="184" cy="137" r="5" fill="var(--poster-accent)" />
            <circle cx="120" cy="174" r="5" fill="var(--poster-accent)" />
            <circle cx="56" cy="137" r="5" fill="var(--poster-accent)" />
            <circle cx="56" cy="63" r="5" fill="var(--poster-accent)" />
          </svg>
        )}

        {!image && kind === "partner" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <circle cx="120" cy="100" r="74" stroke="var(--poster-accent)" strokeOpacity="0.3" strokeWidth="1.5" />
            <circle cx="120" cy="100" r="46" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="5 5" />
            <path
              d="M120 26 V174 M46 100 H194 M68 48 L172 152 M172 48 L68 152"
              stroke="var(--poster-accent)"
              strokeOpacity="0.45"
              strokeWidth="1.6"
            />
            <circle cx="120" cy="100" r="28" fill="rgba(6,12,28,0.95)" stroke="var(--poster-accent)" strokeWidth="2.5" />
            <text x="120" y="98" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
              ADK
            </text>
            <text x="120" y="111" textAnchor="middle" fill="var(--poster-accent)" fontSize="7" fontWeight="700" letterSpacing="1">
              MESH
            </text>
            <circle cx="120" cy="26" r="7" fill="#ffffff" />
            <circle cx="194" cy="100" r="7" fill="var(--poster-accent)" />
            <circle cx="120" cy="174" r="7" fill="#ffffff" />
            <circle cx="46" cy="100" r="7" fill="var(--poster-accent)" />
          </svg>
        )}

        {!image && kind === "farm" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <rect x="44" y="40" width="152" height="32" rx="8" fill="rgba(6,12,28,0.88)" stroke="var(--poster-accent)" strokeWidth="2" />
            <rect x="44" y="84" width="152" height="32" rx="8" fill="rgba(6,12,28,0.88)" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
            <rect x="44" y="128" width="152" height="32" rx="8" fill="rgba(6,12,28,0.88)" stroke="var(--poster-accent)" strokeWidth="2" />
            <text x="120" y="60" textAnchor="middle" fill="var(--poster-accent)" fontSize="10" fontWeight="800" letterSpacing="2">
              VECTOR EMBED
            </text>
            <text x="120" y="104" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800" letterSpacing="2">
              MILVUS · GPU
            </text>
            <text x="120" y="148" textAnchor="middle" fill="var(--poster-accent)" fontSize="10" fontWeight="800" letterSpacing="2">
              NEURAL RERANK
            </text>
          </svg>
        )}

        {!image && kind === "mini" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <rect x="38" y="34" width="164" height="132" rx="18" fill="rgba(6,12,28,0.86)" stroke="var(--poster-accent)" strokeWidth="2.2" />
            <path
              d="M62 104 V96 M78 122 V78 M94 138 V62 M110 114 V86 M126 144 V56 M142 126 V74 M158 110 V90 M174 128 V72"
              stroke="var(--poster-accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="174" cy="54" r="6" fill="#ffffff" />
            <text x="82" y="56" fill="#ffffff" fontSize="9" fontWeight="800" letterSpacing="1.6">
              VOICE · AI
            </text>
          </svg>
        )}

        {!image && kind === "store" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <circle cx="120" cy="100" r="64" fill="rgba(6,12,28,0.84)" stroke="var(--poster-accent)" strokeWidth="2.2" />
            <ellipse cx="120" cy="100" rx="64" ry="26" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" />
            <ellipse cx="120" cy="100" rx="26" ry="64" stroke="var(--poster-accent)" strokeOpacity="0.65" strokeWidth="1.6" />
            <circle cx="120" cy="100" r="18" fill="var(--poster-accent)" />
            <text x="120" y="104" textAnchor="middle" fill="#040712" fontSize="11" fontWeight="900">
              RAG
            </text>
          </svg>
        )}

        {!image && kind === "commerce" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <rect x="52" y="28" width="136" height="144" rx="14" fill="rgba(6,12,28,0.88)" stroke="var(--poster-accent)" strokeWidth="2.2" />
            <line x1="40" y1="96" x2="200" y2="96" stroke="#ffffff" strokeWidth="2.5" />
            <rect x="72" y="50" width="96" height="12" rx="6" fill="var(--poster-accent)" fillOpacity="0.35" />
            <rect x="72" y="72" width="68" height="10" rx="5" fill="currentColor" fillOpacity="0.35" />
            <rect x="72" y="112" width="96" height="10" rx="5" fill="currentColor" fillOpacity="0.35" />
            <rect x="72" y="132" width="82" height="12" rx="6" fill="var(--poster-accent)" fillOpacity="0.35" />
            <text x="120" y="160" textAnchor="middle" fill="var(--poster-accent)" fontSize="8" fontWeight="800" letterSpacing="1.6">
              GEMINI · PARSER
            </text>
          </svg>
        )}

        {!image && kind === "game" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <rect x="64" y="44" width="112" height="112" rx="18" fill="rgba(6,12,28,0.9)" stroke="var(--poster-accent)" strokeWidth="2.4" />
            <path
              d="M84 44 V24 M120 44 V24 M156 44 V24 M84 176 V156 M120 176 V156 M156 176 V156 M44 76 H64 M44 100 H64 M44 124 H64 M176 76 H196 M176 100 H196 M176 124 H196"
              stroke="var(--poster-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M78 106 L98 106 L108 78 L128 124 L140 94 L162 94"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {!image && kind === "match" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <path
              d="M28 156 C68 148 72 52 120 74 S168 164 212 46"
              stroke="var(--poster-accent)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M28 156 L120 74 L212 46"
              stroke="#ffffff"
              strokeOpacity="0.45"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
            <circle cx="64" cy="118" r="7" fill="rgba(6,12,28,0.9)" stroke="var(--poster-accent)" strokeWidth="2.5" />
            <circle cx="120" cy="74" r="11" fill="#ffffff" />
            <circle cx="168" cy="114" r="7" fill="rgba(6,12,28,0.9)" stroke="var(--poster-accent)" strokeWidth="2.5" />
            <circle cx="212" cy="46" r="9" fill="var(--poster-accent)" />
          </svg>
        )}

        {!image && kind === "concert" && (
          <svg className="poster-ai-svg" viewBox="0 0 240 200" fill="none">
            <path
              d="M48 68 V44 H72 M168 44 H192 V68 M192 132 V156 H168 M72 156 H48 V132"
              stroke="var(--poster-accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="120" cy="100" r="34" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="120" cy="100" r="8" fill="var(--poster-accent)" />
            <line x1="72" y1="100" x2="168" y2="100" stroke="var(--poster-accent)" strokeOpacity="0.6" strokeWidth="1.5" />
            <line x1="120" y1="52" x2="120" y2="148" stroke="var(--poster-accent)" strokeOpacity="0.6" strokeWidth="1.5" />
            <text x="120" y="174" textAnchor="middle" fill="var(--poster-accent)" fontSize="8" fontWeight="800" letterSpacing="2">
              YOLO · VISION AI
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}
