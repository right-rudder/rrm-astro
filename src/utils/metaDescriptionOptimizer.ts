// Meta Description Enhancement Utility
// Automatically generates and validates meta descriptions for better SEO

import { AVIATION_KEYWORDS, TARGET_LOCATIONS } from "./seo";

interface MetaDescriptionConfig {
  content: string;
  category?: string;
  location?: string;
  keywords?: string[];
  maxLength?: number;
  minLength?: number;
}

class MetaDescriptionOptimizer {
  private readonly MAX_LENGTH = 160;
  private readonly MIN_LENGTH = 120;
  private readonly IDEAL_LENGTH = 155;

  constructor() {}

  // Generate dynamic meta descriptions for different page types
  generateDescription(config: MetaDescriptionConfig): string {
    const {
      content,
      category = "",
      location = "St. Louis",
      keywords = [],
      maxLength = this.MAX_LENGTH,
      minLength = this.MIN_LENGTH,
    } = config;

    let description = content;

    // Add location context for local SEO
    if (!description.toLowerCase().includes(location.toLowerCase())) {
      description = this.addLocation(description, location);
    }

    // Add relevant keywords if not present
    description = this.enhanceWithKeywords(description, keywords, category);

    // Add call-to-action if space allows
    description = this.addCallToAction(description, category);

    // Optimize length
    description = this.optimizeLength(description, maxLength, minLength);

    return description;
  }

  private addLocation(description: string, location: string): string {
    // Common patterns for adding location context
    const locationPhrases = [
      `in ${location}`,
      `${location} area`,
      `serving ${location}`,
      `based in ${location}`,
    ];

    // Find best insertion point
    if (description.includes("flight school")) {
      return description.replace(
        /flight school/i,
        `flight school in ${location}`,
      );
    }

    if (description.includes("aviation")) {
      return description.replace(/aviation/i, `${location} aviation`);
    }

    // Append if no good insertion point
    return `${description} Serving ${location} and surrounding areas.`;
  }

  private enhanceWithKeywords(
    description: string,
    keywords: string[],
    category: string,
  ): string {
    let enhanced = description;

    // Get relevant keywords based on category
    const categoryKeywords = this.getCategoryKeywords(category);
    const allKeywords = [...keywords, ...categoryKeywords];

    // Add important keywords if not present
    for (const keyword of allKeywords.slice(0, 3)) {
      if (!enhanced.toLowerCase().includes(keyword.toLowerCase())) {
        // Try to naturally integrate keywords
        enhanced = this.integrateKeyword(enhanced, keyword);
      }
    }

    return enhanced;
  }

  private getCategoryKeywords(category: string): string[] {
    const keywordMap: Record<string, string[]> = {
      services: [
        "flight school marketing",
        "aviation SEO",
        "pilot training marketing",
      ],
      blog: [
        "aviation marketing tips",
        "flight school growth",
        "marketing insights",
      ],
      resources: [
        "marketing checklist",
        "free resources",
        "flight school tools",
      ],
      about: [
        "marketing team",
        "aviation experts",
        "flight school specialists",
      ],
      contact: [
        "marketing consultation",
        "flight school help",
        "aviation marketing support",
      ],
    };

    return keywordMap[category] || AVIATION_KEYWORDS.secondary.slice(0, 3);
  }

  private integrateKeyword(description: string, keyword: string): string {
    // Smart keyword integration without keyword stuffing
    const sentences = description.split(". ");

    if (sentences.length > 1 && sentences[0].length < 60) {
      // Add to first sentence if it's short
      sentences[0] = `${sentences[0]} with ${keyword}`;
    } else {
      // Add as new sentence
      sentences.push(`Specialized in ${keyword}.`);
    }

    return sentences.join(". ");
  }

  private addCallToAction(description: string, category: string): string {
    const ctas: Record<string, string> = {
      services: "Contact us today to grow your flight school.",
      resources: "Download our free resources to get started.",
      blog: "Read more aviation marketing insights.",
      contact: "Get your free consultation today.",
      about: "Learn how we can help your flight school grow.",
      default: "Contact Right Rudder Marketing today.",
    };

    const cta = ctas[category] || ctas.default;

    // Only add CTA if there's room
    if ((description + " " + cta).length <= this.MAX_LENGTH) {
      return `${description} ${cta}`;
    }

    return description;
  }

  private optimizeLength(
    description: string,
    maxLength: number,
    minLength: number,
  ): string {
    // If too long, trim intelligently
    if (description.length > maxLength) {
      return this.trimToLength(description, maxLength);
    }

    // If too short, expand if possible
    if (description.length < minLength) {
      return this.expandDescription(description, minLength);
    }

    return description;
  }

  private trimToLength(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description;

    // Try to trim at sentence boundary
    const sentences = description.split(". ");
    let trimmed = "";

    for (const sentence of sentences) {
      const candidate = trimmed + (trimmed ? ". " : "") + sentence;
      if (candidate.length + 1 <= maxLength) {
        // +1 for potential period
        trimmed = candidate;
      } else {
        break;
      }
    }

    // If we have a good sentence boundary, use it
    if (trimmed.length >= maxLength * 0.8) {
      return trimmed + ".";
    }

    // Otherwise, trim at word boundary
    const words = description.split(" ");
    trimmed = "";

    for (const word of words) {
      const candidate = trimmed + (trimmed ? " " : "") + word;
      if (candidate.length + 3 <= maxLength) {
        // +3 for "..."
        trimmed = candidate;
      } else {
        break;
      }
    }

    return trimmed + "...";
  }

