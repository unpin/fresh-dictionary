import { Bookmark, HouseBlank, MagnifyingGlass, User } from "./Icon.tsx";

export default function NavigationMenu() {
  return (
    <footer class="navigation-menu">
      <div class="container">
        <ul>
          <li>
            <a href="/">
              <HouseBlank class="icon" />
            </a>
          </li>
          <li>
            <a href="/bookmarks">
              <Bookmark class="icon" />
            </a>
          </li>
          <li>
            <a href="">
              <MagnifyingGlass class="icon" />
            </a>
          </li>
          <li>
            <a href="/profile">
              <User class="icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
