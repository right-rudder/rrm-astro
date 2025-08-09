// Link checker utility for Right Rudder Marketing site
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = "https://rightruddermarketing.com";
const PAGES_DIR = path.join(__dirname, "../pages");
const COMPONENTS_DIR = path.join(__dirname, "../components");

// Link patterns to check
const LINK_PATTERNS = {
  internal: /href=["']([^"']*?)["']/g,
  images: /src=["']([^"']*?)["']/g,
  imagePath: /imagePath=["']([^"']*?)["']/g,
  imports: /from\s+["']([^"']*?)["']/g,
};

class LinkChecker {
  constructor() {
    this.internalLinks = new Set();
    this.externalLinks = new Set();
    this.images = new Set();
    this.brokenLinks = [];
    this.existingPages = new Set();
  }

  async scanDirectory(dir, extension = ".astro") {
    const files = [];

    async function* walk(dir) {
      const dirents = await fs.readdir(dir, { withFileTypes: true });
      for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
          yield* walk(res);
        } else if (dirent.name.endsWith(extension)) {
          yield res;
        }
      }
    }

    for await (const file of walk(dir)) {
      files.push(file);
    }
    return files;
  }

  async getExistingPages() {
    const astroFiles = await this.scanDirectory(PAGES_DIR);

    for (const file of astroFiles) {
      const relativePath = path.relative(PAGES_DIR, file);
      let urlPath = "/" + relativePath.replace(/\.(astro|md|mdx)$/, "");

      // Handle index files
      if (urlPath.endsWith("/index")) {
        urlPath = urlPath.slice(0, -6) || "/";
      }

      // Handle dynamic routes
      urlPath = urlPath.replace(/\[\.\.\.(\w+)\]/g, "*");
      urlPath = urlPath.replace(/\[(\w+)\]/g, ":$1");

      this.existingPages.add(urlPath);
    }
  }

  extractLinks(content) {
    const links = {
      internal: [],
      external: [],
      images: [],
    };

    // Extract href links
    let match;
    while ((match = LINK_PATTERNS.internal.exec(content)) !== null) {
      const href = match[1];
      if (href.startsWith("http")) {
        links.external.push(href);
      } else if (
        href.startsWith("/") ||
        href.startsWith("./") ||
        href.startsWith("../")
      ) {
        links.internal.push(href);
      }
    }

    // Extract image sources
    LINK_PATTERNS.internal.lastIndex = 0;
    while ((match = LINK_PATTERNS.images.exec(content)) !== null) {
      const src = match[1];
      if (src.startsWith("/") || src.startsWith("./")) {
        links.images.push(src);
      }
    }

    // Extract imagePath props
    LINK_PATTERNS.images.lastIndex = 0;
    while ((match = LINK_PATTERNS.imagePath.exec(content)) !== null) {
      links.images.push(match[1]);
    }

    return links;
  }

  async checkFile(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const links = this.extractLinks(content);

      return {
        file: filePath,
        ...links,
      };
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
      return null;
    }
  }

  async checkInternalLink(link) {
    // Clean up the link
    let cleanLink = link.split("#")[0].split("?")[0];

    // Handle relative paths
    if (cleanLink.startsWith("./") || cleanLink.startsWith("../")) {
      return {
        valid: true,
        note: "Relative path - manual verification needed",
      };
    }

    // Check if it's a valid internal page
    if (this.existingPages.has(cleanLink)) {
      return { valid: true };
    }

    // Check for dynamic routes
    for (const page of this.existingPages) {
      if (page.includes("*") || page.includes(":")) {
        const pattern = page.replace(/\*/g, ".*").replace(/:\w+/g, "[^/]+");
        const regex = new RegExp(`^${pattern}$`);
        if (regex.test(cleanLink)) {
          return { valid: true, note: "Matches dynamic route" };
        }
      }
    }

    return { valid: false, error: "Page not found" };
  }

  async checkImagePath(imagePath) {
    try {
      // Check if it's a public file
      if (imagePath.startsWith("/")) {
        const publicPath = path.join(__dirname, "../../public", imagePath);
        try {
          await fs.access(publicPath);
          return { valid: true };
        } catch {
          return { valid: false, error: "File not found in public directory" };
        }
      }

      // Check if it's an asset
      if (imagePath.startsWith("/src/assets/")) {
        const assetPath = path.join(__dirname, "../..", imagePath);
        try {
          await fs.access(assetPath);
          return { valid: true };
        } catch {
          return { valid: false, error: "Asset file not found" };
        }
      }

      return { valid: true, note: "External or dynamic path" };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  async runFullAudit() {
    console.log("🔍 Starting comprehensive link audit...\n");

    // Get all existing pages
    await this.getExistingPages();
    console.log(`📄 Found ${this.existingPages.size} pages`);

    // Scan all Astro files
    const astroFiles = await this.scanDirectory(PAGES_DIR);
    const componentFiles = await this.scanDirectory(COMPONENTS_DIR);
    const allFiles = [...astroFiles, ...componentFiles];

    console.log(`📁 Scanning ${allFiles.length} files for links...\n`);

    const results = [];

    for (const file of allFiles) {
      const fileResult = await this.checkFile(file);
      if (fileResult) {
        results.push(fileResult);
      }
    }

    // Analyze results
    console.log("🔗 Analyzing links...\n");

    const brokenLinks = [];
    const orphanedPages = new Set(this.existingPages);

    for (const result of results) {
      // Check internal links
      for (const link of result.internal) {
        const check = await this.checkInternalLink(link);
        if (!check.valid) {
          brokenLinks.push({
            file: result.file,
            type: "internal_link",
            link,
            error: check.error,
          });
        } else {
          // Remove from orphaned pages
          orphanedPages.delete(link);
        }
      }

      // Check images
      for (const image of result.images) {
        const check = await this.checkImagePath(image);
        if (!check.valid) {
          brokenLinks.push({
            file: result.file,
            type: "image",
            link: image,
            error: check.error,
          });
        }
      }
    }

    // Generate report
    console.log("📊 AUDIT RESULTS");
    console.log("=".repeat(50));

    if (brokenLinks.length > 0) {
      console.log(`\n❌ Found ${brokenLinks.length} broken links:`);
      brokenLinks.forEach((broken) => {
        console.log(`  • ${broken.type}: ${broken.link}`);
        console.log(`    File: ${path.relative(process.cwd(), broken.file)}`);
        console.log(`    Error: ${broken.error}\n`);
      });
    } else {
      console.log("\n✅ No broken links found!");
    }

    if (orphanedPages.size > 0) {
      console.log(
        `\n🔄 Found ${orphanedPages.size} potentially orphaned pages:`,
      );
      orphanedPages.forEach((page) => {
        console.log(`  • ${page}`);
      });
    } else {
      console.log("\n✅ No orphaned pages found!");
    }

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: allFiles.length,
        totalPages: this.existingPages.size,
        brokenLinks: brokenLinks.length,
        orphanedPages: orphanedPages.size,
      },
      brokenLinks,
      orphanedPages: Array.from(orphanedPages),
      allPages: Array.from(this.existingPages),
    };

    await fs.writeFile(
      path.join(__dirname, "../../LINK_AUDIT_REPORT.json"),
      JSON.stringify(report, null, 2),
    );

    console.log("\n📄 Detailed report saved to LINK_AUDIT_REPORT.json");

    return report;
  }
}

// Export for use in other scripts
export { LinkChecker };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new LinkChecker();
  checker.runFullAudit().catch(console.error);
}
