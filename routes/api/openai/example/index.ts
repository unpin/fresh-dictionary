import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import OpenAI from "openai";
import { Logger } from "../../../../common/logger.ts";
import { OPENAI_API_KEY } from "../../../../common/constants.ts";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { word } = await req.json();
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{
          role: "user",
          content:
            `„Generiere einen kurzen Beispielsatz in einem beliebigen Kontext mit dem Wort "${word}", ohne ihn in Anführungszeichen zu setzen.`,
        }],
        model: "gpt-4o-mini",
      });

      return Response.json({
        example: chatCompletion.choices[0].message.content,
      });
    } catch (error) {
      Logger.error(error);
      return new Response(null, { status: STATUS_CODE.InternalServerError });
    }
  },
};
