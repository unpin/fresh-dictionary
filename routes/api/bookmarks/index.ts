import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { Bookmark } from "../../../models/Bookmark.ts";
import { ObjectId } from "mongo";
import { verifyToken } from "../../../common/jwt.ts";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req, _ctx) {
    const { authToken } = getCookies(req.headers);

    if (!authToken) {
      return new Response("", {
        status: Status.Unauthorized,
      });
    }

    try {
      const payload = await verifyToken(authToken);
      const data = (await Bookmark.aggregate(
        [
          {
            $match: {
              userId: new ObjectId(payload._id?.toString()),
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
      console.log(data);

      return new Response(JSON.stringify(data), {
        status: Status.OK,
      });
    } catch (error) {
      console.log(error);
      return new Response("", {
        status: Status.Unauthorized,
      });
    }
  },
};
