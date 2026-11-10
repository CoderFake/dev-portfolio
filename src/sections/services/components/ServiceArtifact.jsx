export function ServiceArtifact({ index }) {
  if (index === 0) {
    return (
      <svg className="service-artifact" viewBox="0 0 240 100" aria-hidden="true">
        <path
          className="service-artifact-line"
          d="M14 16h188v70H14zM14 32h188M27 24h4m7 0h4m7 0h4M28 46h76v28H28zM116 46h72M116 55h53M116 64h60M116 73h38"
        />
        <path
          className="service-artifact-line service-artifact-accent"
          d="M104 60h13M188 60h25m-4-4 4 4-4 4"
        />
        <rect className="service-artifact-block" x="32" y="50" width="67" height="20" rx="1" />
        <rect className="service-artifact-block" x="117" y="46" width="31" height="5" rx="1" />
        <rect className="service-artifact-block" x="117" y="64" width="42" height="5" rx="1" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg className="service-artifact" viewBox="0 0 240 100" aria-hidden="true">
        <path
          className="service-artifact-line"
          d="M64 10h62a8 8 0 0 1 8 8v68a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V18a8 8 0 0 1 8-8zM75 19h40M71 34h48v32H71zM71 76h19M97 76h22M162 23h52v54h-52zM162 35h52M145 52h17"
        />
        <path
          className="service-artifact-line service-artifact-accent"
          d="M119 51h26m-5-5 5 5-5 5M214 52h17"
        />
        <rect className="service-artifact-block" x="76" y="39" width="38" height="22" rx="1" />
        <rect className="service-artifact-block" x="169" y="44" width="37" height="7" rx="1" />
        <rect className="service-artifact-block" x="169" y="57" width="24" height="7" rx="1" />
      </svg>
    );
  }

  return (
    <svg className="service-artifact" viewBox="0 0 240 100" aria-hidden="true">
      <path
        className="service-artifact-line"
        d="M13 35h45v30H13zM97 20h48v27H97zM97 57h48v27H97zM182 35h45v30h-45zM58 50h18v-17h21M58 50h18v20h21M145 33h18v17h19M145 70h18V50M227 50h10"
      />
      <path
        className="service-artifact-line service-artifact-accent"
        d="M18 50h35M102 33h37M102 70h37M187 50h35"
      />
      <rect className="service-artifact-block" x="21" y="43" width="21" height="14" rx="1" />
      <rect className="service-artifact-block" x="106" y="26" width="29" height="14" rx="1" />
      <rect className="service-artifact-block" x="106" y="63" width="29" height="14" rx="1" />
      <rect className="service-artifact-block" x="192" y="42" width="22" height="16" rx="1" />
    </svg>
  );
}
