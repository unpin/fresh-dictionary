import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { Bookmark } from "../../../models/Bookmark.ts";
import { ObjectId } from "mongo";
import { Logger } from "../../../common/logger.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { wordId } = await req.json();
    const state = _ctx.state.authToken as { _id: string };

    try {
      const { modifiedCount } = await Bookmark.updateOne({
        userId: new ObjectId(state._id as string),
      }, {
        $addToSet: {
          wordIds: {
            _id: new ObjectId(wordId),
            createdAt: new Date(),
            reviewedAt: new Date(),
            reviews: 0,
          },
        },
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
            $unwind: "$wordIds",
          },
          {
            $lookup: {
              from: "dictionary",
              localField: "wordIds._id",
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
                reviews: "$wordIds.reviews",
                createdAt: "$wordIds.createdAt",
              },
            },
          },
          {
            $sort: {
              createdAt: -1,
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
  async DELETE(req, _ctx) {
    const { wordId } = await req.json();
    const state = _ctx.state.authToken as { _id: string };

    try {
      const { modifiedCount } = await Bookmark.updateOne({
        userId: new ObjectId(state._id as string),
      }, {
        $pull: { wordIds: { _id: new ObjectId(wordId) } },
      });

      return new Response(null, {
        status: modifiedCount ? Status.NoContent : Status.NotFound,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
};
