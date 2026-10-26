import { mkdir, readFile, writeFile } from "node:fs/promises";

const base = process.env.BASE_PATH || "/";
if (!base.startsWith("/") || !base.endsWith("/")) {
  throw new Error("BASE_PATH must start and end with /");
}
const index = await readFile("dist/index.html", "utf8");
const { articles } = JSON.parse(await readFile("src/data/journal.json", "utf8"));
const features = JSON.parse(await readFile("src/data/features.json", "utf8"));

// GitHub Pages serves real directories, so every journal URL can be opened
// directly or refreshed without relying on server-side rewrite rules.
for (const route of features.journal ? ["journal", ...articles.map(({ slug }) => `journal/${slug}`)] : []) {
  if (!/^journal(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/.test(route)) {
    throw new Error(`Invalid article route: ${route}`);
  }
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, index);
}
await writeFile("dist/404.html", index);
await writeFile("dist/.nojekyll", "");

// Public HTML is copied as-is by Vite; give its local links the same base.
const brand = await readFile("dist/brand/index.html", "utf8");
await writeFile(
  "dist/brand/index.html",
  brand.replace(/(src|href)="\/(?!\/)/g, `$1="${base}`),
);
const admin = await readFile("dist/admin/config.yml", "utf8");
await writeFile(
  "dist/admin/config.yml",
  admin.replace(/^logo_url: \/.*$/m, `logo_url: ${base}brand/giansy-round-logo.svg`),
);
console.log(`Prepared static routes and downloads for ${base}`);
