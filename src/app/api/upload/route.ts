import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    // Vérification de la taille (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (max 10MB)' },
        { status: 400 }
      );
    }

    // Simulation de l'upload vers Cloudinary
    // En production, vous devrez configurer votre compte Cloudinary
    // et utiliser le SDK officiel
    
    // Pour l'instant, on simule un upload réussi avec une image placeholder
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    
    // Simuler un délai d'upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retourner une URL d'image placeholder (simulation)
    const mockUploadResponse = {
      secure_url: `https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&sig=${timestamp}_${randomId}`,
      public_id: `prestataire_${timestamp}_${randomId}`,
      format: file.type.split('/')[1],
      width: 800,
      height: 600,
      bytes: file.size,
      created_at: new Date().toISOString()
    };

    return NextResponse.json(mockUploadResponse);
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
