import { FreshContext } from "$fresh/server.ts";
import { deleteCookie, getCookies } from "$std/http/cookie.ts";
import { verifyToken } from "../common/jwt.ts";

import { Logger } from "../common/logger.ts";

interface State {
  auth: Record<string, unknown>;
}

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const { authToken } = getCookies(req.headers);

  if (authToken) {
    try {
      const { _id, name, email, userRole } = await verifyToken(authToken);
      ctx.state.auth = { _id, name, email, userRole };
    } catch (e) {
      Logger.debug(e);
      const resp = await ctx.next();
      resp.headers.set("Location", "/signin");
      deleteCookie(resp.headers, "authToken", {
        path: "/",
        domain: ctx.url.hostname,
      });
      return resp;
    }
  }
  return await ctx.next();
}
