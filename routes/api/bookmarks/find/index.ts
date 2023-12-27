import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
import { Status } from "std/http/http_status.ts";
import { Logger } from "../../../../common/logger.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { wordId } = await req.json();
    const auth = ctx.state.auth as { _id: string };

    try {
      const hasBookmark = await Bookmark.findOne({
        userId: new ObjectId(auth._id as string),
        "wordIds._id": new ObjectId(wordId),
      });
      return Response.json({ isBookmarked: hasBookmark ? true : false }, {
        status: Status.OK,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.Unauthorized,
      });
    }
  },
};
