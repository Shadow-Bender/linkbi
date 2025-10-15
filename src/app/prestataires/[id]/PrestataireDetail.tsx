"use client";

import { useState, memo, useCallback, useMemo } from 'react';
import Image from 'next/image';

interface Prestataire {
  id: number;
  nom: string;
  domaine: string;
  ville: string;
  description?: string | null;
  note?: number | null;
  prix?: string | null;
  telephone?: string | null;
  email?: string | null;
  photos: string[];
  siteWeb?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
}

interface PrestataireDetailProps {
  prestataire: Prestataire;
}

const PrestataireDetail = memo(function PrestataireDetail({ prestataire }: PrestataireDetailProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const openWhatsApp = useCallback(() => {
    if (!prestataire.telephone) return;
    
    const message = `Bonjour ${prestataire.nom} !\n\nJe suis intéressé(e) par vos services en ${prestataire.domaine}.\n\nPouvez-vous me donner plus d'informations sur vos prestations et tarifs ?\n\nMerci !`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${prestataire.telephone.replace(/\s/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, [prestataire.telephone, prestataire.nom, prestataire.domaine]);

  const socialLinks = useMemo(() => [
    { name: 'Site Web', url: prestataire.siteWeb, icon: '🌐', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'LinkedIn', url: prestataire.linkedin, icon: '💼', color: 'bg-blue-700 hover:bg-blue-800' },
    { name: 'Twitter', url: prestataire.twitter, icon: '🐦', color: 'bg-sky-500 hover:bg-sky-600' },
    { name: 'Instagram', url: prestataire.instagram, icon: '📸', color: 'bg-pink-500 hover:bg-pink-600' },
    { name: 'Facebook', url: prestataire.facebook, icon: '📘', color: 'bg-blue-600 hover:bg-blue-700' }
  ].filter((link): link is { name: string; url: string; icon: string; color: string } => 
    link.url !== null && link.url !== undefined
  ), [prestataire.siteWeb, prestataire.linkedin, prestataire.twitter, prestataire.instagram, prestataire.facebook]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Photos Section */}
      <div className="space-y-4">
        {/* Photo principale */}
        <div className="relative h-96">
          <Image
            src={prestataire.photos[selectedPhotoIndex]}
            alt={`${prestataire.nom} - Photo ${selectedPhotoIndex + 1}`}
            fill
            className="object-cover rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
          />
          {/* Indicateur de photo active */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {prestataire.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Galerie de photos */}
        {prestataire.photos.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {prestataire.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-200 h-20 ${
                  index === selectedPhotoIndex ? 'ring-2 ring-blue-500' : 'hover:opacity-80'
                }`}
              >
                <Image
                  src={photo}
                  alt={`${prestataire.nom} - Photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                  priority={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Informations Section */}
      <div className="space-y-6">
        {/* Header avec nom, domaine et note */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{prestataire.nom}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
              {prestataire.domaine}
            </span>
            <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full font-medium">
              📍 {prestataire.ville}
            </span>
            {prestataire.note && (
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="ml-1 text-sm font-medium text-yellow-800">
                  {prestataire.note}/5
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {prestataire.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{prestataire.description}</p>
          </div>
        )}

        {/* Prix */}
        {prestataire.prix && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tarifs</h3>
            <p className="text-green-600 font-medium text-lg">{prestataire.prix}</p>
          </div>
        )}

        {/* Bouton WhatsApp */}
        {prestataire.telephone && (
          <div>
            <button
              onClick={openWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Contacter sur WhatsApp</span>
            </button>
          </div>
        )}

        {/* Réseaux sociaux */}
        {socialLinks.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Suivez-nous</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Contact info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations de contact</h3>
          <div className="space-y-2">
            {prestataire.telephone && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">📞</span>
                <span className="text-gray-700">{prestataire.telephone}</span>
              </div>
            )}
            {prestataire.email && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">✉️</span>
                <a href={`mailto:${prestataire.email}`} className="text-blue-600 hover:text-blue-800">
                  {prestataire.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrestataireDetail;
