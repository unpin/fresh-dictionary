import { HandlerContext, Handlers } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import SignUpForm from "../../islands/auth/SignUpForm.tsx";

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
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
      <SignUpForm />
    </div>
  );
}
