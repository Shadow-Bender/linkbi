// Configuration Cloudinary pour l'upload de photos
// À configurer avec vos propres identifiants

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || 'linkbi_prestataires'
};

// Instructions de configuration :
// 1. Créez un compte sur https://cloudinary.com/
// 2. Allez dans Dashboard > Settings > Upload
// 3. Créez un upload preset nommé "linkbi_prestataires"
// 4. Ajoutez vos variables d'environnement dans .env :
//    CLOUDINARY_CLOUD_NAME=your_cloud_name
//    CLOUDINARY_API_KEY=your_api_key
//    CLOUDINARY_API_SECRET=your_api_secret
//    CLOUDINARY_UPLOAD_PRESET=linkbi_prestataires

export async function uploadToCloudinary(file: File) {
  // Cette fonction sera implémentée avec le SDK Cloudinary
  // Pour l'instant, on utilise une simulation dans l'API route
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.upload_preset);
  
  // En production, utilisez le SDK Cloudinary directement ici
  // au lieu de passer par l'API route
  
  return fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
}
