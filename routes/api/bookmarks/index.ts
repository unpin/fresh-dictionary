import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { Bookmark } from "../../../models/Bookmark.ts";
import { ObjectId } from "mongo";
import { Logger } from "../../../common/logger.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { wordId } = await req.json();
    const auth = ctx.state.auth as { _id: string };

    try {
      const { matchedCount } = await Bookmark.updateOne({
        userId: new ObjectId(auth._id as string),
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
        status: matchedCount ? Status.Created : Status.BadRequest,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
  async GET(_req, ctx) {
    const auth = ctx.state.auth as { _id: string };
    const page = ctx.url.searchParams.get("page");
    const LIMIT = 10;
    const PAGE = page ? Number(page) : 0;
    const SKIP = PAGE * LIMIT;
    try {
      const data = Bookmark.aggregate(
        [
          {
            $match: {
              userId: new ObjectId(auth._id.toString()),
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
                article: "$bookmarks.article",
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
          {
            $skip: SKIP,
          },
          {
            $limit: LIMIT,
          },
        ],
      );

      return Response.json(await data.toArray(), {
        status: Status.OK,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.Unauthorized,
      });
    }
  },
  async DELETE(req, ctx) {
    const { wordId } = await req.json();
    const auth = ctx.state.auth as { _id: string };

    try {
      const { matchedCount } = await Bookmark.updateOne({
        userId: new ObjectId(auth._id as string),
      }, {
        $pull: { wordIds: { _id: new ObjectId(wordId) } },
      });

      return new Response(null, {
        status: matchedCount ? Status.NoContent : Status.NotFound,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
};
