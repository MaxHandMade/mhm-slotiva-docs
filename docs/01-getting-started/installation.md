---
sidebar_position: 1
title: Installation
description: Requirements, installing the ZIP, and what happens on activation.
---

# Installation

## Requirements

| | Minimum |
|---|---|
| WordPress | 7.0 |
| PHP | 8.1 |
| WooCommerce | 11.2 |
| Database | MySQL or MariaDB with InnoDB |
| Checkout page | Must use the WooCommerce **Checkout block** |

Slotiva is tested up to WordPress 7.1 and WooCommerce 11.3.

:::warning The checkout page must use the Checkout block
The time picker lives inside the WooCommerce **Checkout block**. The classic checkout (the `[woocommerce_checkout]` shortcode)
cannot sell bookable services. If your checkout page is still classic, Slotiva shows a warning in WordPress admin, and the setup
wizard offers a button that opens the page so you can convert it to blocks.
:::

## Install the plugin

Slotiva is a paid plugin sold at [wpalemi.com](https://wpalemi.com/account/); it is not on WordPress.org.

1. Download the ZIP file from your wpalemi.com account.
2. In WordPress go to **Plugins → Add Plugin → Upload Plugin**, choose the ZIP and click **Install Now**.
3. Click **Activate**.

## What happens on activation

Right after you activate it, Slotiva opens the **setup wizard**. It walks you through your service, your working hours, your
bookable product and a check of your checkout page. Continue with [the setup wizard](./setup-wizard.md).

You can also choose **Skip for now, I'll finish later**. Until the setup is complete, a checklist on **Slotiva → Appointments**
shows what is still missing, and you can open the wizard again at any time from **Slotiva → Settings**.

## License

Booking, payments, emails and every admin screen work **without a license**. A license turns on updates and support. You can
enter your key later on **Slotiva → License** — see [License](../04-license-support/license.md).

## Updating

While your license is active, Slotiva tells you when a new version is out: on the **Plugins** screen under Slotiva, and at the top
of **Slotiva → License**. To update:

1. Download the new ZIP from your wpalemi.com account.
2. Go to **Plugins → Add Plugin → Upload Plugin** and upload it.
3. WordPress asks whether to replace the installed version with the uploaded one — choose **Replace current with uploaded**.

Your appointments, working hours and settings are kept. Updating does not open the setup wizard again.
