import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

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
      where: {
        statut: 'valide'
      },
      orderBy: {
        note: 'desc'
      },
      select: {
        id: true,
        nom: true,
        domaine: true,
        ville: true,
        description: true,
        note: true,
        prix: true,
        telephone: true,
        email: true,
        photos: true,
        siteWeb: true,
        linkedin: true,
        twitter: true,
        instagram: true,
        facebook: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(prestataires, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
        'CDN-Cache-Control': 'max-age=300',
        'Vercel-CDN-Cache-Control': 'max-age=300'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des prestataires:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
