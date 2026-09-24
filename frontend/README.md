# Frontend guide

This app is a static React site built with Create React App and CRACO. It needs no backend: content ships with the build, user interactions run in the browser, and GitHub Pages serves the result.

## Commands

```bash
yarn install
yarn start
yarn build
```

`yarn start` runs the local development server. `yarn build` creates the deployable static site in `build/`.

## Content editing

Content is imported from `src/content/index.js` and lives in these JSON files:

| File | Purpose |
| --- | --- |
| `profile.json` | Name, role, bio, social links, and contact details |
| `projects.json` | Project cards and case study content |
| `experience.json` | Work history |
| `skills.json` | Skills grouped by area |
| `writing.json` | Articles and notes |
| `certifications.json` | Certifications |
| `architecture.json` | Example pipeline architecture |
| `lab.json` | Interactive engineering lab topics |

Keep project entries factual. Use `github` for the canonical repository URL and add supporting docs or demo links to the project content when those repositories contain them. Avoid putting secrets or private information in this public repository.

## Storage and external links

The site has no writable storage. The JSON content is stored in Git history. Put code, datasets, diagrams, and downloadable files in GitHub repositories, then link to those resources. The optional repository listing reads public repositories from GitHub's unauthenticated API; it can be rate-limited, so the portfolio content itself remains available independently.

Resume links point to `https://github.com/minhazalam/resume`; add a PDF to that public repository or update `RESUME_URL` in `src/lib/api.js`. Contact is handled through a `mailto:` link.

## Hosting

The repository-level workflow builds this folder and deploys it to GitHub Pages on pushes to `main`. Routes use `HashRouter` and the build uses relative assets, which supports project pages at the GitHub Pages subpath without server rewrites. Configure **Settings → Pages → GitHub Actions** once in the repository.
