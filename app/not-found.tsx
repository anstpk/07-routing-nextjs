export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '80vh' 
    }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p>Сторінку не знайдено</p>
      <a href="/notes/filter/all" style={{ marginTop: '20px', color: 'blue' }}>
        Повернутися до нотаток
      </a>
    </div>
  );
}