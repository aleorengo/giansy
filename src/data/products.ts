import catalog from "./catalog.json";
import type { CartItem } from "../cart";
import { selectionSpace } from "../selection";
import { getLanguage } from "../i18n";
export const categories = [
  "Christmas",
  "Halloween",
  "Special Occasions",
  "Timeless Biscuits",
  "Gift Bundles",
  "Jams & Preserves",
];
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  fixedPrice?: boolean;
  provisionalPrice?: boolean;
  image: string;
  gallery?: { image: string; label: string }[];
  quantityStep?: number;
  bundleSize?: number;
  size?: string;
  categories: string[];
  label?: string;
  allergens: string;
};
export const products: Product[] = catalog.products;
export const largeProductIds = products.filter(p => p.size === "large").map(p => p.id);
export const quantitySteps = Object.fromEntries(products.map(p => [p.id, p.quantityStep ?? 1]));
export const packagingOptions = catalog.packagingOptions;
export type Selection = Record<string, number>;
export const money = (price: number) =>
  new Intl.NumberFormat(getLanguage() === "it" ? "it-IT" : "en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
export function calculateEstimate(selection: Selection, packagingId: string) {
  const selected = products.filter((p) => selection[p.id] > 0);
  const subtotal =
    selected.reduce(
      (sum, p) => sum + Math.round(p.price * 100) * selection[p.id],
      0,
    ) / 100;
  const packaging =
    packagingOptions.find((p) => p.id === packagingId) ?? packagingOptions[0];
  const packagedCount = selected.filter(p => (p.quantityStep ?? 1) === 1).reduce((sum, p) => sum + selection[p.id], 0);
  const bulkCount = selected.filter(p => (p.quantityStep ?? 1) > 1).reduce((sum, p) => sum + selection[p.id], 0);
  const packagingCost = packagedCount ? packaging.price : 0;
  const packagingLabel = packagedCount ? packaging.name : "Packaging to agree";
  return {
    selected,
    subtotal,
    packaging,
    packagedCount,
    usedSpace: selectionSpace(selection, packaging, quantitySteps, largeProductIds),
    bulkCount,
    packagingCost,
    packagingLabel,
    total:
      (Math.round(subtotal * 100) +
        Math.round(packagingCost * 100)) /
      100,
    count: selected.reduce((sum, p) => sum + selection[p.id], 0),
  };
}

export type CartLine = { item: CartItem; title: string; detail: string; unitPrice: number; pieceCount: number; bulkPackaging: boolean; images: string[]; contents: { name: string; quantity: number }[] };
export function describeCart(cart: CartItem[]) {
  const lines = cart.flatMap<CartLine>(item => {
    if (item.kind === "bundle") {
      const product = products.find(p => p.id === item.productId && p.bundleSize);
      return product ? [{ item, title: product.name, detail: product.description, unitPrice: product.price, pieceCount: product.bundleSize!, bulkPackaging: false, images: [product.image], contents: [] as { name: string; quantity: number }[] }] : [];
    }
    const estimate = calculateEstimate(item.selection, item.packagingId);
    return [{ item, title: "Your personalised assortment", detail: estimate.packagingLabel, unitPrice: estimate.total, pieceCount: estimate.count, bulkPackaging: estimate.bulkCount > 0, images: estimate.selected.slice(0, 4).map(p => p.image), contents: estimate.selected.map(p => ({ name: p.name, quantity: item.selection[p.id] })) }];
  });
  return { lines, total: lines.reduce((sum, line) => sum + Math.round(line.unitPrice * 100) * line.item.quantity, 0) / 100, pieces: lines.reduce((sum, line) => sum + line.pieceCount * line.item.quantity, 0), packages: lines.reduce((sum, line) => sum + line.item.quantity, 0) };
}
