import { ObjectId } from "mongo";
import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

export interface WordEntryDefinition {
  _id: ObjectId;
  type: string;
  definition: string;
  usageLabel: string;
  examples: [string];
}

export interface WordEntry {
  _id: ObjectId;
  word: string;
  article?: string;
  definitions: WordEntryDefinition[];
}

const entryDefinitionSchema: Schema = {
  type: { type: String },
  definition: { type: String },
  usageLabel: { type: String },
  examples: { type: [String] },
  reviews: { type: Number },
};

const dictionaryEntrySchema: Schema = {
  word: { type: String, required: true, minLength: 5 },
  article: { type: String, required: false, minLength: 1 },
  definitions: { type: entryDefinitionSchema, isArray: true },
};

export const DictionaryEntry = Query.createModel<WordEntry>(
  "dictionary",
  dictionaryEntrySchema,
);
