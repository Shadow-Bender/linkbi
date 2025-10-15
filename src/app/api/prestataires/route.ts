import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des champs requis
    const requiredFields = ['nom', 'domaine', 'ville', 'description', 'telephone'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Création du prestataire
    const prestataire = await prisma.prestataire.create({
      data: {
        nom: body.nom.trim(),
        domaine: body.domaine.trim(),
        ville: body.ville.trim(),
        description: body.description.trim(),
        telephone: body.telephone.trim(),
        email: body.email?.trim() || null,
        prix: body.prix?.trim() || null,
        photos: body.photos || [],
        siteWeb: body.siteWeb?.trim() || null,
        linkedin: body.linkedin?.trim() || null,
        twitter: body.twitter?.trim() || null,
        instagram: body.instagram?.trim() || null,
        facebook: body.facebook?.trim() || null,
      }
    });

    return NextResponse.json(prestataire, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du prestataire:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const prestataires = await prisma.prestataire.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(prestataires);
  } catch (error) {
    console.error('Erreur lors de la récupération des prestataires:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
