export type BuilderState = {
  selection: Record<string, number>;
  packagingId: string;
};
type PackagingRule = { id: string; minimum: number; capacity: number; largeWeight?: number; minimumLargeWeight?: number };
export type QuantitySteps = Readonly<Record<string, number>>;
export const packagedCount = (selection: Record<string, number>, steps: QuantitySteps = {}) =>
  Object.entries(selection).reduce((sum, [id, n]) => sum + ((steps[id] ?? 1) > 1 ? 0 : n), 0);
export const productSpace = (id: string, option: PackagingRule, largeIds: readonly string[]) =>
  largeIds.includes(id) ? (option.largeWeight ?? 3) : 1;
export const selectionSpace = (selection: Record<string, number>, option: PackagingRule, steps: QuantitySteps = {}, largeIds: readonly string[] = []) =>
  Object.entries(selection).reduce((sum, [id, n]) => sum + ((steps[id] ?? 1) > 1 ? 0 : n * productSpace(id, option, largeIds)), 0);
export const selectionMinimumCount = (selection: Record<string, number>, option: PackagingRule, steps: QuantitySteps = {}, largeIds: readonly string[] = []) =>
  Object.entries(selection).reduce((sum, [id, n]) => sum + ((steps[id] ?? 1) > 1 ? 0 : n * (largeIds.includes(id) ? (option.minimumLargeWeight ?? 1) : 1)), 0);
export type BuilderAction =
  | { type: "change"; id: string; delta: number }
  | { type: "configure"; packagingId: string }
  | { type: "reset" };
export const emptyBuilder: BuilderState = { selection: {}, packagingId: "paper" };
export const selectedCount = (selection: Record<string, number>) =>
  Object.values(selection).reduce((sum, quantity) => sum + quantity, 0);

export function restoreBuilder(saved: unknown, packaging: readonly PackagingRule[], productIds: readonly string[], steps: QuantitySteps = {}, largeIds: readonly string[] = []): BuilderState {
  if (!saved || typeof saved !== "object") return { ...emptyBuilder };
  const value = saved as Partial<BuilderState>;
  const largest = [...packaging].sort((a, b) => b.capacity - a.capacity)[0];
  const selection: Record<string, number> = {};
  let room = largest.capacity;
  for (const id of productIds) {
    const n = value.selection?.[id];
    const step = steps[id] ?? 1;
    if (typeof n !== "number" || !Number.isSafeInteger(n) || n <= 0) continue;
    if (step > 1) {
      const rounded = Math.ceil(n / step) * step;
      if (Number.isSafeInteger(rounded)) selection[id] = rounded;
    } else {
      const weight = productSpace(id, largest, largeIds);
      const amount = Math.min(n, Math.floor(room / weight));
      if (amount > 0) { selection[id] = amount; room -= amount * weight; }
    }
  }
  const option = packaging.find(p => p.id === value.packagingId) ?? packaging[0];
  const chosen = selectionSpace(selection, option, steps, largeIds) <= option.capacity ? option : largest;
  return { selection, packagingId: chosen.id };
}

export function isSelectionReady(state: BuilderState, packaging: readonly PackagingRule[], steps: QuantitySteps = {}, largeIds: readonly string[] = []) {
  const option = packaging.find(p => p.id === state.packagingId);
  const count = packagedCount(state.selection, steps);
  const valid = Object.entries(state.selection).every(([id, n]) => Number.isSafeInteger(n) && n > 0 && n % (steps[id] ?? 1) === 0);
  return !!option && valid && selectedCount(state.selection) > 0 && (count === 0 || selectionMinimumCount(state.selection, option, steps, largeIds) >= option.minimum) && selectionSpace(state.selection, option, steps, largeIds) <= option.capacity;
}

export function updateBuilder(state: BuilderState, action: BuilderAction, packaging: readonly PackagingRule[], productIds: readonly string[], steps: QuantitySteps = {}, largeIds: readonly string[] = []): BuilderState {
  if (action.type === "reset") return { ...emptyBuilder };
  if (action.type === "configure") {
    const option = packaging.find(p => p.id === action.packagingId);
    if (!option || selectionSpace(state.selection, option, steps, largeIds) > option.capacity) return state;
    return { ...state, packagingId: option.id };
  }
  const step = steps[action.id] ?? 1;
  if (!productIds.includes(action.id) || !Number.isSafeInteger(action.delta) || action.delta % step !== 0) return state;
  const current = state.selection[action.id] || 0;
  const option = packaging.find(p => p.id === state.packagingId) ?? packaging[0];
  const room = Math.max(0, option.capacity - selectionSpace(state.selection, option, steps, largeIds));
  const delta = action.delta > 0 && step === 1 ? Math.min(action.delta, Math.floor(room / productSpace(action.id, option, largeIds))) : action.delta;
  const next = Math.max(0, current + delta);
  if (!Number.isSafeInteger(next) || next === current) return state;
  const selection = { ...state.selection };
  if (next) selection[action.id] = next;
  else delete selection[action.id];
  return { ...state, selection };
}
