import { useState } from "preact/hooks";
import BookmarkEntry from "../BookmarkEntry.tsx";
import TTS from "../TTS.tsx";
import DictionaryDefinitions from "./DictionaryDefinitions.tsx";
import { Word } from "../../types/words.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import GenerateExample from "./GenerateExample.tsx";

interface DictionaryWordProps {
  entry: Word;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setWord] = useState(entry);
  const [auth] = useAuth();

  return (
    <div class="dictionary-entry">
      <div class="dictionary-heading">
        <h1>
          <div class="dictionary-word">
            {word.word}
            {word.article && (
              <span class="dictionary-article">, {word.article}</span>
            )}
          </div>
          <TTS text={word.word} />
        </h1>
        {auth.isAdmin &&
          <BookmarkEntry word={word} setWord={setWord} />}
      </div>

      <DictionaryDefinitions word={word} setWord={setWord} />
      <h3 class="subheading">Example sentences</h3>
      <GenerateExample word={word.word} />
    </div>
  );
}
