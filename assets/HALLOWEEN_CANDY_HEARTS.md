# Halloween candy heart correction

Created with the built-in ImageGen tool from the user's two supplied cookie photographs. Both cookies have heart-shaped centres, rather than the circular centre of the superseded cutout. All image area outside the cookie has transparent alpha. Sharp was used only for resizing and WebP conversion.

Project assets:

- `public/images/halloween/candy-heart-purple.webp` — main catalogue image, 600 × 600.
- `public/images/halloween/variants/candy-heart-orange.webp` — alternate decoration in the product gallery, 600 × 600.

Edit targets: supplied purple cookie photograph `6dc67599-f8fc-4ebb-bdd1-e9d8a9562389.png` and orange cookie photograph `73856c8b-5a93-4c04-83b6-b3e60702eb2a.png`.

Prompt used separately for each colour, with `transparent_background: true`:

> Use case: background-extraction. Asset type: transparent photographic cookie cutout for the Giansy bakery product catalogue. The attached image is an EDIT TARGET, the baker's actual Halloween candy cookie. Precisely isolate this entire cookie from the marble background and remove cast shadow. Preserve the exact real cookie and icing geometry: its centre is a HEART, with a deep notch between two lobes on the left and a pointed tip on the right in the original photograph, NOT a circle or oval. Keep the handmade uneven icing, visible baked biscuit edge, white face marks and both black ruffled wrapper ends exactly as photographed. Rotate the WHOLE cookie 90 degrees clockwise to make the black wrapper ends extend left and right and the heart point face down; rotate all decoration together, do not redesign the face. Gently balance photographic light only. One whole cookie centered in a square canvas occupying about 86% of canvas width with comfortable clear margins on all sides. Genuine transparent alpha everywhere outside the cookie. No marble, surface, cast shadow, props, extra cookies, text, border, watermark, drawn outline, circular centre or smoothing of the heart notch.

The final line for each call was: `Icing colour: preserve the purple icing in this edit target.` or `Icing colour: preserve the orange icing in this edit target.`
