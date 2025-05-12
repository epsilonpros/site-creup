import React, { useEffect, useState } from 'react';
import { BarChart3, Lightbulb, Megaphone } from 'lucide-react';
import type { Service } from '../types';
import { servicesApi } from '../api';

const IconMap = {
  Lightbulb,
  Megaphone,
  BarChart3
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des services');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nos services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Des solutions sur mesure pour votre communication
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = IconMap[service.icon as keyof typeof IconMap];
            return (
              <div
                key={service.id}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white/90" />
                </div>

                <div className="relative">
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-primary-50 text-primary-700 ring-4 ring-white">
                      {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {service.title}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {service.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}