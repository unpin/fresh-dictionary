import { deleteCookie, getCookies } from "$std/http/cookie.ts";
import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext) {
    const url = new URL(_req.url);
    const headers = new Headers(_req.headers);
    deleteCookie(headers, "authToken", { path: "/", domain: url.hostname });
    headers.set("location", "/signin");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
