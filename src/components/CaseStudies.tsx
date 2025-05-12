import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Image, Play, Printer, Users } from 'lucide-react';
import type { CaseStudy, ProjectType } from '../types';
import { projectsApi } from '../api';

const categories = ['Tous', 'Print', 'Photo', 'Vidéo', 'Web', 'Social'];

const typeIcons = {
  print: Printer,
  photo: Image,
  video: Play,
  web: ExternalLink,
  social: Users
};

export function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await projectsApi.getAll();
        setCaseStudies(data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des projets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const filteredCases = selectedCategory === 'Tous'
    ? caseStudies
    : caseStudies.filter(study => study.category === selectedCategory);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <section id="case-studies" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-primary-500 font-semibold tracking-wide uppercase">Nos réalisations</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Portfolio créatif
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos projets variés, de l'affiche imprimée à la vidéo promotionnelle, en passant par la photographie professionnelle.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((study) => {
            const ProjectTypeIcon = typeIcons[study.type];
            return (
              <Link
                key={study.id}
                to={`/portfolio/${study.id}`}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {ProjectTypeIcon && (
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <ProjectTypeIcon className="w-5 h-5 text-primary-500" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                      {study.category}
                    </span>
                    <span className="text-sm text-gray-500">{study.client}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                  <div className="flex items-center text-primary-500 group-hover:gap-2 transition-all">
                    Voir le projet
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}