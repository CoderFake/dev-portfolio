import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { ExperienceLettering } from "../../common/components/SplitText";
import { ExperienceVisual } from "./components/ExperienceVisual";
import { useExperienceTimeline } from "./hooks/useExperienceTimeline";

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { experience } = data;
  const totalCount = experience.items.length;
  const totalStr = String(totalCount).padStart(2, "0");

  useExperienceTimeline(sectionRef, language, totalCount);

  return (
    <section ref={sectionRef} className="experience section-pad" id="experience">
      <div className="experience-list">
        {experience.items.map((item, idx) => (
          <div
            key={`job-${item.company}-${idx}`}
            className={`experience-entry experience-entry--${idx % 4}`}
            data-watermark={item.watermark || item.company.toUpperCase()}
          >
            {idx === 0 && (
              <div className="experience-first-intro">
                <Eyebrow>{experience.eyebrow}</Eyebrow>
                <h2>
                  <ExperienceLettering
                    text={experience.heading}
                    charClass="experience-title-char"
                  />
                </h2>
              </div>
            )}

            <article className="experience-row">
              <div className="experience-copy">
                <div className="experience-meta">
                  <span className="experience-date">{item.period}</span>
                  <span className="experience-arrow">
                    {String(idx + 1).padStart(2, "0")} / {totalStr}
                  </span>
                </div>

                <h3 className="experience-company">
                  <ExperienceLettering
                    text={item.company}
                    charClass="experience-company-char"
                  />
                </h3>

                <p className="experience-role">{item.role}</p>
                <p className="experience-project">{item.project}</p>

                <ul className="experience-points">
                  {item.points.map((point, pIdx) => (
                    <li key={`job-${idx}-point-${pIdx}`}>{point}</li>
                  ))}
                </ul>
              </div>

              <ExperienceVisual
                entry={item}
                index={idx}
                totalCount={totalCount}
                topTag={experience.posterTopTag}
              />
            </article>
          </div>
        ))}
      </div>

      <div className="experience-archive" aria-hidden="true">
        <div className="experience-archive-inner">
          {experience.items.map((item, idx) => (
            <div
              key={`archive-${item.company}-${idx}`}
              className="experience-archive-card"
              data-experience-archive-card
            >
              <ExperienceVisual
                entry={item}
                index={idx}
                totalCount={totalCount}
                topTag={experience.posterTopTag}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="experience-finale">
        <span className="experience-finale-kicker">{experience.finale.kicker}</span>
        <h3>
          {experience.finale.titleLineOne}
          <br />
          <span>{experience.finale.titleLineTwo}</span>
        </h3>
        <div className="experience-finale-line" />
        <p>{experience.finale.summary}</p>
        <div className="experience-finale-companies">
          {experience.items.map((item, idx) => (
            <span key={`finale-${item.company}`} className="experience-finale-company">
              {String(idx + 1).padStart(2, "0")} <strong>{item.company}</strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
