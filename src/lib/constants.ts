/**
 * Site-wide constants.
 * Edit these to personalize your site.
 */

export const SITE = {
  title: "Codis Fun",
  description: "Code is fun, life just begun.",
  author: "YJ",
  language: "zh-CN",
  /** Path to your avatar in /public */
  avatarPath: "/avatar.svg",
  /** The large hero heading */
  headline: "Code is Fun",
  /** Short intro below the headline */
  intro: "Code is fun, life just begun.",
} as const;

/** Number of articles to show on homepage. undefined = all. */
export const HOMEPAGE_ARTICLE_LIMIT: number | undefined = undefined;
