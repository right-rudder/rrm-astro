#!/usr/bin/env node

// SEO Audit Script for Right Rudder Marketing
// Runs comprehensive checks and generates actionable reports

import { LinkChecker } from "../src/utils/linkChecker.js";
import { metaDescriptionOptimizer } from "../src/utils/metaDescriptionOptimizer.ts";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SEOAuditor {
  constructor() {
    this.linkChecker = new LinkChecker();
    this.results = {
      timestamp: new Date().toISOString(),
      summary: {},
      issues: [],
      recommendations: [],
      scores: {},
    };
  }

  async runFullAudit() {
    console.log("🚀 Starting comprehensive SEO audit...\n");

    try {
      // 1. Link Analysis
      console.log("🔗 Running link audit...");
      const linkResults = await this.linkChecker.runFullAudit();
      this.results.linkAudit = linkResults;

      // 2. Meta Description Analysis
      console.log("\n📝 Analyzing meta descriptions...");
      const metaResults = await this.auditMetaDescriptions();
      this.results.metaDescriptions = metaResults;

      // 3. Image Optimization Analysis
      console.log("\n🖼️  Checking image optimization...");
      const imageResults = await this.auditImages();
      this.results.images = imageResults;

      // 4. Performance Analysis
      console.log("\n⚡ Analyzing performance factors...");
      const performanceResults = await this.auditPerformance();
      this.results.performance = performanceResults;

      // 5. Generate Summary and Recommendations
      console.log("\n📊 Generating recommendations...");
      this.generateRecommendations();

      // 6. Save comprehensive report
      await this.saveReport();

      // 7. Display summary
      this.displaySummary();
    } catch (error) {
      console.error("❌ Audit failed:", error);
      throw error;
    }
  }

  async auditMetaDescriptions() {
    const results = {
      totalPages: 0,
      validDescriptions: 0,
      issues: [],
      improvements: [],
    };

    try {
      const pagesDir = path.join(__dirname, "../src/pages");
      const astroFiles = await this.scanDirectory(pagesDir, ".astro");

      for (const file of astroFiles) {
        const content = await fs.readFile(file, "utf-8");
        const relativePath = path.relative(pagesDir, file);

        // Extract meta description from file
        const descriptionMatch = content.match(
          /siteDescription["\s]*[:=]["\s]*["']([^"']+)["']/,
        );

        if (descriptionMatch) {
          const description = descriptionMatch[1];
          const validation =
            metaDescriptionOptimizer.validateDescription(description);

          results.totalPages++;

          if (validation.isValid) {
            results.validDescriptions++;
          } else {
            results.issues.push({
              page: relativePath,
              description,
              score: validation.score,
              issues: validation.issues,
              suggestions: validation.suggestions,
            });
          }
        } else {
          results.issues.push({
            page: relativePath,
            description: null,
            score: 0,
            issues: ["Missing meta description"],
            suggestions: ["Add a descriptive meta description"],
          });
        }
      }
    } catch (error) {
      console.error("Error auditing meta descriptions:", error);
    }

    return results;
  }

  async auditImages() {
    const results = {
      totalImages: 0,
      optimizedImages: 0,
      largeImages: [],
      missingAltText: [],
      nonWebP: [],
    };

    try {
      const assetsDir = path.join(__dirname, "../src/assets");
      const publicDir = path.join(__dirname, "../public");

      // Check src/assets
      const assetImages = await this.scanDirectory(assetsDir, [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
      ]);

      for (const imagePath of assetImages) {
        const stats = await fs.stat(imagePath);
        const extension = path.extname(imagePath).toLowerCase();

        results.totalImages++;

        // Check file size (>500KB is considered large)
        if (stats.size > 500 * 1024) {
          results.largeImages.push({
            path: path.relative(__dirname, imagePath),
            size: Math.round(stats.size / 1024) + "KB",
          });
        }

        // Check if WebP
        if (extension === ".webp") {
          results.optimizedImages++;
        } else {
          results.nonWebP.push(path.relative(__dirname, imagePath));
        }
      }

      // Check public directory
      const publicImages = await this.scanDirectory(publicDir, [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
      ]);

      for (const imagePath of publicImages) {
        const stats = await fs.stat(imagePath);
        results.totalImages++;

        if (stats.size > 500 * 1024) {
          results.largeImages.push({
            path: path.relative(__dirname, imagePath),
            size: Math.round(stats.size / 1024) + "KB",
          });
        }
      }
    } catch (error) {
      console.error("Error auditing images:", error);
    }

    return results;
  }

  async auditPerformance() {
    const results = {
      configOptimizations: [],
      recommendations: [],
    };

    try {
      // Check Astro config
      const configPath = path.join(__dirname, "../astro.config.mjs");
      const configContent = await fs.readFile(configPath, "utf-8");

      // Check for performance optimizations
      const optimizations = [
        {
          check: "compressHTML",
          pattern: /compressHTML.*true/,
          description: "HTML compression enabled",
        },
        {
          check: "inlineStylesheets",
          pattern: /inlineStylesheets/,
          description: "CSS inlining configured",
        },
        {
          check: "sitemap",
          pattern: /@astrojs\/sitemap/,
          description: "Sitemap generation enabled",
        },
        {
          check: "imageOptimization",
          pattern: /image.*domains/,
          description: "Image optimization configured",
        },
      ];

      optimizations.forEach((opt) => {
        if (opt.pattern.test(configContent)) {
          results.configOptimizations.push(`✅ ${opt.description}`);
        } else {
          results.recommendations.push(`❌ Missing: ${opt.description}`);
        }
      });

      // Check Netlify config
      try {
        const netlifyPath = path.join(__dirname, "../netlify.toml");
        const netlifyContent = await fs.readFile(netlifyPath, "utf-8");

        if (netlifyContent.includes("Cache-Control")) {
          results.configOptimizations.push("✅ Cache headers configured");
        } else {
          results.recommendations.push(
            "❌ Missing: Cache headers in Netlify config",
          );
        }

        if (netlifyContent.includes("preconnect")) {
          results.configOptimizations.push("✅ Preconnect headers configured");
        }
      } catch (error) {
        results.recommendations.push("❌ Missing: Netlify configuration file");
      }
    } catch (error) {
      console.error("Error auditing performance:", error);
    }

    return results;
  }

  generateRecommendations() {
    const { linkAudit, metaDescriptions, images, performance } = this.results;

    // Priority scoring
    let score = 100;
    const criticalIssues = [];
    const recommendations = [];

    // Link issues (high priority)
    if (linkAudit.brokenLinks.length > 0) {
      score -= 25;
      criticalIssues.push(
        `🚨 CRITICAL: ${linkAudit.brokenLinks.length} broken links found`,
      );
      recommendations.push({
        priority: "HIGH",
        category: "Links",
        issue: "Broken links detected",
        action: "Fix all broken internal and external links",
        impact: "High - Affects SEO and user experience",
      });
    }

    if (linkAudit.orphanedPages.length > 0) {
      score -= 15;
      criticalIssues.push(
        `⚠️  ${linkAudit.orphanedPages.length} orphaned pages found`,
      );
      recommendations.push({
        priority: "MEDIUM",
        category: "Internal Linking",
        issue: "Orphaned pages with no internal links",
        action: "Add internal links to improve page discoverability",
        impact: "Medium - Reduces crawl efficiency",
      });
    }

    // Meta description issues
    const metaIssueCount = metaDescriptions.issues.length;
    if (metaIssueCount > 0) {
      score -= Math.min(20, metaIssueCount * 2);
      recommendations.push({
        priority: metaIssueCount > 5 ? "HIGH" : "MEDIUM",
        category: "Meta Descriptions",
        issue: `${metaIssueCount} pages with meta description issues`,
        action: "Optimize meta descriptions for length and keywords",
        impact: "Medium - Affects click-through rates",
      });
    }

    // Image optimization issues
    if (images.largeImages.length > 0) {
      score -= Math.min(15, images.largeImages.length);
      recommendations.push({
        priority: "MEDIUM",
        category: "Images",
        issue: `${images.largeImages.length} large images found`,
        action: "Compress and optimize large images",
        impact: "Medium - Affects page load speed",
      });
    }

    // Performance recommendations
    if (performance.recommendations.length > 0) {
      score -= 10;
      recommendations.push({
        priority: "LOW",
        category: "Performance",
        issue: "Missing performance optimizations",
        action: "Implement remaining performance configurations",
        impact: "Low - Incremental performance gains",
      });
    }

    this.results.summary = {
      overallScore: Math.max(0, score),
      criticalIssues: criticalIssues.length,
      totalIssues:
        linkAudit.brokenLinks.length +
        linkAudit.orphanedPages.length +
        metaIssueCount +
        images.largeImages.length,
      grade: this.getGrade(score),
    };

    this.results.recommendations = recommendations;
  }

  getGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  }

  async saveReport() {
    const reportPath = path.join(__dirname, "../SEO_AUDIT_REPORT.json");
    await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));

    // Also generate a markdown summary
    const markdownReport = this.generateMarkdownReport();
    const markdownPath = path.join(__dirname, "../SEO_AUDIT_SUMMARY.md");
    await fs.writeFile(markdownPath, markdownReport);
  }

  generateMarkdownReport() {
    const { summary, recommendations, linkAudit, metaDescriptions, images } =
      this.results;

    return `# SEO Audit Report - ${new Date().toLocaleDateString()}

## 🎯 Overall Score: ${summary.overallScore}/100 (Grade: ${summary.grade})

### Summary
- **Critical Issues**: ${summary.criticalIssues}
- **Total Issues**: ${summary.totalIssues}
- **Broken Links**: ${linkAudit.brokenLinks.length}
- **Orphaned Pages**: ${linkAudit.orphanedPages.length}
- **Meta Description Issues**: ${metaDescriptions.issues.length}
- **Large Images**: ${images.largeImages.length}

## 🚨 Priority Actions

${recommendations
  .filter((r) => r.priority === "HIGH")
  .map(
    (r) =>
      `### ${r.category}: ${r.issue}
**Action**: ${r.action}
**Impact**: ${r.impact}
`,
  )
  .join("\n")}

## 📋 Detailed Recommendations

${recommendations
  .map(
    (r) =>
      `### ${r.priority} - ${r.category}
- **Issue**: ${r.issue}
- **Action**: ${r.action}
- **Impact**: ${r.impact}
`,
  )
  .join("\n")}

## 🔗 Broken Links (${linkAudit.brokenLinks.length})

${linkAudit.brokenLinks
  .map(
    (link) =>
      `- **${link.type}**: \`${link.link}\`
  - File: \`${link.file}\`
  - Error: ${link.error}
`,
  )
  .join("\n")}

