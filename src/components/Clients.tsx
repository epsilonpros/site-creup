import React from 'react';
import { Building2, Users } from 'lucide-react';
import { Button } from './Button';

const clients = [
  {
    name: 'TechVision',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200',
    industry: 'Technologies',
    description: 'Leader en solutions technologiques innovantes'
  },
  {
    name: 'EcoSolutions',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    industry: 'Environnement',
    description: 'Solutions durables pour un avenir meilleur'
  },
  {
    name: 'LuxeStyle',
    logo: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=200',
    industry: 'Mode & Luxe',
    description: 'Excellence dans le secteur du luxe'
  },
  {
    name: 'UrbanFood',
    logo: 'https://images.unsplash.com/photo-1621111848501-8d3634f82336?auto=format&fit=crop&q=80&w=200',
    industry: 'Restauration',
    description: 'Redéfinir l\'expérience gastronomique urbaine'
  },
  {
    name: 'FinancePlus',
    logo: 'https://images.unsplash.com/photo-1598120290407-1a8dff3a2389?auto=format&fit=crop&q=80&w=200',
    industry: 'Finance',
    description: 'Services financiers innovants'
  },
  {
    name: 'SportLife',
    logo: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&q=80&w=200',
    industry: 'Sport',
    description: 'Le sport accessible à tous'
  },
];

const stats = [
  { id: 1, name: 'Clients actifs', value: '50+' },
  { id: 2, name: 'Projets réalisés', value: '200+' },
  { id: 3, name: 'Taux de satisfaction', value: '98%' },
  { id: 4, name: 'Années d\'expérience', value: '15+' },
];

export function Clients() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600 tracking-wide uppercase">
              Nos clients
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Des entreprises leaders qui nous confient leur communication et leur croissance
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-600">{stat.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-12">
            Nos partenaires de confiance
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group relative"
              >
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-32 transition-all duration-300 group-hover:shadow-md">
                  <img
                    className="max-h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    src={client.logo}
                    alt={client.name}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary-600/90 text-white p-4 rounded-lg shadow-lg max-w-[200px]">
                    <p className="font-medium text-sm">{client.name}</p>
                    <p className="text-xs text-primary-200 mt-1">{client.industry}</p>
                    <p className="text-xs mt-2">{client.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <Building2 className="h-12 w-12 mx-auto mb-6 text-primary-200" />
          <h3 className="text-2xl font-bold mb-4">
            Prêt à transformer votre communication ?
          </h3>
          <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
            Rejoignez plus de 50 entreprises qui nous font confiance pour leur stratégie de communication
          </p>
          <Button
            variant="white"
            size="lg"
          >
            Demander un audit gratuit
          </Button>
        </div>
      </div>
    </section>
  );
}