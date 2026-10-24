# Sebastian Vattamattam

A bilingual English/Malayalam author website with a protected browser editor.

## Content editing

Open `/edit` on the hosted Site, sign in, edit the forms, and save. See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for instructions and access details.

## Development

Requires Node.js 22.13 or later, npm, and Git.

```sh
npm run install:ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_empty_ken_ellis.sql
npm run dev
```

Apply the initial migration once per local database. Local and hosted content databases are separate. `npm run dev` provides a mock sign-in for local development only; production uses Sites authentication. Keep the Site private until the owner has saved once to establish the editor identity.

The Sites workflow builds, stores source, and publishes the project. Hosting identity is in `.openai/hosting.json`; preserve it for future updates.

## Checks performed

- TypeScript validation and production build.
- Desktop preview and a narrow mobile preview.
- English/Malayalam switching and book filtering.
- Browser editor save confirmed and persisted in the local database.
- Anonymous API writes rejected; cross-origin writes rejected.

See [SOURCES.md](SOURCES.md) for content provenance and editorial review notes.
