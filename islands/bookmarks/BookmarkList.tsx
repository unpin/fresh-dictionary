import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { deleteDefinitionBookmark } from "../../services/BookmarkService.ts";
import { CircleCheckSolid } from "../../components/Icons.tsx";
import { Bookmark } from "../../models/Bookmark.ts";
import TTS from "../TTS.tsx";
import { CollectionModal } from "../collection/CollectionModal.tsx";
import { vibrate } from "../../utils/compat.ts";

export default function BookmarkedWords() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomItem = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore],
  );

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/bookmarks?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarks((bookmarks) => [...bookmarks, ...data]);
        setHasMore(data.length > 0);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handleDelete = (definitionId: string) => {
    if (!confirm("Do you really want to remove the bookmark?")) return;
    vibrate([50]);
    deleteDefinitionBookmark(definitionId)
      .then((res) => {
        if (res.status === 204) {
          setBookmarks((items) =>
            items.filter((e) =>
              (e.definitionId as string) !== definitionId as string
            )
          );
        }
      });
  };

  return (
    <>
      <h2>All bookmarks</h2>

      {bookmarks.length > 0 && (
        <ul class="bookmark-list">
          {bookmarks.map((bookmark, i) => (
            // TODO: Extract bookmark Item and pass add/delete function
            <li
              key={bookmark._id}
              ref={bookmarks.length - 1 === i ? bottomItem : null}
              class="bookmark-item"
            >
              <div>
                <p>
                  <a href={"/dictionary/" + bookmark.wordId}>
                    {bookmark.article} {bookmark.word}
                  </a>
                  {/* TODO: opyimize TTS */}
                  <TTS text={bookmark.word} />
                </p>
                <span
                  onClick={() => handleDelete(bookmark.definitionId as string)}
                >
                  <CircleCheckSolid
                    size={16}
                    color="var(--color-yellow)"
                  />
                </span>
              </div>
              <div class="definition">
                {bookmark.definition}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
