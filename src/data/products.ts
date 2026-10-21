import catalog from "./catalog.json";
import { getLanguage } from "../i18n";
export const categories = [
  "Christmas",
  "Halloween",
  "Special Occasions",
  "Jams & Preserves",
];
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
  label?: string;
  allergens: string;
};
export const products: Product[] = catalog.products;
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
  return {
    selected,
    subtotal,
    packaging,
    total:
      (Math.round(subtotal * 100) +
        (selected.length ? Math.round(packaging.price * 100) : 0)) /
      100,
    count: selected.reduce((sum, p) => sum + selection[p.id], 0),
  };
}
