import css from './SearchBox.module.css';


interface SearchBoxProps {
  onQueryEnter: (newQuery: string) => void;
  rollbackPage: (defaultPage: number) => void;
}

export default function SearchBox({ onQueryEnter, rollbackPage }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    onQueryEnter(newSearch);
    rollbackPage(1);
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
