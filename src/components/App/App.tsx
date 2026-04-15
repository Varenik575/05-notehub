import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data /*, error, isLoading, isError*/ } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }, 500);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onQueryEnter={handleQueryChange} />
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            {' '}
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
