import css from './App.module.css';
import { createNote, fetchNotes } from '../../services/noteService';

function App() {

console.log(fetchNotes())
createNote("beep", "boop", "Todo")
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
      </div>
    </>
  );
}

export default App;
