export function SkillVisual({ index }) {
  if (index === 0) {
    return (
      <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true">
        <path d="M18 22h204M18 47h128M18 72h185M18 97h94" />
        <path className="skill-accent" d="M164 47h42M126 97h56" />
        <circle cx="30" cy="116" r="4" />
        <circle cx="49" cy="116" r="4" />
        <circle cx="68" cy="116" r="4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true">
        <rect x="16" y="22" width="150" height="88" rx="5" />
        <path d="M16 39h150M31 53h78M31 65h104M31 77h61" />
        <rect className="skill-accent" x="178" y="42" width="43" height="76" rx="8" />
        <path d="M188 54h23M188 64h23M188 74h16" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true">
        <ellipse cx="55" cy="29" rx="30" ry="9" />
        <path d="M25 29v48c0 5 13 9 30 9s30-4 30-9V29M25 53c0 5 13 9 30 9s30-4 30-9" />
        <circle className="skill-accent-fill" cx="153" cy="38" r="9" />
        <circle cx="190" cy="66" r="9" />
        <circle cx="143" cy="94" r="9" />
        <path className="skill-accent" d="M161 43l21 17M181 74l-29 14M143 47l-1 38" />
      </svg>
    );
  }

  return (
    <svg className="skill-visual" viewBox="0 0 240 130" aria-hidden="true">
      <rect x="16" y="52" width="56" height="30" rx="4" />
      <rect className="skill-accent-fill" x="92" y="20" width="56" height="30" rx="4" />
      <rect x="168" y="77" width="56" height="30" rx="4" />
      <path className="skill-accent" d="M72 67h20V35h0M148 35h20v57h0M72 67h96" />
      <circle cx="82" cy="67" r="3" />
      <circle cx="158" cy="35" r="3" />
      <circle cx="158" cy="92" r="3" />
    </svg>
  );
}
