
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const ingredients = [
  {
    name: 'Kunyit',
    latin: 'Curcuma longa',
    benefit: 'Anti-inflamasi & Detoks',
    color: 'bg-orange-100 text-orange-800',
    desc: 'Raja rempah yang ampuh meredakan peradangan dan membersihkan racun dalam tubuh.'
  },
  {
    name: 'Jahe Merah',
    latin: 'Zingiber officinale',
    benefit: 'Hangatkan Tubuh & Imunitas',
    color: 'bg-red-100 text-red-800',
    desc: 'Memberikan kehangatan alami dan booster sistem kekebalan tubuh yang kuat.'
  },
  {
    name: 'Kencur',
    latin: 'Kaempferia galanga',
    benefit: 'Pelega Tenggorokan',
    color: 'bg-emerald-100 text-emerald-800',
    desc: 'Solusi alami untuk batuk dan melegakan pernapasan serta relaksasi otot.'
  },
  {
    name: 'Temulawak',
    latin: 'Curcuma zanthorrhiza',
    benefit: 'Kesehatan Pencernaan',
    color: 'bg-yellow-100 text-yellow-800',
    desc: 'Sahabat terbaik untuk memelihara fungsi hati dan memperbaiki nafsu makan.'
  }
];

export default function IngredientShowcase() {
  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div className="max-w-xl">
             <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
               Kekuatan Alam dalam Setiap Tetes
             </h2>
             <p className="text-stone-600 dark:text-stone-400 text-lg">
               Kami hanya menggunakan rempah rimpang grade terbaik langsung dari petani lokal. Tanpa ekstrak buatan.
             </p>
           </div>
           <button className="hidden md:flex items-center text-emerald-700 font-semibold hover:text-emerald-800">
             Lihat Semua Bahan <ArrowUpRight className="ml-2 w-4 h-4" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((item) => (
            <div key={item.name} className="group relative bg-white dark:bg-stone-800 p-8 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-700">
               {/* Decorative Circle */}
               <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full opacity-20 transition-transform group-hover:scale-150 duration-500 ${item.color}`}></div>

               <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{item.name}</h3>
               <p className="text-xs font-serif italic text-stone-500 mb-4">{item.latin}</p>

               <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${item.color}`}>
                 {item.benefit}
               </div>

               <p className="text-stone-600 dark:text-stone-400 mb-6 text-sm leading-relaxed min-h-[5rem]">
                 {item.desc}
               </p>

               <div className="w-full h-1 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                 <div className="w-0 group-hover:w-full h-full bg-emerald-500 transition-all duration-700 ease-out"></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
