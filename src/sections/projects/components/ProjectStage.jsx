import { ArrowUpRight } from "lucide-react";
import { SplitText } from "../../../common/components/SplitText";
import { ProjectPoster } from "./ProjectPoster";

export function ProjectStage({ stageCopy, items }) {
  const totalStr = String(items.length).padStart(2, "0");

  return (
    <div className="project-stage" data-project-stage>
      <div className="project-name-field project-name-field--back" aria-hidden="true">
        {items.map((item) => (
          <span key={`back-${item.id || item.title}`} className="project-name-back">
            {item.title}
          </span>
        ))}
      </div>

      <div className="project-type-intro" aria-hidden="true">
        <div className="project-type-line project-type-line--first">
          <SplitText
            text={stageCopy.typeLineOne}
            mode="chars"
            pieceClassName="project-type-char"
          />
        </div>
        <div className="project-type-line project-type-line--second">
          <SplitText
            text={stageCopy.typeLineTwo}
            mode="chars"
            pieceClassName="project-type-char"
          />
        </div>
        <span className="project-type-caption">{stageCopy.typeCaption}</span>
      </div>

      <div className="project-fan-heading" aria-hidden="true">
        <span>{stageCopy.fanEyebrow}</span>
        <strong>{stageCopy.fanTitle}</strong>
      </div>

      <div className="project-stack" data-project-stack>
        <div className="stack-orbit stack-orbit--one" aria-hidden="true" />
        <div className="stack-orbit stack-orbit--two" aria-hidden="true" />

        {items.map((item, idx) => {
          const href = item.link || "#contact";
          const isExternal = href.startsWith("http");
          return (
            <article
              key={item.id || item.title}
              className="stack-card"
              data-project-card
              data-project-index={idx}
            >
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                aria-label={`${item.title} — open project`}
              >
                <ProjectPoster
                  project={item}
                  index={idx}
                  topTag={stageCopy.posterTopTag}
                />
              </a>
            </article>
          );
        })}
      </div>

      <div className="project-meta-deck">
        {items.map((item, idx) => {
          const href = item.link || "#contact";
          const isExternal = href.startsWith("http");
          const ctaText = item.ctaLabel || stageCopy.viewProjectLabel;

          return (
            <div key={`meta-${item.id || item.title}`} className="stack-card-meta" data-project-meta>
              <div className="stack-card-heading">
                <span>
                  {String(idx + 1).padStart(2, "0")} / {totalStr} · {stageCopy.selectedTag}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className="stack-card-bottom">
                <span>{item.tech}</span>
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  {ctaText} <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="project-stage-caption">
        <span>{stageCopy.scrollCaption}</span>
        <span data-project-counter>01 / {totalStr}</span>
      </div>
    </div>
  );
}
