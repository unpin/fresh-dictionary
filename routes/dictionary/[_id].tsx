import { AppContext } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry, Entry } from "../../models/DictionaryEntry.ts";
import Navbar from "../../components/Navbar.tsx";

export default async function Dictionary(_req: Request, ctx: AppContext) {
  const entry = await DictionaryEntry.findOne({
    _id: new ObjectId(ctx.params._id),
  }) as Entry;

  if (!entry) return ctx.renderNotFound();

  return (
    <>
      <Navbar />
      <div class="container">
        <div>
          <h1>{entry.word}</h1>
        </div>
        <div>Entries</div>
        <ul>
          {entry.definitions.map((def, i) => {
            return (
              <li>
                <div>{i + 1}.</div>
                <div>
                  <b>Definition</b>
                </div>
                <div>{def.definition}</div>
                {
                  /* <div>
                <b>Example</b>
              </div>
              <div>{def.example}</div> */
                }
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
