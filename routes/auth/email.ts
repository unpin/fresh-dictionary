import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { User } from "../../models/User.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response("", {
        status: Status.NotFound,
      });
    }

    return Response.json({
      name: user.name,
      email: user.email,
    });
  },
};
