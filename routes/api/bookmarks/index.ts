import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { Bookmark } from "../../../models/Bookmark.ts";
import { ObjectId } from "mongo";
import { Logger } from "../../../common/logger.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const state = _ctx.state.authToken as { _id: string };
    try {
      const data = (await Bookmark.aggregate(
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
            $unwind: {
              path: "$bookmarks",
            },
          },
          {
            $group: {
              _id: null,
              bookmarks: {
                $push: "$bookmarks",
              },
            },
          },
          {
            $project: {
              "bookmarks._id": 1,
              "bookmarks.word": 1,
            },
          },
        ],
      ).toArray())[0];
      return new Response(JSON.stringify(data), {
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
