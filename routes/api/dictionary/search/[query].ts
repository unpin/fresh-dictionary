import { Handlers } from "$fresh/server.ts";
import { DictionaryEntry } from "../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const query = ctx.params.query;
    // const escapedQuery = query.replaceAll(/[\(\)]/g, ".*");
    // const pattern = new RegExp(`^${escapedQuery}`, "i");
    const decodedQuery = decodeURI(query);
    const entries = await DictionaryEntry.findMany({
      $text: {
        $search: decodedQuery,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    }, {
      projection: {
        word: 1,
      },
      limit: 20,
    });

    return new Response(JSON.stringify(entries), {
      status: 200,
    });
  },
};
