import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Bookmark } from "../../../../models/Bookmark.ts";
import { Status } from "std/http/http_status.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { wordId } = await req.json();
    const state = _ctx.state.authToken as { _id: string };

    try {
      const update = await Bookmark.updateOne({
        userId: new ObjectId(state._id as string),
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
