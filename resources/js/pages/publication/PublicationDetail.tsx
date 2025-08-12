import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import {
  FiCalendar,
  FiUser,
  FiExternalLink,
  FiArrowLeft,
  FiShare2
} from 'react-icons/fi';

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
export default function PublicationDetail({ publication }: { publication: Publication }) {
  const { theme } = useAppearance();
  const auth = (usePage().props as any)?.auth;

  return (
    <div className={`${theme.background} min-h-screen`}>
      <Head title={publication.title} />

      <Navbar />

      {/* Breadcrumbs */}
      <div className={`${theme.background} py-4 border-b ${theme.border}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className={`${theme.text.muted} hover:text-green-700`}>Beranda</Link>
            <span className={theme.text.muted}>/</span>
            <Link href={route('publications')} className={`${theme.text.muted} hover:text-green-700`}>Publikasi</Link>
            <span className={theme.text.muted}>/</span>
            <span className={theme.text.secondary}>{publication.title.substring(0, 30)}...</span>
          </div>
        </div>
      </div>

      {/* Publication Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href={route('publications')}
              className={`inline-flex items-center gap-2 mb-6 ${theme.text.secondary} hover:text-green-700`}
            >
              <FiArrowLeft />
              <span>Kembali ke daftar publikasi</span>
            </Link>

            <div className={`${theme.card} rounded-xl shadow-lg overflow-hidden ${theme.border}`}>
              {/* Image header */}
              {publication.image && (
                <div className="relative w-full h-80">
                  <img
                    src={`/storage/${publication.image}`}
                    alt={publication.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Title and metadata */}
                <h1 className={`text-3xl font-bold mb-4 ${theme.primary}`}>
                  {publication.title}
                </h1>

                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <FiUser className={`${theme.text.muted} w-5 h-5`} />
                    <span className={`text-sm ${theme.text.secondary}`}>
                      {publication.user.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className={`${theme.text.muted} w-5 h-5`} />
                    <span className={`text-sm ${theme.text.secondary}`}>
                      {new Date(publication.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Link to official journal */}
                {publication.link_route && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2 dark:bg-green-700">
                        <FiExternalLink className="w-5 h-5 text-green-700 dark:text-green-300" />
                      </div>
                      <div>
                        <p className={`${theme.text.primary} font-medium`}>
                          Link Jurnal Resmi
                        </p>
                        <p className={`text-sm ${theme.text.secondary}`}>
                          Buka di halaman jurnal resmi untuk informasi lebih lanjut
                        </p>
                      </div>
                    </div>
                    <a
                      href={publication.link_route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Buka Link
                    </a>
                  </div>
                )}

                {/* Description */}
                <div className={`${theme.text.primary} prose prose-lg dark:prose-invert max-w-none`}>
                  {/* Split description by paragraphs for better readability */}
                  {publication.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share buttons */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <FiShare2 className={`${theme.text.muted} w-5 h-5`} />
                    <p className={`font-medium ${theme.text.secondary}`}>
                      Bagikan publikasi ini:
                    </p>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.014 10.014 0 01-3.127 1.195 4.928 4.928 0 00-8.391 4.493 14.046 14.046 0 01-10.2-5.173 4.929 4.929 0 001.527 6.574 4.883 4.883 0 01-2.23-.616v.06a4.923 4.923 0 003.95 4.83 4.948 4.948 0 01-2.223.084 4.929 4.929 0 004.6 3.42 9.86 9.86 0 01-6.103 2.101 9.88 9.88 0 01-1.17-.07 13.9 13.9 0 007.55 2.213c9.056 0 14.01-7.5 14.01-14.007 0-.213-.005-.426-.015-.637a10.023 10.023 0 002.457-2.549z" />
                      </svg>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </button>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}