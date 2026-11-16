// Documentation screenshots for MHM Slotiva, taken from a local dev site running the documented version.
//
//   node scripts/shots/shots.mjs [--only <group>] [--locale en|tr]
//
// Groups: wizard, checklist, admin, license, checkout. Output: static/img/docs/<group>/<name>-<locale>.webp
//
// What it touches on the DEV site (every change is undone in `finally`, also on error):
// - creates admin user `docs` (random password generated here, passed to wp-cli via env, never written) and deletes it;
// - sets that user's `locale` meta per pass (en_US / tr_TR) — admin screens follow it;
// - switches the SITE language for the customer pass (front end follows the site, not the user) and restores it;
// - `checklist`: marks every bookable product non-bookable for one shot, then restores the exact previous values;
// - renames the products in PRODUCT_NAMES per locale and restores the original titles;
// - `checkout`: places one guest bank-transfer order with fake `qa-` data for the "order received" shot, then cancels it.
// It never reads secrets. Data on screen must be fake: check every image before committing.
import { execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = join(ROOT, 'static', 'img', 'docs');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SITE = process.env.SLOTIVA_SITE || 'http://slotiva-dev.localhost';
const COMPOSE = process.env.SLOTIVA_COMPOSE || 'C:/projects/urunler/slotiva/mhm-slotiva/docker/docker-compose.yml';
const PRODUCT = process.env.SLOTIVA_PRODUCT || '12';
const LOCALES = { en: 'en_US', tr: 'tr_TR' };
// Product names shown in screenshots, per locale (dev data is Turkish). Originals are restored at the end.
const PRODUCT_NAMES = { en: { 11: 'Consultation', 12: 'Private lesson' }, tr: { 11: 'Danışmanlık', 12: 'Birebir ders' } };

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
const onlyLocale = args.includes('--locale') ? args[args.indexOf('--locale') + 1] : null;
const want = (g) => !only || only === g;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function wp(cmd, env = {}) {
  return execFileSync('docker', ['compose', '-f', COMPOSE, 'exec', '-T', ...Object.keys(env).flatMap((k) => ['-e', k]), 'wpcli', 'sh', '-c', `wp ${cmd}`], {
    env: { ...process.env, ...env, MSYS_NO_PATHCONV: '1' },
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

const lic = (o) => ({
  state: 'inactive', reason: '', key_masked: null, expires_at: null, days_left: null, updates: false, last_check_at: null,
  latest_version: null, current_version: '1.0.2', download_url: 'https://wpalemi.com/download/mhm-slotiva', dev_blocked: false,
  grace_until: null, account_url: 'https://wpalemi.com/account/', buy_url: '', ...o,
});
const day = (d) => new Date(Date.now() + d * 864e5).toISOString().replace(/\.\d+Z$/, 'Z');
const KEY = 'SLTV-••••-••••-••••';
const LICENSE = {
  inactive: lic({}),
  active: lic({ state: 'active', key_masked: KEY, expires_at: day(300), days_left: 300, updates: true, last_check_at: day(0) }),
  expiring: lic({ state: 'expiring', key_masked: KEY, expires_at: day(9), days_left: 9, updates: true, last_check_at: day(0) }),
  expired: lic({ state: 'expired', reason: 'expired', key_masked: KEY, expires_at: day(-3), days_left: 0, last_check_at: day(0) }),
  unverified: lic({ state: 'expired', reason: 'unverified', key_masked: KEY, expires_at: day(200), days_left: 200, last_check_at: day(-9) }),
  offline: lic({ state: 'grace', reason: 'offline', key_masked: KEY, expires_at: day(200), days_left: 200, updates: true, last_check_at: day(-2), grace_until: day(5) }),
};

async function main() {
  const password = randomBytes(18).toString('base64url');
  const undo = [];
  const siteLocale = wp("eval 'echo get_locale();'");
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const files = [];
  try {
    wp('user create docs docs@example.test --role=administrator --display_name=Docs --user_pass="$DOCS_PASS" --porcelain', { DOCS_PASS: password });
    undo.push(() => wp('user delete docs --reassign=1 --yes'));
    const originalNames = Object.fromEntries(Object.keys(PRODUCT_NAMES.en).map((id) => [id, wp(`post get ${id} --field=post_title`)]));
    undo.push(() => { for (const [id, name] of Object.entries(originalNames)) wp(`post update ${id} --post_title="$NAME"`, { NAME: name }); });
    const page = await browser.newPage();
    let mock = null;
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      if (mock && r.method() === 'GET' && /license(\?|$|&)/.test(r.url()) && /wp-json|rest_route/.test(r.url())) {
        return r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) });
      }
      return r.continue();
    });

    const shot = async (group, name, locale, opts = {}) => {
      const dir = join(OUT, group);
      mkdirSync(dir, { recursive: true });
      const file = join(dir, `${name}-${locale}.webp`);
      await page.addStyleTag({ content: '#wpadminbar{display:none!important}html.wp-toolbar{padding-top:0!important}' + (opts.css || '') });
      await sleep(400);
      if (opts.selector) {
        const el = await page.$(opts.selector);
        await el.screenshot({ path: file, type: 'webp', quality: 85 });
      } else {
        await page.screenshot({ path: file, type: 'webp', quality: 85, fullPage: !!opts.full });
      }
      files.push(file.replace(ROOT, '.'));
    };
    const go = async (path, w = 1280, h = 900, wait = 1800) => {
      await page.setViewport({ width: w, height: h });
      await page.goto(SITE + path, { waitUntil: 'networkidle2' });
      await sleep(wait);
    };

    await page.goto(`${SITE}/wp-login.php`, { waitUntil: 'networkidle2' });
    await page.type('#user_login', 'docs');
    await page.type('#user_pass', password);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.click('#wp-submit')]);

    for (const [loc, wpLocale] of Object.entries(LOCALES)) {
      if (onlyLocale && onlyLocale !== loc) continue;
      wp(`user meta update docs locale ${wpLocale}`);
      for (const [id, name] of Object.entries(PRODUCT_NAMES[loc])) wp(`post update ${id} --post_title="$NAME"`, { NAME: name });

      if (want('wizard')) {
        for (let s = 0; s <= 5; s++) {
          await go(`/wp-admin/admin.php?page=slotiva-setup&step=${s}`);
          await shot('wizard', `step-${s}`, loc);
        }
      }
      if (want('checklist')) {
        const ids = wp("post list --post_type=product --meta_key=_slotiva_enabled --meta_value=yes --field=ID").split(/\s+/).filter(Boolean);
        try {
          for (const id of ids) wp(`post meta update ${id} _slotiva_enabled no`);
          await go('/wp-admin/admin.php?page=slotiva');
          await shot('checklist', 'checklist', loc, { selector: '.slotiva-checklist' });
        } finally {
          for (const id of ids) wp(`post meta update ${id} _slotiva_enabled yes`);
        }
      }
      if (want('admin')) {
        await go('/wp-admin/admin.php?page=slotiva');
        await shot('admin', 'appointments', loc);
        const rid = wp("db query \"SELECT id FROM wp_slotiva_reservations WHERE status='confirmed' ORDER BY id DESC LIMIT 1\" --skip-column-names");
        await go(`/wp-admin/admin.php?page=slotiva&view=detail&id=${rid}`);
        await shot('admin', 'appointment-detail', loc);
        await go('/wp-admin/admin.php?page=slotiva-schedule');
        await shot('admin', 'working-hours', loc, { full: true });
        await go('/wp-admin/admin.php?page=slotiva-settings');
        await shot('admin', 'settings', loc, { full: true });
        await go(`/wp-admin/post.php?post=${PRODUCT}&action=edit#slotiva_product_data`, 1280, 900, 3000);
        await shot('admin', 'product-tab', loc, { selector: '#woocommerce-product-data' });
      }
      if (want('license')) {
        for (const [view, body] of Object.entries(LICENSE)) {
          mock = body;
          await go('/wp-admin/admin.php?page=slotiva-license');
          await shot('license', view, loc);
        }
        mock = null;
      }
      if (want('checkout')) {
        // Front end follows the SITE language: switch for this pass, restore afterwards.
        wp(`site switch-language ${wpLocale}`);
        try {
          const guest = await browser.createBrowserContext();
          const g = await guest.newPage();
          const gshot = async (name, sel) => {
            const dir = join(OUT, 'checkout');
            mkdirSync(dir, { recursive: true });
            const file = join(dir, `${name}-${loc}.webp`);
            // WooCommerce snackbar notices ("quantity changed to 2") float over the picker: hide them for the shot.
            await g.addStyleTag({ content: '.wc-block-components-notices__snackbar,.wc-block-components-notice-snackbar-list{display:none!important}' });
            await g.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), sel || 'body');
            await sleep(300);
            const el = sel ? await g.$(sel) : null;
            await (el || g).screenshot({ path: file, type: 'webp', quality: 85 });
            files.push(file.replace(ROOT, '.'));
          };
          await g.setViewport({ width: 390, height: 844 });
          await g.goto(`${SITE}/?add-to-cart=${PRODUCT}`, { waitUntil: 'networkidle2' });
          const co = wp("eval 'echo wp_make_link_relative(wc_get_checkout_url());'");
          await g.goto(SITE + co, { waitUntil: 'networkidle2' });
          await g.waitForSelector('.slotiva-picker', { timeout: 20000 });
          await sleep(2000);
          await gshot('picker-empty', '.slotiva-picker');
          const fill = async (sel, v) => { const h = await g.$(sel); if (h) { await h.click({ clickCount: 3 }); await h.type(v); } };
          await fill('#email', 'qa-customer@example.test');
          await fill('#billing-first_name', 'Qa');
          await fill('#billing-last_name', 'Customer');
          await fill('#billing-address_1', 'Example street 1');
          await fill('#billing-city', 'Istanbul');
          await fill('#billing-postcode', '34000');
          if (await g.$('#billing-state')) {
            const v = await g.evaluate(() => [...document.querySelectorAll('#billing-state option')].map((o) => o.value).find((x) => x));
            if (v) await g.select('#billing-state', v);
          }
          await sleep(1500);
          await g.click('.wc-block-components-checkout-place-order-button');
          await sleep(2500);
          await gshot('picker-error', '.slotiva-picker');
          await g.evaluate(async () => {
            const pk = document.querySelector('.slotiva-picker');
            const slots = () => [...pk.querySelectorAll('button:not([disabled])')].filter((b) => /^\d{1,2}:\d{2}$/.test(b.textContent.trim()));
            // Earlier runs (or the other locale's order) may hold hours on the first day: move to a day with 3+ free hours.
            for (const d of [...pk.querySelectorAll('.slotiva-picker__day:not([disabled])')]) {
              if (slots().length >= 3) break;
              d.click(); await new Promise((r) => setTimeout(r, 1500));
            }
            slots()[1].click(); await new Promise((r) => setTimeout(r, 1200));
            // The chosen button now reads "✓ hh:mm" and drops out of slots(): the next free hour is slots()[1] again.
            slots()[1].click(); await new Promise((r) => setTimeout(r, 2500));
          });
          await gshot('picker-two-hours', '.slotiva-picker');
          await g.evaluate(() => document.querySelector('input[value="bacs"]')?.click());
          await sleep(800);
          await Promise.all([g.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }), g.click('.wc-block-components-checkout-place-order-button')]);
          await sleep(2000);
          const orderId = (g.url().match(/order-received[=/](\d+)/) || [])[1];
          const cancel = () => wp(`eval '$o=wc_get_order(${orderId}); if($o && !$o->has_status("cancelled")){$o->update_status("cancelled","Docs screenshot order");}'`);
          if (orderId) undo.push(cancel);
          await gshot('order-received', '.slotiva-appointment, [class*="slotiva-appointment"]');
          // Cancel now, not at the end: the held hours (and the per-visitor hold quota) must be free for the next locale's order.
          if (orderId) cancel();
          await guest.close();
        } finally {
          wp(`site switch-language ${siteLocale}`);
        }
      }
    }
  } finally {
    await browser.close();
    for (const fn of undo.reverse()) {
      try { fn(); } catch (e) { console.error('UNDO FAILED:', e.message); process.exitCode = 1; }
    }
  }
  console.log(files.join('\n'));
  console.log(`${files.length} images`);
}

main().catch((e) => { console.error(e); process.exit(1); });
