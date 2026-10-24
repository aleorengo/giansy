export type CartItem =
  | { id: string; kind: "custom"; selection: Record<string, number>; packagingId: string; quantity: number }
  | { id: string; kind: "bundle" | "timeless"; productId: string; quantity: number };
export const customCartId = (selection: Record<string, number>, packagingId: string) =>
  `custom:${packagingId}:${Object.entries(selection).filter(([, n]) => n > 0).sort(([a], [b]) => a.localeCompare(b)).map(([id, n]) => `${id}=${n}`).join(";")}`;
export function addCustomToCart(cart: CartItem[], selection: Record<string, number>, packagingId: string): CartItem[] {
  const id = customCartId(selection, packagingId);
  const existing = cart.find(item => item.id === id);
  return existing ? changeCartQuantity(cart, id, 1) : [...cart, { id, kind: "custom", selection: { ...selection }, packagingId, quantity: 1 }];
}
export function addBundleToCart(cart: CartItem[], productId: string, quantity: number): CartItem[] {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) return cart;
  const id = `bundle:${productId}`;
  return cart.some(item => item.id === id) ? changeCartQuantity(cart, id, quantity) : [...cart, { id, kind: "bundle", productId, quantity }];
}
export function addTimelessToCart(cart: CartItem[], productId: string, quantity: number): CartItem[] {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) return cart;
  const id = `timeless:${productId}`;
  return cart.some(item => item.id === id) ? changeCartQuantity(cart, id, quantity) : [...cart, { id, kind: "timeless", productId, quantity }];
}
export function changeCartQuantity(cart: CartItem[], id: string, delta: number): CartItem[] {
  if (!Number.isSafeInteger(delta)) return cart;
  return cart.flatMap(item => {
    if (item.id !== id) return [item];
    const next = item.quantity + delta;
    return !Number.isSafeInteger(next) ? [item] : next > 0 ? [{ ...item, quantity: next }] : [];
  });
}
export function restoreCart(saved: unknown, bundleIds: readonly string[], validCustom: (selection: Record<string, number>, packagingId: string) => boolean, timelessIds: readonly string[] = []): CartItem[] {
  if (!Array.isArray(saved)) return [];
  let cart: CartItem[] = [];
  for (const row of saved) {
    if (!row || !Number.isSafeInteger(row.quantity) || row.quantity <= 0) continue;
    if (row.kind === "bundle" && bundleIds.includes(row.productId)) cart = addBundleToCart(cart, row.productId, row.quantity);
    else if (row.kind === "timeless" && timelessIds.includes(row.productId)) cart = addTimelessToCart(cart, row.productId, row.quantity);
    else if (row.kind === "custom" && row.selection && typeof row.selection === "object" && !Array.isArray(row.selection) && typeof row.packagingId === "string" && validCustom(row.selection, row.packagingId)) {
      const id = customCartId(row.selection, row.packagingId);
      const existing = cart.find(item => item.id === id);
      if (existing) cart = changeCartQuantity(cart, id, row.quantity);
      else cart.push({ id, kind: "custom", selection: { ...row.selection }, packagingId: row.packagingId, quantity: row.quantity });
    }
  }
  return cart;
}
export function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function validRequestedDate(value: string, today = localToday()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < today) return false;
  const date = new Date(`${value}T12:00:00`);
  return Number.isFinite(date.getTime()) && `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` === value;
}
