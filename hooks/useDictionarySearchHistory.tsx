import { useSignal, useSignalEffect } from "@preact/signals";

interface SearchHistoryItem {
  _id: string;
  searchTerm: string;
}

const SEARCH_HISTORY_STORAGE_KEY = "searchHistory";

export function useDictionarySearchHistory(): [
  SearchHistoryItem[],
  (addItem: SearchHistoryItem) => void,
  (deleteItem: string) => void,
  () => void,
] {
  const searchItems = useSignal<SearchHistoryItem[]>([]);

  useSignalEffect(() => {
    const savedSearches = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (savedSearches) {
      try {
        searchItems.value = JSON.parse(savedSearches);
      } catch (error) {
        console.error(error);
        searchItems.value = [];
      }
    }
  });

  function addSearchItem(searchItem: SearchHistoryItem) {
    const array = searchItems.value.filter((e) => e._id !== searchItem._id);
    array.unshift(searchItem);
    storeItem(array.slice(0, 10));
  }

  function deleteSearchItem(_id: string) {
    const array = searchItems.value.filter((e) => e._id !== _id);
    storeItem(array);
  }

  function storeItem(array: SearchHistoryItem[]) {
    searchItems.value = array;
    localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(array));
  }

  function clearSearchItems() {
    localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify([]));
    searchItems.value = [];
  }

  return [searchItems.value, addSearchItem, deleteSearchItem, clearSearchItems];
}
