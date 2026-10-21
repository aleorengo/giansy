# Cookie gallery variants

Built-in image generation/editing mode, 21 October 2026. AI-assisted extraction and lighting correction from the maker's supplied photos. This adds 13 transparent images to six existing product galleries; collection cover images, prices, ordering and quantities stay the same. Albero Tipo 1 now has six images including its cover.

## Files and source mapping

PNG masters: `assets/christmas/variants/`. Website exports: `public/images/christmas/variants/`, same basenames with WebP extension. Each is 600 × 600 pixels with transparent alpha, an object fitted within 560 × 560 pixels, and transparent padding. Galleries are view-only; decoration preferences go in request notes.

| File stem | Source photo / detail |
| --- | --- |
| tree-blue-curls | 58d73fb4 / upper-left upright tree |
| tree-blue-branches | 58d73fb4 / upper-middle blue branches with red baubles |
| tree-blue-gold | e7cd9ba8 (same tree photograph) / bottom-left blue branches, gold sprinkles |
| tree-green-garlands | 58d73fb4 / lower green tree with white garlands; reused earlier extraction |
| tree-blue-garlands | e7cd9ba8 / lower blue tree with white garlands; export rotated upright |
| person-teal-cuffs | fa86ab12 / central gingerbread person; reused earlier extraction |
| snowflake-white-lace | 73d5d6ab / dense white icing and silver pearls |
| snowflake-rounded | 47e9a254 / upper-right rounded design |
| snowflake-colourful | 47e9a254 / lower-left design with coloured accents |
| snowflake-blue | 11d47ced / blue icing, central gold pearl |
| reindeer-heart | 2dc0b7dd / central reindeer with red heart |
| heart-red | 5cc1a1d4 / red heart with white shine marks |
| gift-red-bow | 3fc1dd23 / middle gift with red ribbon and green holly |

Source IDs refer to attachments in this conversation. All have prefix `0ed01944-e34b-4c08-93d1-4fa368ff6cab-`. Complete attachment paths are recorded in the prompts below.

## Limitations

These are illustrative AI-assisted cutouts rather than pixel-exact masks. The gift's right side was missing in the supplied narrow crop, so it was reconstructed with the existing complete gift as an outline reference. The red heart's tiny bottom tip was hidden by screenshot controls and was also reconstructed. No separate purchasable SKU is implied by browsing a decoration.

Atlases were desprited by isolating the intended alpha component, preserving edge antialiasing and cropping transparent space; this avoids neighboring fragments. Sharp was used only for alpha-preserving crop, orientation normalization, scaling and PNG/WebP export. The first tree atlas extracted a different blue branch tree than the requested bottom-left one; that useful distinct design was retained and a second generation recovered the requested bottom-left tree.

## Prompt set

### trees

References:
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-58d73fb4-10a3-4839-9a47-9285a9fcc076.png`

Use case: background-extraction. Asset type: transparent photographic cutouts of actual handmade biscuits for a patisserie product-image gallery. All supplied photographs are EDIT TARGETS unless explicitly marked as supporting reference. Preserve original baked silhouette, original icing shapes and placement, real cookie texture and handmade imperfections. Do not redesign or invent different decorations. Remove ALL surface backgrounds, neighbors, cast shadows, screenshot bars or controls. Gently balance dim or warm lighting to natural soft daylight with golden baked dough and clean white icing, retain real icing colors. TRUE transparent alpha around entire cookie and between any protrusions. No plate, no text, no captions or borders. Square 1536x1536 atlas, 2x2 equal cells, each whole individual product centered with generous transparent margins, no crossing cell boundaries or overlap. TOP LEFT: isolate the complete blue squiggle-iced tree near upper left of photo, the one pointing upright with thin blue loops and tiny golden sprinkles. TOP RIGHT: isolate the complete upright blue branch-decorated tree at bottom left, just left of the green white-garland tree, with tiny gold sprinkles. BOTTOM TWO CELLS must be entirely empty transparent. Exactly TWO individual cookie cutouts. Retain each tree's own irregular cookie outline and different icing, not two copies of one design.

### snowflakes

References:
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-73d5d6ab-e031-4b02-a578-262c9a38188e.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-47e9a254-87df-44d6-9900-e4bfde84b1e3.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-11d47ced-f5b2-4aea-aac9-c87a6a3acd58.png`

