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

GitHub Pages hosts the static prototype. Hosted CMS authentication and contact delivery still require their own service setup; the existing Netlify configuration remains an alternative for Git Gateway.

## Working features

- Real maker-cookie photo cutouts: 16 Christmas products with supplied prices, 8 Halloween designs and 2 flowers with provisional prices. The placeholder preserve stays only in Confetture. Previous sample occasion products are archived in `assets/archive/sample-occasion-products.json`.
- A packaging step before the cookies: free paper bag (1–25), free cardboard or €3 decorated plate (6–15), and €0.50 cardboard box (5–20). Packaging changes apply immediately. There is no upfront quantity input: customers choose freely in the gallery, whose live counter shows selected pieces / package capacity. Small hand-drawn ivory illustrations with light shading sit above each option.
- One capacity limit across the gallery, product dialog and order summary, immediate estimates, reset, and saved selections. Package minimums apply only to the final request; customers can build below them while browsing. Smaller packages cannot discard an existing selection; the customer removes extras first. Legacy saved quantity targets are ignored.
- Burgundy backgrounds throughout, ivory lettering and logo, scalloped antique product labels, overlapping cookie cutouts and soft shadows.
- A silver plate with one representative image per selected product type, arranged around a filled centre independently of quantities. The full silver plate straddles burgundy and woven tartan; the empty state has no opaque centre overlay.
- Editable seasonal feature, baker story, journal categories and individual articles.
- A clear order-request form with an attached assortment preview, packaging and estimate; a prominent notes panel for colours, decorations and dedications; and a final “Invia richiesta” action. Submission currently shows an explicitly labelled preview confirmation; no message or payment is sent while contact details remain provisional. Name, email and notes survive editing; changing the assortment clears the confirmation.
- Responsive navigation, keyboard controls, modal focus handling, reduced-motion support, and saved language preference.

## Content management

`npm run test:selection` checks packaging minimums, capacities, hard quantity limits, rapid additions, removal, reset and saved-selection migration. It also runs before each Pages deployment.

Decap CMS is configured at `/admin/` to manage journal articles, products, images, prices, packaging and the seasonal feature. Content lives in:

- `src/data/catalog.json` — products and packaging; keep IDs stable. Image values are absolute public paths.
- `src/data/seasonal.json` — seasonal image, copy and filter target.
- `src/data/journal.json` — articles and paragraphs.
- `src/data/italian.json` — Italian translations of the seeded English text. New Italian text can be entered directly in the CMS; unknown text is shown unchanged. Add translations here when publishing new bilingual content.

Hosted CMS authentication is **not connected**. To enable independent publishing, connect the repository to Netlify, enable Identity and Git Gateway, use invite-only registration, invite the editor, and set the actual repository branch in `public/admin/config.yml`. Open invitation links at `/admin/`. Editor commits trigger the static site rebuild. `netlify.toml` includes the build and routing configuration. No credentials are included.

For local editing, run `npx decap-server` from the repository alongside Vite, then visit `/admin/`. `local_backend: true` enables that local proxy without hosted login. Do not expose the local proxy publicly.

Journal articles use plain text with blank lines between paragraphs. HTML is not executed. Publishing takes effect after the hosting build; scheduling is outside this prototype.

## Identity and imagery

View `/brand/` for the logo presentation and downloads. The approved “L’incisione d’epoca” frame has engraved acanthus scrolls, a dotted inner border and the original outlined script lettering. Its editable frame source is `assets/brand/engraved-frame.svg`. SVG files require no installed fonts:

- `public/brand/giansy-logo-burgundy.svg` and `giansy-logo-ivory.svg` — primary label.
- Matching transparent PNG exports at 1,860 px wide.
- `giansy-wordmark-burgundy.svg` and `giansy-wordmark-ivory.svg` — simplified signatures.
- `giansy-monogram.svg` and `public/favicon.svg` — small mark.

Regenerate the SVG source with `python3 scripts/create-logo.py` (requires fontTools). Pinyon Script and its OFL license are in `assets/fonts/`.

The portrait and tartan are supplied references. Four temporary transparent PNG cookie assets in `public/images/` were made with AI-assisted extraction from the supplied photos; optimized WebP versions are used on the site. Replace these illustrative assets when original product photography arrives. Other bakery imagery and the engraved frame were made with the built-in image tool. See `assets/IMAGE_SOURCES.md` for provenance and prompts.

## Launch setup remaining

Replace the placeholder email and Instagram destination, confirm products, prices and allergens, replace illustrative photography, connect CMS authentication, and add final business and privacy details. The contact flow prepares a message locally; a delivery service can be connected later. Checkout and payments are intentionally excluded.

The seasonal feature and journal are preserved but hidden, including journal navigation and public routes. Re-enable them in `src/data/features.json` when needed.

Cookie extraction prompts, source mappings and limitations are recorded in `assets/COOKIE_CUTOUTS.md`. Product `fixedPrice` hides the “From” prefix; `provisionalPrice` marks the temporary Halloween/flower prices.

A full-width tartan stripe separates the request form from Giansy’s story.
