# House and mushroom cutout corrections — 23 October 2026

Edited with the built-in image_gen tool in transparent image-edit mode. No CLI/API fallback. PNG masters are in `assets/christmas/corrections/house-v2.png` and `mushroom-v3.png`; the website uses corresponding `public/images/christmas/house-v2.webp` and `mushroom-v3.webp` exports. Previous web assets remain for reference.

The house base is level, including its white icing. The final mushroom has a longer stem, a green scroll border and gold sprinkles at its bottom, matching the supplied upside-down detail photograph. Existing cap decorations and photographic appearance were retained as closely as possible. These are AI-assisted corrections, not pixel-exact manual masks. The right side of the reference is cropped, so the hidden green decoration is recovered from visible scroll details. The earlier plain-stem v2 remains archived and is superseded by v3.

Sharp only trimmed transparent space, resized/padded to the standard 600 × 600 canvas and exported alpha-preserving PNG/WebP. The image tool handled the visual edits.

## House prompt

Edit target: `public/images/christmas/house.webp`.
Supporting original photograph: `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-ba05f4a0-e51f-4563-8013-2af3e97ba380.png`.

Use case: precise-object-edit.
Asset type: transparent photographic product cutout for the Giansy cookie website.
Image 1 is the EDIT TARGET: existing isolated house cookie. Image 2 is a supporting photograph of the actual same house, for decoration reference only.
Primary request: fix the crooked bottom of the house cutout. Keep the house upright and make its bottom edge and white icing snow-base straight and horizontal, gently rounded handmade corners. Correct the base geometry so it does not curve upward or taper diagonally at the right side. Retain a natural handmade cookie, not a vector or perfectly machined shape.
Preserve the rest of image 1: its roof snow icing, golden dough texture and colour, exact red door and knob, green holly sprigs with tiny coloured pearls, red ribbon, little red heart, roof and chimney silhouette, photographic lighting and scale. Do not add or remove any decoration. Keep the roof apex upright; sides should look balanced, base level. The base white icing should connect naturally into both bottom corners.
Composition: one whole cookie centered, fully visible with generous transparent margin in a square canvas. True transparent alpha, including outside chimney. No surface, shadows, background, text, labels, borders, other cookies or props. Change only the crooked lower geometry; preserve existing identity and realistic details.

## Final mushroom prompt

Edit target: `public/images/christmas/mushroom-v2.webp`.
Supporting upside-down detail: `/Users/alessandra/.t3/userdata/attachments/0ed01944-e34b-4c08-93d1-4fa368ff6cab-120ad4de-3654-4c64-96e4-f25c8ff7edd2.png`.

Use case: precise-object-edit.
Asset type: transparent photographic cutout of Giansy's actual handmade mushroom cookie.
Input image 1 EDIT TARGET: existing upright mushroom cutout with red icing cap and five white dots.
Input image 2 SUPPORTING DETAIL REFERENCE: cropped photograph of the actual mushroom held UPSIDE DOWN. Mentally rotate reference 180 degrees: its red cap should be at the TOP; its long golden biscuit stem extends DOWN with GREEN ICING at the BOTTOM. The green scroll icing is on this mushroom stem, not a neighboring cookie.
Primary request: correct the stem of image1 to match the real reference. Make the stem considerably longer and slightly slender, approximately stem visible height 75% of the full cap width (around 1.5 times the cap height); rounded gently tapered/bulbous bottom matching the reference, not a stubby short stump. At its LOWER END reproduce the source green decoration: a green icing border follows the rounded bottom and rises a little along both sides, with two curving scroll tendrils coming inward and ending in rounded drops, dotted with the small GOLD square sugar sprinkles exactly like the reference. In the upright result the green scrolls are at the bottom of the stem, well below the cap.
Preserve image1's existing red cap, its real red icing texture, outline and five white icing dots in exactly the same positions. Keep natural golden biscuit dough, real photographic lighting, texture, handmade imperfections. The green icing should match the vivid teal-green of reference2, not leaves or grass. Do not add new leaves, flowers, berries, faces, extra dots, bow or other objects.
Whole single cookie upright, centered, fully visible with clear transparent margin in a square canvas; use true transparent alpha. No backdrop, shadows, surface, plate, text, borders, neighbors, cropping or screenshot controls. The supporting photo is cropped; recover the complete stem in the existing photographic style, respecting the visible green scroll details and proportions.

## Earlier mushroom prompt (superseded)

Edit target: `public/images/christmas/mushroom.webp`.

Use case: precise-object-edit.
Asset type: transparent photographic product cutout for Giansy's handmade cookie catalogue.
The supplied isolated mushroom cookie is the EDIT TARGET.
Primary request: lengthen the bare golden biscuit stem by about 45 percent compared with its current height, giving the mushroom a visibly longer, gently tapered natural stem with a softly rounded bottom. Keep its existing width approximately the same. Keep the red cap exactly the same shape, handmade red icing texture, red colour, five white icing dots with their current positions and sizes, and the seam where stem meets cap. Do not add any stem icing or decoration. Preserve realistic baked biscuit crumb texture, lighting, colour and handmade appearance. Extend only the stem downward naturally; do not stretch the cap or redraw its dots.
Composition: the entire upright mushroom centered on a square transparent canvas, generous clear margin all around, true transparent alpha. No background, no shadow, no surface, no other cookies, no text or outline. Clean natural alpha edges with no coloured fringe or stray isolated pixels.
