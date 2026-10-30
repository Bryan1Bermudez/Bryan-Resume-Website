# Bryan Bermudez — Resume Website

Personal resume / portfolio site. Plain HTML + CSS + a little vanilla JS, no build step.
Hosted on GitHub Pages from the `main` branch.

## Editing

- **Projects** live in `data/projects.js`. Each entry is one card; the comment at the top explains the fields.
  Entries with `hidden: true` are kept ready but not shown. Open the site with `?preview=1` to see them while editing.
- **Everything else** (hero, skills, experience, education, contact) is in `index.html`.
- **Screenshots / videos** go in `assets/projects/`.
- The downloadable resume is `Bryan_Bermudez_Resume.pdf` at the root. Replace the file to update it.
- When changing `css/style.css`, `js/main.js` or `data/projects.js`, bump the `?v=` on its tag in `index.html` so browsers pick up the change.

## Checking locally

```
python -m http.server 8000
```

Then open http://localhost:8000 (and http://localhost:8000/?preview=1 for hidden cards).
