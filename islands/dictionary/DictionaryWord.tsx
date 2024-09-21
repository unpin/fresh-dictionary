import { useState } from "preact/hooks";
import TTS from "../TTS.tsx";
import DictionaryDefinitions from "./DictionaryDefinitions.tsx";
import { Word } from "../../types/words.ts";
import GenerateExample from "./GenerateExample.tsx";

interface DictionaryWordProps {
  entry: Word;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setWord] = useState(entry);

  return (
    <div class="dictionary-container">
      <div class="dictionary-heading">
        <h1>
          {word.word}
          {word.article && (
            <span class="dictionary-article">, {word.article}</span>
          )}
        </h1>
        <TTS text={word.word} />
      </div>

      <DictionaryDefinitions word={word} setWord={setWord} />
      <h3 class="subheading">Example sentences</h3>
      <GenerateExample word={word.word} />
    </div>
  );
}
