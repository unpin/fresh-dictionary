import { useEffect, useState } from "preact/hooks";
import { deleteBookmark } from "../../services/BookmarkService.ts";

interface Entry {
  _id: string;
  word: string;
}

interface BookmarkProps {
  bookmarks: Entry[];
}

export default function BookmarkedWords() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("/api/bookmarks").then((res) => res.json()).then((data) => {
      setEntries(data);
    });
  }, []);

  const handleDelete = (_id: string) => {
    deleteBookmark(_id).then((res) => {
      if (res.status === 204) {
        setEntries(entries.filter((e) => e._id !== _id));
      }
    });
  };

  return (
    <div class="container">
      <div class="bookmarks-container">
        {entries.length > 0 && (
          <ul>
            {entries.map((e) => (
              <li>
                <a href={"/dictionary/" + e._id}>
                  {e.word}
                </a>
                <img
                  src="/icons/bookmark-solid.svg"
                  alt=""
                  onClick={() => handleDelete(e._id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
