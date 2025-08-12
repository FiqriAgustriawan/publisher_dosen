import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { FiAlertTriangle, FiArrowLeft, FiLock, FiHome } from 'react-icons/fi';

interface ErrorProps {
  status?: number;
  message?: string;
  description?: string;
  type?: 'notFound' | 'auth' | 'server';
}

export default function Error({
  status = 404,
  message = 'Halaman Tidak Ditemukan',
  description = 'Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.',
  type = 'notFound'
}: ErrorProps) {
  const { theme } = useAppearance();

  const iconMap = {
    notFound: <FiAlertTriangle className="w-16 h-16 text-red-600 dark:text-red-500" />,
    auth: <FiLock className="w-16 h-16 text-yellow-600 dark:text-yellow-500" />,
    server: <FiAlertTriangle className="w-16 h-16 text-orange-600 dark:text-orange-500" />
  };

  const bgColorMap = {
    notFound: 'bg-red-100 dark:bg-red-900/30',
    auth: 'bg-yellow-100 dark:bg-yellow-900/30',
    server: 'bg-orange-100 dark:bg-orange-900/30'
  };

  return (
    <div className={`${theme.background} min-h-screen flex flex-col`}>
      <Head title={message} />
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-6">
            <div className={`${bgColorMap[type]} p-5 rounded-full inline-flex items-center justify-center`}>
              {iconMap[type]}
            </div>
          </div>

          {status && (
            <h1 className={`text-7xl md:text-9xl font-bold ${theme.primary} mb-4`}>
              {status}
            </h1>
          )}

          <h2 className={`text-xl md:text-3xl font-semibold ${theme.primary} mb-4`}>
            {message}
          </h2>

          <p className={`text-base md:text-lg ${theme.text.primary} max-w-lg mx-auto mb-10`}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
            >
              <FiHome className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Kembali ke Halaman Sebelumnya</span>
            </button>
          </div>

          {type === 'auth' && (
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className={`${theme.text.secondary} mb-3`}>
                Anda perlu login untuk mengakses halaman ini
              </p>
              <Link
                href={route('login')}
                className="inline-flex items-center justify-center bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}