import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { FiMenu, FiX } from 'react-icons/fi';
import AppearanceToggleTab from '@/components/appearance-tabs';

export default function Navbar() {
  const { theme } = useAppearance();
  const auth = (usePage().props as any)?.auth;
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <header
        className={`${theme.header} fixed w-full z-50 shadow-lg transition-transform duration-300 ease-in-out`}
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src="/images/new-logo.png" alt="CAHJ Logo" className="h-8 md:h-12 w-auto" />
            <div className="flex flex-col">
              <h1 className={`font-bold text-xs md:text-lg ${theme.headerText} leading-tight`}>
                CELEBES HEALTH
              </h1>
              <p className={`text-[10px] md:text-sm ${theme.text.light} leading-tight`}>
                JOURNAL
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors ${usePage().url === '/' ? 'border-b-2 border-white dark:border-gray-800' : ''}`}
            >
              Beranda
            </Link>
            <Link
              href={route('publications')}
              className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors ${usePage().url.startsWith('/publications') ? 'border-b-2 border-white dark:border-gray-800' : ''}`}
            >
              Publikasi
            </Link>
            <Link
              href={route('catalogs.index')}
              className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors ${usePage().url.startsWith('/catalogs') ? 'border-b-2 border-white dark:border-gray-800' : ''}`}
            >
              Katalog Buku
            </Link>
            <Link
              href="/Contact"
              className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors ${usePage().url === '/Contact' ? 'border-b-2 border-white dark:border-gray-800' : ''}`}
            >
              Kontak
            </Link>

            {/* Icons-only theme toggle untuk desktop */}
            <AppearanceToggleTab variant="icons-only" className="scale-90" />

            {auth?.user && (
              <Link
                href={route('dashboard')}
                className="bg-white text-green-800 dark:bg-gray-200 dark:text-gray-800 px-4 py-1.5 rounded-full hover:bg-green-50 dark:hover:bg-gray-300 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              className="p-2 rounded-md focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className={`w-6 h-6 ${theme.headerText}`} />
              ) : (
                <FiMenu className={`w-6 h-6 ${theme.headerText}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-full ${theme.header} z-50 p-4 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'transform-none' : 'transform translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <img
            src="/images/new-logo.png"
            alt="CAHJ Logo"
            className="h-8 md:h-12 w-auto"
            loading="eager"
            decoding="async"
            width="48"
            height="48"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-green-700"
            aria-label="Close menu"
          >
            <FiX className={`w-5 h-5 ${theme.headerText}`} />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className={`py-2 px-4 rounded-lg ${usePage().url === '/'
              ? 'bg-green-800 text-white'
              : `${theme.headerText} hover:bg-green-800/20`}`}
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href={route('publications')}
            className={`py-2 px-4 rounded-lg ${usePage().url.startsWith('/publications')
              ? 'bg-green-800 text-white'
              : `${theme.headerText} hover:bg-green-800/20`}`}
            onClick={() => setIsOpen(false)}
          >
            Publikasi
          </Link>
          <Link
            href={route('catalogs.index')}
            className={`py-2 px-4 rounded-lg ${usePage().url.startsWith('/catalogs')
              ? 'bg-green-800 text-white'
              : `${theme.headerText} hover:bg-green-800/20`}`}
            onClick={() => setIsOpen(false)}
          >
            Katalog Buku
          </Link>
          <Link
            href="/Contact"
            className={`py-2 px-4 rounded-lg ${usePage().url === '/Contact'
              ? 'bg-green-800 text-white'
              : `${theme.headerText} hover:bg-green-800/20`}`}
            onClick={() => setIsOpen(false)}
          >
            Kontak
          </Link>

          {/* Icons-only theme toggle untuk mobile */}
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <p className={`text-sm ${theme.headerText}`}>Tema</p>
              <AppearanceToggleTab variant="icons-only" />
            </div>
          </div>

          {auth?.user && (
            <>
              <div className="pt-4 border-t border-gray-600">
                <div className={`mb-2 px-4 text-sm ${theme.text.secondary}`}>
                  Selamat datang, {auth.user.name}
                </div>
                <Link
                  href={route('dashboard')}
                  className="py-2 px-4 bg-green-800 text-white rounded-lg block"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[72px]"></div>
    </>
  );
}