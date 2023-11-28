import { Handlers, Status } from "$fresh/server.ts";
import { signToken } from "../../../common/jwt.ts";
import { User } from "../../../models/User.ts";
import { compareSync } from "bcrypt";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response("", {
        status: Status.NotFound,
        statusText: "User not found",
      });
    }

    if (!compareSync(password, user.password)) {
      return new Response("", {
        status: Status.BadRequest,
        statusText: "Password is incorrect",
      });
    }
    const token = await signToken({ _id: user._id, email: user.email });
    return new Response(
      JSON.stringify({ name: user.name, email: user.email, token }),
    );
  },
};
