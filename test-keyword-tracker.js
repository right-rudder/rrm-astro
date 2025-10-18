#!/usr/bin/env node

// Simple test script to demonstrate keyword tracker usage
// Run with: node test-keyword-tracker.js

console.log("🚀 Right Rudder Marketing Keyword Tracker Demo\n");

// Mock the keyword tracker for demonstration
// In real usage, you would import from './src/utils/keywordTracker.js'

const mockKeywords = [
  {
    keyword: "flight school marketing agency",
    category: "marketSegment",
    targetPage: "/",
    currentRank: 3,
  },
  {
    keyword: "Google Ads flight school marketing",
    category: "serviceSpecific",
    targetPage: "/flight-school-ppc",
    currentRank: 7,
  },
  {
    keyword: "social media management for flight schools",
    category: "productDefining",
    targetPage: "/flight-school-social-media",
    currentRank: 12,
  },
  {
    keyword: "flight school marketing California",
    category: "locational",
    targetPage: "/locations/california",
    currentRank: 5,
  },
  {
    keyword: "hire flight school marketing agency",
    category: "transactional",
    targetPage: "/schedule-call",
    currentRank: 2,
  },
  {
    keyword: "what is flight school marketing",
    category: "informational",
    targetPage: "/blog",
    currentRank: 15,
  },
  {
    keyword: "how to increase flight school enrollment",
    category: "longTail",
    targetPage: "/blog",
    currentRank: 18,
  },
  {
    keyword: "flight school SEO services",
    category: "midTail",
    targetPage: "/flight-school-seo",
    currentRank: 9,
  },
];

// Demo functions
function showKeywordsByCategory(category) {
  const keywords = mockKeywords.filter((k) => k.category === category);
  console.log(`\n📊 ${category} Keywords:`);
  keywords.forEach((k) => {
    const rank = k.currentRank ? `#${k.currentRank}` : "Not ranked";
    console.log(`  - ${k.keyword} (${rank}) → ${k.targetPage}`);
  });
}

function showKeywordsByPage(page) {
  const keywords = mockKeywords.filter((k) => k.targetPage === page);
  console.log(`\n🎯 Keywords targeting ${page}:`);
  keywords.forEach((k) => {
    const rank = k.currentRank ? `#${k.currentRank}` : "Not ranked";
    console.log(`  - ${k.keyword} (${rank})`);
  });
}

function showPerformanceSummary() {
  const rankedKeywords = mockKeywords.filter((k) => k.currentRank);
  const averageRank =
    rankedKeywords.reduce((sum, k) => sum + k.currentRank, 0) /
    rankedKeywords.length;
  const top10Count = rankedKeywords.filter((k) => k.currentRank <= 10).length;

  console.log("\n📈 Performance Summary:");
  console.log(`  - Total keywords tracked: ${rankedKeywords.length}`);
  console.log(`  - Average ranking position: ${averageRank.toFixed(1)}`);
  console.log(`  - Keywords in top 10: ${top10Count}`);
  console.log(
    `  - Keywords in positions 11-20: ${rankedKeywords.filter((k) => k.currentRank >= 11 && k.currentRank <= 20).length}`,
  );
}

function showGoogleAdsKeywords() {
  console.log("\n🎯 Google Ads Keyword Grouping:");

  const exactMatch = mockKeywords.filter(
    (k) => k.category === "transactional" || k.category === "exactMatch",
  );
  const phraseMatch = mockKeywords.filter(
    (k) => k.category === "serviceSpecific" || k.category === "productDefining",
  );
  const broadMatch = mockKeywords.filter(
    (k) => k.category === "marketSegment" || k.category === "shortTail",
  );

  console.log(`  Exact Match (${exactMatch.length} keywords):`);
  exactMatch.slice(0, 3).forEach((k) => console.log(`    [${k.keyword}]`));

  console.log(`  Phrase Match (${phraseMatch.length} keywords):`);
  phraseMatch.slice(0, 3).forEach((k) => console.log(`    "${k.keyword}"`));

  console.log(`  Broad Match (${broadMatch.length} keywords):`);
  broadMatch.slice(0, 3).forEach((k) => console.log(`    ${k.keyword}`));
}

function showContentOpportunities() {
  const contentKeywords = mockKeywords.filter(
    (k) =>
      (k.category === "informational" || k.category === "longTail") &&
      k.currentRank &&
      k.currentRank >= 11 &&
      k.currentRank <= 20,
  );

  console.log("\n💡 Content Opportunities (Rankings 11-20):");
  contentKeywords.forEach((k) => {
    console.log(
      `  - "${k.keyword}" (#${k.currentRank}) - Create blog post/guide`,
    );
  });
}

// Run the demo
console.log("1. Keywords by Category Examples:");
showKeywordsByCategory("marketSegment");
showKeywordsByCategory("serviceSpecific");
showKeywordsByCategory("transactional");

console.log("\n\n2. Keywords by Target Page:");
showKeywordsByPage("/");
showKeywordsByPage("/flight-school-ppc");
showKeywordsByPage("/schedule-call");

console.log("\n\n3. Performance Analysis:");
showPerformanceSummary();

console.log("\n\n4. Google Ads Setup:");
showGoogleAdsKeywords();

console.log("\n\n5. Content Strategy:");
showContentOpportunities();

console.log("\n\n🎯 How to Use in Real Implementation:");
console.log(`
// 1. Initialize tracker
import { initializeKeywordTracking } from './src/utils/keywordTracker.js';
const tracker = initializeKeywordTracking();

// 2. Update rankings from your SEO tool
tracker.updateKeywordRank('flight school marketing agency', 3);
tracker.updateKeywordRank('Google Ads flight school marketing', 7);

// 3. Generate reports
const report = tracker.generateTrackingReport();
console.log('Average position:', report.summary.averagePosition);

// 4. Get keywords for specific use cases
const ppcKeywords = tracker.getKeywordsForGoogleAds();
const blogKeywords = tracker.getKeywordsByCategory('informational');
const locationKeywords = tracker.getKeywordsByPage('/locations/california');

// 5. Export for external tools
const keywordList = tracker.exportKeywordList();
// Save to file for importing into SEMrush, Ahrefs, etc.
`);

console.log("\n✅ Demo complete! The keyword tracker is ready to help you:");
console.log("  • Monitor all 17 keyword categories");
console.log("  • Track rankings and performance");
console.log("  • Plan content strategy");
console.log("  • Set up PPC campaigns");
console.log("  • Generate monthly reports");
console.log("  • Find optimization opportunities\n");
