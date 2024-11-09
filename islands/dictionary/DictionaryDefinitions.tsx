import { Dispatch, StateUpdater } from "preact/hooks";
import { Definition, Word } from "../../types/words.ts";
import DictionaryDefinition from "./DictionaryDefinition.tsx";

interface DictionaryDefinitionsProps {
  word: Word;
  setWord: Dispatch<StateUpdater<Word>>;
}

export default function DictionaryDefinitions(
  { word, setWord }: DictionaryDefinitionsProps,
) {
  const groupedDefinitions = groupDefinitionsByType(word.definitions);

  return (
    <>
      {Array.from(groupedDefinitions.keys()).map((type) => {
        return (
          <>
            <span class="entry-type">{type || "other"}</span>
            <ul class="dictionary-definitions">
              {groupedDefinitions.get(type)!.map(
                (definition: Definition, idx: number) => (
                  <DictionaryDefinition
                    order={idx + 1}
                    definition={definition}
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
