import { Head } from "$fresh/runtime.ts";
import NavbarSearch from "../islands/NavbarSearch.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
import SearchHistory from "../islands/SearchHistory.tsx";
import { Status } from "std/http/http_status.ts";
import Header from "../components/Header.tsx";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext) {
    if (!ctx.state.auth) {
      return new Response("", {
        status: Status.TemporaryRedirect,
        headers: { Location: "/signin" },
      });
    }

    return await ctx.render();
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
