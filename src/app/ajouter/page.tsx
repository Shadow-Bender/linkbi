"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  nom: string;
  domaine: string;
  ville: string;
  description: string;
  telephone: string;
  email: string;
  prix: string;
  siteWeb: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
}

export default function AjouterPrestatairePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    domaine: '',
    ville: '',
    description: '',
    telephone: '',
    email: '',
    prix: '',
    siteWeb: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'linkbi_prestataires'); // À configurer dans Cloudinary

        // Simuler l'upload vers Cloudinary
        // En production, vous devrez configurer votre propre compte Cloudinary
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.secure_url);
        } else {
          // Fallback: utiliser une image placeholder si l'upload échoue
          uploadedUrls.push(`https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&sig=${Date.now()}`);
        }

        setUploadProgress(((i + 1) / files.length) * 100);
      }

      setUploadedPhotos(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      // Fallback: utiliser des images placeholder
      const fallbackUrls = Array.from(files).map((_, index) => 
        `https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&sig=${Date.now() + index}`
      );
      setUploadedPhotos(prev => [...prev, ...fallbackUrls]);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prestataires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          photos: uploadedPhotos
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/prestataires/${data.id}`);
      } else {
        throw new Error('Erreur lors de l\'ajout du prestataire');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'ajout du prestataire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const domaines = [
    'Marketing Digital',
    'Développement Web',
    'Design Graphique',
    'Développement Mobile',
    'SEO/SEA',
    'Rédaction Web',
    'Vidéo/Montage',
    'Photographie',
    'Autre'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Accueil
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/prestataires" className="ml-4 text-gray-500 hover:text-gray-700">
                    Prestataires
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-gray-900 font-medium">Ajouter un prestataire</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900">Ajouter un prestataire</h1>
          <p className="text-gray-600 mt-2">
            Remplissez le formulaire ci-dessous pour ajouter un nouveau prestataire à notre plateforme.
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise * <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Agence Digital Plus"
                />
              </div>

              <div>
                <label htmlFor="domaine" className="block text-sm font-medium text-gray-700 mb-2">
                  Domaine d'activité * <span className="text-red-500">*</span>
                </label>
                <select
                  id="domaine"
                  name="domaine"
                  value={formData.domaine}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un domaine</option>
                  {domaines.map(domaine => (
                    <option key={domaine} value={domaine}>{domaine}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">
                  Ville * <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Paris"
                />
              </div>

              <div>
                <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-2">
                  Tarifs
                </label>
                <input
                  type="text"
                  id="prix"
                  name="prix"
                  value={formData.prix}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: À partir de 500€/jour"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description * <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez vos services, votre expertise, vos réalisations..."
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone WhatsApp * <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: +33123456789"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: contact@entreprise.fr"
                />
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Réseaux sociaux</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="siteWeb" className="block text-sm font-medium text-gray-700 mb-2">
                    Site web
                  </label>
                  <input
                    type="url"
                    id="siteWeb"
                    name="siteWeb"
                    value={formData.siteWeb}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.entreprise.fr"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/company/entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://twitter.com/entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://instagram.com/entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/entreprise"
                  />
                </div>
              </div>
            </div>

            {/* Upload de photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos de l'entreprise
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Cliquez pour sélectionner des photos
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF jusqu'à 10MB
                  </p>
                </label>
              </div>

              {/* Barre de progression */}
              {isSubmitting && uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Upload en cours... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}

              {/* Photos uploadées */}
              {uploadedPhotos.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Photos sélectionnées:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link
                href="/prestataires"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter le prestataire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
