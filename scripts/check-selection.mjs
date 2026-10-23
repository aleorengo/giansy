import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { emptyBuilder, restoreBuilder, selectedCount, selectionSpace, isSelectionReady, updateBuilder } from "../src/selection.ts";

const catalog = JSON.parse(readFileSync(new URL("../src/data/catalog.json", import.meta.url)));
const packaging = catalog.packagingOptions;
const allIds = catalog.products.map(p => p.id);
const ids = catalog.products.filter(p => (!p.quantityStep || p.quantityStep === 1) && p.size !== "large").map(p => p.id);
const largeIds = catalog.products.filter(p => p.size === "large").map(p => p.id);
const steps = Object.fromEntries(catalog.products.map(p => [p.id, p.quantityStep ?? 1]));
assert.equal(new Set(allIds).size, allIds.length, "Product IDs must remain unique");
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
  "gingerbread-heart": 1.2, "christmas-gift": 1.2, "christmas-santa": 1.2, "christmas-star": 1.2,
  gingerbread: 1.5, snowflake: 1.5, "christmas-tree": 1.5, "christmas-reindeer": 1.5, "christmas-candle": 1.5, "christmas-mushroom": 1.5,
  "christmas-house": 2.2, "christmas-tree-decorated": 2.2, "christmas-wreath": 2.2,
  "christmas-snowflake-large": 5,
};
assert.deepEqual(Object.fromEntries(catalog.products.filter(p => p.categories.includes("Christmas")).map(p => [p.id, p.price])), christmasPrices);
assert.equal(catalog.products.find(p => p.id === "christmas-star").image, "/images/christmas/snowflake.webp");
assert.equal(catalog.products.find(p => p.id === "snowflake").image, "/images/christmas/snowflake-small.webp");
assert.deepEqual(catalog.products.filter(p => p.categories.includes("Special Occasions")).map(p => p.id), ["occasion-daisy", "occasion-tulip"]);
assert.equal(catalog.products.filter(p => p.categories.includes("Halloween")).length, 8);
const apply = (state, action) => updateBuilder(state, action, packaging, allIds, steps, largeIds);

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
assert.deepEqual(apply(fullBag, { type: "configure", packagingId: "dish" }), fullBag);
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
assert.equal(restoreBuilder({ selection: { [ids[0]]: 21 }, packagingId: "dish" }, packaging, ids).packagingId, "tray");
assert.equal(selectedCount(restoreBuilder({ selection: { [ids[0]]: 99, [ids[1]]: 99, unknown: 2 } }, packaging, ids).selection), 35);
assert.deepEqual(restoreBuilder(null, packaging, ids), emptyBuilder);
assert.deepEqual(Object.fromEntries(packaging.map(p => [p.id, [p.price, p.minimum, p.capacity]])), {
  paper: [0, 1, 25], tray: [0, 6, 35], dish: [3, 6, 20], box: [0.5, 5, 15],
});

