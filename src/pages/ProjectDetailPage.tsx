import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Image, Play, Target, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/Button';
import type { CaseStudy } from '../types';
import { projectsApi } from '../api';

const typeIcons = {
  Design: Target,
  Photo: Image,
  'Vidéo': Play,
};

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<CaseStudy | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const data = await projectsApi.getById(id).catch(() => null);
        setProject(data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement du projet');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-gray-600">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Projet non trouvé</h1>
          <Link to="/portfolio" className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const TypeIcon = typeIcons[project.category as keyof typeof typeIcons];

  return (
    <main className="min-h-screen pt-20">
      {/* Hero section */}
      <div className="relative h-[70vh] bg-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                {TypeIcon && (
                  <span className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-full">
                    <TypeIcon className="w-6 h-6" />
                  </span>
                )}
                <span className="px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Main content */}
          <div className="lg:col-span-2">
            {/* Project overview */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Aperçu du projet</h2>
              <div className="mb-12">
                <p className="text-xl mb-8">{project.description}</p>
              </div>

            </section>

            {/* Gallery */}
            {project.gallery && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Galerie</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-w-16 aspect-h-9 cursor-pointer group"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Vue ${index + 1}`}
                        className="object-cover rounded-xl shadow-sm hover:shadow-md transition-all"
                      />
                      <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-all rounded-xl" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Video */}
            {project.videoUrl && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Vidéo du projet</h2>
                <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                  <video
                    controls
                    className="w-full"
                    poster={project.image}
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              </section>
            )}
          </div>

          {/* Right column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Project info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Client</dt>
                    <dd className="text-gray-900 font-medium">{project?.client?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Catégorie</dt>
                    <dd className="text-gray-900 font-medium">{project.category}</dd>
                  </div>
                </dl>

                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Clock}
                    fullWidth
                    onClick={() => navigate('/appointment')}
                  >
                    Prendre rendez-vous
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <ArrowUpRight className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Vue détaillée"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </main>
  );
}