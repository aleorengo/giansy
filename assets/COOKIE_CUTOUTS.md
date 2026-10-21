# Maker cookie cutouts and packaging refinements

All image edits used the built-in image_gen tool, not the CLI/API fallback. The inputs are the user's photographs of Giansy's actual products. Cutouts preserve the photographed designs, with gentle exposure and white-balance adjustments. AI-assisted extraction can reconstruct fine edges and textures; these are not pixel-exact manual masks. Overlapped edges of the almond biscuit and clipped edges of the mushroom, gift and ghost required small reconstructions. Real product photographs should replace any unsatisfactory details later.

Final web assets preserve alpha, are optimized as 600 × 600 WebP images, and are displayed without baked-in backgrounds. Sharp was used only to separate atlas cells and normalize crop, size and compression. Photographic editing and background removal used image_gen.

## Current assets

- `public/images/christmas/`: 16 displayed products. `snowflake.webp` is the BLUE STAR (1.50 EUR), as corrected by the user; `snowflake-small.webp` is the red/green/white snowflake (2 EUR). `snowflake-large.webp` is the large white design (5 EUR). The large snowflake appears first, followed by the simple Type 1 tree. Earlier five-point `star.webp` is retained but not displayed.
- `public/images/halloween/`: skull, cat, candy, pumpkin, mummy, skeleton, scream and ghost. Provisional prices: skull/mummy/scream 2.50 EUR, the others 2 EUR.
- `public/images/occasions/`: daisy (2 EUR) and tulip (2.50 EUR), provisional prices. Other sample occasion products have been archived and removed from the active catalogue.
- `public/images/packaging-bag-light.png` and `public/images/packaging-box-light.png`: lighter versions with minimal hatching, transparent faces and unchanged construction. Display canvas 600 × 400. Plate drawing stays `public/images/packaging-plate-delicate.png`.
- The full original silver tray remains `public/images/silver-plate.webp`; its empty-state burgundy overlay was removed in CSS.

All Christmas prices come from the supplied list. Halloween and flower prices were chosen provisionally with user authorization and are labelled accordingly. Ingredients and allergen information still need maker confirmation; no recipe was inferred from the images.

## Final extraction prompts

### characters

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-04f33b5f-0f1b-4776-9e17-74f2abebfe31.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-4d0302ed-ddd5-4af5-a7ef-a3585fdbdba4.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-685e5cb9-16e4-44f4-9907-ac0a740fa728.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-5f6665f7-cd1a-413d-8851-9d9675a9822d.png`

> Use case: background-extraction. Asset type: transparent PNG photo cutouts of ACTUAL homemade cookies for the maker's Italian patisserie website. All input photographs are EDIT TARGETS, not design inspiration. Precisely isolate the specified actual cookies, preserving original outline, handmade icing shapes, colors, speckles and imperfections. Do not redesign, idealize, smooth icing or replace with generic cookies. Remove every background and neighboring product, including spaces around thin branches. Gently correct exposure and white balance for warm softly lit natural food photography: golden baked dough, clean white icing, preserve teal/green and muted red colors without oversaturation. Do not add decoration, text, shadows, plates, hands, props or outlines. True transparent alpha around each whole object. Square 1536x1536 atlas with EXACTLY FOUR equal cells in a strict 2 columns by 2 rows layout. Each single whole product centered in its own cell, equal generous empty margins of at least 12% cell width, no objects crossing cell boundaries, no overlaps. Each cookie upright with natural perspective unchanged. Preserve photographic detail and natural baked texture. TOP LEFT: central red scroll-decorated HEART from image1. TOP RIGHT: central Santa Claus face with white beard and red hat from image2. BOTTOM LEFT: central full reindeer profile with white antlers, teal ankles, red nose from image3. BOTTOM RIGHT: central smiling gingerbread man with green buttons and teal/white cuffs from image4.

### shapes

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-4fa1b962-8a0b-4949-8a4c-6e501aeb199b.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-05794351-af1c-49bd-a817-d8849b200afa.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-f8524f5c-9665-41bb-9346-f42c6106f5d2.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-4d0302ed-ddd5-4af5-a7ef-a3585fdbdba4.png`

