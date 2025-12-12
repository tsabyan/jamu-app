
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 border-t border-stone-100 dark:border-stone-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-500">
              Jamu<span className="text-amber-700 dark:text-amber-500">Sehat</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed max-w-xs">
              Membawa kebaikan alam Indonesia dalam setiap tegukan. Segar, sehat, dan alami untuk menemani keseharian Anda.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-stone-400 hover:text-emerald-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-stone-400 hover:text-emerald-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-stone-400 hover:text-emerald-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
             <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-4">
              Menu
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 text-sm">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#" className="text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 text-sm">
                  Cara Pemesanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-wider uppercase mb-4">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
              <li>
                Whatsapp: 0812-3456-7890
              </li>
              <li>
                Email: halo@jamusehat.id
              </li>
              <li>
                Yogyakarta, Indonesia
              </li>
            </ul>
             <div className="mt-4">
               <p className="text-xs text-stone-400">
                 &copy; {new Date().getFullYear()} JamuSehat. All rights reserved.
               </p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
