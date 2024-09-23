import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Collection } from "../../../../models/Collection.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
        // const auth = ctx.state.auth as { _id: string };
        console.log(ctx.params._id);

        const collection = await Collection.findOne({
            _id: new ObjectId(ctx.params._id),
        });

        return Response.json(collection);
    },
};