> Use case: background-extraction. Asset type: transparent PNG photo cutouts of ACTUAL homemade cookies for the maker's Italian patisserie website. All input photographs are EDIT TARGETS, not design inspiration. Precisely isolate the specified actual cookies, preserving original outline, handmade icing shapes, colors, speckles and imperfections. Do not redesign, idealize, smooth icing or replace with generic cookies. Remove every background and neighboring product, including spaces around thin branches. Gently correct exposure and white balance for warm softly lit natural food photography: golden baked dough, clean white icing, preserve teal/green and muted red colors without oversaturation. Do not add decoration, text, shadows, plates, hands, props or outlines. True transparent alpha around each whole object. Square 1536x1536 atlas with EXACTLY FOUR equal cells in a strict 2 columns by 2 rows layout. Each single whole product centered in its own cell, equal generous empty margins of at least 12% cell width, no objects crossing cell boundaries, no overlaps. Each cookie upright with natural perspective unchanged. Preserve photographic detail and natural baked texture. TOP LEFT: complete central CANDLE cookie with white dripping wax, golden flame and green/red holly from image1. TOP RIGHT: central teal-iced six-point snowflake cookie from image2. BOTTOM LEFT: the red mushroom cookie with white spots from the right side of image3; use image4 bottom-center mushroom cap as supporting view of the same design, retain its natural short golden stem, reconstruct only the small occluded edge if needed. BOTTOM RIGHT: central HOUSE cookie with white snow roof, red door and green holly from image3, rotate upright without changing its icing. Exclude all surrounding cookies.

### festive

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-91575540-ab58-40bd-aac3-580198416ecd.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-1eecc1b0-43f7-42ee-889c-5853dc6b4d05.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-b2aa18fc-f9d5-4713-b549-f6a015b11918.png`

> Use case: background-extraction. Asset type: transparent PNG photo cutouts of ACTUAL homemade cookies for the maker's Italian patisserie website. All input photographs are EDIT TARGETS, not design inspiration. Precisely isolate the specified actual cookies, preserving original outline, handmade icing shapes, colors, speckles and imperfections. Do not redesign, idealize, smooth icing or replace with generic cookies. Remove every background and neighboring product, including spaces around thin branches. Gently correct exposure and white balance for warm softly lit natural food photography: golden baked dough, clean white icing, preserve teal/green and muted red colors without oversaturation. Do not add decoration, text, shadows, plates, hands, props or outlines. True transparent alpha around each whole object. Square 1536x1536 atlas with EXACTLY FOUR equal cells in a strict 2 columns by 2 rows layout. Each single whole product centered in its own cell, equal generous empty margins of at least 12% cell width, no objects crossing cell boundaries, no overlaps. Each cookie upright with natural perspective unchanged. Preserve photographic detail and natural baked texture. TOP LEFT: the fully visible simple GREEN squiggle-iced Christmas tree at bottom center-right of image1, no white garlands. TOP RIGHT: the fully visible GREEN tree with WHITE garlands and RED round ornaments at bottom center-left of image1 (just right of blue tree). BOTTOM LEFT: complete central green wreath with muted red bow at top from image2; transparent hole in its center. BOTTOM RIGHT: complete LARGE white-iced six-branch snowflake with little silver pearls from image3. Keep delicate protruding icing intact.

### specials

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-04f33b5f-0f1b-4776-9e17-74f2abebfe31.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-3fd43fd8-4987-4e5c-a611-6590160c54c7.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-ac68d573-11bd-433a-9cf0-62097f3ba48e.png`

> Use case: background-extraction. Asset type: transparent PNG photo cutouts of ACTUAL homemade cookies for the maker's Italian patisserie website. All input photographs are EDIT TARGETS, not design inspiration. Precisely isolate the specified actual cookies, preserving original outline, handmade icing shapes, colors, speckles and imperfections. Do not redesign, idealize, smooth icing or replace with generic cookies. Remove every background and neighboring product, including spaces around thin branches. Gently correct exposure and white balance for warm softly lit natural food photography: golden baked dough, clean white icing, preserve teal/green and muted red colors without oversaturation. Do not add decoration, text, shadows, plates, hands, props or outlines. True transparent alpha around each whole object. Square 1536x1536 atlas with EXACTLY FOUR equal cells in a strict 2 columns by 2 rows layout. Each single whole product centered in its own cell, equal generous empty margins of at least 12% cell width, no objects crossing cell boundaries, no overlaps. Each cookie upright with natural perspective unchanged. Preserve photographic detail and natural baked texture. TOP LEFT: the WHITE swirl-iced six-point STAR cookie at top center of image1; preserve its distinctive six tips and white flowing icing, complete only the tiny top edge clipped by photo. TOP RIGHT: the fully visible chocolate-dipped candied orange slice at center-left of image2, with its actual chopped-nut garnish; exclude stray loose crumbs outside the slice. BOTTOM LEFT: ONE almond shortbread with pale coffee glaze, almond sliver and single silver pearl from front-center of image3. This is a single scalloped round biscuit, not a sandwich; carefully isolate the most exposed front-center example, minimally restore the hidden lower scalloped rim from adjacent examples of the same biscuit. Preserve the actual glaze swirl, almond and pearl, no invented decoration. BOTTOM RIGHT CELL MUST BE COMPLETELY EMPTY TRANSPARENT (only three products in this sheet).

