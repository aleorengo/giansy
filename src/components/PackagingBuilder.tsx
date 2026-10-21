import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronUp, ChevronDown } from "lucide-react";
import { packagingOptions, money } from "../data/products";
import { assetUrl } from "../assets";
import { t } from "../i18n";
import { useSelectionLimit } from "../selection-context";

export function SelectionProgress() {
  const { count, cookieCount, isConfigured } = useSelectionLimit();
  const remaining = cookieCount - count;
  return (
    <div className="selection-progress">
      <div role="status" aria-live="polite" aria-atomic="true">
        {cookieCount && isConfigured ? <>
          <strong>{count} / {cookieCount} {t("cookies")}</strong>
          <span>{remaining ? `${t("Still to choose:")} ${remaining}` : t("Your selection is complete.")}</span>
        </> : <span>{t("First choose your packaging and cookie quantity.")}</span>}
      </div>
      <a href="#creations">{cookieCount ? t("Change your choices") : t("Start here")} <ArrowRight size={12} /></a>
    </div>
  );
}

export default function PackagingBuilder({ packagingId, onConfigure, onReadinessChange, syncVersion }: {
  packagingId: string;
  onConfigure: (id: string, count: number) => void;
  onReadinessChange: (ready: boolean) => void;
  syncVersion: number;
}) {
  const { count, cookieCount } = useSelectionLimit();
  const [draftId, setDraftId] = useState(packagingId);
  const [quantity, setQuantity] = useState(cookieCount ? String(cookieCount) : "");
  const lastConfiguredCount = useRef(cookieCount);
  const lastSyncVersion = useRef(syncVersion);
  const option = packagingOptions.find(p => p.id === draftId) ?? packagingOptions[0];
  const desired = Number(quantity);
  const valid = quantity !== "" && Number.isInteger(desired) && desired >= option.minimum && desired <= option.capacity;
  const tooSmall = valid && desired < count;
  const changed = draftId !== packagingId || desired !== cookieCount;
  const error = tooSmall
    ? `${t("You have already selected")} ${count} ${t("cookies")}. ${t("Remove first:")} ${count - desired}.`
    : !valid && quantity !== ""
      ? `${t("Enter a whole number from")} ${option.minimum} ${t("to")} ${option.capacity}.` : "";
  function choose(id: string) {
    const next = packagingOptions.find(p => p.id === id)!;
    setDraftId(id);
    if (quantity !== "") setQuantity(String(Math.max(next.minimum, Math.min(Number(quantity) || next.minimum, next.capacity))));
  }
  useEffect(() => {
    if (lastSyncVersion.current !== syncVersion) {
      lastSyncVersion.current = syncVersion;
      lastConfiguredCount.current = cookieCount;
      setDraftId(packagingId);
      setQuantity(cookieCount ? String(cookieCount) : "");
      onReadinessChange(cookieCount > 0);
      return;
    }
    if (!cookieCount && lastConfiguredCount.current > 0) {
      lastConfiguredCount.current = 0;
      setDraftId(packagingId);
      setQuantity("");
      onReadinessChange(false);
      return;
    }
    lastConfiguredCount.current = cookieCount;
    const ready = valid && !tooSmall;
    onReadinessChange(ready && !changed);
    if (ready && changed) onConfigure(draftId, desired);
  }, [cookieCount, packagingId, draftId, quantity, desired, valid, tooSmall, changed, syncVersion, onConfigure, onReadinessChange]);
  return (
    <section className="packaging-builder section-width section-space" id="creations" aria-labelledby="packaging-title">
      <div className="section-heading">
        <span className="eyebrow">{t("FIRST, A LITTLE THOUGHT FOR THE OUTSIDE")}</span>
        <h2 id="packaging-title">{t("A little sweetness,")} <em>{t("just as you like it.")}</em></h2>
        <p>{t("Choose the packaging and how many cookies you would like. Then fill it with your favourites.")}</p>
      </div>
      <form onSubmit={event => event.preventDefault()} noValidate>
        <fieldset className="packaging-options">
          <legend className="sr-only">{t("Choose your packaging")}</legend>
          {[
            { kind: "bag", id: "paper", title: "Paper bag" },
            { kind: "box", id: "box", title: "Little cardboard box" },
            { kind: "plate", id: "tray", title: "Little dessert plate" },
          ].map(({ kind, id, title }) => {
            const item = packagingOptions.find(p => p.id === id)!;
            const selected = option.kind === kind;
            return (
              <label className={`packaging-choice ${selected ? "is-selected" : ""}`} data-kind={kind} key={kind}>
                <input type="radio" name="packaging-kind" value={kind} checked={selected}
                  onChange={() => choose(kind === "plate" && option.kind === "plate" ? draftId : id)} />
                <img src={assetUrl(item.image)} alt="" className="packaging-illustration" />
                <span className="packaging-choice-heading"><span className="choice-radio" aria-hidden="true">{selected && <Check size={12} />}</span><span className="packaging-name">{t(title)}</span></span>
                <span className="packaging-price">{kind === "plate" ? t("Cardboard: free · Decorated: €3") : item.price ? money(item.price) : t("Free")}</span>
                <span className="packaging-capacity">{t("From")} {item.minimum} {t("to")} {item.capacity} {t("cookies")}</span>
              </label>
            );
          })}
        </fieldset>
        {option.kind === "plate" && (
          <fieldset className="plate-variants">
            <legend>{t("Your little plate")}</legend>
            {packagingOptions.filter(p => p.kind === "plate").map(p => (
              <label key={p.id}><input type="radio" name="plate-variant" checked={draftId === p.id} onChange={() => choose(p.id)} />
                {t(p.id === "tray" ? "Cardboard" : "Decorated")} <span>{p.price ? `+${money(p.price)}` : t("Free")}</span>
              </label>
            ))}
          </fieldset>
        )}
        <div className="packaging-quantity-row">
          <div className="cookie-count-field">
            <label htmlFor="cookie-count">{t("How many cookies would you like?")}</label>
            <div className="cookie-count-input">
              <div className="cookie-count-control">
                <input id="cookie-count" name="cookie-count" type="number" inputMode="numeric" min={option.minimum} max={option.capacity} step="1"
                  value={quantity} placeholder={`${option.minimum}–${option.capacity}`} onChange={e => setQuantity(e.target.value)}
                  aria-describedby="cookie-count-hint cookie-count-error" aria-invalid={!!error} />
                <div className="cookie-count-stepper">
                  <button type="button" aria-label={t("Increase cookie quantity")} disabled={desired >= option.capacity}
                    onClick={() => setQuantity(previous => String(Math.min(option.capacity, Math.max(option.minimum, Math.trunc(Number(previous) || 0) + 1))))}><ChevronUp size={13} /></button>
                  <button type="button" aria-label={t("Decrease cookie quantity")} disabled={!quantity || desired <= option.minimum}
                    onClick={() => setQuantity(previous => String(Math.max(option.minimum, Math.trunc(Number(previous) || 0) - 1)))}><ChevronDown size={13} /></button>
                </div>
              </div>
              <span>{t("cookies")}</span>
            </div>
            <small id="cookie-count-hint">{t("Choose a number from")} {option.minimum} {t("to")} {option.capacity}. {t("You can add up to your chosen number.")}</small>
          </div>
        </div>
        <div className="packaging-feedback" aria-live="polite">
          {error ? <p id="cookie-count-error" className="packaging-error">{error} {tooSmall && <a href="#your-assortment">{t("Review your selection")}</a>}</p>
            : cookieCount > 0 && !changed ? <p><Check size={13} />{t(option.name)} · {cookieCount} {t("cookies")} · {option.price ? `+${money(option.price)}` : t("Free")}</p>
              : <p>{t("Choose a quantity, then add your favourites below.")}</p>}
        </div>
      </form>
    </section>
  );
}
