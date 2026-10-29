import { t, useLanguage, getLanguage, setLanguage } from "./i18n";
import { assetUrl } from "./assets";
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent, ReactNode } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Cookie,
  Gift,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import { Flourish, PolaroidPortrait } from "./components/Ornaments";
import AntiqueLabel from "./components/AntiqueLabel";
import ProductGallery from "./components/ProductGallery";
import { addCustomToCart, addBundleToCart, addTimelessToCart, changeCartQuantity, restoreCart, localToday, validRequestedDate } from "./cart";
import type { CartItem } from "./cart";
import { requestText, whatsappUrl } from "./order-request";
import type { OrderRequest } from "./order-request";
import { getTrayLayout } from "./tray-layout";
import PackagingBuilder, { SelectionProgress } from "./components/PackagingBuilder";
import { SelectionContext, useSelectionLimit } from "./selection-context";
import { emptyBuilder, isSelectionReady, restoreBuilder, selectionSpace, updateBuilder } from "./selection";
import type { BuilderState, BuilderAction } from "./selection";
import {
  calculateEstimate,
  describeCart,
  categories,
  money,
  packagingOptions,
  products,
  recipes,
  quantitySteps,
  largeProductIds,
} from "./data/products";
import type { Product, Selection } from "./data/products";
import journal from "./data/journal.json";
import seasonal from "./data/seasonal.json";
import features from "./data/features.json";
import contact from "./data/contact.json";

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label={t("Le Creazioni di Giansy home")}
    >
      {footer ? <img
        src={assetUrl("/brand/giansy-round-logo.svg")}
        alt="Le creazioni di Giansy"
        width="180"
        height="180"
      /> : <>
        <img className="brand-emblem" src={assetUrl("/brand/giansy-seal.svg")} alt="" aria-hidden="true" width="40" height="40" />
        <img className="brand-wordmark" src={assetUrl("/brand/giansy-script-wordmark.svg")} alt="Le creazioni di Giansy" width="1545" height="350" />
      </>}
    </Link>
  );
}
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash)
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}
function Header({ count }: { count: number }) {
  const language = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  const languageSwitch = (mobile = false) => (
    <button
      className={`language-toggle language-toggle-${mobile ? "mobile" : "desktop"}`}
      onClick={() => setLanguage(language === "it" ? "en" : "it")}
      aria-label={language === "it" ? "Switch to English" : "Passa all’italiano"}
      title={language === "it" ? "English" : "Italiano"}
      lang={language === "it" ? "en" : "it"}
    >
      {mobile
        ? language === "it" ? "English" : "Italiano"
        : language === "it" ? "EN" : "IT"}
    </button>
  );
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav
            className={open ? "main-nav is-open" : "main-nav"}
            aria-label={t("Main navigation")}
          >
            <Link
              className={
                location.pathname === "/" && !location.hash ? "active" : ""
              }
              to="/"
            >
              {t("Home")}{" "}
            </Link>
            <Link to="/#creations">{t("The Creations")} </Link>
            <Link to="/#our-story">{t("Our Story")} </Link>
            {features.journal && <Link
              className={
                location.pathname.startsWith("/journal") ? "active" : ""
              }
              to="/journal"
            >
              {t("Journal")}{" "}
            </Link>}
            <Link to="/#contact">{t("Contact")} </Link>
            {languageSwitch(true)}
          </nav>
          <Link className="selection-link" to="/#confirmed-selections" aria-label={`${t("Your selection")}: ${count}`}>
            <ShoppingCart size={20} strokeWidth={1.4} aria-hidden="true" />
            <span className="selection-count">{count}</span>
          </Link>
          {languageSwitch()}
          <button
            className="mobile-menu icon-button"
            aria-label={open ? t("Close menu") : t("Open menu")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
function Hero() {
  return (
    <section className="hero-section">
      <div className="hero section-width">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-line" />{" "}
            {t("FROM MY KITCHEN, WITH LOVE")}{" "}
          </div>
          <h1>
            {t("Small batch baking,")} <br />
            <em>{t("made with love.")} </em>
          </h1>
          <p>
            {t("A buttery biscuit. A spoonful of homemade jam.")}{" "}
            <br className="desktop-break" />{" "}
            {t("A little something to make an ordinary day special.")}{" "}
          </p>
          <p>
            {t("Welcome to my world of handmade sweetness —")}{" "}
            <br className="desktop-break" />{" "}
            {t("thoughtful creations, made to be shared.")}{" "}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#creations">
              {t("Discover the Creations")} <ArrowRight size={16} />
            </a>
            <a className="text-link" href="#our-story">
              {t("Meet the Baker")} <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-signoff">
            <span className="script">{t("Buono, come una volta.")} </span>
            <span>{t("GOODNESS, JUST LIKE THE OLD DAYS.")} </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="portrait-frame">
            <PolaroidPortrait />
          </div>
          <div className="hero-photo">
            <img
              src={assetUrl("/images/giansy-christmas-table.webp")}
              alt={t(
                "A Christmas table with a handmade gingerbread tree, decorated biscuits and cake",
              )}
            />
            <span>{t("little things, lovely moments")} </span>
          </div>
          <div className="handmade-seal">
            <img src={assetUrl("/brand/giansy-round-logo.svg")} alt="Le creazioni di Giansy" width="116" height="116" />
          </div>
          <span className="portrait-caption script">{t("Ciao, sono Giansy!")}</span>
          <svg
            className="handdrawn-arrow"
            viewBox="0 0 90 60"
            aria-hidden="true"
          >
            <path
              d="M5 50Q65 65 72 8M62 18L74 5L82 21"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <Values />
    </section>
  );
}
function Values() {
  return (
    <div className="hero-values">
      <div className="section-width values-inner">
        <span>
          <Cookie /> {t("Handmade with chosen ingredients")}{" "}
        </span>
        <span>
          <Heart /> {t("Small batches, made with love")}{" "}
        </span>
      </div>
    </div>
  );
}
function TartanDivider() {
  return (
    <div className="values-strip" aria-hidden="true">
      <div className="tartan-fringe" />
    </div>
  );
}
function Quantity({
  product,
  quantity,
  onChange,
  compact = false,
}: {
  product: Product;
  quantity: number;
  onChange: (id: string, delta: number) => void;
  compact?: boolean;
}) {
  const { usedSpace, capacity, largeWeight } = useSelectionLimit();
  const step = product.quantityStep ?? 1;
  const weight = product.size === "large" ? largeWeight : 1;
  const atLimit = !product.bundleSize && step === 1 && usedSpace + weight > capacity;
  return (
    <div className={`quantity ${compact ? "quantity-compact" : ""}`}>
      <button
        disabled={!quantity}
        onClick={() => onChange(product.id, -step)}
        aria-label={`${t(step > 1 ? "Remove 15 pieces of" : "Remove one")} ${t(product.name)}`}
      >
        <Minus size={13} />
      </button>
      <span aria-label={`${quantity} ${t(product.name)} ${t("selected")}`}>
        {quantity}
      </span>
      <button
        disabled={atLimit}
        title={atLimit ? t("Not enough space for this cookie.") : undefined}
        onClick={() => onChange(product.id, step)}
        aria-label={`${t(step > 1 ? "Add 15 pieces of" : "Add one")} ${t(product.name)}`}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
function ProductCard({
  product,
  quantity,
  onChange,
  onDetails,
}: {
  product: Product;
  quantity: number;
  onChange: (id: string, delta: number) => void;
  onDetails: (p: Product) => void;
}) {
  const cookieRef = useRef<HTMLImageElement>(null);
  const previousQuantity = useRef(quantity);
  useEffect(() => {
    const added = quantity > previousQuantity.current;
    previousQuantity.current = quantity;
    const cookie = cookieRef.current;
    if (product.bundleSize || !added || !cookie || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const turn = parseFloat(getComputedStyle(cookie).getPropertyValue("--cookie-turn")) || 0;
    const animation = cookie.animate(
      [
        { transform: `rotate(${turn}deg)` },
        { transform: `translateY(-6px) rotate(${turn - 2}deg) scale(1.035)`, offset: .45 },
        { transform: `rotate(${turn}deg)` },
      ],
      { duration: 1100, easing: "cubic-bezier(.45,0,.25,1)" },
    );
    return () => animation.cancel();
  }, [quantity]);
  return (
    <article
      className={`product-card ${(product.quantityStep ?? 1) > 1 ? "product-batch" : ""} ${quantity && !product.bundleSize ? "product-selected" : ""}`}
      data-product-id={product.id}
      style={
        {
          "--cookie-turn": `${((product.id.length * 3) % 11) - 5}deg`,
        } as CSSProperties
      }
    >
      <div className="product-image-wrap">
        {product.label && (
          <span className="product-label">{t(product.label)}</span>
        )}
        {quantity > 0 && !product.bundleSize && (
          <span className="product-check">
            <Check size={13} />
          </span>
        )}
        <button
          className="product-image-button"
          onClick={() => onDetails(product)}
          aria-label={`${t("Details for")} ${t(product.name)}`}
        >
          <img ref={cookieRef} src={assetUrl(product.image)} alt={t(product.name)} loading="lazy" />
        </button>
      </div>
      <div className="product-info">
        <AntiqueLabel />
        <div className="antique-label-content">
          <div className="product-copy"><button className="product-name" onClick={() => onDetails(product)}>
            <h3>{t(product.name)}</h3>
          </button></div>
          <div className="product-bottom">
            <span>
              {!product.fixedPrice && `${t("From")} `}<strong>{money(product.price * ((product.quantityStep ?? 1) > 1 ? product.quantityStep! : 1))}</strong>
              {product.bundleSize && <small className="batch-price">{t("per package")}</small>}
              {(product.quantityStep ?? 1) > 1 && <small className="batch-price">{t("per 15 pieces")}</small>}
            </span>
            <Quantity
              product={product}
              quantity={quantity}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
const categoryMotifs: Record<string, string> = {
  Christmas: "christmas",
  Halloween: "halloween",
  "Special Occasions": "occasions",
  "Timeless Biscuits": "timeless",
  "Gift Bundles": "mixed",
  "Jams & Preserves": "jams",
};
function Gallery({
  selection,
  onChange,
  category,
  setCategory,
  onDetails,
  confirmedQuantities, onConfirmedChange,
}: {
  selection: Selection;
  onChange: (id: string, delta: number) => void;
  category: string;
  setCategory: (c: string) => void;
  onDetails: (p: Product) => void;
  confirmedQuantities: Record<string, number>;
  onConfirmedChange: (id: string, delta: number) => void;
}) {
  const visible = products.filter(p => p.categories.includes(category));
  return (
    <section className={`creations-section ${category === "Gift Bundles" ? "gift-section" : ""}`} id="cookies" data-category={category}>
      <div className="collection-tartan" aria-hidden="true" />
      <div className="creations section-width section-space">
        <div className="section-heading">
          <Flourish />
          <span className="eyebrow">
            {t("THE LITTLE THINGS, BEAUTIFULLY MADE")}{" "}
          </span>
          <h2>
            {t("A collection of")} <em>{t("sweet moments.")} </em>
          </h2>
          <p>
            {t(
              "Choose your favourites, build your own assortment, and make it a little more you.",
            )}{" "}
          </p>
        </div>
        <div className="category-picker">
          <h3 id="category-picker-title">{t("Choose your collection")}</h3>
          <div
            className="category-tabs"
            role="group"
            aria-labelledby="category-picker-title"
          >
            {categories.map((c) => (
              <button
                type="button"
                aria-pressed={category === c}
                className={category === c ? "selected" : ""}
                data-category={c}
                style={{ "--category-pattern": `url("${assetUrl(`/images/category-patterns/${categoryMotifs[c]}${c === category ? "" : `-on-${categoryMotifs[category]}`}.svg`)}")` } as CSSProperties}
                key={c}
                onClick={() => setCategory(c)}
              >
                <span className="category-label">{c === "Christmas" ? <Sparkles size={16} aria-hidden="true" /> : category === c && <Check size={14} aria-hidden="true" />} {t(c)}</span>
              </button>
            ))}
          </div>
        </div>
        {category !== "Timeless Biscuits" && category !== "Gift Bundles" && <SelectionProgress />}
        <div className="cookie-products">
          {category === "Timeless Biscuits" ? <div className="timeless-intro" role="status"><strong>{t("15 at a time, for each flavour")}</strong><p>{t("Choose 15, 30, 45 pieces or more of each flavour. Packaging will be agreed with Giansy; these pieces are separate from your decorated-cookie packaging.")}</p><span>{visible.reduce((sum, p) => sum + (confirmedQuantities[p.id] || 0), 0)} {t("selected")}</span></div> : category === "Gift Bundles" ? <p className="gift-included">{t("Mixed assortments, already wrapped with care. Choose how many packages you would like.")} {t("Packaging is included. Tell us any preferences in the order notes.")}</p> : null}
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                quantity={p.bundleSize || (p.quantityStep ?? 1) > 1 ? (confirmedQuantities[p.id] ?? 0) : (selection[p.id] || 0)}
                onChange={p.bundleSize || (p.quantityStep ?? 1) > 1 ? onConfirmedChange : onChange}
                onDetails={onDetails}
              />
            ))}
          </div>
          <div className="gallery-note">
            <Heart size={13} />{" "}
            {t(
              "Each creation is handmade. A little variation is part of its charm.",
            )}{" "}
          </div>
          {visible.some(p => p.provisionalPrice) && <p className="provisional-price-note">{t("Provisional prices for Halloween and flower biscuits; to be confirmed with Giansy.")}</p>}
        </div>
      </div>
      <div className="collection-tartan" aria-hidden="true" />
    </section>
  );
}
function SavedSelections({ cart, onChange }: { cart: CartItem[]; onChange: (id: string, delta: number) => void }) {
  const summary = describeCart(cart);
  return <div className="confirmed-items" aria-live="polite">{summary.lines.map(line => {
    const timeless = line.item.kind === "timeless";
    const shownQuantity = line.item.quantity * (timeless ? line.pieceCount : 1);
    return <div className="order-item confirmed-item" data-cart-kind={line.item.kind} key={line.item.id}>
      <div className="confirmed-item-copy">
        <span>{t(line.title)}</span>
        <small>{timeless ? `${money(line.unitPrice)} ${t("per 15 pieces")}` : `${line.pieceCount} ${t("cookies")} · ${money(line.unitPrice)} ${t("per package")}`}</small>
        {line.item.kind === "custom" && <small>{t(line.detail)}</small>}
        {line.contents.length > 0 && <details><summary>{t("See the assortment")}</summary><ul>{line.contents.map(p => <li key={p.name}>{p.quantity} × {t(p.name)}</li>)}</ul></details>}
        <button className="confirmed-remove" onClick={() => onChange(line.item.id, -line.item.quantity)}>{t("Remove")}</button>
      </div>
      <div className="quantity quantity-compact">
        <button aria-label={`${t("Remove")} ${timeless ? line.pieceCount : 1} ${t(line.title)}`} onClick={() => onChange(line.item.id, -1)}><Minus size={12} /></button>
        <span>{shownQuantity}</span>
        <button aria-label={`${t("Add")} ${timeless ? line.pieceCount : 1} ${t(line.title)}`} onClick={() => onChange(line.item.id, 1)}><Plus size={12} /></button>
      </div>
      <strong>{money(line.unitPrice * line.item.quantity)}</strong>
    </div>;
  })}</div>;
}

function Assortment({
  selection,
  onChange,
  packagingId,
  onPackagingChange,
  reset,
  onAdd,
  cart, onCartChange,
}: {
  selection: Selection;
  onChange: (id: string, delta: number) => void;
  packagingId: string;
  onPackagingChange: (id: string) => string;
  reset: () => void;
  onAdd: () => void;
  cart: CartItem[];
  onCartChange: (id: string, delta: number) => void;
}) {
  const { capacity, minimum, minimumCount, minimumLabel } = useSelectionLimit();
  const [packagingError, setPackagingError] = useState("");
  useEffect(() => setPackagingError(""), [selection, packagingId]);
  const estimate = calculateEstimate(selection, packagingId);
  const saved = describeCart(cart);
  const plateProducts = products.filter(p => !p.bundleSize && (p.quantityStep ?? 1) === 1 && (selection[p.id] || 0) > 0);
  const trayLayout = getTrayLayout(plateProducts.length);
  const assortmentRef = useRef<HTMLElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const section = assortmentRef.current;
    const tray = trayRef.current;
    if (!section || !tray) return;
    const positionFabric = () => {
      let top = tray.offsetHeight / 2;
      let element: HTMLElement | null = tray;
      while (element && element !== section) {
        top += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      section.style.setProperty(
        "--tartan-start",
        `${top}px`,
      );
    };
    positionFabric();
    const observer = new ResizeObserver(positionFabric);
    observer.observe(section);
    observer.observe(tray);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className="assortment-section"
      id="your-assortment"
      ref={assortmentRef}
    >
      <div className="assortment-fabric" aria-hidden="true" />
      <div className="section-width">
        <div className="section-heading">
          <span className="eyebrow">
            {t("A LITTLE OF THIS. A LITTLE OF THAT.")}{" "}
          </span>
          <h2>
            {t("Your own plate of")} <em>{t("happiness.")} </em>
          </h2>
          <p>
            {t(
              "A thoughtful gift, a shared moment, or a little treat just for you.",
            )}{" "}
          </p>
        </div>
        <div className="assortment-layout">
          <div className="plate-area">
            <span className="plate-script script">
              {t("Something lovely is coming together...")}{" "}
            </span>
            <div
              className={`live-plate ${plateProducts.length ? "has-products" : ""}`}
              ref={trayRef}
            >
              <img
                className="silver-plate"
                src={assetUrl("/images/silver-plate.webp")}
                alt={t("An ornate vintage silver serving platter")}
              />
              {!plateProducts.length ? (
                <div className="plate-empty">
                  <Heart size={29} strokeWidth={1} />
                  <span>
                    {t("Your little collection")} <br />
                    {t("starts with a favourite.")}{" "}
                  </span>
                  <a href="#creations">
                    {t("Choose a creation")} <ArrowUpRight size={13} />
                  </a>
                </div>
              ) : (
                plateProducts.map((p, i) => (
                  <img
                    key={p.id}
                    className="plate-product"
                    data-product-id={p.id}
                    style={{
                      left: `${trayLayout[i].x}%`,
                      top: `${trayLayout[i].y}%`,
                      width: `${trayLayout[i].width}%`,
                      height: `${trayLayout[i].width * 1.5}%`,
                      transform: `translate(-50%, -50%) rotate(${trayLayout[i].r}deg)`,
                      zIndex:
                        Math.round(trayLayout[i].y * 10) +
                        plateProducts.length -
                        i,
                    }}
                    src={assetUrl(p.image)}
                    alt={`${t("One representative")} ${t(p.name)}; ${selection[p.id]} ${t("selected")}`}
                  />
                ))
              )}
            </div>
            <p className="plate-note">
              <Sparkles size={13} />{" "}
              {t(
                "One of each favourite on the plate. Every little piece counted below.",
              )}{" "}
            </p>
          </div>
          <div className="order-card">
            <div className="order-heading">
              <h3>{t("Your sweet selection")} </h3>
              <ShoppingCart size={19} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <p className="draft-assortment-label">{t("Your assortment in progress")}</p>
            <div className="order-items" aria-live="polite" aria-atomic="true">
              {!estimate.selected.length ? (
                <div className="order-empty">
                  <Cookie size={25} strokeWidth={1} />
                  <p>{t("A lovely assortment is waiting to happen.")} </p>
                  <span>
                    {t("Add your favourites from the collection above.")}{" "}
                  </span>
                </div>
              ) : (
                estimate.selected.map((p) => (
                  <div className="order-item" key={p.id} data-product-id={p.id}>
                    <div>
                      <span>{t(p.name)}</span>
                      <small>
                        {money(p.price * (p.quantityStep ?? 1))} {t((p.quantityStep ?? 1) > 1 ? "per 15 pieces" : "each")}{" "}
                      </small>
                    </div>
                    <Quantity
                      product={p}
                      quantity={selection[p.id]}
                      onChange={onChange}
                      compact
                    />
                    <strong>{money(p.price * selection[p.id])}</strong>
                  </div>
                ))
              )}
            </div>
            {(estimate.packagedCount > 0 || (!estimate.count && !saved.lines.length)) && <div className="packaging packaging-summary">
              <label htmlFor="summary-packaging">
                <Gift size={15} /> {t(estimate.bulkCount ? "Packaging for decorated cookies" : "The finishing touch")}{" "}
              </label>
              <div className="select-wrap">
                <select id="summary-packaging" value={packagingId}
                  aria-describedby={packagingError ? "summary-packaging-error" : undefined}
                  onChange={event => setPackagingError(onPackagingChange(event.target.value))}>
                  {packagingOptions.map(option => <option value={option.id} key={option.id}>
                    {t(option.name)} · {option.price ? `+${money(option.price)}` : t("Free")}
                  </option>)}
                </select>
                <ChevronDown size={14} />
              </div>
              <small>{estimate.packagedCount} {t("selected cookies")} · {estimate.usedSpace.toLocaleString(document.documentElement.lang)} / {capacity} {t("spaces")}{minimumCount < minimum && ` · ${minimumLabel}`}</small>
              {packagingError && <p id="summary-packaging-error" role="status" className="packaging-error">{packagingError}</p>}
            </div>}
            {estimate.bulkCount > 0 && <p className="timeless-order-note"><strong>{t("Timeless pieces:")} {estimate.bulkCount}</strong><span>{t("Packaging for timeless biscuits will be agreed separately.")}</span></p>}
            {estimate.selected.length > 0 && (
              <div className="subtotal-lines">
                <span>
                  {t("Creations")} <span>{money(estimate.subtotal)}</span>
                </span>
                <span>
                  {t("Packaging")}{" "}
                  <span>{estimate.packagedCount ? money(estimate.packagingCost) : t("Packaging to agree")}</span>
                </span>
              </div>
            )}
            {estimate.count > 0 && <>
              <div className="estimated-total draft-total"><span>{t("Selection subtotal")}</span><strong>{money(estimate.total)}</strong></div>
              <button onClick={onAdd} disabled={!isSelectionReady({ selection, packagingId }, packagingOptions, quantitySteps, largeProductIds)} className="button button-primary confirm-assortment">{t("Confirm selection")} <Check size={15} /></button>
            </>}
            <div className="confirmed-selection" id="confirmed-selections" role="region" aria-labelledby="confirmed-selections-title" tabIndex={-1}>
              <h4 id="confirmed-selections-title">{t("Confirmed selections")}</h4>
              {saved.lines.length ? <SavedSelections cart={cart} onChange={onCartChange} /> : <p className="confirmed-empty">{t("Confirm your assortment here. Timeless biscuits and little gifts are added directly.")}</p>}
              <div className="estimated-total" aria-live="polite"><span>{t("Order total")}<small>{saved.pieces} {t("cookies")}</small></span><strong>{money(saved.total)}</strong></div>
              {saved.lines.some(line => line.bulkPackaging) && <p className="pricing-note">{t("Packaging for timeless biscuits will be agreed separately.")}</p>}
              {saved.lines.length > 0 && <a href="#contact" className="button button-outline order-cta">{t("Complete your order")} <ArrowRight size={15} /></a>}
            </div>
            <button
              className="reset-selection"
              onClick={reset}
              disabled={!estimate.count && !saved.lines.length && packagingId === "paper"}
            >
              <RotateCcw size={12} /> {t("Start afresh")}{" "}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Seasonal({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="seasonal section-width section-space">
      <div className="seasonal-photo">
        <img src={assetUrl(seasonal.image)} alt={t(seasonal.imageAlt)} loading="lazy" />
        <span className="seasonal-photo-label">{t(seasonal.imageLabel)}</span>
      </div>
      <div className="seasonal-copy">
        <span className="eyebrow">
          <Sparkles size={13} /> {t(seasonal.eyebrow)}
        </span>
        <h2>
          {t(seasonal.headline)}
          <br />
          <em>{t(seasonal.accent)}</em>
        </h2>
        <p>{t(seasonal.description)}</p>
        <p>{t(seasonal.detail)}</p>
        <a
          href="#creations"
          className="button button-outline"
          onClick={onExplore}
        >
          {t(seasonal.button)} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
function Story() {
  return (
    <>
    <div className="story-divider" aria-hidden="true" />
    <section className="story-section" id="our-story">
      <div className="section-width story-layout">
        <div className="story-copy">
          <span className="eyebrow">
            {t("THE HANDS. THE HEART. THE HOMEMADE.")}{" "}
          </span>
          <h2>
            {t("A little story behind")} <br />
            <em>{t("every creation.")} </em>
          </h2>
          <span className="story-hello script">{t("Ciao, I’m Giansy.")} </span>
          <p>
            {t(
              "I’ve always believed that the loveliest things in life are made by hand, and shared with the people we love.",
            )}{" "}
          </p>
          <p>
            {t(
              "Le Creazioni di Giansy grew from that simple thought. From a love of baking, old family recipes, and the joy of turning a handful of good ingredients into something that makes someone smile.",
            )}{" "}
          </p>
          <p>
            {t(
              "Every biscuit, every jar, every little detail carries a piece of my heart. I’m so happy you’re here.",
            )}{" "}
          </p>
          <span className="story-signature script">
            {t("Con amore, Giansy")}{" "}
          </span>
        </div>
        <div className="story-image">
          <div>
            <img
              src={assetUrl("/images/giansy-kitchen-portrait.webp")}
              alt={t("Meet Giansy, the heart behind Le Creazioni di Giansy")}
              loading="lazy"
            />
          </div>
          <Flourish />
          <span>{t("GOOD THINGS TAKE A LITTLE LOVE.")} </span>
        </div>
      </div>
    </section>
    </>
  );
}
function ArticleCard({
  article,
  index,
}: {
  article: (typeof journal.articles)[number];
  index: number;
}) {
  return (
    <article className="article-card">
      <Link
        className={`article-image article-image-${index % 3}`}
        to={`/journal/${article.slug}`}
      >
        <img src={assetUrl(article.image)} alt={t(article.title)} loading="lazy" />
        <span className="article-image-number">0{index + 1}</span>
      </Link>
      <div className="article-meta">
        <span>{t(article.category)}</span>
        <span>
          {new Date(`${article.date}T12:00:00`).toLocaleDateString(
            getLanguage() === "it" ? "it-IT" : "en-GB",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          )}
        </span>
      </div>
      <h3>
        <Link to={`/journal/${article.slug}`}>{t(article.title)}</Link>
      </h3>
      <p>{t(article.excerpt)}</p>
      <Link className="text-link" to={`/journal/${article.slug}`}>
        {t("A little more")} <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}
function JournalPreview() {
  return (
    <section className="journal-preview section-width section-space">
      <div className="journal-heading">
        <div>
          <span className="eyebrow">{t("NOTES FROM MY KITCHEN")} </span>
          <h2>
            {t("The sweet")} <em>{t("journal.")} </em>
          </h2>
        </div>
        <Link className="text-link" to="/journal">
          {t("All stories & recipes")} <ArrowRight size={15} />
        </Link>
      </div>
      <div className="articles-grid">
        {journal.articles.slice(0, 3).map((article, index) => (
          <ArticleCard article={article} index={index} key={article.slug} />
        ))}
      </div>
    </section>
  );
}
function JournalPage() {
  const [filter, setFilter] = useState("All notes");
  const filters = [
    "All notes",
    "Homemade Recipes",
    "Baking Tips & Techniques",
    "Behind the Scenes",
    "Seasonal Inspiration",
    "Gift Ideas & Special Occasions",
  ];
  const articles = journal.articles.filter(
    (a) => filter === "All notes" || a.category === filter,
  );
  return (
    <main className="section-width journal-page section-space">
      <div className="section-heading">
        <Flourish />
        <span className="eyebrow">
          {t("A RECIPE, A MEMORY, A LITTLE INSPIRATION")}{" "}
        </span>
        <h1>
          {t("The sweet")} <em>{t("journal.")} </em>
        </h1>
        <p>
          {t(
            "Stories from the kitchen, well-loved recipes, and a few lovely things along the way.",
          )}{" "}
        </p>
      </div>
      <div
        className="category-tabs journal-tabs"
        role="group"
        aria-label={t("Journal categories")}
      >
        {filters.map((f) => (
          <button
            aria-pressed={filter === f}
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
            key={t(f)}
          >
            {t(f)}
          </button>
        ))}
      </div>
      {articles.length ? (
        <div className="articles-grid">
          {articles.map((a, i) => (
            <ArticleCard article={a} index={i} key={a.slug} />
          ))}
        </div>
      ) : (
        <div className="journal-empty">
          <Flourish />
          <h2>{t("A new page is on its way.")} </h2>
          <p>
            {t(
              "There are lovely things brewing in the kitchen. Come back for new notes soon.",
            )}{" "}
          </p>
          <button className="text-link" onClick={() => setFilter("All notes")}>
            {t("Read all notes")} <ArrowRight size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
function ArticlePage() {
  const { slug } = useParams();
  const article = journal.articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <main className="article-page section-width section-space">
      <Link className="text-link" to="/journal">
        <ArrowRight className="back-arrow" size={14} />{" "}
        {t("Back to the journal")}{" "}
      </Link>
      <div className="section-heading">
        <span className="eyebrow">{t(article.category)}</span>
        <h1>{t(article.title)}</h1>
        <span className="article-date">
          {new Date(`${article.date}T12:00:00`).toLocaleDateString(
            getLanguage() === "it" ? "it-IT" : "en-GB",
            {
              dateStyle: "long",
            },
          )}{" "}
          {t("· By Giansy")}{" "}
        </span>
      </div>
      <img
        className="article-cover"
        src={assetUrl(article.image)}
        alt={t(article.title)}
      />
      <div className="article-body">
        <p className="article-intro">{t(article.excerpt)}</p>
        {t(article.body)
          .split("\n\n")
          .map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        <span className="script">{t("Con amore, Giansy")} </span>
        <Flourish />
      </div>
      <Link className="button button-outline" to="/#creations">
        {t("Find your next little treat")} <ArrowRight size={15} />
      </Link>
    </main>
  );
}
function Contact({ cart, hasDraft }: { cart: CartItem[]; hasDraft: boolean }) {
  const [fields, setFields] = useState({ name: "", message: "", date: "" });
  const [dateError, setDateError] = useState("");
  const estimate = describeCart(cart);
  const canSubmit = estimate.lines.length > 0 && !hasDraft;
  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    if (name === "date") {
      // Ignore incomplete year segments while typing; reject a completed past date.
      if (value && value.slice(0, 4) >= "1000" && value < localToday()) {
        setDateError(t("Choose today or a future date."));
        setFields(previous => ({ ...previous, date: "" }));
        return;
      }
      setDateError("");
    }
    setFields(previous => ({ ...previous, [name]: value }));
  }
  function validateDate() {
    if (fields.date && !validRequestedDate(fields.date)) {
      setDateError(t("Choose today or a future date."));
      setFields(previous => ({ ...previous, date: "" }));
    }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    if (!validRequestedDate(fields.date)) {
      setDateError(t("Choose today or a future date."));
      return;
    }
    const order: OrderRequest = {
      ...fields, language: getLanguage(), total: estimate.total, pieces: estimate.pieces, packages: estimate.packages,
      lines: estimate.lines.map(line => ({
        kind: line.item.kind, title: t(line.title), detail: t(line.detail), quantity: line.item.quantity,
        pieceCount: line.pieceCount, unitPrice: line.unitPrice, bulkPackaging: line.bulkPackaging,
        contents: line.contents.map(p => ({ name: t(p.name), quantity: p.quantity })),
      })),
    };
    window.open(whatsappUrl(contact.whatsapp, requestText(order)), "_blank", "noopener,noreferrer");
  }
  return <section className="contact-section simple-checkout" id="contact">
    <div className="section-width">
      <form className="contact-form" onSubmit={submit}>
        <label>{t("Your name")}<input name="name" value={fields.name} onChange={updateField} autoComplete="name" required maxLength={100} /></label>
        <div className="checkout-total"><span>{t("Order total")}<small>{estimate.pieces} {t("cookies")}</small></span><strong>{money(estimate.total)}</strong></div>
        <label className="requested-date-field">{t("Requested date")}
          <span className="date-input-wrap"><input type="date" name="date" value={fields.date} onChange={updateField} onBlur={validateDate} onFocus={event => { event.currentTarget.min = localToday(); }} min={localToday()} step="1" required aria-invalid={!!dateError} aria-describedby={`requested-date-hint${dateError ? " requested-date-error" : ""}`} /><CalendarDays size={20} aria-hidden="true" /></span>
          <span id="requested-date-hint">{t("We will confirm availability together.")}</span>
          {dateError && <span className="date-error" id="requested-date-error" role="alert">{dateError}</span>}
        </label>
        <label className="personalisation-field"><span className="personalisation-title">{t("Notes and personalisation")}</span><span className="personalisation-hint" id="personalisation-hint">{t("A favourite colour, a theme, a dedication or a decoration you love: tell me here.")}</span>
          <textarea name="message" value={fields.message} onChange={updateField} aria-describedby="personalisation-hint" rows={4} maxLength={5000} />
        </label>
        {!canSubmit && <p className="request-minimum" id="request-minimum">{t(hasDraft ? "Confirm or remove the cookies in progress before sending your order." : "Confirm a selection or choose a timeless batch or little gift first.")} <a href="#your-assortment">{t("Your sweet selection")}</a></p>}
        <button type="submit" className="button button-primary" disabled={!canSubmit} aria-describedby={!canSubmit ? "request-minimum" : undefined}><MessageCircle size={16} />{t("Send to Giansy")}</button>
        <span className="form-note">{t("WhatsApp opens with your complete order. Confirm Send in the chat.")}</span>
      </form>
    </div>
  </section>;
}
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="detail-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close icon-button"
        onClick={onClose}
        aria-label={t("Close dialog")}
      >
        <X size={20} />
      </button>
      <h2>{t(title)}</h2>
      {children}
    </dialog>
  );
}
function Footer({ onLegal }: { onLegal: (value: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="section-width footer-main">
        <Logo footer />
        <p>
          {t("Small batch baking.")} <br />
          {t("Thoughtful little moments.")} <br />
          <span className="script">{t("Always made with love.")} </span>
        </p>
        <div className="footer-nav">
          <Link to="/#creations">{t("The Creations")} </Link>
          <Link to="/#our-story">{t("Our Story")} </Link>
          {features.journal && <Link to="/journal">{t("The Journal")} </Link>}
          <Link to="/#contact">{t("Say Ciao")} </Link>
        </div>
        <div className="footer-contact">
          <span>{t("A LITTLE HELLO GOES A LONG WAY.")} </span>
          <a href="tel:+393338240489"><Phone size={16} aria-hidden="true" /> +39 333 824 0489</a>
          <a href="https://www.instagram.com/lecreazionidigiansy/" target="_blank" rel="noreferrer">
            <Instagram size={16} aria-hidden="true" /> <span>@lecreazionidigiansy</span>{" "}
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="section-width footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          {t("Le Creazioni di Giansy. Made with a little love.")}{" "}
        </span>
        <div>
          <button onClick={() => onLegal("Privacy & cookies")}>
            {t("Privacy & cookies")}{" "}
          </button>
          <span>·</span>
          <button onClick={() => onLegal("A note on your selection")}>
            {t("Terms & information")}{" "}
          </button>
        </div>
        <a href="#top" aria-label={t("Back to top")}>
          {t("Back to the top")} <ArrowDown className="back-arrow" size={12} />
        </a>
      </div>
    </footer>
  );
}
function NotFound() {
  return (
    <main className="not-found section-width section-space">
      <Flourish />
      <h1>{t("A little wrong turn.")} </h1>
      <p>{t("Let’s find you something sweet.")} </p>
      <Link className="button button-primary" to="/">
        {t("Back home")} <ArrowRight size={15} />
      </Link>
    </main>
  );
}
const allProductIds = products.filter(p => !p.bundleSize).map(p => p.id);
const productIds = products.filter(p => !p.bundleSize && (p.quantityStep ?? 1) === 1).map(p => p.id);
const bundleIds = products.filter(p => p.bundleSize).map(p => p.id);
const timelessIds = products.filter(p => (p.quantityStep ?? 1) > 1).map(p => p.id);
function readCart(): CartItem[] {
  try {
    let cart = restoreCart(JSON.parse(localStorage.getItem("giansy-cart") || "[]"), bundleIds, (selection, packagingId) => Object.keys(selection).every(id => allProductIds.includes(id)) && isSelectionReady({ selection, packagingId }, packagingOptions, quantitySteps, largeProductIds), timelessIds);
    const oldSelection = JSON.parse(localStorage.getItem("giansy-assortment") || "{}").selection ?? {};
    for (const id of timelessIds) {
      const count = oldSelection[id];
      if (Number.isSafeInteger(count) && count > 0) cart = addTimelessToCart(cart, id, Math.ceil(count / quantitySteps[id]));
    }
    return cart;
  } catch { return []; }
}
function builderReducer(state: BuilderState, action: BuilderAction) {
  return updateBuilder(state, action, packagingOptions, productIds, quantitySteps, largeProductIds);
}
function readSaved(): BuilderState {
  try {
    return restoreBuilder(JSON.parse(localStorage.getItem("giansy-assortment") || "{}"), packagingOptions, productIds, quantitySteps, largeProductIds);
  } catch {
    return { ...emptyBuilder };
  }
}
export default function App() {
  const language = useLanguage();
  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "it"
        ? "Le Creazioni di Giansy — Piccole dolcezze, grande amore"
        : "Le Creazioni di Giansy — Handmade happiness";
  }, [language]);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const confirmedQuantities = Object.fromEntries(cart.filter(item => item.kind !== "custom").map(item => [item.productId, item.quantity * (item.kind === "timeless" ? quantitySteps[item.productId] : 1)]));
  useEffect(() => { try { localStorage.setItem("giansy-cart", JSON.stringify(cart)); } catch { /* Cart remains usable without storage. */ } }, [cart]);
  const [builder, dispatch] = useReducer(builderReducer, undefined, readSaved);
  const { selection, packagingId } = builder;
  const [category, setCategory] = useState("Christmas");
  const [detail, setDetail] = useState<Product | null>(null);
  const [legal, setLegal] = useState<string | null>(null);
  useEffect(() => {
    try {
      localStorage.setItem(
        "giansy-assortment",
        JSON.stringify(builder),
      );
    } catch {
      /* The builder remains usable when browser storage is unavailable. */
    }
  }, [builder]);
  function change(id: string, delta: number) {
    dispatch({ type: "change", id, delta });
  }
  const estimate = calculateEstimate(selection, packagingId);
  const cartSummary = describeCart(cart);
  function changeConfirmed(id: string, delta: number) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const timeless = (product.quantityStep ?? 1) > 1;
    const change = timeless ? delta / product.quantityStep! : delta;
    setCart(previous => change > 0 ? (timeless ? addTimelessToCart(previous, id, change) : addBundleToCart(previous, id, change)) : changeCartQuantity(previous, `${timeless ? "timeless" : "bundle"}:${id}`, change));
  }
  function addAssortment() {
    if (!isSelectionReady(builder, packagingOptions, quantitySteps, largeProductIds)) return;
    setCart(previous => addCustomToCart(previous, selection, packagingId));
    dispatch({ type: "reset" });
    window.requestAnimationFrame(() => {
      const confirmed = document.getElementById("confirmed-selections");
      confirmed?.focus({ preventScroll: true });
      confirmed?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    });
  }
  function changePackaging(id: string) {
    const option = packagingOptions.find(p => p.id === id);
    if (!option) return "";
    if (selectionSpace(selection, option, quantitySteps, largeProductIds) > option.capacity) {
      return t("This packaging does not have enough space for your selection. Remove some cookies first.");
    }
    dispatch({ type: "configure", packagingId: id });
    return "";
  }
  return (
    <SelectionContext.Provider value={{ count: estimate.packagedCount, usedSpace: estimate.usedSpace, capacity: estimate.packaging.capacity, minimum: estimate.packaging.minimum, minimumCount: estimate.minimumCount, minimumLabel: estimate.packaging.id === "box" ? t("Minimum: 6 small/medium or 2 large") : estimate.packaging.id === "tray" ? t("Minimum: 20 equivalents") : `${t("Minimum for this packaging:")} ${estimate.packaging.minimum}`, largeWeight: estimate.packaging.largeWeight }}>
      <ScrollManager />
      <a href="#main-content" className="skip-link">
        {t("Skip to content")}{" "}
      </a>
      <div id="top" />
      <Header count={cartSummary.packages} />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <TartanDivider />
                <PackagingBuilder packagingId={packagingId} onChange={changePackaging} />
                <Gallery
                  selection={selection}
                  onChange={change}
                  category={category}
                  setCategory={setCategory}
                  onDetails={setDetail}
                  confirmedQuantities={confirmedQuantities} onConfirmedChange={changeConfirmed}
                />
                <Assortment
                  selection={selection}
                  onChange={change}
                  packagingId={packagingId}
                  onPackagingChange={changePackaging}
                  reset={() => { dispatch({ type: "reset" }); setCart([]); }}
                  onAdd={addAssortment}
                  cart={cart} onCartChange={(id, delta) => setCart(previous => changeCartQuantity(previous, id, delta))}
                />
                <Contact cart={cart} hasDraft={estimate.count > 0} />
                {features.seasonalCollection && <Seasonal onExplore={() => setCategory(seasonal.category)} />}
                <Story />
                {features.journal && <JournalPreview />}
              </main>
            }
          />
          {features.journal && <Route path="/journal" element={<JournalPage />} />}
          {features.journal && <Route path="/journal/:slug" element={<ArticlePage />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer onLegal={setLegal} />
      {detail && (
        <Modal title={t(detail.name)} onClose={() => setDetail(null)}>
          <ProductGallery key={detail.id} product={detail} />
          <p>{t(detail.description)}</p>
          <p className="detail-price">
            {!detail.fixedPrice && `${t("From")} `}{money(detail.price * ((detail.quantityStep ?? 1) > 1 ? detail.quantityStep! : 1))} {t(detail.bundleSize ? "per package" : (detail.quantityStep ?? 1) > 1 ? "per 15 pieces" : "per item")}{" "}
          </p>
          {detail.size === "large" && <p className="detail-note">{t("Large cookie · takes 3 spaces in bags and trays, or 1.5 in the box.")}</p>}
          {(detail.quantityStep ?? 1) > 1 && <p className="timeless-order-note"><span>{t("Timeless biscuits are ordered in multiples of 15 per flavour, with packaging to agree.")}</span></p>}
          {detail.recipeId && recipes[detail.recipeId] && <section className="detail-ingredients" aria-labelledby="detail-ingredients-title">
            <h3 id="detail-ingredients-title">{t("Ingredients")}</h3>
            {recipes[detail.recipeId].sections.map(section => <p key={section.label}>
              {section.label && <strong>{t(section.label)} </strong>}{t(section.text)}
            </p>)}
          </section>}
          {detail.allergens && <p>
            <strong>{t("Allergen guide:")} </strong> {t(detail.allergens)}
          </p>}
          <p className="detail-note">
            {t(
              detail.recipeId
                ? "All creations are prepared in a shared kitchen. Please discuss allergies and specific needs with Giansy before confirming an order."
                : "Sample product information. All creations are prepared in a shared kitchen. Please discuss allergies, availability and custom requests with Giansy before confirming an order.",
            )}{" "}
          </p>
          <div className="dialog-actions">
            <Quantity
              product={detail}
              quantity={detail.bundleSize || (detail.quantityStep ?? 1) > 1 ? (confirmedQuantities[detail.id] ?? 0) : (selection[detail.id] || 0)}
              onChange={detail.bundleSize || (detail.quantityStep ?? 1) > 1 ? changeConfirmed : change}
            />
            <button
              className="button button-primary"
              onClick={() => setDetail(null)}
            >
              {t("Lovely, thank you")} <Check size={15} />
            </button>
          </div>
        </Modal>
      )}
      {legal && (
        <Modal title={t(legal)} onClose={() => setLegal(null)}>
          {legal.startsWith("Privacy") ? (
            <>
              <p>
                {t(
                  "This prototype stores your selected products and packaging in your browser so you can return to your assortment. Use “Start afresh” to clear it.",
                )}{" "}
              </p>
              <p>
                {t(
                  "Contact form details stay in your browser. This preview does not send requests, process payments or use analytics.",
                )}{" "}
              </p>
              <p>
                {t(
                  "Google Fonts is used for typography. Instagram opens an external website. A final privacy policy and business details will be added before launch.",
                )}{" "}
              </p>
            </>
          ) : (
            <>
              <p>
                {t(
                  "This is a showcase prototype. Product prices, packaging costs, contact details, availability and allergen information are samples and must be confirmed with the baker.",
                )}{" "}
              </p>
              <p>
                {t(
                  "The plate shows one image of each selected product type. Quantities and packaging are counted separately in your estimate. No payment, delivery or binding order is taken through this site.",
                )}{" "}
              </p>
              <p>
                {t(
                  "Product photography is illustrative. The final assortment will be handmade especially for you.",
                )}{" "}
              </p>
            </>
          )}
        </Modal>
      )}
    </SelectionContext.Provider>
  );
}
