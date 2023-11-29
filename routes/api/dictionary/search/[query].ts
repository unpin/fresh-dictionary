import { Handlers } from "$fresh/server.ts";
import { DictionaryEntry } from "../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const query = ctx.params.query;
    const escapedQuery = query.replaceAll(/[\(\)]/g, ".*");
    const pattern = new RegExp(`^${escapedQuery}`, "i");
    const entries = await DictionaryEntry.findMany({
      word: { $regex: pattern },
    }, { limit: 15 });
    console.log(entries[0]);
    return new Response(JSON.stringify(entries), {
      status: 200,
    });
  },
};
