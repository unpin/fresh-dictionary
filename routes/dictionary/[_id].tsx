import { FreshContext } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry } from "../../models/DictionaryEntry.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import DictionaryWord from "../../islands/dictionary/DictionaryWord.tsx";
import { Word } from "../../types/words.ts";

export default async function Dictionary(_req: Request, ctx: FreshContext) {
  const wordId = ctx.params._id;
  const { _id } = ctx.state.auth as { _id: string };
  const entry = await getWordWithBookmark(wordId, _id) as Word;

  if (!entry) return ctx.renderNotFound();

  return (
    <>
      <Head>
        <title>{entry.article} {entry.word} | Words</title>
      </Head>
      <Header enableNavigation={true} />
      <div class="container">
        <DictionaryWord entry={entry} />
        {
          /* {examples.length > 0 &&
          (
            <>
              <h3 class="my-4">Beispiele</h3>
              <ul class="examples">
                {examples.map((e) => <li>{e.v}</li>)}
              </ul>
            </>
          )} */
        }
      </div>
    </>
  );
}

async function getWordWithBookmark(wordId: string, userId: string) {
  const array = DictionaryEntry.aggregate([
    {
      $match: {
        _id: new ObjectId(wordId),
      },
    },
    {
      $lookup: {
        from: "bookmarks",
        localField: "_id",
        foreignField: "wordIds._id",
        as: "bookmarks",
        pipeline: [
          {
            $match: {
              userId: new ObjectId(userId),
            },
          },
        ],
      },
    },
    {
      $set: {
        isBookmarked: {
          $cond: [
            {
              $gt: [
                {
                  $size: ["$bookmarks"],
                },
                0,
              ],
            },
            true,
            false,
          ],
        },
      },
    },
  ]);

  return (await array.toArray())[0];
}