### updates

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-57753b61-ecf8-4f1a-bc76-66ab5e76c6bc.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-b8d260ee-0888-4d45-9352-221abcba4607.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-566ffd58-6a22-48f1-b085-948e45676649.png`

> Use case: background-extraction. Asset type: transparent PNG cutouts of actual handmade Christmas cookies. All three images are EDIT TARGETS not inspiration. Precisely isolate FOUR actual cookies into a strict 2x2 equal-cell square 1536x1536 atlas, each fully within its cell with at least 12% transparent margins. TOP LEFT: the small rectangular gift cookie with white red and green marbled icing and white ribbon bow from top right of image1; complete only its tiny photo-clipped right edge. TOP RIGHT: the five-point star cookie with green branch icing and red berries at top of image1, complete only its slightly photo-clipped upper point. BOTTOM LEFT: the whole green Christmas tree with white garlands, pink/red ornaments and silver pearls from image2. BOTTOM RIGHT: the complete lower gingerbread man with black eyes, red cheeks, green buttons and white zigzag cuffs from image3. Remove the partial gingerbread feet at top of image3 entirely. Keep actual cookie shapes, crumbs, real dough and EXACT original handmade icing decorations. Do not invent a different product or add details. Gently brighten natural lighting and correct white balance only, preserve real colors and photographic texture. No background, marble, black backdrop, other cookies, props, shadows, text or labels. True transparent alpha including spaces around limbs, bow and branches. One single cookie per cell, no overlap.

### halloween-a

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-d426eb0f-3954-48c2-87f6-7df34168021f.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-12f5c546-b90a-4099-9f7d-cb052b16c4d6.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-206f0d10-e97a-45fd-a5e0-ce49f025e8ab.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-04fce47b-9441-482d-a2a8-90d8d87a6a93.png`

> Use case: background-extraction. Asset type: transparent PNG cutouts of the user's ACTUAL handmade decorated biscuits. Input photographs are EDIT TARGETS, not inspiration. Isolate the specified actual cookie outlines precisely, preserving original icing details, colors, real dough texture and handmade imperfections. Gently improve dim lighting and white balance with soft natural illumination, no redesign or new decoration. Remove all marble, baking paper, box, props, neighboring cookies and cast shadows. True transparent alpha around each whole cookie. Square 1536x1536 atlas, strict 2 columns by 2 rows of equal cells, each object centered with minimum 12% clear margins within its own cell, no overlap or crossing boundaries. One cookie per requested cell, no text, no captions, no borders. TOP LEFT: the whole central round white-faced grinning skull cookie from image1 (black eyes, nose, stitched smile). TOP RIGHT: the single black cat with purple collar and silver/gold pearls from image2. BOTTOM LEFT: the single wrapped sweet cookie with black ends and purple smiling center from image3, turn upright horizontally while preserving decorations. BOTTOM RIGHT: the whole orange pumpkin cookie with black face and green vine from image4.

