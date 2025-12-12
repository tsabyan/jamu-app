'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const originalTestimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Entrepreneur',
    content: 'Meeting seharian jadi lebih fokus setelah rutin minum Beras Kencur. Rasanya fresh banget, beda sama jamu gendong biasa.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Siti Aminah',
    role: 'Ibu Rumah Tangga',
    content: 'Anak-anak susah makan, tapi pas dikasih Kunyit Asam JamuSehat malah minta lagi. Alhamdulillah sehat tanpa obat kimia.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Rina Wijaya',
    role: 'Ahli Gizi',
    content: 'Sebagai praktisi kesehatan, saya sangat merekomendasikan JamuSehat karena prosesnya yang transparan dan higienis.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Andi Pratama',
    role: 'Olahragawan',
    content: 'Pemulihan otot lebih cepat dengan Temulawak instan mereka. Sangat praktis dibawa gym.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Lina Marlina',
    role: 'Mahasiswa',
    content: 'Suka banget packagingnya yang aman dan modern. Rasanya juga otentik, nggak kebanyakan gula.',
    rating: 5,
  },
];

// Create 4 sets to create a seamless infinite loop buffer
const testimonials = [
  ...originalTestimonials.map(t => ({ ...t, uniqueId: `set1-${t.id}` })),
  ...originalTestimonials.map(t => ({ ...t, uniqueId: `set2-${t.id}` })), // Start here
  ...originalTestimonials.map(t => ({ ...t, uniqueId: `set3-${t.id}` })),
  ...originalTestimonials.map(t => ({ ...t, uniqueId: `set4-${t.id}` })),
];

export default function TestimonialSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPosRef = useRef(0);

  // Initial scroll to middle set
  useEffect(() => {
    if (scrollRef.current) {
        const cardWidth = window.innerWidth >= 768 ? 350 + 24 : 300 + 24; // Width + Gap
        const initialScroll = cardWidth * originalTestimonials.length; // Start at Set 2
        scrollRef.current.scrollLeft = initialScroll;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollWidth = scrollRef.current.scrollWidth;
    const oneSetWidth = scrollWidth / 4; // Width of one set of testimonials

    // Teleport logic for infinite loop
    if (scrollLeft >= oneSetWidth * 3) {
       // Too far right -> Jump back to Set 2
       scrollRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant jump
       scrollRef.current.scrollLeft = scrollLeft - oneSetWidth;
       scrollRef.current.style.scrollBehavior = 'smooth'; // Re-enable
    } else if (scrollLeft <= oneSetWidth * 0.5) {
       // Too far left -> Jump forward to Set 2/3
       scrollRef.current.style.scrollBehavior = 'auto';
       scrollRef.current.scrollLeft = scrollLeft + oneSetWidth;
       scrollRef.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  // Auto-play Effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        // Scroll one card width
        const cardWidth = window.innerWidth >= 768 ? 350 + 24 : 300 + 24;
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 350 + 24 : 300 + 24;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 z-10 w-12 h-12 bg-white dark:bg-stone-800 rounded-full shadow-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 hover:text-emerald-700 hover:scale-110 transition-all focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 z-10 w-12 h-12 bg-white dark:bg-stone-800 rounded-full shadow-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 hover:text-emerald-700 hover:scale-110 transition-all focus:outline-none opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Next review"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-hide px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t) => (
          <div
            key={t.uniqueId}
            className="flex-none w-[300px] md:w-[350px] snap-center bg-[#FDFBF7] dark:bg-stone-900 p-8 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col"
          >
             {/* Decorative Watermark */}
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <svg className="w-24 h-24 text-emerald-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C7,2,3,6,3,11c0,2.5,1.2,4.8,3,6.4V22l4-2l4,2v-4.6c1.8-1.6,3-3.9,3-6.4C17,6,13,2,12,2z M12,15c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S14.2,15,12,15z"/>
               </svg>
             </div>

             <div className="flex gap-1 mb-4 text-amber-400">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'text-stone-300 dark:text-stone-700'}`} />
               ))}
             </div>

             <p className="text-stone-700 dark:text-stone-300 mb-6 italic text-lg leading-relaxed relative z-10 font-serif">
               "{t.content}"
             </p>

             <div className="mt-auto flex items-center gap-4 border-t border-stone-200 dark:border-stone-700 pt-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                   <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">{t.name}</h4>
                   <span className="text-xs text-stone-500 uppercase tracking-wide">{t.role}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
