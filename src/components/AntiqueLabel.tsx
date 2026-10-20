const outline =
  "M57 7C49 7 48 15 40 15H30C16 15 8 24 8 38V175C8 190 19 198 35 198H82C111 198 116 218 150 226C184 218 189 198 218 198H265C281 198 292 190 292 175V38C292 24 284 15 270 15H260C252 15 251 7 243 7Z";

export default function AntiqueLabel() {
  return (
    <svg
      className="antique-label-frame"
      viewBox="0 0 300 240"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path className="label-paper" d={outline} />
      <path d={outline} stroke="currentColor" strokeWidth="1.15" />
      <path
        d={outline}
        transform="translate(150 116) scale(.962 .949) translate(-150 -116)"
        stroke="currentColor"
        strokeWidth=".65"
      />
      <path
        d="M150 211C148 199 144 193 144 189C144 184 150 181 150 181C150 181 156 184 156 189C156 193 152 199 150 211ZM147 205C144 192 133 187 130 193C126 201 142 198 147 205ZM153 205C156 192 167 187 170 193C174 201 158 198 153 205ZM145 210H155M150 211L147 215L150 219L153 215Z"
        fill="currentColor"
        transform="translate(150 211) scale(.55) translate(-150 -200)"
      />
    </svg>
  );
}
