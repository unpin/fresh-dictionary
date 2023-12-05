export function addBookmark(wordId: string) {
  return fetch("/api/bookmarks", {
    method: "POST",
    body: JSON.stringify({ wordId }),
  });
}

export function deleteBookmark(wordId: string) {
  return fetch("/api/bookmarks", {
    method: "DELETE",
    body: JSON.stringify({ wordId }),
  });
}
