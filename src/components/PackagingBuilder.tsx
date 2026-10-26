import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { packagingOptions, money } from "../data/products";
import { assetUrl } from "../assets";
import { t } from "../i18n";
import { useSelectionLimit } from "../selection-context";

export function SelectionProgress() {
  const { usedSpace, capacity } = useSelectionLimit();
  return (
    <div className="selection-progress">
      <div role="status" aria-live="polite" aria-atomic="true">
        <strong>{usedSpace.toLocaleString(document.documentElement.lang)} / {capacity} {t("spaces")}</strong>
        <span>{Math.max(0, capacity - usedSpace).toLocaleString(document.documentElement.lang)} {t("spaces remaining")}</span>
      </div>
      <a href="#creations">{t("Change packaging")} <ArrowRight size={12} /></a>
    </div>
  );
}

export default function PackagingBuilder({ packagingId, onChange }: {
  packagingId: string;
  onChange: (id: string) => string;
}) {
  const { count } = useSelectionLimit();
  const [error, setError] = useState("");
  const option = packagingOptions.find(p => p.id === packagingId) ?? packagingOptions[0];
  useEffect(() => setError(""), [packagingId, count]);
  function choose(id: string) { setError(onChange(id)); }
  return (
    <section className="packaging-builder section-width section-space" id="creations" aria-labelledby="packaging-title">
      <div className="section-heading">
        <span className="eyebrow">{t("FIRST, A LITTLE THOUGHT FOR THE OUTSIDE")}</span>
        <h2 id="packaging-title">{t("A little sweetness,")} <em>{t("just as you like it.")}</em></h2>
        <p>{t("Choose your packaging, then pick your favourite cookies below. You can keep adding up to its capacity.")}</p>
        <p className="packaging-size-note">{t("One large cookie takes 3 spaces in bags and trays. The box holds up to 10 large or 15 small/medium; mixed assortments use proportional space.")}</p>
        <p className="packaging-timeless-note">{t("Timeless biscuits are ordered in multiples of 15 per flavour, with packaging to agree.")}</p>
      </div>
      <div className="packaging-choices">
        <fieldset className="packaging-options">
          <legend className="sr-only">{t("Choose your packaging")}</legend>
          {[
            { kind: "bag", id: "paper", title: "Paper bag" },
            { kind: "box", id: "box", title: "Little cardboard box" },
            { kind: "plate", id: "tray", title: "Serving tray" },
          ].map(({ kind, id, title }) => {
            const item = packagingOptions.find(p => p.id === id)!;
            const selected = option.kind === kind;
            return (
              <label className={`packaging-choice ${selected ? "is-selected" : ""}`} data-kind={kind} key={kind}>
                <input type="radio" name="packaging-kind" value={kind} checked={selected}
                  onChange={() => choose(kind === "plate" && selected ? packagingId : id)} />
                <img src={assetUrl(item.image)} alt="" className="packaging-illustration" />
                <span className="packaging-choice-heading"><span className="choice-radio" aria-hidden="true">{selected && <Check size={12} />}</span><span className="packaging-name">{t(title)}</span></span>
                <span className="packaging-price">{kind === "plate" ? t("Cardboard: free · Brass: €3") : item.price ? money(item.price) : t("Free")}</span>
                <span className="packaging-capacity">{t(kind === "bag" ? "Up to 25 small/medium" : kind === "box" ? "6–15 small/medium or 2–10 large" : "Cardboard: 20–35 · Brass: 6–20")}</span>
              </label>
            );
          })}
        </fieldset>
        {option.kind === "plate" && (
          <fieldset className="plate-variants">
            <legend>{t("Your serving tray")}</legend>
            {packagingOptions.filter(p => p.kind === "plate").map(p => (
              <label key={p.id}><input type="radio" name="plate-variant" checked={packagingId === p.id} onChange={() => choose(p.id)} />
                {t(p.id === "tray" ? "Cardboard" : "Brass")} <span>{p.price ? `+${money(p.price)}` : t("Free")} · {p.minimum}–{p.capacity}</span>
              </label>
            ))}
          </fieldset>
        )}
        {error && <div className="packaging-feedback" role="status"><p className="packaging-error">{error} <a href="#your-assortment">{t("Review your selection")}</a></p></div>}
      </div>
    </section>
  );
}
