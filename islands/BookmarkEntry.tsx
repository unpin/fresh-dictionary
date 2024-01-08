import { useState } from "preact/hooks";
import { addBookmark, deleteBookmark } from "../services/BookmarkService.ts";
import Icon from "../components/Icon.tsx";
import { Word } from "../types/words.ts";

interface BookmarkEntryProps {
  word: Word;
}

export default function BookmarkEntry({ word }: BookmarkEntryProps) {
  const [isBookmarked, setIsBookmarked] = useState(word.isBookmarked);

  const handleAdd = () => {
    addBookmark(word._id).then((res) => {
      if (res.status === 201) {
        setIsBookmarked(true);
      }
    }).catch();
  };

  const handleDelete = () => {
    deleteBookmark(word._id).then((res) => {
      if (res.status === 204) {
        setIsBookmarked(false);
      }
    }).catch();
  };
  return (
    <span class="dictionary-bookmark">
      {isBookmarked
        ? <Icon name="bookmark-solid" onClick={handleDelete} />
        : <Icon name="bookmark" onClick={handleAdd} />}
    </span>
  );
}
