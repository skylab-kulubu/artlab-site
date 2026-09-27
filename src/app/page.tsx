import { Site } from "@/components/Site";
import { getContent } from "@/content";
import { getTheme } from "@/themes";

export const revalidate = 3600;

export default async function Home() {
  return <Site content={await getContent()} theme={getTheme()} />;
}
