import React, { useState } from 'react'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { genericApi } from '../api'

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+243 999 166 980',
    description: 'Du lundi au vendredi, 9h-18h',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@creup-group.com',
    description: 'Réponse sous 24h',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Numéro 05, Avenue Ngoy Yenge',
    description: 'Golf Lido, RDC',
  },
]

const faqItems = [
  {
    question: 'Comment se déroule une collaboration ?',
    answer:
      'Nous commençons par un échange approfondi pour comprendre vos besoins, puis établissons une proposition détaillée. Une fois validée, notre équipe dédiée met en œuvre la stratégie définie.',
  },
  {
    question: 'Quels sont vos délais moyens ?',
    answer:
      'Les délais varient selon la complexité du projet. En moyenne, un projet complet prend 1 à 4 semaines. Nous établissons un planning détaillé dès le début de la collaboration.',
  },
  {
    question: 'Proposez-vous un accompagnement continu ?',
    answer:
      "Oui, nous proposons des forfaits d'accompagnement mensuel pour assurer le suivi et l'optimisation continue de vos actions de communication.",
  },
]

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await genericApi.post('/api/contacts', formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (err) {
      setError("Une erreur est survenue lors de l'envoi du message")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D3640] via-[#0A2A32] to-[#071F24] py-24 pt-28 lg:pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
          <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4 text-primary-200" />
            <span className="text-sm font-medium text-primary-200">Discutons de votre projet</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Contactez-nous
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-primary-100">
            Notre équipe est à votre écoute pour vous accompagner dans vos projets de communication
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>

              {success && (
                <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700">
                  Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs
                  délais.
                </div>
              )}

              {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="info">Demande d'information</option>
                    <option value="rdv">Prise de rendez-vous</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  Informations de contact
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary-50 p-3">
                          <Icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{info.title}</h4>
                          <p className="text-gray-600">{info.value}</p>
                          <p className="text-sm text-gray-500">{info.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">Questions fréquentes</h3>
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium text-gray-900">{item.question}</h4>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Nos bureaux</h2>
            <p className="mt-4 text-lg text-gray-600">Venez nous rencontrer dans nos locaux</p>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl">
            <iframe
              itle="CREUP GROUP Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126139.50196493694!2d27.4665185!3d-11.6699662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f14.1!3m3!1m2!1s0x19723f0078e35a4f%3A0x2874692a0adae978!2sUKAMILI!5e0!3m2!1sen!2sus!4v1709672774923!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
