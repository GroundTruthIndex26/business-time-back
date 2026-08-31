import { ContentPage } from "@/components/ContentBlocks";
import { META, VS_TIME_TRACKING_PAGE } from "@/content/site";

export default function VsTimeTracking() {
  return (
    <ContentPage page={VS_TIME_TRACKING_PAGE} meta={META.vsTimeTracking} />
  );
}
