import css from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        {sidebar}
      </aside>
      <main className={css.content}>
        {children} {/* Тут відобразиться вміст із [[...slug]]/page.tsx */}
        {modal}    {/* Тут відобразиться модалка */}
      </main>
    </div>
  );
}