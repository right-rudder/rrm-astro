import { KEYWORD_STRATEGY } from "../utils/seo.ts";

interface KeywordTrackingData {
  keyword: string;
  category: string;
  targetPage: string;
  currentRank?: number;
  previousRank?: number;
  searchVolume?: number;
  difficulty?: number;
  lastUpdated: Date;
}

interface PerformanceMetrics {
  organicTraffic: number;
  keywordRankings: number;
  conversions: number;
  averagePosition: number;
  clickThroughRate: number;
  impressions: number;
}

class KeywordTracker {
  private keywords: KeywordTrackingData[] = [];

  constructor() {
    this.initializeKeywords();
  }

  private initializeKeywords() {
    // Initialize tracking for all keyword strategy categories
    Object.entries(KEYWORD_STRATEGY).forEach(([category, keywordList]) => {
      if (Array.isArray(keywordList)) {
        keywordList.forEach((keyword) => {
          this.keywords.push({
            keyword,
            category,
            targetPage: this.getTargetPageForKeyword(keyword, category),
            lastUpdated: new Date(),
          });
        });
      } else if (typeof keywordList === "object") {
        // Handle intentTargeting subcategories
        Object.entries(keywordList).forEach(([intent, intentKeywords]) => {
          if (Array.isArray(intentKeywords)) {
            intentKeywords.forEach((keyword) => {
              this.keywords.push({
                keyword,
                category: `${category}-${intent}`,
                targetPage: this.getTargetPageForKeyword(
                  keyword,
                  `${category}-${intent}`,
                ),
                lastUpdated: new Date(),
              });
            });
          }
        });
      }
    });
  }

  private getTargetPageForKeyword(keyword: string, category: string): string {
    // Map keywords to their target pages based on strategy
    const keywordMappings: Record<string, string> = {
      // Service-specific mappings
      "Google Ads flight school marketing": "/flight-school-ppc",
      "Facebook Ads for pilot schools": "/flight-school-ppc",
      "social media management for flight schools":
        "/flight-school-social-media",
      "SEO services for pilot training centers": "/flight-school-seo",
      "flight school website design services": "/web-design",

      // Location-specific mappings
      "flight school marketing California": "/locations/california",
      "pilot school marketing California": "/locations/california",

      // Market segment mappings
      "flight school marketing agency": "/",
      "aviation training center marketing": "/",
      "pilot school digital marketing": "/",

      // Transactional mappings
      "hire flight school marketing agency": "/schedule-call",
      "schedule flight school marketing audit": "/schedule-call",
      "request pilot school SEO proposal": "/contact",
    };

    return keywordMappings[keyword] || this.getDefaultPageForCategory(category);
  }

  private getDefaultPageForCategory(category: string): string {
    const categoryMappings: Record<string, string> = {
      marketSegment: "/",
      customerDefining: "/schedule-call",
      productDefining: "/services",
      serviceSpecific: "/services",
      competitor: "/",
      longTail: "/blog",
      midTail: "/services",
      shortTail: "/",
      "intentTargeting-transactional": "/schedule-call",
      "intentTargeting-navigational": "/",
      "intentTargeting-informational": "/blog",
      lsi: "/blog",
      phraseMatch: "/services",
      exactMatch: "/",
      relatedVertical: "/blog",
      locational: "/locations",
      evergreen: "/blog",
      informational: "/blog",
      transactional: "/schedule-call",
    };

    return categoryMappings[category] || "/";
  }

  public getKeywordsByCategory(category: string): KeywordTrackingData[] {
    return this.keywords.filter((k) => k.category === category);
  }

  public getKeywordsByPage(page: string): KeywordTrackingData[] {
    return this.keywords.filter((k) => k.targetPage === page);
  }

  public updateKeywordRank(keyword: string, newRank: number) {
    const keywordData = this.keywords.find((k) => k.keyword === keyword);
    if (keywordData) {
      keywordData.previousRank = keywordData.currentRank;
      keywordData.currentRank = newRank;
      keywordData.lastUpdated = new Date();
    }
  }

  public generateTrackingReport(): {
    summary: PerformanceMetrics;
    categoryBreakdown: Record<string, any>;
    topMovers: KeywordTrackingData[];
    recommendations: string[];
  } {
    const trackedKeywords = this.keywords.filter(
      (k) => k.currentRank !== undefined,
    );

    const summary: PerformanceMetrics = {
      organicTraffic: 0, // To be populated from analytics
      keywordRankings: trackedKeywords.length,
      conversions: 0, // To be populated from analytics
      averagePosition:
        trackedKeywords.reduce((sum, k) => sum + (k.currentRank || 0), 0) /
        trackedKeywords.length,
      clickThroughRate: 0, // To be populated from Search Console
      impressions: 0, // To be populated from Search Console
    };

    const categoryBreakdown = this.getCategoryBreakdown();
    const topMovers = this.getTopMovers();
    const recommendations = this.generateRecommendations();

    return {
      summary,
      categoryBreakdown,
      topMovers,
      recommendations,
    };
  }

