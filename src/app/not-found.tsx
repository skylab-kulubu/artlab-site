import { ScenePage, type SceneData } from "@/components/error/ScenePage";
import notFound from "@/error-scenes/notFound.json";

// The club's 404 scene (skylcn-ui's error scenes, src/error-scenes), a random drawing on each visit.
export default function NotFound() {
  return <ScenePage scene={notFound as SceneData} href="/" />;
}
