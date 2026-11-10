export function ContactLine({ text, mode }) {
  return (
    <span
      className={`contact-line contact-line--${mode}`}
      data-contact-line
      aria-hidden="true"
    >
      {Array.from(text).map((char, idx) => (
        <span
          key={`${mode}-${idx}`}
          className={`contact-glyph${char === "." ? " contact-final-period" : ""}`}
          data-contact-glyph
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
