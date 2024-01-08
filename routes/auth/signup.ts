import { Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import { signToken } from "../../common/jwt.ts";
import { User, UserRole } from "../../models/User.ts";
import { genSaltSync, hashSync } from "bcrypt";
import { setCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const { name, email, password } = await req.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("", {
        status: 409,
        statusText: "User already exists",
      });
    }
    const hashedPassword = hashSync(password, genSaltSync());

    const user = {
      name,
      email,
      password: hashedPassword,
      userRole: UserRole.USER,
      createdAt: new Date(),
    };

    const _id = await User.create(user);

    const token = await signToken({
      _id,
      email: user.email,
      userRole: user.userRole,
    });
    const headers = new Headers(req.headers);

    setCookie(headers, {
      name: "authToken",
      value: token,
      domain: ctx.url.hostname,
      path: "/",
      expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 28)),
    });

    return Response.json({ name: user.name, email: user.email, token }, {
      headers,
      status: Status.Created,
    });
  },
};
