# MagazinePost Layout Documentation

## Overview

The `MagazinePost` layout is a specialized layout component designed specifically for Flight Deck Magazine articles. It extends the functionality of the standard blog layout with magazine-specific features and branding.

## File Location

`/src/layouts/MagazinePost.astro`

## Key Features

### Magazine-Specific Elements

1. **Magazine Branding**

   - "Flight Deck Magazine" badge at the top
   - "Back to Flight Deck Magazine" navigation link
   - Issue number display (e.g., "Vol 1, Issue 3")
   - Featured article badge for highlighted content

2. **Enhanced Metadata Display**

   - Publication date
   - Issue date (if different from publication date)
   - Last updated date
   - Author information with link to crew profile

3. **Magazine Footer Section**

   - "About Flight Deck Magazine" information box
   - Call-to-action buttons:
     - Browse All Articles
     - Schedule a Consultation

4. **Related Content Section**
   - "More from Flight Deck Magazine" section
   - Integration with BlogFeedRandom component

### Props Interface

```typescript
type Props = CollectionEntry<"magazine">["data"] & {
  enhancedKeywords?: string;
  breadcrumbSchema?: any;
};
```

### Required Fields (from magazine collection)

- `title` - Article title
- `author` - Author name
- `description` - Article description
- `pubDate` - Publication date
- `category` - Content category
- `tags` - Array of tags

### Optional Magazine-Specific Fields

- `issue` - Issue identifier (e.g., "Vol 1, Issue 3")
- `issueDate` - Issue publication date (if different from pubDate)
- `featured` - Boolean to mark as featured article
- `updatedDate` - Last updated date
- `heroImage` - Hero image URL
- `keywords` - SEO keywords
- `enhancedKeywords` - Pre-generated SEO keywords
- `breadcrumbSchema` - Breadcrumb structured data

## Design Features

### Typography & Readability

- **Prose Width**: Max 75ch for optimal readability
- **Line Height**: 1.8 for magazine-quality reading experience
- **Heading Colors**:
  - H2: `#1e3a8a` (primary blue)
  - H3: `#1e40af` (lighter blue)

### Enhanced Styling

```css
/* Pull quotes and callouts */
blockquote {
  border-left-color: #2563eb;
  background-color: #f0f9ff;
  padding: 1.5rem;
  border-radius: 0.5rem;
}
```

### Spacing

- Generous margins between sections
- Enhanced spacing for headings (2.5em top, 1em bottom for H2)
- Comfortable list item spacing (0.5em between items)

## Usage Example

### In a Magazine Article Page

```astro
---
import { type CollectionEntry, getCollection } from "astro:content";
import MagazinePost from "../../layouts/MagazinePost.astro";

const article = Astro.props;
const { Content } = await article.render();
---

<MagazinePost
  {...article.data}
  enhancedKeywords={enhancedKeywords}
  breadcrumbSchema={breadcrumbSchema}
>
  <Content />
</MagazinePost>
```

## SEO Optimization

### Keywords Strategy

The layout automatically generates SEO-optimized keywords:

```typescript
const finalKeywords =
  enhancedKeywords ||
  `${category}, ${tags.join(", ")}, flight deck magazine, aviation magazine, flight school magazine, aviation marketing insights${keywords ? ", " + keywords : ""}`;
```

### Meta Information

- **Title Format**: `{Article Title} | Flight Deck Magazine`
- **Description**: `{Article Description} Read more aviation marketing insights in Flight Deck Magazine by Right Rudder Marketing.`
- **Schema Support**: Article schema, breadcrumb schema, and periodical schema

## Component Integrations

### AuthorCard

Displays author information at the end of the article:

- Author name
- Photo
- Bio
- Social links

### BlogFeedRandom

Shows related magazine articles in the "More from Flight Deck Magazine" section.

## Visual Elements

### Header Section

- Primary blue gradient bar at top
- Magazine badge and navigation
- Issue number and featured badge display
- Hero image with shadow effect

