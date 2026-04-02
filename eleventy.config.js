import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import embedEverythingPlugin from "eleventy-plugin-embed-everything";
import markdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	//// DRAFTS: see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) {
      data.title = `${data.title} (draft)`;
    }

		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	//// PASSTHROUGH COPY: Copy `public` dir (to output dir) and `feed/pretty-atom-feed.xsl`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	//// WATCH TARGETS: Run Eleventy when these files change:
	//// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	//// LIBRARIES
	// Make external markdown links open in a new tab safely.
	const md = markdownIt({
		html: true,
		linkify: true,
		typographer: true,
	}).use(markdownItLinkAttributes, {
		matcher: (href) => /^https?:\/\//.test(href),
		attrs: {
			target: "_blank",
			rel: "noopener noreferrer",
		},
	});
	eleventyConfig.setLibrary("md", md);

	// Watch CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");
	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	//// BUNDLES: Bundle CSS and JS to dist directory
	// Bundle <style> content and add a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		bundleHtmlContentFromSelector: "style",
	});

	// Bundle <script> content and adds a {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
		// Add all <script> content to the `js` bundle (use <script eleventy:ignore> to opt-out)
		bundleHtmlContentFromSelector: "script",
	});

	//// PLUGINS
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(embedEverythingPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "CGreciano's Blog",
			subtitle: "I write about tech, learning, and other things that interest me.",
			base: "https://christiangreciano.com/blog",
			author: {
				name: "Christian Greciano"
			}
		}
	});

	//// IMAGE OPTIMIZATION: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["avif", "webp", "auto"],

		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				loading: "lazy",
				decoding: "async",
			}
		},

		sharpOptions: {
			animated: true,
		},
	});

	//// FILTERS
	eleventyConfig.addPlugin(pluginFilters);

	//// ID ATTRIBUTE PLUGIN
	eleventyConfig.addPlugin(IdAttributePlugin, {
		// Uses Eleventy’s built-in `slugify` filter by default:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// Change path prefix to deploy to a different directory (default is ./_site/)
	// Absolute URLs will be prefixed with this path prefix thanks to
	// HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// (does **not** affect where things go in the output folder).

	// pathPrefix: "/",
};
