import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: '1',
    title: 'Refonte digitale',
    client: 'TechVision',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    category: 'Digital',
  },
  {
    id: '2',
    title: 'Campagne éco-responsable',
    client: 'EcoSolutions',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80',
    category: 'Marketing',
  },
  {
    id: '3',
    title: 'Identité de marque',
    client: 'LuxeStyle',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80',
    category: 'Branding',
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Projets récents
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez nos dernières réalisations
            </p>
          </div>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Voir tous les projets
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500">{project.client}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center text-indigo-600 group-hover:gap-2 transition-all"
                >
                  Voir le projet
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}