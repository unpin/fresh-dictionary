import Icon from "./Icon.tsx";

export default function NavigationMenu() {
  return (
    <footer class="navigation-menu">
      <ul>
        <li>
          <a href="/">
            <Icon name="house-blank" />
          </a>
        </li>
        <li>
          <a href="/bookmarks">
            <Icon name="bookmark" />
          </a>
        </li>
        <li>
          <a href="">
            <Icon name="magnifying-glass" />
          </a>
        </li>
        <li>
          <a href="/profile">
            <Icon name="user" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
