import BookmarkList from "../../islands/bookmarks/BookmarkList.tsx";
import Header from "../../components/Header.tsx";
import NavbarSearch from "../../islands/NavbarSearch.tsx";

export default function Bookmarks() {
  return (
    <>
      <Header>
        <NavbarSearch />
      </Header>
      <BookmarkList />
    </>
  );
}
