import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

// Mock GSAP
vi.mock('gsap', () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: vi.fn(() => ({
            to: vi.fn(),
        })),
    },
}))

vi.mock('gsap/ScrollTrigger', () => ({
    ScrollTrigger: {
        getAll: vi.fn(() => []),
    },
}))

// Mock Framer Motion
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion')
    return {
        ...actual,
        useScroll: () => ({ scrollY: { get: () => 0 } }),
        useTransform: () => 0,
    }
})

describe('Hero Component', () => {
    it('renders correctly', () => {
        // Mock Canvas getContext
        const getContextMock = vi.fn(() => ({
            clearRect: vi.fn(),
            drawImage: vi.fn(),
        }))
        HTMLCanvasElement.prototype.getContext = getContextMock as any

        render(<Hero />)
        const brandName = screen.getByText('Oryizon.')
        expect(brandName).toBeInTheDocument()
    })
})
