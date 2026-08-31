import { ContentPage } from "@/components/ContentBlocks";
import { META, PRIVACY_PAGE } from "@/content/site";

export default function Privacy() {
  return <ContentPage page={PRIVACY_PAGE} meta={META.privacy} />;
}
