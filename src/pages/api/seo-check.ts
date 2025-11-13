import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate URL format
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid URL format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the target URL
    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RRM-SEO-Checker/1.0)",
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch URL" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const html = await response.text();

    // Parse HTML and extract SEO elements
    const analysis = analyzeSEO(html, targetUrl.toString());

    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("SEO Check Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

function analyzeSEO(html: string, url: string) {
  const results = {
    url,
    score: 0,
    maxScore: 100,
    checks: [] as any[],
    preview: {} as any, // Basic preview shown before email capture
    detailed: {} as any, // Detailed results shown after email capture
  };

  // Extract meta tags
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";

  const metaDescMatch = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i,
  );
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : "";

  const ogTitleMatch = html.match(
    /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i,
  );
  const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : "";

  const ogDescMatch = html.match(
    /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i,
  );
  const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : "";

  const ogImageMatch = html.match(
    /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
  );
  const ogImage = ogImageMatch ? ogImageMatch[1].trim() : "";

  // Extract headers
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gi) || [];
  const h1Count = h1Matches.length;

  const h2Matches = html.match(/<h2[^>]*>.*?<\/h2>/gi) || [];
  const h2Count = h2Matches.length;

  // Extract images
  const imgMatches = html.match(/<img[^>]+>/gi) || [];
  const imagesWithoutAlt = imgMatches.filter(
    (img) => !img.match(/alt=["'][^"']*["']/i),
  ).length;
  const totalImages = imgMatches.length;

  // Check for schema markup
  const hasSchemaMarkup = html.includes("application/ld+json");

  // Check for robots meta
  const robotsMatch = html.match(
    /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i,
  );
  const robotsContent = robotsMatch ? robotsMatch[1] : "";

  // Check for canonical
  const canonicalMatch = html.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
  );
  const canonicalUrl = canonicalMatch ? canonicalMatch[1] : "";

  // Check viewport
  const hasViewport = html.includes('name="viewport"');

  // Check for HTTPS
  const isHttps = url.startsWith("https://");

  // Calculate score and generate checks
  let score = 0;

  // Title check
  if (title) {
    if (title.length >= 30 && title.length <= 60) {
      score += 15;
      results.checks.push({
        category: "Title Tag",
        status: "pass",
        message: "Title tag length is optimal (30-60 characters)",
        value: title,
        impact: "high",
      });
    } else if (title.length > 0) {
      score += 8;
      results.checks.push({
        category: "Title Tag",
        status: "warning",
        message:
          title.length < 30
            ? "Title tag is too short (recommended 30-60 characters)"
            : "Title tag is too long (recommended 30-60 characters)",
        value: title,
        recommendation:
          title.length < 30
            ? "Add more descriptive keywords to your title"
            : "Shorten your title to improve click-through rates",
        impact: "high",
      });
    }
  } else {
    results.checks.push({
      category: "Title Tag",
      status: "fail",
      message: "Missing title tag",
      recommendation: "Add a unique, descriptive title tag to every page",
      impact: "critical",
    });
  }

  // Meta description check
  if (metaDescription) {
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      score += 15;
      results.checks.push({
        category: "Meta Description",
        status: "pass",
        message: "Meta description length is optimal (120-160 characters)",
        value: metaDescription,
        impact: "high",
      });
    } else if (metaDescription.length > 0) {
      score += 8;
      results.checks.push({
        category: "Meta Description",
        status: "warning",
        message:
          metaDescription.length < 120
            ? "Meta description is too short"
            : "Meta description is too long",
        value: metaDescription,
        recommendation:
          "Optimize your meta description to 120-160 characters with a clear call-to-action",
        impact: "high",
      });
    }
  } else {
    results.checks.push({
      category: "Meta Description",
      status: "fail",
      message: "Missing meta description",
      recommendation:
        "Add a compelling meta description to improve click-through rates",
      impact: "high",
    });
  }

  // H1 check
  if (h1Count === 1) {
    score += 10;
    results.checks.push({
      category: "Heading Structure",
      status: "pass",
      message: "Single H1 tag found",
      impact: "medium",
    });
  } else if (h1Count === 0) {
    results.checks.push({
      category: "Heading Structure",
      status: "fail",
      message: "No H1 tag found",
      recommendation:
        "Add exactly one H1 tag per page with your primary keyword",
      impact: "high",
    });
  } else {
    score += 5;
    results.checks.push({
      category: "Heading Structure",
      status: "warning",
      message: `Multiple H1 tags found (${h1Count})`,
      recommendation: "Use only one H1 tag per page for better SEO",
      impact: "medium",
    });
  }

  // H2 check
  if (h2Count > 0) {
    score += 5;
    results.checks.push({
      category: "Heading Structure",
      status: "pass",
      message: `${h2Count} H2 tags found - good content structure`,
      impact: "low",
    });
  }

  // Image alt text check
  if (totalImages > 0) {
    if (imagesWithoutAlt === 0) {
      score += 10;
      results.checks.push({
        category: "Image Optimization",
        status: "pass",
        message: "All images have alt text",
        impact: "medium",
      });
    } else {
      score += 5;
      results.checks.push({
        category: "Image Optimization",
        status: "warning",
        message: `${imagesWithoutAlt} of ${totalImages} images missing alt text`,
        recommendation:
          "Add descriptive alt text to all images for accessibility and SEO",
        impact: "medium",
      });
    }
  }

  // Open Graph check
  if (ogTitle && ogDescription && ogImage) {
    score += 10;
    results.checks.push({
      category: "Social Media",
      status: "pass",
      message: "Open Graph tags are properly configured",
      impact: "medium",
    });
  } else {
    results.checks.push({
      category: "Social Media",
      status: "warning",
      message: "Incomplete Open Graph tags",
      recommendation:
        "Add og:title, og:description, and og:image for better social sharing",
      impact: "medium",
    });
  }

  // Schema markup check
  if (hasSchemaMarkup) {
    score += 10;
    results.checks.push({
      category: "Structured Data",
      status: "pass",
      message: "Schema markup detected",
      impact: "medium",
    });
  } else {
    results.checks.push({
      category: "Structured Data",
      status: "warning",
      message: "No schema markup found",
      recommendation:
        "Add structured data to help search engines understand your content",
      impact: "medium",
    });
  }

  // Canonical URL check
  if (canonicalUrl) {
    score += 5;
    results.checks.push({
      category: "Technical SEO",
      status: "pass",
      message: "Canonical URL is set",
      impact: "medium",
    });
  } else {
    results.checks.push({
      category: "Technical SEO",
      status: "warning",
      message: "No canonical URL found",
      recommendation: "Add a canonical URL to prevent duplicate content issues",
      impact: "medium",
    });
  }

  // Viewport check
  if (hasViewport) {
    score += 5;
    results.checks.push({
      category: "Mobile Optimization",
      status: "pass",
      message: "Viewport meta tag is set",
      impact: "high",
    });
  } else {
    results.checks.push({
      category: "Mobile Optimization",
      status: "fail",
      message: "Missing viewport meta tag",
      recommendation: "Add viewport meta tag for mobile responsiveness",
      impact: "high",
    });
  }

  // HTTPS check
  if (isHttps) {
    score += 10;
    results.checks.push({
      category: "Security",
      status: "pass",
      message: "Site uses HTTPS",
      impact: "high",
    });
  } else {
    results.checks.push({
      category: "Security",
      status: "fail",
      message: "Site is not using HTTPS",
      recommendation: "Enable HTTPS to secure your site and improve rankings",
      impact: "critical",
    });
  }

  // Robots meta check
  if (
    robotsContent &&
    (robotsContent.includes("noindex") || robotsContent.includes("nofollow"))
  ) {
    results.checks.push({
      category: "Indexing",
      status: "warning",
      message: "Page has restrictive robots directives",
      value: robotsContent,
      recommendation:
        "Review robots meta tag settings - page may not be indexed",
      impact: "critical",
    });
  } else {
    score += 5;
    results.checks.push({
      category: "Indexing",
      status: "pass",
      message: "No indexing restrictions found",
      impact: "high",
    });
  }

  results.score = score;

  // Create preview (limited info shown before email capture)
  results.preview = {
    score,
    maxScore: 100,
    level:
      score >= 80
        ? "excellent"
        : score >= 60
          ? "good"
          : score >= 40
            ? "needs-improvement"
            : "poor",
    checksCount: results.checks.length,
    criticalIssues: results.checks.filter((c) => c.impact === "critical")
      .length,
    highIssues: results.checks.filter(
      (c) => c.impact === "high" && c.status !== "pass",
    ).length,
  };

  // Store detailed results
  results.detailed = {
    title,
    metaDescription,
    h1Count,
    h2Count,
    totalImages,
    imagesWithoutAlt,
    hasSchemaMarkup,
    hasCanonical: !!canonicalUrl,
    isHttps,
    hasViewport,
    checks: results.checks,
  };

  return results;
}
