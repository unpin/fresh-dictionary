import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { Collection } from "../../../models/Collection.ts";
import { ObjectId } from "mongo";
import { Logger } from "../../../common/logger.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const auth = ctx.state.auth as { _id: string };
        const page = ctx.url.searchParams.get("page");
        const LIMIT = 10;
        const PAGE = page ? Number(page) : 0;
        const SKIP = PAGE * LIMIT;
        try {
            const collections = await Collection.findMany({
                userId: new ObjectId(auth._id),
            }, {
                skip: SKIP,
                limit: LIMIT,
            });

            return Response.json(collections, {
                status: STATUS_CODE.OK,
            });
        } catch (e) {
            Logger.debug(e);
            return new Response("", {
                status: STATUS_CODE.Unauthorized,
            });
        }
    },
};
