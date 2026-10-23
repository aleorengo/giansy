# Biscotti senza tempo

Four new AI-assisted photographic cutouts, edited with the built-in image_gen tool (no fallback CLI). PNG masters: `assets/timeless/hazelnut-apricot.png`, `vin-santo.png`, `pumpkin-biscuit.png`, `marzipan-date.png`. Website exports use the same names under `public/images/timeless/` as alpha WebP. All exports are 600 × 600 pixels, object contained within 560 × 560 with transparent padding. Sharp only handles transparent trim, resize, padding and compression.

Sources are the maker's supplied photographs. Preserve actual handmade silhouettes and decorations; AI extraction can recover tiny occluded edges and texture, so these are illustrative cutouts rather than pixel-exact manual masks. The date's bottom edge was partially hidden by the glass jar and reconstructed using the supporting images. No recipe or undeclared allergen claim was inferred.

## Ordering rules

Six products, each ordered in multiples of 15 per flavour, independently of decorated-cookie package capacity. 1.20 EUR each (18 EUR per 15) for almond/coffee, hazelnut/apricot/chocolate, Vin Santo/raisin/pine nut and pumpkin. Orange: 1 EUR (15 EUR per 15); date: 1.50 EUR (22.50 EUR per 15). Bulk packaging is to agree, not priced as free. Bag/box/tray limits and costs apply only to individually selected decorated products. Bag: 25 spaces; cardboard tray: 35 spaces (minimum 6 actual pieces); small brass tray: 20 spaces (minimum 6 retained); box: 15 spaces (minimum 5 actual pieces). Large snowflakes use 3 spaces in bags/trays and 1.5 in boxes, giving 10 large per box. Mixed box capacity is proportional. A mixed request must still meet the decorated package minimum. Bulk-only requests can exceed 25 and do not incur the selected decorated package fee. Saved bulk amounts survive reload; old orange/almond quantities migrate up to the next multiple of 15.

Cards use a fixed label height within each category, with price and quantity controls anchored to the bottom. The date copy is shortened to “Datteri farciti di marzapane, ricoperti di cioccolato e pistacchi.”

Updated Christmas prices: small 1.20 EUR, medium 1.50 EUR, richly decorated 2.20 EUR, large snowflake 5 EUR. Type 1 trees retain the green cover, blue curls, blue branches with gold; blue branches with red ornaments removed. The white-garland green and blue trees move to Type 2, whose cover is the green one.

## Final image prompts

### hazelnut-apricot

- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-18924ed6-0deb-4d98-9ab6-6e592b01a78f.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-a6460733-2a42-46eb-ac43-5d39edcefe3d.png`

Use case: background-extraction. Asset type: transparent photographic cutout for Giansy's actual handmade cookie catalogue. Input photographs are EDIT TARGETS of real products, not inspiration. Isolate exactly ONE specified product, retaining real outline, handmade texture, toppings and imperfect details. Remove every background, surface, container, neighboring cookie and cast shadow. Gently correct dim/warm lighting to soft natural food photography, golden dough and true chocolate/icing colors. One complete object centered on a square transparent canvas with clear margin; true transparent alpha, no props, text, labels or borders. Reconstruct only small occluded edges if unavoidable from other photos of the same design. Do not invent a different product. Isolate the round hazelnut SANDWICH cookie in the central foreground of image1, with two golden biscuit layers, visible apricot jam between them, dark chocolate topping, tiny gold sprinkles and two little silver pearls. Preserve its whole paired-biscuit structure, angle and original topping. No extra chocolate candy or changed decorations.

### vin-santo

- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-d0fd5ab7-cb90-41ee-b969-372206e2befe.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-1096fd9f-fb4c-4e1c-8e42-9ae74bdac2e2.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-d2f321f9-4d23-40de-8158-46d86fdc8c5c.png`

Use case: background-extraction. Asset type: transparent photographic cutout for Giansy's actual handmade cookie catalogue. Input photographs are EDIT TARGETS of real products, not inspiration. Isolate exactly ONE specified product, retaining real outline, handmade texture, toppings and imperfect details. Remove every background, surface, container, neighboring cookie and cast shadow. Gently correct dim/warm lighting to soft natural food photography, golden dough and true chocolate/icing colors. One complete object centered on a square transparent canvas with clear margin; true transparent alpha, no props, text, labels or borders. Reconstruct only small occluded edges if unavoidable from other photos of the same design. Do not invent a different product. Isolate just the complete central rustic rounded biscuit in image1, with visible dark raisins and toasted pale pine nuts. Preserve its softly domed irregular shape, slightly cracked crumb texture and original raisin/pine-nut positions. Do not add icing, chocolate or sprinkles. Supporting images show other cookies of the same recipe.

### pumpkin

- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-c2bbe562-4b2a-4d09-8a9c-5e4777de0ca1.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-810cab1a-1ab7-412d-8a63-6a8de0d87a8d.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-23fc638d-8d87-4218-8c3e-2ed5153214b3.png`

Use case: background-extraction. Asset type: transparent photographic cutout for Giansy's actual handmade cookie catalogue. Input photographs are EDIT TARGETS of real products, not inspiration. Isolate exactly ONE specified product, retaining real outline, handmade texture, toppings and imperfect details. Remove every background, surface, container, neighboring cookie and cast shadow. Gently correct dim/warm lighting to soft natural food photography, golden dough and true chocolate/icing colors. One complete object centered on a square transparent canvas with clear margin; true transparent alpha, no props, text, labels or borders. Reconstruct only small occluded edges if unavoidable from other photos of the same design. Do not invent a different product. Isolate the complete central golden pumpkin biscuit in image1, covered with white icing and tiny red/yellow/ivory sugar sprinkles. Keep its baked orange-golden sides, white icing irregular edges and real sprinkles, photographic oblique view. Exactly ONE cookie, no other variants in output.

### marzipan-date

- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-2553223f-629b-44a4-b1f3-c250cff30948.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-ca03e075-0042-4e44-a565-f3c47001f3a5.png`
- `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-a542a3ac-6bf5-4e0c-831e-97271e688019.png`

Use case: background-extraction. Asset type: transparent photographic cutout for Giansy's actual handmade cookie catalogue. Input photographs are EDIT TARGETS of real products, not inspiration. Isolate exactly ONE specified product, retaining real outline, handmade texture, toppings and imperfect details. Remove every background, surface, container, neighboring cookie and cast shadow. Gently correct dim/warm lighting to soft natural food photography, golden dough and true chocolate/icing colors. One complete object centered on a square transparent canvas with clear margin; true transparent alpha, no props, text, labels or borders. Reconstruct only small occluded edges if unavoidable from other photos of the same design. Do not invent a different product. Isolate ONE of the elongated oval chocolate-covered dates filled with marzipan, from the lower foreground of image1 (the jar photo). Preserve its dark chocolate irregular coating and scattered chopped green/pale pistachio garnish as photographed. Image3 is supporting detail of the same treat texture only. Remove glass jar completely, recover the tiny hidden lower edge conservatively. Keep it a closed chocolate-covered date, not a sliced/cut-open candy or a round truffle. No invented exposed filling.

