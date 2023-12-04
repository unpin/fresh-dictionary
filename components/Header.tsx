import { ComponentChildren } from "preact";

interface HeaderProps {
  children: ComponentChildren;
}

export default function Header(props: HeaderProps) {
  return (
    <header class="header">
      <div class="container">
        <a href="/" class="logo">
          <img src="/icons/192x192.png" alt="" />
        </a>
      </div>
      {props.children}
    </header>
  );
}
