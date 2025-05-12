import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './Button';
import { genericApi } from '../api';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await genericApi.post('/contact', data);
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Contactez-nous
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Discutons de vos projets et objectifs en communication. Notre équipe est là pour vous accompagner.
            </p>
            <dl className="mt-8 text-base text-gray-500">
              <div className="mt-6">
                <dt className="sr-only">Adresse</dt>
                <dd className="flex">
                  <MapPin className="h-6 w-6 text-primary-400" aria-hidden="true" />
                  <span className="ml-3">
                    Numéro 05, Avenue Ngoy Yenge<br />
                    Golf Lido, RDC
                  </span>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="sr-only">Téléphone</dt>
                <dd className="flex">
                  <Phone className="h-6 w-6 text-primary-400" aria-hidden="true" />
                  <span className="ml-3">+243 999 166 980</span>
                </dd>
              </div>
              <div className="mt-3">
                <dt className="sr-only">Email</dt>
                <dd className="flex">
                  <Mail className="h-6 w-6 text-primary-400" aria-hidden="true" />
                  <span className="ml-3">info@creup-group.com</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div className="max-w-lg mx-auto lg:max-w-none">
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  placeholder="Nom complet"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  placeholder="Téléphone"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}