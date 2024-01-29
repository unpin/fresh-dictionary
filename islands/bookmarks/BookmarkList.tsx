import { useEffect, useState } from "preact/hooks";
import { deleteBookmark } from "../../services/BookmarkService.ts";
import { BookmarkSolid } from "../../components/Icon.tsx";

interface Entry {
  _id: string;
  word: string;
  article: string;
}

export default function BookmarkedWords() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((res) => res.json())
      .then((data) => {
        setEntries(() => data);
      });
  }, []);

  const handleDelete = (_id: string) => {
    navigator.vibrate([100]);
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
    <div class="container">
      <div class="bookmarks-container">
        {entries.length > 0 && (
          <>
            <ul>
              {entries.map((e) => (
                <li key={e._id}>
                  <a href={"/dictionary/" + e._id}>
                    {e.article} {e.word}
                  </a>
                  <span onClick={() => handleDelete(e._id)}>
                    <BookmarkSolid class="icon" />
                  </span>
                </li>
              ))}
            </ul>
            <button class="btn" onClick={onLoadMore}>Load more</button>
          </>
        )}
      </div>
    </div>
  );
}
