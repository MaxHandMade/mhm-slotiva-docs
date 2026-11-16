# MHM Slotiva Documentation

Source of the documentation site for **MHM Slotiva**, hourly appointment booking for WooCommerce:
https://maxhandmade.github.io/mhm-slotiva-docs/ (English) · https://maxhandmade.github.io/mhm-slotiva-docs/tr/ (Türkçe)

Built with [Docusaurus](https://docusaurus.io/). English is the source; Turkish lives under `i18n/tr/`.

```bash
npm ci
npm run build                 # English + Turkish
bash scripts/check-links.sh   # every internal link resolves under /mhm-slotiva-docs/
```

Every push to `main` builds, checks and deploys to GitHub Pages.
