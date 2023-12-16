import { useState } from "preact/hooks";
import { WordEntry } from "../../models/DictionaryEntry.ts";
import BookmarkEntry from "../BookmarkEntry.tsx";
import TTS from "../TTS.tsx";

interface DictionaryWordProps {
  entry: WordEntry;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setEntry] = useState(entry);
  const deleteExample = (defIdx: number, exampleIdx: number) => {
    word.definitions[defIdx].examples.splice(exampleIdx, 1);
    setEntry({ ...word });
  };
  const textToSpeak = word.article ? word.article + " " + word.word : word.word;
  return (
    <>
      <div class="dictionary-heading">
        <h1 class="my-4 dictionary-word">{word.article + " "}{word.word}</h1>
        <TTS text={textToSpeak} />
        <BookmarkEntry wordId={word._id.toString()} />
      </div>
      <span class="entry-type">{/* TODO ADD TYPE */}</span>
      <h3 class="my-4">Bedeutungen</h3>
      <ul class="my-4">
        {word.definitions.map((def, defIdx) => {
          return (
            <li class="my-4">
              <div class="definition-counter my-2">{defIdx + 1}.</div>
              <div>{def.definition}</div>
              {def.examples &&
                (
                  <ul class="definition-examples">
                    {def.examples.map((e, exIdx) => (
                      <li>
                        {e}{" "}
                        <span onClick={() => deleteExample(defIdx, exIdx)}>
                          delete
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
