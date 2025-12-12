
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/serverClient';
import ProductCard from '@/components/ProductCard';
import SymptomSearch from '@/components/SymptomSearch';
import IngredientShowcase from '@/components/IngredientShowcase';
import TestimonialSlider from '@/components/TestimonialSlider';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Search Centric */}
      <section className="relative bg-[#FDFBF7] dark:bg-[#1a1816] overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent dark:from-black z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent dark:from-[#1a1816] z-10"></div>

        {/* Organic Blobs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
            <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 bg-white/50 dark:bg-black/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">AI Health Assistant Ready</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mb-6 font-serif leading-tight">
                Sehat Alami <br/>
                <span className="text-emerald-800 dark:text-emerald-500 italic">Tanpa Kimia</span>
            </h1>

            <p className="mt-6 text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Ceritakan apa yang tubuhmu rasakan.
                Kami akan meracik solusi terbaik dari kekayaan alam Indonesia.
            </p>

            <SymptomSearch />

            <div className="mt-16 text-sm text-stone-400 dark:text-stone-500">
                Didukung oleh riset herbal modern & resep leluhur
            </div>
        </div>
      </section>

      {/* Ingredients Section (Replaces Generic Features) */}
      <IngredientShowcase />


      {/* Produk Unggulan */}
      <section id="products" className="py-24 bg-stone-50 dark:bg-stone-900 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div className="max-w-2xl">
                <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Katalog Pilihan</span>
                <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mt-2">Produk Terlaris Minggu Ini</h2>
              </div>
              <Link href="/products" className="hidden sm:inline-flex items-center px-6 py-3 rounded-full bg-white border border-stone-200 text-stone-700 font-medium hover:bg-stone-50 hover:border-emerald-500 transition-colors shadow-sm dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300">
                Lihat Semua Produk <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
           </div>

           {products && products.length > 0 ? (
             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
               {products.map((product) => (
                 <ProductCard key={product.id} product={product} />
               ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-dashed border-stone-300 dark:border-stone-700">
               <p className="text-stone-500 dark:text-stone-400 text-lg">Belum ada produk unggulan saat ini.</p>
             </div>
           )}

           <div className="mt-12 text-center sm:hidden">
              <Link href="/products" className="inline-flex items-center font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-500">
                Lihat Semua <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
           </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-24 bg-white dark:bg-stone-950 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">Kata Pelanggan Kami</h2>
            <p className="text-xl text-stone-500 max-w-2xl mx-auto">Kepuasan mereka adalah bukti komitmen kami.</p>
          </div>

          <div className="mx-auto max-w-6xl">
             <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="py-28 bg-emerald-700 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.2 3.8s-5.7-.3-11.3 5.3c-5.7 5.7-5 11.3-5 11.3s5.7.7 11.3-5c5.3-5.7 5-11.6 5-11.6z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
         }}></div>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
           <h2 className="text-4xl md:text-5xl font-bold mb-8">Siap Hidup Lebih Sehat?</h2>
           <p className="text-emerald-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
             Konsultasikan keluhan kesehatan Anda secara gratis. Kami akan merekomendasikan racikan jamu yang paling pas untuk Anda.
           </p>
           <a
             href="https://wa.me/"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center px-10 py-5 bg-white text-emerald-900 rounded-full font-bold text-lg hover:bg-amber-50 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
           >
             Chat via WhatsApp Sekarang
           </a>
         </div>
      </section>
    </div>
  );
}
