import { FreshContext } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry, Entry } from "../../models/DictionaryEntry.ts";
import Navbar from "../../components/Navbar.tsx";
import NavbarSearch from "../../islands/NavbarSearch.tsx";
import SaveWordToLocalStorage from "../../islands/SaveWordToLocalStorage.tsx";
import { Sentence } from "../../models/Sentence.ts";
import { Head } from "$fresh/runtime.ts";

export default async function Dictionary(_req: Request, ctx: FreshContext) {
  const entry = await DictionaryEntry.findOne({
    _id: new ObjectId(ctx.params._id),
  }) as Entry;
  if (!entry) return ctx.renderNotFound();
  const examples = (await Sentence.findMany({
    v: { $regex: new RegExp(`\\b${entry.word}\\b`) },
  }, { limit: 10 })) as { v: string }[];

  const type = entry.definitions[0].type;

  return (
    <>
      <Head>
        <title>Words - {entry.word}</title>
      </Head>
      <SaveWordToLocalStorage word={entry.word} _id={entry._id.toString()} />
      <Navbar />
      <NavbarSearch />
      <div class="container">
        <h1 class="my-4 dictionary-word">{entry.word}</h1>
        <span class="entry-type">{type}</span>
        <h3 class="my-4">Bedeutungen</h3>
        <ul class="my-4">
          {entry.definitions.map((def, i) => {
            return (
              <li class="my-4">
                <div class="definition-counter my-2">{i + 1}.</div>
                <div>{def.definition}</div>
              </li>
            );
          })}
        </ul>
        {examples.length > 0 &&
          (
            <>
              <h3 class="my-4">Beispiele</h3>
              <ul class="examples">
                {examples.map((e) => <li>{e.v}</li>)}
              </ul>
            </>
          )}
      </div>
    </>
  );
}
