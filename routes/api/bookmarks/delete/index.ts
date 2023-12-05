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
        $pull: { wordIds: new ObjectId(wordId) },
      });

      return new Response("", {
        status: modifiedCount ? Status.OK : Status.NotFound,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
};
