import { useEffect, useState } from "preact/hooks";
import { deleteBookmark } from "../../services/BookmarkService.ts";
import { CircleCheckSolid } from "../../components/Icons.tsx";
import { Bookmark } from "../../models/Bookmark.ts";
import TTS from "../TTS.tsx";

export default function BookmarkedWords() {
  const [entries, setEntries] = useState<Bookmark[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((res) => res.json())
      .then((data) => {
        setEntries(() => data);
      });
  }, []);

  const handleDelete = (_id: string) => {
    if (!confirm("Do you really want to remove bookmark?")) return;
    navigator.vibrate([50]);
    deleteBookmark(_id).then((res) => {
      if (res.status === 204) {
        setEntries((items) => items.filter((e) => e._id !== _id));
      }
    });
  };

  const onLoadMore = () => {
    fetch(`/api/bookmarks?page=${page + 1}`)
      .then((res) => res.json())
      .then((data) => {
        setEntries((entries) => [...entries, ...data]);
        setPage((page) => page + 1);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h2>All bookmarks</h2>

      {entries.length > 0 && (
        <ul class="bookmark-list">
          {entries.map((e) => (
            <li key={e._id} class="bookmark-item">
              <div>
                <p>
                  <a href={"/dictionary/" + e.wordId}>
                    {e.article} {e.word}
                  </a>
                  <TTS text={e.word} />
                </p>
                <span onClick={() => handleDelete(e._id)}>
                  <CircleCheckSolid class="icon bookmark-icon" />
                </span>
              </div>
              <div class="definition">
                {e.definition}
              </div>
            </li>
          ))}
        </ul>
      )}
      <button class="btn" onClick={onLoadMore}>Show more</button>
    </>
  );
}
