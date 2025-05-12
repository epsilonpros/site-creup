import React, { useEffect, useState } from 'react'
import { ArrowRight, Calendar, CheckCircle, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { appointmentsApi, servicesApi } from '../api'
import type { Service } from '../types'

export function AppointmentPage() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    phone: '',
    entreprise: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll().catch(() => [])
        setServices(data['hydra:member'])
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des services')
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      console.log({
        ...formData,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      })
      await appointmentsApi
        .create({
          ...formData,
          service: '/api/services/' + selectedService,
          date: selectedDate,
          time: selectedTime,
        })
        .catch(() => {
          throw new Error('Une erreur est survenue lors de la prise de rendez-vous')
        })
      setIsSubmitted(true)
    } catch (err) {
      setError('Une erreur est survenue lors de la prise de rendez-vous')
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-28">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Rendez-vous confirmé !</h2>
            <p className="mb-6 text-gray-600">
              Nous avons bien reçu votre demande de rendez-vous. Un membre de notre équipe vous
              contactera dans les plus brefs délais pour confirmer les détails.
            </p>
            <div className="space-y-4 rounded-lg bg-gray-50 p-6 text-left">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary-500" />
                <span className="text-gray-700">{selectedDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary-500" />
                <span className="text-gray-700">{selectedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form Section */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Prendre rendez-vous</h1>

            {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="prenom"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="mb-2 block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
                      className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="entreprise"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Service souhaité</h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`rounded-lg border p-4 text-left shadow-sm transition-all ${
                        selectedService === service.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Date et heure</h2>
                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700">
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Heure souhaitée
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-lg border p-3 text-center shadow-sm transition-all ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Décrivez brièvement votre projet ou vos besoins..."
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
                {isSubmitting ? 'Confirmation en cours...' : 'Confirmer le rendez-vous'}
              </Button>
            </form>
          </div>

          {/* Info Section */}
          <div className="lg:pt-8">
            <div className="rounded-2xl bg-gray-900 p-8 text-white">
              <h2 className="mb-6 text-xl font-semibold">Informations pratiques</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 flex-shrink-0 text-primary-400" />
                  <div>
                    <h3 className="mb-1 font-medium">Notre adresse</h3>
                    <p className="text-gray-300">
                      Numéro 05, Avenue Ngoy Yenge
                      <br />
                      Golf Lido, RDC
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 flex-shrink-0 text-primary-400" />
                  <div>
                    <h3 className="mb-1 font-medium">Horaires d'ouverture</h3>
                    <p className="text-gray-300">
                      Lundi - Vendredi : 9h - 18h
                      <br />
                      Samedi : Sur rendez-vous
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 flex-shrink-0 text-primary-400" />
                  <div>
                    <h3 className="mb-1 font-medium">Téléphone</h3>
                    <p className="text-gray-300">+243 999 166 980</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 flex-shrink-0 text-primary-400" />
                  <div>
                    <h3 className="mb-1 font-medium">Email</h3>
                    <p className="text-gray-300">info@creup-group.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-gray-800 p-6">
                <h3 className="mb-2 font-medium">Note importante</h3>
                <p className="text-sm text-gray-300">
                  Après confirmation de votre rendez-vous, un membre de notre équipe vous contactera
                  dans les 24h pour confirmer la disponibilité et les détails de la rencontre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
