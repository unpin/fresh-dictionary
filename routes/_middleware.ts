import { FreshContext } from "$fresh/server.ts";
import { deleteCookie, getCookies } from "$std/http/cookie.ts";
import { Status } from "std/http/http_status.ts";
import { verifyToken } from "../common/jwt.ts";

import { Logger } from "../common/logger.ts";

interface State {
  authToken: Record<string, unknown>;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const cookies = getCookies(req.headers);
  const token = cookies.authToken;
  // if (!token) {
  //   Logger.debug("Unauthorized");
  //   return new Response(null, {
  //     status: Status.TemporaryRedirect,
  //     headers: {
  //       Location: "/signin",
  //     },
  //   });
  // }
  try {
    const { _id, email } = await verifyToken(token);
    ctx.state.authToken = { _id, email };
  } catch (e) {
    Logger.debug(e);
    const resp = await ctx.next();
    resp.headers.set("Location", "/");
    deleteCookie(resp.headers, "authToken", {
      path: "/",
      domain: ctx.url.hostname,
    });
    return resp;
  }
  return await ctx.next();
}
