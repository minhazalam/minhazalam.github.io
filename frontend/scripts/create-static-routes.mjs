import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.resolve(frontend, process.env.BUILD_PATH || "build");
const articles = JSON.parse(await readFile(path.join(frontend, "src", "content", "writing.json"), "utf8")).articles;
const projects = JSON.parse(await readFile(path.join(frontend, "src", "content", "projects.json"), "utf8")).projects;
const appHtml = await readFile(path.join(buildDir, "index.html"));

async function writeRoute(relativePath) {
  const routeDir = path.join(buildDir, relativePath);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), appHtml);
}

await writeRoute("writing");
for (const article of articles) await writeRoute(path.join("writing", article.slug));
for (const project of projects.filter((item) => item.details)) await writeRoute(path.join("projects", project.slug));
await writeFile(path.join(buildDir, "404.html"), appHtml);

console.log(`Generated static routes for /writing, ${articles.length} note(s), and ${projects.filter((item) => item.details).length} project overview(s).`);
