import BackLink from "../islands/BackLink.tsx";
/* Deprecared */
export default function Navbar() {
  return (
    <header class="header">
      <div class="container header-content">
        <BackLink />
        <a href="/" class="logo">
          <img src="/icons/192x192.png" alt="" />
        </a>
      </div>
    </header>
  );
}
