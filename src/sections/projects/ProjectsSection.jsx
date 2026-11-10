import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { SplitText } from "../../common/components/SplitText";
import { ProjectStage } from "./components/ProjectStage";
import { useProjectsTimeline } from "./hooks/useProjectsTimeline";

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { projects } = data;

  useProjectsTimeline(sectionRef, language, projects.items.length);

  return (
    <section ref={sectionRef} className="work section-pad" id="projects">
      <div className="work-intro" data-work-intro>
        <div className="section-heading">
          <div>
            <Eyebrow>{projects.intro.eyebrow}</Eyebrow>
            <h2>
              <span className="work-intro-line work-intro-line--first">
                <SplitText
                  mode="words"
                  text={projects.intro.lineOne}
                  pieceClassName="work-intro-word"
                />
              </span>
              <span className="work-intro-line work-intro-line--second">
                <SplitText
                  mode="words"
                  text={projects.intro.lineTwo}
                  pieceClassName="work-intro-word"
                />
              </span>
            </h2>
          </div>

          <p>
            <SplitText
              mode="words"
              text={projects.intro.description}
              pieceClassName="work-intro-description-word"
            />
          </p>
        </div>
      </div>

      <ProjectStage stageCopy={projects.stage} items={projects.items} />
    </section>
  );
}
