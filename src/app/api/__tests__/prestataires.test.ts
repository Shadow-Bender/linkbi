import { NextRequest } from 'next/server'
import { POST, GET } from '../prestataires/route'
import { prisma } from '../../../../lib/db'

// Mock Prisma
jest.mock('../../../../lib/db', () => ({
  prisma: {
    prestataire: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

const mockPrisma = prisma as jest.Mocked<typeof prisma>

describe('/api/prestataires', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/prestataires', () => {
    it('should create a new prestataire with valid data', async () => {
      const mockPrestataire = {
        id: 1,
        nom: 'Test Company',
        domaine: 'Marketing',
        ville: 'Paris',
        description: 'Test description',
        telephone: '0123456789',
        email: 'test@example.com',
        prix: '100€/h',
        photos: [],
        siteWeb: 'https://test.com',
        linkedin: 'https://linkedin.com/test',
        twitter: 'https://twitter.com/test',
        instagram: 'https://instagram.com/test',
        facebook: 'https://facebook.com/test',
        statut: 'en_attente',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrisma.prestataire.create.mockResolvedValue(mockPrestataire)

      const request = new NextRequest('http://localhost:3000/api/prestataires', {
        method: 'POST',
        body: JSON.stringify({
          nom: 'Test Company',
          domaine: 'Marketing',
          ville: 'Paris',
          description: 'Test description',
          telephone: '0123456789',
          email: 'test@example.com',
          prix: '100€/h',
          photos: [],
          siteWeb: 'https://test.com',
          linkedin: 'https://linkedin.com/test',
          twitter: 'https://twitter.com/test',
          instagram: 'https://instagram.com/test',
          facebook: 'https://facebook.com/test',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toEqual(mockPrestataire)
      expect(mockPrisma.prestataire.create).toHaveBeenCalledWith({
        data: {
          nom: 'Test Company',
          domaine: 'Marketing',
          ville: 'Paris',
          description: 'Test description',
          telephone: '0123456789',
          email: 'test@example.com',
          prix: '100€/h',
          photos: [],
          siteWeb: 'https://test.com',
          linkedin: 'https://linkedin.com/test',
          twitter: 'https://twitter.com/test',
          instagram: 'https://instagram.com/test',
          facebook: 'https://facebook.com/test',
        },
      })
    })

    it('should return 400 when required fields are missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/prestataires', {
        method: 'POST',
        body: JSON.stringify({
          nom: 'Test Company',
          // Missing required fields
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('est requis')
    })

    it('should return 400 when required fields are empty strings', async () => {
      const request = new NextRequest('http://localhost:3000/api/prestataires', {
        method: 'POST',
        body: JSON.stringify({
          nom: '   ',
          domaine: 'Marketing',
          ville: 'Paris',
          description: 'Test description',
          telephone: '0123456789',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('nom')
    })

    it('should trim whitespace from input fields', async () => {
      const mockPrestataire = {
        id: 1,
        nom: 'Test Company',
        domaine: 'Marketing',
        ville: 'Paris',
        description: 'Test description',
        telephone: '0123456789',
        email: null,
        prix: null,
        photos: [],
        siteWeb: null,
        linkedin: null,
        twitter: null,
        instagram: null,
        facebook: null,
        statut: 'en_attente',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrisma.prestataire.create.mockResolvedValue(mockPrestataire)

      const request = new NextRequest('http://localhost:3000/api/prestataires', {
        method: 'POST',
        body: JSON.stringify({
          nom: '  Test Company  ',
          domaine: '  Marketing  ',
          ville: '  Paris  ',
          description: '  Test description  ',
          telephone: '  0123456789  ',
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      expect(mockPrisma.prestataire.create).toHaveBeenCalledWith({
        data: {
          nom: 'Test Company',
          domaine: 'Marketing',
          ville: 'Paris',
          description: 'Test description',
          telephone: '0123456789',
          email: null,
          prix: null,
          photos: [],
          siteWeb: null,
          linkedin: null,
          twitter: null,
          instagram: null,
          facebook: null,
        },
      })
    })

    it('should handle database errors', async () => {
      mockPrisma.prestataire.create.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/prestataires', {
        method: 'POST',
        body: JSON.stringify({
          nom: 'Test Company',
          domaine: 'Marketing',
          ville: 'Paris',
          description: 'Test description',
          telephone: '0123456789',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Erreur interne du serveur')
    })
  })

  describe('GET /api/prestataires', () => {
    it('should return valid prestataires ordered by note', async () => {
      const mockPrestataires = [
        {
          id: 1,
          nom: 'Company 1',
          domaine: 'Marketing',
          ville: 'Paris',
          description: 'Description 1',
          note: 4.5,
          prix: '100€/h',
          telephone: '0123456789',
          email: 'test1@example.com',
          photos: [],
          siteWeb: 'https://company1.com',
          linkedin: 'https://linkedin.com/company1',
          twitter: 'https://twitter.com/company1',
          instagram: 'https://instagram.com/company1',
          facebook: 'https://facebook.com/company1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nom: 'Company 2',
          domaine: 'Design',
          ville: 'Lyon',
          description: 'Description 2',
          note: 4.0,
          prix: '80€/h',
          telephone: '0987654321',
          email: 'test2@example.com',
          photos: [],
          siteWeb: 'https://company2.com',
          linkedin: 'https://linkedin.com/company2',
          twitter: 'https://twitter.com/company2',
          instagram: 'https://instagram.com/company2',
          facebook: 'https://facebook.com/company2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      mockPrisma.prestataire.findMany.mockResolvedValue(mockPrestataires)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockPrestataires)
      expect(mockPrisma.prestataire.findMany).toHaveBeenCalledWith({
        where: {
          statut: 'valide',
        },
        orderBy: {
          note: 'desc',
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
          updatedAt: true,
        },
      })
    })

    it('should include proper cache headers', async () => {
      mockPrisma.prestataire.findMany.mockResolvedValue([])

      const response = await GET()

      expect(response.headers.get('Cache-Control')).toBe('public, max-age=300, s-maxage=300, stale-while-revalidate=600')
      expect(response.headers.get('CDN-Cache-Control')).toBe('max-age=300')
      expect(response.headers.get('Vercel-CDN-Cache-Control')).toBe('max-age=300')
    })

    it('should handle database errors', async () => {
      mockPrisma.prestataire.findMany.mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Erreur interne du serveur')
    })
  })
})