# ARTLAB

YTÜ SKY LAB'in yapay zekâ zirvesi ARTLAB'in sitesi: [artlab.yildizskylab.com](https://artlab.yildizskylab.com).

Site **yıldan bağımsız** kurgulanmıştır. Her yıl değişen her şey (tarihler, konuşmacılar, sponsorlar, slogan, maskot, hero sahnesinin yıllık figürü) veridir; kabuk (düzen, bileşenler, header pusulası, patika) kalıcıdır. Yeni bir yıl için kod yazmak gerekmemeli.

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi, tip kontrolü dahil
npm run lint
```

Next.js (App Router), React, Tailwind CSS 4, TypeScript. Sayfa statik üretilir ve saatte bir yeniden üretilir (`revalidate = 3600`).

## Dizinler

```
src/
  content/      İçerik. CMS gelene kadar buradaki dosyalar düzenlenir.
  themes/       Yıllık tema paketleri (maskot, pozlar, motifler, hero figürü) ve nötr tema.
  components/   Bölümler, header, footer, hero ve ortak arayüz parçaları.
  lib/          Tipler, evre hesabı, gökyüzü paleti, tarih biçimleri, logo boyutlama.
  app/          Sayfalar, metadata, paylaşım kartı, robots, sitemap, önizlemeler.
public/img/     Kulüp ve iş birliği logoları.
```

- **Tüm içerik tek kapıdan gelir:** `src/content/index.ts` içindeki `getContent()`. CMS bağlandığında yalnızca bu fonksiyon değişir; tipler (`src/lib/types.ts`) CMS şemasıyla aynıdır.
- **Renkler token'dır:** `src/app/globals.css` başındaki değişkenler. Bileşenlerde hex yazılmaz; marka yenilenirse yalnızca bu blok değişir.
- **Boş bölümler kendiliğinden gizlenir:** Çekiliş kapalıysa, sponsor yoksa ya da geçmiş yıl yoksa ilgili bölüm ve header pusulasındaki karşılığı kaybolur. Program ve konuşmacılar boşken "Yakında" kartı gösterir.
- **Etkinlik evresi tarihlerden hesaplanır:** geri sayım, canlı ve bitti. Hero paneli ve kayıt butonu buna göre değişir; kimsenin elle bir şey açıp kapatması gerekmez.

## Yeni yıl kurulumu

Eski site, devir teslimde bu bilgi kaybolduğu için iki yıl güncellenmedi. Her yıl bu listeyi baştan sona uygulayın:

1. **Edisyon kaydı** (`src/content/edition.ts`): yıl, edisyon numarası, başlangıç ve bitiş tarihleri (`+03:00` ile), mekân, kayıt formu bağlantısı (`registrationUrl`), sertifika bağlantısı, program notu.
2. **Tema:** Yeni tema paketini `src/themes/<yıl>/` altına ekleyin ve `src/themes/index.ts` içindeki `ACTIVE_THEME` değerini değiştirin. Paket hazır değilse `ACTIVE_THEME = "notr"` ile başlayın; site maskotsuz ve motifsiz hâliyle eksiksiz çalışır.
3. **Slogan** (opsiyonel): `edition.slogan`. Boş bırakılırsa hero'da "Yapay Zeka Zirvesi" yazar.
4. **Duyurular:** Konuşmacılar, program, sponsorlar ve çekiliş duyuruldukça ilgili dosyaya girilir. Konuşmacılar ve sponsorlar tek seferde duyurulur; o güne kadar bölümler "Yakında" ya da gizli kalır.
5. **Geçmiş yıllar:** Biten edisyonu `pastEditions` listesine ekleyin, varsa afişini ya da fotoğraflarını `cover` / `gallery` olarak verin.
6. **Paylaşım:** Paylaşım kartı ve açıklama edisyon kaydından otomatik üretilir. Derledikten sonra `/opengraph-image` adresine bakıp doğrulayın.

## Tema paketi

Bir yılın bütün yaratıcı malzemesi tek klasördedir (örnek: `src/themes/2026/`). Tipler `src/themes/types.ts` içindedir:

| Alan | Ne | Boşsa |
|---|---|---|
| `mascot.Logo` | Header'daki küçük kafa | Durak glifi (45° kare + cyan nokta) |
| `mascot.poses` | Bölüm başlıklarının üstünden bakan pozlar, bölüm kimliğine göre | Başlık çizimsiz durur |
| `mascot.Soon` / `Contact` / `Sleep` / `Loader` | "Yakında" kartı, iletişim kutusu, footer'da uyuyan robot, ilk ziyaret açılışı | Durak glifi ya da hiçbir şey |
| `Figure` | Hero'daki tam gövde figür | Hero figürsüz |
| `motifs` | Bölümlerin arkasındaki silik çizgi motifleri | Motif yok |
| `morphs` | Hero'daki parçacıkların ARTLAB'den sonra dönüştüğü şekiller | Yalnızca ARTLAB |
| `heroMode` | `parcacik` (noktalı wordmark, difüzyon) ya da `klasik` (outline wordmark) | |

**Nötr tema her zaman çalışmalıdır.** Hiçbir bileşen tema dosyası olmadan kırılmamalı.

## Önizleme ve test

- `/onizleme/notr`: Nötr tema, slogansız.
- `/onizleme/bos`: Hiçbir şey duyurulmamış edisyon; bütün boş hâller tek sayfada.
- `?saat=21` (ya da `?saat=18.5`): Hero gökyüzünü o saate zorlar. Varsayılan olarak gökyüzü Davutpaşa'daki gerçek saati izler.

Önizleme sayfaları arama motorlarına kapalıdır.

## Hero hakkında

- Gökyüzü dört palet (gece, şafak, gündüz, alacakaranlık) arasında saate göre harmanlanır. Değerler `src/lib/env.ts` içindedir.
- Wordmark parçacıklardan oluşur ve gürültüden adım adım netleşir (`src/components/hero/diffusion.ts`); ilk boyamada statik SVG görünür, parçacıklar yüklenince onu yerinde devralır.
- Ortam hareketleri gerçek saate kilitlidir; sayfa yenilense de kaldığı yerden devam eder.
- Mobilde, dokunmatik cihazlarda ve "hareketi azalt" tercihinde parallax ve parçacıklar kapanır, statik hâl kalır.

---

SKY LAB · WEBLAB
