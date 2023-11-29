import { useEffect, useState } from "preact/hooks";

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("menu-overlay");

  useEffect(() => {
    if (open) {
      setMenuClass(() => "menu-overlay open");
    } else {
      setMenuClass(() => "menu-overlay");
    }
  }, [open]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div class="menu" onClick={handleClick}>
        <img src="/icons/bars.svg" alt="" />
      </div>
      <div class={menuClass}>
        <div class="menu-close-btn" onClick={handleClick}>&#10005;</div>

        <div class="menu-items">
          <ul>
            <li>
              <a href="/">
                <div>Home</div>
              </a>
            </li>
            <li>
              <a href="/bookmarks">Bookmarks</a>
            </li>
          </ul>
          <footer>
            <li>
              <a href="/signout">Sign out</a>
            </li>
          </footer>
        </div>
      </div>
    </div>
  );
}
