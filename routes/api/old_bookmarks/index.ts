import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { Logger } from "../../../common/logger.ts";
import type { Schema } from "../../../database/SchemaValidator.ts";
import { Query } from "../../../database/Query.ts";

export interface OldBookmark {
    _id: ObjectId | string;
    userId: ObjectId | string;
    wordId: ObjectId | string;
    definitionId: ObjectId | string;
    word: string;
    article: string;
    definition: string;
    examples: string[];
    createdAt: Date;
    reviewedAt: Date;
    reviewCount: number;
}

const bookmarkSchema: Schema = {};

export const Bookmark = Query.createModel<OldBookmark>(
    "old_bookmarks",
    bookmarkSchema,
);

export const handler: Handlers = {
    async GET(_req, ctx) {
        const auth = ctx.state.auth as { _id: string };
        console.log(auth._id);

        try {
            const collections = Bookmark.aggregate([
                {
                    $match: {
                        userId: new ObjectId(auth._id),
                    },
                },
                {
                    $sort: { updatedAt: -1 },
                },
                {
                    $limit: 1,
                },
                {
                    $lookup: {
                        from: "dictionary",
                        localField: "wordId",
                        foreignField: "_id",
                        as: "word",
                    },
                },
                {
                    $unwind: {
                        path: "$word",
                    },
                },
                {
                    $lookup: {
                        from: "definition",
                        localField: "wordId",
                        foreignField: "_id",
                        as: "definitions",
                    },
                },
            ]);
            const array = await collections.toArray();
            console.log(array);

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
