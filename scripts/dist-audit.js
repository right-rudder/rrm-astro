import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to audit title/H1 consistency in built HTML files (dist folder)
 * This analyzes the actual rendered HTML to check for SEO compliance
 */

// Configuration
const DIST_DIR = path.join(__dirname, "../dist");

// Results storage
const results = {
  pages: [],
  summary: {
    totalPages: 0,
    pagesWithIssues: 0,
    missingH1: 0,
    titleH1Mismatches: 0,
    consistentPages: 0,
  },
};

// Helper function to extract text content from HTML
function extractTextContent(htmlString) {
  if (!htmlString) return "";
  return htmlString
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&[^;]+;/g, " ") // Remove HTML entities
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

// Helper function to calculate similarity between two strings
function calculateSimilarity(str1, str2) {
  const words1 = str1
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);
  const words2 = str2
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  // Remove common words that don't add SEO value
  const commonWords = [
    "the",
    "and",
    "for",
    "with",
    "right",
    "rudder",
    "marketing",
    "flight",
    "school",
  ];
  const meaningfulWords1 = words1.filter((word) => !commonWords.includes(word));
  const meaningfulWords2 = words2.filter((word) => !commonWords.includes(word));

  if (meaningfulWords1.length === 0 && meaningfulWords2.length === 0) return 1;
  if (meaningfulWords1.length === 0 || meaningfulWords2.length === 0) return 0;

  // Count matching words
  let matches = 0;
  meaningfulWords1.forEach((word1) => {
    meaningfulWords2.forEach((word2) => {
      if (word1 === word2 || word1.includes(word2) || word2.includes(word1)) {
        matches++;
      }
    });
  });

  // Return similarity ratio
  return matches / Math.max(meaningfulWords1.length, meaningfulWords2.length);
}

// Process a single HTML file
function processHTMLFile(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Extract title
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    const pageTitle = titleMatch
      ? extractTextContent(titleMatch[1])
      : "No title found";

    // Extract H1 - handle nested HTML tags inside H1
    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/is);
    const h1Content = h1Match ? extractTextContent(h1Match[1]) : null;

    // Extract multiple H1s if any - handle nested HTML
    const allH1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gis);
    const h1Count = allH1Matches ? allH1Matches.length : 0;

    // Analysis
    let status = "good";
    let issues = [];

    if (!h1Content) {
      status = "missing-h1";
      issues.push("Missing H1 tag");
      results.summary.missingH1++;
    } else if (h1Count > 1) {
      status = "multiple-h1";
      issues.push(`Multiple H1 tags found (${h1Count})`);
    }

    // Check title/H1 consistency
    let similarity = 0;
    if (h1Content) {
      similarity = calculateSimilarity(pageTitle, h1Content);
      if (similarity < 0.3) {
        if (status === "good") status = "mismatch";
        issues.push("Title and H1 content have low similarity");
        results.summary.titleH1Mismatches++;
      }
    }

    if (status === "good") {
      results.summary.consistentPages++;
    }

    const pageResult = {
      path: relativePath,
      title: pageTitle,
      h1: h1Content || "NO H1 FOUND",
      h1Count,
      similarity: Math.round(similarity * 100),
      status,
      issues,
    };

    results.pages.push(pageResult);
    results.summary.totalPages++;

    if (issues.length > 0) {
      results.summary.pagesWithIssues++;
    }

    // Log progress
    const statusIcon =
      status === "good"
        ? "✅"
        : status === "missing-h1"
          ? "❌"
          : status === "multiple-h1"
            ? "⚠️"
            : "🔸";

    console.log(`${statusIcon} ${relativePath}`);
    console.log(`   Title: "${pageTitle}"`);
    console.log(`   H1: ${h1Content ? `"${h1Content}"` : "MISSING"}`);
    if (h1Content)
      console.log(`   Similarity: ${Math.round(similarity * 100)}%`);
    if (issues.length > 0) console.log(`   Issues: ${issues.join(", ")}`);
    console.log("");
  } catch (error) {
    console.warn(`Warning: Could not process ${filePath}: ${error.message}`);
  }
}

// Recursively scan directory for HTML files
function scanDirectory(dirPath, baseDir = dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    const relativePath = path.relative(baseDir, fullPath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!["assets", "images", "logos", "authors"].includes(item)) {
        scanDirectory(fullPath, baseDir);
      }
    } else if (item.endsWith(".html") && !item.startsWith(".")) {
      processHTMLFile(fullPath, relativePath);
    }
  }
}

