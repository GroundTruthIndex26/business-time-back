import { ContentPage } from "@/components/ContentBlocks";
import { META, TERMS_PAGE } from "@/content/site";

export default function Terms() {
  return <ContentPage page={TERMS_PAGE} meta={META.terms} />;
}
