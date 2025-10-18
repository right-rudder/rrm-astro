// Example script demonstrating how to use the keyword tracker
// Run this in a Node.js environment or Astro development

import {
  initializeKeywordTracking,
  generateMonthlyReport,
} from "./src/utils/keywordTracker.js";

// Initialize the tracker
console.log("🚀 Initializing keyword tracker...");
const tracker = initializeKeywordTracking();

// Example 1: View all categories
console.log("\n📊 Available keyword categories:");
const allKeywords = tracker.keywords;
const categories = [...new Set(allKeywords.map((k) => k.category))];
categories.forEach((category) => {
  const count = allKeywords.filter((k) => k.category === category).length;
  console.log(`  - ${category}: ${count} keywords`);
});

// Example 2: See keywords for a specific page
console.log("\n🎯 Keywords targeting homepage (/):");
const homepageKeywords = tracker.getKeywordsByPage("/");
homepageKeywords.slice(0, 5).forEach((k) => {
  console.log(`  - ${k.keyword} (${k.category})`);
});

// Example 3: See keywords for PPC service page
console.log("\n💰 Keywords targeting PPC page (/flight-school-ppc):");
const ppcKeywords = tracker.getKeywordsByPage("/flight-school-ppc");
ppcKeywords.slice(0, 5).forEach((k) => {
  console.log(`  - ${k.keyword} (${k.category})`);
});

// Example 4: Update some keyword rankings (simulate rank tracking data)
console.log("\n📈 Updating keyword rankings...");
const sampleRankings = [
  { keyword: "flight school marketing agency", rank: 3 },
  { keyword: "Google Ads flight school marketing", rank: 7 },
  { keyword: "social media management for flight schools", rank: 12 },
  { keyword: "flight school marketing California", rank: 5 },
  { keyword: "hire flight school marketing agency", rank: 2 },
];

sampleRankings.forEach(({ keyword, rank }) => {
  tracker.updateKeywordRank(keyword, rank);
  console.log(`  ✅ ${keyword}: #${rank}`);
});

// Example 5: Generate performance report
console.log("\n📋 Generating performance report...");
const report = tracker.generateTrackingReport();

console.log(`  - Total keywords tracked: ${report.summary.keywordRankings}`);
console.log(
  `  - Average position: ${report.summary.averagePosition.toFixed(1)}`,
);
console.log(
  `  - Categories analyzed: ${Object.keys(report.categoryBreakdown).length}`,
);

// Example 6: Show category breakdown
console.log("\n📊 Category performance:");
Object.entries(report.categoryBreakdown).forEach(([category, data]) => {
  if (data.trackedKeywords > 0) {
    console.log(
      `  - ${category}: ${data.trackedKeywords} tracked, avg rank ${data.averageRank.toFixed(1)}`,
    );
  }
});

// Example 7: Export keywords for Google Ads
console.log("\n🎯 Keywords for Google Ads campaigns:");
const adKeywords = tracker.getKeywordsForGoogleAds();
console.log(`  - Exact match: ${adKeywords.exact.length} keywords`);
console.log(`  - Phrase match: ${adKeywords.phrase.length} keywords`);
console.log(`  - Broad match: ${adKeywords.broad.length} keywords`);

// Show some examples
console.log("\n  Exact match examples:");
adKeywords.exact.slice(0, 3).forEach((keyword) => {
  console.log(`    - [${keyword}]`);
});

console.log("\n  Phrase match examples:");
adKeywords.phrase.slice(0, 3).forEach((keyword) => {
  console.log(`    - "${keyword}"`);
});

// Example 8: Get negative keywords
console.log("\n🚫 Negative keywords for PPC:");
const negativeKeywords = tracker.getNegativeKeywords();
negativeKeywords.slice(0, 5).forEach((keyword) => {
  console.log(`  - ${keyword}`);
});

// Example 9: Generate full monthly report
console.log("\n📄 Generating monthly report...");
const monthlyReport = generateMonthlyReport(tracker);

// Save report to file (commented out for demo)
// import fs from 'fs';
// fs.writeFileSync('monthly-keyword-report.md', monthlyReport);

console.log(
  "✅ Monthly report generated! (Check monthlyReport variable for full content)",
);

// Example 10: Find content opportunities
console.log("\n💡 Content opportunities (keywords that could use blog posts):");
const informationalKeywords = tracker.getKeywordsByCategory("informational");
const longTailKeywords = tracker.getKeywordsByCategory("longTail");

console.log("  Informational keywords for blog content:");
informationalKeywords.slice(0, 3).forEach((k) => {
  console.log(`    - "${k.keyword}" -> Target page: ${k.targetPage}`);
});

console.log("  Long-tail keywords for in-depth guides:");
longTailKeywords.slice(0, 3).forEach((k) => {
  console.log(`    - "${k.keyword}" -> Target page: ${k.targetPage}`);
});

console.log("\n🎉 Keyword tracker demo complete!");
console.log("\nNext steps:");
console.log("1. Set up weekly ranking updates from Search Console");
console.log("2. Create monthly reporting automation");
console.log("3. Use keyword data to plan content calendar");
console.log("4. Set up PPC campaigns with exported keyword lists");
console.log("5. Monitor competitor movements on key terms");
