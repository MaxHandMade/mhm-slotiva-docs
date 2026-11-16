---
sidebar_position: 1
title: Sık sorulan sorular
description: Klasik ödeme sayfası, saat dilimi uyarıları, ödeme yöntemleri, saat tutma, e-postalar ve kaldırma.
---

# Sık sorulan sorular

## Saat seçici ödeme sayfasında görünmüyor {#picker-missing}

İki şeyi kontrol et:

1. **Ödeme sayfası Ödeme (Checkout) bloğunu kullanıyor.** Klasik ödeme sayfası (`[woocommerce_checkout]` kısa kodu) randevulu hizmet
   satamaz; kullanılıyorsa Slotiva yönetim panelinde bir uyarı gösterir. Ödeme sayfasını düzenleyicide aç, Klasik Ödeme bloğunu seç
   ve “Bloklara dönüştür”ü seç.
2. **Sepetteki ürün randevulu:** Slotiva sekmesinde **Randevulu ürün** işaretli.

## Müşteri hiç boş saat görmüyor {#no-free-times}

Seçici yalnız çalışma saatlerinin içinde kalan, o tarih için kapatılmamış, alınmamış ve randevu aralığındaki saatleri gösterir:
**En erken** (varsayılan 24 saat sonrası) ile **En geç** (varsayılan 14 gün ileri) arası. Uzun bir ürün süresi, ona sığacak kadar
uzun bir aralık da ister. **Slotiva → Çalışma saatleri**'ni ve ürünün Slotiva sekmesini kontrol et.

## Sihirbaz saat diliminin kontrol edilmesi gerektiğini söylüyor {#time-zone}

Siten şehir yerine sabit bir UTC ofseti (örneğin UTC+3) kullanıyor. Sabit ofset yaz saati değişikliklerini izlemez. Şehrini
**Ayarlar → Genel → Saat dilimi**'nden seç.

## Sihirbaz açık ödeme yöntemi olmadığını söylüyor {#no-payment-method}

Ödeme yöntemi olmadan müşteri ödeme yapamaz. **WooCommerce → Ayarlar → Ödemeler**'den en az bir ödeme yöntemini aç. Havale, kartla
ödeme ve işletmede ödeme Slotiva ile çalışır.

## "Tutuluyor" ile "Onaylı" arasındaki fark nedir? {#held-vs-confirmed}

**Tutuluyor**, müşterinin siparişi verdiği ve ödediği anlamına gelir: saati başkası alamaz ama randevu henüz kesinleşmedi. Ödeme
gelince **Onaylı** olur. Tutma süresi içinde gelmezse saat yeniden açılır. Bkz.
[Müşterinin gördükleri](../03-daily-use/customer-checkout.md#while-paying).

## Müşteri randevu alamadığını söylüyor: "ödeme bekleyen çok fazla randevun var" {#too-many-holds}

Bir ziyaretçinin ödemeden çok sayıda saati tutmasını önlemek için Slotiva, aynı anda bekleyebilecek ödenmemiş randevu sayısını
sınırlar. Müşteri önceki ödenmemiş siparişlerini tamamlamalı ya da o tutmaların süresi dolunca yeniden denemeli.

## Müşterilere e-postalar gelmiyor {#emails}

Slotiva'nın e-postaları WooCommerce e-postalarıdır. Her birinin **WooCommerce → Ayarlar → E-postalar**'da açık olduğunu ve sitenin
genel olarak e-posta gönderebildiğini (WooCommerce'in kendi sipariş e-postalarının geldiğini) kontrol et. Birçok barındırma
güvenilir teslim için bir SMTP eklentisi ister.

## Eklentiyi silersem verilerime ne olur? {#uninstall}

Varsayılan olarak **korunur**: randevular, çalışma saatleri ve ayarlar veritabanında kalır; Slotiva'yı sonra yeniden kurarsan onları
bulursun. Eklentiyi silerken her şeyi kaldırmak için önce **Slotiva → Ayarlar**'da **Eklenti silinince tüm Slotiva verilerini sil**'i
işaretle. WooCommerce siparişleri hiçbir zaman silinmez. Eklenti silinince lisans anahtarın her zaman kaldırılır.

## Lisansım bitince randevu alma durur mu? {#license-ends}

Hayır. Randevu alma, ödemeler, e-postalar ve tüm yönetim ekranları çalışmaya devam eder. Yalnız güncellemeler ve destek durur.
Bkz. [Lisans ve destek](../04-license-support/license.md#expired).
