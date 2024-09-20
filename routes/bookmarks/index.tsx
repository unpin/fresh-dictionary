import BookmarkList from "../../islands/bookmarks/BookmarkList.tsx";
import Header from "../../islands/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import { Collections } from "../../islands/bookmarks/Collections.tsx";

export default function Bookmarks() {
  return (
    <>
      <Head>
        <title>Bookmarks | Words</title>
      </Head>
      <Header enableNavigation={true} />
      <main class="container">
        <div class="bookmarks-container">
          <Collections />
          <div class="separator"></div>
          <BookmarkList />
        </div>
      </main>
    </>
  );
}
