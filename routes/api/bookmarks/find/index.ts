import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
import { Status } from "std/http/http_status.ts";
import { verifyToken } from "../../../../common/jwt.ts";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { wordId } = await req.json();

    const { authToken } = getCookies(req.headers);

    if (!authToken) {
      return new Response("", {
        status: Status.Unauthorized,
      });
    }

    try {
      const payload = await verifyToken(authToken);
      console.log(payload);
      console.log({ wordId });

      const hasBookmark = await Bookmark.findOne({
        userId: new ObjectId(payload._id as string),
        wordIds: new ObjectId(wordId),
      });
      console.log("hasBookmark?", hasBookmark);

      return new Response(
        JSON.stringify({
          isBookmarked: hasBookmark ? true : false,
        }),
        {
          status: Status.OK,
        },
      );
    } catch (error) {
      console.log(error);
      return new Response("", {
        status: Status.Unauthorized,
      });
    }
  },
};
