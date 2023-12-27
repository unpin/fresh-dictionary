import { FreshContext } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";

interface State {
  auth: Record<string, unknown>;
}

export async function handler(
  _req: Request,
  ctx: FreshContext<State>,
) {
  if (!ctx.state.auth) {
    return new Response(null, {
      status: Status.Unauthorized,
    });
  }
  return await ctx.next();
}
