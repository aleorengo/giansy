import { createContext, useContext } from "react";

export const SelectionContext = createContext({ count: 0, usedSpace: 0, capacity: 25, minimum: 1, minimumCount: 0, minimumLabel: "", largeWeight: 3, allowsLarge: true });
export const useSelectionLimit = () => useContext(SelectionContext);
