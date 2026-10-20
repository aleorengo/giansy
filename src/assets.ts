/** Keep public assets working at both / and a GitHub Pages project path. */
export function assetUrl(path: string) {
  if (/^(?:https?:|data:|blob:|\/\/)/.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}
