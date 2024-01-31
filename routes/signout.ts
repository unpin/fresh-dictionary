import { deleteCookie } from "$std/http/cookie.ts";
import { FreshContext, Handlers, STATUS_CODE } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req: Request, ctx: FreshContext) {
    const headers = new Headers(req.headers);
    deleteCookie(headers, "authToken", { path: "/", domain: ctx.url.hostname });
    headers.set("Location", "/signin");
    return new Response(null, {
      status: STATUS_CODE.Found,
      headers,
    });
  },
};
