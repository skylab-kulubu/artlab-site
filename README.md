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

## İçerik yönetimi

Metinler ve görseller [inscribed](https://www.npmjs.com/package/inscribed) ile yönetilir; içerik Skylab'in CMS'inde, sitenin Keycloak istemcisi (`frontend-artlab`) adına tutulur.

- Ziyaretçiler yayınlanmış içeriği token'sız okur. Düzenleme yetkisi olan kişi (`cms:access`) `/api/signin` ile ya da core üzerinden giriş yapınca düzenleme panelleri görünür.
- Düzenlenebilir alanlar JSX içinde `EditableRegion` ile tanımlanır. `npm run cms-sync` bunları bulup CMS'e kaydeder; `defaultValue` yalnızca ilk kaydı tohumlar.
- Ortam değişkenleri `.env.example`'da. `CMS_URL` verilmezse site sandbox CMS'ini okur.
- Yerel geliştirme sandbox'a karşıdır. `.env.example`'daki `CMS_URL=http://localhost:3000/sandbox-api/api` ile tarayıcıdaki editör yalnız localhost'la konuşur; `npm run dev` `/sandbox-api/*` isteklerini sandbox API'sine iletir (`next.config.ts`, yalnız `next dev`; derlenen imaj bu yönlendirmeyi içermez). Kulübün kenarı `http://localhost:3000`'in kulüp adlarına çapraz kökenli istek atmasına izin vermez. Sandbox istemcisi `frontend-artlab` localhost dönüş adresini kabul etmediği için editör girişi sandbox sitesinde denenir.
- Görsel yüklemeleri `/api/cms-media` üzerinden core'a gider.

## Yayın

GitHub Actions her push'ta bir Docker imajı derleyip `ghcr.io/skylab-kulubu/artlab-site`'a gönderir ve ilgili Dokploy uygulamasını yeniden başlatır (`.github/workflows/image.yml`):

| Dal | İmaj etiketi | Ortam |
| --- | --- | --- |
| `main` | `sandbox` | sandbox-artlab.yildizskylab.com |
| `production` | `production` | artlab.yildizskylab.com |

Her imaj ayrıca commit'in kısa SHA'sıyla (`sha-…`) etiketlenir. Dokploy'u tetikleyen kancalar repo secret'larıdır: `DOKPLOY_SANDBOX_DEPLOY_HOOK`, `DOKPLOY_DEPLOY_HOOK`. Canlıya çıkmak, `production` dalını `main`'e ilerletmektir.

İmaj Next.js'in standalone çıktısını Node 22 üzerinde, root olmayan bir kullanıcıyla 3000 portunda çalıştırır. İmaja secret girmez; ortam değişkenleri çalışma anında Dokploy'dan gelir.

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

- **Tüm içerik tek kapıdan gelir:** `src/content/index.ts` içindeki `getContent()`. CMS bloklarını okur ve bileşenlerin kullandığı tiplere (`src/lib/types.ts`) çevirir; CMS'e ulaşılamazsa sayfa boş hâlleriyle açılır.
- **Renkler token'dır:** `src/app/globals.css` başındaki değişkenler. Bileşenlerde hex yazılmaz; marka yenilenirse yalnızca bu blok değişir.
- **Boş bölümler kendiliğinden gizlenir:** Çekiliş kapalıysa, sponsor yoksa ya da geçmiş yıl yoksa ilgili bölüm ve header pusulasındaki karşılığı kaybolur. Program ve konuşmacılar boşken "Yakında" kartı gösterir.
- **Etkinlik evresi tarihlerden hesaplanır:** geri sayım, canlı ve bitti. Hero paneli ve kayıt butonu buna göre değişir; kimsenin elle bir şey açıp kapatması gerekmez.

## Yeni yıl kurulumu

Eski site, devir teslimde bu bilgi kaybolduğu için iki yıl güncellenmedi. Her yıl bu listeyi baştan sona uygulayın:

İçerik CMS panelinden girilir; kod değişikliği yalnızca tema için gerekir.

1. **Edisyon** (panelde `edisyon.*`): yıl, edisyon numarası, başlangıç ve bitiş, kayıt formu ve sertifika bağlantıları, tema. Mekân `mekan.*`, iletişim `iletisim.*` altında.
2. **Tema:** Yeni tema paketini `src/themes/<yıl>/` altına ekleyin, `src/themes/index.ts`'e kaydedin ve `edisyon.tema` seçeneklerine ekleyin (`src/components/cms/CmsFields.tsx`). Paket hazır değilse panelden `notr` seçin; site maskotsuz ve motifsiz hâliyle eksiksiz çalışır.
3. **Slogan:** Hero'daki slogana tıklayıp yerinde değiştirin (`hero.slogan`).
4. **Duyurular:** Konuşmacılar (`konusmacilar.liste`), program (`program.oturumlar`; gün numarası ve "10:30" biçiminde saat), destekçiler (`destekciler.liste`; kategoriler `destekciler.kademeler`'de: kimlik, ad, sıra ve logo boyutu `lg`/`md`/`sm`; destekçinin `kademe` alanına kategorinin kimliği yazılır, eşleşmeyen destekçi son kategoride gösterilir) ve çekiliş ödülleri (`cekilis.oduller`) duyuruldukça girilir. Konuşmacıların oturumlara bağlanması için oturumun `konusmacilar` alanına konuşmacı kimliklerini virgülle yazın. Bölümler `bolumler.*` anahtarlarıyla tamamen gizlenebilir.
5. **Geçmiş yıllar:** Biten edisyonun fotoğraflarını `arsiv.kareler`'e yıl ve tarih etiketiyle ekleyin.
6. **Paylaşım:** Paylaşım kartı ve açıklama edisyon bilgilerinden otomatik üretilir; `/opengraph-image` adresinden doğrulayın.

Kodda yeni bir alan tanımlandığında (`EditableRegion`, `EditableList`, `useCmsBlock`) CMS'e kaydedilmesi için `cms-sync` çalıştırılmalıdır; sandbox ve production'da bunu altyapı ekibi yapar. `npm run cms-sync -- --dry-run` neyin kaydedileceğini gösterir.

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

- `?saat=21` (ya da `?saat=18.5`): Hero gökyüzünü o saate zorlar. Varsayılan olarak gökyüzü Davutpaşa'daki gerçek saati izler.
- İçeriğin boş hâlleri (program ve konuşmacılar "hazırlanıyor", gizlenen bölümler) CMS'te listeleri boşaltarak ya da `bolumler` anahtarlarını kapatarak sandbox'ta denenir.

## Hero hakkında

- Gökyüzü dört palet (gece, şafak, gündüz, alacakaranlık) arasında saate göre harmanlanır. Değerler `src/lib/env.ts` içindedir.
- Wordmark parçacıklardan oluşur ve gürültüden adım adım netleşir (`src/components/hero/diffusion.ts`); ilk boyamada statik SVG görünür, parçacıklar yüklenince onu yerinde devralır.
- Ortam hareketleri gerçek saate kilitlidir; sayfa yenilense de kaldığı yerden devam eder.
- Mobilde, dokunmatik cihazlarda ve "hareketi azalt" tercihinde parallax ve parçacıklar kapanır, statik hâl kalır.

---

SKY LAB · WEBLAB
