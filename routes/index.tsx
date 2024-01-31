import { Head } from "$fresh/runtime.ts";
import NavbarSearch from "../islands/NavbarSearch.tsx";
import { FreshContext, Handlers, STATUS_CODE } from "$fresh/server.ts";
import SearchHistory from "../islands/SearchHistory.tsx";
import Header from "../components/Header.tsx";
import { getCookies } from "std/http/cookie.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext) {
    if (!ctx.state.auth) {
      return new Response("", {
        status: STATUS_CODE.TemporaryRedirect,
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
