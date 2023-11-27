import { useEffect, useState } from "preact/hooks";
import { getBookmarkedWords } from "../../services/WordService.ts";

export default function BookmarkedWords() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBookmarkedWords(page).then((data) => setWords(data));
  }, []);

  return (
    <>
      <h1>List</h1>
      <div>
        {words.map((w: { word: string; _id: string }) => (
          <>
            <h3>{w.word}</h3>
            <h3>{w._id}</h3>
          </>
        ))}
      </div>
    </>
  );
}
