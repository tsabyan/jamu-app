'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });

  // Hydration fix for localStorage
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price
          })),
          total_amount: totalPrice
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const result = await response.json();

      clearCart();
      // Redirect to success or show success message
      // For now, simple alert and redirect to home
      alert(`Pesanan berhasil dibuat! ID: ${result.orderId}`);
      router.push('/');

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-16 h-16 text-stone-300 mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Keranjang Kosong</h2>
        <p className="text-stone-500 mb-6">Belum ada jamu yang dipilih.</p>
        <Link href="/products" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1a1816] py-12 relative overflow-hidden">
       {/* Background Patterns */}
       <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
       <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 dark:bg-emerald-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 dark:bg-amber-900/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-8 font-serif text-center md:text-left">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Checkout Form - spans 7 columns */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="text-xl font-bold font-serif text-stone-800 dark:text-stone-200">Data Pemesan</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Nama Lengkap</label>
                        <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-400"
                        placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Email</label>
                        <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-400"
                        placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Nomor Telepon (WhatsApp)</label>
                    <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-400"
                    placeholder="08123456789"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Alamat Lengkap</label>
                    <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-stone-400"
                    placeholder="Jl. Merpati No. 10, Jakarta Selatan"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">Catatan (Opsional)</label>
                    <textarea
                    name="note"
                    rows={2}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Contoh: Jangan terlalu manis, atau minta dikirim sore."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-stone-400"
                    />
                </div>
                </form>
            </div>
          </div>

          {/* Receipt Style Summary - spans 5 columns */}
          <div className="lg:col-span-5 space-y-6">
             <div className="relative bg-white text-stone-800 p-8 shadow-xl rotate-0 lg:rotate-2 transform transition-transform hover:rotate-0 duration-300">
                {/* Torn paper effect top */}
                <div className="absolute top-0 left-0 w-full h-4 -mt-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' }}></div>

                <div className="text-center mb-8 border-b-2 border-dashed border-stone-200 pb-6">
                    <h3 className="text-2xl font-bold font-serif mb-1">JamuSehat</h3>
                    <p className="text-sm text-stone-500 uppercase tracking-widest">Official Receipt</p>
                </div>

                <div className="space-y-4 mb-8">
                   {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-1 font-mono text-sm leading-relaxed items-start">
                         {/* Qty col */}
                         <div className="w-6 text-stone-400 pt-0.5">{item.quantity}x</div>

                         {/* Name col */}
                         <div className="font-semibold text-stone-800">{item.name}</div>

                         {/* Price col */}
                         <div className="text-right whitespace-nowrap">{formatPrice(item.price * item.quantity)}</div>

                         {/* Controls row (spans middle col) */}
                         <div className="col-start-2 text-xs text-stone-500 flex items-center gap-3">
                                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg">
                                   <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-mono">[-]</button>
                                   <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-mono">[+]</button>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="hover:text-red-600 flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold">
                                    <Trash2 className="w-3 h-3" /> Hapus
                                </button>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="border-t-2 border-dashed border-stone-200 pt-6 space-y-2">
                    <div className="flex justify-between text-sm font-mono text-stone-500">
                        <span>Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-mono text-stone-500">
                        <span>Pajak</span>
                        <span>-</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold font-serif text-stone-900 pt-2">
                       <span>Total</span>
                       <span>{formatPrice(totalPrice)}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full mt-8 bg-stone-900 text-white font-medium py-4 text-sm uppercase tracking-widest hover:bg-emerald-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSubmitting ? 'Memproses...' : (
                        <span className="flex items-center justify-center gap-2">
                            Konfirmasi Pesanan <ShoppingBag className="w-4 h-4 group-hover:animate-bounce" />
                        </span>
                    )}
                </button>

                {/* Torn paper effect bottom */}
                <div className="absolute bottom-0 left-0 w-full h-4 -mb-4 bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' }}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
