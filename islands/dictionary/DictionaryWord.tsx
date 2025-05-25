import { useState } from "preact/hooks";
import TTS from "../TTS.tsx";
import DictionaryDefinitions from "./DictionaryDefinitions.tsx";
import { Word } from "../../types/words.ts";
import GenerateExample from "./GenerateExample.tsx";
import { addExample } from "../../services/DictionaryService.ts";
import { useAuth } from "../../hooks/useAuth.ts";

interface DictionaryWordProps {
  entry: Word;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  const [word, setWord] = useState(entry);
  const [text, setText] = useState("");
  const [auth] = useAuth();

  function handleAddExample(e: SubmitEvent) {
    e.preventDefault();
    const trimmedText = text.trim();
    addExample(word._id, trimmedText)
      .then(() => {
        if (word.examples) {
          word.examples.push(trimmedText);
        } else {
          word.examples = [trimmedText];
        }
        setWord({ ...word });
        setText("");
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
              <textarea
                class="form-input w-full overflow-hidden"
                type="text"
                value={text}
                onInput={({ currentTarget }) => {
                  setText(currentTarget.value);
                  currentTarget.style.height = currentTarget.scrollHeight +
                    "px";
                }}
              />
              {text && <button class="btn">+</button>}
            </form>
          </div>
        )}
    </div>
  );
}
