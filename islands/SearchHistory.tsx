import { useEffect, useState } from "preact/hooks";

interface SearchHistory {
  _id: string;
  word: string;
}

export default function PreviousSearches() {
  const [history, setHistory] = useState<SearchHistory[]>([]);
  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]",
    ) as SearchHistory[];
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.setItem("searchHistory", "[]");
    setHistory([]);
  };

  return (
    history.length > 0
      ? (
        <div class="history-container">
          <div class="container">
            <div class="history-heading">
              <h2>
                Verlauf
              </h2>
              <span>
                <img
                  class="history-icon"
                  src="/icons/clock-rotate-left.svg"
                  alt=""
                />
              </span>
            </div>
            {history.map((el) => (
              <div class="history-entry">
                <a href={"/dictionary/" + el._id}>{el.word}</a>
              </div>
            ))}
          </div>
          <footer class="history-footer">
            <div class="history-clear-btn" onClick={clearHistory}>
              Alle löschen
            </div>
          </footer>
        </div>
      )
      : <></>
  );
}
