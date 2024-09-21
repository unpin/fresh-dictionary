import { ObjectId } from "mongo";
import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

export interface Bookmark {
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

const bookmarkSchema: Schema = {
  _id: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  wordIds: { type: [ObjectId], isArray: true },
};

export const Bookmark = Query.createModel<Bookmark>(
  "bookmark",
  bookmarkSchema,
);
