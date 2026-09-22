import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source) {
  return builder.image(source);
}
