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

  const onClick = () => {
    generateExampleSentence(word).then((response) => {
      console.log("status", response.status);

      if (response.ok) {
        response.json()
          .then((json) => {
            const example = json.example as string;
            console.log({ example });

            setExamples((examples) => [...examples, example]);
          });
      }
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
        // TODO notify user that text is copied and add animation
        svg.style.fill = "springgreen";
        setTimeout(() => {
          svg.style.fill = "var(--color-text)";
        }, 3000);
      });
  };

  return (
    <div class="openai-container">
      <button class="btn btn-animated-border" onClick={onClick}>
        Beispielsatz generieren
      </button>
      <ul class="items" onClick={copyToClipboard}>
        {examples.map((example) => (
          <li>
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
