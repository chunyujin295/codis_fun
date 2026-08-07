// @ts-check
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, "..", "src", "content", "articles");
const OUTPUT = resolve(__dirname, "..", "public", "search-index.json");

/**
 * Recursively collect all .md files.
 */
function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (entry.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Strip the first 600 chars of useful text from the markdown body.
 * Skips frontmatter, HTML tags, code blocks, and headings for cleaner snippets.
 */
function extractSnippet(body) {
  return body
    .replace(/<[^>]+>/g, "")     // strip HTML tags
    .replace(/```[\s\S]*?```/g, "") // strip fenced code blocks
    .replace(/`[^`]+`/g, "")      // strip inline code
    .replace(/^#{1,6}\s+.+$/gm, "") // strip headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // keep link text
    .replace(/!\[.*?\]\([^)]+\)/g, "") // strip images
    .replace(/\n{2,}/g, "\n")     // collapse blank lines
    .trim()
    .slice(0, 600);
}

const files = collectFiles(ARTICLES_DIR);

const index = [];
for (const file of files) {
  try {
    const raw = readFileSync(file, "utf-8");
    const { data } = matter(raw);
    const snippet = extractSnippet(matter(raw).content);

    // Determine slug: strip .md and the articles dir prefix
    const slug = file
      .replace(ARTICLES_DIR + "\\", "")
      .replace(ARTICLES_DIR + "/", "")
      .replace(/\.md$/, "");

    if (data.draft) continue;

    index.push({
      title: data.title ?? slug,
      slug,
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
      excerpt: data.excerpt ?? "",
      tags: (() => {
        const set = new Set();
        for (const t of data.tags ?? []) set.add(t);
        if (data.tag) {
          for (const t of (Array.isArray(data.tag) ? data.tag : [data.tag])) set.add(t);
        }
        if (data.category) {
          for (const t of (Array.isArray(data.category) ? data.category : [data.category])) set.add(t);
        }
        return [...set];
      })(),
      snippet,
    });
  } catch (err) {
    console.warn(`[search-index] Skipping ${file}:`, err.message);
  }
}

writeFileSync(OUTPUT, JSON.stringify(index), "utf-8");
console.log(`[search-index] Wrote ${index.length} entries to ${OUTPUT}`);
