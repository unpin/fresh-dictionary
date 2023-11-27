import { Signal } from "@preact/signals";
import { Word } from "../types/words.ts";
import { queryWords } from "../services/WordService.ts";
import { asyncThrottle } from "../utils/throttle.ts";
import { useState } from "preact/hooks";
import { getArticle } from "../utils/words.ts";

interface NavbarSearchProps {
  words: Signal<Word[]>;
}

const queryWordsThrottled = asyncThrottle(queryWords, 500);

export default function NavbarSearch({ words }: NavbarSearchProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWords = async (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (el.value.trim().length < 1) return;
    setIsLoading(true);
    const data = await queryWordsThrottled(el.value) as Word[];
    console.log(data);
    words.value = [...data];
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
      <div class="search-results container">
        {words.value.map((e) => (
          <div>
            <a
              href={"/words/" + encodeURI(e._id)}
              style={{ color: "#333", fontStyle: "Inter", fontSize: "32px" }}
            >
              {getArticle(e.article)} {e.word}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
