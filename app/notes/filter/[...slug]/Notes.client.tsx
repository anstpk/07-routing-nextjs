'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

// Додаємо пропс tag, який приходить із серверного компонента page.tsx
export default function NotesClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [debouncedSearch] = useDebounce(search, 300);

  // Скидаємо сторінку на першу, якщо змінився тег фільтрації
  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, error } = useQuery({
    // ВАЖЛИВО: додаємо tag у queryKey, щоб React Query розрізняв кеш для різних тегів
    queryKey: ['notes', page, debouncedSearch, tag],
    // Передаємо tag як четвертий аргумент у функцію fetchNotes
    queryFn: () => fetchNotes(page, 12, debouncedSearch, tag),
    placeholderData: keepPreviousData,
  });

  if (error) return <p className={css.error}>Error loading notes.</p>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <SearchBox onChange={(value) => {
          setSearch(value);
          setPage(1);
        }} />
        <button className={css.addBtn} onClick={() => setIsModalOpen(true)}>
          Add New Note
        </button>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination 
              pageCount={data.totalPages} 
              onPageChange={setPage} 
              currentPage={page} 
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}