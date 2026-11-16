---
sidebar_position: 1
title: Frequently asked questions
description: Classic checkout, time zone warnings, payment methods, holds, emails and uninstalling.
---

# Frequently asked questions

## The time picker does not appear at checkout {#picker-missing}

Check two things:

1. **The checkout page uses the Checkout block.** The classic checkout (`[woocommerce_checkout]` shortcode) cannot sell bookable
   services; Slotiva shows a warning in WordPress admin when it is used. Open the checkout page in the editor, select the Classic
   Checkout block and choose **Transform into blocks**.
2. **The product in the cart is bookable:** **Bookable product** is ticked on its Slotiva tab.

## A customer sees no free times {#no-free-times}

The picker only offers times that are inside your working hours, not closed for that date, not already taken, and within the
booking window: from **Earliest booking** (default 24 hours ahead) to **Latest booking** (default 14 days ahead). A long product
length also needs a range long enough to fit it. Check **Slotiva → Working hours** and the product's Slotiva tab.

## The wizard says the time zone should be checked {#time-zone}

Your site uses a fixed UTC offset (for example UTC+3) instead of a city. A fixed offset does not follow daylight saving changes.
Choose your city in **Settings → General → Timezone**.

## The wizard says no payment method is enabled {#no-payment-method}

Customers cannot pay without one. Enable at least one payment method in **WooCommerce → Settings → Payments**. Bank transfer, card
payments and pay on site all work with Slotiva.

## What is the difference between "held" and "confirmed"? {#held-vs-confirmed}

**Held** means the customer has placed the order and is paying: nobody else can take the time, but the appointment is not booked
yet. When the payment arrives it becomes **Confirmed**. If it does not arrive within the hold time, the time opens again. See
[What your customers see](../03-daily-use/customer-checkout.md#while-paying).

## A customer says they cannot book: "too many bookings awaiting payment" {#too-many-holds}

To stop one visitor from holding many times without paying, Slotiva limits how many unpaid bookings can wait at once. The customer
should complete their earlier unpaid orders, or try again after those holds have run out.

## Customers do not receive the emails {#emails}

Slotiva's emails are WooCommerce emails. Check that each one is enabled in **WooCommerce → Settings → Emails** and that your site
can send email at all (WooCommerce's own order emails arrive). Many hosts need an SMTP plugin for reliable delivery.

## What happens to my data if I delete the plugin? {#uninstall}

By default it is **kept**: appointments, working hours and settings stay in the database, and you find them again if you install
Slotiva later. To remove everything when deleting the plugin, tick **Delete all Slotiva data when the plugin is deleted** on
**Slotiva → Settings** first. WooCommerce orders are never deleted. Your license key is always removed when the plugin is deleted.

## Does booking stop when my license ends? {#license-ends}

No. Booking, payments, emails and all admin screens keep working. Only updates and support stop. See
[License and support](../04-license-support/license.md#expired).
