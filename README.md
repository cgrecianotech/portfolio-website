# portfolio-website
Christian Greciano's Portfolio Website, built with [Eleventy](https://www.11ty.dev/). Links to study materials (notes and flashcards) and a blog are accessible.

## TODO
- ~~Integrate existing non-Eleventy pages into Eleventy (Build whole website with Eleventy)~~
    - Images across website need to be fixed
    - Need to figure out CSS across whole site
    - Light/dark mode for non-blog
    - Footer cuts off blog posts forward and backward
- Experiment RSS feed without Atom


## Running locally

1. Install dependencies (first time)

```
npm install
```

2. Run Eleventy

Generate a production-ready build to the `_site` folder:

```
npm run build
```

Or build and host on a local development server:

```
npm run start
```

Run [debug mode](https://www.11ty.dev/docs/debugging/) to see all the internals.


## Deploying
- Read more about [Deploying an Eleventy project](https://www.11ty.dev/docs/deployment/) to the web.
