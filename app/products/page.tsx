import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/serverClient';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export const revalidate = 60; // Revalidate every minute

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const supabase = await createClient();
  const awaitedSearchParams = await searchParams;
  const categorySlug = awaitedSearchParams.category as string | undefined;

  // Fetch categories for filter links
  const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .order('name');

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1a1816] relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 dark:bg-emerald-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 dark:bg-amber-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Header Content */}
      <div className="relative pt-16 pb-8">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 dark:text-stone-100 mb-6 font-serif">
               Katalog <span className="text-emerald-700 dark:text-emerald-500 italic">Jamu</span>
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
                Temukan racikan alami yang pas untuk kebutuhan kesehatanmu.
                Dari resep leluhur hingga inovasi modern.
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20 -mt-10">

        {/* Category Filter */}
        <div className="flex justify-start sm:justify-center overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:pb-0 scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            <Link
               href="/products"
               scroll={false}
               className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${!categorySlug
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
            >
                Semua
            </Link>
            {categories?.map((cat) => (
                <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    scroll={false}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${categorySlug === cat.slug
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
                >
                    {cat.name}
                </Link>
            ))}
          </div>
        </div>

        {/* Product Grid with Suspense */}
        <Suspense key={categorySlug || 'all'} fallback={<ProductGridSkeleton />}>
           <ProductGrid categorySlug={categorySlug} />
        </Suspense>
      </div>
    </div>
  );
}
