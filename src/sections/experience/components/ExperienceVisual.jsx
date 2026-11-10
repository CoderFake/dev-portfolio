import { PosterArt } from "../../../common/components/PosterArt";

const FALLBACK_POSTERS = [
  { kind: "super", category: "AGENTIC AI / RAG", word: "WU.", title: "WeUpBook" },
  { kind: "partner", category: "BACKEND / AI", word: "NW.", title: "NewWave Solutions" },
  { kind: "match", category: "EMBEDDED / VISION", word: "BV.", title: "Bamboo Viet" },
  { kind: "store", category: "SYSTEMS / CLOUD", word: "SP.", title: "Enterprise" },
];

export function ExperienceVisual({ entry, index, totalCount, topTag = "HVD / EXPERIENCE" }) {
  const poster = entry?.poster || FALLBACK_POSTERS[index % FALLBACK_POSTERS.length];
  const currentStr = String(index + 1).padStart(2, "0");
  const totalStr = String(totalCount).padStart(2, "0");

  return (
    <div className={`experience-visual experience-visual--${index % 4}`} aria-hidden="true">
      <span className="experience-visual-echo experience-art-layer" />
      <span className="experience-visual-echo experience-visual-echo--second experience-art-layer" />

      <div className={`experience-visual-frame project-poster project-poster--${poster.kind}`}>
        <div className="poster-top">
          <span>{topTag}</span>
          <span>
            {currentStr} / {totalStr}
          </span>
        </div>

        <PosterArt
          kind={poster.kind}
          image={poster.image || poster.logo || entry?.image || entry?.logo}
          alt={poster.title || entry?.company}
        />

        <div className="poster-bottom">
          <span className="poster-category">{poster.category}</span>
          <strong>{poster.word}</strong>
          <span className="poster-project-title">{poster.title || entry?.company}</span>
        </div>

        <span className="poster-edge" />
      </div>
    </div>
  );
}
