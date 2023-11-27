import { Definition, Word } from "../types/words.ts";
const URL = Deno.env.get("URL") || "http://localhost:8000";

console.log("URL variable is set to:", Deno.env.get("URL"));

export async function queryWords(query: string): Promise<Word[]> {
  const response = await fetch(
    `${URL}/search/${query}`,
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
  return (await fetch(`${URL}/bookmarks?page=${page}`, {
    mode: "cors",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  })).json();
}
