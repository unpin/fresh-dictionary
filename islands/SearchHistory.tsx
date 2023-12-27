import Icon from "../components/Icon.tsx";
import { useDictionarySearchHistory } from "../hooks/useDictionarySearchHistory.tsx";

export default function PreviousSearches() {
  const [searchItems, _, deleteSearchItem] = useDictionarySearchHistory();

  return (
    <div class="container">
      <div class="search-history">
        {searchItems.map(({ _id, searchTerm }) => (
          <div class="history-entry">
            <div class="history-entry-word">
              <Icon name="clock-rotate-left" />
              <a
                href={"/dictionary/" + _id}
              >
                {searchTerm}
              </a>
            </div>
            <div
              class="history-close-btn"
              onClick={() => deleteSearchItem(_id)}
            >
              &#10005;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
