import { ContentPage } from "@/components/ContentBlocks";
import { ABOUT_PAGE, META } from "@/content/site";

export default function About() {
  return <ContentPage page={ABOUT_PAGE} meta={META.about} />;
}
