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
} from "../../components/Icon.tsx";

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

  return (
    <li class="flex column gap">
      <div class="definition-counter">
        {order}. {auth.isAdmin &&
          (isEditMode
            ? (
              <div class="edit-button">
                <span
                  name="circle-check"
                  onClick={onUpdateDefinition}
                >
                  <CircleCheck class="icon" />
                </span>
              </div>
            )
            : (
              <div class="edit-button">
                <span
                  onClick={() => {
                    setTempData(() => {
                      const cloned = structuredClone(definitionData);
                      if (!cloned.examples) cloned.examples = [];
                      return cloned;
                    });
                    setIsEditMode(() => true);
                  }}
                >
                  <PenToSquare class="icon" />
                </span>
              </div>
            ))}
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
            <label>Examples</label>
            {tempData?.examples.map((example, i) => (
              <div class="textarea-wrapper">
                <label>{i + 1}.</label>
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
                <span
                  class="delete-example-icon"
                  onClick={() => deleteExampleTextarea(i)}
                >
                  <Trash class="icon" />
                </span>
              </div>
            ))}

            <div class="definition-buttons">
              <span
                class="add-example-icon"
                onClick={addExampleTextarea}
              >
                <CirclePlus class="icon" />
              </span>
              <button
                class="btn"
                type="button"
                data-id={definitionData._id}
                onClick={onDeleteDefinition}
              >
                <Trash class="icon" />
                Delete Definition
              </button>
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
