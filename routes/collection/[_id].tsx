import type { FreshContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { ObjectId } from "mongo";
import Header from "../../islands/Header.tsx";
import NavigationMenu from "../../islands/NavigationMenu.tsx";
import { Collection, type ICollection } from "../../models/Collection.ts";
import { getDisplayDateOrTime } from "../../utils/date.ts";

export default async function (_req: Request, ctx: FreshContext) {
    const collectionId = ctx.params._id;
    const collection = await getCollection(collectionId);

    if (!collection) return ctx.renderNotFound();

    return (
        <>
            <Head>
                <title>{collection.name} | Words</title>
            </Head>
            <Header enableNavigation={true} />
            <main class="main">
                <div class="container">
                    <h2>{collection.name}</h2>

                    <p>{collection.description}</p>
                    <div>
                        {getDisplayDateOrTime(collection.updatedAt)} by{" "}
                        {collection.user.name}
                    </div>

                    <h2>Bookmarks</h2>
                    {collection.bookmarks.length > 0 &&
                        (
                            <ul>
                                {collection.bookmarks.map((b) => {
                                    return (
                                        <li>
                                            <h3>{b.word}</h3>
                                            <p>{b.definition}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                </div>
            </main>
            <NavigationMenu />
        </>
    );
}

async function getCollection(collectionId: string) {
    const array = Collection.aggregate([
        {
            $match: {
                _id: new ObjectId(collectionId),
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$user",
        },
        {
            $lookup: {
                from: "CollectionBookmark",
                localField: "_id",
                foreignField: "collectionId",
                as: "bookmarks",
                pipeline: [
                    {
                        $lookup: {
                            from: "bookmark",
                            localField: "bookmarkId",
                            foreignField: "_id",
                            as: "bookmark",
                            pipeline: [
                                {
                                    $unwind: "$bookmark",
                                },
                                {
                                    $lookup: {
                                        from: "definition",
                                        localField: "definitionId",
                                        foreignField: "_id",
                                        as: "definition",
                                        pipeline: [
                                            {
                                                $project: {
                                                    wordId: 1,
                                                    definition: 1,
                                                },
                                            },
                                            {
                                                $lookup: {
                                                    from: "dictionary",
                                                    localField: "wordId",
                                                    foreignField: "_id",
                                                    as: "word",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                _id: 0,
                                                                word: 1,
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    $set: {
                                        definition: {
                                            $arrayElemAt: ["$definition", 0],
                                        },
                                    },
                                },
                                {
                                    $set: {
                                        word: {
                                            $ifNull: [
                                                {
                                                    $arrayElemAt: [
                                                        "$definition.word.word",
                                                        0,
                                                    ],
                                                },
                                                null,
                                            ],
                                        },
                                        definition: "$definition.definition",
                                    },
                                },
                                {
                                    $project: {
                                        wordId: 0,
                                        definitionId: 0,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $set: {
                            bookmark: {
                                $arrayElemAt: ["$bookmark", 0],
                            },
                        },
                    },
                    {
                        $set: {
                            addedBy: "$addedBy",
                            addedAt: "$addedAt",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                userId: 0,
                "bookmarks.bookmark.wordId": 0,
            },
        },
    ]);

    return (await array.toArray())[0] as ICollection;
}
