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
import { FadeInUp, FadeOutDown } from "../utils/Animation.ts";

const queryWordsThrottled = asyncThrottle(queryWords, 500);

export default function NavbarSearch() {
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const searchContentRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [searchItems, addSearchItem, deleteSearchItem, clearSearchItems] =
    useDictionarySearchHistory();
  const [currPage, setCurrPage] = useState(0);
  const [noItemsLeft, setNoItemsLeft] = useState(false);

  useEffect(() => {
    queryDictionary();
    setCurrPage(0);
  }, [query]);

  useEffect(() => {
    if (showContent) {
      FadeInUp(searchContentRef.current as HTMLElement);
    }
  }, [showContent]);

  const queryDictionary = async () => {
    if (query.trim().length < 2) {
      setEntries([]);
      return;
    }
    setNoItemsLeft(false);
    setIsLoading(true);
    const data = await queryWordsThrottled(query.trim()) as Word[];
    setEntries([...data]);
    setIsLoading(false);
  };

  const clearQuery = () => {
    setQuery("");
    if (showContent && searchFieldRef.current) {
      searchFieldRef.current.focus();
    } else {
      setShowContent(false);
    }
  };

  const openSearchContent = () => {
    setShowContent(true);
    self.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
  };

  const closeSearchContent = () => {
    const searchContent = searchContentRef.current as HTMLDivElement;
    FadeOutDown(searchContent);
    setTimeout(() => {
      setShowContent(false);
      document.body.style.overflow = "auto";
    }, 300);
  };

  const showMore = () => {
    if (entries.length < 10 || noItemsLeft) {
      console.log("no more items... returning");
      return;
    }
    queryWords(query.trim(), currPage + 1)
      .then((data) => {
        setEntries([...entries, ...data]);
        if (data.length === 0) setNoItemsLeft(true);
      });
    setCurrPage(currPage + 1);
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
              onFocus={() => openSearchContent()}
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
          <div
            class="search-content"
            ref={searchContentRef}
            onClick={() => closeSearchContent()}
          >
            <div class="container">
              {query.length > 0 && entries.length > 0
                ? (
                  <div class="search-items">
                    <ul class="items">
                      {entries.map(({ _id, article, word }: Word) => (
                        <li class="item">
                          <a
                            href={"/dictionary/" + encodeURI(_id)}
                            onClick={(e) => {
                              e.stopPropagation();
                              addSearchItem({
                                _id,
                                searchTerm: article + " " + word,
                              });
                            }}
                          >
                            {article
                              ? <span class="search-article">{article}</span>
                              : ""} {word}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <footer>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          showMore();
                        }}
                      >
                        Mehr zeigen
                      </a>
                    </footer>
                  </div>
                )
                : (
                  <div class="history-items">
                    <ul class="items">
                      {searchItems.map(({ _id, searchTerm }) => (
                        <li class="item">
                          <div class="history-entry">
                            <div class="flex gap">
                              <ClockRotateLeft class="icon" />
                              <a
                                href={"/dictionary/" + _id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {searchTerm}
                              </a>
                            </div>
                            <div
                              class="btn-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSearchItem(_id);
                              }}
                            >
                              <Xmark class="icon" />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <footer>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          clearSearchItems();
                        }}
                        href=""
                      >
                        Alle löschen
                      </a>
                    </footer>
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
