# Portfolio Website Blog

This is the blog section of Christian Greciano's portfolio website, built with [Eleventy](https://www.11ty.dev/) v3.0.

## About

This blog contains study notes, flashcards, and insights on AWS, AI, and cloud computing. It's designed to be served as a subdirectory (`/blog/`) of the main portfolio website.

## Getting Started

1. Navigate to the blog directory:
```bash
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Build the blog for production:
```bash
npm run build
```

4. Or build and serve locally for development:
```bash
npm start
```

## Build Scripts

- `npm run build` - Build the blog to the `_site` folder
- `npm run build-blog` - Build with proper `/blog/` path prefix
- `npm start` - Build and serve locally for development
- `npm run start-blog` - Build and serve with proper `/blog/` path prefix

## Configuration

The blog is configured to:
- Output to the `_site` directory
- Use `/blog/` as the path prefix for all URLs
- Include navigation back to the main portfolio site
- Generate proper sitemaps and feeds

## Features

- **Static Site Generation**: Zero-JavaScript output for maximum performance
- **Content-Driven Navigation**: Automatic navigation menu based on content
- **Image Optimization**: Automated image processing with modern formats (AVIF, WebP)
- **Syntax Highlighting**: Built-in code syntax highlighting
- **Tag System**: Automatic tag page generation
- **RSS Feed**: Atom feed for blog posts
- **Responsive Design**: Mobile-friendly layouts
- **Performance Focused**: Optimized for speed and accessibility

## File Structure

```
blog/
├── _site/           # Generated output (don't edit)
├── content/         # Blog content and pages
├── _includes/       # Layout templates
├── _data/           # Site metadata and configuration
├── css/             # Stylesheets
├── public/          # Static assets
└── eleventy.config.js # Eleventy configuration
```

## Integration with Main Site

The blog is designed to integrate seamlessly with your main portfolio website:
- All internal links use the `/blog/` prefix
- Navigation includes a "Back to Main Site" link
- Assets and styles are self-contained
- Sitemap and feeds work correctly from the subdirectory

## Deployment

After building with `npm run build-blog`, the contents of the `_site` directory can be deployed to your web server in the `/blog/` subdirectory.
