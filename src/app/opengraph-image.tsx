import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { palettes } from "@/lib/env";
import { formatDateRange } from "@/lib/format";

export const alt = "ARTLAB · Yapay Zeka Zirvesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs a TTF or OTF; without a user agent Google Fonts serves TTF.
async function font(family: string, weight: number, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const { edition } = await getContent();
  const sky = palettes.safak;
  const date = edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında";
  const line = `${edition.number}. EDİSYON · YAPAY ZEKA ZİRVESİ`;
  const place = `${edition.venue.campus} · ${edition.venue.name}`;
  const [display, body] = await Promise.all([
    font("Unbounded", 800, `ARTLAB${edition.slogan ?? ""}`),
    font("Manrope", 700, `${line}${date}${place}`),
  ]);
  const fonts = [
    display && { name: "Unbounded", data: display, weight: 800 as const },
    body && { name: "Manrope", data: body, weight: 700 as const },
  ].filter((f) => f !== null);

  const bands = [sky.sky1, sky.sky2, sky.sky3, sky.sky4, sky.sky5, sky.sky6];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0B0E13", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, display: "flex", flexDirection: "column" }}>
          {bands.map((c, i) => (
            <div key={c} style={{ display: "flex", flex: i === 0 ? 7 : 1, background: c }} />
          ))}
          <div style={{ display: "flex", height: 250, background: sky.mid }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 1010,
            top: 250,
            width: 110,
            height: 110,
            borderRadius: 110,
            background: sky.sun,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 34,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Unbounded",
            fontSize: 176,
            fontWeight: 800,
            letterSpacing: 6,
            color: "#F5B82E",
          }}
        >
          ARTLAB
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 230, background: "#0B0E13", display: "flex" }} />
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 52,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            fontFamily: "Manrope",
            fontWeight: 700,
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#F5B82E" }}>{line}</div>
          {edition.slogan && (
            <div style={{ fontFamily: "Unbounded", fontSize: 50, fontWeight: 800, color: "#E9EDF2" }}>{edition.slogan}</div>
          )}
          <div style={{ fontSize: 26, color: "#C9D1DB" }}>{`${date} · ${place}`}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
