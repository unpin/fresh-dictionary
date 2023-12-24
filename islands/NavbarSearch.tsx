import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { WordEntry } from "../models/DictionaryEntry.ts";

const queryWordsThrottled = asyncThrottle(queryWords, 500);

export default function NavbarSearch() {
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<WordEntry[]>([]);
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
    const data = await queryWordsThrottled(query.trim()) as WordEntry[];
    setEntries([...data]);
    setIsLoading(false);
  };

  const clearQuery = () => {
    setQuery("");
    if (searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
  };

  return (
    <>
      <div class="search-container">
        <div class="container">
          <div class="search-field">
            <input
              ref={searchFieldRef}
              class="search-input"
              placeholder="Stichwort"
              value={query}
              onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            />

            {isLoading
              ? (
                <div class="search-btn" onClick={queryDictionary}>
                  <img class="svg spin" src="/icons/spinner-third.svg">
                  </img>
                </div>
              )
              : (
                entries.length > 0
                  ? (
                    <div class="search-btn" onClick={clearQuery}>
                      <img class="svg" src="/icons/xmark.svg">
                      </img>
                    </div>
                  )
                  : (
                    <div class="search-btn" onClick={queryDictionary}>
                      <img class="svg" src="/icons/magnifying-glass.svg">
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
                    {e.article} {e.word}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
}
