# Editing your GitHub Pages website

## Change text or a link

1. Sign in to GitHub as `abuseb` (or an authorized repository collaborator).
2. Open https://github.com/abuseb/svattamattam/edit/main/content/site.json — also linked as **Edit website** at the bottom of the website.
3. Find the field you want to change. `en` is English; `ml` is Malayalam.
4. Change only the text between quotation marks. Keep commas and brackets intact. Use `\n` for a line break and `\"` for a quotation mark inside text.
5. Select **Commit changes**, enter a short description, and commit to `main`.
6. Open the repository's **Actions** tab. Wait for **Publish author website** to show a green check, then refresh https://abuseb.github.io/svattamattam/.

## Add books, videos or links

Copy one complete item in the relevant array, add a comma between items, and replace its fields. Give each item a unique `id`.

- Books: title, description and category each have `en` and `ml` fields. `language` must be `English` or `Malayalam`. Set `url` to the publisher/book page. A blank `cover` uses the designed title tile.
- Videos: provide bilingual title/description and the YouTube watch URL, for example `https://www.youtube.com/watch?v=VIDEO_ID`.
- Links: provide a bilingual title and full HTTPS URL.
- Images: upload to `public/images/` and reference `/images/filename.jpg`, or use a full HTTPS image URL.

To remove an item, delete its complete object and adjust the adjacent comma. The workflow checks the content before publishing; a failed build leaves the previous website live. GitHub's file history lets you recover earlier content.

## What gets published?

GitHub builds only the static Pages entry point and publishes `dist-pages/`. No database, login server, or ChatGPT account is needed to view the public website. The old Sites browser editor does not update this GitHub version.

## Design changes

Edit `app/site.tsx` or `app/globals.css`, run `npm run build:pages`, and push to `main`, or ask Codex to do this. Public visitors can read the source repository, but cannot edit it without repository permissions.
