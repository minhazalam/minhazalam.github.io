# Portfolio frontend

Static React site deployed to GitHub Pages. It has no backend or writable storage. Project details and source code are linked from public GitHub repositories.

## Local development

```bash
yarn install --frozen-lockfile
yarn start
yarn build
```

## Update content

- `src/content/projects.json`: selected data engineering projects and the preparation repository. Each card links directly to its GitHub repository.
- `src/content/profile.json`: short bio and social links.
- `src/content/certifications.json`: certification name, issuer, and verification URL.
- `src/content/writing.json`: the writing index and article content. Add a new article here with a unique slug, date, summary, tags (use topics such as Spark, SQL, AWS, dbt, and optimization), and body blocks. The site bundles this JSON at build time, so changes are published with the next GitHub Pages deployment; no backend or separate storage service is needed.

Writing format: each article is an object in `articles`. Supported body blocks are `p` (text), `h2` (text), `list` (items), `code` (lang and code), and `quote` (text). Keep the title, summary, and tags concise so the portfolio remains scannable. The full article text is versioned in GitHub with the site.

The `/recruiter` page is a compact overview of skills, selected GitHub projects, and verified certification. The writing index is intentionally empty until personal notes are ready. Keep full notes in the preparation repository and feature only a few selected notes on the site.

The design preview is built from the `codex/minimal-redesign` branch and published at `/preview/`. The production root is built from `main`.

The GitHub Pages workflow runs on pushes to `main` and deploys the production build.
