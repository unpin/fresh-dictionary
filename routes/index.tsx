import { Head } from "$fresh/runtime.ts";
import NavbarSearch from "../islands/NavbarSearch.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
import SearchHistory from "../islands/SearchHistory.tsx";
import { Status } from "std/http/http_status.ts";
import Header from "../components/Header.tsx";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    if (!ctx.state.authToken) {
      return new Response("", {
        status: Status.TemporaryRedirect,
        headers: { Location: "/signin" },
      });
    }
    const resp = await ctx.render();
    return resp;
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Words</title>
      </Head>
      <Header>
        <NavbarSearch />
      </Header>
      <SearchHistory />
    </>
  );
}
