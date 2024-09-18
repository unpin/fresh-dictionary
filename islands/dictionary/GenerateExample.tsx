import { useState } from "preact/hooks";
import { generateExampleSentence } from "../../services/DictionaryService.ts";
import { JSX } from "preact/jsx-runtime";
import { Copy } from "../../components/Icons.tsx";
import { delay } from "../../utils/async.ts";
import { BounceIn } from "../../utils/Animation.ts";

interface GenerateExampleProps {
  word: string;
}

export default function GenerateExample(
  { word }: GenerateExampleProps,
) {
  const [examples, setExamples] = useState<string[]>([]);

  const onGenerate = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.classList.add("animated");
    navigator.vibrate([50]);
    btn.disabled = true;
    generateExampleSentence(word).then((response) => {
      if (response.ok) {
        response.json()
          .then(async (json) => {
            setExamples((examples) => [...examples, ""]);
            for await (const word of json.example.split(/\s/)) {
              await delay(50);
              navigator.vibrate([20]);
              setExamples((examples) => {
                const curr = examples.pop() + " " + word;
                return [...examples, curr];
              });
            }
          });
      }
    }).finally(() => {
      btn.classList.remove("animated");
      btn.disabled = false;
    });
  };

  const copyToClipboard = (e: JSX.TargetedEvent) => {
    const element = e.target as HTMLElement;
    const li = element.closest("li");
    if (!li) return;
    BounceIn(li, {
      duration: 750,
    });
    navigator.clipboard.writeText(li.innerText)
      .then(() => {
        navigator.vibrate([50]);
      });
  };

  return (
    <div class="openai-container">
      {/* Add context button so that users can add context */}
      <button class="btn btn-animated-border" onClick={onGenerate}>
        Beispielsatz generieren
      </button>
      <ul class="items gap" onClick={copyToClipboard}>
        {examples.map((example) => (
          <li class="gap">
            {example}
          </li>
        ))}
      </ul>
    </div>
  );
}
