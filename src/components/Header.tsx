import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Clock } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Réalisations', href: '/portfolio' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
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

  // Add scroll to top handler
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isScrolled ? 'h-16' : 'pt-4 h-20 lg:h-24'}`}>
          <div className="flex-shrink-0">
            <Link to="/" onClick={handleNavClick} className="block">
              <Logo 
                className={`${!isScrolled ? 'h-16' : 'h-10 md:h-14'} w-auto`}
                color={isScrolled ? 'dark' : 'light'}
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-primary-500'
                    : 'text-gray-100 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/appointment">
              <Button
                variant="primary"
                size="md"
                icon={Clock}
              >
                Prendre rendez-vous
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-white'
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
              className="block w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-md"
              onClick={handleNavClick}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/appointment" className="block w-full">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={Clock}
            >
              Prendre rendez-vous
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}