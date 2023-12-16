import { useEffect, useState } from "preact/hooks";

interface SearchHistory {
  _id: string;
  word: string;
  article: string;
}

export default function PreviousSearches() {
  const [history, setHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]",
    ) as SearchHistory[];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  const removeItem = (_id: string) => {
    setHistory(history.filter((e) => e._id !== _id));
  };

  return (
    <>
      {history.length > 0 && (
        <div class="container">
          <div class="search-history">
            {history.map((entry) => (
              <div class="history-entry">
                <div class="history-entry-word">
                  <img
                    class="history-icon"
                    src="/icons/clock-rotate-left.svg"
                    alt=""
                  />
                  <a href={"/dictionary/" + entry._id} data-id={entry._id}>
                    {entry.word}
                  </a>
                </div>
                <div
                  class="history-close-btn"
                  onClick={() => removeItem(entry._id)}
                >
                  &#10005;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
