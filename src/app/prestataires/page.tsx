import PrestatairesList from './PrestatairesList';
import Link from 'next/link';
import { prisma } from '../../../lib/db';

async function getPrestataires() {
  try {
    const prestataires = await prisma.prestataire.findMany({
      where: {
        statut: 'valide'
      },
      orderBy: {
        note: 'desc'
      }
    });
    return prestataires;
  } catch (error) {
    console.error('Erreur lors de la récupération des prestataires:', error);
    return [];
  }
}

export default async function PrestatairesPage() {
  const prestataires = await getPrestataires();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prestataires</h1>
              <p className="text-gray-600 mt-2">
                {prestataires.length} prestataire{prestataires.length > 1 ? 's' : ''} disponible{prestataires.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/ajouter"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter un prestataire
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ← Retour à la recherche
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Prestataires List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrestatairesList prestataires={prestataires} />
      </div>
    </div>
  );
}
