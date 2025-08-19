import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { FiClock, FiUser, FiExternalLink, FiCalendar, FiArrowRight, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

interface Publication {
  id: number;
  title: string;
  image: string | null;
  link_route: string | null;
  description: string;
  created_at: string;
  user: {
    name: string;
  };
}

export default function Publications({ publications }: { publications: Publication[] }) {
  const { theme } = useAppearance();
  const auth = (usePage().props as any)?.auth;
  const [searchTerm, setSearchTerm] = useState('');

  // Filter publications based on search term
  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${theme.background} min-h-screen`}>
      <Head title="Publikasi Jurnal" />

      <Navbar />

      {/* Hero Section dengan Background Hijau */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 py-20 text-white relative">
        {/* Background pattern untuk tekstur */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
              Publikasi Jurnal Kesehatan
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Temukan berbagai publikasi jurnal tentang inovasi kesehatan, penelitian terbaru, dan pengabdian masyarakat
            </p>

            {/* Search Bar dengan Kontras yang Lebih Baik */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Cari publikasi..."
                className="block w-full pl-10 pr-10 py-3 border border-green-600 rounded-lg bg-white/25 focus:bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white text-white font-medium shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Clear button */}
              <div className={`absolute right-3 inset-y-0 flex items-center transition-opacity duration-300 ${searchTerm ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-white/70 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-8 ${theme.text.primary}`}>
            {filteredPublications.length > 0
              ? `${filteredPublications.length} Publikasi Tersedia`
              : 'Tidak ada publikasi yang sesuai dengan pencarian Anda'}
          </h2>

          {filteredPublications.length === 0 ? (
            <div className="text-center py-12 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 shadow-sm">
              <div className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-300 mb-4">📚</div>
              <h3 className="mt-4 text-2xl font-medium text-gray-900 dark:text-white">
                {searchTerm ? 'Tidak ada publikasi yang sesuai dengan pencarian' : 'Belum ada publikasi tersedia'}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                {searchTerm ? (
                  <span>
                    Silakan coba dengan kata kunci lain atau{' '}
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-green-600 dark:text-green-400 font-medium hover:underline"
                    >
                      reset pencarian
                    </button>
                  </span>
                ) : (
                  'Publikasi akan segera tersedia'
                )}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className={`${theme.card} rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform ${theme.border}`}
                >
                  {pub.image ? (
                    <img
                      src={`/storage/${pub.image}`}
                      alt={pub.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-500">Tidak ada gambar</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 ${theme.text.primary}`}>
                      {pub.title}
                    </h3>
                    <p className={`line-clamp-3 mb-4 ${theme.text.primary}`}>
                      {pub.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <FiUser className={theme.text.muted} />
                      <span className={`text-sm ${theme.text.muted}`}>{pub.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <FiCalendar className={theme.text.muted} />
                      <span className={`text-sm ${theme.text.muted}`}>
                        {new Date(pub.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Link
                        href={route('publications.show', pub.id)}
                        className={`inline-flex items-center gap-1 text-green-700 hover:text-green-900 dark:text-green-500 dark:hover:text-green-400 font-medium`}
                      >
                        Baca Selengkapnya
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}