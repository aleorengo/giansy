# Le Creazioni di Giansy

A responsive artisan bakery prototype built with React, TypeScript, and Vite. Italian is the default; the discreet EN/IT switch changes the interface, products, journal, dates, prices, and contact flow.

## Run

```sh
npm install
npm run dev
```

The server runs at `http://localhost:5173`. `npm run build` checks TypeScript and creates `dist/`; `npm run preview` serves the production build.

## GitHub Pages

The site publishes from `main` through `.github/workflows/pages.yml`. The workflow uses the Pages base path for assets and navigation, and creates static entry files for the journal and each article so direct links and refreshes work.

For a local project-path check, run `BASE_PATH=/giansy/ npm run build`, then `BASE_PATH=/giansy/ npm run preview` and open `http://localhost:4173/giansy/`. Root deployments continue to work with the ordinary build command. Public logo downloads are adjusted to the same base path automatically.

GitHub Pages hosts the static site. Requests open WhatsApp with a complete prefilled message; customers confirm Send in the chat. PDF export is deferred. Hosted CMS authentication still requires service setup; the existing Netlify configuration remains an alternative for Git Gateway.

## Working features

- “Confezioni assortite” sits beside the timeless biscuits: 3-cookie pouch (€4.50), 12-cookie bag (€15), and 15-cookie brass tray (€20), packaging included. Plus/minus chooses whole packages and updates “La tua dolce selezione” immediately. Bundles are listed there but never placed on the silver plate; there is no second cart section. Image masters, prompts and limitations are in `assets/GIFT_BUNDLES.md`.
- “La tua dolce selezione” contains the live custom assortment first, then a horizontal divider and the confirmed selections. Decorated cookies stay editable until “Conferma la selezione” snapshots the complete contents and packaging; the draft then clears for another assortment. Timeless 15-piece batches and Piccoli pensieri enter the confirmed list directly. All rows use the same compact name, quantity and price style. Confirmed lines can be repeated or removed; gallery controls remain synchronised for batches and bundles. Only confirmed selections are sent. An unfinished draft must be confirmed or removed before sending.

- “Biscotti senza tempo” groups oranges, almond/coffee biscuits, hazelnut/apricot/chocolate biscuits, Vin Santo/raisin/pine nut biscuits, pumpkin biscuits and marzipan dates. Each flavour is ordered in steps of 15. Bulk quantities are independent of decorated-cookie packaging and persist beyond 25 pieces; bulk packaging is agreed separately. Prices, image prompts and sources are in `assets/TIMELESS_BISCUITS.md`. Mixed requests still respect decorated packaging minimums/capacities.

