import { Definition } from "../types/words.ts";

export async function addDefinition(
  _id: string,
  definition: Partial<Definition>,
) {
  const response = await fetch(`/api/dictionary/${_id}/definition`, {
    method: "PATCH",
    body: JSON.stringify(definition),
  });
  return response;
}

export async function deleteDefinition(_id: string, definitionId: string) {
  const response = await fetch(
    `/api/dictionary/${_id}/definition/${definitionId}`,
    {
      method: "DELETE",
    },
  );
  return response;
}
