import { FreshContext, Handlers, STATUS_CODE } from "$fresh/server.ts";
import SignUpForm from "../../islands/auth/SignUpForm.tsx";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    if (ctx.state.auth) {
      return new Response("", {
        status: STATUS_CODE.TemporaryRedirect,
        headers: { Location: "/" },
      });
    }

    return await ctx.render();
  },
};

export default function Signin() {
  return (
    <main class="main">
      <div class="container form-wrapper">
        <SignUpForm />
      </div>
    </main>
  );
}
