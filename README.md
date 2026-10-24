# Sebastian Vattamattam

A bilingual English/Malayalam author website, published with GitHub Pages.

**Website:** https://abuseb.github.io/svattamattam/

## Edit the content

Open [content/site.json](https://github.com/abuseb/svattamattam/edit/main/content/site.json) on GitHub, edit the text or links, and choose **Commit changes** to save to `main`. The Publish author website workflow validates and publishes the change automatically. Only repository collaborators can commit changes.

See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for detailed instructions. The website footer's **Edit website** link opens this same file.

## Local development

Use Node.js 22.13 or later and npm:

```sh
npm ci
npm run dev:pages
```

Open the printed local URL with `/svattamattam/` appended if needed.

```sh
npm run build:pages
npm run preview:pages
```

- `content/site.json`: author information, bilingual descriptions, books and videos
- `app/site.tsx`: shared website layout
- `app/globals.css`: design and responsive layout
- `pages/`: GitHub Pages entry point
- `vite.pages.config.ts`: static build and repository URL prefix
- `.github/workflows/pages.yml`: automatic publication
- `public/images/`: website images

## Previous private version

The original Sites server/editor files and hosting identity are retained for recovery, but they are **not deployed to GitHub Pages**. GitHub Pages does not use the old database or `/edit` form. The two hosted versions do not automatically synchronize. Git history also retains the original implementation.

## Verification

The static build validates English and Malayalam fields and external links before publishing. An invalid edit fails the build and leaves the previous successful deployment live. Sources and editorial review notes are in [SOURCES.md](SOURCES.md).
