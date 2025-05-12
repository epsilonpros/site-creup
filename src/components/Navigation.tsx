import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Réalisations', href: '/portfolio' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className={`w-6 h-6 ${isScrolled || location.pathname !== '/' ? 'text-indigo-600' : 'text-indigo-400'}`} />
              <span className={`text-2xl font-bold ${
                isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'
              }`}>
                CreUp Group
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled || location.pathname !== '/'
                    ? 'text-gray-700 hover:text-indigo-600'
                    : 'text-gray-100 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              className="group bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              Audit gratuit
              <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled || location.pathname !== '/' ? 'text-gray-700' : 'text-white'
              }`}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md shadow-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="block w-full px-3 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center justify-center gap-2"
          >
            Audit gratuit
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}