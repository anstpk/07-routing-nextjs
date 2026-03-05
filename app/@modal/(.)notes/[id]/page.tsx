import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) return null;

  return <NotePreview note={note} />;
}