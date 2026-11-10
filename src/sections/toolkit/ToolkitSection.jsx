import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { SkillVisual } from "./components/SkillVisual";
import { useToolkitTimeline } from "./hooks/useToolkitTimeline";

export function ToolkitSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { toolkit } = data;

  useToolkitTimeline(sectionRef, language);

  return (
    <section
      ref={sectionRef}
      className="toolkit section-pad"
      id="skills"
      data-toolkit-stage
    >
      <div className="toolkit-title">
        <Eyebrow>{toolkit.eyebrow}</Eyebrow>
        <h2>
          {toolkit.titleLineOne}
          <br />
          <span>{toolkit.titleLineTwo}</span>
        </h2>
        <p>{toolkit.description}</p>
      </div>

      <div className="toolkit-columns">
        {toolkit.groups.map((group, idx) => (
          <div
            key={`cap-${idx}`}
            className={`toolkit-group toolkit-group--${idx}`}
            data-toolkit-group
          >
            <div className="toolkit-group-head">
              <span>
                {String(idx + 1).padStart(2, "0")} / {group.title}
              </span>
              <SkillVisual index={idx} />
            </div>
            <p>{group.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
