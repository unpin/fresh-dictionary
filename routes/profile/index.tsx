import Header from "../../islands/Header.tsx";
import NavigationMenu from "../../islands/NavigationMenu.tsx";

export default function () {
  return (
    <>
      <Header />
      <main class="main">
        <div class="container">
          <a href="/signout">Sign out</a>
        </div>
      </main>
      <NavigationMenu />
    </>
  );
}
