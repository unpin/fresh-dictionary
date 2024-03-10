import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry } from "../../../../../../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async PATCH(req, ctx) {
    const { _id, definitionId } = ctx.params;
    const { definition, examples } = await req.json();

    const { matchedCount } = await DictionaryEntry.updateOne({
      _id: new ObjectId(_id),
      "definitions._id": new ObjectId(definitionId),
    }, {
      $set: {
        "definitions.$.definition": definition,
        "definitions.$.examples": examples,
      },
    });
    if (matchedCount) {
      return new Response(null, {
        status: 200,
      });
    }
    return new Response(null, {
      status: 400,
    });
  },
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
