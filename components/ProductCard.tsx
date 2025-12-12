
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  short_description: string;
  price: number;
  thumbnail_url: string | null;
  slug: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 dark:border-stone-800 flex flex-col h-full">
      <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
           <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-200 dark:bg-stone-800">
             <span>No Image</span>
           </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2 flex-grow">
          {product.short_description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100 dark:border-stone-800">
          <span className="text-lg font-bold text-emerald-700 dark:text-emerald-500">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-stone-100 text-stone-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-emerald-600 group/btn"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline font-medium text-sm">Tambah</span>
          </button>
        </div>
      </div>
    </div>
  );
}
