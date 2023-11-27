import { findById } from "../services/WordService.ts";
import { Word } from "../types/words.ts";
import { useEffect, useState } from "preact/hooks";
import AddDefinition from "./AddDefinition.tsx";

interface WordDefinitionProps {
  _id: string;
}

export default function WordDefinition(props: WordDefinitionProps) {
  const _id = props._id;
  console.log(_id);

  const [word, setWord] = useState<Word | null>(null);

  useEffect(() => {
    findById(_id).then((data) => {
      console.log("data", data);

      setWord(() => data.data);
    });
  }, []);

  return (
    <>
      {word !== null && (
        <>
          <h2>{word.article} {word.word}</h2>
          <ul>
            {word.definitions.map((e) => (
              <div>
                <li>{e.definition}</li>
                <li>{e.example}</li>
                <li>{e.type}</li>
                <li>{e.usageLabel}</li>
              </div>
            ))}
          </ul>
        </>
      )}
      <AddDefinition />
    </>
  );
}
