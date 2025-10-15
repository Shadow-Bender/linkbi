import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function GET() {
  try {
    // Récupérer tous les prestataires avec tri par date de création
    const prestataires = await prisma.prestataire.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        nom: true,
        domaine: true,
        ville: true,
        description: true,
        telephone: true,
        email: true,
        photos: true,
        statut: true,
        createdAt: true
      }
    });

    return NextResponse.json(prestataires, {
      headers: {
        'Cache-Control': 'private, max-age=60, s-maxage=60',
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des prestataires admin:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
