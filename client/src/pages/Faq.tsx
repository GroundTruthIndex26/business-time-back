import { ContentPage } from "@/components/ContentBlocks";
import { FAQ_PAGE, META } from "@/content/site";

export default function Faq() {
  return <ContentPage page={FAQ_PAGE} meta={META.faq} />;
}
