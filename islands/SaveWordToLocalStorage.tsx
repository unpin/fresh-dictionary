import { useEffect } from "preact/hooks";

interface SearchHistoryData {
  _id: string;
  word: string;
}

export default function SaveWordToLocalStorage(
  { _id, word }: SearchHistoryData,
) {
  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("searchHistory") ?? "[]",
    ) as SearchHistoryData[];
    const filtered = history.filter((e) => e._id !== _id);
    filtered.unshift({ _id, word });
    localStorage.setItem("searchHistory", JSON.stringify(filtered.slice(0, 10)));
  }, []);
  return <></>;
}
