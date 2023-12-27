import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { signToken } from "../../common/jwt.ts";
import { User } from "../../models/User.ts";
import { compareSync } from "bcrypt";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response("", {
        status: 404,
        statusText: "User not found",
      });
    }

    if (!compareSync(password, user.password)) {
      return new Response("", {
        status: 400,
        statusText: "Password is incorrect",
      });
    }

    const token = await signToken({
      _id: user._id,
      email: user.email,
      userRole: user.userRole,
    });
    const headers = new Headers(req.headers);

    setCookie(headers, {
      name: "authToken",
      value: token,
      domain: ctx.url.hostname,
      path: "/",
      expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
    });

    return Response.json({ name: user.name, email: user.email, token }, {
      headers,
    });
  },
};
