---
sidebar_position: 1
title: Kurulum
description: Gereksinimler, ZIP'in kurulması ve etkinleştirmede olanlar.
---

# Kurulum

## Gereksinimler

| | En az |
|---|---|
| WordPress | 7.0 |
| PHP | 8.1 |
| WooCommerce | 11.2 |
| Veritabanı | InnoDB ile MySQL ya da MariaDB |
| Ödeme sayfası | WooCommerce **Ödeme (Checkout) bloğu** kullanmalı |

Slotiva, WordPress 7.1 ve WooCommerce 11.3'e kadar test edildi.

:::warning Ödeme sayfası Ödeme (Checkout) bloğunu kullanmalı
Saat seçici WooCommerce **Ödeme bloğunun** içinde çalışır. Klasik ödeme sayfası (`[woocommerce_checkout]` kısa kodu) randevulu
hizmet satamaz. Ödeme sayfan hâlâ klasikse Slotiva yönetim panelinde bir uyarı gösterir; kurulum sihirbazı da sayfayı açıp bloğa
çevirmen için bir düğme sunar.
:::

## Eklentiyi kur

Slotiva, [wpalemi.com](https://wpalemi.com/account/) üzerinden satılan ücretli bir eklentidir; WordPress.org'da yoktur.

1. ZIP dosyasını wpalemi.com hesabından indir.
2. WordPress'te **Eklentiler → Eklenti ekle → Eklenti yükle**'ye git, ZIP'i seç ve **Şimdi kur**'a tıkla.
3. **Etkinleştir**'e tıkla.

## Etkinleştirince ne olur

Etkinleştirir etkinleştirmez Slotiva **kurulum sihirbazını** açar. Sihirbaz hizmetin, çalışma saatlerin, randevulu ürünün ve
ödeme sayfan için bir kontrolden geçirir. [Kurulum sihirbazı](./setup-wizard.md) ile devam et.

**Şimdilik atla, sonra bitiririm** de diyebilirsin. Kurulum tamamlanana kadar **Slotiva → Randevular** sayfasındaki bir liste
eksik kalanları gösterir; sihirbazı istediğin zaman **Slotiva → Ayarlar**'dan yeniden açabilirsin.

## Lisans

Randevu alma, ödemeler, e-postalar ve tüm yönetim ekranları **lisanssız da çalışır**. Lisans, güncellemeleri ve desteği açar.
Anahtarını sonra **Slotiva → Lisans**'a girebilirsin — bkz. [Lisans](../04-license-support/license.md).

## Güncelleme

Lisansın etkinken Slotiva yeni sürüm çıktığında haber verir: **Eklentiler** ekranında Slotiva'nın altında ve **Slotiva →
Lisans**'ın en üstünde. Güncellemek için:

1. Yeni ZIP'i wpalemi.com hesabından indir.
2. **Eklentiler → Eklenti ekle → Eklenti yükle**'ye git ve yükle.
3. WordPress kurulu sürümü yüklenenle değiştirmek isteyip istemediğini sorar — **Var olan yüklenen ile değiştirilsin**'i seç.

Randevuların, çalışma saatlerin ve ayarların korunur. Güncelleme kurulum sihirbazını yeniden açmaz.