- Cookie detail galleries show transparent decoration variants as overlapping cookies, with the next image peeking from the right. Customers can swipe, click the rear cookie, use arrows, dots or keyboard controls; the original collection cover remains unchanged. Decoration preferences belong in the order notes. PNG masters, source mappings, prompts and reconstruction limitations are in `assets/COOKIE_VARIANTS.md`.
- Real maker-cookie photo cutouts: 14 Christmas products with supplied prices, 6 timeless treats, 8 Halloween designs and 2 flowers with provisional prices. The placeholder preserve stays only in Confetture. Previous sample occasion products are archived in `assets/archive/sample-occasion-products.json`.
- Packaging: free paper bag (up to 25 small/medium spaces), free cardboard tray (20–35 equivalents), €3 small brass tray (6–20), and €0.50 box (6–15 small/medium or 2–10 large). Large cookies take 3 spaces in bags/trays and 1.5 in box capacity. For the cardboard tray minimum, large cookies count as 3 equivalents; the box minimum is 6 equivalents with large cookies worth 3. Other package minimums count actual pieces. Packaging changes apply immediately. Gallery counters show used capacity and actual pieces, with no upfront quantity input.
- One capacity limit across the gallery, product dialog and order summary, immediate estimates, reset, and saved selections. Package minimums apply only to the final request; customers can build below them while browsing. Smaller packages cannot discard an existing selection; the customer removes extras first. Legacy saved quantity targets are ignored.
- Burgundy backgrounds throughout, ivory lettering and logo, scalloped antique product labels, overlapping cookie cutouts and soft shadows.
- A silver plate with one representative image per selected product type, arranged around a filled centre independently of quantities. The full silver plate straddles burgundy and woven tartan; the empty state has no opaque centre overlay.
- Editable seasonal feature, baker story, journal categories and individual articles.
- Checkout has no heading or email field: name, confirmed total, desired date, optional personalisation notes and one “Invia a Giansy” button. It opens a WhatsApp request addressed to `src/data/contact.json`, starting with name, date and message. Personalised assortments show one price, total cookie count, packaging and the complete cookie list; repeats aggregate the contents and state how many identical packages to make. Timeless lines show actual piece counts (15/30/45…), product name and one price. Mixed packages are grouped as “Confezioni miste”, with quantity, contents description and one price. The order ends with its grand total. The customer confirms Send in the chat. No payment is collected; PDF functionality is deferred.

  Implementation reference: [WhatsApp click to chat](https://faq.whatsapp.com/5913398998672934). No WhatsApp API or automatic file attachment is used.
- Responsive navigation, keyboard controls, modal focus handling, reduced-motion support, and saved language preference.

## Content management

`npm run test:selection` checks packaging minimums, capacities, hard quantity limits, rapid additions, removal, reset and saved-selection migration. It also runs before each Pages deployment.

Decap CMS is configured at `/admin/` to manage journal articles, products, images, prices, packaging and the seasonal feature. Content lives in:

- `src/data/catalog.json` — products and packaging; keep IDs stable. Image values are absolute public paths. `quantityStep: 15` enables batch ordering outside decorated-cookie packaging limits.
- Optional product `gallery` entries contain an `image` path and a bilingual `label`; Decap exposes them as a list beneath the cover image.
- `src/data/seasonal.json` — seasonal image, copy and filter target.
- `src/data/journal.json` — articles and paragraphs.
- `src/data/italian.json` — Italian translations of the seeded English text. New Italian text can be entered directly in the CMS; unknown text is shown unchanged. Add translations here when publishing new bilingual content.

Hosted CMS authentication is **not connected**. To enable independent publishing, connect the repository to Netlify, enable Identity and Git Gateway, use invite-only registration, invite the editor, and set the actual repository branch in `public/admin/config.yml`. Open invitation links at `/admin/`. Editor commits trigger the static site rebuild. `netlify.toml` includes the build and routing configuration. No credentials are included.

For local editing, run `npx decap-server` from the repository alongside Vite, then visit `/admin/`. `local_backend: true` enables that local proxy without hosted login. Do not expose the local proxy publicly.

Journal articles use plain text with blank lines between paragraphs. HTML is not executed. Publishing takes effect after the hosting build; scheduling is outside this prototype.

## Identity and imagery

The navigation uses `giansy-seal.svg` (outline and dots, without lettering) beside `giansy-script-wordmark.svg`; the seal scales with the script and is optically centred. The hero uses `giansy-round-logo.svg` and the supplied kitchen portrait, with the seal clear of the face. The seamless burgundy logo pattern begins below the decorated-cookie counter and includes the timeless/mixed-assortment introductions for a continuous background. See `assets/BRAND_OCT26.md` for asset provenance.

View `/brand/` for the logo presentation and downloads. The approved “L’incisione d’epoca” frame has engraved acanthus scrolls, a dotted inner border and the original outlined script lettering. Its editable frame source is `assets/brand/engraved-frame.svg`. SVG files require no installed fonts:

- `public/brand/giansy-logo-burgundy.svg` and `giansy-logo-ivory.svg` — primary label.
- Matching transparent PNG exports at 1,860 px wide.
- `giansy-wordmark-burgundy.svg` and `giansy-wordmark-ivory.svg` — simplified signatures.
- `giansy-monogram.svg` and `public/favicon.svg` — small mark.

Regenerate the SVG source with `python3 scripts/create-logo.py` (requires fontTools). Pinyon Script and its OFL license are in `assets/fonts/`.

The portrait and tartan are supplied references. Four temporary transparent PNG cookie assets in `public/images/` were made with AI-assisted extraction from the supplied photos; optimized WebP versions are used on the site. Replace these illustrative assets when original product photography arrives. Other bakery imagery and the engraved frame were made with the built-in image tool. See `assets/IMAGE_SOURCES.md` for provenance and prompts.

## Launch setup remaining

Replace the placeholder Instagram destination, confirm products, prices and allergens, replace illustrative photography, connect CMS authentication, and add final business and privacy details. WhatsApp opens a prefilled message; sending is confirmed in the chat. PDF functionality is deferred. Checkout and payments are intentionally excluded.

The seasonal feature and journal are preserved but hidden, including journal navigation and public routes. Re-enable them in `src/data/features.json` when needed.

Cookie extraction prompts, source mappings and limitations are recorded in `assets/COOKIE_CUTOUTS.md`. Product `fixedPrice` hides the “From” prefix; `provisionalPrice` marks the temporary Halloween/flower prices.

A full-width tartan stripe separates the request form from Giansy’s story.
