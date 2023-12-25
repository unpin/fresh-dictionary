import { Word } from "../types/words.ts";

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
  const data = await response.json();
  return (response.status === 200) ? data : [];
}

export async function findById(_id: string) {
  const response = await fetch(
    `${URL}/words/${_id}`,
  );
  const data = await response.json();
  return (response.status === 200) ? data : null;
}
