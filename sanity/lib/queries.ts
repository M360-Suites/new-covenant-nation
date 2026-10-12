import { defineQuery } from "next-sanity";

// Example query — adjust the `_type` and fields to match your schema.
export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage
}`);
