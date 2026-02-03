# TeknoKeys Website Clone

## Overview
A modern, 3D animated website rebuild for TeknoKeys - a leading IT solutions company in Yemen and Saudi Arabia. The site features bilingual support (Arabic/English), 3D Canvas effects, Framer Motion animations, and a comprehensive set of pages.

## Recent Changes (January 2026)
- Added Canvas-based 3D rendering: particle system background and rotating 3D cube viewer using native Canvas API
- Fixed contact form submission by removing Card3D wrapper that was blocking clicks
- Enhanced contact form success state with role="alert" and proper accessibility attributes
- Created full multi-page website with 3D effects and animations
- Implemented Arabic/English language toggle with RTL support
- Added dark/light theme toggle
- Created all page components: Home, About, Services, Prices, Projects, Blogs, Contact, Academy
- Set up API routes for all data endpoints with pre-populated TeknoKeys content

## Tech Stack
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Animations**: Framer Motion
- **Styling**: TailwindCSS with custom 3D utilities
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Backend**: Express.js
- **Data**: In-memory storage with pre-populated content from TeknoKeys website

## Project Structure
```
client/
  src/
    components/          # Reusable UI components
      3d-card.tsx       # 3D interactive card with mouse tracking
      canvas-3d.tsx     # Canvas-based 3D effects (particles, cube viewer)
      animated-section.tsx  # Scroll-triggered animations
      footer.tsx        # Site footer
      language-toggle.tsx  # AR/EN toggle
      navbar.tsx        # Navigation bar
      partners-slider.tsx  # Infinite logo slider
      slider-3d.tsx     # 3D carousel slider
      theme-toggle.tsx  # Dark/light mode
      typing-text.tsx   # Typewriter effect
      vertical-slider.tsx  # Vertical 3D slider
      ui/               # Shadcn UI components
    lib/
      language-context.tsx  # i18n context provider
      queryClient.ts    # TanStack Query client
    pages/
      home.tsx          # Landing page with hero, stats, services preview
      about.tsx         # Company info, values, testimonials
      services.tsx      # Services with vertical 3D slider
      prices.tsx        # Pricing plans with 3D slider
      projects.tsx      # Portfolio grid with modal
      blogs.tsx         # Blog articles grid
      contact.tsx       # Contact form with typing animation
      academy.tsx       # Redirect to external academy URL
server/
  routes.ts             # API endpoints
  storage.ts            # In-memory data storage
shared/
  schema.ts             # TypeScript types and Zod schemas
```

## Key Features
1. **Canvas-based 3D Effects**: Real Canvas API 3D particle system background and 3D cube viewer
2. **Interactive 3D Cards**: Cards that respond to mouse movement with perspective transforms
3. **Framer Motion Animations**: Scroll-triggered entrance animations, hover effects, typing text
4. **Bilingual Support**: Full Arabic and English support with automatic RTL layout switching
5. **Dark Mode**: Theme toggle with persistent preference
6. **Vertical 3D Sliders**: Services and Prices pages feature vertical scrolling 3D sliders
7. **Responsive**: Mobile-first design with adaptive layouts

## API Endpoints
- `GET /api/projects` - List all projects
- `GET /api/services` - List all services  
- `GET /api/prices` - List pricing plans
- `GET /api/blogs` - List blog articles
- `GET /api/partners` - List partner logos
- `GET /api/clients` - List client logos
- `GET /api/testimonials` - List testimonials
- `GET /api/stats` - Get company statistics
- `POST /api/contact` - Submit contact form

## Design System
- **Primary Color**: Gold/Yellow (#EAB308) for branding
- **Dark Theme**: Dark blue-gray backgrounds
- **Typography**: Inter (Latin), Cairo (Arabic)
- **Border Radius**: Rounded-md (6px) for consistency
