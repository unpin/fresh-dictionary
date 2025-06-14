import { useEffect, useState } from "preact/hooks";
import {
  Bookmark,
  BookmarkSolid,
  Dummbell,
  DummbellSolid,
  House,
  HouseSolid,
  User,
  UserSolid,
} from "../components/Icons.tsx";

export default function NavigationMenu() {
  const [items, setItems] = useState([
    { href: "/", Icon: House, ActiveIcon: HouseSolid, isActive: false },
    {
      href: "/bookmarks",
      Icon: Bookmark,
      ActiveIcon: BookmarkSolid,
      isActive: false,
    },
    {
      href: "/practice",
      Icon: Dummbell,
      ActiveIcon: DummbellSolid,
      isActive: false,
    },
    {
      href: "/profile",
      Icon: User,
      ActiveIcon: UserSolid,
      isActive: false,
    },
  ]);

  useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      isActive: self.location.pathname === item.href,
    }));
    setItems(updatedItems);
  }, []);

  return (
    <nav class="navigation-menu">
      <div class="container">
        <ul>
          {items.map(({ href, Icon, ActiveIcon, isActive }) => {
            {
              return (
                <li>
                  <a href={href}>
                    {isActive ? <ActiveIcon size={24} /> : <Icon size={24} />}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </nav>
  );
}
