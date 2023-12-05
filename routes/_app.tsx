import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import NavigationMenu from "../components/NavigationMenu.tsx";

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
        <script src="/register.js"></script>
      </Head>
      <body class="main">
        <Component />
        <NavigationMenu />
      </body>
    </>
  );
}