Use case: background-extraction. Asset type: transparent photographic cutouts of actual handmade biscuits for a patisserie product-image gallery. All supplied photographs are EDIT TARGETS unless explicitly marked as supporting reference. Preserve original baked silhouette, original icing shapes and placement, real cookie texture and handmade imperfections. Do not redesign or invent different decorations. Remove ALL surface backgrounds, neighbors, cast shadows, screenshot bars or controls. Gently balance dim or warm lighting to natural soft daylight with golden baked dough and clean white icing, retain real icing colors. TRUE transparent alpha around entire cookie and between any protrusions. No plate, no text, no captions or borders. Square 1536x1536 atlas, 2x2 equal cells, each whole individual product centered with generous transparent margins, no crossing cell boundaries or overlap. TOP LEFT: the entire densely white-iced snowflake with many silver pearls from image1. TOP RIGHT: the small six-point white snowflake at upper RIGHT of image2, with short rounded branch icing and silver pearls. BOTTOM LEFT: the lower LEFT snowflake from image2, with white icing, silver pearls and tiny colored red/green/yellow accents. BOTTOM RIGHT: the whole blue-iced large snowflake with single gold pearl at center from image3, remove wooden surface and neutralize orange light while preserving blue icing and golden dough. Four distinct real snowflakes; keep exact source shapes and details, not symmetric generic redraws.

### characters

References:
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-2dc0b7dd-efa1-4fe4-88ca-df393989a2c8.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-5cc1a1d4-4e3e-4d84-8092-2bdb6e31b4ee.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-3fc1dd23-a8f6-41cd-b778-449754c69e82.png`
- `/Users/alessandra/.t3/projects/giansy/public/images/christmas/gift.webp`

Use case: background-extraction. Asset type: transparent photographic cutouts of actual handmade biscuits for a patisserie product-image gallery. All supplied photographs are EDIT TARGETS unless explicitly marked as supporting reference. Preserve original baked silhouette, original icing shapes and placement, real cookie texture and handmade imperfections. Do not redesign or invent different decorations. Remove ALL surface backgrounds, neighbors, cast shadows, screenshot bars or controls. Gently balance dim or warm lighting to natural soft daylight with golden baked dough and clean white icing, retain real icing colors. TRUE transparent alpha around entire cookie and between any protrusions. No plate, no text, no captions or borders. Square 1536x1536 atlas, 2x2 equal cells, each whole individual product centered with generous transparent margins, no crossing cell boundaries or overlap. TOP LEFT: the complete central reindeer from image1, with white antlers, red nose, a little red heart on its body and white cuffs. TOP RIGHT: the red-iced heart with white tiny shine marks at right of image2. Its very bottom tip is hidden by the screenshot message bar: reconstruct only that small tip using the visible outline, remove screenshot UI completely. BOTTOM LEFT: a single little gift from the middle of image3, with white icing, green holly sprigs, red berries and a RED ribbon bow at top. Image3 clips the right side: use image4 only as a construction/whole-outline reference for a small rectangular gift cookie, not its icing design. Preserve the red-bow/green-holly decoration from image3, extend the cropped right side modestly to restore the whole rectangle, keep handmade character. BOTTOM RIGHT must remain empty transparent. Exactly THREE cookies. The gift is a best-effort recovery from the cropped source; do not add text or other decoration.


### Additional trees

Reference: `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-e7cd9ba8-b451-4841-9c06-cbef1a6a0437.png`

Use case: background-extraction. EDIT TARGET: the supplied baking-tray photograph of actual decorated Christmas tree biscuits. Precisely extract TWO particular real cookies, not redesigns. Output a transparent square 1536x1536 atlas with just two products in top left and top right cells, bottom cells empty transparent; each whole cookie fully inside own cell with generous margin. TOP LEFT output: extract the BLUE tree at BOTTOM LEFT of source, centered around x245 y700 in the 1280x960 photo. It has blue branch-shaped icing and tiny gold sprinkles, NO red or pink round baubles. Do NOT extract the upper middle blue tree with red baubles. TOP RIGHT output: extract the BLUE tree with THREE WHITE garland bands and red round baubles at BOTTOM RIGHT-CENTER of source, around x940 y710. It points downward in the source, rotate it upright without altering its icing or contour. Keep actual dough, handmade details and original decoration exactly. Gently brighten and white-balance to neutral soft food photography, retain natural teal-blue and white icing. Remove ALL baking paper, other cookies, crumbs outside contour and shadows. True transparent alpha. No new decoration, no invented pearls, no props, no text or labels, no background.

### Reused extracts

The green garland tree uses the “festive” prompt in [COOKIE_CUTOUTS.md](COOKIE_CUTOUTS.md). The alternate person uses the existing extraction from the central person photograph, described there under the original Christmas cutouts. Original generated atlas filenames: `exec-4240c49f-34ef-490b-b215-fea346183aa6.png` and `exec-a6366abe-99a8-4762-a79b-6bc3c58138b0.png`.

