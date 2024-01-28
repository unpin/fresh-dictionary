import { useState } from "preact/hooks";
import Icon from "../../components/Icon.tsx";
import { Definition, Word } from "../../types/words.ts";
import { JSX } from "preact/jsx-runtime";
import { useAuth } from "../../hooks/useAuth.tsx";
import { updateDefinition } from "../../services/DictionaryService.ts";

interface DictionaryDefinitionProps {
  definition: Definition;
  order: number;
  wordId: string;
  onDeleteDefinition: (e: MouseEvent) => void;
}

export default function DictionaryDefinition(
  { definition, order, onDeleteDefinition, wordId }: DictionaryDefinitionProps,
) {
  const [definitionData, setDefinitionData] = useState(definition);
  const [tempData, setTempData] = useState<Definition | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [auth] = useAuth();

  const addExampleTextarea = () => {
    setTempData((state) => {
      if (state === null) return state;
      if (state.examples) {
        state.examples.push("");
      } else {
        state.examples = [""];
      }
      return structuredClone(state);
    });
  };

  // TODO move to DictionaryDefinition class
  const onUpdateDefinition = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const definitionUpdate = formData.get("definition")?.toString() || "";
    const examplesUpdate = Array.from(formData.getAll("example")) as string[];

    updateDefinition(wordId, definition._id, {
      definition: definitionUpdate,
      examples: examplesUpdate,
    }).then((res) => {
      if (res.status === 200) {
        setDefinitionData((state) => ({
          ...state,
          definition: definitionUpdate,
          examples: examplesUpdate,
        }));
        setIsEditMode(false);
        setTempData(null);
      }
    });
  };

  // TODO move to client utilities
  const updateTextareaHeight = (e: JSX.TargetedEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "0";
    textarea.style.height = Math.max(50, textarea.scrollHeight) + "px";
  };

  const restoreTextareaHeight = (e: JSX.TargetedEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "50px";
  };

  return (
    <li>
      <div class="definition-counter">{order}.</div>
      {isEditMode
        ? (
          <form class="definition-form" onSubmit={onUpdateDefinition}>
            <input
              type="text"
              class="form-input"
              name="definition"
              value={tempData?.definition}
            />
            {tempData?.examples?.map((example, i) => (
              <div class="textarea-wrapper">
                <textarea
                  class="form-input"
                  name="example"
                  onFocus={updateTextareaHeight}
                  onInput={updateTextareaHeight}
                  onBlur={restoreTextareaHeight}
                >
                  {example}
                </textarea>
                <span
                  onClick={() => {
                    setTempData((state) => {
                      state!.examples.splice(i, 1);
                      return structuredClone(state);
                    });
                  }}
                >
                  <Icon name="xmark"></Icon>
                </span>
              </div>
            ))}

            <div class="definition-buttons">
              <button
                class="btn"
                type="button"
                onClick={addExampleTextarea}
              >
                <Icon name="circle-plus" />
                Add example
              </button>
              <button
                class="btn"
                type="button"
                data-id={definitionData._id}
                onClick={onDeleteDefinition}
              >
                <Icon name="trash" />
                Delete Definition
              </button>
              <button class="btn" type="submit">
                <Icon name="circle-check" />
                Save
              </button>
            </div>
            <button
              class="btn"
              type="button"
              onClick={() => {
                setTempData(null);
                setIsEditMode(false);
              }}
            >
              <Icon name="xmark" />
              Cancel
            </button>
          </form>
        )
        : (
          <>
            <div class="definition-term">
              {definitionData.definition}
              {auth.isAdmin &&
                (
                  <Icon
                    name="pen-to-square"
                    onClick={() => {
                      setTempData(structuredClone(definitionData));
                      setIsEditMode(true);
                    }}
                  />
                )}
            </div>
            <ul class="definition-examples">
              {definitionData?.examples?.map((example) => (
                <li>
                  {example}
                </li>
              ))}
            </ul>
          </>
        )}
    </li>
  );
}
