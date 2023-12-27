import { Definition } from "../types/words.ts";

export async function addDefinition(
  _id: string,
  definition: Partial<Definition>,
) {
  const response = await fetch(`/api/dictionary/${_id}/definition`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(definition),
  });
  return response;
}

export async function deleteDefinition(_id: string, definitionId: string) {
  const response = await fetch(
    `/api/dictionary/${_id}/definition/${definitionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
  );
  return response;
}
