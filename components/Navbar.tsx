
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-100 dark:bg-stone-900/80 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-emerald-800 dark:text-emerald-500 tracking-tight">
              Jamu<span className="text-amber-700 dark:text-amber-500">Sehat</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 font-medium transition-colors">
              Home
            </Link>
            <Link href="#products" className="text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 font-medium transition-colors">
              Produk
            </Link>
            <Link href="#" className="text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 font-medium transition-colors">
              Tentang Jamu
            </Link>
            <Link href="#" className="text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 font-medium transition-colors">
              Kontak
            </Link>

            {/* Cart Icon */}
            <button className="p-2 text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {/* Badge placeholder */}
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-full">0</span> */}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-emerald-700 dark:text-stone-300 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#products"
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800"
              onClick={() => setIsOpen(false)}
            >
              Produk
            </Link>
            <Link
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800"
              onClick={() => setIsOpen(false)}
            >
              Tentang Jamu
            </Link>
            <Link
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800"
              onClick={() => setIsOpen(false)}
            >
              Kontak
            </Link>
             <button className="flex w-full items-center px-3 py-2 text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-stone-800">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Keranjang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
