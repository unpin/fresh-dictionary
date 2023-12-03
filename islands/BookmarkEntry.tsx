import { useEffect, useState } from "preact/hooks";

interface BookmarkEntryProps {
  wordId: string;
}

export default function BookmarkEntry({ wordId }: BookmarkEntryProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetch("/api/bookmarks/find", {
      method: "POST",
      body: JSON.stringify({
        wordId,
      }),
    }).then(async (res) => {
      console.log("api/bookmarks/find", res.status);
      const { isBookmarked } = await res.json();
      console.log({ status: res.status, isBookmarked });

      setBookmarked(isBookmarked);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  const addBookmark = () => {
    fetch("/api/bookmarks/add", {
      method: "POST",
      body: JSON.stringify({
        wordId,
      }),
    }).then((res) => {
      if (res.status === 201) {
        setBookmarked(true);
      }
    }).catch();
  };

  const deleteBookmark = () => {
    fetch("/api/bookmarks/delete", {
      method: "POST",
      body: JSON.stringify({
        wordId,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setBookmarked(false);
      }
    }).catch();
  };

  return (
    <span class="bookmark-btn">
      {bookmarked
        ? (
          <img
            src="/icons/bookmark-solid.svg"
            onClick={deleteBookmark}
            alt=""
          />
        )
        : <img src="/icons/bookmark-light.svg" onClick={addBookmark} alt="" />}
    </span>
  );
}
