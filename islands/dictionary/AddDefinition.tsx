import { StateUpdater, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { addDefinition } from "../../services/DictionaryService.ts";
import { Word } from "../../types/words.ts";

interface AddDefinitionProps {
  word: Word;
  setWord: StateUpdater<Word>;
  onClose: () => void;
}

export default function AddDefinition(
  { word, setWord, onClose }: AddDefinitionProps,
) {
  const [definitionData, setDefinitionData] = useState({
    type: "",
    definition: "",
    examples: [""],
  });

  const handleAddDefinition = (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const type = formData.get("type")?.toString() || "";
    const definition = formData.get("definition")?.toString() || "";
    const examples = Array.from(formData.getAll("example")) as string[];

    addDefinition(word._id, { type, definition, examples })
      .then(async (res) => {
        if (res.status === 200) {
          const { insertedId: _id } = await res.json();
          word.definitions.push({ _id, type, definition, examples });
          setWord({ ...word });
          onClose();
        } else {
          // TODO Show Toast notification
        }
      });
  };

  return (
    <form class="definition-form" onSubmit={handleAddDefinition}>
      <input
        type="text"
        class="form-input"
        name="type"
        placeholder="Type*"
        value={definitionData.type}
        onInput={(e) =>
          setDefinitionData({
            ...definitionData,
            type: (e.target as HTMLInputElement).value,
          })}
      />
      <input
        type="text"
        class="form-input"
        name="definition"
        placeholder="Definition*"
        value={definitionData.definition}
        onInput={(e) =>
          setDefinitionData({
            ...definitionData,
            definition: (e.target as HTMLInputElement).value,
          })}
      />
      {definitionData.examples.map((example) => (
        <textarea
          type="text"
          class="form-input"
          name="example"
          placeholder="Example"
        >
          {example}
        </textarea>
      ))}
      <button
        class="btn"
        type="button"
        onClick={() => {
          setDefinitionData(() => {
            definitionData.examples.push("");
            return structuredClone(definitionData);
          });
        }}
      >
        Add example
      </button>
      <button class="btn">Save definition</button>
      <button class="btn btn-outline" type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
