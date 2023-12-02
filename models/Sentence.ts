import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

interface ISentence {
  v: string;
}

const sentenceSchema: Schema = {
  name: { type: String },
};

export const Sentence = Query.createModel<Schema>("sentences", sentenceSchema);
