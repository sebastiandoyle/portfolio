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
      className="rounded-lg border border-[#27272a] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#27272a]">
              {['Finding', 'User Quote', 'Code Change', 'Evidence'].map((header) => (
                <th
                  key={header}
                  className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium text-[#71717a] bg-[#18181b]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={i < rows.length - 1 ? 'border-b border-[#27272a]' : ''}
              >
                <td className="px-5 py-4 font-medium text-[#fafafa]">{row.finding}</td>
                <td className="px-5 py-4 text-[#71717a] italic">&ldquo;{row.quote}&rdquo;</td>
                <td className="px-5 py-4 text-[#a1a1aa]">{row.change}</td>
                <td className="px-5 py-4 text-xs font-mono text-[#52525b]">{row.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden">
        {rows.map((row, i) => (
          <div key={i} className={`p-4 space-y-2 ${i < rows.length - 1 ? 'border-b border-[#27272a]' : ''}`}>
            <p className="text-sm font-medium text-[#fafafa]">{row.finding}</p>
            <p className="text-xs italic text-[#71717a]">&ldquo;{row.quote}&rdquo;</p>
            <p className="text-xs text-[#a1a1aa]">{row.change}</p>
            <p className="text-xs font-mono text-[#52525b]">{row.evidence}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
