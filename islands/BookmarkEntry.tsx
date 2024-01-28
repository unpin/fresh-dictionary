import { StateUpdater } from "preact/hooks";
import { addBookmark, deleteBookmark } from "../services/BookmarkService.ts";
import Icon from "../components/Icon.tsx";
import { Word } from "../types/words.ts";

interface BookmarkEntryProps {
  word: Word;
  setWord: StateUpdater<Word>;
}

export default function BookmarkEntry({ word, setWord }: BookmarkEntryProps) {
  const handleAdd = () => {
    addBookmark(word._id).then((res) => {
      if (res.status === 201) {
        setWord({
          ...word,
          isBookmarked: true,
        });
      }
    }).catch();
  };

  const handleDelete = () => {
    deleteBookmark(word._id).then((res) => {
      if (res.status === 204) {
        setWord({
          ...word,
          isBookmarked: false,
        });
      }
    }).catch();
  };
  return (
    <span class="dictionary-bookmark">
      {word.isBookmarked
        ? <Icon name="bookmark-solid" onClick={handleDelete} />
        : <Icon name="bookmark" onClick={handleAdd} />}
    </span>
  );
}
