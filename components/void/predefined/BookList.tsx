'use client';

interface Book {
  title: string;
  author: string;
  reason: string;
}

interface BookListProps {
  theme?: string;
  books?: Book[];
}

const defaultBooks: Book[] = [
  { title: 'Atomic Habits', author: 'James Clear', reason: 'Practical systems for building good habits' },
  { title: 'Deep Work', author: 'Cal Newport', reason: 'Master the art of focused work' },
  { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson', reason: 'Timeless wisdom on wealth and happiness' },
];

export default function BookList({ theme, books }: BookListProps) {
  const displayBooks = books && books.length > 0 ? books : defaultBooks;
  const displayTheme = theme || 'Recommended Reading';

  return (
    <div className="flex flex-col gap-3">
      {/* Theme header */}
      <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid rgba(34, 197, 94, 0.1)' }}>
        <span style={{ fontSize: '16px' }}>📚</span>
        <h3 className="text-sm font-medium" style={{ color: 'rgba(34, 197, 94, 0.8)' }}>
          {displayTheme}
        </h3>
      </div>

      {/* Books */}
      <div className="flex flex-col gap-3">
        {displayBooks.map((book, i) => (
          <div key={i} className="flex gap-3">
            <span
              className="text-xs font-mono shrink-0 mt-0.5"
              style={{ color: 'rgba(34, 197, 94, 0.4)', width: '18px' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium" style={{ color: '#e2e8f0' }}>
                {book.title}
              </span>
              <span className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.4)' }}>
                by {book.author}
              </span>
              <span className="text-xs mt-0.5" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
                {book.reason}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
