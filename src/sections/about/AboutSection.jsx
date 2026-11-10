import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { SplitText } from "../../common/components/SplitText";
import { useAboutTimeline } from "./hooks/useAboutTimeline";

export function AboutSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { about } = data;

  useAboutTimeline(sectionRef, language);

  return (
    <section ref={sectionRef} className="intro section-pad" id="about">
      <div className="intro-label">
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <span className="vertical-mark">{about.verticalMark}</span>
      </div>

      <div className="intro-copy">
        <h2>
          <span className="intro-heading-line">
            {about.headingLineOne.split(" ").map((word, idx) => (
              <span key={`about-first-${idx}`} className="intro-heading-word">
                {word}{" "}
              </span>
            ))}
          </span>
          <span className="intro-heading-line">
            {about.headingLineTwo.split(" ").map((word, idx) => (
              <span key={`about-second-${idx}`} className="intro-heading-word">
                {word}{" "}
              </span>
            ))}
          </span>
        </h2>

        <div className="intro-detail">
          {about.paragraphs.map((paragraph, idx) => (
            <p key={`about-p-${idx}`} className="intro-word-scrub">
              <SplitText mode="words" text={paragraph} pieceClassName="scroll-word" />
            </p>
          ))}
        </div>
      </div>

      <div className="capability-line">
        {about.capabilities.map((cap) => (
          <span key={cap}>{cap}</span>
        ))}
      </div>
    </section>
  );
}
