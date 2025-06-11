'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { scrollFade } from '@/utils/animations';

export type FaqItem = { q: string; a: string };
export type FaqCategory = { category: string; questions: FaqItem[] };

interface FaqSectionProps {
  readonly data: FaqCategory[];
}

export default function FaqSection({ data }: FaqSectionProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const lower = query.toLowerCase();
    return data
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter((q) =>
          q.q.toLowerCase().includes(lower)
        ),
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [data, query]);

  return (
    <section className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-16 sm:py-24 w-full">
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-4xl mx-auto flex flex-col gap-10"
      >
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold">Frequently Asked Questions</h2>
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
              aria-label="Search questions"
            />
          </div>
        </div>

        {filtered.map((cat) => (
          <div key={cat.category} className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-800">{cat.category}</h3>
            <ul className="space-y-3">
              {cat.questions.map(({ q, a }) => (
                <li key={q} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none list-none">
                      <span className="font-medium text-gray-900">{q}</span>
                      <span className="ml-2 flex-shrink-0 text-blue-700 group-open:hidden">
                        <ChevronDown className="w-5 h-5" />
                      </span>
                      <span className="ml-2 flex-shrink-0 text-blue-700 hidden group-open:block">
                        <ChevronUp className="w-5 h-5" />
                      </span>
                    </summary>
                    <div className="px-4 pb-4 pt-1 text-sm text-gray-700 leading-relaxed">
                      {a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
