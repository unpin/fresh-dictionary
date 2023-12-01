import { AppContext } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry, Entry } from "../../models/DictionaryEntry.ts";
import Navbar from "../../components/Navbar.tsx";
import NavbarSearch from "../../islands/NavbarSearch.tsx";
import SaveWordToLocalStorage from "../../islands/SaveWordToLocalStorage.tsx";

export default async function Dictionary(_req: Request, ctx: AppContext) {
  const entry = await DictionaryEntry.findOne({
    _id: new ObjectId(ctx.params._id),
  }) as Entry;

  if (!entry) return ctx.renderNotFound();
  const type = entry.definitions[0].type;

  return (
    <>
      <SaveWordToLocalStorage word={entry.word} _id={entry._id.toString()} />
      <Navbar />
      <NavbarSearch />
      <div class="container">
        <h1 class="my-4">{entry.word}</h1>
        <span class="entry-type">{type}</span>
        <h3 class="my-4">Definitions</h3>
        <ul class="my-4">
          {entry.definitions.map((def, i) => {
            return (
              <li class="my-4">
                <div class="definition-counter my-2">{i + 1}.</div>
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
