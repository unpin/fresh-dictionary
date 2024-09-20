import { Handlers, STATUS_CODE } from "$fresh/server.ts";
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
        status: matchedCount ? STATUS_CODE.Created : STATUS_CODE.BadRequest,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: STATUS_CODE.BadRequest,
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
        // [
        //   {
        //     $match: {
        //       userId: new ObjectId(auth._id.toString()),
        //     },
        //   },
        //   {
        //     $unwind: "$wordIds",
        //   },
        //   {
        //     $lookup: {
        //       from: "dictionary",
        //       localField: "wordIds._id",
        //       foreignField: "_id",
        //       as: "bookmarks",
        //     },
        //   },
        //   {
        //     $unwind: "$bookmarks",
        //   },
        //   {
        //     $replaceRoot: {
        //       newRoot: {
        //         _id: "$bookmarks._id",
        //         word: "$bookmarks.word",
        //         article: "$bookmarks.article",
        //         reviews: "$wordIds.reviews",
        //         createdAt: "$wordIds.createdAt",
        //       },
        //     },
        //   },
        //   {
        //     $sort: {
        //       createdAt: -1,
        //     },
        //   },
        //   {
        //     $skip: SKIP,
        //   },
        //   {
        //     $limit: LIMIT,
        //   },
        // ],
        [
          {
            $match: {
              userId: new ObjectId(auth._id.toString()),
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
          {
            $lookup: {
              from: "definition",
              localField: "definitionId",
              foreignField: "_id",
              as: "definition",
              pipeline: [
                {
                  $project: {
                    _id: 0,
                    definition: 1,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "dictionary",
              localField: "wordId",
              foreignField: "_id",
              as: "word",
              pipeline: [
                {
                  $project: {
                    _id: 0,
                    word: 1,
                  },
                },
              ],
            },
          },
          {
            $set: {
              word: {
                $arrayElemAt: ["$word.word", 0],
              },
              definition: {
                $arrayElemAt: [
                  "$definition.definition",
                  0,
                ],
              },
            },
          },
        ],
      );
      const array = await data.toArray();

      return Response.json(array, {
        status: STATUS_CODE.OK,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: STATUS_CODE.Unauthorized,
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
        status: matchedCount ? STATUS_CODE.NoContent : STATUS_CODE.NotFound,
      });
    } catch (e) {
      Logger.debug(e);
      return new Response("", {
        status: STATUS_CODE.BadRequest,
      });
    }
  },
};
