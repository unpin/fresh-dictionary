import { StateUpdater, useEffect, useState } from "preact/hooks";
import Icon from "../../components/Icon.tsx";
import { Definition, Word } from "../../types/words.ts";
import { JSX } from "preact/jsx-runtime";

interface DictionaryDefinitionProps {
  definition: Definition;
  order: number;
  wordId: string;
  setWord: StateUpdater<Word>;
  onDeleteDefinition: (e: MouseEvent) => void;
}

export default function DictionaryDefinition(
  { definition, order, setWord, onDeleteDefinition, wordId }:
    DictionaryDefinitionProps,
) {
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [examples, setExamples] = useState<string[]>([]);

  useEffect(() => {
    if (definition.examples) {
      setExamples(definition.examples);
    }
  }, [definition]);

  return (
    <li>
      <div class="definition-counter my-2">{order + 1}.</div>
      <div class="definition-term">
        <p contentEditable={isContentEditable}>{definition.definition}</p>
        {!isContentEditable && (
          <Icon
            name="pen-to-square"
            onClick={() => setIsContentEditable(!isContentEditable)}
          />
        )}
      </div>
      <ul class="definition-examples">
        {examples.map((example, idx) => (
          <li>
            <p contentEditable={isContentEditable}>
              {example}
            </p>
          </li>
        ))}
      </ul>
      {isContentEditable && (
        <div class="definition-buttons">
          <button
            class="btn"
            data-_id={definition._id}
            onClick={onDeleteDefinition}
          >
            <Icon name="trash" />
            Delete Definition
          </button>
        </div>
      )}
    </li>
  );
}
