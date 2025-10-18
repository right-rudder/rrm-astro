# How to Use the Keyword Tracker System

## Overview

The keyword tracker system for Right Rudder Marketing automatically monitors and reports on all 17 keyword categories from your comprehensive strategy. It tracks rankings, provides insights, and generates actionable recommendations.

## Getting Started

### 1. Initialize the Keyword Tracker

```typescript
import {
  initializeKeywordTracking,
  generateMonthlyReport,
} from "../utils/keywordTracker";

// Create a new tracker instance
const tracker = initializeKeywordTracking();
```

The tracker automatically loads all keywords from your 17-category strategy:

- Market-Segment Keywords
- Customer-Defining Keywords
- Product-Defining Keywords
- Service-Specific Keywords
- Transactional Keywords
- Locational Keywords
- And 11 more categories...

### 2. Basic Usage Examples

#### Get Keywords by Category

```typescript
// Get all market-segment keywords
const marketKeywords = tracker.getKeywordsByCategory("marketSegment");
console.log(marketKeywords);

// Get all transactional keywords
const transactionalKeywords = tracker.getKeywordsByCategory("transactional");
```

#### Get Keywords by Target Page

```typescript
// See which keywords target your homepage
const homepageKeywords = tracker.getKeywordsByPage("/");

// See which keywords target your PPC service page
const ppcKeywords = tracker.getKeywordsByPage("/flight-school-ppc");
```

#### Update Keyword Rankings

```typescript
// Update a keyword's ranking (from rank tracking tools)
tracker.updateKeywordRank("flight school marketing agency", 3);
tracker.updateKeywordRank("Google Ads flight school marketing", 7);
tracker.updateKeywordRank("flight school marketing California", 12);
```

## Data Sources Integration

### Google Search Console Integration

```typescript
// Example function to import Search Console data
async function updateRankingsFromSearchConsole() {
  const tracker = initializeKeywordTracking();

  // Get Search Console data (pseudo-code)
  const searchConsoleData = await getSearchConsoleData();

  searchConsoleData.forEach((item) => {
    if (item.position && item.query) {
      tracker.updateKeywordRank(item.query, Math.round(item.position));
    }
  });

  return tracker;
}
```

### SEMrush/Ahrefs Integration

```typescript
// Example function to import from SEO tools
async function updateRankingsFromSEOTool() {
  const tracker = initializeKeywordTracking();

  // Get ranking data from your SEO tool
  const rankingData = await getSEOToolData();

  rankingData.forEach((keyword) => {
    tracker.updateKeywordRank(keyword.term, keyword.position);
  });

  return tracker;
}
```

## Generating Reports

### Monthly Performance Report

```typescript
const tracker = initializeKeywordTracking();

// Update some rankings first
tracker.updateKeywordRank("flight school marketing agency", 2);
tracker.updateKeywordRank("pilot school digital marketing", 5);
tracker.updateKeywordRank("social media management for flight schools", 8);

// Generate comprehensive monthly report
const monthlyReport = generateMonthlyReport(tracker);
console.log(monthlyReport);

// Save report to file
import fs from "fs";
fs.writeFileSync(
  `keyword-report-${new Date().getMonth() + 1}-${new Date().getFullYear()}.md`,
  monthlyReport,
);
```

### Custom Analytics Reports

```typescript
const tracker = initializeKeywordTracking();
const report = tracker.generateTrackingReport();

// Access specific data
console.log("Total keywords tracked:", report.summary.keywordRankings);
console.log("Average position:", report.summary.averagePosition);
console.log("Category breakdown:", report.categoryBreakdown);
console.log("Top movers:", report.topMovers);
console.log("Recommendations:", report.recommendations);
```

## PPC Campaign Setup

### Export Keywords for Google Ads

```typescript
const tracker = initializeKeywordTracking();

// Get keywords organized by match type
const adKeywords = tracker.getKeywordsForGoogleAds();

console.log("Exact match keywords:", adKeywords.exact);
console.log("Phrase match keywords:", adKeywords.phrase);
console.log("Broad match keywords:", adKeywords.broad);

// Get negative keywords to prevent irrelevant clicks
const negativeKeywords = tracker.getNegativeKeywords();
console.log("Negative keywords:", negativeKeywords);
```

### Create Ad Groups by Category

```typescript
const tracker = initializeKeywordTracking();

// Create service-specific ad groups
const serviceKeywords = tracker.getKeywordsByCategory("serviceSpecific");
const ppcKeywords = serviceKeywords.filter(
  (k) => k.keyword.includes("PPC") || k.keyword.includes("Google Ads"),
);

// Create location-based ad groups
const locationKeywords = tracker.getKeywordsByCategory("locational");
const californiaKeywords = locationKeywords.filter((k) =>
  k.keyword.includes("California"),
);
```

## Monitoring & Alerts

### Set Up Ranking Alerts

