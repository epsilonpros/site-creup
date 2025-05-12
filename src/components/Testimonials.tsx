import React, { useEffect, useState } from 'react';
import type { Testimonial } from '../types';
import { testimonialsApi } from '../api';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsApi.getAll();
        setTestimonials(data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des témoignages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez ce que nos clients disent de notre collaboration
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex-1 p-6">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} - {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}