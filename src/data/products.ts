import catalog from "./catalog.json";
import { selectionSpace } from "../selection";
import { getLanguage } from "../i18n";
export const categories = [
  "Christmas",
  "Halloween",
  "Special Occasions",
  "Timeless Biscuits",
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
