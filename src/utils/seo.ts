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

// Enhanced keyword strategy based on comprehensive research
export const KEYWORD_STRATEGY = {
  // 1. Market-Segment Keywords
  marketSegment: [
    "flight school marketing agency",
    "aviation training center marketing",
    "pilot school digital marketing",
  ],

  // 2. Customer-Defining Keywords
  customerDefining: [
    "flight school owner marketing services",
    "flight school director advertising solutions",
    "pilot training center growth marketing",
  ],

  // 3. Product-Defining Keywords
  productDefining: [
    "social media management for flight schools",
    "SEO services for pilot training centers",
    "PPC advertising for aviation schools",
    "flight school website design services",
    "aviation content marketing services",
  ],

  // 4. Service-Specific Keywords
  serviceSpecific: [
    "Google Ads flight school marketing",
    "Facebook Ads for pilot schools",
    "flight school CRM integration",
    "aviation social media advertising",
    "flight school lead generation systems",
  ],

  // 5. Competitor Keywords
  competitor: [
    "Right Rudder Marketing",
    "FlightSchool.Marketing alternative",
    "AeroEnroll Pros marketing comparison",
    "flight school marketing agencies",
  ],

  // 6. Long-Tail Keywords
  longTail: [
    "how to increase flight school enrollment",
    "best digital marketing for flight schools",
    "flight school website design and SEO tips",
    "aviation marketing strategies that work",
    "pilot training marketing best practices",
  ],

  // 7. Mid-Tail Keywords
  midTail: [
    "flight school SEO services",
    "pilot school advertising",
    "aviation marketing strategies",
    "flight training digital marketing",
  ],

  // 8. Short-Tail Keywords
  shortTail: [
    "flight school marketing",
    "pilot training marketing",
    "aviation advertising",
    "aviation marketing",
  ],

  // 9. Intent-Targeting Keywords
  intentTargeting: {
    transactional: [
      "hire flight school marketing agency",
      "schedule flight school marketing audit",
      "request pilot school SEO proposal",
      "book a flight school strategy session",
    ],
    navigational: [
      "Right Rudder Marketing contact",
      "Right Rudder Marketing services",
      "Right Rudder Marketing reviews",
    ],
    informational: [
      "flight school marketing tips",
      "aviation marketing guide",
      "pilot school advertising strategies",
    ],
  },

  // 10. LSI Keywords
  lsi: [
    "pilot enrollment funnel optimization",
    "flight instructor lead generation",
    "flight training customer journey",
    "aviation student retention strategies",
    "discovery flight conversion optimization",
  ],

  // 11. Phrase-Match & Exact-Match Keywords
  phraseMatch: [
    "flight school digital marketing",
    "aviation marketing agency",
    "pilot training SEO",
  ],
  exactMatch: [
    "flight school marketing agency",
    "aviation digital marketing",
    "pilot school advertising",
  ],

  // 12. Negative Keywords (for PPC exclusion)
  negative: [
    "commercial pilot job postings",
    "flight attendant training programs",
    "drone certification courses",
    "airline pilot jobs",
    "aircraft maintenance training",
  ],

  // 13. Related Vertical Keywords
  relatedVertical: [
    "FAA compliance marketing",
    "aviation trade show promotion",
    "flight expo advertising",
    "aviation industry conferences",
    "pilot association marketing",
  ],

  // 14. Locational Keywords
  locational: [
    "flight school marketing USA",
    "pilot school marketing California",
    "aviation school advertising Texas",
    "flight training marketing Florida",
    "pilot school SEO nationwide",
  ],

  // 15. Long-Term Evergreen Keywords
  evergreen: [
    "flight school branding strategies",
    "aviation school digital transformation",
    "pilot training center marketing trends",
    "flight school business growth",
    "aviation marketing ROI optimization",
  ],

  // 16. Informational Keywords
  informational: [
    "what is flight school marketing",
    "how does flight school SEO work",
    "benefits of PPC for flight schools",
    "aviation marketing vs traditional marketing",
    "flight school lead generation explained",
  ],

  // 17. Transactional Keywords
  transactional: [
    "schedule flight school marketing audit",
    "request pilot school SEO proposal",
    "book a flight school strategy session",
    "hire aviation marketing consultant",
    "get flight school marketing quote",
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

// Enhanced keyword strategy utilities
export function getKeywordsByCategory(category: string): string[] {
  const strategy = KEYWORD_STRATEGY as any;
  if (category === "intentTargeting") {
    return [
      ...strategy.intentTargeting.transactional,
      ...strategy.intentTargeting.navigational,
      ...strategy.intentTargeting.informational,
    ];
  }
  return strategy[category] || [];
}

export function getKeywordsByIntent(
  intent: "transactional" | "navigational" | "informational",
): string[] {
  return KEYWORD_STRATEGY.intentTargeting[intent] || [];
}

export function generateServicePageKeywords(
  serviceType: string,
  location?: string,
): string {
  const baseKeywords = [
    ...KEYWORD_STRATEGY.serviceSpecific,
    ...KEYWORD_STRATEGY.productDefining,
    ...AVIATION_KEYWORDS.primary.slice(0, 3),
  ];

  if (location) {
    const locationKeywords = baseKeywords.map(
      (keyword) => `${keyword} ${location}`,
    );
    return [...baseKeywords, ...locationKeywords].join(", ");
  }

  return baseKeywords.join(", ");
}

export function generateLandingPageKeywords(
  pageType: "service" | "location" | "industry",
  focus: string,
): string {
  let keywords: string[] = [];

  switch (pageType) {
    case "service":
      keywords = [
        ...KEYWORD_STRATEGY.transactional,
        ...KEYWORD_STRATEGY.serviceSpecific,
        ...KEYWORD_STRATEGY.productDefining.filter((k) => k.includes(focus)),
      ];
      break;
    case "location":
      keywords = [
        ...KEYWORD_STRATEGY.locational.filter((k) => k.includes(focus)),
        ...AVIATION_KEYWORDS.local,
        ...TARGET_LOCATIONS.filter((loc) => loc.includes(focus)).map(
          (loc) => `flight school marketing ${loc}`,
        ),
      ];
      break;
    case "industry":
      keywords = [
        ...KEYWORD_STRATEGY.evergreen,
        ...KEYWORD_STRATEGY.relatedVertical,
        ...AVIATION_KEYWORDS.secondary,
      ];
      break;
  }

  return keywords.slice(0, 15).join(", "); // Limit to 15 keywords for optimal performance
}

export function generateBlogKeywords(topic: string): string {
  const baseKeywords = [
    ...KEYWORD_STRATEGY.informational,
    ...KEYWORD_STRATEGY.longTail,
    ...KEYWORD_STRATEGY.lsi,
  ];

  // Filter keywords that relate to the topic
  const relevantKeywords = baseKeywords.filter(
    (keyword) =>
      keyword.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(keyword.split(" ")[0]),
  );

  return [...relevantKeywords, ...AVIATION_KEYWORDS.longTail.slice(0, 5)].join(
    ", ",
  );
}

export function generateCompetitorPageKeywords(): string {
  return [
    ...KEYWORD_STRATEGY.competitor,
    ...KEYWORD_STRATEGY.marketSegment,
    "flight school marketing comparison",
    "best aviation marketing agency",
    "Right Rudder Marketing vs competitors",
  ].join(", ");
}

export function validateKeywordDensity(
  content: string,
  targetKeyword: string,
): {
  density: number;
  count: number;
  isOptimal: boolean;
  suggestions: string[];
} {
  const words = content.toLowerCase().split(/\s+/).length;
  const keyword = targetKeyword.toLowerCase();
  const keywordCount = (
    content.toLowerCase().match(new RegExp(keyword, "g")) || []
  ).length;
  const density = (keywordCount / words) * 100;

  const suggestions: string[] = [];
  const isOptimal = density >= 0.5 && density <= 2.5;

  if (density < 0.5) {
    suggestions.push(
      `Increase keyword usage. Current: ${density.toFixed(2)}%, target: 0.5-2.5%`,
    );
  } else if (density > 2.5) {
    suggestions.push(
      `Reduce keyword usage to avoid over-optimization. Current: ${density.toFixed(2)}%`,
    );
  }

  return {
    density: Number(density.toFixed(2)),
    count: keywordCount,
    isOptimal,
    suggestions,
  };
}

export function generateMetaDescription(
  pageType: "service" | "blog" | "location" | "homepage",
  primaryKeyword: string,
  customContent?: string,
  location?: string,
): string {
  const templates = {
    service: `Expert ${primaryKeyword} services from Right Rudder Marketing. Increase enrollment and grow your flight school with proven aviation marketing strategies. Get your free consultation today.`,
    blog: `${customContent || `Learn about ${primaryKeyword} with expert insights from Right Rudder Marketing.`} Proven strategies to help flight schools increase student enrollment and business growth.`,
    location: `Professional ${primaryKeyword} in ${location || "your area"}. Right Rudder Marketing specializes in helping flight schools grow with targeted digital marketing strategies.`,
    homepage: `Right Rudder Marketing - The leading ${primaryKeyword} agency. We help flight schools increase student enrollment and revenue with proven aviation marketing strategies.`,
  };

  let description = templates[pageType] || templates.homepage;

  // Ensure description is within optimal length
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
}
