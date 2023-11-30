import { Handlers } from "$fresh/server.ts";
import { DictionaryEntry } from "../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const query = ctx.params.query;
    // const escapedQuery = query.replaceAll(/[\(\)]/g, ".*");
    // const pattern = new RegExp(`^${escapedQuery}`, "i");
    const entries = await DictionaryEntry.findMany({
      $text: {
        $search: query,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    }, { limit: 20 });

    return new Response(JSON.stringify(entries), {
      status: 200,
    });
  },
};
