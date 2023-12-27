import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry } from "../../../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async DELETE(_req, ctx) {
    const { _id, definitionId } = ctx.params;
    const { modifiedCount } = await DictionaryEntry.updateOne({
      _id: new ObjectId(_id),
    }, {
      $pull: {
        definitions: {
          _id: new ObjectId(definitionId),
        },
      },
    });
    if (modifiedCount) {
      return new Response(null, {
        status: 200,
      });
    }
    return new Response(null, {
      status: 400,
    });
  },
};
