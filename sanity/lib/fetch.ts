import "server-only";

import type { QueryParams } from "next-sanity";

import { client } from "./client";

/**
 * Fetch from Sanity with Next.js caching.
 * - `revalidate`: seconds before the cached result is refreshed (false = cache until revalidated by tag)
 * - `tags`: cache tags, so a webhook can call `revalidateTag(tag)` when content changes
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
