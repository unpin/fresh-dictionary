import { ComponentChildren } from "preact";
import { AngleLeft } from "../components/Icons.tsx";

interface HeaderProps {
  enableNavigation?: boolean;
  children?: ComponentChildren;
}

export default function Header({ enableNavigation, children }: HeaderProps) {
  return (
    <header class="header">
      <div class="container navigation">
        {enableNavigation && (
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
