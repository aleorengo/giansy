import { t, useLanguage, getLanguage, setLanguage } from "./i18n";
import { assetUrl } from "./assets";
import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cookie,
  Gift,
  Heart,
  Instagram,
  Mail,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { Flourish, OrnatePortrait } from "./components/Ornaments";
import AntiqueLabel from "./components/AntiqueLabel";
import { getTrayLayout } from "./tray-layout";
import PackagingBuilder, { SelectionProgress } from "./components/PackagingBuilder";
import { SelectionContext, useSelectionLimit } from "./selection-context";
import { emptyBuilder, restoreBuilder, updateBuilder } from "./selection";
import type { BuilderState, BuilderAction } from "./selection";
import {
  calculateEstimate,
  categories,
  money,
  packagingOptions,
  products,
} from "./data/products";
import type { Product, Selection } from "./data/products";
import journal from "./data/journal.json";
import seasonal from "./data/seasonal.json";
import features from "./data/features.json";

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label={t("Le Creazioni di Giansy home")}
    >
      <img
        src={assetUrl("/brand/giansy-logo-ivory.svg?v=engraved-01")}
        alt={t("Le creazioni di Giansy — engraved vintage frame")}
        width="620"
        height="390"
      />
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
      <div className="announcement">
        <span>✧</span> {t("HANDMADE WITH LOVE. SHARED WITH JOY.")}{" "}
        <span>✧</span>
      </div>
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
          <Link className="selection-link" to="/#your-assortment">
            <ShoppingBag size={17} strokeWidth={1.4} />
            <span>{t("Your selection")} </span>
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
            <OrnatePortrait />
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
            <span>{t("FATTO CON AMORE")} </span>
            <Heart size={26} strokeWidth={1} />
            <span>{t("ALWAYS HANDMADE")} </span>
          </div>
          <span className="portrait-caption script">
            {t("Ciao, sono Giansy!")}{" "}
          </span>
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
  const { count, cookieCount, isConfigured } = useSelectionLimit();
  const atLimit = !isConfigured || !cookieCount || count >= cookieCount;
  return (
    <div className={`quantity ${compact ? "quantity-compact" : ""}`}>
      <button
        disabled={!quantity}
        onClick={() => onChange(product.id, -1)}
        aria-label={`${t("Remove one")} ${t(product.name)}`}
      >
        <Minus size={13} />
      </button>
      <span aria-label={`${quantity} ${t(product.name)} ${t("selected")}`}>
        {quantity}
      </span>
      <button
        disabled={atLimit}
        title={!cookieCount || !isConfigured ? t("First choose your packaging and cookie quantity.") : atLimit ? t("Your selection is complete.") : undefined}
        onClick={() => onChange(product.id, 1)}
        aria-label={`${t("Add one")} ${t(product.name)}`}
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
    if (!added || !cookie || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      className={`product-card ${quantity ? "product-selected" : ""}`}
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
        {quantity > 0 && (
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
          <button className="product-name" onClick={() => onDetails(product)}>
            <h3>{t(product.name)}</h3>
          </button>
          <p>{t(product.description)}</p>
          <div className="product-bottom">
            <span>
              {!product.fixedPrice && `${t("From")} `}<strong>{money(product.price)}</strong>
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
function Gallery({
  selection,
  onChange,
  category,
  setCategory,
  onDetails,
}: {
  selection: Selection;
  onChange: (id: string, delta: number) => void;
  category: string;
  setCategory: (c: string) => void;
  onDetails: (p: Product) => void;
}) {
  const visible = products.filter(p => p.categories.includes(category));
  return (
    <section className="creations-section" id="cookies">
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
        <div
          className="category-tabs"
          role="group"
          aria-label={t("Filter creations")}
        >
          {categories.map((c) => (
            <button
              aria-pressed={category === c}
              className={category === c ? "selected" : ""}
              key={t(c)}
              onClick={() => setCategory(c)}
            >
              {c === "Christmas" && <Sparkles size={12} />} {t(c)}
            </button>
          ))}
        </div>
        <SelectionProgress />
        <div className="product-grid">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              quantity={selection[p.id] || 0}
              onChange={onChange}
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
      <div className="collection-tartan" aria-hidden="true" />
    </section>
  );
}
function Assortment({
  selection,
  onChange,
  packagingId,
  onPackagingChange,
  reset,
}: {
  selection: Selection;
  onChange: (id: string, delta: number) => void;
  packagingId: string;
  onPackagingChange: (id: string) => string;
  reset: () => void;
}) {
  const { cookieCount } = useSelectionLimit();
  const [packagingError, setPackagingError] = useState("");
  useEffect(() => setPackagingError(""), [selection, packagingId]);
  const estimate = calculateEstimate(selection, packagingId);
  const trayLayout = getTrayLayout(estimate.selected.length);
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
              className={`live-plate ${estimate.selected.length ? "has-products" : ""}`}
              ref={trayRef}
            >
              <img
                className="silver-plate"
                src={assetUrl("/images/silver-plate.webp")}
                alt={t("An ornate vintage silver serving platter")}
              />
              {!estimate.selected.length ? (
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
                estimate.selected.map((p, i) => (
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
                        estimate.selected.length -
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
              <ShoppingBag size={19} strokeWidth={1.2} />
            </div>
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
                        {money(p.price)} {t("each")}{" "}
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
            <div className="packaging packaging-summary">
              <label htmlFor="summary-packaging">
                <Gift size={15} /> {t("The finishing touch")}{" "}
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
              {cookieCount > 0 && <small>{estimate.count} / {cookieCount} {t("cookies")}</small>}
              {packagingError && <p id="summary-packaging-error" role="status" className="packaging-error">{packagingError}</p>}
            </div>
            {estimate.selected.length > 0 && (
              <div className="subtotal-lines">
                <span>
                  {t("Creations")} <span>{money(estimate.subtotal)}</span>
                </span>
                <span>
                  {t("Packaging")}{" "}
                  <span>{money(estimate.packaging.price)}</span>
                </span>
              </div>
            )}
            <div className="estimated-total" aria-live="polite">
              <span>
                {t("Estimated total")}{" "}
                <small>
                  {estimate.count} {t("handmade")}{" "}
                  {estimate.count === 1 ? t("treat") : t("treats")}
                </small>
              </span>
              <strong>{money(estimate.total)}</strong>
            </div>
            <p className="pricing-note">
              {t(
                "An indicative total. Availability, your assortment and any special requests will be confirmed together.",
              )}{" "}
            </p>
            <a href="#contact" className="button button-primary order-cta">
              {t("Let’s make it yours")} <ArrowRight size={15} />
            </a>
            <button
              className="reset-selection"
              onClick={reset}
              disabled={!estimate.count && !cookieCount}
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
              src={assetUrl("/images/giansy-portrait.webp")}
              alt={t("Meet Giansy, the heart behind Le Creazioni di Giansy")}
              loading="lazy"
            />
          </div>
          <Flourish />
          <span>{t("GOOD THINGS TAKE A LITTLE LOVE.")} </span>
        </div>
      </div>
    </section>
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
function Contact({
  selection,
  packagingId,
}: {
  selection: Selection;
  packagingId: string;
}) {
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const estimate = calculateEstimate(selection, packagingId);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const assortment = estimate.selected.length
      ? `\n\n${t("My selection:")}\n${estimate.selected.map((p) => `${selection[p.id]} × ${t(p.name)} — ${money(p.price * selection[p.id])}`).join("\n")}\n${t("Packaging")}: ${t(estimate.packaging.name)}\n${t("Estimated total")}: ${money(estimate.total)}`
      : "";
    setDraft({
      subject: `${t(String(data.get("occasion")))} — ${t("enquiry from")} ${data.get("name")}`,
      body: `Ciao Giansy!\n\n${data.get("message")}${assortment}\n\n${data.get("name")}\n${data.get("email")}`,
    });
    setCopied(false);
  }
  return (
    <section className="contact-section" id="contact">
      <div className="section-width contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">{t("SOMETHING SPECIAL IN MIND?")} </span>
          <h2>
            {t("Let’s create")} <br />
            <em>{t("something sweet.")} </em>
          </h2>
          <p>
            {t(
              "A birthday, a wedding, a thoughtful gift, or just because. Tell me what you’re dreaming of, and we’ll make a little magic together.",
            )}{" "}
          </p>
          <div className="contact-links">
            <a href="mailto:hello@giansy.example">
              <Mail size={17} /> {t("hello@giansy.example")}{" "}
              <span>{t("PLACEHOLDER")} </span>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} />{" "}
              {t("Find a little inspiration on Instagram")}{" "}
              <ArrowUpRight size={14} />
            </a>
          </div>
          <Flourish />
        </div>
        <div className="contact-form-wrap">
          {draft ? (
            <div className="contact-draft" role="status">
              <div className="draft-check">
                <Check size={24} />
              </div>
              <h3>{t("Your sweet note is ready.")} </h3>
              <p>
                {t(
                  "This prototype prepares your message without sending it. The bakery’s contact details will be added before launch.",
                )}{" "}
              </p>
              <pre>{draft.body}</pre>
              <div className="draft-actions">
                <button
                  className="button button-primary"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `${t("Subject:")} ${draft.subject}\n\n${draft.body}`,
                      );
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? t("Message copied") : t("Copy my message")}{" "}
                  {copied ? <Check size={15} /> : <Mail size={15} />}
                </button>
                <button className="text-link" onClick={() => setDraft(null)}>
                  {t("Edit message")}{" "}
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  {t("Your name")}{" "}
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder={t("A lovely name")}
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  {t("Email address")}{" "}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("you@example.com")}
                    required
                    maxLength={200}
                  />
                </label>
              </div>
              <label>
                {t("What’s the occasion?")}{" "}
                <div className="select-wrap">
                  <select name="occasion" defaultValue="Just because">
                    <option value="Just because">{t("Just because")} </option>
                    <option value="A birthday">{t("A birthday")} </option>
                    <option value="A wedding">{t("A wedding")} </option>
                    <option value="A party or celebration">
                      {t("A party or celebration")}{" "}
                    </option>
                    <option value="A seasonal gift">
                      {t("A seasonal gift")}{" "}
                    </option>
                    <option value="A little question">
                      {t("A little question")}{" "}
                    </option>
                  </select>
                  <ChevronDown size={14} />
                </div>
              </label>
              <label>
                {t("Your little idea")}{" "}
                <textarea
                  name="message"
                  placeholder={t(
                    "Tell me a little about what you have in mind…",
                  )}
                  rows={4}
                  required
                  maxLength={5000}
                />
              </label>
              {estimate.count > 0 && (
                <span className="selection-attached">
                  <Check size={13} /> {t("Your selection of")} {estimate.count}{" "}
                  {t("treats will be included.")}{" "}
                </span>
              )}
              <button type="submit" className="button button-primary">
                {t("Prepare my message")} <ArrowRight size={15} />
              </button>
              <span className="form-note">
                {t("A friendly first step. No payment or commitment.")}{" "}
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
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
          <a href="mailto:hello@giansy.example">{t("hello@giansy.example")} </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <Instagram size={16} /> {t("Follow the little joys")}{" "}
            <ArrowUpRight size={13} />
          </a>
          <small>{t("Contact details are placeholders.")} </small>
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
const productIds = products.map(p => p.id);
function builderReducer(state: BuilderState, action: BuilderAction) {
  return updateBuilder(state, action, packagingOptions, productIds);
}
function readSaved(): BuilderState {
  try {
    return restoreBuilder(JSON.parse(localStorage.getItem("giansy-assortment") || "{}"), packagingOptions, productIds);
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
  const [builder, dispatch] = useReducer(builderReducer, undefined, readSaved);
  const { selection, packagingId, cookieCount } = builder;
  const [configurationReady, setConfigurationReady] = useState(cookieCount > 0);
  const [configurationVersion, setConfigurationVersion] = useState(0);
  const configure = useCallback((id: string, count: number) => {
    dispatch({ type: "configure", packagingId: id, cookieCount: count });
  }, []);
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
    if (delta > 0 && !configurationReady) return;
    dispatch({ type: "change", id, delta });
  }
  const estimate = calculateEstimate(selection, packagingId);
  function changePackaging(id: string) {
    const option = packagingOptions.find(p => p.id === id);
    if (!option) return "";
    if (estimate.count > option.capacity) {
      return `${t("This packaging holds up to")} ${option.capacity} ${t("cookies")}. ${t("Remove first:")} ${estimate.count - option.capacity}.`;
    }
    dispatch({ type: "configure", packagingId: id,
      cookieCount: Math.min(option.capacity, Math.max(option.minimum, cookieCount, estimate.count)) });
    setConfigurationVersion(version => version + 1);
    setConfigurationReady(true);
    return "";
  }
  return (
    <SelectionContext.Provider value={{ count: estimate.count, cookieCount, isConfigured: configurationReady }}>
      <ScrollManager />
      <a href="#main-content" className="skip-link">
        {t("Skip to content")}{" "}
      </a>
      <div id="top" />
      <Header count={estimate.count} />
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <TartanDivider />
                <PackagingBuilder packagingId={packagingId}
                  onConfigure={configure} onReadinessChange={setConfigurationReady} syncVersion={configurationVersion} />
                <Gallery
                  selection={selection}
                  onChange={change}
                  category={category}
                  setCategory={setCategory}
                  onDetails={setDetail}
                />
                <Assortment
                  selection={selection}
                  onChange={change}
                  packagingId={packagingId}
                  onPackagingChange={changePackaging}
                  reset={() => dispatch({ type: "reset" })}
                />
                <Contact selection={selection} packagingId={packagingId} />
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
          <img
            className="dialog-product"
            src={assetUrl(detail.image)}
            alt={t(detail.name)}
          />
          <p>{t(detail.description)}</p>
          <p className="detail-price">
            {!detail.fixedPrice && `${t("From")} `}{money(detail.price)} {t("per item")}{" "}
          </p>
          <p>
            <strong>{t("Allergen guide:")} </strong> {t(detail.allergens)}.
          </p>
          <p className="detail-note">
            {t(
              "Sample product information. All creations are prepared in a shared kitchen. Please discuss allergies, availability and custom requests with Giansy before confirming an order.",
            )}{" "}
          </p>
          <div className="dialog-actions">
            <Quantity
              product={detail}
              quantity={selection[detail.id] || 0}
              onChange={change}
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
                  "Contact form details stay in your browser and are only copied when you choose to do so. This site does not process payments, send messages or use analytics.",
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
