import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Head: Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}
		return array.slice(0, n);
	});

	// Min: Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// GetKeys: Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	// FilterTagList: remove the "all" and "posts" tags from the list of tags
	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	// Automatically prepend the blog image path to the image path
	eleventyConfig.addFilter("blogImagePath", imagePath =>
		`/images/blog-img/${imagePath}`
  	);

	// EstimatedReadingTime: Count words and calculate reading time of a string (usually blog post content)
	eleventyConfig.addFilter("estimatedReadingTime", (str, wordsPerMinute = 200) => {
		if (!str) return { "wordCount": 0, "readingTime": "~0 mins read" };

		// Remove HTML tags, then decode HTML entities, then trim spaces
		const textOnly = str.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
		// Split the text into words, then filter out empty words
		const wordsArray = textOnly ? textOnly.split(/\s+/).filter(word => word.length > 0) : [];
		const wordCount = wordsArray.length;
		
		// Calculate reading time
		const minutes = Math.ceil(wordCount / wordsPerMinute);
		const readingTime = minutes === 1 ? "~1 min read" : `~${minutes} mins read`;
		
		return { 
			"wordCount": wordCount,
			"readingTime": readingTime
		};
	});
};
