import { NextRequest, NextResponse } from 'next/server';

// Identifiants admin basiques (en production, utilisez une base de données et du hachage)
const ADMIN_CREDENTIALS = {
  email: 'admin@linkbi.fr',
  password: 'admin123'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation des champs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérification des identifiants
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Génération d'un token simple (en production, utilisez JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        token,
        user: {
          email: ADMIN_CREDENTIALS.email,
          role: 'admin'
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la connexion admin:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
