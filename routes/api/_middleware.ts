import { FreshContext, STATUS_CODE } from "$fresh/server.ts";

interface State {
  auth: Record<string, unknown>;
}

export async function handler(
  _req: Request,
  ctx: FreshContext<State>,
) {
  if (!ctx.state.auth) {
    return new Response(null, {
      status: STATUS_CODE.Unauthorized,
    });
  }
  return await ctx.next();
}