const timeless = catalog.products.filter(p => p.categories.includes("Timeless Biscuits"));
assert.equal(timeless.length, 6);
assert.deepEqual(Object.fromEntries(timeless.map(p => [p.id, [p.price, p.quantityStep]])), {
  "candied-orange": [1, 15], "almond-coffee": [1.2, 15], "hazelnut-apricot": [1.2, 15],
  "vin-santo": [1.2, 15], "pumpkin-biscuit": [1.2, 15], "marzipan-date": [1.5, 15],
});
for (const product of timeless) {
  let state = apply(emptyBuilder, {type:"configure", packagingId:"box"});
  for (const expected of [15, 30, 45, 60]) {
    state = apply(state, {type:"change",id:product.id,delta:15});
    assert.equal(state.selection[product.id], expected);
    assert.equal(isSelectionReady(state, packaging, steps), true, "Batch-only order ignores decorated packaging minimum/capacity");
  }
  assert.deepEqual(apply(state, {type:"change",id:product.id,delta:1}),state);
  assert.deepEqual(apply(state, {type:"change",id:product.id,delta:-1}),state);
  assert.deepEqual(restoreBuilder(state,packaging,allIds,steps),state,"Large batches survive reload");
  state=apply(state,{type:"change",id:product.id,delta:-15});
  assert.equal(state.selection[product.id],45);
  state=apply(state,{type:"change",id:product.id,delta:-45});
  assert.equal(state.selection[product.id],undefined);
}
let mixed=apply(fullBag,{type:"change",id:"vin-santo",delta:45});
assert.equal(selectedCount(mixed.selection),70);
assert.equal(isSelectionReady(mixed,packaging,steps),true);
assert.deepEqual(apply(mixed,{type:"configure",packagingId:"dish"}),mixed,"Bulk cannot hide decorated overflow");
assert.equal(apply(mixed,{type:"change",id:"hazelnut-apricot",delta:15}).selection["hazelnut-apricot"],15,"Full bag must not block batches");
mixed=apply(emptyBuilder,{type:"configure",packagingId:"box"});
mixed=apply(mixed,{type:"change",id:"vin-santo",delta:15});
mixed=apply(mixed,{type:"change",id:ids[0],delta:4});
assert.equal(isSelectionReady(mixed,packaging,steps),false,"Batch cannot satisfy decorated minimum");
mixed=apply(mixed,{type:"change",id:ids[0],delta:1});
assert.equal(isSelectionReady(mixed,packaging,steps),true);
assert.equal(isSelectionReady({selection:{"vin-santo":16},packagingId:"paper"},packaging,steps),false);
assert.equal(restoreBuilder({selection:{"candied-orange":2},packagingId:"paper"},packaging,allIds,steps).selection["candied-orange"],15);


const big = "christmas-snowflake-large";
for(const [packagingId,maxLarge,remainder] of [["paper",8,1],["box",10,0],["tray",11,2],["dish",6,2]]) {
  let state=apply(emptyBuilder,{type:"configure",packagingId});
  state=apply(state,{type:"change",id:big,delta:50});
  assert.equal(state.selection[big],maxLarge,packagingId+": large-cookie capacity");
  assert.deepEqual(apply(state,{type:"change",id:big,delta:1}),state);
  state=apply(state,{type:"change",id:ids[0],delta:50});
  assert.equal(state.selection[ids[0]]||0,remainder,packagingId+": small cookies fill remaining space");
  assert.equal(isSelectionReady(state,packaging,steps,largeIds),true);
  assert.deepEqual(restoreBuilder(state,packaging,allIds,steps,largeIds),state);
}
let weighted=apply(emptyBuilder,{type:"change",id:big,delta:8});
assert.equal(selectionSpace(weighted.selection,packaging.find(p=>p.id==='paper'),steps,largeIds),24);
assert.equal(apply(weighted,{type:"configure",packagingId:"box"}).packagingId,"box","Eight large cookies fit a box despite using 24 bag spaces");
weighted=apply(emptyBuilder,{type:"configure",packagingId:"box"});
weighted=apply(weighted,{type:"change",id:big,delta:5});
weighted=apply(weighted,{type:"change",id:ids[0],delta:7});
assert.equal(selectedCount(weighted.selection),12);
assert.equal(selectionSpace(weighted.selection,packaging.find(p=>p.id==='box'),steps,largeIds),14.5);
assert.deepEqual(apply(weighted,{type:"change",id:ids[0],delta:1}),weighted,"Half a box space cannot fit another small cookie");
assert.deepEqual(apply(weighted,{type:"configure",packagingId:"dish"}),weighted,"Recheck large-cookie weight when changing packaging");
assert.equal(apply(weighted,{type:"configure",packagingId:"tray"}).packagingId,"tray");

console.log("Selection rules passed: weighted packaging, 15-piece batches, mixed orders, flexible counts, capacities, submission minimums, rapid adds, reset, migration and catalogue prices.");
