"use client";

import Link from 'next/link';
import Image from 'next/image';
import { memo, useCallback } from 'react';

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
}

interface PrestatairesListProps {
  prestataires: Prestataire[];
}

const PrestatairesList = memo(function PrestatairesList({ prestataires }: PrestatairesListProps) {
  const openWhatsApp = useCallback((prestataire: Prestataire) => {
    const message = `Bonjour ${prestataire.nom} !\n\nJe suis intéressé(e) par vos services en ${prestataire.domaine}.\n\nPouvez-vous me donner plus d'informations sur vos prestations et tarifs ?\n\nMerci !`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${prestataire.telephone?.replace(/\s/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  if (prestataires.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun prestataire trouvé</h3>
        <p className="mt-1 text-sm text-gray-500">
          Il n&apos;y a actuellement aucun prestataire dans la base de données.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {prestataires.map((prestataire) => (
        <div key={prestataire.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
          {/* Photo du prestataire */}
          {prestataire.photos && prestataire.photos.length > 0 && (
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <Image
                src={prestataire.photos[0]}
                alt={prestataire.nom}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              <div className="absolute top-3 right-3">
                <Link
                  href={`/prestataires/${prestataire.id}`}
                  className="bg-white/90 hover:bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          )}

          <div className="p-6">
            {/* Header avec nom et note */}
            <div className="flex items-start justify-between mb-4">
              <Link href={`/prestataires/${prestataire.id}`} className="group">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {prestataire.nom}
                </h3>
              </Link>
              {prestataire.note && (
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="ml-1 text-sm font-medium text-yellow-800">
                    {prestataire.note}
                  </span>
                </div>
              )}
            </div>
            
            {/* Tags domaine et ville */}
            <div className="mb-4 space-y-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                {prestataire.domaine}
              </span>
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium ml-2">
                📍 {prestataire.ville}
              </span>
            </div>
            
            {/* Description */}
            {prestataire.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {prestataire.description}
              </p>
            )}
            
            {/* Prix */}
            {prestataire.prix && (
              <div className="mb-4">
                <span className="text-sm font-medium text-green-600">
                  💰 {prestataire.prix}
                </span>
              </div>
            )}
            
            {/* Boutons d'action */}
            <div className="flex flex-col space-y-2">
              {/* Bouton WhatsApp */}
              {prestataire.telephone && (
                <button
                  onClick={() => openWhatsApp(prestataire)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Contacter sur WhatsApp</span>
                </button>
              )}
              
              {/* Bouton Voir détails */}
              <Link
                href={`/prestataires/${prestataire.id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Voir détails</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default PrestatairesList;
