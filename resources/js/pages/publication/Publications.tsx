import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { FiClock, FiUser, FiExternalLink, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

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
import Navbar from '@/components/layout/navbar';
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

      {/* Hero Section */}
      <section className={`${theme.background} py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 bg-repeat" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${theme.primary}`}>
              Publikasi Jurnal Kesehatan
            </h1>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${theme.text.secondary}`}>
              Temukan berbagai publikasi jurnal tentang inovasi kesehatan, penelitian terbaru, dan pengabdian masyarakat
            </p>
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari publikasi..."
                  className={`w-full px-5 py-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-700 text-white p-1.5 rounded-full">
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-8 ${theme.primary}`}>
            {filteredPublications.length} Publikasi Tersedia
          </h2>

          {filteredPublications.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-xl ${theme.text.secondary}`}>
                Tidak ditemukan publikasi yang sesuai dengan pencarian Anda.
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
                    <p className={`line-clamp-3 mb-4 ${theme.text.secondary}`}>
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
    </div>
  );
}