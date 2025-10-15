"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [ville, setVille] = useState("");
  const [domaine, setDomaine] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ville.trim() || domaine.trim()) {
      const params = new URLSearchParams();
      if (ville.trim()) params.append("ville", ville.trim());
      if (domaine.trim()) params.append("domaine", domaine.trim());
      
      router.push(`/prestataires?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trouvez votre prestataire
          </h1>
          <p className="text-xl text-gray-600">
            Recherchez par ville et domaine d&apos;activité
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Ville Field */}
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                id="ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                placeholder="Ex: Paris, Lyon, Marseille..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Domaine Field */}
            <div>
              <label htmlFor="domaine" className="block text-sm font-medium text-gray-700 mb-2">
                Domaine d&apos;activité
              </label>
              <input
                type="text"
                id="domaine"
                value={domaine}
                onChange={(e) => setDomaine(e.target.value)}
                placeholder="Ex: Marketing, Développement web, Design..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              🔍 Rechercher
            </button>
          </form>

          {/* Optional: Quick Search Suggestions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Recherches populaires :</p>
            <div className="flex flex-wrap gap-2">
              {["Paris", "Lyon", "Marketing", "Développement"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    if (suggestion === "Paris" || suggestion === "Lyon") {
                      setVille(suggestion);
                    } else {
                      setDomaine(suggestion);
                    }
                  }}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Trouvez rapidement les meilleurs prestataires pour vos projets
          </p>
        </div>
      </div>
    </div>
  );
}
