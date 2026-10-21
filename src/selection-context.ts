import { createContext, useContext } from "react";

export const SelectionContext = createContext({ count: 0, cookieCount: 0, isConfigured: false });
export const useSelectionLimit = () => useContext(SelectionContext);
