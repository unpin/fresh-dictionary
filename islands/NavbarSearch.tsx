import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDictionarySearchHistory } from "../hooks/useDictionarySearchHistory.tsx";
import { Word } from "../types/words.ts";
import {
  ClockRotateLeft,
  MagnifyingGlass,
  SpinnerThird,
  Xmark,
} from "../components/Icon.tsx";

const queryWordsThrottled = asyncThrottle(queryWords, 500);

export default function NavbarSearch() {
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [_, addSearchItem] = useDictionarySearchHistory();
  const [searchItems, __, deleteSearchItem] = useDictionarySearchHistory();

  useEffect(() => {
    queryDictionary();
  }, [query]);

  const queryDictionary = async () => {
    if (query.trim().length < 2) {
      setEntries([]);
      return;
    }

    setIsLoading(true);
    const data = await queryWordsThrottled(query.trim()) as Word[];
    setEntries([...data]);
    setIsLoading(false);
  };

  const clearQuery = () => {
    setQuery("");
    if (searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
  };

  const closeSearchContent = () => {
    setShowContent(false);
    setEntries([]);
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
              autocomplete="off"
              value={query}
              onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
              onFocus={() => setShowContent(true)}
            />

            {isLoading
              ? (
                <div class="search-btn" onClick={queryDictionary}>
                  <SpinnerThird class="icon spinning" />
                </div>
              )
              : (
                query.length > 0
                  ? (
                    <div class="search-btn" onClick={clearQuery}>
                      <Xmark class="icon" />
                    </div>
                  )
                  : (
                    <div class="search-btn" onClick={queryDictionary}>
                      <MagnifyingGlass class="icon" />
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
      {showContent && (
        <>
          <div class="search-content" onClick={() => closeSearchContent()}>
            <div class="container">
              {query.length > 0 && entries.length > 0
                ? (
                  <ul class="items">
                    {entries.map(({ _id, article, word }) => (
                      <li class="item">
                        <a
                          href={"/dictionary/" + encodeURI(_id)}
                          onClick={() =>
                            addSearchItem({
                              _id,
                              searchTerm: article + " " + word,
                            })}
                        >
                          {article
                            ? <span class="search-article">{article}</span>
                            : ""} {word}
                        </a>
                      </li>
                    ))}
                  </ul>
                )
                : (
                  <ul class="items">
                    {searchItems.map(({ _id, searchTerm }) => (
                      <li class="item">
                        <div class="history-entry">
                          <div class="history-entry-word">
                            <ClockRotateLeft class="icon" />
                            <a
                              href={"/dictionary/" + _id}
                            >
                              {searchTerm}
                            </a>
                          </div>
                          <div
                            class="history-close-btn"
                            onClick={() => deleteSearchItem(_id)}
                          >
                            &#10005;
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
