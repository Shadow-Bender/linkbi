import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

// Mettre à jour le statut d'un prestataire
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { statut } = body;

    if (!statut || !['en_attente', 'valide', 'rejete'].includes(statut)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      );
    }

    const prestataire = await prisma.prestataire.update({
      where: { id },
      data: { statut },
      select: {
        id: true,
        nom: true,
        statut: true,
        updatedAt: true
      }
    });

    return NextResponse.json(prestataire);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prestataire:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// Supprimer un prestataire
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.prestataire.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du prestataire:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
