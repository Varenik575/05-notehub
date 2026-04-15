import css from './SearchBox.module.css';
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
  onQueryEnter: (newQuery: string) => void;
}

export default function SearchBox({ onQueryEnter }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(event => {
    const newSearch = event.target.value;
    onQueryEnter(newSearch);
  }, 1000);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
