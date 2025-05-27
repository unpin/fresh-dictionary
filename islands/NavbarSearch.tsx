import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDictionarySearchHistory } from "../hooks/useDictionarySearchHistory.ts";
import { Word } from "../types/words.ts";
import {
  AngleDown,
  ChevronRight,
  MagnifyingGlass,
  SpinnerThird,
  Xmark,
} from "../components/Icons.tsx";
import { FadeInUp, FadeOutDown } from "../utils/Animation.ts";
import List from "./components/List.tsx";

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
    if (entries.length < 10 || noItemsLeft) return;
    queryWords(query.trim(), currPage + 1)
      .then((data) => {
        setEntries([...entries, ...data]);
        if (data.length === 0) setNoItemsLeft(true);
        setCurrPage(currPage + 1);
      });
  };

  const showResults = entries.length > 0;
  const showHistory = !showResults && searchItems.length > 0;

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
                  <SpinnerThird class="spinning" size={18} />
                </div>
              )
              : (
                query.length > 0
                  ? (
                    <div class="search-btn" onClick={clearQuery}>
                      <Xmark size={18} />
                    </div>
                  )
                  : (
                    <div class="search-btn" onClick={queryDictionary}>
                      <MagnifyingGlass size={18} />
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
              {showResults
                ? (
                  <SearchResults
                    entries={entries}
                    addSearchItem={addSearchItem}
                    showMore={showMore}
                  />
                )
                : showHistory
                ? (
                  <SearchHistory
                    searchItems={searchItems}
                    deleteSearchItem={deleteSearchItem}
                    clearSearchItems={clearSearchItems}
                  />
                )
                : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function SearchResults({
  entries,
  addSearchItem,
  showMore,
}: {
  entries: Word[];
  addSearchItem: (item: { _id: string; searchTerm: string }) => void;
  showMore: () => void;
}) {
  return (
    <div class="search-items">
      <List items={entries} getKey={(item) => item._id}>
        {(item: Word) => (
          <a
            href={"/dictionary/" + encodeURI(item._id)}
            class="flex align-center space-between"
            onClick={(e) => {
              e.stopPropagation();
              addSearchItem({
                _id: item._id,
                searchTerm: item.article + " " + item.word,
              });
            }}
          >
            <span>
              {item.article
                ? <span class="search-article">{item.article}</span>
                : ""} {item.word}
            </span>
            <div class="icon-wrapper">
              <ChevronRight size={16} />
            </div>
          </a>
        )}
      </List>
      <footer>
        <div
          class="flex items-center justify-center w-full h-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            showMore();
          }}
        >
          <div class="icon-wrapper">
            <AngleDown size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
}

function SearchHistory({
  searchItems,
  deleteSearchItem,
  clearSearchItems,
}: {
  searchItems: { _id: string; searchTerm: string }[];
  deleteSearchItem: (id: string) => void;
  clearSearchItems: () => void;
}) {
  return (
    <div class="search-items">
      <List items={searchItems} getKey={(item) => item._id}>
        {(item) => (
          <a
            href={"/dictionary/" + item._id}
            class="flex align-center space-between"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span>{item.searchTerm}</span>
            <div
              class="icon-wrapper"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteSearchItem(item._id);
              }}
            >
              <Xmark size={16} />
            </div>
          </a>
        )}
      </List>
      <footer>
        <a
          onClick={(e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            clearSearchItems();
          }}
          href=""
        >
          Clear history
        </a>
      </footer>
    </div>
  );
}
