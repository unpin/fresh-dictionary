import { deleteCookie } from "$std/http/cookie.ts";
import { HandlerContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    console.log("cookie domain trying to delete", url.hostname);
    deleteCookie(headers, "authToken", { path: "/", domain: url.hostname });
    headers.set("location", "/signin");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
