import { useState } from "preact/hooks";
import { Definition } from "../../types/words.ts";
import { CircleCheckSolid, Plus } from "../../components/Icons.tsx";
import {
  deleteDefinitionBookmark,
  saveDefinitionBookmark,
} from "../../services/BookmarkService.ts";
import { vibrate } from "../../utils/compat.ts";

interface DictionaryDefinitionProps {
  definition: Definition;
  order: number;
}

export default function DictionaryDefinition(
  { definition, order }: DictionaryDefinitionProps,
) {
  const [isBookmarked, setIsBookmarked] = useState(definition.isBookmarked);

  function addBookmark(definition: Definition) {
    vibrate([50]);
    setIsBookmarked(true);
    saveDefinitionBookmark({
      definitionId: definition._id,
      wordId: definition.wordId,
    })
      .then(() => {
      }).catch((e) => {
        console.error(e);
        setIsBookmarked(false);
      });
  }

  function deleteBookmark(definition: Definition) {
    vibrate([50]);
    setIsBookmarked(false);
    deleteDefinitionBookmark(definition._id)
      .catch((e) => {
        console.error(e);
        setIsBookmarked(true);
      });
  }

  return (
    <li class="flex column gap">
      <div class="definition-counter">
        <span class="order-span">{order}</span>
      </div>

      <div class="definition-term">
        {definition.definition}
        {isBookmarked
          ? (
            <span onClick={() => deleteBookmark(definition)}>
              <CircleCheckSolid
                width={16}
                height={16}
                color="var(--color-yellow)"
              />
            </span>
          )
          : (
            <span onClick={() => addBookmark(definition)}>
              <Plus width={16} height={16} />
            </span>
          )}
      </div>
    </li>
  );
}
