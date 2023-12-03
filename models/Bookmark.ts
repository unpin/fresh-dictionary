import { ObjectId } from "mongo";
import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

export interface BookmarkDefinition {
  _id: ObjectId;
  userId: ObjectId;
  wordIds: ObjectId[];
}

const bookmarkSchema: Schema = {
  _id: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  wordIds: { type: [ObjectId], isArray: true },
};

export const Bookmark = Query.createModel<BookmarkDefinition>(
  "bookmarks",
  bookmarkSchema,
);
