import { Head } from "$fresh/runtime.ts";
import { Signal } from "@preact/signals";
import Navbar from "../components/Navbar.tsx";
import NavbarSearch from "../islands/NavbarSearch.tsx";
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { Entry } from "../models/DictionaryEntry.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    const cookies = getCookies(_req.headers);

    if (!cookies.authToken) {
      return new Response("", {
        status: 307,
        headers: { Location: "/signin" },
      });
    }

    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello World");
    return resp;
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <title>Words</title>
        <link rel="stylesheet" href="manifest.json" />
      </Head>
      <Navbar />
      <NavbarSearch />
    </>
  );
}
