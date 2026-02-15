'use client';

import { motion } from 'framer-motion';

interface IterationRow {
  finding: string;
  quote: string;
  change: string;
  evidence: string;
}

interface IterationTableProps {
  rows: IterationRow[];
}

export default function IterationTable({ rows }: IterationTableProps) {
  return (
    <motion.div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
              {['Finding', 'User Quote', 'Code Change', 'Evidence'].map(
                (header) => (
                  <th
                    key={header}
                    className="text-left px-6 py-4 text-xs uppercase tracking-widest font-medium"
                    style={{ color: 'var(--primary-light)' }}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom:
                    i < rows.length - 1
                      ? '1px solid var(--card-border)'
                      : 'none',
                }}
              >
                <td
                  className="px-6 py-4 font-medium"
                  style={{ color: 'var(--foreground)' }}
                >
                  {row.finding}
                </td>
                <td
                  className="px-6 py-4 italic"
                  style={{ color: 'var(--muted)' }}
                >
                  &ldquo;{row.quote}&rdquo;
                </td>
                <td className="px-6 py-4" style={{ color: 'var(--muted-strong)' }}>
                  {row.change}
                </td>
                <td
                  className="px-6 py-4 text-xs font-mono"
                  style={{ color: 'var(--muted-dim)' }}
                >
                  {row.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y" style={{ borderColor: 'var(--card-border)' }}>
        {rows.map((row, i) => (
          <div key={i} className="p-4 space-y-2">
            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {row.finding}
            </p>
            <p className="text-xs italic" style={{ color: 'var(--muted)' }}>
              &ldquo;{row.quote}&rdquo;
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-strong)' }}>
              {row.change}
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: 'var(--muted-dim)' }}
            >
              {row.evidence}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
