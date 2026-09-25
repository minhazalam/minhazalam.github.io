import { readdir, readFile, realpath, mkdir, copyFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(frontend, "src", "content", "writing.json");
const outputDir = path.join(frontend, "public", "writing");
const articles = JSON.parse(await readFile(manifestPath, "utf8")).articles;
const sourcePath = process.env.NOTES_REPO_PATH;

for (const entry of await readdir(outputDir).catch(() => [])) {
  if (entry.endsWith(".md")) await unlink(path.join(outputDir, entry));
}
await mkdir(outputDir, { recursive: true });

if (articles.length && !sourcePath) {
  throw new Error("NOTES_REPO_PATH is required when writing.json publishes notes.");
}

const sourceRoot = sourcePath ? await realpath(sourcePath) : null;
const slugs = new Set();
for (const article of articles) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug || "")) {
    throw new Error(`Invalid writing slug: ${article.slug}`);
  }
  if (slugs.has(article.slug)) throw new Error(`Duplicate writing slug: ${article.slug}`);
  slugs.add(article.slug);

  const sourceFile = article.sourceFile;
  if (typeof sourceFile !== "string" || path.isAbsolute(sourceFile) || !sourceFile.endsWith(".md") || sourceFile.split(/[\\/]/).includes("..")) {
    throw new Error(`Invalid Markdown source path for ${article.slug}: ${sourceFile}`);
  }
  const resolvedSource = await realpath(path.join(sourceRoot, sourceFile));
  if (!resolvedSource.startsWith(`${sourceRoot}${path.sep}`)) {
    throw new Error(`Markdown source escapes NOTES_REPO_PATH: ${sourceFile}`);
  }
  await copyFile(resolvedSource, path.join(outputDir, `${article.slug}.md`));
}

console.log(`Prepared ${articles.length} selected Markdown note(s).`);
