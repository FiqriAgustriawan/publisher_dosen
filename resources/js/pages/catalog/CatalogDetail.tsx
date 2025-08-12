import { Head, Link } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import {
  FiBook,
  FiUser,
  FiCalendar,
  FiDownload,
  FiArrowLeft,
  FiEye,
  FiClock,
  FiBookOpen
} from 'react-icons/fi';

interface Catalog {
  id: number;
  nama: string;
  deskripsi: string;
  gambar_sampul: string | null;
  pdf_file_buku: string | null;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
    email: string;
  };
}

interface CatalogDetailProps {
  catalog: Catalog;
  relatedCatalogs: Catalog[];
}

export default function CatalogDetail({ catalog, relatedCatalogs }: CatalogDetailProps) {
  const { theme } = useAppearance();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`${theme.background} min-h-screen flex flex-col`}>
      <Head title={catalog.nama} />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/catalogs" className="hover:text-green-600 dark:hover:text-green-500">Katalog</Link>
            <span className="mx-2">{'>'}</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">{catalog.nama}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-10 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column - Cover Image */}
            <div className="lg:w-1/3">
              <div className={`${theme.card} rounded-lg shadow-lg p-4 border ${theme.border}`}>
                <div className="aspect-[3/4] relative overflow-hidden rounded-md">
                  {catalog.gambar_sampul ? (
                    <img
                      src={`/storage/${catalog.gambar_sampul}`}
                      alt={catalog.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <FiBook className="w-20 h-20 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>

                {catalog.pdf_file_buku && (
                  <div className="mt-6 flex justify-center">
                    <a
                      href={route('catalogs.download', catalog.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full transition-colors"
                    >
                      <FiDownload className="w-5 h-5" />
                      <span className="font-semibold">Unduh PDF</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Book Details */}
            <div className="lg:w-2/3">
              <Link
                href="/catalogs"
                className="inline-flex items-center text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 mb-6"
              >
                <FiArrowLeft className="mr-2" />
                <span>Kembali ke Katalog</span>
              </Link>

              <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${theme.primary}`}>{catalog.nama}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className={`${theme.card} border ${theme.border} rounded-lg p-4 flex items-center`}>
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mr-4">
                    <FiUser className="w-6 h-6 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Penulis</div>
                    <div className={`font-medium ${theme.primary}`}>{catalog.user?.name || 'Admin'}</div>
                  </div>
                </div>

                <div className={`${theme.card} border ${theme.border} rounded-lg p-4 flex items-center`}>
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mr-4">
                    <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tanggal Publikasi</div>
                    <div className={`font-medium ${theme.primary}`}>{formatDate(catalog.created_at)}</div>
                  </div>
                </div>

                <div className={`${theme.card} border ${theme.border} rounded-lg p-4 flex items-center`}>
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
                    <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Terakhir Diperbarui</div>
                    <div className={`font-medium ${theme.primary}`}>{formatDate(catalog.updated_at)}</div>
                  </div>
                </div>

                <div className={`${theme.card} border ${theme.border} rounded-lg p-4 flex items-center`}>
                  <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mr-4">
                    <FiBookOpen className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Format</div>
                    <div className={`font-medium ${theme.primary}`}>PDF</div>
                  </div>
                </div>
              </div>

              <div className={`${theme.card} border ${theme.border} rounded-lg p-6 mb-8`}>
                <h2 className={`text-xl font-semibold mb-4 ${theme.primary}`}>Deskripsi</h2>
                <div className={`prose max-w-none ${theme.text.secondary} whitespace-pre-line`}>
                  {catalog.deskripsi}
                </div>
              </div>

              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-8">
                <span>Ditambahkan pada {formatDate(catalog.created_at)}</span>
                <span className="mx-2">•</span>
                <span>Oleh {catalog.user?.name || 'Admin'}</span>
              </div>
            </div>
          </div>

          {/* Related Books */}
          {relatedCatalogs.length > 0 && (
            <div className="mt-16">
              <h2 className={`text-2xl font-bold ${theme.primary} mb-8`}>Buku Terkait Lainnya</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedCatalogs.map((relatedCatalog) => (
                  <Link
                    key={relatedCatalog.id}
                    href={route('catalogs.show', relatedCatalog.id)}
                    className={`${theme.card} rounded-md shadow-sm overflow-hidden border ${theme.border} hover:shadow-md transition-shadow`}
                  >
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      {relatedCatalog.gambar_sampul ? (
                        <img
                          src={`/storage/${relatedCatalog.gambar_sampul}`}
                          alt={relatedCatalog.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiBook className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold ${theme.primary} line-clamp-2`}>{relatedCatalog.nama}</h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {formatDate(relatedCatalog.created_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}