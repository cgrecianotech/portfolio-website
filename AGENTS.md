# AGENTS.md

Christian Greciano's personal site (https://christiangreciano.com): landing page, study notes and flashcards link pages, and a blog.

## Tech Stack

Static site built with Eleventy 3 (Nunjucks + Markdown), ESM, Node 20 (`.nvmrc`). No framework, no client-side build, no tests, no linter, no CI config in the repo.

## Commands

- `npm install` — first time only.
- `npm run build` — clean `_site/` and do a production build. Drafts are excluded. This is the main verification step: it must finish without errors.
- `npm start` — dev server with live reload (http://localhost:8080). Drafts are rendered with ` (draft)` appended to the title.
- `npm run debug` / `npm run debugstart` — same with `DEBUG=Eleventy*`.
- `npm run add-blog-thumbnails [-- --force]` — backfill `thumbnail_image` / `thumbnail_video` front matter from each post's first content block (`scripts/add-blog-thumbnails.mjs`).

## Layout

| Path | Purpose |
| - | - |
| `eleventy.config.js` | Plugins, markdown-it setup, CSS/JS bundles, drafts preprocessor, image transform, feed. `dir.input` is `content/`. |
| `_config/filters.js` | All custom Nunjucks filters (`readableDate`, `htmlDateString`, `head`, `blogPostSerial`, `blogImagePath`, `youtubeThumbnailUrl`, `estimatedReadingTime`, …). Add new filters here. |
| `_data/metadata.js` | Site-wide metadata (title, url, author). |
| `_data/eleventyDataSchema.js` | Zod validation of front matter (currently only `draft: boolean`). |
| `_includes/layouts/` | Layout chain: `base.njk` → `content.njk` (top-level pages) or `blog.njk` → `post.njk` (posts). `_includes/postslist.njk` renders post cards. |
| `content/` | Eleventy input. `index.html`, `notes.njk`, `flashcards.njk`, `404.njk`, `sitemap.xml.njk`, `feed/`. |
| `content/blog/` | Blog index (latest 3), `archive.njk`, `tags.njk`, `tag-pages.njk` (paginated per-tag pages at `/tags/<slug>/`). |
| `content/blog/posts/YYYY/MM/` | Blog posts. `posts.11tydata.js` adds the `posts` tag and `layouts/post.njk`. |
| `public/` | Passthrough-copied to site root. Blog images live in `public/images/blog-img/`. |
| `css/` | Per-area stylesheets inlined via `<style>{% include "css/x.css" %}</style>` into the CSS bundle. `css/style.css` appears unreferenced. |
| `scripts/` | Node maintenance scripts. |
| `AIF-C01/` | Legacy Notion HTML export, **not** part of the build (outside `content/`). Don't edit or reference it. |
| `_site/`, `.cache/` | Build output and eleventy-img cache. Gitignored; never edit or commit. |

## Blog posts (most common task)

Path: `content/blog/posts/YYYY/MM/NNNN_kebab-slug.md`, where `NNNN` is the next zero-padded serial (find the highest existing `NNNN_` prefix and add 1) and `MM` is zero-padded. The URL is derived from the path (`/blog/posts/2026/10/0029_slug/`), so never rename or move published posts. `content/blog/posts/2026/1/` is a legacy non-padded folder; leave it as is. The site displays the serial without leading zeros via `blogPostSerial`; `post_serial` front matter overrides it.

Front matter:

```yaml
---
title: Discover NoteGPT and EurekaMind 2.0 [SPONSORED]
description: One or two sentences; shown on post cards, in <meta>, and in the feed.
date: 2026-10-19
tags: ["AI", "Note Taking", "Sponsored"]
thumbnail_image: '0029_tn_discover-notegpt-eurekamind.jpg'
# optional:
# thumbnail_video: "https://youtu.be/…"   # fallback card thumbnail only
# draft: true                             # must be a boolean (zod-validated)
---
```

- `thumbnail_image` is a bare filename in `public/images/blog-img/`, not a path. Always provide it.
- Tags: reuse existing tags with identical casing (`grep -rh '^tags:' content/blog/posts`). Two tags differing only in case slugify to the same URL and fail the build with `DuplicatePermalinkOutputError`. `all` and `posts` are reserved.
- First content block is the hero: either a bare YouTube URL on its own line (auto-embedded by `eleventy-plugin-embed-everything`) or the thumbnail image. Then prose, `##` section headings (the `<h1>` comes from `title`).
- Markdown is preprocessed by Nunjucks (`markdownTemplateEngine: "njk"`), raw HTML is allowed, and external `http(s)` links automatically get `target="_blank" rel="noopener noreferrer"`.

Images:

- Files: `public/images/blog-img/NNNN_descriptive-name.ext`; card thumbnails `NNNN_tn_descriptive-name.ext`.
- Embed exactly like existing posts, always with `alt` and `eleventy:ignore` (opts out of the eleventy-img transform; every post image uses it):

```html
<img src="{{ '0029_notegpt-screenshot.png' | blogImagePath }}" alt="A screenshot of NoteGPT's offering" eleventy:ignore>
```

Content: posts are the author's personal first-person writing. Don't rewrite voice or opinions, invent facts, or generate post prose unless explicitly asked; when asked to "add" a post, use the text provided. Fix typos/links only when asked or clearly flagged.

## Conventions and gotchas

- Formatting per `.editorconfig`: tabs, LF, final newline, trimmed trailing whitespace. Existing `.njk`/`.html` pages under `content/` mix in 4-space indentation; match the surrounding file.
- Internal links may point at input paths (`/notes.njk`, `/blog/index.njk`, `archive.njk`); `InputPathToUrlTransformPlugin` rewrites them to output URLs. Keep that style for consistency.
- Page-scoped CSS/JS: add a `<style>`/`<script>` in the template; it's collected into the `css`/`js` bundles. Use `eleventy:ignore` on the tag to opt out.
- Navigation in the blog header comes from `eleventyNavigation` front matter (`key`, `order`) in `content/blog/*.njk`.
- Feed (`/feed/feed.xml`, Atom, last 10 posts) is configured in `eleventy.config.js`; site metadata is duplicated there and in `_data/metadata.js`.
- Third-party scripts in `base.njk`: Ko-fi widget, Simple Analytics. Don't add trackers or new external dependencies without asking.
- Dates: `readableDate` / `htmlDateString` use UTC via Luxon.

## Verifying changes

1. `npm run build` succeeds with no errors or warnings you introduced.
2. Inspect the generated HTML in `_site/` (e.g. `_site/blog/posts/YYYY/MM/NNNN_slug/index.html`, `_site/blog/index.html`, `_site/tags/<slug>/index.html`).
3. For visual changes, run `npm start` and check the page in a browser, in both light and dark theme (toggle in navbar).

## Git workflow

Work on a branch (e.g. `blog-post-NNNN`), open a PR to `main`. Commit messages are short and descriptive, e.g. `Blog post 0029 - Discover NoteGPT and EurekaMind`. Commit the post and its images together. Only commit/push when asked.
