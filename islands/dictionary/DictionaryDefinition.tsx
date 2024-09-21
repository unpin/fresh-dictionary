import { Definition } from "../../types/words.ts";

import { CircleCheckSolid, Plus } from "../../components/Icons.tsx";

interface DictionaryDefinitionProps {
  definition: Definition;
  order: number;
}

export default function DictionaryDefinition(
  { definition, order }: DictionaryDefinitionProps,
) {
  return (
    <li class="flex column gap">
      <div class="definition-counter">
        <span class="order-span">{order}</span>
      </div>

      <div class="definition-term">
        {definition.definition}
        {definition.isBookmarked
          ? <CircleCheckSolid class="icon bookmark-icon" />
          : <Plus class="icon" />}
      </div>
    </li>
  );
}
