export type BuilderState = {
  selection: Record<string, number>;
  packagingId: string;
};
type PackagingRule = { id: string; minimum: number; capacity: number };
export type BuilderAction =
  | { type: "change"; id: string; delta: number }
  | { type: "configure"; packagingId: string }
  | { type: "reset" };

export const emptyBuilder: BuilderState = {
  selection: {}, packagingId: "paper",
};
export const selectedCount = (selection: Record<string, number>) =>
  Object.values(selection).reduce((sum, quantity) => sum + quantity, 0);

export function restoreBuilder(
  saved: unknown,
  packaging: readonly PackagingRule[],
  productIds: readonly string[],
): BuilderState {
  if (!saved || typeof saved !== "object") return { ...emptyBuilder };
  const value = saved as Partial<BuilderState>;
  const largest = [...packaging].sort((a, b) => b.capacity - a.capacity)[0];
  const selection: Record<string, number> = {};
  let room = largest.capacity;
  for (const id of productIds) {
    const n = value.selection?.[id];
    if (typeof n === "number" && Number.isInteger(n) && n > 0 && room > 0) {
      selection[id] = Math.min(n, room);
      room -= selection[id];
    }
  }
  const count = selectedCount(selection);
  const option = packaging.find(p => p.id === value.packagingId) ?? packaging[0];
  const chosen = option.capacity >= count ? option : largest;
  return {
    selection,
    packagingId: chosen.id,
  };
}

export function isSelectionReady(state: BuilderState, packaging: readonly PackagingRule[]) {
  const option = packaging.find(p => p.id === state.packagingId);
  const count = selectedCount(state.selection);
  return !!option && count >= option.minimum && count <= option.capacity;
}

export function updateBuilder(
  state: BuilderState,
  action: BuilderAction,
  packaging: readonly PackagingRule[],
  productIds: readonly string[],
): BuilderState {
  if (action.type === "reset") return { ...emptyBuilder };
  const count = selectedCount(state.selection);
  if (action.type === "configure") {
    const option = packaging.find(p => p.id === action.packagingId);
    if (!option || count > option.capacity) return state;
    return { ...state, packagingId: option.id };
  }
  if (!productIds.includes(action.id) || !Number.isInteger(action.delta)) return state;
  const current = state.selection[action.id] || 0;
  const option = packaging.find(p => p.id === state.packagingId) ?? packaging[0];
  const delta = action.delta > 0
    ? Math.min(action.delta, Math.max(0, option.capacity - count)) : action.delta;
  const next = Math.max(0, current + delta);
  if (next === current) return state;
  const selection = { ...state.selection };
  if (next) selection[action.id] = next;
  else delete selection[action.id];
  return { ...state, selection };
}
