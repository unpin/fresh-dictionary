type WordDefinition = {
  wordId: string;
  definitionId: string;
};

export async function saveDefinitionBookmark(
  { definitionId, wordId }: WordDefinition,
) {
  return await fetch("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify({ definitionId, wordId }),
  });
}

export async function deleteDefinitionBookmark(definitionId: string) {
  return await fetch("/api/bookmarks", {
    method: "DELETE",
    body: JSON.stringify({ definitionId }),
  });
}
