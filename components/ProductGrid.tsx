import { createClient } from '@/lib/supabase/serverClient';
import ProductCard from '@/components/ProductCard';

interface ProductGridProps {
  categorySlug?: string;
}

export default async function ProductGrid({ categorySlug }: ProductGridProps) {
  const supabase = await createClient();

  // Artificial delay to make the skeleton visible (optional, remove for prod if fast enough, but good for UX feel sometimes)
  // await new Promise(resolve => setTimeout(resolve, 500));

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (categorySlug) {
    const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

    if (category) {
        query = query.eq('category_id', category.id);
    }
  }

  const { data: products } = await query;

  if (!products || products.length === 0) {
     return (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 col-span-full">
            <p className="text-stone-500 dark:text-stone-400 text-lg">Tidak ada produk ditemukan untuk kategori ini.</p>
        </div>
     );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
