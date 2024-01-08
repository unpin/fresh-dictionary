import { StateUpdater, useEffect, useState } from "preact/hooks";
import Icon from "../../components/Icon.tsx";
import { Definition, Word } from "../../types/words.ts";
import { JSX } from "preact/jsx-runtime";
import { useAuth } from "../../hooks/useAuth.tsx";

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
  const [def, setDef] = useState(definition.definition);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [examples, setExamples] = useState<string[]>([]);
  const [auth] = useAuth();

  const handleAddMeaning = () => {
  };

  useEffect(() => {
    if (definition.examples) {
      setExamples(definition.examples);
    }
  }, [definition]);

  const handleUpdateDefinition = () => {
  };

  const handleDeleteMeaning = () => {
  };

  return (
    <li>
      <div class="definition-counter my-2">{order + 1}.</div>
      <div class="definition-term">
        <input
          class="form-input"
          disabled={!isContentEditable}
          value={def}
          onChange={(e) => {
            const inputField = e.target as HTMLInputElement;
            setDef(inputField.value);
          }}
        >
        </input>
        {auth.isAdmin && (
          <>
            {!isContentEditable && (
              <Icon
                name="pen-to-square"
                onClick={() => setIsContentEditable(!isContentEditable)}
              />
            )}
          </>
        )}
      </div>
      <ul class="definition-examples">
        {examples.map((example) => (
          <li>
            {example}
          </li>
        ))}
      </ul>
      {isContentEditable && (
        <div class="definition-buttons">
          <button class="btn" onClick={handleAddMeaning}>
            <Icon name="circle-plus" />
            Add new meaning
          </button>
          <button
            class="btn"
            data-_id={definition._id}
            onClick={onDeleteDefinition}
          >
            <Icon name="trash" />
            Delete Definition
          </button>
          <button class="btn" onClick={handleUpdateDefinition}>
            <Icon name="circle-check" />
            Save
          </button>
        </div>
      )}
    </li>
  );
}
