import { Head, Link, usePage } from '@inertiajs/react';
import { themeConfig } from '@/lib/theme-config';
import {
    FiBook,
    FiUsers,
    FiAward,
    FiMapPin,
    FiPhone,
    FiArrowRight
} from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import { useAppearance } from '@/hooks/use-appearance';

export default function Welcome() {
    const { theme } = useAppearance();
    const auth = (usePage().props as any)?.auth;

    const dummyPublications = [
        {
            id: 1,
            title: "Penelitian Kesehatan Masyarakat di Era Digital",
            author: "Dr. Sutomo",
            date: "2025-08-01",
            image: "https://source.unsplash.com/random/400x300/?medical",
        },
        {
            id: 2,
            title: "Inovasi Pendidikan Tinggi",
            author: "Prof. Sarah Johnson",
            date: "2025-07-28",
            image: "https://source.unsplash.com/random/400x300/?education",
        },
    ];

    return (
        <div className={`${theme.background} min-h-screen`}>
            <Head title="Welcome" />

            {/* Header */}
            <header className={`${theme.header} sticky top-0 z-50 shadow-lg`}>
                <div className="container mx-auto px-4  py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src="/images/logo.png" alt="CAHJ Logo" className="h-12 w-auto" />
                        <div className="hidden sm:block">
                            <h1 className={`font-bold text-lg ${theme.headerText}`}>
                                CELEBES ADVANCE
                            </h1>
                            <p className={`text-sm ${theme.text.secondary}`}>
                                HEALTH JOURNAL
                            </p>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors`}>
                            Beranda
                        </Link>
                        <Link href="#" className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors`}>
                            Publikasi
                        </Link>
                        <Link href="#" className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors`}>
                            Katalog Buku
                        </Link>
                        <Link href="/kontak" className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors`}>
                            Kontak
                        </Link>
                       {auth.user && (
                            <Link
                                href={route('dashboard')}
                                className="bg-white text-green-800 dark:bg-gray-200 dark:text-gray-800 px-4 py-1.5 rounded-full hover:bg-green-50 dark:hover:bg-gray-300 transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

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
                                        href={route('login')}
                                        className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <span>Lihat Publikasi</span>
                                        <FiArrowRight className="w-5 h-5" />
                                    </Link>
                                    <button className="border-2 border-green-800 text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                                        Katalog Buku
                                    </button>
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
                    <div className="grid md:grid-cols-3 gap-8">
                        {dummyPublications.map((pub) => (
                            <div
                                key={pub.id}
                                className={`${theme.card} rounded-lg shadow-lg overflow-hidden hover:-translate-y-1 transition-transform ${theme.border}`}
                            >
                                <img
                                    src={pub.image}
                                    alt={pub.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className={`text-xl font-bold mb-2 ${theme.primary}`}>
                                        {pub.title}
                                    </h3>
                                    <p className={theme.text.secondary}>{pub.author}</p>
                                    <p className={theme.text.muted}>
                                        {new Date(pub.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}