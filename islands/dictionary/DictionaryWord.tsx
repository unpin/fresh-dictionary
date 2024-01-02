import { useEffect, useState } from "preact/hooks";
import BookmarkEntry from "../BookmarkEntry.tsx";
import TTS from "../TTS.tsx";
import DictionaryDefinitions from "./DictionaryDefinitions.tsx";
import { Word } from "../../types/words.ts";
import AddDefinition from "./AddDefinition.tsx";

interface DictionaryWordProps {
  entry: Word;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setWord] = useState(entry);
  const [isAddDefinition, setIsAddDefinition] = useState(false);
  const textToSpeak = word.article ? word.article + " " + word.word : word.word;

  return (
    <>
      <div class="dictionary-heading">
        <h1 class="my-4 dictionary-word">
          {textToSpeak}
          <TTS text={textToSpeak} />
        </h1>
        <BookmarkEntry word={word} />
      </div>
      <DictionaryDefinitions word={word} setWord={setWord} />
      {isAddDefinition
        ? (
          <AddDefinition
            word={word}
            setWord={setWord}
            onClose={() => setIsAddDefinition(false)}
          />
        )
        : (
          <button class="btn" onClick={() => setIsAddDefinition(true)}>
            Add definition
          </button>
        )}
    </>
  );
}
