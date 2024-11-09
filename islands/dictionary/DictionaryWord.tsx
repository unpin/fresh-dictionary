import { useState } from "preact/hooks";
import TTS from "../TTS.tsx";
import DictionaryDefinitions from "./DictionaryDefinitions.tsx";
import { Word } from "../../types/words.ts";
import GenerateExample from "./GenerateExample.tsx";
import { addExample } from "../../services/DictionaryService.ts";
import { useAuth } from "../../hooks/useAuth.tsx";

interface DictionaryWordProps {
  entry: Word;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setWord] = useState<Word>(entry);
  const [text, setText] = useState<string>("");
  const [auth] = useAuth();

  function handleAddExample(e: SubmitEvent) {
    e.preventDefault();
    addExample(word._id, text)
      .then(() => {
        if (word.examples) {
          word.examples.push(text);
        } else {
          word.examples = [text];
        }
        setWord({ ...word });
      });
  }

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
      <GenerateExample word={word} />
      {auth.isAdmin &&
        (
          <div>
            <form onSubmit={handleAddExample}>
              <input
                class="form-input"
                type="text"
                value={text}
                onInput={(e) => setText(e.target.value)}
              />
              {text && <button class="btn">+</button>}
            </form>
          </div>
        )}
    </div>
  );
}
