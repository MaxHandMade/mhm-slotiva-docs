# Documentation screenshots

`node scripts/shots/shots.mjs [--only wizard|checklist|admin|license|checkout] [--locale en|tr]`

Takes every screenshot used in the docs from a **local development site** running the documented Slotiva version and writes
`static/img/docs/<group>/<name>-<locale>.webp` (admin 1280 px, customer checkout 390 px).

Needs: Node 20+, Google Chrome, the plugin's local Docker stack running. Defaults can be changed with `CHROME_PATH`,
`SLOTIVA_SITE`, `SLOTIVA_COMPOSE` and `SLOTIVA_PRODUCT`.

It changes the dev site only for the duration of the run and undoes every change, also on error: a temporary admin user,
the admin language per pass, the site language for the customer pass, product names per language, the product and customer
names stored on open appointments and the closed-day notes (English names on English shots), a short "no bookable product"
state for the checklist shot, and one guest test order per language (cancelled right after its screenshot). Wizard steps 3
and 5 open on `SLOTIVA_PRODUCT`, so a product that keeps its own length shows that note.
License states are shown by answering the license screen's request inside the browser, so no license server is needed.

Check every image before committing: all data must be fake.
