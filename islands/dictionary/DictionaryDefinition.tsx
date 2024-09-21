import { useState } from "preact/hooks";
import { Definition } from "../../types/words.ts";
import { CircleCheckSolid, Plus } from "../../components/Icons.tsx";
import {
  deleteDefinitionBookmark,
  saveDefinitionBookmark,
} from "../../services/BookmarkService.ts";

interface DictionaryDefinitionProps {
  definition: Definition;
  order: number;
}

export default function DictionaryDefinition(
  { definition, order }: DictionaryDefinitionProps,
) {
  const [isBookmarked, setIsBookmarked] = useState(definition.isBookmarked);

  function addBookmark(definition: Definition) {
    navigator.vibrate([50]);
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
    navigator.vibrate([50]);
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
              <CircleCheckSolid class="icon bookmark-icon" />
            </span>
          )
          : (
            <span onClick={() => addBookmark(definition)}>
              <Plus class="icon" />
            </span>
          )}
      </div>
    </li>
  );
}
