import { JSX } from "preact/jsx-runtime";

type ListProps<T> = {
  items: T[];
  getKey?: (item: T) => string;
  children: (item: T) => JSX.Element;
};

export default function List<T>({ items, getKey, children }: ListProps<T>) {
  return (
    <ul class="items">
      {items.map((item, i) => (
        <li class="item" key={getKey?.(item) ?? i}>
          {children(item)}
        </li>
      ))}
    </ul>
  );
}
