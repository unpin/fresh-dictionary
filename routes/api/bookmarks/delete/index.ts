import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
import { Status } from "std/http/http_status.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { wordId } = await req.json();
    const state = _ctx.state.authToken as { _id: string };

    try {
      const deletion = await Bookmark.updateOne({
        userId: new ObjectId(state._id as string),
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
