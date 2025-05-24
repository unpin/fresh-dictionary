import BookmarkList from "../../islands/bookmarks/BookmarkList.tsx";
import Header from "../../islands/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import { Collections } from "../../islands/bookmarks/Collections.tsx";
import NavigationMenu from "../../islands/NavigationMenu.tsx";

export default function Bookmarks() {
  return (
    <>
      <Head>
        <title>Bookmarks | Words</title>
      </Head>
      <Header enableBackNavigation />
      <main class="main">
        <div class="container">
          <div class="bookmarks-container">
            <Collections />
            <div class="separator"></div>
            <BookmarkList />
          </div>
        </div>
      </main>
      <NavigationMenu />
    </>
  );
}
