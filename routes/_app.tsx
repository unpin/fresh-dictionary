import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body class="main">
        <div>
          <Component />
        </div>
        <footer>
          <ul class="navigation-menu">
            <li>
              <a href="/">
                <img src="/icons/house-blank.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="/icons/magnifying-glass.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="/icons/lines-leaning.svg" alt="" />
              </a>
            </li>
            <li>
              <a href="/bookmarks">
                <img src="/icons/bookmark-light.svg" alt="" />
              </a>
            </li>
          </ul>
        </footer>
      </body>
    </>
  );
}
