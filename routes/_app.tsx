import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <Component />
    </>
  );
}
