import { useEffect } from "preact/hooks";

interface SearchHistoryData {
  _id: string;
  word: string;
}

export default function SaveWordToLocalStorage(
  { _id, word }: SearchHistoryData,
) {
  useEffect(() => {
    const storage = localStorage;
    const history = JSON.parse(
      storage.getItem("searchHistory") ?? "[]",
    ) as SearchHistoryData[];
    if (!history.find((e) => e._id === _id)) {
      history.push({ _id, word });
      storage.setItem("searchHistory", JSON.stringify(history.slice(-5)));
    }
  }, []);
  return <></>;
}
