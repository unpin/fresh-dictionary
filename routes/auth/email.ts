import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { User } from "../../models/User.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { email } = await req.json();
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return new Response("", {
        status: STATUS_CODE.NotFound,
      });
    }

    return Response.json({
      name: foundUser.name,
      email: foundUser.email,
    });
  },
};
