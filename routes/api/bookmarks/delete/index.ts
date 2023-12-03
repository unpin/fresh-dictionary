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
      const deletion = await Bookmark.updateOne({
        userId: new ObjectId(payload._id as string),
      }, {
        $pull: { wordIds: new ObjectId(wordId) },
      });
      console.log({ deletion });
      return new Response("", {
        status: Status.OK,
      });
    } catch (error) {
      console.log(error);
      return new Response("", {
        status: Status.BadRequest,
      });
    }
  },
};
