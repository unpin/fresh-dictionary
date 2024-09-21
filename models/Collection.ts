import { ObjectId } from "mongo";
import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

export interface Collection {
    _id: ObjectId;
    userId: ObjectId;
    name: string;
    description: string;
    definitionIds: [
        ObjectId,
    ];
    visibility: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string;
}

const collectionSchema: Schema = {};

export const Collection = Query.createModel<Collection>(
    "collection",
    collectionSchema,
);
