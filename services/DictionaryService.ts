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

export async function updateDefinition(
  _id: string,
  definitionId: string,
  update: Partial<Definition>,
) {
  const response = await fetch(
    `/api/dictionary/${_id}/definition/${definitionId}`,
    {
      method: "PATCH",
      body: JSON.stringify(update),
    },
  );
  return response;
}

export async function generateExampleSentence(word: string) {
  const response = await fetch(
    `/api/openai/example`,
    {
      method: "POST",
      body: JSON.stringify({ word }),
    },
  );
  return response;
}
