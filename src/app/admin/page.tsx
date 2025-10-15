"use client";

import { useState, useEffect, Suspense, lazy } from 'react';

const AdminLogin = lazy(() => import('./AdminLogin'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));

interface Prestataire {
  id: number;
  nom: string;
  domaine: string;
  ville: string;
  description?: string | null;
  telephone?: string | null;
  email?: string | null;
  photos: string[];
  statut: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prestataires, setPrestataires] = useState<Prestataire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchPrestataires();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPrestataires = async () => {
    try {
      const response = await fetch('/api/admin/prestataires');
      if (response.ok) {
        const data = await response.json();
        setPrestataires(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des prestataires:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token: string) => {
    localStorage.setItem('admin_token', token);
    setIsAuthenticated(true);
    fetchPrestataires();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPrestataires([]);
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/prestataires/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ statut: newStatus })
      });

      if (response.ok) {
        // Mettre à jour la liste locale
        setPrestataires(prev => 
          prev.map(p => p.id === id ? { ...p, statut: newStatus } : p)
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce prestataire ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/prestataires/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        // Retirer de la liste locale
        setPrestataires(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      }>
        <AdminLogin onLogin={handleLogin} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <AdminDashboard
        prestataires={prestataires}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onLogout={handleLogout}
      />
    </Suspense>
  );
}
