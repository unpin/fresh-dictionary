import { ComponentChildren } from "preact";
import { AngleLeft } from "../components/Icons.tsx";

interface HeaderProps {
  enableBackNavigation?: boolean;
  children?: ComponentChildren;
}

export default function Header(
  { enableBackNavigation, children }: HeaderProps,
) {
  return (
    <header class="header">
      <div class="container navigation">
        {enableBackNavigation && (
          <div
            class="navigation-button"
            onClick={() => {
              self.history.back();
            }}
          >
            <AngleLeft class="icon" />
          </div>
        )}
        <a href="/" class="brand">
          <img src="/icons/192x192.png" alt="" />
        </a>
      </div>
      {children}
    </header>
  );
}
