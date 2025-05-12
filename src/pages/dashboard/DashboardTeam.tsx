import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Camera, Code, Palette, Briefcase, BarChart3, Target, PenTool } from 'lucide-react';
import { Button } from '../../components/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  icon: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Yannick Ilunga',
    role: 'Directeur Général',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    icon: 'Target',
    description: 'Expert en stratégie de communication avec plus de 7 ans d\'expérience.'
  },
  {
    id: '2',
    name: 'Sarah Mutombo',
    role: 'Directrice Artistique',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
    icon: 'Palette',
    description: 'Spécialiste en design graphique et identité visuelle.'
  },
  {
    id: '3',
    name: 'David Kabongo',
    role: 'Chef de projet',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    icon: 'Briefcase',
    description: 'Expert en gestion de projets et coordination d\'équipe.'
  },
  {
    id: '4',
    name: 'Jean Mukendi',
    role: 'Cadreur',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80',
    icon: 'Camera',
    description: 'Spécialiste en production vidéo et cadrage professionnel.'
  }
];

const iconOptions = [
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'Palette', label: 'Palette', icon: Palette },
  { value: 'Briefcase', label: 'Briefcase', icon: Briefcase },
  { value: 'Camera', label: 'Camera', icon: Camera },
  { value: 'Code', label: 'Code', icon: Code },
  { value: 'BarChart3', label: 'Chart', icon: BarChart3 },
  { value: 'PenTool', label: 'Design', icon: PenTool }
];

export function DashboardTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion de l'équipe</h1>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => {
            setSelectedMember(null);
            setIsModalOpen(true);
          }}
        >
          Nouveau membre
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member) => {
          const IconComponent = iconOptions.find(i => i.value === member.icon)?.icon || Target;
          return (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden group"
            >
              <div className="aspect-w-3 aspect-h-4 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                  <IconComponent className="w-5 h-5 text-primary-500" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-primary-200 text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-gray-300">{member.description}</p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete
                      if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
                        // Delete logic here
                      }
                    }}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {selectedMember ? 'Modifier le membre' : 'Nouveau membre'}
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    defaultValue={selectedMember?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    defaultValue={selectedMember?.role}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  defaultValue={selectedMember?.description}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icône
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    defaultValue={selectedMember?.icon}
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="URL de l'image"
                    defaultValue={selectedMember?.image}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                >
                  {selectedMember ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}