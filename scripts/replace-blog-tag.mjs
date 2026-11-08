#!/usr/bin/env node
/**
 * Replaces (or removes) a tag in every blog post's front matter.
 *
 * Usage: node scripts/replace-blog-tag.mjs <old-tag> [new-tag]
 *   <old-tag>  Tag to replace; matched exactly, including case.
 *   [new-tag]  Replacement tag. Omit it or pass "" to remove <old-tag>.
 *
 * Tags containing spaces are passed with normal shell quoting, e.g.
 *   node scripts/replace-blog-tag.mjs "Tech Career" "AI Career"
 *   node scripts/replace-blog-tag.mjs "Tech Career" ""
 *
 * - Asks for confirmation ("Type yes to proceed") before changing anything.
 * - Only rewrites posts whose tag list actually changes.
 * - Duplicate-safe: if a post already has the new tag, the old tag is
 *   replaced but the new one is not inserted a second time.
 * - Refuses a new tag that differs only in case from another existing tag:
 *   such tags slugify to the same URL and fail the build
 *   (DuplicatePermalinkOutputError). Reserved names (all, posts) are
 *   rejected for the same reason.
 */

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_ROOT = join(__dirname, "..", "content", "blog", "posts");

/** Reserved tag names Eleventy adds itself; reusing them breaks tag pages. */
const RESERVED_TAGS = new Set(["all", "posts"]);

const USAGE = `Usage: node scripts/replace-blog-tag.mjs <old-tag> [new-tag]
  <old-tag>  tag to replace (exact, case-sensitive match)
  [new-tag]  replacement tag; omit it or pass "" to remove <old-tag>`;

/** A front-matter `tags: [...]` line. */
const TAGS_LINE_RE = /^([ \t]*tags:[ \t]*)(\[[^\n]*\])[ \t]*(\r?)$/m;

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

function splitFrontMatter(raw) {
	// Group 2 is the newline before the closing `---`; keep it so the
	// front matter can be rebuilt byte-for-byte.
	const m = raw.match(/^---\r?\n([\s\S]*?)(\r?\n)---\r?\n([\s\S]*)$/);
	if (!m) return null;
	return { fm: m[1], fmEndNewline: m[2], body: m[3] };
}

function parseTagArray(bracket) {
	try {
		const value = JSON.parse(bracket);
		if (Array.isArray(value) && value.every((t) => typeof t === "string")) {
			return value;
		}
	} catch {
		// Fall through to the lenient parser below.
	}
	// Lenient fallback for single-quoted arrays, e.g. ['A', 'B'].
	const items = bracket.match(/'([^']*)'|"([^"]*)"/g);
	if (items) return items.map((s) => s.slice(1, -1));
	return null;
}

function formatTagArray(tags) {
	return `[${tags.map((t) => JSON.stringify(t)).join(", ")}]`;
}

/**
 * Apply the replacement to one post's tag list. Returns null when the old
 * tag is not present (nothing to do); `deduped` reports whether the new tag
 * was already present (case-insensitively — such tags slugify to the same
 * URL and fail the build) and was therefore not inserted a second time.
 */
function replaceInTags(tags, oldTag, newTag) {
	if (!tags.includes(oldTag)) return null;
	if (newTag === null) {
		return { tags: tags.filter((t) => t !== oldTag), deduped: false };
	}
	const newTagMatches = (t) =>
		t === newTag || t.toLowerCase() === newTag.toLowerCase();
	// The new tag is a duplicate if any *other* tag in this post already
	// matches it, no matter its position relative to the old tag.
	const alreadyPresent = tags.some((t) => t !== oldTag && newTagMatches(t));
	const next = [];
	let inserted = false;
	let deduped = false;
	for (const t of tags) {
		if (t === oldTag) {
			if (inserted || alreadyPresent) {
				deduped = true;
			} else {
				next.push(newTag);
			}
			inserted = true;
		} else {
			next.push(t);
		}
	}
	return { tags: next, deduped };
}

/** Ask a yes/no question; resolves null if stdin closes before an answer. */
function askToProceed(prompt) {
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		let settled = false;
		const finish = (value) => {
			if (settled) return;
			settled = true;
			rl.close();
			resolve(value);
		};
		rl.question(prompt).then(finish, () => finish(null));
		rl.on("close", () => finish(null));
	});
}

