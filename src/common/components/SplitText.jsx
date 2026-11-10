import { Fragment } from "react";

export function SplitText({ text, mode = "words", className = "", pieceClassName = "" }) {
  const pieces =
    mode === "chars"
      ? Array.from(text)
      : mode === "words"
        ? text.split(/\s+/)
        : text.split("\n");

  return (
    <span className={`split-text ${className}`.trim()} aria-label={text}>
      {pieces.map((piece, index) => (
        <span
          key={`${index}-${piece}`}
          className={`split-piece ${pieceClassName}`.trim()}
          aria-hidden="true"
        >
          {piece === " " ? "\u00A0" : piece}
          {mode === "words" && index < pieces.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

export function ExperienceLettering({ text, charClass }) {
  const words = text.split(/\s+/);
  return (
    <span className="experience-lettering" aria-label={text}>
      {words.map((word, wordIdx) => (
        <Fragment key={`${word}-${wordIdx}`}>
          {wordIdx > 0 ? " " : null}
          <span className="experience-word" aria-hidden="true">
            {Array.from(word).map((char, charIdx) => (
              <span key={`${char}-${charIdx}`} className={charClass}>
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export function ServiceHeadingLetters({ text }) {
  const words = text.split(/\s+/);
  return (
    <span className="service-heading-letters" aria-label={text}>
      {words.map((word, wordIdx) => (
        <Fragment key={`${word}-${wordIdx}`}>
          {wordIdx > 0 ? " " : null}
          <span className="service-heading-word" aria-hidden="true">
            {Array.from(word).map((char, charIdx) => (
              <span key={`${char}-${charIdx}`} className="service-heading-char">
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
