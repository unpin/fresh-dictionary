import { ObjectId } from "mongo";
import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

export interface WordDefinition {
  _id: ObjectId;
  meaning: string;
  examples: string[];
  reviews: number;
}

export interface WordInterface {
  _id: ObjectId;
  userId: ObjectId;
  word: string;
  article?: string;
  definitions: WordDefinition[];
}

const definitionSchema: Schema = {
  type: { type: String },
  definition: { type: String },
  usageLabel: { type: String },
  examples: { type: [String] },
  reviews: { type: Number },
};

const wordSchema: Schema = {
  word: { type: String, required: true, minLength: 5 },
  definitions: { type: definitionSchema, isArray: true },
};

export const Word = Query.createModel<WordInterface>("word", wordSchema);
