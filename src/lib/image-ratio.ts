import { readFile } from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";

// A logo's aspect ratio, read from the image itself so editors never have to type one.
// Site paths are read from public/, uploads from the CDN (cached for a day).
export async function imageRatio(src: string): Promise<number | undefined> {
  try {
    const bytes = src.startsWith("/")
      ? await readFile(path.join(process.cwd(), "public", src))
      : new Uint8Array(await (await fetch(src, { next: { revalidate: 86400 } })).arrayBuffer());
    const { width, height } = imageSize(bytes);
    return width && height ? width / height : undefined;
  } catch {
    return undefined;
  }
}
