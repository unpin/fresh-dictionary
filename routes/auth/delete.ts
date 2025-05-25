import { FreshContext, Handlers, STATUS_CODE } from "$fresh/server.ts";
import { User } from "../../models/User.ts";
import { compareSync } from "bcrypt";
import { Bookmark } from "../../models/Bookmark.ts";
import { ObjectId } from "mongo";
import { deleteCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx: FreshContext) {
    if (!ctx.state.auth) {
      return new Response(null, {
        status: STATUS_CODE.BadRequest,
      });
    }
    const { password } = await req.json();
    // TODO create interface for auth
    const auth = ctx.state.auth as {
      _id: string;
      email: string;
      password: string;
    };
    const user = await User.findOne({ email: auth.email });
    if (!user) return new Response(null, { status: STATUS_CODE.BadRequest });

    if (!compareSync(password, user.password)) {
      return new Response(null, {
        status: STATUS_CODE.BadRequest,
        statusText: "Password is incorrect",
      });
    }

    await Bookmark.deleteOne({
      userId: new ObjectId(auth._id),
    });
    const deletedCount = await User.deleteOne({ email: auth.email });
    if (!deletedCount) {
      return new Response(null, {
        status: STATUS_CODE.BadRequest,
      });
    }
    const headers = new Headers(req.headers);
    deleteCookie(headers, "authToken", { path: "/", domain: ctx.url.hostname });
    return new Response(null, {
      headers,
      status: STATUS_CODE.NoContent,
    });
  },
};