### halloween-b

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-6a8b5787-bffd-436e-bf14-5a0b1f9c82a5.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-0defa50e-9927-4375-8ede-eb031b71cb28.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-b73ab097-c2bf-4fa1-a794-f46e59015e33.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-2536f0bb-523a-4300-a314-f94d48597664.png`

> Use case: background-extraction. Asset type: transparent PNG cutouts of the user's ACTUAL handmade decorated biscuits. Input photographs are EDIT TARGETS, not inspiration. Isolate the specified actual cookie outlines precisely, preserving original icing details, colors, real dough texture and handmade imperfections. Gently improve dim lighting and white balance with soft natural illumination, no redesign or new decoration. Remove all marble, baking paper, box, props, neighboring cookies and cast shadows. True transparent alpha around each whole cookie. Square 1536x1536 atlas, strict 2 columns by 2 rows of equal cells, each object centered with minimum 12% clear margins within its own cell, no overlap or crossing boundaries. One cookie per requested cell, no text, no captions, no borders. TOP LEFT: single round purple mummy with white drizzled bandages and silver/gold pearls from image1. TOP RIGHT: single little skeleton man from image2, turn upright head at top. BOTTOM LEFT: single black round cookie with elongated white screaming eyes/mouth and two silver/gold pearls from image3, turn upright. BOTTOM RIGHT: the white little ghost with black eyes and mouth at right-center edge of image4, minimally restore its tiny photo-clipped right hand only; remove all surrounding cookies.

### flowers

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-55387665-47f9-4d26-9d2a-5cb12416eb9e.png`
- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-3e775cdd-f9ae-43b7-93b2-bf5f69f9d30a.png`

> Use case: background-extraction. Asset type: transparent PNG cutouts of the user's ACTUAL handmade decorated biscuits. Input photographs are EDIT TARGETS, not inspiration. Isolate the specified actual cookie outlines precisely, preserving original icing details, colors, real dough texture and handmade imperfections. Gently improve dim lighting and white balance with soft natural illumination, no redesign or new decoration. Remove all marble, baking paper, box, props, neighboring cookies and cast shadows. True transparent alpha around each whole cookie. Square 1536x1536 atlas, strict 2 columns by 2 rows of equal cells, each object centered with minimum 12% clear margins within its own cell, no overlap or crossing boundaries. One cookie per requested cell, no text, no captions, no borders. TOP LEFT: ONE daisy-shaped cookie with alternating white and pink icing petals and yellow round center from left upper-center of image1; preserve actual star-pointed baked outline. TOP RIGHT: ONE whole pink tulip with marbled pink/white flower, tiny white calyx and stem/leaves outlined in white icing, take the most fully exposed example at center of image1, use image2 as supporting view of same products. Entire tulip flower AND stem/leaves are one actual cookie silhouette. Only restore small overlapped edge from neighboring examples of identical design. BOTTOM LEFT and BOTTOM RIGHT cells must be entirely EMPTY TRANSPARENT. Exactly TWO actual product cutouts, not a bouquet.

### small-snowflake-correction

- Source: `0ed01944-e34b-4c08-93d1-4fa368ff6cab-5eda0964-f7c8-490f-8bef-9d6fecbba12f.png`

> Use case: background-extraction. EDIT TARGET: the attached photograph. Carefully isolate ONLY the complete central six-point cookie with white icing, red-and-green feathered branch patterns and green round centre. Preserve the ACTUAL baked outline, original handmade icing shapes, color placement, surface texture and imperfections exactly. Remove all marble, other biscuits and cast shadows. Gentle exposure lift and neutral white balance, white icing remains natural, no oversaturated red/green. Whole cookie, single product, centered upright with generous transparent margins. Transparent PNG with real alpha all around narrow tips. No new decoration, no redesign, no added silver pearls, no text or props. This is the smaller snowflake biscuit, not the large white pearl-decorated design.

## Lighter packaging prompts

### bag

> Use case: precise-object-edit. Edit only the supplied illustration. Keep exact object construction, perspective, contour shape, scale and warm ivory ink color. Reduce the engraved shading by about 80%. Preserve delicate outline drawing plus just a few isolated very fine short hatch marks at creases and narrow edges. Remove dense hatching, clusters of shading, filled patches and white ribbon fill. All front faces, side faces and ribbon interiors should be almost entirely transparent. Only fine ink lines remain, with minimal airy light shading at folds. No glow, no halo, no shadow, no white surface filling, no background. True transparent PNG, entire object centered with generous margin. Do not change design or add anything. Retain the little folded paper bag, loose bow and tiny outline heart.

### box

> Use case: precise-object-edit. Edit only the supplied illustration. Keep exact object construction, perspective, contour shape, scale and warm ivory ink color. Reduce the engraved shading by about 80%. Preserve delicate outline drawing plus just a few isolated very fine short hatch marks at creases and narrow edges. Remove dense hatching, clusters of shading, filled patches and white ribbon fill. All front faces, side faces and ribbon interiors should be almost entirely transparent. Only fine ink lines remain, with minimal airy light shading at folds. No glow, no halo, no shadow, no white surface filling, no background. True transparent PNG, entire object centered with generous margin. Do not change design or add anything. Retain the compact upright tallish windowed cardboard box, ribbon bow and clear front window.
