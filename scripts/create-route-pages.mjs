import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve("dist/public");
const indexFile = resolve(output, "index.html");

for (const route of ["privacy", "terms"]) {
  const routeDirectory = resolve(output, route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(indexFile, resolve(routeDirectory, "index.html"));
}

console.log("Created static Privacy and Terms route entry points for GitHub Pages.");
