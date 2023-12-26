import { useEffect, useState } from "preact/hooks";
import { addBookmark, deleteBookmark } from "../services/BookmarkService.ts";
import Icon from "../components/Icon.tsx";

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
      if (res.status === 204) {
        setIsBookmarked(false);
      }
    }).catch();
  };
  return (
    <span class="bookmark-btn">
      {isBookmarked
        ? <Icon name="bookmark-solid" onClick={handleDelete} />
        : <Icon name="bookmark" onClick={handleAdd} />}
    </span>
  );
}
