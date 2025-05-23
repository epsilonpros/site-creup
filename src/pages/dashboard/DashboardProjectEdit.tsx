import React, { useEffect, useState } from 'react'
import { ArrowLeft, Image, Link as LinkIcon, Tag, Users, X } from 'lucide-react'
import { Button } from '../../components/Button'
import type { CaseStudy, Partner, ProjectTeamMember } from '../../types'
import { projectsApi } from '../../api/projects'
import { partnersApi } from '../../api/partners'
import { useNavigate, useParams } from 'react-router-dom'

const projectTypes = ['Graphique design', 'Photo', 'Vidéo', 'Projet interne']

export function DashboardProjectEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<CaseStudy | null>(null)
  const [clients, setClients] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string>(projectTypes[0])
  const [isUpdating, setIsUpdating] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [galleryUrls, setGalleryUrls] = useState<string[]>([])
  const [currentGalleryUrl, setCurrentGalleryUrl] = useState('')
  const [socialPost, setSocialPost] = useState({
    platform: 'linkedin' as const,
    url: '',
    thumbnail: '',
  })
  const [teamMembers, setTeamMembers] = useState<ProjectTeamMember[]>([])
  const [testimonial, setTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    image: '',
  })

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [clientsData] = await Promise.all([partnersApi.getAll()])
      setClients(clientsData['hydra:member']?.filter((p) => p.kind === 'client') || [])

      if (id !== 'new') {
        const projectData = await projectsApi.getById(id)
        setProject(projectData)
        setTags(projectData.tags || [])
        setGalleryUrls(projectData.gallery || [])
        setCategory(projectData.category)
        if (projectData.socialPost) {
          setSocialPost(projectData.socialPost)
        }
        if (projectData.team) {
          setTeamMembers(projectData.team)
        }
        if (projectData.testimonial) {
          setTestimonial(projectData.testimonial)
        }
      }
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des données')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    let projectData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category,
      type: formData.get('type'),
      image: formData.get('image'),
      tags,
      gallery: galleryUrls,
      socialPost: socialPost.url ? socialPost : undefined,
      team: teamMembers.length > 0 ? teamMembers : undefined,
      testimonial: testimonial.name ? testimonial : undefined,
    }

    if (category !== 'Projet interne') {
      projectData = { ...projectData, client: formData.get('client') }
    }

    try {
      if (id === 'new') {
        await projectsApi.create(projectData)
      } else {
        await projectsApi.update(id, projectData)
      }
      navigate('/dashboard/projects')
    } catch (err) {
      setError('Une erreur est survenue lors de la sauvegarde du projet')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddGalleryUrl = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentGalleryUrl.trim()) {
      e.preventDefault()
      if (!galleryUrls.includes(currentGalleryUrl.trim())) {
        setGalleryUrls([...galleryUrls, currentGalleryUrl.trim()])
      }
      setCurrentGalleryUrl('')
    }
  }

  const removeGalleryUrl = (urlToRemove: string) => {
    setGalleryUrls(galleryUrls.filter((url) => url !== urlToRemove))
  }

  const handleAddTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        id: Date.now().toString(),
        name: '',
        role: '',
        icon: 'Users',
        description: '',
        contribution: '',
      },
    ])
  }

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const handleTeamMemberChange = (id: string, field: keyof ProjectTeamMember, value: string) => {
    setTeamMembers(
      teamMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member))
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary-500"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/dashboard/projects')}
          >
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {id === 'new' ? 'Nouveau projet' : 'Modifier le projet'}
          </h1>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                name="title"
                className="w-full rounded-lg border px-4 py-2"
                defaultValue={project?.title}
                required
              />
            </div>
            {category !== 'Projet interne' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Client</label>
                <select
                  name="client"
                  className="w-full rounded-lg border px-4 py-2"
                  defaultValue={project?.client?.['@id']}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={`/api/partners/${client.id}`}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              className="w-full rounded-lg border px-4 py-2"
              rows={4}
              defaultValue={project?.description}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
              <select
                name="category"
                className="w-full rounded-lg border px-4 py-2"
                defaultValue={project?.category}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Image</label>
              <input
                type="text"
                name="image"
                placeholder="URL de l'image"
                className="w-full rounded-lg border px-4 py-2"
                defaultValue={project?.image}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Ajouter un tag (Appuyez sur Entrée)"
                className="flex-1 rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Galerie d'images</label>
            <div className="mb-4 grid grid-cols-2 gap-4">
              {galleryUrls.map((url) => (
                <div key={url} className="relative aspect-video">
                  <img src={url} alt="Gallery" className="h-full w-full rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryUrl(url)}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={currentGalleryUrl}
                onChange={(e) => setCurrentGalleryUrl(e.target.value)}
                onKeyDown={handleAddGalleryUrl}
                placeholder="Ajouter une URL d'image (Appuyez sur Entrée)"
                className="flex-1 rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Publication du client
            </label>
            <div className="space-y-4 rounded-lg border p-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">URL</label>
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={socialPost.url}
                    onChange={(e) => setSocialPost({ ...socialPost, url: e.target.value })}
                    placeholder="URL de la publication"
                    className="flex-1 rounded-lg border px-4 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Miniature</label>
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={socialPost.thumbnail}
                    onChange={(e) => setSocialPost({ ...socialPost, thumbnail: e.target.value })}
                    placeholder="URL de la miniature"
                    className="flex-1 rounded-lg border px-4 py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Équipe du projet</label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                icon={Users}
                onClick={handleAddTeamMember}
              >
                Ajouter un membre
              </Button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="rounded-lg border p-4">
                  <div className="mb-4 flex items-start justify-between">
                    <h4 className="text-sm font-medium text-gray-900">Membre de l'équipe</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveTeamMember(member.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-gray-600">Nom</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(member.id, 'name', e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Nom du membre"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-600">Rôle</label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleTeamMemberChange(member.id, 'role', e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Rôle dans le projet"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-sm text-gray-600">Portfolio</label>
                      <input
                        type="url"
                        value={member.portfolio || ''}
                        onChange={(e) =>
                          handleTeamMemberChange(member.id, 'portfolio', e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="URL du portfolio"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div>
            <label className="mb-4 block text-sm font-medium text-gray-700">
              Témoignage client
            </label>
            <div className="rounded-lg border p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Nom</label>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Nom du client"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-600">Rôle</label>
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) => setTestimonial({ ...testimonial, role: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Poste du client"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm text-gray-600">Témoignage</label>
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2"
                    rows={4}
                    placeholder="Contenu du témoignage"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate('/dashboard/projects')}
              disabled={isUpdating}
            >
              Annuler
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={isUpdating}>
              {isUpdating
                ? id === 'new'
                  ? 'Création...'
                  : 'Mise à jour...'
                : id === 'new'
                  ? 'Créer'
                  : 'Mettre à jour'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
