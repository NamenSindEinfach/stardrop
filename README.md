# Stardrop Blog

Stardrop is my personal blog about the popular farming game Stardew Valley. It started out as a project for my computer science class.

## Requirements

This blog is built with [11ty](https://www.11ty.dev/) which uses
[Node.js](https://nodejs.org/).

1. Install Node.js 20.x as described
   [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs#how-to-install-nodejs).

2. Install dependencies:

```console
npm install
```

## Development

Start the local development server:

```console
npm run start
```

You can then open a browser at [http://localhost:8080](http://localhost:8080).

## Build for production

Generate a production-ready build to the `_site` folder:

```console
npm run build
```

## Code organisation

- Configuration files:

  - `.eleventy.js`: Eleventy configuration file (see
    [here](https://www.11ty.dev/docs/config/)).
  - `.eleventyignore`: List of patterns for Eleventy to ignore.
  - `tailwind.config.js`, `postcss.config.js`:
    [Tailwind CSS configuration](https://tailwindcss.com/docs/configuration).

- Source directory (`src/`):
  - `assets/css/`: CSS file(s).
  - `assets/images/`: Images.
  - `bibbles/`: Main pages.
  - `posts/`: Blog posts.
  - `layouts/`: Layout files (see [here](https://www.11ty.dev/docs/layouts/)).
  - `includes/`: Snippets to be included in other templates.
  - `ìndex.njk`: Front page.

## Credits

This blog is based on this
[11ty starter project](https://github.com/aplauche/11ty-Rapid-Starter).
