import { assetUrl } from "../assets";

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flourish ${className}`}
      viewBox="0 0 180 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M90 23C73 1 42 28 31 12C25 3 36 0 41 7C45 15 26 22 8 15M90 23C107 1 138 28 149 12C155 3 144 0 139 7C135 15 154 22 172 15M62 17C67 5 80 9 90 23C100 9 113 5 118 17M90 23V9M85 5L90 1L95 5L90 9Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M10 15H1M170 15H179" stroke="currentColor" />
    </svg>
  );
}
export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 150 240"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M64 232C75 176 48 135 94 41M69 196C28 182 15 156 15 140C42 145 63 166 69 196ZM68 166C103 150 123 120 120 102C95 109 76 136 68 166ZM69 141C41 124 28 92 33 77C54 91 67 115 69 141ZM80 103C110 91 126 68 124 51C102 60 86 80 80 103ZM94 67C79 38 89 16 104 5C111 29 103 50 94 67Z" />
        <path d="M69 196L24 151M68 166L113 113M69 141L37 86M80 103L120 61M94 67L103 15M64 220C36 213 25 198 22 184C44 190 57 203 64 220ZM66 208C91 201 108 186 112 171C86 176 73 189 66 208Z" />
        <path d="M66 208L104 180M64 220L30 193" />
      </g>
    </svg>
  );
}

export function PolaroidPortrait({ caption }: { caption: string }) {
  return (
    <div className="baker-polaroid">
      <img
        className="polaroid-photo"
        src={assetUrl("/images/giansy-kitchen-portrait.webp")}
        alt="Giansy sorridente nella sua cucina, accanto a un dolce fatto in casa"
        width="568"
        height="764"
        fetchPriority="high"
      />
      <span className="polaroid-caption">{caption}</span>
    </div>
  );
}
