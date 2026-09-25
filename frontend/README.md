# Portfolio frontend

Static, single-page React site deployed to GitHub Pages. The page follows a pipeline from Source to Output. There is no backend or writable storage.

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
- `src/content/careerPipeline.json`: copy, sequence, and metadata for Source, Ingest, Transform, Serve, and Output.
- `src/content/projects.json`: includes each project's compact architecture sequence; the UI renders it as lineage.

The data files stay separate from the UI components. Keep project stages and career copy factual and concise. The site intentionally leaves out unverified education details and placeholder job dates.

Future personal notes should be authored as Markdown in the preparation repository. A small curated index can later let the static site fetch only selected notes; the full repository should not be listed automatically.

The design preview is built from the `feature/data-pipeline-design` branch and published at `/preview/`. The production root is built from `main`.

The GitHub Pages workflow runs on pushes to `main` and deploys the production build.
