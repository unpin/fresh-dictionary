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
    queryDictionary();
  }, [query]);

  const queryDictionary = async () => {
    if (query.trim().length < 2) {
      setEntries([]);
      return;
    }

    setIsLoading(true);
    const data = await queryWordsThrottled(query.trim()) as Entry[];
    setEntries([...data]);
    setIsLoading(false);
  };

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <>
      <div class="search-container">
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
                <div class="search-btn" onClick={queryDictionary}>
                  <img class="spin" src="/icons/spinner-third.svg">
                  </img>
                </div>
              )
              : (
                entries.length > 0
                  ? (
                    <div class="search-btn" onClick={clearQuery}>
                      <img src="/icons/xmark.svg">
                      </img>
                    </div>
                  )
                  : (
                    <div class="search-btn" onClick={queryDictionary}>
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
          <div class="results-container">
            <ul>
              {entries.map((e) => (
                <li>
                  <a
                    class="entry-word"
                    href={"/dictionary/" + encodeURI(e._id.toString())}
                  >
                    {e.word}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
}
