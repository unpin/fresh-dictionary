import { FreshContext } from "$fresh/server.ts";
import { ObjectId } from "mongo";
import { DictionaryEntry } from "../../models/DictionaryEntry.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../../islands/Header.tsx";
import DictionaryWord from "../../islands/dictionary/DictionaryWord.tsx";
import { Word } from "../../types/words.ts";
import NavigationMenu from "../../islands/NavigationMenu.tsx";

export default async function Dictionary(_req: Request, ctx: FreshContext) {
  const wordId = ctx.params._id;
  const { _id } = ctx.state.auth as { _id: string };
  const word = await getWord(wordId, _id) as Word;

  if (!word) return ctx.renderNotFound();

  return (
    <>
      <Head>
        <title>{word.article} {word.word} | Words</title>
      </Head>
      <Header enableNavigation={true} />
      <main class="main">
        <div class="container">
          <DictionaryWord entry={word} />
        </div>
      </main>
      <NavigationMenu />
    </>
  );
}

async function getWord(wordId: string, userId: string) {
  const array = DictionaryEntry.aggregate([
    {
      $match: {
        _id: new ObjectId(wordId),
      },
    },
    {
      $lookup: {
        from: "definition",
        localField: "_id",
        foreignField: "wordId",
        as: "definitions",
      },
    },
    {
      $lookup: {
        from: "bookmark",
        let: { definitionIds: "$definitions._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$definitionId", "$$definitionIds"] },
                  { $eq: ["$userId", new ObjectId(userId)] },
                ],
              },
            },
          },
          {
            $project: {
              _id: 1,
              definitionId: 1,
            },
          },
        ],
        as: "bookmarked",
      },
    },
    {
      $addFields: {
        definitions: {
          $map: {
            input: "$definitions",
            as: "definition",
            in: {
              $mergeObjects: [
                "$$definition",
                {
                  isBookmarked: {
                    $in: ["$$definition._id", "$bookmarked.definitionId"],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $unset: ["bookmarked"],
    },
  ]);

  return (await array.toArray())[0];
}
