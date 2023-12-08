import { FreshContext, Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import SignInForm from "../../islands/auth/SignInForm.tsx";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const cookies = getCookies(_req.headers);

    if (cookies.authToken) {
      return new Response("", {
        status: 307,
        headers: { Location: "/" },
      });
    }

    return await ctx.render();
  },
};

export default function Signin() {
  return (
    <div class="container form-wrapper">
      <SignInForm />
    </div>
  );
}
