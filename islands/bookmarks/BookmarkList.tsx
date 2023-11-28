import { useEffect, useState } from "preact/hooks";
import { getBookmarkedWords } from "../../services/WordService.ts";

export default function BookmarkedWords() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBookmarkedWords(page).then((
      data,
    ) => ((console.log(data)), setWords(data)));
  }, []);

  return (
    <>
      <h1>List</h1>
      <div>
        {words.map((
          w: { word: string; _id: string; definitions: [{ meaning: string }] },
        ) => (
          <>
            <h3>{w.word}</h3>
            {w.definitions.map((d) => <p>{d.meaning}</p>)}
          </>
        ))}
      </div>
    </>
  );
}
