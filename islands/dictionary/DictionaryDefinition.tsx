import { useState } from "preact/hooks";
import { Definition, Word } from "../../types/words.ts";
import { JSX } from "preact/jsx-runtime";
import { useAuth } from "../../hooks/useAuth.tsx";
import { updateDefinition } from "../../services/DictionaryService.ts";
import {
  CircleCheck,
  CirclePlus,
  PenToSquare,
  Trash,
  Xmark,
} from "../../components/Icon.tsx";
import { Ellipsis } from "../../components/Icon.tsx";

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
      const cloned = structuredClone(state);
      cloned?.examples.push("");
      return cloned;
    });
  };

  const deleteExampleTextarea = (id: number) => {
    setTempData((state) => {
      if (!state) return state;
      const clone = structuredClone(state);
      clone.examples.splice(id, 1);
      return clone;
    });
  };

  // TODO move to DictionaryDefinition class
  const onUpdateDefinition = (
    e: JSX.TargetedEvent<HTMLSpanElement>,
  ) => {
    if (!tempData) return;
    const definitionUpdate = tempData.definition;
    const examplesUpdate = tempData.examples;
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
        setIsEditMode(() => false);
        setTempData(() => null);
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

  const cancelEdit = () => {
    setIsEditMode(() => false);
    setTempData(() => null);
  };

  return (
    <li class="flex column gap">
      <div class="definition-counter">
        <span>{order}.</span> {auth.isAdmin &&
          (
            <div class="dropdown">
              <div class="dropdown-toggle" tabIndex={order}>
                <span>
                  <Ellipsis class="icon" />
                </span>
              </div>
              <div class="dropdown-menu">
                <li
                  class="dropdown-item"
                  onClick={() => {
                    setTempData(() => {
                      const cloned = structuredClone(definitionData);
                      if (!cloned.examples) cloned.examples = [];
                      return cloned;
                    });
                    setIsEditMode(() => true);
                  }}
                >
                  <span>
                    <PenToSquare class="icon" />
                  </span>Edit
                </li>
                <li
                  class="dropdown-item"
                  data-id={definitionData._id}
                  onClick={onDeleteDefinition}
                >
                  <Trash class="icon" />
                  Delete Definition
                </li>
              </div>
            </div>
          )}
      </div>
      {isEditMode && tempData
        ? (
          <form class="definition-form">
            <label>Word</label>
            <input
              type="text"
              class="form-input"
              name="definition"
              onInput={(e) =>
                tempData.definition = (e.target as HTMLInputElement).value}
              value={tempData?.definition}
            />

            {tempData?.examples.map((example, i) => (
              <>
                <label>Examples</label>
                <div class="textarea-wrapper">
                  <textarea
                    class="form-input"
                    name="example"
                    value={example}
                    onFocus={updateTextareaHeight}
                    onInput={(
                      e: JSX.TargetedMouseEvent<HTMLTextAreaElement>,
                    ) => {
                      updateTextareaHeight(e);
                      const target = e.target as HTMLTextAreaElement;
                      console.log("change", target.value);

                      setTempData((state) => {
                        const clone = structuredClone(state);

                        if (clone?.examples) {
                          clone.examples[i] = target.value;
                        }
                        return clone;
                      });
                    }}
                  >
                    {example}
                  </textarea>
                  <div>
                    <span
                      class="delete-example-icon"
                      onClick={() => deleteExampleTextarea(i)}
                    >
                      <Trash class="icon" />
                    </span>
                  </div>
                </div>
              </>
            ))}

            <div class="definition-buttons">
              <span
                class="add-example-icon"
                onClick={addExampleTextarea}
              >
                <CirclePlus class="icon" />
              </span>
              Add an example
            </div>
            <div class="flex gap justify-center">
              <div class="definition-buttons">
                <span
                  class="add-example-icon"
                  onClick={cancelEdit}
                >
                  <Xmark class="icon" />
                </span>
                Cancel
              </div>
              <div class="definition-buttons">
                <span
                  name="circle-check"
                  onClick={onUpdateDefinition}
                >
                  <CircleCheck class="icon" />
                </span>
                Save
              </div>
            </div>
          </form>
        )
        : (
          <>
            <div class="definition-term">
              {definitionData.definition}
            </div>
            <ul class="definition-examples flex column gap">
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
