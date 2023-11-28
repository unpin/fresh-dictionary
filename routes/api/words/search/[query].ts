import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const query = ctx.params.query;
    return await fetch(`/search/${query}`, {
      method: "GET",
      headers: _req.headers,
    });
  },
};
