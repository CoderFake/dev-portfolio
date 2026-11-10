import { useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { useProofTimeline } from "./hooks/useProofTimeline";

export function ProofSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { proof } = data;

  useProofTimeline(sectionRef, language);

  const maxValue = Math.max(
    1,
    ...proof.stats.map((item) => Number.parseInt(String(item.value), 10) || 1)
  );

  return (
    <section ref={sectionRef} className="proof section-pad" id="proof">
      <Eyebrow>{proof.eyebrow}</Eyebrow>

      <div className="proof-grid">
        {proof.stats.map((stat, idx) => {
          const suffix = stat.suffix ?? "+";
          return (
            <div key={`stat-${idx}`} className="proof-item">
              <span>{String(idx + 1).padStart(2, "0")}</span>
              <strong data-proof-value={stat.value} data-proof-suffix={suffix}>
                {stat.value}
                {suffix}
              </strong>
              <p>{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="proof-chart" aria-hidden="true">
        <span className="proof-chart-cursor" />
        {proof.stats.map((stat, idx) => {
          const heightPercent = Math.round(
            ((Number.parseInt(String(stat.value), 10) || 1) / maxValue) * 100
          );
          return (
            <div key={`proof-chart-${idx}`} className="proof-chart-slot">
              <span
                className="proof-chart-bar"
                style={{ height: `${heightPercent}%` }}
              />
              <span className="proof-chart-index">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
