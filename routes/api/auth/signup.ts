import { Handlers } from "$fresh/server.ts";
import { signToken } from "../../../common/jwt.ts";
import { User } from "../../../models/User.ts";
import { hashSync } from "bcrypt";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { name, email, password } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
      return new Response("", {
        status: 409,
        statusText: "User already exists",
      });
    }
    const hashedPassword = hashSync(password);
    const _id = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await signToken({ _id, email });
    return new Response(JSON.stringify({ name, email, token }), {
      status: 201,
    });
  },
};
