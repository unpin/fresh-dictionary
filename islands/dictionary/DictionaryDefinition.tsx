import { StateUpdater, useEffect, useState } from "preact/hooks";
import Icon from "../../components/Icon.tsx";
import { Definition, Word } from "../../types/words.ts";
import { JSX } from "preact/jsx-runtime";
import { useAuth } from "../../hooks/useAuth.tsx";
import { updateDefinition } from "../../services/DictionaryService.ts";

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
  const [definitionData, setDefinitionData] = useState(definition);
  const [isContentEditable, setIsContentEditable] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    setDefinitionData(definition);
  }, [definition]);

  const handleAddExample = () => {
    setDefinitionData((currDefinition) => {
      if (currDefinition.examples) {
        currDefinition.examples.push("");
      } else {
        currDefinition.examples = [""];
      }
      console.log(currDefinition);

      return structuredClone(currDefinition);
    });
  };

  const handleUpdateDefinition = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedDefinition = formData.get("definition")?.toString() || "";
    const examples = Array.from(formData.getAll("example")) as string[];
    console.log({ updatedDefinition, examples });
    updateDefinition(wordId, definition._id, {
      definition: updatedDefinition,
      examples,
    }).then((res) => {
      if (res.status === 200) {
        console.log("Success");
      } else {
        console.log("Error");
      }
    });
  };

  const handleDeleteMeaning = () => {
  };

  return (
    <li>
      <form onSubmit={handleUpdateDefinition}>
        <div class="definition-counter my-2">{order + 1}.</div>
        <div class="definition-term">
          <input
            class="form-input"
            type="text"
            name="definition"
            disabled={!isContentEditable}
            value={definitionData.definition}
            onInput={(e) => {
              definitionData.definition = (e.target as HTMLInputElement).value;
              setDefinitionData(structuredClone(definitionData));
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
          {definitionData.examples &&
            definitionData.examples.map((example, i) => (
              <div>
                <textarea
                  type="text"
                  class="form-input"
                  name="example"
                  disabled={!isContentEditable}
                >
                  {example}
                </textarea>
                {isContentEditable &&
                  (
                    <span
                      onClick={() => {
                        setDefinitionData((state) => {
                          state.examples.splice(i, 1);
                          return structuredClone(state);
                        });
                      }}
                    >
                      <Icon name="xmark"></Icon>
                    </span>
                  )}
              </div>
            ))}
        </ul>
        {isContentEditable && (
          <div class="definition-buttons">
            <button class="btn" type="button" onClick={handleAddExample}>
              <Icon name="circle-plus" />
              Add example
            </button>
            <button
              class="btn"
              type="button"
              data-_id={definition._id}
              onClick={onDeleteDefinition}
            >
              <Icon name="trash" />
              Delete Definition
            </button>
            <button class="btn">
              <Icon name="circle-check" />
              Save
            </button>
            <button
              class="btn"
              type="button"
              onClick={() => {
                setIsContentEditable(false);
                setDefinitionData(structuredClone(definition));
              }}
            >
              <Icon name="xmark" />
              Cancel
            </button>
          </div>
        )}
      </form>
    </li>
  );
}
