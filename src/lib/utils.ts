import type { CollectionEntry } from "astro:content";

/**
 * Extract a clean slug from an article ID (filename).
 * "2024-01-hello-world.md" → "2024-01-hello-world"
 */
export function getSlug(id: string): string {
  return id.replace(/\.md$/, "");
}

/**
 * Format a Date as YYYY-MM-DD string.
 */
export function formatDate(date: Date, locale = "zh-CN"): string {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Collect all normalized tags from an article.
 * Merges `tags` (string[]), `tag` (string), and `category` (string[])
 * into a single deduplicated array.
 */
export function getArticleTags(
  article: CollectionEntry<"articles">,
): string[] {
  const all: string[] = [];

  if (article.data.tags && article.data.tags.length > 0) {
    all.push(...article.data.tags);
  }
  if (article.data.tag) {
    all.push(article.data.tag);
  }
  if (article.data.category && article.data.category.length > 0) {
    all.push(...article.data.category);
  }

  // Deduplicate
  return [...new Set(all)];
}

/**
 * Group articles by tag.
 * Returns a Map of tag → articles (sorted by date descending within each group).
 * Articles with no tags go under "__uncategorized".
 */
export function groupArticlesByTag(
  articles: CollectionEntry<"articles">[],
): Map<string, CollectionEntry<"articles">[]> {
  const groups = new Map<string, CollectionEntry<"articles">[]>();

  for (const article of articles) {
    const tags = getArticleTags(article);

    if (tags.length === 0) {
      const uncategorized = groups.get("__uncategorized") ?? [];
      uncategorized.push(article);
      groups.set("__uncategorized", uncategorized);
    } else {
      for (const tag of tags) {
        const group = groups.get(tag) ?? [];
        group.push(article);
        groups.set(tag, group);
      }
    }
  }

  // Sort each group by date descending (and sticky first)
  for (const [tag, list] of groups) {
    list.sort((a, b) => {
      const sa = a.data.sticky ?? 0;
      const sb = b.data.sticky ?? 0;
      if (sa !== sb) return sb - sa;
      return b.data.date.getTime() - a.data.date.getTime();
    });
  }

  return groups;
}

/**
 * Sort group keys: __uncategorized last, others alphabetically.
 */
export function sortGroupKeys(groups: Map<string, unknown>): string[] {
  const keys = [...groups.keys()];
  const uncategorized = keys.filter((k) => k === "__uncategorized");
  const others = keys
    .filter((k) => k !== "__uncategorized")
    .sort((a, b) => a.localeCompare(b, "zh-CN"));
  return [...others, ...uncategorized];
}
