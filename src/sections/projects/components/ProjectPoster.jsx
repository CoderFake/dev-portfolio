import { DEFAULT_POSTER_PRESETS, PosterArt } from "../../../common/components/PosterArt";

export function ProjectPoster({ project, index, topTag = "HVD / SELECTED WORK" }) {
  const fallback = DEFAULT_POSTER_PRESETS[index % DEFAULT_POSTER_PRESETS.length];
  const kind = project.posterKind || fallback.kind;
  const category = project.posterCategory || fallback.label;
  const word = project.posterWord || fallback.word;

  return (
    <div className={`project-poster project-poster--${kind}`}>
      <div className="poster-top">
        <span>{topTag}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <PosterArt
        kind={kind}
        image={project.image || project.logo}
        alt={project.title}
      />

      <div className="poster-bottom">
        <span className="poster-category">{category}</span>
        <strong>{word}</strong>
        <span className="poster-project-title">{project.title}</span>
      </div>

      <span className="poster-edge" aria-hidden="true" />
    </div>
  );
}
