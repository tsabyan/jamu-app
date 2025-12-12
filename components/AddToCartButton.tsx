'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    thumbnail_url: string | null;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      thumbnail_url: product.thumbnail_url
    }, quantity);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-full bg-stone-50 dark:bg-stone-800 w-fit">
        <button
          onClick={handleDecrement}
          className="p-3 text-stone-600 dark:text-stone-400 hover:text-emerald-600 transition-colors"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-semibold text-stone-900 dark:text-stone-100">{quantity}</span>
        <button
          onClick={handleIncrement}
          className="p-3 text-stone-600 dark:text-stone-400 hover:text-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 transform active:scale-95 ${
          isAdded
            ? 'bg-emerald-700 text-white'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/30'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        {isAdded ? 'Berhasil Ditambahkan' : 'Tambah ke Keranjang'}
      </button>
    </div>
  );
}
