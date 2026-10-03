"use client";

import { EditableList, useCmsBlock } from "inscribed";

// Declares every block the page renders from the server, so cms-sync registers it and the
// editing panel lists it with its fields. Renders nothing: the sections draw these values
// from getContent(). The literals are what cms-sync seeds an empty row with.
//
// A list's fields only reach the panel from a mounted EditableList, hence the lists here
// render no items of their own.

const none = () => null;

function Settings() {
  useCmsBlock("edisyon.yil", { blockType: "Number", defaultValue: 2026 });
  useCmsBlock("edisyon.numara", { blockType: "Number", defaultValue: 8 });
  useCmsBlock("edisyon.baslangic", { blockType: "Date", defaultValue: "2026-11-27T10:00:00+03:00" });
  useCmsBlock("edisyon.bitis", { blockType: "Date", defaultValue: "2026-11-27T18:00:00+03:00" });
  useCmsBlock("edisyon.kayitBaglantisi", { blockType: "Url", defaultValue: "https://skyl.app/artlab-katilimci-formu" });
  useCmsBlock("edisyon.sertifikaBaglantisi", { blockType: "Url", defaultValue: "" });
  useCmsBlock("edisyon.tema", {
    blockType: "Select",
    defaultValue: "2026",
    source: { kind: "static", values: ["2026", "notr"] },
  });

  useCmsBlock("bolumler.cekilis", { blockType: "Bool", defaultValue: true });
  useCmsBlock("bolumler.program", { blockType: "Bool", defaultValue: true });
  useCmsBlock("bolumler.konusmacilar", { blockType: "Bool", defaultValue: true });
  useCmsBlock("bolumler.fuaye", { blockType: "Bool", defaultValue: true });
  useCmsBlock("bolumler.arsiv", { blockType: "Bool", defaultValue: true });
  useCmsBlock("bolumler.destekciler", { blockType: "Bool", defaultValue: true });
  useCmsBlock("bolumler.sss", { blockType: "Bool", defaultValue: true });

  useCmsBlock("mekan.ad", { blockType: "ShortText", defaultValue: "Tarihi Hamam" });
  useCmsBlock("mekan.kampus", { blockType: "ShortText", defaultValue: "YTÜ Davutpaşa" });
  useCmsBlock("mekan.semt", { blockType: "ShortText", defaultValue: "Davutpaşa" });
  useCmsBlock("mekan.haritaBaglantisi", {
    blockType: "Url",
    defaultValue:
      "https://www.google.com/maps/place/Y%C4%B1ld%C4%B1z+Teknik+%C3%9Cniversitesi+Tarihi+Hamam/@41.0276248,28.8875133,18z/data=!4m6!3m5!1s0x14cabb133f838f69:0xcb444d1e45bc3b33!8m2!3d41.0275075!4d28.8899995!16s%2Fg%2F11r_tg6rcf",
  });

  useCmsBlock("iletisim.eposta", { blockType: "ShortText", defaultValue: "info@yildizskylab.com" });
  useCmsBlock("iletisim.instagram", { blockType: "Url", defaultValue: "https://www.instagram.com/ytuskylab" });

  useCmsBlock("program.not", { blockType: "LongText", defaultValue: "" });
  useCmsBlock("program.workshopSalonu", { blockType: "ShortText", defaultValue: "" });

  useCmsBlock("cekilis.kapanis", { blockType: "Date", defaultValue: "2026-11-26T23:59:00+03:00" });
  useCmsBlock("cekilis.temelSartlar", { blockType: "LongText", defaultValue: "Etkinliğe kayıtlı olman gerekiyor." });
  useCmsBlock("cekilis.ayrintiBaglantisi", { blockType: "Url", defaultValue: "" });

  useCmsBlock("fuaye.standSayisi", { blockType: "Number", defaultValue: 12 });
  useCmsBlock("fuaye.foto", {
    blockType: "Image",
    defaultValue: { src: "/img/fuaye.jpg", alt: "Tarihi Hamam fuayesinde stantları gezen katılımcılar" },
  });
  return null;
}

