import { StateUpdater } from "preact/hooks";
import { Definition, Word } from "../../types/words.ts";
import DictionaryDefinition from "./DictionaryDefinition.tsx";
import { JSX } from "preact/jsx-runtime";
import { deleteDefinition } from "../../services/DictionaryService.ts";

interface DictionaryDefinitionsProps {
  word: Word;
  setWord: StateUpdater<Word>;
}

export default function DictionaryDefinitions(
  { word, setWord }: DictionaryDefinitionsProps,
) {
  const definitions = groupDefinitionsByType(word.definitions);

  const handleDeleteDefinition = (
    e: MouseEvent,
  ) => {
    if (!confirm("Delete this definition?")) return;
    const target = e.target as HTMLElement;
    const btn = target.closest("li");
    const definitionId = btn?.dataset.id;
    if (!definitionId) return;
    deleteDefinition(word._id, definitionId).then(({ status }) => {
      if (status === 200) {
        word.definitions = word.definitions.filter((e) =>
          e._id !== definitionId
        );
        setWord({ ...word });
      } else {
        console.error("Failure");
      }
    });
  };

  return (
    <>
      {Array.from(definitions.keys()).map((type) => {
        return (
          <>
            <span class="entry-type">{type || "other"}</span>
            <ul class="dictionary-definitions">
              {definitions.get(type)!.map(
                (definition: Definition, idx: number) => (
                  <DictionaryDefinition
                    order={idx + 1}
                    wordId={word._id}
                    definition={definition}
                    onDeleteDefinition={handleDeleteDefinition}
                  />
                ),
              )}
            </ul>
          </>
        );
      })}
    </>
  );
}

function groupDefinitionsByType(definitions: Definition[]) {
  return definitions.reduce((typeMap, curr) => {
    if (typeMap.has(curr.type)) {
      typeMap.get(curr.type).push(curr);
    } else {
      typeMap.set(curr.type, [curr]);
    }
    return typeMap;
  }, new Map());
}
