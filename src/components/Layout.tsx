import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          boxShadow: isScrolled
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : 'none',
          height: isScrolled && !isOpen ? '4rem' : '5rem',
          paddingTop: isScrolled && !isOpen ? '0px' : '1rem',
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="fixed top-0 z-50 flex w-full items-center"
      >
        <Header isScrolled={isScrolled} isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
