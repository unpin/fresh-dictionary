import { FreshContext } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry, WordEntry } from "../../models/DictionaryEntry.ts";
import NavbarSearch from "../../islands/NavbarSearch.tsx";
import SaveWordToLocalStorage from "../../islands/SaveWordToLocalStorage.tsx";
import { Sentence } from "../../models/Sentence.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../../components/Header.tsx";
import DictionaryWord from "../../islands/dictionary/DictionaryWord.tsx";

export default async function Dictionary(_req: Request, ctx: FreshContext) {
  const entry = await DictionaryEntry.findOne({
    _id: new ObjectId(ctx.params._id),
  }) as WordEntry;
  if (!entry) return ctx.renderNotFound();
  const examples = (await Sentence.findMany({
    v: { $regex: new RegExp(`\\b${entry.word}\\b`) },
  }, { limit: 10 })) as { v: string }[];

  return (
    <>
      <Head>
        <title>{entry.article} {entry.word} | Words</title>
      </Head>
      <SaveWordToLocalStorage
        word={entry.article + " " + entry.word}
        _id={entry._id.toString()}
      />
      <Header>
        <NavbarSearch />
      </Header>
      <div class="container">
        <DictionaryWord entry={entry} />
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
