import { useState } from "preact/hooks";
import { generateExampleSentence } from "../../services/DictionaryService.ts";
import { JSX } from "preact/jsx-runtime";
import { delay } from "../../utils/async.ts";
import { BounceIn } from "../../utils/Animation.ts";
import { vibrate } from "../../utils/compat.ts";

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
    vibrate([50]);
    btn.disabled = true;
    generateExampleSentence(word)
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then(async (json) => {
              setExamples((examples) => ["", ...examples]);
              for await (const word of json.example.split(/\s/)) {
                await delay(50);
                vibrate([20]);
                setExamples((examples) => {
                  const sentence = examples.shift() + " " + word;
                  return [sentence.trim(), ...examples];
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
        vibrate([50]);
      });
  };

  return (
    <div class="openai-container">
      {/* Add context button so that users can add context */}
      <button class="button" onClick={onGenerate}>
        <span></span>
        Beispielsatz generieren
        <svg
          class="icon anime"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style="height: 18px"
        >
          <defs>
            <linearGradient
              id="colorfulGradient"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#ff00cc">
                <animate
                  attributeName="stop-color"
                  values="#ff00cc; #333399; #ff00cc"
                  dur="2s"
                  repeatCount="indefinite"
                >
                </animate>
              </stop>

              <stop offset="100%" stop-color="#333399">
                <animate
                  attributeName="stop-color"
                  values="#333399; #ff00cc; #333399"
                  dur="2s"
                  repeatCount="indefinite"
                >
                </animate>
              </stop>
            </linearGradient>
            <linearGradient
              id="neutralGradient"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#ff00cc">
                <animate
                  attributeName="stop-color"
                  values="#fff; #aaa; #fff"
                  dur="2s"
                  repeatCount="indefinite"
                >
                </animate>
              </stop>

              <stop offset="100%" stop-color="#333399">
                <animate
                  attributeName="stop-color"
                  values="#ff00cc; #fff; #ff00cc"
                  dur="2s"
                  repeatCount="indefinite"
                >
                </animate>
              </stop>
            </linearGradient>
          </defs>
          <path d="M352 16V80h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H352v64c0 8.8-7.2 16-16 16s-16-7.2-16-16V112H256c-8.8 0-16-7.2-16-16s7.2-16 16-16h64V16c0-8.8 7.2-16 16-16s16 7.2 16 16zM152.8 265.5c-4.7 9.5-13.7 16-24.1 17.5L41.2 295.8l63.4 61.9c7.5 7.3 11 17.9 9.2 28.3l-15 87.3L177 432.1c9.3-4.9 20.5-4.9 29.8 0L285 473.3l-15-87.3c-1.8-10.4 1.7-20.9 9.2-28.3l63.4-61.9-87.5-12.7c-10.4-1.5-19.4-8.1-24.1-17.5l-39.1-79.4-39.1 79.4zm17.6-108.1c8.8-17.9 34.3-17.9 43.1 0l46.3 94 103.5 15.1c19.7 2.9 27.5 27 13.3 40.9l-74.9 73.2 17.7 103.3c3.4 19.6-17.2 34.6-34.8 25.3l-92.6-48.8L99.3 509.2c-17.6 9.3-38.2-5.7-34.8-25.3L82.2 380.6 7.2 307.4C-7 293.5 .9 269.3 20.5 266.5l103.5-15.1 46.3-94zM448 160c8.8 0 16 7.2 16 16v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H464v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V240H400c-8.8 0-16-7.2-16-16s7.2-16 16-16h32V176c0-8.8 7.2-16 16-16z" />
        </svg>
      </button>
      {examples.length > 0 &&
        (
          <ul class="items gap" onClick={copyToClipboard}>
            {examples.map((example) => (
              <li class="gap">
                {example}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
