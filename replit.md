# GridShift - Creative Collective Website

## Overview

GridShift is a modern, responsive portfolio website for a creative collective of independent developers, designers, and artists. The site showcases the team's diverse skills including web development, photography, graphic design, and video production. Built with React, TypeScript, and modern web technologies, it serves as both a portfolio showcase and a business platform for attracting new clients and demonstrating the collective's capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Language**: React 18 with TypeScript for type safety and modern component architecture.

**Styling System**: 
- Tailwind CSS for utility-first styling with custom design tokens
- shadcn/ui component library for consistent, accessible UI components
- Custom CSS variables for brand colors and theming
- Responsive design with mobile-first approach

**Routing**: React Router for client-side navigation between pages (Home, About, Services, Portfolio, Blog, Contact).

**Component Structure**:
- Modular component architecture with reusable UI components
- Page-level components for each route
- Shared layout components (Navigation, Footer)
- Feature-specific components (Hero, Services, TeamPreview, etc.)

**State Management**: React hooks for local state, React Query for server state management and caching.

**Build System**: Vite for fast development and optimized production builds with hot module replacement.

### Design System

**Typography**: Custom font stack featuring Utendo (display), Afacad (body), and Inter (fallback) fonts loaded via CSS.

**Color Palette**: Dark theme with coral accent color (#FF5722 equivalent) as the primary brand color, using HSL color space for consistent theming.

**Component Library**: shadcn/ui components providing:
- Form controls (Input, Button, Textarea)
- Layout components (Card, Dialog, Navigation)
- Feedback components (Toast, Alert)
- Data display components (Badge, Avatar, Carousel)

### Content Architecture

**Page Structure**:
- Landing page with hero section, services overview, team preview, and recent work
- Dedicated pages for detailed information (About, Services, Portfolio, Blog, Contact)
- Modular content sections that can be reused across pages

**Asset Management**: Static assets organized in public directory with optimized images and custom font files.

**Media Viewing System**: Comprehensive media gallery supporting multiple formats:
- **Images**: Displayed in responsive grid with fullscreen lightbox viewing, zoom controls, and captions
- **Videos**: Full video playback with seeking controls, timeline scrubbing, and fullscreen mode
- **PDFs**: Dedicated viewer modal with page navigation, zoom controls, and download functionality
- Implementation uses yet-another-react-lightbox for images/videos and react-pdf for PDF documents
- Portfolio markdown files support media arrays with type, src, caption, and alt text metadata
- Located in `src/components/ProjectMediaSection.tsx` and `src/components/PDFViewer.tsx`

### Development Workflow

**Code Quality**: ESLint configuration with TypeScript rules and React-specific linting.

**Development Tools**: 
- Hot reload development server
- TypeScript compilation with strict type checking disabled for flexibility
- Path aliases for clean imports (@/ mapping to src/)

### Performance Considerations

**Optimization Strategies**:
- Component-based code splitting through React Router
- Optimized asset loading with proper image formats
- Font display optimization with font-display: swap
- Responsive images and lazy loading patterns

**SEO & Accessibility**:
- Semantic HTML structure
- Meta tags for social sharing (Open Graph, Twitter Cards)
- Proper heading hierarchy and ARIA labels
- Keyboard navigation support through shadcn/ui components

## External Dependencies

### Core Framework Dependencies
- **React & React DOM**: Frontend framework and rendering
- **React Router**: Client-side routing and navigation
- **TypeScript**: Static type checking and development experience

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui components**: Pre-built, accessible React components using Radix UI primitives
- **Radix UI**: Headless UI primitives for complex interactive components
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs

### Development Tools
- **Vite**: Build tool and development server
- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing with Tailwind CSS integration

### State Management & Data Fetching
- **TanStack React Query**: Server state management, caching, and data synchronization
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Validation schema integration

### Additional Features
- **next-themes**: Theme switching capabilities (though currently using dark theme)
- **date-fns**: Date manipulation and formatting utilities
- **Embla Carousel**: Carousel/slider functionality
- **Sonner & Radix Toast**: Toast notification systems

### Media & Document Viewing
- **yet-another-react-lightbox**: Modern lightbox library for images and videos with plugin support
  - Video plugin: Full video playback with controls and seeking
  - Zoom plugin: Image zoom and pan capabilities
  - Fullscreen plugin: Fullscreen viewing mode
  - Captions plugin: Display captions and metadata
- **react-pdf**: PDF rendering in React with page navigation
- **pdfjs-dist**: Mozilla's PDF.js library for PDF parsing and rendering

### Font Resources
- **Custom Fonts**: Utendo and Afacad font families hosted locally
- **Google Fonts**: Inter font family as fallback option

### Testing Framework
- **Playwright**: End-to-end testing for critical user flows and visual regression testing

The architecture prioritizes maintainability, performance, and user experience while providing a solid foundation for showcasing the creative collective's work and attracting new business opportunities.