// Generate comprehensive report
function generateReport() {
  console.log("\n" + "=".repeat(80));
  console.log("📊 BUILT SITE TITLE/H1 AUDIT REPORT");
  console.log("=".repeat(80));

  console.log(`\n📈 Summary Statistics:`);
  console.log(`   • Total pages audited: ${results.summary.totalPages}`);
  console.log(`   • Pages with issues: ${results.summary.pagesWithIssues}`);
  console.log(
    `   • Pages with consistent title/H1: ${results.summary.consistentPages}`,
  );
  console.log(`   • Pages missing H1: ${results.summary.missingH1}`);
  console.log(
    `   • Pages with title/H1 mismatches: ${results.summary.titleH1Mismatches}`,
  );
  console.log(
    `   • Success rate: ${((results.summary.consistentPages / results.summary.totalPages) * 100).toFixed(1)}%`,
  );

  // Group results by status
  const missingH1 = results.pages.filter((p) => p.status === "missing-h1");
  const mismatches = results.pages.filter((p) => p.status === "mismatch");
  const multipleH1 = results.pages.filter((p) => p.status === "multiple-h1");
  const goodPages = results.pages.filter((p) => p.status === "good");

  if (missingH1.length > 0) {
    console.log(`\n❌ Pages Missing H1 Tags (${missingH1.length}):`);
    missingH1.forEach((page) => {
      console.log(`   • ${page.path}`);
      console.log(`     Title: "${page.title}"`);
    });
  }

  if (mismatches.length > 0) {
    console.log(`\n🔸 Pages with Title/H1 Mismatches (${mismatches.length}):`);
    mismatches.forEach((page) => {
      console.log(`   • ${page.path} (Similarity: ${page.similarity}%)`);
      console.log(`     Title: "${page.title}"`);
      console.log(`     H1:    "${page.h1}"`);
    });
  }

  if (multipleH1.length > 0) {
    console.log(`\n⚠️  Pages with Multiple H1 Tags (${multipleH1.length}):`);
    multipleH1.forEach((page) => {
      console.log(`   • ${page.path} (${page.h1Count} H1 tags)`);
      console.log(`     Title: "${page.title}"`);
      console.log(`     H1:    "${page.h1}"`);
    });
  }

  if (goodPages.length > 0) {
    console.log(
      `\n✅ Pages with Good Title/H1 Consistency (${goodPages.length}):`,
    );
    goodPages.slice(0, 10).forEach((page) => {
      // Show first 10
      console.log(`   • ${page.path} (Similarity: ${page.similarity}%)`);
    });
    if (goodPages.length > 10) {
      console.log(`   ... and ${goodPages.length - 10} more pages`);
    }
  }

  console.log(`\n💡 SEO Recommendations:`);
  if (missingH1.length > 0) {
    console.log(
      `   1. Add H1 tags to ${missingH1.length} pages that are missing them`,
    );
  }
  if (mismatches.length > 0) {
    console.log(
      `   2. Improve title/H1 alignment for ${mismatches.length} pages`,
    );
  }
  if (multipleH1.length > 0) {
    console.log(`   3. Fix multiple H1 tags on ${multipleH1.length} pages`);
  }
  console.log(`   4. Ensure H1 content includes primary target keywords`);
  console.log(
    `   5. Keep H1 content descriptive but concise (under 60 characters)`,
  );
  console.log(`   6. Consider user intent when crafting H1 content`);

  // Save detailed report to file
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: results.summary,
    pages: results.pages,
  };

  try {
    fs.writeFileSync(
      path.join(__dirname, "../dist-audit-report.json"),
      JSON.stringify(reportData, null, 2),
    );
    console.log(`\n📁 Detailed report saved to: dist-audit-report.json`);
  } catch (error) {
    console.warn(`Warning: Could not save report file: ${error.message}`);
  }
}

// Main execution
console.log("🔍 Starting Built Site Title/H1 Audit...");
console.log(`📁 Scanning: ${DIST_DIR}`);
console.log("");

try {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      "❌ Error: dist folder not found. Please build the site first with: npm run build",
    );
    process.exit(1);
  }

  scanDirectory(DIST_DIR);
  generateReport();
} catch (error) {
  console.error("❌ Error during audit:", error.message);
  process.exit(1);
}
