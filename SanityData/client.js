import {createClient} from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: 'leok3si4',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token :(import.meta.env).VITE_API_TOKEN
});

export const builder = imageUrlBuilder(client);
export const urlFor = (imgUrl) => builder.image(imgUrl);
