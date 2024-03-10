import { useState } from "preact/hooks";
import { generateExampleSentence } from "../../services/DictionaryService.ts";
import { JSX } from "preact/jsx-runtime";
import { Copy } from "../../components/Icon.tsx";

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
    btn.disabled = true;
    generateExampleSentence(word).then((response) => {
      if (response.ok) {
        response.json()
          .then(async (json) => {
            setExamples((examples) => [...examples, ""]);
            for await (const word of json.example.split(/\s/)) {
              await new Promise<void>((resolve) => {
                setTimeout(() => {
                  setExamples((examples) => {
                    const curr = examples.pop() + " " + word;
                    return [...examples, curr];
                  });
                  resolve();
                }, 50);
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
    const span = element.closest("span");
    if (!span || !span.classList.contains("copy-to-clipboard")) return;
    const svg = span.querySelector("svg") as SVGSVGElement;
    const p = (span.closest("li") as HTMLLIElement)
      .querySelector("p") as HTMLParagraphElement;

    navigator.clipboard.writeText(p.innerText)
      .then(() => {
        navigator.vibrate([100]);
      });
  };

  return (
    <div class="openai-container">
      <button class="btn btn-animated-border" onClick={onGenerate}>
        Beispielsatz generieren
      </button>
      <ul class="items gap" onClick={copyToClipboard}>
        {examples.map((example) => (
          <li class="gap">
            <p>
              {example}
            </p>
            <span class="copy-to-clipboard">
              <Copy class="icon" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
