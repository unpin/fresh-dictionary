import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry } from "../../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async PATCH(req, ctx) {
    const { _id } = ctx.params;
    const { type, definition, examples } = await req.json();
    const definitionId = new ObjectId();

    const { modifiedCount } = await DictionaryEntry.updateOne({
      _id: new ObjectId(_id),
    }, {
      $push: {
        definitions: {
          _id: definitionId,
          type,
          definition,
          examples: (examples as string[]).filter((e) => e.length),
        },
      },
    });
    if (modifiedCount) {
      return Response.json({ insertedId: definitionId }, {
        status: 200,
      });
    }
    return new Response(null, {
      status: 400,
    });
  },
};
