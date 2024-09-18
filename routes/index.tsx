import { Head } from "$fresh/runtime.ts";
import NavbarSearch from "../islands/NavbarSearch.tsx";
import { FreshContext, Handlers, STATUS_CODE } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";

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
    </>
  );
}
