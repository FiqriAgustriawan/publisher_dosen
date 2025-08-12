import { Head, Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import {
    FiBook,
    FiUsers,
    FiAward,
    FiMapPin,
    FiPhone,
    FiArrowRight,
    FiFileText,
    FiCalendar,
    FiBookOpen,
    FiCheckCircle,
    FiShield
} from 'react-icons/fi';
import { MdOutlineMailOutline } from 'react-icons/md';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    catalogs?: Catalog[];
}

export default function Welcome({ publications = [], catalogs = [] }: WelcomeProps) {
    const { theme } = useAppearance();
    const auth = (usePage().props as any)?.auth;

    console.log('Props received:', { publications, catalogs });

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className={`${theme.background} min-h-screen`}>
            <Head title="Celebes Advance Health Journal" />
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-800 to-green-700 text-white py-24 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-5 skew-x-12 transform -translate-x-20"></div>
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 bg-repeat"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="text-left" data-aos="fade-right">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                                    Jurnal Kesehatan Terpercaya
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                    CELEBES ADVANCE HEALTH JOURNAL
                                </h1>
                                <p className="text-xl text-white/90 mb-8">
                                    Platform Publikasi Inovasi Riset dan Pengabdian Masyarakat di bidang Kesehatan
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={route('publications')}
                                        className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition-colors shadow-lg flex items-center justify-center space-x-2 group"
                                    >
                                        <span>Lihat Publikasi</span>
                                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href={route('catalogs.index')}
                                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                                    >
                                        Katalog Buku
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden md:block text-center" data-aos="fade-left">
                                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-full inline-block">
                                    <img
                                        src="/images/logo.png"
                                        alt="CAHJ Logo"
                                        className="w-full max-w-xs mx-auto drop-shadow-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tentang Lembaga Section */}
            <section className="py-20 relative overflow-hidden" data-aos="fade-up">
                <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full opacity-50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1">
                                <div className="relative">
                                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 dark:bg-green-900/40 rounded-lg z-0"></div>
                                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 relative z-10 border-t-4 border-green-700">
                                        <div className="flex items-center mb-6">
                                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                                <FiShield className="w-6 h-6 text-green-700 dark:text-green-400" />
                                            </div>
                                            <h3 className="ml-4 text-lg font-bold text-gray-800 dark:text-white">Legalitas</h3>
                                        </div>
                                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                            <p className="font-medium">SK Kementerian Hukum dan HAM RI</p>
                                            <p>No. AHU-033395.AH.01.30. Tahun 2025</p>
                                            <p>Tanggal 2 Juli 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2" data-aos="fade-left">
                                <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-3">
                                    TENTANG KAMI
                                </span>
                                <h2 className={`text-3xl md:text-4xl font-bold ${theme.primary} mb-6`}>
                                    Tentang Lembaga
                                </h2>
                                <p className={`text-lg ${theme.text.primary} mb-6 leading-relaxed`}>
                                    Merupakan badan usaha yang bergerak di bidang publikasi ilmiah. Lembaga ini bertujuan meningkatkan dan mengembangkan pengetahuan, keterampilan praktik kesehatan, martabat, kesejahteraan, dan etika profesi kesehatan.
                                </p>
                                <div className="space-y-4 mt-8">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-1">
                                            <FiCheckCircle className="w-5 h-5 text-green-700 dark:text-green-400" />
                                        </div>
                                        <p className={`ml-4 ${theme.text.primary}`}>Publikasi jurnal ilmiah berkualitas tinggi</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-1">
                                            <FiCheckCircle className="w-5 h-5 text-green-700 dark:text-green-400" />
                                        </div>
                                        <p className={`ml-4 ${theme.text.primary}`}>Pengembangan literatur kesehatan</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mt-1">
                                            <FiCheckCircle className="w-5 h-5 text-green-700 dark:text-green-400" />
                                        </div>
                                        <p className={`ml-4 ${theme.text.primary}`}>Peningkatan standar profesi kesehatan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications Section - Timeline Style */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900" data-aos="fade-up">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-3">
                                PENELITIAN TERBARU
                            </span>
                            <h2 className={`text-3xl font-bold ${theme.primary}`}>
                                Publikasi Terkini
                            </h2>
                        </div>
                        <Link
                            href={route('publications')}
                            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-green-700 dark:text-green-500 hover:text-green-900 dark:hover:text-green-400 font-medium group"
                        >
                            Lihat Semua Publikasi
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {publications.length === 0 ? (
                        <div className={`${theme.card} p-10 rounded-xl text-center border border-gray-200 dark:border-gray-700 shadow-md`}>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                <FiFileText className="w-10 h-10 text-green-500 dark:text-green-400" />
                            </div>
                            <h3 className={`text-2xl font-bold mb-3 ${theme.primary}`}>Publikasi Akan Segera Hadir</h3>
                            <p className={`${theme.text.secondary} max-w-lg mx-auto mb-6`}>
                                Kami sedang mempersiapkan publikasi-publikasi berkualitas untuk Anda. Kunjungi kembali halaman ini dalam waktu dekat.
                            </p>
                            <Link
                                href={route('contact')}
                                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Hubungi Kami
                                <FiArrowRight />
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-green-200 dark:bg-green-800 transform md:translate-x-px"></div>

                            {/* Timeline items */}
                            <div className="relative z-10">
                                {publications.slice(0, 4).map((pub, index) => (
                                    <div
                                        key={pub.id}
                                        className={`mb-12 relative ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-0' : 'md:pl-12'} md:w-1/2`}
                                        data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                                        data-aos-delay={index * 100}
                                    >
                                        {/* Timeline node */}
                                        <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0 md:-left-3' : 'left-0 md:-left-3'} md:left-auto md:right-0 md:-right-3 w-6 h-6 rounded-full bg-white border-4 border-green-500 dark:bg-gray-800`}></div>

                                        {/* Content card */}
                                        <div className={`${theme.card} shadow-lg rounded-xl overflow-hidden ml-8 md:ml-0 hover:-translate-y-1 transition-transform duration-300`}>
                                            <div className="relative">
                                                {pub.image ? (
                                                    <img
                                                        src={`/storage/${pub.image}`}
                                                        alt={pub.title}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 bg-gradient-to-r from-green-700 to-green-500 flex items-center justify-center">
                                                        <FiFileText className="w-12 h-12 text-white" />
                                                    </div>
                                                )}
                                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-md font-medium">
                                                    {new Date(pub.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className={`text-xl font-bold mb-3 ${theme.primary} line-clamp-2`}>
                                                    {pub.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <FiUsers className="text-green-600 dark:text-green-500" />
                                                    <span className={`text-sm ${theme.text.secondary}`}>
                                                        {pub.user.name}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={route('publications.show', pub.id)}
                                                    className="text-green-700 dark:text-green-500 hover:text-green-900 dark:hover:text-green-400 font-medium flex items-center gap-1 group"
                                                >
                                                    Baca Selengkapnya
                                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-16">
                        <Link
                            href={route('publications')}
                            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
                        >
                            Jelajahi Semua Publikasi
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Katalog Buku Section - Horizontal Scroll */}
            {Array.isArray(catalogs) ? (
                catalogs.length > 0 ? (
                    <section className="py-16" data-aos="fade-up">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-3">
                                        SUMBER PENGETAHUAN
                                    </span>
                                    <h2 className={`text-3xl font-bold ${theme.primary}`}>
                                        Katalog Buku
                                    </h2>
                                </div>
                                <Link
                                    href={route('catalogs.index')}
                                    className="mt-4 md:mt-0 inline-flex items-center gap-2 text-green-700 dark:text-green-500 hover:text-green-900 dark:hover:text-green-400 font-medium group"
                                >
                                    Lihat Semua Katalog
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Horizontal scrolling catalog */}
                            <div className="relative">
                                <div className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-gray-200 dark:scrollbar-thumb-green-600 dark:scrollbar-track-gray-800">
                                    {catalogs.slice(0, 6).map((catalog, index) => (
                                        <div
                                            key={catalog.id}
                                            className="snap-start flex-none w-72 md:w-80"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 50}
                                        >
                                            <div className={`h-full ${theme.card} rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col`}>
                                                <div className="relative h-48 overflow-hidden">
                                                    {catalog.gambar_sampul ? (
                                                        <img
                                                            src={`/storage/${catalog.gambar_sampul}`}
                                                            alt={catalog.nama}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center">
                                                            <FiBook className="w-12 h-12 text-white" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                        <Link
                                                            href={route('catalogs.show', catalog.id)}
                                                            className="text-white font-medium text-sm backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full"
                                                        >
                                                            Lihat Detail
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="p-5 flex-grow flex flex-col">
                                                    <h3 className={`text-lg font-bold mb-2 ${theme.primary} line-clamp-1`}>
                                                        {catalog.nama}
                                                    </h3>
                                                    <p className={`${theme.text.secondary} text-sm mb-4 line-clamp-3 flex-grow`}>
                                                        {catalog.deskripsi}
                                                    </p>
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                        <FiCalendar className="mr-1" />
                                                        <span>
                                                            {new Date(catalog.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Left/Right shadows for scroll indication */}
                                <div className="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-white to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-white to-transparent dark:from-gray-900 dark:to-transparent pointer-events-none"></div>
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    href={route('catalogs.index')}
                                    className="inline-flex items-center gap-2 border-2 border-green-800 text-green-800 dark:border-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Lihat Semua Katalog
                                    <FiArrowRight />
                                </Link>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="py-16" data-aos="fade-up">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-3">
                                        SUMBER PENGETAHUAN
                                    </span>
                                    <h2 className={`text-3xl font-bold ${theme.primary}`}>
                                        Katalog Buku
                                    </h2>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-200 dark:border-gray-700">
                                <div className="bg-green-50 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiBook className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className={`text-2xl font-bold ${theme.primary} mb-4`}>
                                    Katalog Buku Segera Hadir
                                </h3>
                                <p className={`${theme.text.secondary} max-w-lg mx-auto mb-6`}>
                                    Kami sedang menyiapkan koleksi buku berkualitas untuk melengkapi sumber pengetahuan Anda. Kunjungi kembali halaman ini dalam waktu dekat.
                                </p>
                                <Link
                                    href={route('contact')}
                                    className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Hubungi Kami
                                    <FiArrowRight />
                                </Link>
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

            {/* CTA Section */}
            <section className="py-16 bg-green-800 text-white relative overflow-hidden" data-aos="fade-up">
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1" d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,202.7C840,203,960,149,1080,144C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Mulai Publikasikan Karya Anda Sekarang
                        </h2>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan komunitas peneliti dan akademisi untuk berbagi pengetahuan dan inovasi di bidang kesehatan
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href={route('publications')}
                                className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition-colors shadow-lg flex items-center justify-center space-x-2"
                            >
                                <span>Lihat Publikasi</span>
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href={route('contact')}
                                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}