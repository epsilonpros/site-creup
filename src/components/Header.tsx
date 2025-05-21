import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, Menu, X } from 'lucide-react'
import { Button } from './Button'
import { Logo } from './Logo'
import { AnimatePresence, motion } from 'framer-motion'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Réalisations', href: '/portfolio' },
  { name: 'À propos', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

interface Props {
  isScrolled: boolean
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function Header({ isScrolled = false, isOpen, setIsOpen }: Props) {
  // Add scroll to top handler
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }
  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  }

  const logoHeight = () => {
    let height = 'h-16'

    if (isScrolled && !isOpen) {
      // height = 'h-10 md:h-14'
    }
    return height
  }

  return (
    <motion.div
      initial={false}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="left-0 right-0 top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={handleNavClick}
              className={`relative z-50 text-2xl font-bold transition-all duration-300 ${
                isScrolled && !isOpen ? '-translate-x-4 scale-75' : 'scale-100'
              } block`}
            >
              <Logo
                className={`${logoHeight()} w-auto`}
                color={isScrolled && !isOpen ? 'dark' : 'light'}
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary-500 ${
                  isScrolled ? 'text-gray-700' : 'text-gray-100'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute left-0 right-0 h-0.5 ${
                      isScrolled ? 'bg-primary-500' : 'bg-white'
                    } bottom-0`}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            <Link to="/appointment">
              <Button variant="primary" size="md" icon={Clock}>
                Prendre rendez-vous
              </Button>
            </Link>
          </div>

          <div className="relative z-50 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center rounded-md p-2 ${
                isScrolled && !isOpen ? 'text-gray-700' : 'text-white'
              }`}
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              <AnimatePresence mode="wait">
                <span className="sr-only">Ouvrir le menu</span>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 h-screen bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-600 lg:hidden"
          >
            <div className="relative flex min-h-screen flex-col">
              <div className="flex flex-1 items-center justify-start px-7">
                <motion.ul
                  className="space-y-2 text-start"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`relative block w-full ${isOpen ? '' : 'rounded-md'} ${isActive(item.href) ? 'border-r-4 border-solid border-primary-500' : ''} px-3 py-2 text-base font-medium text-white hover:bg-gray-50 hover:text-primary-500`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* CTA Button - Right aligned */}

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/appointment" className="mt-8 block w-full">
                      <Button variant="primary" size="md" fullWidth icon={Clock}>
                        Prendre rendez-vous
                      </Button>
                    </Link>
                  </motion.div>
                </motion.ul>
              </div>

              <motion.div variants={itemVariants} className="pb-12 text-center">
                <p className="text-sm text-white/60">
                  &copy; {new Date().getFullYear()} CreUp Group. Tous droits réservés.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
