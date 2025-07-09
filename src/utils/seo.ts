// SEO utility functions for Right Rudder Marketing

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  author?: string;
  canonical?: string;
  noindex?: boolean;
  ogType?: "website" | "article" | "product" | "profile";
}

export interface LocalBusinessSEO {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  website: string;
  hours?: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

// Core aviation industry keywords for SEO
export const AVIATION_KEYWORDS = {
  primary: [
    "flight school",
    "pilot training",
    "aviation academy",
    "flight training",
    "pilot school",
    "flying lessons",
    "discovery flight",
    "private pilot license",
    "commercial pilot",
    "instrument rating",
    "CFI training",
    "flight instructor",
  ],
  secondary: [
    "aviation marketing",
    "flight school marketing",
    "pilot recruitment",
    "student pilot enrollment",
    "aviation education",
    "professional pilot training",
    "airline pilot training",
    "aviation career",
    "flight training academy",
    "aviation business",
  ],
  local: [
    "flight school near me",
    "pilot training near me",
    "flying lessons near me",
    "aviation school near me",
    "flight instructor near me",
    "discovery flight near me",
  ],
  longTail: [
    "how to become a pilot",
    "flight school cost",
    "pilot training requirements",
    "best flight school",
    "aviation career opportunities",
    "commercial pilot license requirements",
    "private pilot training cost",
    "instrument rating training",
    "flight instructor certification",
  ],
};

// Geographic locations for local SEO targeting
export const TARGET_LOCATIONS = [
  "Kansas City, MO",
  "Boston, MA",
  "Chicago, IL",
  "Tampa, FL",
  "Houston, TX",
  "Charlotte, NC",
  "San Francisco, CA",
  "Indianapolis, IN",
  "Cleveland, OH",
  "Little Rock, AR",
  "Springfield, MO",
  "Columbia, MO",
  "Miami, FL",
  "Orlando, FL",
  "Atlanta, GA",
  "Dallas, TX",
  "Austin, TX",
  "Phoenix, AZ",
  "Los Angeles, CA",
  "Louisville, KY",
  "Memphis, TN",
  "Nashville, TN",
  "St. Louis, MO",
  "Seattle, WA",
  "Denver, CO",
  "Salt Lake City, UT",
  "Portland, OR",
  "Las Vegas, NV",
  "San Diego, CA",
  "Baltimore, MD",
  "Washington, D.C.",
  "Philadelphia, PA",
  "New York, NY",
  "Pittsburgh, PA",
  "Detroit, MI",
  "Milwaukee, WI",
  "Minneapolis, MN",
  "Omaha, NE",
  "Des Moines, IA",
  "Wichita, KS",
  "Tulsa, OK",
  "Oklahoma City, OK",
];

// Generate comprehensive keyword combinations
export function generateKeywords(
  primaryKeywords: string[],
  locations?: string[],
  additionalKeywords?: string[],
): string {
  const keywords = [...primaryKeywords];

  if (locations) {
    primaryKeywords.forEach((keyword) => {
      locations.forEach((location) => {
        keywords.push(`${keyword} ${location}`);
      });
    });
  }

  if (additionalKeywords) {
    keywords.push(...additionalKeywords);
  }

  return keywords.join(", ");
}

// Optimize title for SEO
export function optimizeTitle(
  title: string,
  brandName: string = "Right Rudder Marketing",
): string {
  const maxLength = 60;
  const withBrand = `${title} | ${brandName}`;

  if (withBrand.length <= maxLength) {
    return withBrand;
  }

  // Try without brand if too long
  if (title.length <= maxLength) {
    return title;
  }

  // Truncate if still too long
  return title.substring(0, maxLength - 3) + "...";
}

// Optimize description for SEO
export function optimizeDescription(description: string): string {
  const maxLength = 160;

  if (description.length <= maxLength) {
    return description;
  }

  return description.substring(0, maxLength - 3) + "...";
}

// Generate comprehensive schema markup for flight schools
export function generateFlightSchoolSchema(businessData: LocalBusinessSEO) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
    name: businessData.name,
    description: businessData.description,
    url: businessData.website,
    telephone: businessData.phone,
    email: businessData.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessData.address.street,
      addressLocality: businessData.address.city,
      addressRegion: businessData.address.state,
      postalCode: businessData.address.zip,
      addressCountry: businessData.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    knowsAbout: AVIATION_KEYWORDS.primary,
    sameAs: Object.values(businessData.socialMedia).filter(Boolean),
  };
}

// SEO-friendly URL slugs
export function createSEOSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Meta tag generation helper
export function generateMetaTags(seoData: SEOData): string {
  const tags: string[] = [];

  // Basic meta tags
  tags.push(`<title>${optimizeTitle(seoData.title)}</title>`);
  tags.push(
    `<meta name="description" content="${optimizeDescription(seoData.description)}" />`,
  );
  tags.push(`<meta name="keywords" content="${seoData.keywords}" />`);

  if (seoData.author) {
    tags.push(`<meta name="author" content="${seoData.author}" />`);
  }

  if (seoData.canonical) {
    tags.push(`<link rel="canonical" href="${seoData.canonical}" />`);
  }

  if (seoData.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  } else {
    tags.push(
      `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    );
  }

  return tags.join("\n");
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ schema generator for flight school pages
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
