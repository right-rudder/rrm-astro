# Right Rudder Marketing - AI Coding Instructions

## Project Overview

Aviation marketing agency website built on **Astro 5.8+** with React integration. Focuses on flight school lead generation with advanced SEO optimization and content management systems.

## Essential Development Workflow

### Primary Commands

```bash
npm run dev              # Development server
npm run seo:optimize     # Required before deployment - runs audit + build
npm run seo:audit        # Comprehensive SEO validation
npm run seo:links        # Internal/external link health check
npm run build:preview    # Include draft content in build
```

**Critical**: Always run `npm run seo:optimize` before deploying. This ensures SEO compliance and catches broken links.

## Architecture Patterns

### Content Collections (`/src/content/`)

Type-safe content with Zod schemas in `config.ts`. All content requires:

- Standard fields: `title`, `description`, `author`, `category`, `tags`, `pubDate`
- SEO fields: `metaTitle`, `metaDescription`, `status` (draft/published)
- Optional: `heroImage`, `canonicalUrl`, `relatedPosts`, `faq` (for schema markup)

### SEO System Architecture

**Two-tier optimization system:**

1. **Real-time optimization** (`src/utils/seo.ts`): `optimizeTitle()`, `optimizeDescription()`, schema generators
2. **Validation & enhancement** (`src/utils/metaDescriptionOptimizer.ts`): Advanced meta description generation with location/keyword integration

**Example usage:**

```astro
---
import { optimizeTitle, generateFlightSchoolSchema } from "../utils/seo";
const optimizedTitle = optimizeTitle(frontmatter.title);
---
```

### Component Patterns

- **Layout hierarchy**: `BaseLayout.astro` → specialized layouts (`BlogPost.astro`, `WebinarPost.astro`)
- **React islands**: Interactive components (`Navbar.jsx`, `Counter.jsx`) with `.jsx` extension
- **Astro components**: Static/SSG components with `.astro` extension
- **SEO components**: `BaseHead.astro`, `Schema.astro`, `LocalBusinessSchema.astro`

### Design System (`tailwind.config.mjs`)

Aviation-themed color palette with custom:

- Primary blues (`primary-50` to `primary-950`)
- Accent orange (`accent-50` to `accent-900`)
- Custom animations (`slow-zoom`, fade variants)
- Typography: Merriweather (serif), Noto Sans Lao Variable (sans)

## Critical Development Patterns

### Content Management

- **Draft workflow**: Use `status: "draft"` in frontmatter, preview with `npm run build:preview`
- **SEO validation**: Meta descriptions auto-validated for length (120-160 chars), keywords, CTAs
- **Link integrity**: Automated checking in `src/utils/linkChecker.js`

### File Organization

- **Pages**: Dynamic routes use `[...slug].astro` for content collections
- **Data**: Configuration in `/src/data/` (navigation, testimonials, services)
- **Assets**: Images in `/public/` with optimized WebP formats
- **Scripts**: Maintenance utilities in `/scripts/` (SEO audit, performance monitoring)

### SEO-First Development

- **Schema markup**: Use `generateFlightSchoolSchema()`, `generateFAQSchema()` for structured data
- **Meta optimization**: Leverage `metaDescriptionOptimizer` for location-aware, keyword-optimized descriptions
- **Performance**: Image optimization required, CSS code-splitting enabled

### Industry-Specific Conventions

- **Target audience**: Flight school owners/directors (B2B focus)
- **Keywords**: Aviation training, flight school marketing, pilot recruitment
- **Geographic targeting**: Primary focus on US markets with local SEO patterns
- **CTA patterns**: "Contact us today", "Get free consultation", "Download resources"

## Integration Points

- **CRM**: Integration patterns for flight school leads in form components
- **Analytics**: GoogleAnalytics.astro, FacebookPixel.astro components
- **External services**: Webinar registration URLs, resource downloads
- **Monitoring**: Built-in SEO audit system with actionable reporting

## Testing & Quality Assurance

Use the comprehensive audit system:

```bash
npm run seo:audit        # Generates detailed SEO report with scores
npm run check:links      # Validates all internal/external links
```

Reports saved to `SEO_AUDIT_SUMMARY.md` and `LINK_AUDIT_REPORT.json` with specific recommendations.
