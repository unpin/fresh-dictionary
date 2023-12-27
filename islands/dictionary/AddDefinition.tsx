import { StateUpdater } from "preact/hooks";
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
      />
      <input
        type="text"
        class="form-input"
        name="definition"
        placeholder="Definition*"
      />
      <textarea
        type="text"
        class="form-input"
        name="example"
        placeholder="Example"
      />
      <button class="btn">Add definition</button>
      <button class="btn btn-outline" type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
