import { useState } from "preact/hooks";
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
  const [showAddDefinition, setShowAddDefinition] = useState(false);

  return (
    <>
      <div class="dictionary-word my-4">
        <h1>
          {word.word}
          <TTS text={word.word} />
        </h1>
        <BookmarkEntry word={word} />
      </div>
      {word.article &&
        (
          <div class="my-4">
            <span class="dictionary-article">{word.article}</span>
          </div>
        )}
      <DictionaryDefinitions word={word} setWord={setWord} />
      {showAddDefinition
        ? (
          <AddDefinition
            word={word}
            setWord={setWord}
            onClose={() => setShowAddDefinition(false)}
          />
        )
        : (
          <button class="btn" onClick={() => setShowAddDefinition(true)}>
            Add definition
          </button>
        )}
    </>
  );
}
