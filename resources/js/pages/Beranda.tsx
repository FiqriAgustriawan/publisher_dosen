import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import {
    FiBook,
    FiUsers,
    FiAward,
    FiMapPin,
    FiPhone,
    FiArrowRight
} from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

interface Publication {
    id: number;
    title: string;
    image: string | null;
    created_at: string;
    user: {
        name: string;
    };
}

interface Catalog {
    id: number;
    nama: string;
    deskripsi: string;
    gambar_sampul: string | null;
    created_at: string;
}

interface WelcomeProps {
    publications: Publication[];
    catalogs?: Catalog[]; // Make catalogs optional to handle undefined case
}

export default function Welcome({ publications = [], catalogs = [] }: WelcomeProps) {
    const { theme } = useAppearance();
    const auth = (usePage().props as any)?.auth;

    console.log('Props received:', { publications, catalogs });

    return (
        <div className={`${theme.background} min-h-screen`}>
            <Head title="Welcome" />

            {/* Use the new Navbar component */}
            <Navbar />

            {/* Hero Section */}
            <section className={`${theme.background} py-24 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 bg-repeat" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-left">
                                <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${theme.primary}`}>
                                    CELEBES ADVANCE HEALTH JOURNAL (CAHJ)
                                </h1>
                                <p className={`text-xl mb-8 ${theme.text.primary}`}>
                                    Platform Publikasi Inovasi Riset dan Pengabdian Masyarakat di bidang Kesehatan
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={route('publications')}
                                        className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <span>Lihat Publikasi</span>
                                        <FiArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={route('catalogs.index')}
                                        className="border-2 border-green-800 text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                                    >
                                        Katalog Buku
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <img
                                    src="/images/logo.png"
                                    alt="CAHJ Logo"
                                    className="w-full max-w-md mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className={`text-3xl font-bold text-center ${theme.primary} mb-12`}>
                        Publikasi Terbaru
                    </h2>
                    {publications.length === 0 ? (
                        <p className="text-center text-gray-500">Belum ada publikasi</p>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {publications.map((pub) => (
                                <div
                                    key={pub.id}
                                    className={`${theme.card} rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition-transform ${theme.border}`}
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
                                        <h3 className={`text-xl font-bold mb-2 ${theme.primary}`}>
                                            {pub.title}
                                        </h3>
                                        <p className={theme.text.secondary}>{pub.user.name}</p>
                                        <p className={theme.text.muted}>
                                            {new Date(pub.created_at).toLocaleDateString()}
                                        </p>
                                        <div className="mt-4">
                                            <Link
                                                href={route('publications.show', pub.id)}
                                                className="text-green-700 hover:text-green-900 font-medium flex items-center gap-1"
                                            >
                                                Baca Selengkapnya
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-12">
                        <Link
                            href={route('publications')}
                            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Lihat Semua Publikasi
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Katalog Buku Section - Only show if catalogs exist */}
            {Array.isArray(catalogs) ? (
                catalogs.length > 0 ? (
                    <section className="py-16 bg-gray-50 dark:bg-gray-900">
                        <div className="container mx-auto px-4">
                            <h2 className={`text-3xl font-bold text-center ${theme.primary} mb-12`}>
                                Katalog Buku
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {/* Safely use slice only after we've confirmed catalogs is an array */}
                                {catalogs.slice(0, 4).map((catalog) => (
                                    <div
                                        key={catalog.id}
                                        className={`${theme.card} rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition-transform ${theme.border}`}
                                    >
                                        <div className="relative h-56 bg-gray-200 dark:bg-gray-700">
                                            {catalog.gambar_sampul ? (
                                                <img
                                                    src={`/storage/${catalog.gambar_sampul}`}
                                                    alt={catalog.nama}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <FiBook className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className={`text-lg font-bold mb-2 ${theme.primary} line-clamp-1`}>
                                                {catalog.nama}
                                            </h3>
                                            <p className={`${theme.text.secondary} text-sm mb-3 line-clamp-2`}>
                                                {catalog.deskripsi}
                                            </p>
                                            <Link
                                                href={route('catalogs.show', catalog.id)}
                                                className="text-green-700 hover:text-green-900 font-medium flex items-center gap-1 text-sm"
                                            >
                                                Lihat Detail
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    href={route('catalogs.index')}
                                    className="inline-flex items-center gap-2 border-2 border-green-800 text-green-800 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Lihat Semua Katalog
                                    <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="py-16 bg-gray-50 dark:bg-gray-900">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className={`text-3xl font-bold ${theme.primary} mb-6`}>Katalog Buku</h2>
                            <div className="py-12">
                                <FiBook className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                    Belum ada buku dalam katalog
                                </p>
                            </div>
                        </div>
                    </section>
                )
            ) : (
                <section className="py-16 bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className={`text-3xl font-bold ${theme.primary} mb-6`}>Katalog Buku</h2>
                        <div className="py-12">
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Gagal memuat data katalog
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Add Footer */}
            <Footer />
        </div>
    );
}