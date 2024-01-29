import { StateUpdater, useRef } from "preact/hooks";
import { addBookmark, deleteBookmark } from "../services/BookmarkService.ts";
import { Word } from "../types/words.ts";
import { Bookmark, BookmarkSolid } from "../components/Icon.tsx";

interface BookmarkEntryProps {
  word: Word;
  setWord: StateUpdater<Word>;
}

const bookmarkAnimation = [
  { transform: "translateY(0px)" },
  { transform: "translateY(-10px) scaleY(.75) scaleX(1.1)" },
  { transform: "translateY(0px) scaleY(1.1) scaleX(.9)" },
  { transform: "translateY(-8px) scaleY(.85) scaleX(1.05)" },
  { transform: "translateY(0px) scaleY(1.05) scaleX(.95)" },
  { transform: "translateY(0px)" },
];

export default function BookmarkEntry({ word, setWord }: BookmarkEntryProps) {
  const handleAdd = () => {
    setWord({
      ...word,
      isBookmarked: true,
    });
    navigator.vibrate([100]);
    addBookmark(word._id).then((res) => {
      if (res.status === 201) {
        if (bookmarkSpanRef.current) {
          bookmarkSpanRef.current.animate(bookmarkAnimation, { duration: 500 });
        }
      } else {
        setWord({
          ...word,
          isBookmarked: false,
        });
      }
    }).catch();
  };

  const bookmarkSpanRef = useRef<HTMLElement>(null);

  const handleDelete = () => {
    setWord({
      ...word,
      isBookmarked: false,
    });
    navigator.vibrate([100]);
    deleteBookmark(word._id).then((res) => {
      if (res.status === 204) {
        if (bookmarkSpanRef.current) {
          bookmarkSpanRef.current.animate(bookmarkAnimation, { duration: 500 });
        }
      } else {
        setWord({
          ...word,
          isBookmarked: true,
        });
      }
    }).catch();
  };
  return (
    <span class="dictionary-bookmark" ref={bookmarkSpanRef}>
      {word.isBookmarked
        ? (
          <span onClick={handleDelete}>
            <BookmarkSolid class="icon" />
          </span>
        )
        : (
          <span onClick={handleAdd}>
            <Bookmark class="icon" />
          </span>
        )}
    </span>
  );
}
