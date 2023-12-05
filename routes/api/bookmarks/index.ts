import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { Bookmark } from "../../../models/Bookmark.ts";
import { ObjectId } from "mongo";
import { Logger } from "../../../common/logger.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const state = _ctx.state.authToken as { _id: string };
    try {
      const data = Bookmark.aggregate(
        [
          {
            $match: {
              userId: new ObjectId(state._id.toString()),
            },
          },
          {
            $lookup: {
              from: "dictionary",
              localField: "wordIds",
              foreignField: "_id",
              as: "bookmarks",
            },
          },
          {
            $unwind: "$bookmarks",
          },
          {
            $replaceRoot: {
              newRoot: {
                _id: "$bookmarks._id",
                word: "$bookmarks.word",
              },
            },
          },
        ],
      );
      return new Response(JSON.stringify(await data.toArray()), {
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
