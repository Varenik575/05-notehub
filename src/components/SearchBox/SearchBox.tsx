import css from './SearchBox.module.css';


interface SearchBoxProps {
  onQueryEnter: (newQuery: string) => void;
}

export default function SearchBox({ onQueryEnter }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    onQueryEnter(newSearch);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}
