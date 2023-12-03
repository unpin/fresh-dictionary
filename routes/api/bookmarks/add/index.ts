import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
import { getCookies } from "std/http/cookie.ts";
import { verifyToken } from "../../../../common/jwt.ts";
import { Status } from "std/http/http_status.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { wordId } = await req.json();
    const { authToken } = getCookies(req.headers);

    try {
      const payload = await verifyToken(authToken);
      console.log(payload);

      const update = await Bookmark.updateOne({
        userId: new ObjectId(payload._id as string),
      }, {
        $addToSet: { wordIds: new ObjectId(wordId) },
      }, {
        upsert: true,
      });
      console.log({ update });
      return new Response("", {
        status: Status.Created,
      });
    } catch (error) {
      console.log(error);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
};
