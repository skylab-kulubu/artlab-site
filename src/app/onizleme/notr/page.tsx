import type { Metadata } from "next";
import { Site } from "@/components/Site";
import { getContent } from "@/content";
import { getTheme } from "@/themes";

export const metadata: Metadata = { title: "Nötr tema önizlemesi", robots: { index: false, follow: false } };

// The site with no theme package and no slogan: the default every year starts from, kept rendering as a test case.
export default async function NeutralPreview() {
  const content = await getContent();
  return <Site content={{ ...content, edition: { ...content.edition, slogan: undefined } }} theme={getTheme("notr")} intro={false} />;
}
