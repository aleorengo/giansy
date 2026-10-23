import { createContext, useContext } from "react";

export const SelectionContext = createContext({ count: 0, usedSpace: 0, capacity: 25, minimum: 1, largeWeight: 3 });
export const useSelectionLimit = () => useContext(SelectionContext);
