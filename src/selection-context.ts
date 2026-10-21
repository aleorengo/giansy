import { createContext, useContext } from "react";

export const SelectionContext = createContext({ count: 0, capacity: 25, minimum: 1 });
export const useSelectionLimit = () => useContext(SelectionContext);
