import { Definition, Word } from "../types/words.ts";

export async function queryWords(query: string): Promise<Word[]> {
  const response = await fetch(
    `/api/dictionary/search/${query}`,
    {
      mode: "cors",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    },
  );
  console.log("status", response.status);
  const data = await response.json();
  console.log(data);

  return (response.status === 200) ? data : [];
}

export async function findById(_id: string) {
  const response = await fetch(
    `${URL}/words/${_id}`,
  );
  console.log(response.status);
  const data = await response.json();
  console.log("data>", data);

  return (response.status === 200) ? data : null;
}
// TODO complete
export async function addDefinition(
  _id: string,
  definition: Omit<Definition, "_id">,
) {
  const response = await fetch(`${URL}/words/${_id}`, {
    method: "PATCH",
    body: JSON.stringify(definition),
  });
  // TODO return created definition and update definition _id
  return response.status;
}

export async function getBookmarkedWords(page: number) {
  return (await fetch(`api/bookmarks?page=${page}`, {
    // mode: "cors",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  })).json();
}
