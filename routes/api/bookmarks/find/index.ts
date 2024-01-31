import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
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
        status: STATUS_CODE.OK,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: STATUS_CODE.Unauthorized,
      });
    }
  },
};
