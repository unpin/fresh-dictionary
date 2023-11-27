import { useEffect, useRef, useState } from "preact/hooks";
import { Word } from "../types/words.ts";
import { getBookmarkedWords } from "../services/WordService.ts";
import { getArticle } from "../utils/words.ts";

export function LoadWords() {
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<Word[]>([]);
  const div = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  let observer;
  div.current?.addEventListener("click", () => {
    console.log("clicked");
  });

  const cb: IntersectionObserverCallback = (entries) => {
    console.log("end");
    entries.forEach((en) => {
      if (en.isIntersecting) {
        setPage(page + 1);
        getBookmarkedWords(page).then((data) => {
          setWords([...words, ...data]);
        });
        console.log("true");
      } else {
        console.log("false");
      }
    });
  };

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  useEffect(() => {
    observer = new IntersectionObserver(cb, options);
    if (btnRef.current) {
      observer.observe(btnRef.current);
    }
  }, []);
  function loadWords() {
    setPage(page + 1);
    getBookmarkedWords(page).then((data) => {
      setWords([...words, ...data]);
    });
  }

  return (
    <div ref={div}>
      <h1>Page {page}</h1>
      <div>
        {words && words.map((w) => {
          return (
            <div>
              <h3>{getArticle(w.article)} {w.word}</h3>
              <p>{w.definitions[0].definition}</p>
            </div>
          );
        })}
      </div>
      <button ref={btnRef} onClick={loadWords}>Load more</button>
    </div>
  );
}
