#!/usr/bin/env node
/**
 * Appends thumbnail_image and/or thumbnail_video to the end of each post's
 * front matter, inferred from the first content block after `---` (everything
 * before the first blank line / next paragraph). That block is the hero
 * thumbnail: either a video URL (YouTube for now) or an <img>. Image filename
 * from {{ 'x' | blogImagePath }} is stored as x; external URLs are stored
 * verbatim. Video values are full URLs (extend VIDEO_URL_RE for other hosts).
 *
 * Usage: node scripts/add-blog-thumbnails.mjs [--force]
 *   --force  Replace existing thumbnail_* keys
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_ROOT = join(__dirname, "..", "content", "blog", "posts");

/** First match in the thumbnail zone. Extend the alternation for other video platforms. */
const VIDEO_URL_RE =
	/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^\s)]+|youtu\.be\/[^\s)]+|youtube\.com\/embed\/[^\s)]+)/i;
/** Double-quoted src can contain single quotes (Liquid). Do not use [^"']+ — it breaks on ' inside ". */
const IMG_SRC_RE =
	/<img[^>]+?\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
const LIQUID_IMG_RE =
	/\{\{\s*['"]([^'"]+)['"]\s*\|\s*blogImagePath\s*\}\}/;

function yamlString(value) {
	return JSON.stringify(String(value));
}

async function collectMarkdownFiles(dir) {
	const out = [];
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, entry.name);
		if (entry.isDirectory()) {
			out.push(...(await collectMarkdownFiles(p)));
		} else if (entry.name.endsWith(".md")) {
			out.push(p);
		}
	}
	return out;
}

function extractFirstVideoUrl(text) {
	const m = text.match(VIDEO_URL_RE);
	return m ? m[0] : null;
}

function extractFirstImage(text) {
	const imgMatch = text.match(IMG_SRC_RE);
	if (!imgMatch) return null;
	const src = (imgMatch[1] ?? imgMatch[2] ?? "").trim();
	if (!src) return null;
	const liquid = src.match(LIQUID_IMG_RE);
	if (liquid) return liquid[1];
	return src;
}

/** First paragraph after front matter: hero thumbnail, before the main prose. */
function thumbnailZone(body) {
	const t = body.trimStart();
	const i = t.indexOf("\n\n");
	return i === -1 ? t : t.slice(0, i);
}

const THUMB_LINE_RE = /^\s*thumbnail_(image|video)\s*:/;

function stripThumbnailKeys(fmBlock) {
	return fmBlock
		.split(/\r?\n/)
		.filter((line) => !THUMB_LINE_RE.test(line))
		.join("\n");
}

function splitFrontMatter(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!m) return null;
	return { fm: m[1], body: m[2] };
}

function appendThumbnails(fmBlock, { image, video }) {
	let block = fmBlock.replace(/\s+$/, "");
	if (image != null) {
		block += `\nthumbnail_image: ${yamlString(image)}`;
	}
	if (video != null) {
		block += `\nthumbnail_video: ${yamlString(video)}`;
	}
	return block + "\n";
}

async function main() {
	const force = process.argv.includes("--force");
	const files = (await collectMarkdownFiles(POSTS_ROOT)).sort();

	for (const file of files) {
		const raw = await readFile(file, "utf8");
		const parts = splitFrontMatter(raw);
		if (!parts) {
			console.warn(`skip (no front matter): ${relative(process.cwd(), file)}`);
			continue;
		}

		let fmBlock = parts.fm;
		const hasImage = /^\s*thumbnail_image\s*:/m.test(fmBlock);
		const hasVideo = /^\s*thumbnail_video\s*:/m.test(fmBlock);

		if ((hasImage || hasVideo) && !force) {
			console.log(`skip (already has thumbnail_*): ${relative(process.cwd(), file)}`);
			continue;
		}

		if (force && (hasImage || hasVideo)) {
			fmBlock = stripThumbnailKeys(fmBlock);
		}

		const zone = thumbnailZone(parts.body);
		const video = extractFirstVideoUrl(zone);
		const image = extractFirstImage(zone);

		if (image == null && video == null) {
			console.warn(`skip (no image/video in thumbnail zone): ${relative(process.cwd(), file)}`);
			continue;
		}

		const newFm = appendThumbnails(fmBlock, { image, video });
		const out = `---\n${newFm}---\n${parts.body}`;
		await writeFile(file, out, "utf8");
		console.log(`updated: ${relative(process.cwd(), file)}`);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
