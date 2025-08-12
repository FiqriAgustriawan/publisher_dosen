import React from 'react';
import { Link } from '@inertiajs/react';
import { FiGlobe, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useAppearance } from '@/hooks/use-appearance';

export default function Footer() {
  const { theme } = useAppearance();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-white py-6 border-t border-green-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Celebes Health Journal</h3>
            <p className="mb-4 text-green-100">
              Platform Publikasi Inovasi Riset dan Pengabdian Masyarakat di bidang Kesehatan
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.13 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Link Cepat</h3>
            <ul className="space-y-3 text-green-100">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href={route('publications')} className="hover:text-white hover:underline transition-colors">Publikasi</Link>
              </li>
              <li>
                <Link href={route('catalogs.index')} className="hover:text-white hover:underline transition-colors">Katalog Buku</Link>
              </li>
              <li>
                <Link href={route('contact')} className="hover:text-white hover:underline transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Kontak</h3>
            <ul className="space-y-4 text-green-100">
              <li className="flex items-start">
                <FiMapPin className="mr-3 h-6 w-6 text-green-300 flex-shrink-0" />
                <span>Jl. Perintis Kemerdekaan KM.10, Makassar, Sulawesi Selatan, Indonesia</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 h-5 w-5 text-green-300" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 h-5 w-5 text-green-300" />
                <span>info@celebeshealthjournal.com</span>
              </li>
              <li className="flex items-center">
                <FiGlobe className="mr-3 h-5 w-5 text-green-300" />
                <span>www.celebeshealthjournal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-12 pt-8 text-sm text-center text-green-200">
          <p>&copy; {currentYear} Celebes Health Journal. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}