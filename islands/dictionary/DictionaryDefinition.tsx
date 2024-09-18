import { Definition } from "../../types/words.ts";

import { Plus } from "../../components/Icons.tsx";

interface DictionaryDefinitionProps {
  definition: Definition;
  order: number;
  wordId: string;
  onDeleteDefinition: (e: MouseEvent) => void;
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
        <Plus class="icon" />
      </div>
    </li>
  );
}