  private getCategoryBreakdown(): Record<string, any> {
    const breakdown: Record<string, any> = {};

    Object.keys(KEYWORD_STRATEGY).forEach((category) => {
      const categoryKeywords = this.getKeywordsByCategory(category);
      const rankedKeywords = categoryKeywords.filter(
        (k) => k.currentRank !== undefined,
      );

      breakdown[category] = {
        totalKeywords: categoryKeywords.length,
        trackedKeywords: rankedKeywords.length,
        averageRank:
          rankedKeywords.length > 0
            ? rankedKeywords.reduce((sum, k) => sum + (k.currentRank || 0), 0) /
              rankedKeywords.length
            : 0,
        top10Keywords: rankedKeywords.filter((k) => (k.currentRank || 0) <= 10)
          .length,
        improvements: rankedKeywords.filter(
          (k) =>
            k.previousRank && k.currentRank && k.currentRank < k.previousRank,
        ).length,
      };
    });

    return breakdown;
  }

  private getTopMovers(): KeywordTrackingData[] {
    return this.keywords
      .filter((k) => k.previousRank && k.currentRank)
      .sort((a, b) => {
        const aMovement = (a.previousRank || 0) - (a.currentRank || 0);
        const bMovement = (b.previousRank || 0) - (b.currentRank || 0);
        return bMovement - aMovement;
      })
      .slice(0, 10);
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const categoryBreakdown = this.getCategoryBreakdown();

    // Analyze each category and provide recommendations
    Object.entries(categoryBreakdown).forEach(
      ([category, data]: [string, any]) => {
        if (data.averageRank > 20) {
          recommendations.push(
            `Focus on ${category} keywords - current average rank is ${data.averageRank.toFixed(1)}`,
          );
        }

        if (data.top10Keywords === 0 && data.trackedKeywords > 0) {
          recommendations.push(
            `No top 10 rankings in ${category} - consider content optimization`,
          );
        }
      },
    );

    // General recommendations based on overall performance
    const totalTracked = this.keywords.filter(
      (k) => k.currentRank !== undefined,
    ).length;
    if (totalTracked < this.keywords.length * 0.5) {
      recommendations.push(
        "Increase keyword tracking coverage - less than 50% of keywords are being monitored",
      );
    }

    return recommendations;
  }

  public exportKeywordList(): string {
    // Export keyword list for Google Search Console or other tools
    return this.keywords.map((k) => k.keyword).join("\n");
  }

  public getKeywordsForGoogleAds(): Record<string, string[]> {
    // Group keywords by match type for Google Ads
    return {
      exact: this.keywords
        .filter(
          (k) =>
            k.category.includes("exact") ||
            k.category.includes("transactional"),
        )
        .map((k) => k.keyword),
      phrase: this.keywords
        .filter(
          (k) =>
            k.category.includes("phrase") ||
            k.category.includes("serviceSpecific"),
        )
        .map((k) => k.keyword),
      broad: this.keywords
        .filter(
          (k) =>
            k.category.includes("shortTail") ||
            k.category.includes("marketSegment"),
        )
        .map((k) => k.keyword),
    };
  }

  public getNegativeKeywords(): string[] {
    return KEYWORD_STRATEGY.negative || [];
  }
}

// Utility functions for integration with analytics
export function initializeKeywordTracking(): KeywordTracker {
  return new KeywordTracker();
}

export function generateMonthlyReport(tracker: KeywordTracker): string {
  const report = tracker.generateTrackingReport();

  return `
# Monthly Keyword Performance Report - ${new Date().toLocaleDateString()}

## Summary
- Keywords Tracked: ${report.summary.keywordRankings}
- Average Position: ${report.summary.averagePosition.toFixed(2)}

## Category Performance
${Object.entries(report.categoryBreakdown)
  .map(
    ([category, data]: [string, any]) => `
### ${category}
- Total Keywords: ${data.totalKeywords}
- Average Rank: ${data.averageRank.toFixed(1)}
- Top 10 Rankings: ${data.top10Keywords}
- Improvements: ${data.improvements}
`,
  )
  .join("")}

## Top Movers
${report.topMovers
  .slice(0, 5)
  .map(
    (keyword) => `
- ${keyword.keyword}: ${keyword.previousRank} → ${keyword.currentRank} (${(keyword.previousRank || 0) - (keyword.currentRank || 0) > 0 ? "+" : ""}${(keyword.previousRank || 0) - (keyword.currentRank || 0)} positions)
`,
  )
  .join("")}

## Recommendations
${report.recommendations.map((rec) => `- ${rec}`).join("\n")}

## Next Steps
1. Focus on underperforming keyword categories
2. Create content targeting informational keywords ranking 11-20
3. Optimize existing pages for transactional keywords
4. Build backlinks to pages targeting competitive keywords
5. Monitor competitor movements in target keywords
  `;
}

export default KeywordTracker;
