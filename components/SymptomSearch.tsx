
'use client';

import { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

export default function SymptomSearch() {
  const [query, setQuery] = useState('');

  const suggestions = [
    'Masuk Angin', 'Pegal Linu', 'Imunitas', 'Asam Lambung', 'Flu'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white dark:bg-stone-900 shadow-xl rounded-full p-2 border border-stone-100 dark:border-stone-800">
          <div className="pl-4 text-emerald-500">
             <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-lg outline-none"
            placeholder="Keluhan apa yang Anda rasakan hari ini?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="p-3 bg-emerald-800 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-stone-500 mr-2 py-1">Sering dicari:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="px-3 py-1 text-sm bg-white/50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-full text-stone-600 dark:text-stone-300 hover:border-emerald-500 hover:text-emerald-700 transition-colors backdrop-blur-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
