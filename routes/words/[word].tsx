import { PageProps } from "$fresh/server.ts";
import WordDefinition from "../../islands/WordDefinition.tsx";

export default function Definition(props: PageProps) {
  return (
    <div>
      <WordDefinition _id={props.params._id} />
    </div>
  );
}
