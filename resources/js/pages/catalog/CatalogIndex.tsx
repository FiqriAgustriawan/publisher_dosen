import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import {
  FiSearch,
  FiBook,
  FiCalendar,
  FiUser,
  FiEye,
  FiDownload,
  FiArrowRight
} from 'react-icons/fi';
import { useState } from 'react';

interface Catalog {
  id: number;
  nama: string;
  deskripsi: string;
  gambar_sampul: string | null;
  pdf_file_buku: string | null;
  created_at: string;
  user: {
    name: string;
  };
}

export default function CatalogIndex({ catalogs }: { catalogs: Catalog[] }) {
  const { theme } = useAppearance();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCatalogs = catalogs.filter(catalog =>
    catalog.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    catalog.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`${theme.background} min-h-screen flex flex-col`}>
      <Head title="Katalog Buku" />
      <Navbar />

      {/* Hero Section dengan Kontras yang Lebih Baik */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 py-20 text-white relative">
        {/* Background pattern untuk tekstur */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
              Katalog Buku
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Kumpulan buku terpilih untuk meningkatkan pengetahuan Anda di bidang kesehatan
            </p>

            {/* Search Bar dengan Kontras yang Lebih Baik */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-green-600 rounded-lg bg-white/25 focus:bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white text-white font-medium shadow-md"
                placeholder="Cari judul atau topik buku..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Animasi subtle saat ketik */}
              <div className={`absolute right-3 inset-y-0 flex items-center transition-opacity duration-300 ${searchQuery ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-white/70 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          {filteredCatalogs.length === 0 ? (
            <div className="text-center py-12 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 shadow-sm">
              <FiBook className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-300" />
              <h3 className="mt-4 text-2xl font-medium text-gray-900 dark:text-white">
                {searchQuery ? 'Tidak ada buku yang sesuai dengan pencarian' : 'Belum ada buku dalam katalog'}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                {searchQuery
                  ? <span>Silakan coba dengan kata kunci lain atau <button onClick={() => setSearchQuery('')} className="text-green-600 dark:text-green-400 font-medium hover:underline">reset pencarian</button></span>
                  : 'Katalog buku akan segera tersedia'}
              </p>
            </div>
          ) : (
            <>
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-8`}>
                {searchQuery ? `Hasil Pencarian: ${filteredCatalogs.length} buku ditemukan` : 'Koleksi Buku Terbaru'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCatalogs.map((catalog) => (
                  <div
                    key={catalog.id}
                    className={`${theme.card} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border ${theme.border}`}
                  >
                    <Link href={route('catalogs.show', catalog.id)}>
                      <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                        {catalog.gambar_sampul ? (
                          <img
                            src={`/storage/${catalog.gambar_sampul}`}
                            alt={catalog.nama}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiBook className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pt-8">
                          <h3 className="text-xl font-bold text-white line-clamp-2">{catalog.nama}</h3>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <FiUser className="mr-1" />
                        <span>{catalog.user?.name || 'Admin'}</span>
                        <span className="mx-2">•</span>
                        <FiCalendar className="mr-1" />
                        <span>{formatDate(catalog.created_at)}</span>
                      </div>

                      <p className={`${theme.text.primary} mb-4 line-clamp-3 text-sm h-16`}>
                        {catalog.deskripsi}
                      </p>

                      <div className="flex justify-between items-center">
                        <Link
                          href={route('catalogs.show', catalog.id)}
                          className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 font-medium flex items-center gap-1 text-sm"
                        >
                          <FiEye className="w-4 h-4" />
                          <span>Detail</span>
                        </Link>

                        {catalog.pdf_file_buku && (
                          <Link
                            href={route('catalogs.download', catalog.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-xs flex items-center gap-1"
                          >
                            <FiDownload className="w-3 h-3" />
                            <span>Unduh PDF</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}