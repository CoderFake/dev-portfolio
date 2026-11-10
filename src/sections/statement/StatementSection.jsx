import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { SplitText } from "../../common/components/SplitText";
import { useStatementTimeline } from "./hooks/useStatementTimeline";

export function StatementSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { statement } = data;

  useStatementTimeline(sectionRef, language);

  return (
    <section
      ref={sectionRef}
      className="statement"
      id="statement"
      data-kinetic-stage
      aria-label={statement.ariaLabel}
    >
      <div className="statement-orbit" aria-hidden="true" />
      <div className="type-track type-track--first" aria-hidden="true">
        {statement.trackOne}
      </div>
      <div className="type-track type-track--second" aria-hidden="true">
        {statement.trackTwo}
      </div>

      <div className="statement-top">
        <Eyebrow>{statement.eyebrow}</Eyebrow>
        <span>{statement.stepLabel}</span>
      </div>

      <div className="kinetic-word kinetic-word--build" aria-hidden="true">
        {statement.words.build}
      </div>
      <div className="kinetic-word kinetic-word--design" aria-hidden="true">
        {statement.words.design}
      </div>
      <div className="kinetic-word kinetic-word--code" aria-hidden="true">
        {statement.words.code}
      </div>
      <div className="kinetic-word kinetic-word--with" aria-hidden="true">
        {statement.words.with || "WITH"}
      </div>
      <div className="kinetic-word kinetic-word--ship kinetic-word--ai" aria-hidden="true">
        <span className="kinetic-ai-aura" data-ai-aura aria-hidden="true">
          <span className="kinetic-ai-rays" data-ai-rays />
          <span className="kinetic-ai-halo-ring kinetic-ai-halo-ring--outer" data-ai-ring-outer />
          <span className="kinetic-ai-halo-ring kinetic-ai-halo-ring--inner" data-ai-ring-inner />
          <span className="kinetic-ai-halo-core" data-ai-core />
        </span>
        <SplitText mode="chars" text={statement.words.ship} pieceClassName="kinetic-char" />
      </div>

      <div className="statement-bottom">
        <span>{statement.bottomLeft}</span>
        <span>{statement.bottomRight}</span>
      </div>
    </section>
  );
}
