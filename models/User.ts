import { Query } from "../database/Query.ts";
import { Schema } from "../database/SchemaValidator.ts";
import { seed } from "../database/seed.ts";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  userRole: UserRole;
}

const userSchema: Schema = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  createdAt: { type: Date, required: true },
  userRole: { type: String, required: true },
};

export const User = Query.createModel<IUser>("user", userSchema);

await seed();