async function main() {
	const args = process.argv.slice(2);
	const oldTag = args[0] ?? "";
	const newTag = args.length > 1 && args[1] !== "" ? args[1] : null;

	if (!oldTag) {
		console.error(USAGE);
		process.exit(1);
	}
	if (oldTag !== oldTag.trim()) {
		console.error(`Error: tag "${oldTag}" starts or ends with whitespace.`);
		process.exit(1);
	}
	if (newTag !== null) {
		if (newTag !== newTag.trim()) {
			console.error(`Error: tag "${newTag}" starts or ends with whitespace.`);
			process.exit(1);
		}
		if (RESERVED_TAGS.has(newTag.toLowerCase())) {
			console.error(`Error: "${newTag}" is a reserved tag name (Eleventy adds it automatically).`);
			process.exit(1);
		}
		if (newTag === oldTag) {
			console.error(`Error: new tag "${newTag}" is identical to the old tag; nothing to do.`);
			process.exit(1);
		}
	}

	const files = (await collectMarkdownFiles(POSTS_ROOT)).sort();
	if (files.length === 0) {
		console.error("No blog posts found.");
		process.exit(1);
	}

	// Single scan: read every post once, parse its tags, plan the change.
	const existingTags = new Set();
	const planned = [];
	const problems = [];

	for (const file of files) {
		const rel = relative(process.cwd(), file);
		let raw;
		try {
			raw = await readFile(file, "utf8");
		} catch (err) {
			problems.push({ rel, reason: err.message });
			continue;
		}
		const parts = splitFrontMatter(raw);
		if (!parts) {
			problems.push({ rel, reason: "no front matter block" });
			continue;
		}
		const line = parts.fm.match(TAGS_LINE_RE);
		if (!line) {
			const hasTagsKey = /^[ \t]*tags:/m.test(parts.fm);
			const isInlineArray = /^[ \t]*tags:[ \t]*\[/m.test(parts.fm);
			if (hasTagsKey && !isInlineArray) {
				problems.push({ rel, reason: "tags is not an inline array; skipping this post" });
			}
			continue;
		}
		const tags = parseTagArray(line[2]);
		if (!tags) {
			problems.push({ rel, reason: "could not parse the tags line" });
			continue;
		}
		for (const t of tags) existingTags.add(t);
		const result = replaceInTags(tags, oldTag, newTag);
		if (result) planned.push({ file, rel, result });
	}

	if (newTag !== null) {
		const collision = [...existingTags].find(
			(t) => t !== oldTag && t !== newTag && t.toLowerCase() === newTag.toLowerCase(),
		);
		if (collision) {
			console.error(`Error: "${newTag}" differs only in case from existing tag "${collision}".`);
			console.error("Tags that differ only in case slugify to the same URL and fail the build.");
			console.error(`Did you mean "${collision}"?`);
			process.exit(1);
		}
	}

	if (planned.length === 0) {
		console.log(`No posts contain the tag "${oldTag}". Nothing to do.`);
		const variants = [...existingTags].filter(
			(t) => t !== oldTag && t.toLowerCase() === oldTag.toLowerCase(),
		);
		if (variants.length) {
			console.log(
				`Did you mean ${variants.map((v) => `"${v}"`).join(" or ")}? Tags are matched exactly, including case.`,
			);
		}
		for (const p of problems) console.warn(`warning: could not scan ${p.rel}: ${p.reason}`);
		process.exit(problems.length ? 1 : 0);
	}

	for (const p of problems) console.warn(`warning: could not scan ${p.rel}: ${p.reason}`);

	console.log(`${planned.length} post(s) contain the tag "${oldTag}":`);
	for (const p of planned) console.log(`  ${p.rel}`);

	const prompt =
		newTag === null
			? `This will remove the tag "${oldTag}" from the ${planned.length} post(s) listed above. Type yes to proceed. `
			: `This will replace "${oldTag}" with "${newTag}". Type yes to proceed. `;
	const answer = await askToProceed(prompt);
	if (answer === null || answer.trim() !== "yes") {
		console.log("Aborted. No files were changed.");
		process.exit(1);
	}

	// Apply pass: re-read each planned file so we never write stale content.
	let updated = 0;
	const failed = [];
	for (const p of planned) {
		try {
			const raw = await readFile(p.file, "utf8");
			const parts = splitFrontMatter(raw);
			const line = parts && parts.fm.match(TAGS_LINE_RE);
			const tags = line ? parseTagArray(line[2]) : null;
			const result = tags ? replaceInTags(tags, oldTag, newTag) : null;
			if (!result) {
				console.warn(`skip (no longer contains "${oldTag}"): ${p.rel}`);
				continue;
			}
			const newFm = parts.fm.replace(TAGS_LINE_RE, (full, lead, _bracket, cr) => {
				return `${lead}${formatTagArray(result.tags)}${cr}`;
			});
			await writeFile(p.file, `---\n${newFm}${parts.fmEndNewline}---\n${parts.body}`, "utf8");
			updated++;
			const notes = [];
			if (result.deduped) notes.push(`"${newTag}" already present; duplicate not inserted`);
			console.log(`updated: ${p.rel}${notes.length ? ` (${notes.join("; ")})` : ""}`);
		} catch (err) {
			failed.push({ rel: p.rel, reason: err.message });
		}
	}

	if (failed.length) {
		console.error(`Failed to update ${failed.length} post(s):`);
		for (const f of failed) console.error(`  ${f.rel}: ${f.reason}`);
		console.error(`Updated ${updated} post(s) before failing.`);
		process.exit(1);
	}
	if (updated === 0) {
		console.log("No files needed changing.");
		process.exit(0);
	}
	console.log(`Done. Updated ${updated} post(s).`);
	console.log("Run `npm run build` to verify the site still builds.");
	process.exit(problems.length ? 1 : 0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