### Content Section

- White background for content
- Enhanced prose styling
- Proper image handling with shadows
- Responsive padding and margins

### Footer Section

- Gradient background (primary-50 to blue-50)
- Rounded corners with shadow
- Clear CTAs with hover states
- Magazine description

## Differences from BlogPost Layout

| Feature             | BlogPost                      | MagazinePost                             |
| ------------------- | ----------------------------- | ---------------------------------------- |
| **Branding**        | "Right Rudder Marketing Blog" | "Flight Deck Magazine"                   |
| **Navigation**      | Blog index link               | Magazine index link with back arrow      |
| **Issue Display**   | N/A                           | Issue number and date                    |
| **Featured Badge**  | N/A                           | Featured article indicator               |
| **Footer CTA**      | Generic blog CTA              | Magazine-specific CTA with description   |
| **Related Content** | BlogFeedRandom                | "More from Flight Deck Magazine" section |
| **Prose Width**     | Standard                      | 75ch for magazine-style                  |
| **Line Height**     | 1.625                         | 1.8 for better readability               |
| **Color Scheme**    | Standard                      | Enhanced blues for magazine feel         |

## Responsive Design

### Mobile Considerations

- Stacked layout on small screens
- Touch-friendly button sizes
- Responsive typography scaling
- Optimized image loading

### Tablet & Desktop

- Wider content area (max 4xl)
- Side-by-side CTAs
- Enhanced hover effects
- Optimized image display

## Accessibility Features

- Semantic HTML structure
- ARIA labels where appropriate
- Focus visible states on interactive elements
- Sufficient color contrast
- Alt text support for images

## Performance Optimizations

- Lazy loading for images via Astro Image component
- CSS scoped to component
- Minimal JavaScript usage
- Optimized prose styling

## Future Enhancements

Potential additions for future versions:

1. **Related Articles Logic**

   - Automatic related article recommendations based on tags/category
   - Manual related article selection

2. **Social Sharing**

   - Share buttons for social media platforms
   - Copy link functionality

3. **Reading Progress Indicator**

   - Visual indicator of reading progress

4. **Print Styles**

   - Optimized print stylesheet for magazine articles

5. **Table of Contents**

   - Auto-generated TOC for longer articles
   - Sticky navigation on scroll

6. **Author Subscription**
   - "Follow this author" functionality
   - Author-specific article feeds

## Testing Checklist

When using or modifying the MagazinePost layout:

- [ ] Verify all magazine-specific fields display correctly
- [ ] Check issue number and date formatting
- [ ] Test featured badge visibility
- [ ] Validate back navigation link
- [ ] Confirm author card displays
- [ ] Check responsive behavior on mobile/tablet/desktop
- [ ] Verify SEO metadata generation
- [ ] Test schema markup validation
- [ ] Check image optimization and loading
- [ ] Validate CTA buttons and links
- [ ] Test with draft and published articles
- [ ] Verify breadcrumb navigation

## Maintenance Notes

### When to Update

- When magazine branding changes
- When adding new magazine-specific features
- When SEO requirements change
- When design system updates occur

### Related Files

- `/src/content/config.ts` - Magazine collection schema
- `/src/pages/flight-deck/[...slug].astro` - Magazine article page
- `/src/pages/flight-deck/index.astro` - Magazine index page
- `/src/layouts/BaseLayout.astro` - Parent layout
- `/src/components/AuthorCard.astro` - Author component
- `/src/components/BlogFeedRandom.astro` - Related articles component

## Support

For questions or issues with the MagazinePost layout:

1. Check the magazine collection schema in `config.ts`
2. Review the BlogPost layout for comparison
3. Test with sample magazine articles
4. Validate schema markup with Google's Rich Results Test
5. Check browser console for errors

---

**Created**: October 13, 2025  
**Last Updated**: October 13, 2025  
**Version**: 1.0.0
