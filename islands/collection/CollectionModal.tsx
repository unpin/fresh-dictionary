import { useState } from "preact/hooks";
import type { Bookmark } from "../../models/Bookmark.ts";
import { CircleCheckSolid, Plus } from "../../components/Icons.tsx";

interface CollectionModalProps {
    bookmark: Bookmark;
}

export function CollectionModal() {
    const [collections] = useState([
        { collectionName: "Bookmarks", hasBookmark: true },
        { collectionName: "Billard Spielen 🎱", hasBookmark: false },
        {
            collectionName: "Koch- und Küchenwortschatz 🔪👩‍🍳",
            hasBookmark: true,
        },
        { collectionName: "Preparation for C1", hasBookmark: false },
        { collectionName: "Gehen ins Restaurant 🍽", hasBookmark: false },
    ]);
    return (
        <div>
            <div class="collection-modal">
                <h3>Add to collection</h3>
                <div class="separator"></div>
                <p>Create new collection +</p>
                <ul>
                    {collections.map((c) => {
                        return (
                            <li>
                                {c.collectionName}
                                {c.hasBookmark
                                    ? <CircleCheckSolid class="icon" />
                                    : <Plus class="icon" />}
                            </li>
                        );
                    })}
                </ul>
                <p>Remove nah</p>
            </div>
        </div>
    );
}