  private expandDescription(description: string, minLength: number): string {
    if (description.length >= minLength) return description;

    // Add common aviation business benefits
    const expansions = [
      "Increase student enrollment and retention.",
      "Improve your online visibility and reputation.",
      "Generate more qualified leads for your flight school.",
      "Build a stronger aviation brand presence.",
      "Optimize your marketing ROI and growth.",
    ];

    let expanded = description;

    for (const expansion of expansions) {
      const candidate = `${expanded} ${expansion}`;
      if (
        candidate.length <= this.MAX_LENGTH &&
        candidate.length >= minLength
      ) {
        return candidate;
      }
      if (candidate.length < this.MAX_LENGTH) {
        expanded = candidate;
      }
    }

    return expanded;
  }

  // Validate existing meta descriptions
  validateDescription(description: string): {
    isValid: boolean;
    score: number;
    issues: string[];
    suggestions: string[];
  } {
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Length validation
    if (description.length < this.MIN_LENGTH) {
      issues.push(
        `Description too short (${description.length} chars, minimum ${this.MIN_LENGTH})`,
      );
      suggestions.push("Add more detail about your services and location");
      score -= 30;
    }

    if (description.length > this.MAX_LENGTH) {
      issues.push(
        `Description too long (${description.length} chars, maximum ${this.MAX_LENGTH})`,
      );
      suggestions.push("Trim description to focus on key benefits");
      score -= 20;
    }

    // Content validation
    if (!this.hasLocation(description)) {
      issues.push("Missing location information");
      suggestions.push("Add location context for local SEO");
      score -= 15;
    }

    if (!this.hasCallToAction(description)) {
      suggestions.push("Consider adding a call-to-action");
      score -= 10;
    }

    if (!this.hasKeywords(description)) {
      issues.push("Missing relevant aviation keywords");
      suggestions.push("Include relevant flight school or aviation keywords");
      score -= 20;
    }

    // Quality checks
    if (this.hasKeywordStuffing(description)) {
      issues.push("Potential keyword stuffing detected");
      suggestions.push("Use keywords more naturally");
      score -= 25;
    }

    return {
      isValid: issues.length === 0,
      score: Math.max(0, score),
      issues,
      suggestions,
    };
  }

  private hasLocation(description: string): boolean {
    const locations = TARGET_LOCATIONS.slice(0, 5); // Check top 5 locations
    return locations.some((location) =>
      description.toLowerCase().includes(location.toLowerCase()),
    );
  }

  private hasCallToAction(description: string): boolean {
    const ctaPatterns = [
      /contact/i,
      /call/i,
      /learn more/i,
      /discover/i,
      /get/i,
      /download/i,
      /visit/i,
      /schedule/i,
      /book/i,
      /start/i,
    ];

    return ctaPatterns.some((pattern) => pattern.test(description));
  }

  private hasKeywords(description: string): boolean {
    const keywords = [
      ...AVIATION_KEYWORDS.primary.slice(0, 5),
      ...AVIATION_KEYWORDS.secondary.slice(0, 3),
    ];

    return keywords.some((keyword) =>
      description.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  private hasKeywordStuffing(description: string): boolean {
    const words = description.toLowerCase().split(/\s+/);
    const wordCounts: Record<string, number> = {};

    // Count word frequency
    words.forEach((word) => {
      if (word.length > 4) {
        // Only check meaningful words
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    // Check if any word appears too frequently
    const totalWords = words.length;
    return Object.values(wordCounts).some(
      (count) => count / totalWords > 0.1 && count > 2,
    );
  }

  // Generate descriptions for common page types
  generateForPageType(pageType: string, customContent?: string): string {
    const templates: Record<string, MetaDescriptionConfig> = {
      homepage: {
        content:
          "Right Rudder Marketing specializes in flight school marketing and aviation digital marketing services. We help flight schools increase student enrollment and grow their business.",
        category: "services",
        keywords: [
          "flight school marketing",
          "aviation marketing",
          "pilot training",
        ],
      },

      services: {
        content:
          "Comprehensive flight school marketing services including SEO, web design, PPC advertising, and social media marketing. Proven strategies to grow your aviation business.",
        category: "services",
        keywords: [
          "marketing services",
          "flight school SEO",
          "aviation advertising",
        ],
      },

      blog: {
        content:
          customContent ||
          "Latest aviation marketing insights, flight school growth strategies, and industry best practices. Expert tips to help your flight school succeed.",
        category: "blog",
        keywords: [
          "aviation marketing tips",
          "flight school growth",
          "marketing strategies",
        ],
      },

      resources: {
        content:
          "Free flight school marketing resources including checklists, guides, and templates. Download proven tools to grow your aviation business.",
        category: "resources",
        keywords: ["marketing resources", "flight school tools", "free guides"],
      },

      contact: {
        content:
          "Contact Right Rudder Marketing for expert flight school marketing services. Get your free consultation and start growing your aviation business today.",
        category: "contact",
        keywords: [
          "marketing consultation",
          "flight school help",
          "aviation marketing experts",
        ],
      },
    };

    const template = templates[pageType] || templates.homepage;
    return this.generateDescription(template);
  }
}

// Export the optimizer and utility functions
export const metaDescriptionOptimizer = new MetaDescriptionOptimizer();

export function optimizeMetaDescription(config: MetaDescriptionConfig): string {
  return metaDescriptionOptimizer.generateDescription(config);
}

export function validateMetaDescription(description: string) {
  return metaDescriptionOptimizer.validateDescription(description);
}

export function generatePageMetaDescription(
  pageType: string,
  customContent?: string,
): string {
  return metaDescriptionOptimizer.generateForPageType(pageType, customContent);
}