```typescript
function checkRankingChanges(tracker: KeywordTracker) {
  const report = tracker.generateTrackingReport();

  // Alert for significant ranking drops
  const rankingDrops = report.topMovers.filter((keyword) => {
    const movement = (keyword.previousRank || 0) - (keyword.currentRank || 0);
    return movement < -5; // Dropped more than 5 positions
  });

  if (rankingDrops.length > 0) {
    console.log("⚠️ Ranking Alerts:");
    rankingDrops.forEach((keyword) => {
      console.log(
        `${keyword.keyword}: Dropped from ${keyword.previousRank} to ${keyword.currentRank}`,
      );
    });
  }

  // Alert for new top 10 rankings
  const newTop10 = report.topMovers.filter((keyword) => {
    return (
      keyword.currentRank &&
      keyword.currentRank <= 10 &&
      keyword.previousRank &&
      keyword.previousRank > 10
    );
  });

  if (newTop10.length > 0) {
    console.log("🎉 New Top 10 Rankings:");
    newTop10.forEach((keyword) => {
      console.log(`${keyword.keyword}: Now ranking #${keyword.currentRank}`);
    });
  }
}
```

## Practical Usage Scenarios

### Scenario 1: Weekly Ranking Updates

```typescript
// Weekly ranking update routine
async function weeklyRankingUpdate() {
  const tracker = initializeKeywordTracking();

  // Get current rankings from your preferred tool
  const rankings = await getCurrentRankings();

  // Update all rankings
  rankings.forEach(({ keyword, position }) => {
    tracker.updateKeywordRank(keyword, position);
  });

  // Generate and save report
  const report = generateMonthlyReport(tracker);

  // Email report to team (pseudo-code)
  await emailReport(report);

  return tracker;
}
```

### Scenario 2: Content Planning

```typescript
// Find keywords that need content
function findContentOpportunities(tracker: KeywordTracker) {
  const informationalKeywords = tracker.getKeywordsByCategory("informational");
  const longTailKeywords = tracker.getKeywordsByCategory("longTail");

  // Find keywords ranking 11-20 (good content opportunities)
  const contentOpportunities = [
    ...informationalKeywords,
    ...longTailKeywords,
  ].filter((k) => k.currentRank && k.currentRank >= 11 && k.currentRank <= 20);

  console.log("Content opportunities (ranking 11-20):");
  contentOpportunities.forEach((k) => {
    console.log(
      `- ${k.keyword} (Rank ${k.currentRank}) -> Target page: ${k.targetPage}`,
    );
  });

  return contentOpportunities;
}
```

### Scenario 3: Competitive Analysis

```typescript
// Track competitor keywords
function trackCompetitorKeywords(tracker: KeywordTracker) {
  const competitorKeywords = tracker.getKeywordsByCategory("competitor");

  // Focus on brand and comparison keywords
  competitorKeywords.forEach((keyword) => {
    if (keyword.currentRank && keyword.currentRank > 3) {
      console.log(
        `⚠️ Competitor opportunity: "${keyword.keyword}" ranking #${keyword.currentRank}`,
      );
    }
  });
}
```

## Export Functions

### Export for External Tools

```typescript
const tracker = initializeKeywordTracking();

// Export keyword list for rank tracking tools
const keywordList = tracker.exportKeywordList();
console.log("Keywords for rank tracking:");
console.log(keywordList);

// Save to file for importing into SEMrush, Ahrefs, etc.
fs.writeFileSync("keywords-for-tracking.txt", keywordList);
```

## Integration with Astro Pages

### Add to Astro Components

```astro
---
// In your Astro page
import { initializeKeywordTracking } from "../utils/keywordTracker";

const tracker = initializeKeywordTracking();
const pageKeywords = tracker.getKeywordsByPage(Astro.url.pathname);
---

<!-- Display keywords this page targets -->
<div class="debug-info" style="display: none;">
  <h3>Keywords this page targets:</h3>
  <ul>
    {
      pageKeywords.map((k) => (
        <li>
          {k.keyword} ({k.category})
        </li>
      ))
    }
  </ul>
</div>
```

## Best Practices

### 1. Regular Updates

- Update rankings weekly from Search Console
- Run monthly comprehensive reports
- Set up alerts for significant changes

### 2. Data Quality

- Verify keyword data before updating ranks
- Use consistent data sources
- Track both desktop and mobile rankings

### 3. Actionable Insights

- Focus on keywords ranking 4-10 for quick wins
- Create content for informational keywords ranking 11-20
- Monitor competitor movements on brand terms

### 4. Integration

- Connect with Google Analytics for conversion data
- Use with Google Search Console for impression data
- Integrate with your CRM for lead attribution

## Troubleshooting

### Common Issues

**Keyword not found:**

```typescript
// Check if keyword exists in strategy
const allKeywords = tracker.keywords.map((k) => k.keyword);
console.log("Available keywords:", allKeywords);
```

**Category not returning results:**

```typescript
// Check available categories
const categories = [...new Set(tracker.keywords.map((k) => k.category))];
console.log("Available categories:", categories);
```

**Report generation errors:**

```typescript
// Ensure some rankings are set before generating reports
tracker.updateKeywordRank("flight school marketing", 5); // Add at least one ranking
const report = tracker.generateTrackingReport();
```

This keyword tracker system provides comprehensive monitoring for your 17-category keyword strategy, helping you make data-driven decisions to improve your search rankings and grow your flight school marketing business!
