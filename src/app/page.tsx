import { Site } from "@/components/Site";
import { getContent } from "@/content";
import { getTheme } from "@/themes";

export default async function Home() {
  const content = await getContent();
  return <Site content={content} theme={getTheme(content.theme)} />;
}