## 🔄 Orphaned Pages (${linkAudit.orphanedPages.length})

${linkAudit.orphanedPages.map((page) => `- \`${page}\``).join("\n")}

## 📝 Meta Description Issues

${metaDescriptions.issues
  .slice(0, 10)
  .map(
    (issue) =>
      `- **${issue.page}** (Score: ${issue.score}/100)
  - Issues: ${issue.issues.join(", ")}
  - Suggestions: ${issue.suggestions.join(", ")}
`,
  )
  .join("\n")}

${metaDescriptions.issues.length > 10 ? `\n*... and ${metaDescriptions.issues.length - 10} more issues*` : ""}

## 🖼️ Large Images

${images.largeImages
  .slice(0, 10)
  .map((img) => `- \`${img.path}\` (${img.size})`)
  .join("\n")}

---

*Report generated on ${this.results.timestamp}*
`;
  }

  displaySummary() {
    const { summary, recommendations } = this.results;

    console.log("\n" + "=".repeat(60));
    console.log("🎯 SEO AUDIT SUMMARY");
    console.log("=".repeat(60));
    console.log(
      `Overall Score: ${summary.overallScore}/100 (${summary.grade})`,
    );
    console.log(`Critical Issues: ${summary.criticalIssues}`);
    console.log(`Total Issues: ${summary.totalIssues}`);

    if (recommendations.length > 0) {
      console.log("\n📋 TOP PRIORITY ACTIONS:");
      recommendations
        .filter((r) => r.priority === "HIGH")
        .forEach((rec, i) => {
          console.log(`${i + 1}. ${rec.category}: ${rec.issue}`);
          console.log(`   Action: ${rec.action}`);
        });
    }

    console.log("\n📄 Full report saved to:");
    console.log("- SEO_AUDIT_REPORT.json (detailed data)");
    console.log("- SEO_AUDIT_SUMMARY.md (human-readable summary)");
    console.log("\n✅ Audit complete!");
  }

  async scanDirectory(dir, extensions) {
    const files = [];
    const extArray = Array.isArray(extensions) ? extensions : [extensions];

    async function* walk(dir) {
      const dirents = await fs.readdir(dir, { withFileTypes: true });
      for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
          yield* walk(res);
        } else if (extArray.some((ext) => dirent.name.endsWith(ext))) {
          yield res;
        }
      }
    }

    for await (const file of walk(dir)) {
      files.push(file);
    }
    return files;
  }
}

// Run the audit if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const auditor = new SEOAuditor();
  auditor.runFullAudit().catch(console.error);
}

export { SEOAuditor };
