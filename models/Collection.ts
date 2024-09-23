import { ObjectId } from "mongo";
import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

export interface ICollection {
    _id: ObjectId | string;
    name: string;
    description: string;
    visibility: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        _id: string;
        name: string;
    };
    bookmarks: {
        _id: string;
        userId: string;
        wordId: string;
        createdAt: Date;
        reviewedAt: Date;
        reviewCount: number;
        examples: string[];
        word: string;
        definition: string;
    }[];
}

const collectionSchema: Schema = {};

export const Collection = Query.createModel<ICollection>(
    "collection",
    collectionSchema,
);
