import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { emptyBuilder, restoreBuilder, selectedCount, updateBuilder } from "../src/selection.ts";

const catalog = JSON.parse(readFileSync(new URL("../src/data/catalog.json", import.meta.url)));
const packaging = catalog.packagingOptions;
const ids = catalog.products.map(p => p.id);
assert.equal(new Set(ids).size, ids.length, "Product IDs must remain unique");
for (const product of catalog.products) {
  assert.ok(existsSync(new URL(`../public${product.image}`, import.meta.url)), `Missing image: ${product.id}`);
  assert.ok(Number.isFinite(product.price) && product.price > 0, `Invalid price: ${product.id}`);
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

assert.equal(selectedCount(apply(emptyBuilder, { type: "change", id: ids[0], delta: 1 }).selection), 0);
for (const option of packaging) {
  for (const desired of [option.minimum, Math.min(option.minimum + 2, option.capacity), option.capacity]) {
    let state = apply(emptyBuilder, { type: "configure", packagingId: option.id, cookieCount: desired });
    // Rapid adds across multiple product types must count individual pieces.
    for (let i = 0; i < desired + 12; i++) state = apply(state, { type: "change", id: ids[i % ids.length], delta: 1 });
    assert.equal(selectedCount(state.selection), desired, `${option.id}: cannot exceed ${desired}`);
    const first = Object.keys(state.selection)[0];
    state = apply(state, { type: "change", id: first, delta: -1 });
    assert.equal(selectedCount(state.selection), desired - 1);
    state = apply(state, { type: "change", id: ids[1], delta: 50 });
    assert.equal(selectedCount(state.selection), desired);
    assert.deepEqual(apply(state, { type: "configure", packagingId: option.id, cookieCount: desired - 1 }), state);
    assert.deepEqual(restoreBuilder(state, packaging, ids), state);
  }
  for (const invalid of [0, -1, option.minimum - 1, 1.5, option.capacity + 1, NaN, Infinity]) {
    assert.deepEqual(apply(emptyBuilder, { type: "configure", packagingId: option.id, cookieCount: invalid }), emptyBuilder);
  }
}
let fullBag = apply(emptyBuilder, { type: "configure", packagingId: "paper", cookieCount: 25 });
fullBag = apply(fullBag, { type: "change", id: ids[0], delta: 25 });
assert.deepEqual(apply(fullBag, { type: "configure", packagingId: "tray", cookieCount: 15 }), fullBag);
assert.deepEqual(apply(fullBag, { type: "configure", packagingId: "box", cookieCount: 20 }), fullBag);
assert.deepEqual(apply(fullBag, { type: "reset" }), emptyBuilder);
assert.equal(restoreBuilder({ selection: { [ids[0]]: 13 }, packagingId: "paper" }, packaging, ids).cookieCount, 13);
assert.equal(restoreBuilder({ selection: { [ids[0]]: 20 }, packagingId: "dish" }, packaging, ids).packagingId, "paper");
assert.equal(selectedCount(restoreBuilder({ selection: { [ids[0]]: 99, [ids[1]]: 99, unknown: 2 } }, packaging, ids).selection), 25);
assert.deepEqual(restoreBuilder(null, packaging, ids), emptyBuilder);
assert.equal(restoreBuilder({selection:{[ids[0]]:2},packagingId:"box",cookieCount:2},packaging,ids).cookieCount,5);
assert.equal(restoreBuilder({selection:{[ids[0]]:3},packagingId:"tray",cookieCount:3},packaging,ids).cookieCount,6);
assert.deepEqual(Object.fromEntries(packaging.map(p => [p.id, [p.price, p.minimum, p.capacity]])), {
  paper: [0, 1, 25], tray: [0, 6, 15], dish: [3, 6, 15], box: [0.5, 5, 20],
});
console.log("Selection rules passed: capacities, quantities, rapid adds, removal, reset, migration and packaging prices.");
