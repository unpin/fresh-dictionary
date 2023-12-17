import { useState } from "preact/hooks";
import {
  WordEntry,
  WordEntryDefinition,
} from "../../models/DictionaryEntry.ts";
import BookmarkEntry from "../BookmarkEntry.tsx";
import TTS from "../TTS.tsx";

interface DictionaryWordProps {
  entry: WordEntry;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setEntry] = useState(entry);
  // TODO delete example from Database
  const deleteExample = (defIdx: number, exampleIdx: number) => {
    word.definitions[defIdx].examples.splice(exampleIdx, 1);
    setEntry({ ...word });
  };
  const textToSpeak = word.article ? word.article + " " + word.word : word.word;

  const groupByType = (entry: WordEntry) => {
    return entry.definitions.reduce((prev, curr) => {
      if (prev.has(curr.type)) {
        prev.get(curr.type).push(curr);
      } else {
        prev.set(curr.type, [curr]);
      }
      return prev;
    }, new Map()) as Map<string, WordEntryDefinition[]>;
  };

  const grouped = groupByType(word);
  console.log(grouped);

  return (
    <>
      <div class="dictionary-heading">
        <h1 class="my-4 dictionary-word">{word.article + " "}{word.word}</h1>
        <TTS text={textToSpeak} />
        <BookmarkEntry wordId={word._id.toString()} />
      </div>
      {Array.from(grouped.keys()).map((key) => {
        return (
          <>
            <span class="entry-type">{key}</span>
            <ul class="my-4">
              {grouped.get(key)!.map(
                (def: WordEntryDefinition, defIdx: number) => {
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
                                <span
                                  onClick={() => deleteExample(defIdx, exIdx)}
                                >
                                  delete
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  );
                },
              )}
            </ul>
          </>
        );
      })}
    </>
  );
}
