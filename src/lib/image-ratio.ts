import { readFile } from "node:fs/promises";
import path from "node:path";
import { inflateSync } from "node:zlib";
import { imageSize } from "image-size";

// The visible part of an image, as fractions of its full size.
export type Crop = { x: number; y: number; w: number; h: number };

export type ImageBox = { ratio: number; crop?: Crop };

// Measured once per address for as long as the server runs: an upload's address never changes.
const measured = new Map<string, Promise<ImageBox | undefined>>();

// A logo's aspect ratio, read from the image itself so editors never have to type one, and for a
// PNG the box its opaque pixels fill, so a logo uploaded with wide transparent margins is sized
// and shown by what can be seen. Site paths are read from public/, uploads from the CDN.
export function imageBox(src: string): Promise<ImageBox | undefined> {
  let box = measured.get(src);
  if (!box) {
    box = measure(src);
    measured.set(src, box);
  }
  return box;
}

async function measure(src: string): Promise<ImageBox | undefined> {
  try {
    const bytes = src.startsWith("/")
      ? new Uint8Array(await readFile(path.join(process.cwd(), "public", src)))
      : new Uint8Array(await (await fetch(src, { cache: "no-store" })).arrayBuffer());
    const { width, height } = imageSize(bytes);
    if (!width || !height) return undefined;
    const opaque = pngOpaqueBox(bytes);
    if (!opaque) return { ratio: width / height };
    const crop = { x: opaque.x / width, y: opaque.y / height, w: opaque.w / width, h: opaque.h / height };
    // Margins under 2% are not worth a crop
    if (crop.w > 0.98 && crop.h > 0.98) return { ratio: width / height };
    return { ratio: opaque.w / opaque.h, crop };
  } catch {
    measured.delete(src);
    return undefined;
  }
}

const PNG = [137, 80, 78, 71, 13, 10, 26, 10];
// Alpha at or below this counts as transparent, so a faint antialiased halo does not widen the box.
const CLEAR = 8;

// The bounding box of a PNG's visible pixels: 8-bit, non-interlaced RGBA, grey with alpha, or
// palette with a transparency chunk. Anything else, or an image with no transparency, gives none.
function pngOpaqueBox(b: Uint8Array) {
  if (!PNG.every((v, i) => b[i] === v)) return undefined;
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let pos = 8;
  let w = 0, h = 0, depth = 0, type = 0, interlace = 0;
  let trns: Uint8Array | undefined;
  const idat: Uint8Array[] = [];
  while (pos + 8 <= b.length) {
    const len = view.getUint32(pos);
    const name = String.fromCharCode(b[pos + 4], b[pos + 5], b[pos + 6], b[pos + 7]);
    const data = b.subarray(pos + 8, pos + 8 + len);
    if (name === "IHDR") {
      w = view.getUint32(pos + 8);
      h = view.getUint32(pos + 12);
      depth = data[8];
      type = data[9];
      interlace = data[12];
    } else if (name === "tRNS") trns = data;
    else if (name === "IDAT") idat.push(data);
    else if (name === "IEND") break;
    pos += 12 + len;
  }
  if (depth !== 8 || interlace !== 0) return undefined;
  const channels = type === 6 ? 4 : type === 4 ? 2 : type === 3 ? 1 : 0;
  if (!channels || (type === 3 && !trns)) return undefined;

  const raw = inflateSync(Buffer.concat(idat));
  const stride = w * channels;
  let prev = new Uint8Array(stride);
  let cur = new Uint8Array(stride);
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    const row = y * (stride + 1);
    const filter = raw[row];
    // Undo the row's filter (PNG spec §9) against the row above
    for (let i = 0; i < stride; i++) {
      const v = raw[row + 1 + i];
      const left = i >= channels ? cur[i - channels] : 0;
      const up = prev[i];
      const upLeft = i >= channels ? prev[i - channels] : 0;
      let out = v;
      if (filter === 1) out = v + left;
      else if (filter === 2) out = v + up;
      else if (filter === 3) out = v + ((left + up) >> 1);
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left), pb = Math.abs(p - up), pc = Math.abs(p - upLeft);
        out = v + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft);
      }
      cur[i] = out & 255;
    }
    for (let x = 0; x < w; x++) {
      const alpha = type === 3 ? (trns![cur[x]] ?? 255) : cur[x * channels + channels - 1];
      if (alpha > CLEAR) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        y1 = y;
      }
    }
    [prev, cur] = [cur, prev];
  }
  if (x1 < 0) return undefined;
  return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
