import BookmarkList from "../../islands/bookmarks/BookmarkList.tsx";
import Header from "../../islands/Header.tsx";
import NavbarSearch from "../../islands/NavbarSearch.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Bookmarks() {
  return (
    <>
      <Head>
        <title>Bookmarks | Words</title>
      </Head>
      <Header>
        <NavbarSearch />
      </Header>
      <BookmarkList />
    </>
  );
}
