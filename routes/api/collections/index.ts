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
            const collections = Collection.aggregate([{
                $match: {
                    userId: new ObjectId(auth._id),
                },
            }, {
                $sort: { updatedAt: -1 },
            }, {
                $skip: SKIP,
            }, {
                $limit: LIMIT,
            }, {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                            },
                        },
                    ],
                },
            }, {
                $set: {
                    userName: {
                        $arrayElemAt: ["$user.name", 0],
                    },
                },
            }]);
            const array = await collections.toArray();

            return Response.json(array, {
                status: STATUS_CODE.OK,
            });
        } catch (e) {
            Logger.error(e);
            return new Response("", {
                status: STATUS_CODE.Unauthorized,
            });
        }
    },
};
