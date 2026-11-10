import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { SplitText, ServiceHeadingLetters } from "../../common/components/SplitText";
import { ServiceArtifact } from "./components/ServiceArtifact";
import { useServicesTimeline } from "./hooks/useServicesTimeline";

export function ServicesSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { services } = data;

  useServicesTimeline(sectionRef, language);

  return (
    <section
      ref={sectionRef}
      className="services section-pad"
      id="services"
      data-service-stage
    >
      <div className="section-heading">
        <div>
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2>
            <span className="service-heading-first">
              <ServiceHeadingLetters text={services.headingFirst} />
            </span>
            <br />
            <span className="service-heading-second">
              <ServiceHeadingLetters text={services.headingSecond} />
            </span>
          </h2>
        </div>

        <p data-service-intro>{services.intro}</p>
      </div>

      <div className="service-rows">
        {services.items.map((item, idx) => (
          <article key={`svc-${idx}`} className="service-lane" data-service-lane>
            <span className="service-lane-index">{String(idx + 1).padStart(2, "0")}</span>

            <h3>
              <SplitText
                mode="words"
                text={item.title}
                pieceClassName="service-lane-word"
              />
            </h3>

            <p>
              <SplitText
                mode="words"
                text={item.description}
                pieceClassName="service-description-word"
              />
            </p>

            <div className="service-artifact-frame">
              <ServiceArtifact index={idx} />
            </div>

            <div className="service-route" aria-hidden="true">
              <span className="service-route-track" />
              <span className="service-route-current" data-service-route-line />
              <span className="service-route-signal" data-service-signal />
              {[0, 1, 2, 3].map((nodeIdx) => (
                <i
                  key={nodeIdx}
                  className="service-route-node"
                  data-service-node
                />
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="service-spine" aria-hidden="true">
        <span data-service-spine />
        <i />
        <i />
        <i />
      </div>

      <svg className="service-handoff" data-service-handoff aria-hidden="true">
        <path data-service-handoff-path />
        <path data-service-handoff-path />
        <path data-service-handoff-path />
        <path data-service-handoff-path />
      </svg>
    </section>
  );
}
