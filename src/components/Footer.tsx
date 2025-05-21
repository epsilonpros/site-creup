import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { Button } from './Button'
import { Logo } from './Logo'

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Réalisations', href: '/portfolio' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/CreUpGroup' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/creupgroup._' },
    { name: 'Youtube', icon: Youtube, href: 'https://www.youtube.com/@creup-group2024' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/creup-group' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <Logo className="mb-4 h-20 w-auto" color="light" />
            <p className="text-sm text-gray-400">
              Votre partenaire stratégique en communication. Expertise, créativité et résultats
              mesurables.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Numéro 05, Avenue Ngoy Yenge, Golf Lido, RDC</span>
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
            <h3 className="mb-4 font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 transition-colors hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 font-semibold text-white">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-400">
              Restez informé de nos dernières actualités et conseils en communication.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-primary-500 focus:outline-none"
              />
              <Button variant="primary" size="md">
                OK
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex space-x-6">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 transition-colors hover:text-primary-400"
                    target="_blank"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
            <p className="text-sm text-gray-400">© 2024 CreUp Group. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
