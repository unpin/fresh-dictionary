import { useEffect, useState } from "preact/hooks";
import { ICollection } from "../../models/Collection.ts";
import { getDisplayDateOrTime } from "../../utils/date.ts";

export function Collections() {
    const [collections, setCollections] = useState<ICollection[]>([]);

    useEffect(() => {
        fetch("/api/collections")
            .then((res) => res.json())
            .then((data) => {
                console.log("/api/collections", data);
                setCollections(data);
            });
    }, []);

    return (
        <>
            <h2>Collections</h2>
            {collections.length
                ? (
                    <ul class="collection-list">
                        {collections.map((collection, idx) => (
                            <li>
                                <p class="colleciton-name">
                                    <a href={`/collection/${collection._id}`}>
                                        {collection.name}
                                    </a>
                                </p>
                                <div className="collection-info">
                                    <span class="collection-date">
                                        {getDisplayDateOrTime(
                                            new Date(collection.updatedAt),
                                        )}
                                    </span>
                                    <span>by</span>
                                    <span class="collection-username">
                                        <a href={`/user/${collection.userId}`}>
                                            {collection.userName}
                                        </a>
                                    </span>
                                    <span class="v-separator"></span>
                                    <div class="collection-members">
                                        {/* Replace with real implementation */}
                                        {Array(Math.min(Math.min(idx + 1), 3))
                                            .fill(true).map(
                                                () => (
                                                    <img
                                                        src="/profile/default.png"
                                                        alt=""
                                                    />
                                                ),
                                            )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
                : <div>You don't habe any collections yet</div>}
        </>
    );
}
