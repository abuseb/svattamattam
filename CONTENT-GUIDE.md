# Updating the website

Open the website and choose **Edit website** in its footer (or visit `/edit`).
Sign in with the same ChatGPT account used to create the private Site.

1. Choose Profile, Books, Videos, or More links.
2. Edit English and Malayalam text side by side.
3. Add books or videos using the buttons at the bottom of each section.
4. Paste full `https://` links. YouTube watch links create video thumbnails automatically.
5. Select **Save changes**. Changes are stored in the website database and appear for all visitors.

A blank book-cover field uses a designed typographic title tile, not a reproduction of the book's cover. To show an actual cover, supply its HTTPS image URL. Portrait and cover images should be used with the relevant rights holder's permission.

Unsaved changes trigger a warning when leaving. If another session saves first, reload before editing again. Keep a copy of your changes before reloading.

## Access and launch

This first version is owner-private. The first successful save assigns the signed-in owner as editor. Save once while private **before** changing the audience. Future saves require that same editor identity. To authorize additional editors, update the server authorization deliberately; sharing a public link does not grant editing access. Public publication is a separate decision.

The Malayalam interface and summaries are draft translations for editorial review. Original English book titles remain in English where there is no verified Malayalam edition title.

## Project

- `app/content.ts`: initial content and validation
- `app/site.tsx`: bilingual visitor website
- `app/edit/editor.tsx`: editing form
- `app/api/content/route.ts`: durable content and editor authorization
- `db/schema.ts`, `drizzle/`: database schema and migration
- `app/globals.css`: responsive design

Once content is saved in D1, changing the initial content file does not overwrite it. Use the editor for subsequent content changes.
