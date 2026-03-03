import { redirect } from 'next/navigation';

export default function NotesRootPage() {
  // Як тільки користувач потрапляє на /notes, 
  // ми миттєво відправляємо його на /notes/filter/all
  redirect('/notes/filter/all');
}