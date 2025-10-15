import { render, screen, fireEvent } from '@testing-library/react'
import PrestatairesList from '../PrestatairesList'

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

jest.mock('next/image', () => {
  return ({ src, alt, fill, priority, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={src} 
      alt={alt} 
      style={fill ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } : undefined}
      {...(priority && { priority: 'true' })}
      {...props} 
    />
  )
})

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
})

describe('PrestatairesList', () => {
  beforeEach(() => {
    mockOpen.mockClear()
  })

  const mockPrestataires = [
    {
      id: 1,
      nom: 'Test Company 1',
      domaine: 'Marketing',
      ville: 'Paris',
      description: 'Test description 1',
      note: 4.5,
      prix: '100€/h',
      telephone: '0123456789',
      email: 'test1@example.com',
      photos: ['https://example.com/photo1.jpg'],
    },
    {
      id: 2,
      nom: 'Test Company 2',
      domaine: 'Design',
      ville: 'Lyon',
      description: 'Test description 2',
      note: 4.0,
      prix: '80€/h',
      telephone: '0987654321',
      email: 'test2@example.com',
      photos: [],
    },
  ]

  it('renders empty state when no prestataires', () => {
    render(<PrestatairesList prestataires={[]} />)
    
    expect(screen.getByText('Aucun prestataire trouvé')).toBeInTheDocument()
    expect(screen.getByText('Il n\'y a actuellement aucun prestataire dans la base de données.')).toBeInTheDocument()
  })

  it('renders prestataires list when prestataires are provided', () => {
    render(<PrestatairesList prestataires={mockPrestataires} />)
    
    expect(screen.getByText('Test Company 1')).toBeInTheDocument()
    expect(screen.getByText('Test Company 2')).toBeInTheDocument()
    expect(screen.getByText('Marketing')).toBeInTheDocument()
    expect(screen.getByText('Design')).toBeInTheDocument()
    expect(screen.getByText('📍 Paris')).toBeInTheDocument()
    expect(screen.getByText('📍 Lyon')).toBeInTheDocument()
  })

  it('displays prestataire information correctly', () => {
    render(<PrestatairesList prestataires={[mockPrestataires[0]]} />)
    
    expect(screen.getByText('Test Company 1')).toBeInTheDocument()
    expect(screen.getByText('Test description 1')).toBeInTheDocument()
    expect(screen.getByText('💰 100€/h')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('renders photos when available', () => {
    render(<PrestatairesList prestataires={[mockPrestataires[0]]} />)
    
    const image = screen.getByAltText('Test Company 1')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/photo1.jpg')
  })

  it('does not render photo section when no photos', () => {
    render(<PrestatairesList prestataires={[mockPrestataires[1]]} />)
    
    expect(screen.queryByAltText('Test Company 2')).not.toBeInTheDocument()
  })

  it('opens WhatsApp with correct message when WhatsApp button is clicked', () => {
    render(<PrestatairesList prestataires={[mockPrestataires[0]]} />)
    
    const whatsappButton = screen.getByText('Contacter sur WhatsApp')
    fireEvent.click(whatsappButton)
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://wa.me/0123456789?text=Bonjour%20Test%20Company%201%20!%0A%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services%20en%20Marketing.%0A%0APouvez-vous%20me%20donner%20plus%20d%27informations%20sur%20vos%20prestations%20et%20tarifs%20%3F%0A%0AMerci%20!',
      '_blank'
    )
  })

  it('does not render WhatsApp button when no telephone', () => {
    const prestataireWithoutPhone = {
      ...mockPrestataires[0],
      telephone: null,
    }
    
    render(<PrestatairesList prestataires={[prestataireWithoutPhone]} />)
    
    expect(screen.queryByText('Contacter sur WhatsApp')).not.toBeInTheDocument()
  })

  it('renders correct links to prestataire details', () => {
    render(<PrestatairesList prestataires={[mockPrestataires[0]]} />)
    
    const detailLinks = screen.getAllByText('Voir détails')
    expect(detailLinks).toHaveLength(2) // One in photo overlay, one in action buttons
    
    detailLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('href', '/prestataires/1')
    })
  })

  it('renders prestataire name as link to details', () => {
    render(<PrestatairesList prestataires={[mockPrestataires[0]]} />)
    
    const nameLink = screen.getByText('Test Company 1').closest('a')
    expect(nameLink).toHaveAttribute('href', '/prestataires/1')
  })

  it('handles prestataires without optional fields gracefully', () => {
    const minimalPrestataire = {
      id: 3,
      nom: 'Minimal Company',
      domaine: 'Consulting',
      ville: 'Marseille',
      description: null,
      note: null,
      prix: null,
      telephone: null,
      email: null,
      photos: [],
    }
    
    render(<PrestatairesList prestataires={[minimalPrestataire]} />)
    
    expect(screen.getByText('Minimal Company')).toBeInTheDocument()
    expect(screen.getByText('Consulting')).toBeInTheDocument()
    expect(screen.getByText('📍 Marseille')).toBeInTheDocument()
    expect(screen.queryByText('💰')).not.toBeInTheDocument()
    expect(screen.queryByText('Contacter sur WhatsApp')).not.toBeInTheDocument()
  })

  it('formats WhatsApp message correctly with special characters', () => {
    const prestataireWithSpecialChars = {
      ...mockPrestataires[0],
      nom: 'Company & Co.',
      domaine: 'Développement',
    }
    
    render(<PrestatairesList prestataires={[prestataireWithSpecialChars]} />)
    
    const whatsappButton = screen.getByText('Contacter sur WhatsApp')
    fireEvent.click(whatsappButton)
    
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('Company%20%26%20Co.'),
      '_blank'
    )
    expect(mockOpen).toHaveBeenCalledWith(
      expect.stringContaining('D%C3%A9veloppement'),
      '_blank'
    )
  })
})