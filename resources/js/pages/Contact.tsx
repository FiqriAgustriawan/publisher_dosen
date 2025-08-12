import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiInfo,
  FiClock,
  FiGlobe
} from 'react-icons/fi';
import Navbar from '@/components/layout/navbar';

export default function Contact() {
  const { theme } = useAppearance();
  const auth = (usePage().props as any)?.auth;

  return (
    <div className={`${theme.background} min-h-screen`}>
      <Head title="Kontak" />
      <Navbar />
      {/* Hero Contact Section */}
      <section className={`${theme.background} pt-20 pb-16 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 bg-repeat" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.primary}`}>
              Hubungi Kami
            </h1>
            <p className={`text-lg ${theme.text.primary} max-w-2xl mx-auto`}>
              Kami siap membantu Anda dalam pengembangan publikasi ilmiah dan riset kesehatan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Info Card */}
            <div className={`${theme.card} rounded-2xl p-8 shadow-lg ${theme.border} h-fit`}>
              <div className="space-y-8">
                <div>
                  <h2 className={`text-2xl font-bold mb-6 ${theme.primary} flex items-center gap-2`}>
                    <FiInfo className="w-6 h-6" />
                    Tentang Lembaga
                  </h2>
                  <p className={`${theme.text.primary} leading-relaxed`}>
                    Merupakan badan usaha yang bergerak di bidang publikasi ilmiah.
                    Lembaga ini bertujuan meningkatkan dan mengembangkan pengetahuan,
                    keterampilan praktik kesehatan, martabat, kesejahteraan, dan etika
                    profesi kesehatan.
                  </p>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${theme.primary} flex items-center gap-2`}>
                    <FiGlobe className="w-5 h-5" />
                    Legalitas
                  </h3>
                  <p className={`${theme.text.primary}`}>
                    SK Kementerian Hukum dan HAM RI<br />
                    No. AHU-033395.AH.01.30. Tahun 2025<br />
                    Tanggal 2 Juli 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className={`${theme.card} rounded-2xl p-8 shadow-lg ${theme.border}`}>
              <h2 className={`text-2xl font-bold mb-6 ${theme.primary}`}>
                Informasi Kontak
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <FiMapPin className={`w-6 h-6 mt-1 ${theme.primary} flex-shrink-0`} />
                  <div>
                    <h3 className={`font-semibold mb-2 ${theme.text.primary}`}>Alamat Kantor</h3>
                    <p className={`${theme.text.primary}`}>
                      Jl. Soppeng Raya Blok G No. 72<br />
                      Bumi Sudiang Permai (BSP),<br />
                      Kelurahan Laikang, Kecamatan Biringkanaya,<br />
                      Kota Makassar, 90242<br />
                      Sulawesi Selatan, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <FiClock className={`w-6 h-6 mt-1 ${theme.primary} flex-shrink-0`} />
                  <div>
                    <h3 className={`font-semibold mb-2 ${theme.text.primary}`}>Jam Operasional</h3>
                    <p className={`${theme.text.primary}`}>
                      Senin - Jumat: 08:00 - 16:00 WITA<br />
                      Sabtu: 08:00 - 12:00 WITA
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <FiPhone className={`w-6 h-6 mt-1 ${theme.primary} flex-shrink-0`} />
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme.text.primary}`}>Telepon</h3>
                      <p className={`${theme.text.primary}`}>
                        +62411-552772<br />
                        +6281354916037
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <FiMail className={`w-6 h-6 mt-1 ${theme.primary} flex-shrink-0`} />
                    <div>
                      <h3 className={`font-semibold mb-2 ${theme.text.primary}`}>Email</h3>
                      <a
                        href="mailto:ismailskpns@gmail.com"
                        className={`${theme.text.primary} hover:text-green-600 transition-colors`}
                      >
                        ismailskpns@gmail.com
                      </a>
                    </div>
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