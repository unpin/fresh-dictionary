import { Handlers } from "$fresh/server.ts";
import { DictionaryEntry } from "../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const page = ctx.url.searchParams.get("page");
    const LIMIT = 10;
    const PAGE = page ? Number(page) : 0;
    const SKIP = PAGE * LIMIT;
    const query = ctx.params.query;

    // const escapedQuery = query.replaceAll(/[\(\)]/g, ".*");
    // const pattern = new RegExp(`^${escapedQuery}`, "i");
    const decodedQuery = decodeURI(query);

    const entries = await DictionaryEntry.findMany({
      $text: {
        $search: `\"${decodedQuery}\"`,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    }, {
      projection: {
        word: 1,
        article: 1,
      },
      limit: 10,
      skip: SKIP,
    });

    return new Response(JSON.stringify(entries), {
      status: 200,
    });
  },
};
