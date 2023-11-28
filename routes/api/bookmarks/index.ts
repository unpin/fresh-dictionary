import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await fetch(`/bookmarks`, {
      method: "GET",
      headers: _req.headers,
    });
  },
};
