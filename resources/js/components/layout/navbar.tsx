import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { theme } = useAppearance();
  const auth = (usePage().props as any)?.auth;
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isScrollingFarEnough = Math.abs(prevScrollPos - currentScrollPos) > 10;

      if ((isScrollingDown && isScrollingFarEnough && currentScrollPos > 100) || currentScrollPos < 10) {
        setVisible(isScrollingDown ? false : true);
      } else if (isScrollingUp && isScrollingFarEnough) {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [usePage().url]);

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
            <img src="/images/logo.png" alt="CAHJ Logo" className="h-8 md:h-12 w-auto" />
            <div className="flex flex-col">
              <h1 className={`font-bold text-xs md:text-lg ${theme.headerText} leading-tight`}>
                CELEBES ADVANCE
              </h1>
              <p className={`text-[10px] md:text-sm ${theme.text.secondary} leading-tight`}>
                HEALTH JOURNAL
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
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
              href="#"
              className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors`}
            >
              Katalog Buku
            </Link>
            <Link
              href="/Contact"
              className={`${theme.headerText} hover:text-green-200 dark:hover:text-gray-300 transition-colors ${usePage().url === '/Contact' ? 'border-b-2 border-white dark:border-gray-800' : ''}`}
            >
              Kontak
            </Link>
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
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
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
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-full ${theme.header} z-50 p-4 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? 'transform-none' : 'transform translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <img src="/images/logo.png" alt="CAHJ Logo" className="h-10 w-auto" />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-700"
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
          >
            Beranda
          </Link>
          <Link
            href={route('publications')}
            className={`py-2 px-4 rounded-lg ${usePage().url.startsWith('/publications')
              ? 'bg-green-800 text-white'
              : `${theme.headerText} hover:bg-green-800/20`}`}
          >
            Publikasi
          </Link>
          <Link
            href="#"
            className={`py-2 px-4 rounded-lg ${theme.headerText} hover:bg-green-800/20`}
          >
            Katalog Buku
          </Link>
          <Link
            href="/Contact"
            className={`py-2 px-4 rounded-lg ${usePage().url === '/Contact'
              ? 'bg-green-800 text-white'
              : `${theme.headerText} hover:bg-green-800/20`}`}
          >
            Kontak
          </Link>

          <div className="pt-4 border-t border-gray-600">
            {auth?.user ? (
              <>
                <div className="mb-2 px-4 text-sm text-gray-300">
                  Selamat datang, {auth.user.name}
                </div>
                <Link
                  href={route('dashboard')}
                  className="py-2 px-4 bg-green-800 text-white rounded-lg block"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href={route('login')}
                  className="py-2 px-4 bg-green-800 text-white rounded-lg block text-center"
                >
                  Login
                </Link>
                <Link
                  href={route('register')}
                  className="py-2 px-4 border border-green-600 text-green-400 rounded-lg block text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[72px]"></div>
    </>
  );
}