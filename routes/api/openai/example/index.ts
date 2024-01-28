import { Handlers } from "$fresh/server.ts";

import OpenAI from "https://deno.land/x/openai@v4.20.1/mod.ts";
import { Logger } from "../../../../common/logger.ts";
import { Status } from "std/http/http_status.ts";
const client = new OpenAI();

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { word } = await req.json();
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{
          role: "user",
          content: `Schreib einen kurzen Beispielsatz mit dem Word ${word}`,
        }],
        model: "gpt-3.5-turbo",
      });

      return Response.json({
        example: chatCompletion.choices[0].message.content,
      });
    } catch (error) {
      Logger.error(error);
      return new Response(null, { status: Status.InternalServerError });
    }
  },
};
