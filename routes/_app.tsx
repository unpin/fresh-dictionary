import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content="#ffcc00"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1c1c1e"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <script src="/register.js"></script>
      </Head>
      <body>
        <Component />
      </body>
    </>
  );
}
