import { genSaltSync, hash } from "bcrypt";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../common/constants.ts";
import { User, UserRole } from "../models/User.ts";

export async function seed() {
  const user = await User.findOne({ email: ADMIN_EMAIL });
  if (user) return;
  await User.create({
    name: "Admin",
    email: ADMIN_EMAIL,
    password: await hash(ADMIN_PASSWORD, genSaltSync()),
    userRole: UserRole.ADMIN,
    createdAt: new Date(),
  });
}
