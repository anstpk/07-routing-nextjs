import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api'; // Перевір, чи шлях правильний
import NotesClient from './Notes.client';
import React from 'react';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesPage(props: PageProps) {
  // 1. Розпаковуємо params (виправляє помилку Next.js 15)
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  // 2. Створюємо екземпляр QueryClient
  const queryClient = new QueryClient();
  
  const tagFromUrl = slug?.[0];
  const tagToFetch = (tagFromUrl === 'all' || !tagFromUrl) ? undefined : tagFromUrl;

  try {
    // 3. Prefetch запиту
    await queryClient.prefetchQuery({
      queryKey: ['notes', tagToFetch], 
      queryFn: () => fetchNotes(1, 12, '', tagToFetch), 
    });
  } catch (error) {
    console.error("Prefetch error:", error);
  }

  return (
    // 4. Гідрація даних
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagToFetch} />
    </HydrationBoundary>
  );
}