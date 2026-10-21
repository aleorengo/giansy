import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { emptyBuilder, restoreBuilder, selectedCount, isSelectionReady, updateBuilder } from "../src/selection.ts";

const catalog = JSON.parse(readFileSync(new URL("../src/data/catalog.json", import.meta.url)));
const packaging = catalog.packagingOptions;
const ids = catalog.products.map(p => p.id);
assert.equal(new Set(ids).size, ids.length, "Product IDs must remain unique");
for (const product of catalog.products) {
  assert.ok(existsSync(new URL(`../public${product.image}`, import.meta.url)), `Missing image: ${product.id}`);
  assert.ok(Number.isFinite(product.price) && product.price > 0, `Invalid price: ${product.id}`);
  const images = new Set([product.image]);
  for (const version of product.gallery ?? []) {
    assert.ok(version.label?.trim(), `Missing decoration name: ${product.id}`);
    assert.ok(!images.has(version.image), `Duplicate gallery image: ${product.id}`);
    assert.ok(existsSync(new URL(`../public${version.image}`, import.meta.url)), `Missing gallery image: ${version.image}`);
    images.add(version.image);
  }
}
const christmasPrices = {
  "gingerbread-heart": 1.5, "christmas-gift": 1.5, "christmas-santa": 1.5, "christmas-star": 1.5,
  gingerbread: 2, snowflake: 2, "christmas-tree": 2, "christmas-reindeer": 2, "christmas-candle": 2, "christmas-mushroom": 2,
  "christmas-house": 2.5, "christmas-tree-decorated": 2.5, "christmas-wreath": 2.5,
  "christmas-snowflake-large": 5, "candied-orange": 1, "almond-coffee": 1.2,
};
assert.deepEqual(Object.fromEntries(catalog.products.filter(p => p.categories.includes("Christmas")).map(p => [p.id, p.price])), christmasPrices);
assert.equal(catalog.products.find(p => p.id === "christmas-star").image, "/images/christmas/snowflake.webp");
assert.equal(catalog.products.find(p => p.id === "snowflake").image, "/images/christmas/snowflake-small.webp");
assert.deepEqual(catalog.products.filter(p => p.categories.includes("Special Occasions")).map(p => p.id), ["occasion-daisy", "occasion-tulip"]);
assert.equal(catalog.products.filter(p => p.categories.includes("Halloween")).length, 8);
const apply = (state, action) => updateBuilder(state, action, packaging, ids);

assert.equal(selectedCount(apply(emptyBuilder, { type: "change", id: ids[0], delta: 1 }).selection), 1);
assert.equal(isSelectionReady(emptyBuilder, packaging), false);
for (const option of packaging) {
  let state = apply(emptyBuilder, { type: "configure", packagingId: option.id });
  assert.equal(isSelectionReady(state, packaging), false);
  for (let i = 0; i < option.capacity + 12; i++) {
    state = apply(state, { type: "change", id: ids[i % ids.length], delta: 1 });
    const count = selectedCount(state.selection);
    assert.equal(count, Math.min(i + 1, option.capacity), option.id + ": only capacity limits additions");
    assert.equal(isSelectionReady(state, packaging), count >= option.minimum);
  }
  const first = Object.keys(state.selection)[0];
  state = apply(state, { type: "change", id: first, delta: -1 });
  assert.equal(selectedCount(state.selection), option.capacity - 1);
  state = apply(state, { type: "change", id: ids[1], delta: 50 });
  assert.equal(selectedCount(state.selection), option.capacity);
  assert.deepEqual(restoreBuilder(state, packaging, ids), state);
  assert.deepEqual(apply(state, { type: "configure", packagingId: "unknown" }), state);
  assert.deepEqual(apply(state, { type: "change", id: ids[0], delta: 1.5 }), state);
  assert.deepEqual(apply(state, { type: "change", id: "unknown", delta: 1 }), state);
}
let fullBag = apply(emptyBuilder, { type: "change", id: ids[0], delta: 25 });
assert.deepEqual(apply(fullBag, { type: "configure", packagingId: "tray" }), fullBag);
assert.deepEqual(apply(fullBag, { type: "configure", packagingId: "box" }), fullBag);
assert.deepEqual(apply(fullBag, { type: "reset" }), emptyBuilder);
// An old six-piece target must never restrict a customer's new choices.
let flexible = restoreBuilder({ selection: { [ids[0]]: 6 }, packagingId: "box", cookieCount: 6 }, packaging, ids);
flexible = apply(flexible, { type: "change", id: ids[1], delta: 4 });
assert.equal(selectedCount(flexible.selection), 10);
assert.equal(isSelectionReady(flexible, packaging), true);
let belowMinimum = apply(emptyBuilder, { type: "configure", packagingId: "box" });
belowMinimum = apply(belowMinimum, { type: "change", id: ids[0], delta: 4 });
assert.equal(isSelectionReady(belowMinimum, packaging), false);
belowMinimum = apply(belowMinimum, { type: "change", id: ids[0], delta: 1 });
assert.equal(isSelectionReady(belowMinimum, packaging), true);
belowMinimum = apply(belowMinimum, { type: "configure", packagingId: "tray" });
assert.equal(isSelectionReady(belowMinimum, packaging), false);
assert.equal(restoreBuilder({ selection: { [ids[0]]: 20 }, packagingId: "dish" }, packaging, ids).packagingId, "paper");
assert.equal(selectedCount(restoreBuilder({ selection: { [ids[0]]: 99, [ids[1]]: 99, unknown: 2 } }, packaging, ids).selection), 25);
assert.deepEqual(restoreBuilder(null, packaging, ids), emptyBuilder);
assert.deepEqual(Object.fromEntries(packaging.map(p => [p.id, [p.price, p.minimum, p.capacity]])), {
  paper: [0, 1, 25], tray: [0, 6, 15], dish: [3, 6, 15], box: [0.5, 5, 20],
});
console.log("Selection rules passed: flexible counts, capacities, submission minimums, rapid adds, reset, migration and catalogue prices.");
