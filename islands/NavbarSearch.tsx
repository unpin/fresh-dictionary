import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { WordEntry } from "../models/DictionaryEntry.ts";
import Icon from "../components/Icon.tsx";

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
                  <Icon class="icon spinning" name="spinner-third" />
                </div>
              )
              : (
                entries.length > 0
                  ? (
                    <div class="search-btn" onClick={clearQuery}>
                      <Icon name="xmark" />
                    </div>
                  )
                  : (
                    <div class="search-btn" onClick={queryDictionary}>
                      <Icon name="magnifying-glass" />
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
