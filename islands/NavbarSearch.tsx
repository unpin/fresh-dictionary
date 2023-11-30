import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useEffect, useState } from "preact/hooks";
import { getArticle } from "../utils/words.ts";
import { Entry } from "../models/DictionaryEntry.ts";

const queryWordsThrottled = asyncThrottle(queryWords, 500);

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getWords();
  }, [query]);

  const getWords = async () => {
    if (query.trim().length < 2) {
      setEntries([]);
      return;
    }

    setIsLoading(true);
    const data = await queryWordsThrottled(query) as Entry[];
    setEntries([...data]);
    setIsLoading(false);
  };

  return (
    <>
      <div class=" search-wrapper">
        <div class="container">
          <div class="search-field">
            <input
              class="search-input"
              placeholder="Stichwort"
              value={query}
              onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            />

            {isLoading
              ? (
                <div class="search-btn" onClick={getWords}>
                  <img class="spin" src="/icons/spinner-third.svg">
                  </img>
                </div>
              )
              : (
                entries.length > 0
                  ? (
                    <div class="search-btn" onClick={() => setEntries([])}>
                      <img src="/icons/xmark.svg">
                      </img>
                    </div>
                  )
                  : (
                    <div class="search-btn">
                      <img src="/icons/magnifying-glass.svg">
                      </img>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
      {entries.length > 0 &&
        (
          <div class="search-results container search-dropdown">
            <div class="dictionary-entries">
              {entries.map((e) => (
                <>
                  <div class="entry-article">
                    {getArticle(e.article) || "-"}
                  </div>
                  <a
                    class="entry-word"
                    href={"/dictionary/" + encodeURI(e._id.toString())}
                  >
                    {e.word}
                  </a>
                </>
              ))}
            </div>
            <footer class="search-footer">Show more results</footer>
          </div>
        )}
    </>
  );
}
