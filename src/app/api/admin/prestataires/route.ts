import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
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

    return NextResponse.json(prestataires);
  } catch (error) {
    console.error('Erreur lors de la récupération des prestataires admin:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
