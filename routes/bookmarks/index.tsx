import { useEffect } from "preact/hooks";
import Navbar from "../../components/Navbar.tsx";
import BookmarkList from "../../islands/bookmarks/BookmarkList.tsx";

export default function Bookmarks() {
  return (
    <>
      <Navbar />
      <BookmarkList />
    </>
  );
}
