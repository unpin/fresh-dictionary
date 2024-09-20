import { useEffect, useState } from "preact/hooks";
import { Collection } from "../../models/Collection.ts";
import { getDisplayDateOrTime } from "../../utils/date.ts";

export function Collections() {
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        fetch("/api/collections").then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCollections(data);
            });
    }, []);

    return (
        <>
            <h2>Collections</h2>
            {collections.length
                ? (
                    <ul class="collection-list">
                        {collections.map((coll) => (
                            <li>
                                <p class="colleciton-name">
                                    {coll.name}
                                </p>
                                <div className="collection-info">
                                    <span class="collection-date">
                                        {getDisplayDateOrTime(
                                            new Date(coll.updatedAt),
                                        )}
                                    </span>
                                    <span class="v-separator"></span>
                                    <div class="collection-members">
                                        <img
                                            src=""
                                            alt=""
                                            width={16}
                                            height={16}
                                        />
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
