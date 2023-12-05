import { useEffect, useState } from "preact/hooks";
import { addBookmark, deleteBookmark } from "../services/BookmarkService.ts";

interface BookmarkEntryProps {
  wordId: string;
}

export default function BookmarkEntry({ wordId }: BookmarkEntryProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetch("/api/bookmarks/find", {
      method: "POST",
      body: JSON.stringify({
        wordId,
      }),
    }).then(async (res) => {
      const { isBookmarked } = await res.json();
      setIsBookmarked(isBookmarked);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  const handleAdd = () => {
    addBookmark(wordId).then((res) => {
      if (res.status === 201) {
        setIsBookmarked(true);
      }
    }).catch();
  };

  const handleDelete = () => {
    deleteBookmark(wordId).then((res) => {
      if (res.status === 200) {
        setIsBookmarked(false);
      }
    }).catch();
  };

  return (
    <span class="bookmark-btn">
      {isBookmarked
        ? (
          <img
            src="/icons/bookmark-solid.svg"
            onClick={handleDelete}
            alt=""
          />
        )
        : <img src="/icons/bookmark-light.svg" onClick={handleAdd} alt="" />}
    </span>
  );
}
