import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";

interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  createdAt: { type: Date, required: true },
};

export const User = Query.createModel<IUser>("user", userSchema);
