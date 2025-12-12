import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/serverClient';
import AddToCartButton from '@/components/AddToCartButton';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('slug', slug)
    .single();

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-stone-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Katalog
          </Link>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-square lg:aspect-auto bg-stone-100 dark:bg-stone-800">
               {product.thumbnail_url ? (
                  <Image
                    src={product.thumbnail_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <span className="text-xl">Gambar tidak tersedia</span>
                  </div>
               )}
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                  {product.categories?.name || 'Jamu'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4 font-serif">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-500">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="prose prose-stone dark:prose-invert mb-8">
                <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-300">
                  {product.description || product.short_description}
                </p>
              </div>

              {/* Benefits Section */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-8 p-6 bg-stone-50 dark:bg-stone-800/50 rounded-xl">
                   <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">Manfaat Utama</h3>
                   <ul className="grid grid-cols-1 gap-3">
                     {product.benefits.map((benefit: string, index: number) => (
                       <li key={index} className="flex items-start">
                         <Check className="w-5 h-5 text-emerald-500 mr-2 mt-0.5" />
                         <span className="text-stone-600 dark:text-stone-300">{benefit}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              )}

               {/* Suggested Usage Mock */}
               <div className="flex items-center gap-6 mb-10 text-sm text-stone-500 dark:text-stone-400">
                  <div className="flex items-center">
                     <Clock className="w-4 h-4 mr-2" />
                     <span>Tahan 7 hari (kulkas)</span>
                  </div>
                   <div className="flex items-center">
                     <ShieldCheck className="w-4 h-4 mr-2" />
                     <span>Jaminan Kualitas</span>
                  </div>
               </div>

              <div className="mt-auto">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
