import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
import { Status } from "std/http/http_status.ts";
import { Logger } from "../../../../common/logger.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { wordId } = await req.json();
    const state = _ctx.state.authToken as { _id: string };

    try {
      const { modifiedCount } = await Bookmark.updateOne({
        userId: new ObjectId(state._id as string),
      }, {
        $addToSet: { wordIds: new ObjectId(wordId) },
      }, {
        upsert: true,
      });
      return new Response("", {
        status: modifiedCount ? Status.Created : Status.BadRequest,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
};
