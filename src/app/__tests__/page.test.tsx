import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Home from '../page'

// Mock the router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Home Page', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the main heading and description', () => {
    render(<Home />)
    
    expect(screen.getByText('Trouvez votre prestataire')).toBeInTheDocument()
    expect(screen.getByText('Recherchez par ville et domaine d\'activité')).toBeInTheDocument()
  })

  it('renders search form with ville and domaine inputs', () => {
    render(<Home />)
    
    expect(screen.getByLabelText('Ville')).toBeInTheDocument()
    expect(screen.getByLabelText('Domaine d\'activité')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rechercher/i })).toBeInTheDocument()
  })

  it('updates ville input value when user types', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const villeInput = screen.getByLabelText('Ville')
    await user.type(villeInput, 'Paris')
    
    expect(villeInput).toHaveValue('Paris')
  })

  it('updates domaine input value when user types', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const domaineInput = screen.getByLabelText('Domaine d\'activité')
    await user.type(domaineInput, 'Marketing')
    
    expect(domaineInput).toHaveValue('Marketing')
  })

  it('navigates to prestataires page with search parameters when form is submitted', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const villeInput = screen.getByLabelText('Ville')
    const domaineInput = screen.getByLabelText('Domaine d\'activité')
    const submitButton = screen.getByRole('button', { name: /rechercher/i })
    
    await user.type(villeInput, 'Paris')
    await user.type(domaineInput, 'Marketing')
    await user.click(submitButton)
    
    expect(mockPush).toHaveBeenCalledWith('/prestataires?ville=Paris&domaine=Marketing')
  })

  it('navigates with only ville parameter when domaine is empty', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const villeInput = screen.getByLabelText('Ville')
    const submitButton = screen.getByRole('button', { name: /rechercher/i })
    
    await user.type(villeInput, 'Lyon')
    await user.click(submitButton)
    
    expect(mockPush).toHaveBeenCalledWith('/prestataires?ville=Lyon')
  })

  it('navigates with only domaine parameter when ville is empty', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const domaineInput = screen.getByLabelText('Domaine d\'activité')
    const submitButton = screen.getByRole('button', { name: /rechercher/i })
    
    await user.type(domaineInput, 'Développement')
    await user.click(submitButton)
    
    expect(mockPush).toHaveBeenCalledWith('/prestataires?domaine=D%C3%A9veloppement')
  })

  it('does not navigate when both inputs are empty', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const submitButton = screen.getByRole('button', { name: /rechercher/i })
    await user.click(submitButton)
    
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('renders quick search suggestions', () => {
    render(<Home />)
    
    expect(screen.getByText('Recherches populaires :')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Lyon')).toBeInTheDocument()
    expect(screen.getByText('Marketing')).toBeInTheDocument()
    expect(screen.getByText('Développement')).toBeInTheDocument()
  })

  it('updates ville input when ville suggestion is clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const parisButton = screen.getByText('Paris')
    await user.click(parisButton)
    
    const villeInput = screen.getByLabelText('Ville')
    expect(villeInput).toHaveValue('Paris')
  })

  it('updates domaine input when domaine suggestion is clicked', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const marketingButton = screen.getByText('Marketing')
    await user.click(marketingButton)
    
    const domaineInput = screen.getByLabelText('Domaine d\'activité')
    expect(domaineInput).toHaveValue('Marketing')
  })

  it('trims whitespace from input values before navigation', async () => {
    const user = userEvent.setup()
    render(<Home />)
    
    const villeInput = screen.getByLabelText('Ville')
    const domaineInput = screen.getByLabelText('Domaine d\'activité')
    const submitButton = screen.getByRole('button', { name: /rechercher/i })
    
    await user.type(villeInput, '  Paris  ')
    await user.type(domaineInput, '  Marketing  ')
    await user.click(submitButton)
    
    expect(mockPush).toHaveBeenCalledWith('/prestataires?ville=Paris&domaine=Marketing')
  })
})