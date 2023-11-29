import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useState } from "preact/hooks";
import { getArticle } from "../utils/words.ts";
import { Entry } from "../models/DictionaryEntry.ts";

const queryWordsThrottled = asyncThrottle(queryWords, 500);

export default function NavbarSearch() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWords = async (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value.trim().length < 1) return;
    setIsLoading(true);
    const data = await queryWordsThrottled(el.value) as Entry[];
    setEntries([...data]);
    setIsLoading(false);
  };

  return (
    <>
      <div class="search-wrapper ">
        <div class="container">
          <div class="search-field">
            <input
              class="search-input"
              placeholder="Search for..."
              onInput={getWords}
            />
            <div class="search-btn">
              {isLoading
                ? (
                  <img class="spin" src="/icons/spinner-third.svg">
                  </img>
                )
                : (
                  <img src="/icons/magnifying-glass.svg">
                  </img>
                )}
            </div>
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
