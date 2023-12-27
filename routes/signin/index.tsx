import { FreshContext, Handlers } from "$fresh/server.ts";
import { Status } from "std/http/http_status.ts";
import SignInForm from "../../islands/auth/SignInForm.tsx";

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    if (ctx.state.auth) {
      return new Response("", {
        status: Status.TemporaryRedirect,
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
