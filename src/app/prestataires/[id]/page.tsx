import { notFound } from 'next/navigation';
import Link from 'next/link';
import PrestataireDetail from './PrestataireDetail';
import { prisma } from '../../../../lib/db';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getPrestataire(id: string) {
  try {
    const prestataire = await prisma.prestataire.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    return prestataire;
  } catch (error) {
    console.error('Erreur lors de la récupération du prestataire:', error);
    return null;
  }
}

export default async function PrestatairePage({ params }: PageProps) {
  const { id } = await params;
  const prestataire = await getPrestataire(id);

  if (!prestataire) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
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
                      <span className="ml-4 text-gray-900 font-medium">{prestataire.nom}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <Link
              href="/prestataires"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Retour aux prestataires
            </Link>
          </div>
        </div>
      </div>

      {/* Prestataire Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PrestataireDetail prestataire={prestataire} />
      </div>
    </div>
  );
}
