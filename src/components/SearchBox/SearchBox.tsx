import type { SearchBoxProps } from "../../types/Note";
import css from "./SearchBox.module.css";

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const updateSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      value={value}
      onChange={updateSearchQuery}
      type="text"
      placeholder="Search notes"
    />
  );
}
