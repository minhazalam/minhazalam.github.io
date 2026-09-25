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

Keep copy brief and factual. Add a pipeline diagram only after checking the project repository's documentation. The portfolio does not automatically publish interview-preparation notes.

## Hosting

GitHub Pages serves production from `main` and the design preview from `feature/data-pipeline-design` under `/preview/`.

The site has no analytics or visitor counter.
