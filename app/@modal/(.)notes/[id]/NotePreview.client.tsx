'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import css from './NotePreview.module.css'; // Не забудьте скопіювати сюди стилі

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Повернення на попередню сторінку (фільтр), як вимагає ТЗ
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.tags}>
          {note.tags?.map((tag) => (
            <span key={tag} className={css.tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}