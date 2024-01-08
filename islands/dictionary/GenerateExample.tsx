import { useState } from "preact/hooks";
import { generateExampleSentence } from "../../services/DictionaryService.ts";

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

  return (
    <div class="openai-container">
      <button class="btn" onClick={onClick}>
        Generate an example sentence
      </button>
      <ul class="items">
        {examples.map((example) => <li>{example}</li>)}
      </ul>
    </div>
  );
}