function Lists() {
  return (
    <>
      <EditableList
        blockPath="neden.maddeler"
        noInlineAdd
        itemSchema={{
          ikon: { blockType: "Select", defaultValue: "dinle", source: { kind: "static", values: ["dinle", "ag", "sertifika"] } },
          baslik: { blockType: "ShortText", defaultValue: "" },
          metin: { blockType: "LongText", defaultValue: "" },
        }}
        defaultValue={[
          {
            ikon: "dinle",
            baslik: "Öncü isimleri dinle",
            metin: "Sektörden ve akademiden konuşmacılar, yeni trendler ve teknolojiler.",
          },
          {
            ikon: "ag",
            baslik: "Ağını genişlet",
            metin: "Fuayede şirketlerle, konuşmacılarla ve diğer katılımcılarla tanış.",
          },
          { ikon: "sertifika", baslik: "Sertifikanı al", metin: "Katılımcılara etkinlik sonrasında online sertifika verilir." },
        ]}
      >
        {none}
      </EditableList>

      <EditableList
        blockPath="konusmacilar.liste"
        noInlineAdd
        itemSchema={{
          kimlik: { blockType: "ShortText", defaultValue: "" },
          ad: { blockType: "ShortText", defaultValue: "" },
          unvan: { blockType: "ShortText", defaultValue: "" },
          sirket: { blockType: "ShortText", defaultValue: "" },
          foto: { blockType: "Image", defaultValue: { src: "", alt: "" } },
          linkedin: { blockType: "Url", defaultValue: "" },
        }}
      >
        {none}
      </EditableList>

      <EditableList
        blockPath="program.oturumlar"
        noInlineAdd
        itemSchema={{
          gun: { blockType: "Number", defaultValue: 1 },
          baslangic: { blockType: "ShortText", defaultValue: "10:00" },
          bitis: { blockType: "ShortText", defaultValue: "10:45" },
          baslik: { blockType: "ShortText", defaultValue: "" },
          tur: {
            blockType: "Select",
            defaultValue: "seminer",
            source: { kind: "static", values: ["acilis", "seminer", "panel", "workshop", "ara"] },
          },
          salon: { blockType: "ShortText", defaultValue: "" },
          konusmacilar: { blockType: "ShortText", defaultValue: "" },
          altSatir: { blockType: "ShortText", defaultValue: "" },
        }}
      >
        {none}
      </EditableList>

      <EditableList
        blockPath="destekciler.liste"
        noInlineAdd
        itemSchema={{
          kimlik: { blockType: "ShortText", defaultValue: "" },
          ad: { blockType: "ShortText", defaultValue: "" },
          kademe: {
            blockType: "Select",
            defaultValue: "gumus",
            source: { kind: "static", values: ["altin", "gumus", "fuaye"] },
          },
          logo: { blockType: "Image", defaultValue: { src: "", alt: "" } },
          tekRenkLogo: { blockType: "Image", defaultValue: { src: "", alt: "" } },
          baglanti: { blockType: "Url", defaultValue: "" },
          fuayeNotu: { blockType: "ShortText", defaultValue: "" },
        }}
      >
        {none}
      </EditableList>

      <EditableList
        blockPath="cekilis.oduller"
        noInlineAdd
        itemSchema={{
          ad: { blockType: "ShortText", defaultValue: "" },
          gorsel: { blockType: "Image", defaultValue: { src: "", alt: "" } },
          sponsor: { blockType: "ShortText", defaultValue: "" },
          buyukOdul: { blockType: "Bool", defaultValue: false },
          cekilisSaati: { blockType: "ShortText", defaultValue: "17:30" },
          sartTuru: {
            blockType: "Select",
            defaultValue: "tum-oturumlar",
            source: { kind: "static", values: ["tum-oturumlar", "en-az-oturum", "ozel"] },
          },
          sart: { blockType: "ShortText", defaultValue: "" },
        }}
      >
        {none}
      </EditableList>

      <EditableList
        blockPath="arsiv.kareler"
        noInlineAdd
        itemSchema={{
          yil: { blockType: "Number", defaultValue: 2025 },
          tarih: { blockType: "ShortText", defaultValue: "" },
          foto: { blockType: "Image", defaultValue: { src: "", alt: "" } },
        }}
        defaultValue={[
          {
            yil: 2025,
            tarih: "11–12 Aralık",
            foto: { src: "/img/arsiv/2025-1.jpg", alt: "Bir katılımcı sponsor stantında oyun deniyor, çevresinde izleyenler" },
          },
          {
            yil: 2025,
            tarih: "11–12 Aralık",
            foto: { src: "/img/arsiv/2025-2.jpg", alt: "Oturum arasında fuayede toplanan katılımcılar" },
          },
          {
            yil: 2024,
            tarih: "25–26 Kasım",
            foto: { src: "/img/arsiv/2024-1.jpg", alt: "Katılımcılar bir stantta dizüstü bilgisayarlardaki demoları inceliyor" },
          },
          {
            yil: 2024,
            tarih: "25–26 Kasım",
            foto: { src: "/img/arsiv/2024-2.jpg", alt: "Bir katılımcı sanal gerçeklik gözlüğüyle bir demoyu deniyor" },
          },
          { yil: 2024, tarih: "25–26 Kasım", foto: { src: "/img/arsiv/2024-3.jpg", alt: "Katılımcılar fuayede sohbet ediyor" } },
          {
            yil: 2024,
            tarih: "25–26 Kasım",
            foto: { src: "/img/arsiv/2024-4.jpg", alt: "Tarihi Hamam fuayesinde stantların arasında sohbet eden katılımcılar" },
          },
        ]}
      >
        {none}
      </EditableList>

      <EditableList
        blockPath="sss.sorular"
        noInlineAdd
        itemSchema={{
          soru: { blockType: "ShortText", defaultValue: "" },
          cevap: { blockType: "LongText", defaultValue: "" },
        }}
        defaultValue={[
          {
            soru: "ARTLAB nedir?",
            cevap: "SKY LAB'in her yıl düzenlediği yapay zekâ zirvesi. Bu yıl sekizincisi gerçekleşiyor.",
          },
          { soru: "Sertifika verilecek mi?", cevap: "Katılımcılara etkinlik sonrasında online sertifika verilir." },
        ]}
      >
        {none}
      </EditableList>
    </>
  );
}

export function CmsFields() {
  return (
    <>
      <Settings />
      <Lists />
    </>
  );
}
