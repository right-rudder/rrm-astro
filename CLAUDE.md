# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

The following npm scripts are available for development and deployment:

```bash
npm run dev          # Start development server with Astro
npm run build        # Production build
npm run build:preview # Build with draft content included
npm run preview      # Preview production build locally
npm run seo:audit    # Run comprehensive SEO audit
npm run seo:links    # Check internal/external link health
npm run seo:optimize # Run audit + build (recommended before deployment)
```

Always run `npm run seo:optimize` before deploying to ensure SEO compliance and build success.

## Project Architecture

This is an **Astro-based marketing website** for Right Rudder Marketing, a digital marketing agency specializing in flight schools. The architecture follows Astro's island-based approach with selective hydration.

### Technology Stack

- **Framework**: Astro 5.8+ with React integration
- **Styling**: Tailwind CSS with custom aviation-themed design system
- **Content**: MDX with structured collections (blog, webinars, podcasts, crew)
- **Performance**: Optimized image handling
- **SEO**: Custom SEO utilities, automated link checking, meta optimization

### Key Directories

**`/src/content/`** - Content collections with strict TypeScript schemas:

- `blog/` - Marketing articles and aviation industry content
- `webinars/` - Event-based content with registration integration
- `podcasts/` - Audio content with guest metadata
- `crew/` - Team member profiles with social links

**`/src/components/`** - Reusable Astro components:

- Header/Footer components with aviation branding
- Content components (BlogCard, CaseStudies, Testimonials)
- Interactive React components (Navbar, forms, counters)
- SEO components (Schema, LocalBusiness markup)

**`/src/pages/`** - File-based routing with nested structures:

- Dynamic routes for content collections `[...slug].astro`
- Service pages (SEO, web design, Google Ads)
- Resource pages with lead magnets
- Client case study pages

**`/src/data/`** - Configuration and content data:

- Client logos, testimonials, navigation
- Service-specific content and pricing
- Contact forms and landing page data

### Content Management

Content uses Astro's type-safe frontmatter with enhanced SEO fields:

- All content requires: title, description, author, category, tags, pubDate
- Optional: metaTitle, metaDescription, heroImage, status (draft/published)
- Blog posts support FAQ schema and related posts
- Webinars include registration URLs and speaker data

### SEO & Performance System

The site includes a comprehensive SEO system:

- **Link Checker**: Validates all internal/external links (`src/utils/linkChecker.js`)
- **Meta Optimizer**: Ensures optimal meta descriptions (`src/utils/metaDescriptionOptimizer.ts`)
- **SEO Audit**: Automated checks via `npm run seo:audit`
- **Schema Markup**: LocalBusiness, Article, and FAQ structured data
- **Performance**: Image optimization, CSS code-splitting

### Design System

Tailwind configuration includes:

- Custom color palette (primary blues, accent orange, aviation-themed)
- Typography using Merriweather and Noto Sans Lao Variable
- Custom animations (slow-zoom, fade variants)
- Responsive design with mobile-first approach
- Aviation-specific imagery and iconography

### Form Handling & Integrations

- React-based forms with validation (phone, email utilities)
- CRM integration patterns for flight school leads
- Webinar registration and resource download flows
- Contact form routing and confirmation pages

## Important Notes

- **Flight School Focus**: All content and marketing targets aviation/flight training industry
- **Lead Generation**: Heavy emphasis on conversion optimization and lead capture
- **Performance Critical**: Site must load fast due to marketing spend driving traffic
- **SEO Critical**: Organic search is primary traffic source - always run SEO checks
- **Mobile-First**: Flight school prospects often browse on mobile devices
