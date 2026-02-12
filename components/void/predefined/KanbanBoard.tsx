'use client';

import { useState, useCallback, useRef } from 'react';

interface Card {
  id: string;
  title: string;
  description?: string;
}

interface Column {
  title: string;
  cards: Card[];
}

interface KanbanBoardProps {
  columns?: { title: string; cards: { title: string; description?: string }[] }[];
}

const defaultColumns: Column[] = [
  { title: 'To Do', cards: [] },
  { title: 'In Progress', cards: [] },
  { title: 'Done', cards: [] },
];

function makeId() {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function KanbanBoard({ columns: initialColumns }: KanbanBoardProps) {
  const [cols, setCols] = useState<Column[]>(() => {
    if (initialColumns && initialColumns.length > 0) {
      return initialColumns.map((c) => ({
        title: c.title,
        cards: c.cards.map((card) => ({
          id: makeId(),
          title: card.title,
          description: card.description,
        })),
      }));
    }
    return defaultColumns;
  });

  const [addingTo, setAddingTo] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const dragItemRef = useRef<{ colIdx: number; cardIdx: number } | null>(null);

  const addCard = useCallback(
    (colIdx: number) => {
      if (!newTitle.trim()) return;
      setCols((prev) => {
        const next = prev.map((c, i) =>
          i === colIdx
            ? { ...c, cards: [...c.cards, { id: makeId(), title: newTitle.trim() }] }
            : c
        );
        return next;
      });
      setNewTitle('');
      setAddingTo(null);
    },
    [newTitle]
  );

  const removeCard = useCallback((colIdx: number, cardIdx: number) => {
    setCols((prev) =>
      prev.map((c, i) =>
        i === colIdx
          ? { ...c, cards: c.cards.filter((_, ci) => ci !== cardIdx) }
          : c
      )
    );
  }, []);

  const handleDragStart = useCallback((colIdx: number, cardIdx: number) => {
    dragItemRef.current = { colIdx, cardIdx };
  }, []);

  const handleDrop = useCallback((targetColIdx: number) => {
    const source = dragItemRef.current;
    if (!source) return;
    if (source.colIdx === targetColIdx) return;

    setCols((prev) => {
      const card = prev[source.colIdx].cards[source.cardIdx];
      if (!card) return prev;
      const next = prev.map((c, i) => {
        if (i === source.colIdx) {
          return { ...c, cards: c.cards.filter((_, ci) => ci !== source.cardIdx) };
        }
        if (i === targetColIdx) {
          return { ...c, cards: [...c.cards, card] };
        }
        return c;
      });
      return next;
    });
    dragItemRef.current = null;
  }, []);

  const colColors = ['rgba(59, 130, 246, 0.4)', 'rgba(245, 158, 11, 0.4)', 'rgba(34, 197, 94, 0.4)'];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2" style={{ minHeight: 200 }}>
      {cols.map((col, colIdx) => (
        <div
          key={col.title}
          className="flex-1 min-w-[150px] rounded-lg p-2.5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(colIdx)}
        >
          {/* Column header */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colColors[colIdx % colColors.length] }}
            />
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: 'rgba(226, 232, 240, 0.6)' }}
            >
              {col.title}
            </span>
            <span
              className="text-xs ml-auto"
              style={{ color: 'rgba(226, 232, 240, 0.25)' }}
            >
              {col.cards.length}
            </span>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2">
            {col.cards.map((card, cardIdx) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(colIdx, cardIdx)}
                className="rounded-md p-2.5 cursor-grab active:cursor-grabbing group"
                style={{
                  background: 'rgba(15, 15, 35, 0.8)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs" style={{ color: '#e2e8f0' }}>
                    {card.title}
                  </span>
                  <button
                    onClick={() => removeCard(colIdx, cardIdx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{
                      color: 'rgba(226, 232, 240, 0.3)',
                      background: 'none',
                      border: 'none',
                      fontSize: '10px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    x
                  </button>
                </div>
                {card.description && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'rgba(226, 232, 240, 0.35)' }}
                  >
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Add card */}
          {addingTo === colIdx ? (
            <div className="mt-2">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addCard(colIdx);
                  if (e.key === 'Escape') {
                    setAddingTo(null);
                    setNewTitle('');
                  }
                }}
                placeholder="Card title..."
                autoFocus
                className="w-full text-xs rounded-md px-2 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  outline: 'none',
                }}
              />
              <div className="flex gap-1.5 mt-1.5">
                <button
                  onClick={() => addCard(colIdx)}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    color: '#A78BFA',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setAddingTo(null);
                    setNewTitle('');
                  }}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: 'transparent',
                    color: 'rgba(226, 232, 240, 0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAddingTo(colIdx)}
              className="w-full mt-2 text-xs py-1.5 rounded-md transition-colors"
              style={{
                background: 'transparent',
                color: 'rgba(226, 232, 240, 0.25)',
                border: '1px dashed rgba(255,255,255,0.06)',
              }}
            >
              + Add card
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
