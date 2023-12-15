import { WordEntry } from "../../models/DictionaryEntry.ts";
import BookmarkEntry from "../BookmarkEntry.tsx";
import TTS from "../TTS.tsx";

interface DictionaryWordProps {
  entry: WordEntry;
}

export default function DictionaryWord({ entry }: DictionaryWordProps) {
  return (
    <>
      <div class="dictionary-heading">
        <h1 class="my-4 dictionary-word">{entry.word}</h1>
        <TTS text={entry.word} />
        <BookmarkEntry wordId={entry._id.toString()} />
      </div>
      <span class="entry-type">{/* TODO ADD TYPE */}</span>
      <h3 class="my-4">Bedeutungen</h3>
      <ul class="my-4">
        {entry.definitions.map((def, i) => {
          return (
            <li class="my-4">
              <div class="definition-counter my-2">{i + 1}.</div>
              <div>{def.definition}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
