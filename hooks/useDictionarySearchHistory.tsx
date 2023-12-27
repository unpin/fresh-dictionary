import { useEffect, useState } from "preact/hooks";

interface SearchHistoryItem {
  _id: string;
  searchTerm: string;
}

const SEARCH_HISTORY_STORAGE_KEY = "searchHistory";

export function useDictionarySearchHistory(): [
  SearchHistoryItem[],
  (addItem: SearchHistoryItem) => void,
  (deleteItem: string) => void,
] {
  const [searchItems, setSearchItems] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (savedSearches) {
      try {
        setSearchItems(JSON.parse(savedSearches));
      } catch (error) {
        console.error(error);
        setSearchItems([]);
      }
    }
  }, []);

  function addSearchItem(searchItem: SearchHistoryItem) {
    const array = searchItems.filter((e) => e._id !== searchItem._id);
    array.unshift(searchItem);
    storeItem(array.slice(0, 10));
  }

  function deleteSearchItem(_id: string) {
    const array = searchItems.filter((e) => e._id !== _id);
    storeItem(array);
  }

  function storeItem(array: SearchHistoryItem[]) {
    setSearchItems(array);
    localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(array));
  }

  return [searchItems, addSearchItem, deleteSearchItem];
}
