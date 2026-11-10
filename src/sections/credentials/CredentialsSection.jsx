import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Eyebrow } from "../../common/components/Eyebrow";
import { CertificatePlate } from "./components/CertificatePlate";
import { useCredentialsTimeline } from "./hooks/useCredentialsTimeline";

export function CredentialsSection() {
  const sectionRef = useRef(null);
  const { language, data } = useLanguage();
  const { credentials, meta } = data;
  const certs = credentials.certificates;
  const totalStr = String(certs.length).padStart(2, "0");

  useCredentialsTimeline(sectionRef, language, certs.length);

  return (
    <section
      ref={sectionRef}
      className="credentials section-pad"
      id="certificates"
      data-credentials-stage
    >
      <div className="credentials-intro">
        <Eyebrow>{credentials.eyebrow}</Eyebrow>
        <h2>
          {credentials.headingLineOne}
          <br />
          <span>{credentials.headingLineTwo}</span>
        </h2>
      </div>

      <div className="credential-catalog" aria-live="off">
        {certs.map((cert, idx) => (
          <div
            key={`record-${cert.name}-${idx}`}
            className={`credential-record credential-record--${idx}`}
            data-credential-record
          >
            <span className="credential-record-index">
              {String(idx + 1).padStart(2, "0")} / {totalStr}{" "}
              <i>{credentials.archiveTag}</i>
            </span>
            <h3>{cert.name}</h3>
            <p>
              {cert.issuer}
              <span>{cert.date}</span>
            </p>
            <small>{cert.desc}</small>
          </div>
        ))}
      </div>

      <div className="education credentials-education">
        <GraduationCap size={22} />
        <div>
          <h3>{credentials.education.school}</h3>
          <p>{credentials.education.detail}</p>
        </div>
      </div>

      <div className="credentials-viewport">
        <div className="credentials-world" data-credentials-world>
          <div className="credentials-world-guide" aria-hidden="true" />
          {certs.map((cert, idx) => (
            <a
              key={`document-${cert.name}-${idx}`}
              className={`credential-document credential-document--${idx % 5}`}
              data-credential-doc
              href={cert.link || meta.websiteUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${cert.name} — ${cert.issuer}`}
            >
              <CertificatePlate
                cert={cert}
                index={idx}
                recipientName={`${data.hero.titleLineOne} ${data.hero.titleLineTwo}`}
              />
              <span className="credential-inspection" aria-hidden="true">
                <i />
                <i />
                <small>
                  {credentials.docPrefix} {String(idx + 1).padStart(2, "0")} / {totalStr}
                </small>
              </span>
            </a>
          ))}
        </div>

        <span className="credentials-overview-label" aria-hidden="true">
          {credentials.overviewLabel}
        </span>
      </div>
    </section>
  );
}
