import { Award } from "lucide-react";

export function CertificatePlate({ cert, index, recipientName = "HOANG VAN DIEU" }) {
  if (cert.image) {
    return (
      <img
        src={cert.image}
        alt={`${cert.name} certificate`}
        width={792}
        height={612}
        loading="lazy"
      />
    );
  }

  const accent = cert.accent || "#3348c5";
  const badgeText = cert.badge || "HONOR & ACHIEVEMENT";
  const serialText = cert.serial || `HVD-CERT-0${index + 1}`;

  return (
    <div
      className="certificate-plate"
      style={{ "--cert-accent": accent }}
      aria-hidden="true"
    >
      <div className="certificate-plate-frame">
        <div className="certificate-plate-top">
          <span className="certificate-plate-badge">{badgeText}</span>
          <span className="certificate-plate-serial">{serialText}</span>
        </div>

        <div className="certificate-plate-body">
          <p className="certificate-plate-kicker">CERTIFICATE OF RECOGNITION</p>
          <h4 className="certificate-plate-title">{cert.name}</h4>
          <p className="certificate-plate-recipient">
            PRESENTED TO <strong>{recipientName}</strong>
          </p>
          <p className="certificate-plate-desc">{cert.desc}</p>
        </div>

        <div className="certificate-plate-footer">
          <div className="certificate-plate-meta">
            <span>ISSUED BY</span>
            <strong>{cert.issuer}</strong>
          </div>
          <div className="certificate-plate-meta certificate-plate-meta--right">
            <span>YEAR</span>
            <strong>{cert.date}</strong>
          </div>
          <div className="certificate-plate-seal">
            <Award size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
