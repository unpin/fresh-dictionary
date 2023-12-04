import { useEffect, useState } from "preact/hooks";

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
      setEntries(data.bookmarks);
    });
  }, []);

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
                <img src="/icons/bookmark-solid.svg" alt="" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
