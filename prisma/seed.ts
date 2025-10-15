import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Supprimer les données existantes
  await prisma.prestataire.deleteMany();

  // Créer des prestataires de test
  const prestataires = [
    {
      nom: "Agence Digital Plus",
      domaine: "Marketing Digital",
      ville: "Paris",
      description: "Spécialiste en marketing digital et réseaux sociaux. Nous accompagnons les entreprises dans leur transformation digitale avec des stratégies sur mesure. Notre équipe d'experts crée des campagnes performantes qui génèrent des résultats concrets.",
      note: 4.8,
      prix: "À partir de 500€/jour",
      telephone: "+33123456789",
      email: "contact@agencedigitalplus.fr",
      photos: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
      ],
      siteWeb: "https://agencedigitalplus.fr",
      linkedin: "https://linkedin.com/company/agence-digital-plus",
      twitter: "https://twitter.com/agencedigitalplus",
      instagram: "https://instagram.com/agencedigitalplus",
      facebook: "https://facebook.com/agencedigitalplus",
      statut: "valide"
    },
    {
      nom: "Studio Web Pro",
      domaine: "Développement Web",
      ville: "Lyon",
      description: "Création de sites web et applications sur mesure. Développement frontend et backend avec les technologies les plus récentes. Nous créons des solutions digitales performantes et évolutives.",
      note: 4.9,
      prix: "À partir de 600€/jour",
      telephone: "+33456789012",
      email: "hello@studiowebpro.fr",
      photos: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
      ],
      siteWeb: "https://studiowebpro.fr",
      linkedin: "https://linkedin.com/company/studio-web-pro",
      twitter: "https://twitter.com/studiowebpro",
      instagram: "https://instagram.com/studiowebpro",
      facebook: "https://facebook.com/studiowebpro",
      statut: "valide"
    },
    {
      nom: "Design Studio",
      domaine: "Design Graphique",
      ville: "Marseille",
      description: "Design d'identité visuelle et supports marketing. Création de logos, chartes graphiques et supports de communication. Notre créativité au service de votre image de marque.",
      note: 4.7,
      prix: "À partir de 400€/jour",
      telephone: "+33412345678",
      email: "info@designstudio.fr",
      photos: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop"
      ],
      siteWeb: "https://designstudio.fr",
      linkedin: "https://linkedin.com/company/design-studio",
      twitter: "https://twitter.com/designstudio",
      instagram: "https://instagram.com/designstudio",
      facebook: "https://facebook.com/designstudio",
      statut: "valide"
    },
    {
      nom: "Tech Solutions",
      domaine: "Développement Mobile",
      ville: "Paris",
      description: "Développement d'applications mobiles iOS et Android. Solutions sur mesure pour entreprises et startups. Nous créons des apps performantes et intuitives.",
      note: 4.6,
      prix: "À partir de 700€/jour",
      telephone: "+33198765432",
      email: "contact@techsolutions.fr",
      photos: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1526498460520-4c246319d3b9?w=800&h=600&fit=crop"
      ],
      siteWeb: "https://techsolutions.fr",
      linkedin: "https://linkedin.com/company/tech-solutions",
      twitter: "https://twitter.com/techsolutions",
      instagram: "https://instagram.com/techsolutions",
      facebook: "https://facebook.com/techsolutions",
      statut: "valide"
    },
    {
      nom: "Marketing Expert",
      domaine: "Marketing Digital",
      ville: "Bordeaux",
      description: "Expert en marketing digital et publicité en ligne. Campagnes Google Ads, Facebook Ads et optimisation SEO. Nous maximisons votre ROI avec des stratégies ciblées.",
      note: 4.5,
      prix: "À partir de 450€/jour",
      telephone: "+33512345678",
      email: "hello@marketingexpert.fr",
      photos: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
      ],
      siteWeb: "https://marketingexpert.fr",
      linkedin: "https://linkedin.com/company/marketing-expert",
      twitter: "https://twitter.com/marketingexpert",
      instagram: "https://instagram.com/marketingexpert",
      facebook: "https://facebook.com/marketingexpert",
      statut: "valide"
    },
    {
      nom: "Creative Agency",
      domaine: "Design Graphique",
      ville: "Nantes",
      description: "Agence créative spécialisée dans le design et la communication. Création de supports print et digitaux. Notre approche créative fait la différence.",
      note: 4.4,
      prix: "À partir de 380€/jour",
      telephone: "+33212345678",
      email: "contact@creativeagency.fr",
      photos: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop"
      ],
      siteWeb: "https://creativeagency.fr",
      linkedin: "https://linkedin.com/company/creative-agency",
      twitter: "https://twitter.com/creativeagency",
      instagram: "https://instagram.com/creativeagency",
      facebook: "https://facebook.com/creativeagency",
      statut: "valide"
    }
  ];

  for (const prestataire of prestataires) {
    await prisma.prestataire.create({
      data: prestataire
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${prestataires.length} prestataires`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
