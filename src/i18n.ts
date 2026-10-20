import { useSyncExternalStore } from "react";
import italian from "./data/italian.json";

export type Language = "it" | "en";
let language: Language = "it";
try {
  if (localStorage.getItem("giansy-language") === "en") language = "en";
} catch {
  /* Italian remains the default. */
}
const listeners = new Set<() => void>();
export const getLanguage = () => language;
export function setLanguage(value: Language) {
  language = value;
  document.documentElement.lang = value;
  document.title =
    value === "it"
      ? "Le Creazioni di Giansy — Piccole dolcezze, grande amore"
      : "Le Creazioni di Giansy — Handmade happiness";
  try {
    localStorage.setItem("giansy-language", value);
  } catch {
    /* Language switching also works without storage. */
  }
  listeners.forEach((fn) => fn());
}
export function useLanguage() {
  return useSyncExternalStore((fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, getLanguage);
}
export function t(text: string) {
  return language === "it"
    ? ((italian as Record<string, string>)[text] ?? text)
    : text;
}
