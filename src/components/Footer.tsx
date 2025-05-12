import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Réalisations', href: '/portfolio' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Logo className="h-20 w-auto mb-4" color="light" />
            <p className="text-gray-400 text-sm">
              Votre partenaire stratégique en communication depuis 2020. Expertise, créativité et résultats mesurables.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Numéro 05,
Avenue Ngoy Yenge, Golf Lido, RDC
</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+243 999 166 980</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>info@creup-group.com</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Restez informé de nos dernières actualités et conseils en communication.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary-500"
              />
              <Button
                variant="primary"
                size="md"
              >
                OK
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 CreUp Group. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}