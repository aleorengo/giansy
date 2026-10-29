import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assetUrl } from "../assets";
import { t } from "../i18n";
import type { Product } from "../data/products";

export default function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const photos = product.categories.includes("Jams & Preserves");
  const slides = [{ image: product.image, label: photos ? "The jar" : "In the collection" }, ...(product.gallery ?? [])];

  if (slides.length === 1) {
    return <img className="dialog-product" src={assetUrl(product.image)} alt={t(product.name)} />;
  }

  const current = slides[index];
  const next = slides[(index + 1) % slides.length];
  function goTo(position: number) { setIndex((position + slides.length) % slides.length); }

  return (
    <div className={`product-gallery${photos ? " product-gallery-photos" : ""}`} role="region" aria-label={`${t(photos ? "Product photos" : "Decorative versions of")} ${t(product.name)}`}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + (event.key === "ArrowLeft" ? -1 : 1));
        }
      }}>
      <div className="product-gallery-stack" tabIndex={0} role="group"
        aria-label={t(photos ? "Swipe or use the arrows to browse the photos" : "Swipe or use the arrows to see the different decorations")}
        onPointerDown={event => {
          suppressClick.current = false;
          gesture.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => { gesture.current = null; }}
        onPointerUp={event => {
          const start = gesture.current;
          gesture.current = null;
          if (!start) return;
          const dx = event.clientX - start.x, dy = event.clientY - start.y;
          if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            suppressClick.current = true;
            goTo(index + (dx < 0 ? 1 : -1));
          }
        }}
        onClickCapture={event => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}>
        {!photos && <button type="button" className="product-gallery-peek" onClick={() => goTo(index + 1)} aria-label={`${t("Next decoration")}: ${t(next.label)}`}>
          <img src={assetUrl(next.image)} alt="" draggable={false} />
        </button>}
        <img key={current.image} className="product-gallery-current" src={assetUrl(current.image)} alt={`${t(product.name)} — ${t(current.label)}`} draggable={false} />
      </div>
      <div className="product-gallery-navigation">
        <button type="button" className="product-gallery-arrow is-previous" onClick={() => goTo(index - 1)} aria-label={t(photos ? "Previous photo" : "Previous decoration")}><ChevronLeft size={19} /></button>
        <div className="product-gallery-caption" aria-live="polite" aria-atomic="true"><span>{t(current.label)}</span><span>{index + 1} / {slides.length}</span></div>
        <button type="button" className="product-gallery-arrow is-next" onClick={() => goTo(index + 1)} aria-label={t(photos ? "Next photo" : "Next decoration")}><ChevronRight size={19} /></button>
      </div>
      <div className="product-gallery-pagination" role="group" aria-label={t(photos ? "Choose a photo to view" : "Choose a decoration to view")}>
        {slides.map((slide, position) => <button type="button" key={slide.image} className={index === position ? "is-active" : ""}
          aria-label={`${t(photos ? "View photo" : "View decoration")} ${position + 1}: ${t(slide.label)}`} aria-pressed={index === position} onClick={() => goTo(position)}><span /></button>)}
      </div>
      <p className="product-gallery-hint">{t(photos ? "Browse the photos of this preserve." : "Swipe to discover the different decorations. Tell us your favourite in the order notes.")}</p>
    </div>
  );
}
