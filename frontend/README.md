# Portfolio frontend

Static, single-page React portfolio for selected data engineering projects, experience, and verified credentials. The design keeps pipeline diagrams scoped to systems whose architecture is documented in their own repositories; the portfolio does not label résumé sections as pipeline stages.

## Local development

Requirements: Node.js 20 and Yarn 1.

```bash
yarn install --frozen-lockfile
yarn start
```

Create a production build with `yarn build`.

## Update content

- `src/content/profile.json` — short bio, skills, and contact links.
- `src/content/projects.json` — selected repository links and technology tags.
- `src/content/experience.json` — role summary.
- `src/content/certifications.json` — credential names and verification URLs.

### Publish selected Markdown notes

`src/content/writing.json` is the publication allowlist. Add a note's title, summary, topic, date, slug, and exact `.md` source path there. The GitHub Pages workflow checks out `minhazalam/data-engineering-interview-prep`, copies only the listed Markdown files into the static build, and generates direct routes under `/writing/<slug>/`. A scheduled daily build refreshes selected note bodies from the source repository. Notes are rendered as Markdown, with a link back to each source file. No notes are published until they are listed in the manifest.

Example manifest entry:

```json
{
  "slug": "spark-skew",
  "title": "Handling skew in Spark joins",
  "summary": "A concise summary of the production scenario.",
  "topic": "Spark",
  "date": "2026-09-26",
  "sourceFile": "production-scenarios/spark/skew.md"
}
```

Keep copy brief and factual. Add a pipeline diagram only after checking the project repository's documentation. The portfolio does not automatically publish interview-preparation notes.

## Hosting

GitHub Pages serves production from `main` and the development preview from `dev` under `/preview/`. Use `feature/*` branches for changes, merge them into `dev` to preview, then merge approved work into `main`.

The selected data platform and interview preparation repositories have minimal overview pages under `/projects/<slug>/`. Their scope and folder links are maintained with the project entries in `src/content/projects.json`.

The site has no analytics or visitor counter.
