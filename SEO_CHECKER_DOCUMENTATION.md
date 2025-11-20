# SEO Checker Lead Magnet - Documentation

## Overview

The SEO Checker is a lead generation tool that allows visitors to analyze their website's SEO performance. It provides a preview of results but requires email registration to view the complete detailed report.

## Features

### 1. **Instant SEO Analysis**

- Analyzes 15+ critical SEO factors
- Provides an overall SEO score (0-100)
- Categorizes issues by impact level (Critical, High, Medium, Low)

### 2. **Two-Tier Results Display**

- **Preview (Before Email)**: Shows overall score, issue counts, and general health
- **Full Report (After Email)**: Displays detailed analysis with actionable recommendations

### 3. **Lead Capture**

- Collects: Name, Email, Company/Flight School Name
- Integrates with Google Analytics for conversion tracking
- Privacy-first approach

## Technical Architecture

### Files Created

1. **`/src/pages/api/seo-check.ts`** - API endpoint that analyzes URLs
2. **`/src/components/SEOChecker.jsx`** - React component for the UI
3. **`/src/pages/seo-checker.astro`** - Landing page with marketing copy

### SEO Checks Performed

| Check            | Impact   | Description                                  |
| ---------------- | -------- | -------------------------------------------- |
| Title Tag        | High     | Length (30-60 chars), presence, optimization |
| Meta Description | High     | Length (120-160 chars), presence, CTA        |
| H1 Tag           | High     | Single H1 per page                           |
| H2 Tags          | Low      | Content structure                            |
| Image Alt Text   | Medium   | Accessibility and SEO                        |
| Open Graph Tags  | Medium   | Social media sharing                         |
| Schema Markup    | Medium   | Structured data presence                     |
| Canonical URL    | Medium   | Duplicate content prevention                 |
| Viewport Meta    | High     | Mobile responsiveness                        |
| HTTPS            | Critical | Security and ranking factor                  |
| Robots Meta      | Critical | Indexing status                              |

## CRM Integration

### Current Setup (Placeholder)

The email capture currently simulates submission. To integrate with your CRM:

### Option 1: Direct API Integration

Edit `/src/components/SEOChecker.jsx` line ~90:

```javascript
const handleEmailSubmit = async (e) => {
  e.preventDefault();
  setEmailSubmitting(true);

  try {
    // Replace with your CRM API endpoint
    const response = await fetch("YOUR_CRM_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        source: "SEO Checker Tool",
        url: fullResults.url,
        seoScore: fullResults.score,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("CRM submission failed");

    // Show full results
    setShowEmailGate(false);
    setEmailSubmitting(false);

    // Track conversion
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "SEO Checker",
        event_label: "Email Captured",
        value: fullResults.score,
      });
    }
  } catch (error) {
    console.error("CRM Error:", error);
    // Still show results even if CRM fails
    setShowEmailGate(false);
    setEmailSubmitting(false);
  }
};
```

### Option 2: Zapier/Make Integration

1. Create a webhook in Zapier/Make
2. Update the fetch URL to your webhook endpoint
3. Configure Zapier to send data to your CRM (HubSpot, Salesforce, etc.)

### Option 3: Email Service (Mailchimp, ConvertKit)

```javascript
const handleEmailSubmit = async (e) => {
  e.preventDefault();
  setEmailSubmitting(true);

  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        company,
        tags: ["seo-checker-lead"],
        customFields: {
          seo_score: fullResults.score,
          website_url: fullResults.url,
          critical_issues: fullResults.preview.criticalIssues,
        },
      }),
    });

    // Continue with existing logic...
  } catch (error) {
    // Handle error
  }
};
```

## Usage & Marketing

### Promoting the Tool

1. **Navigation**: Add to main menu under "Resources" or "Free Tools"
2. **Blog CTAs**: Link from SEO-related blog posts
3. **Social Media**: Share sample reports on LinkedIn/Facebook
4. **Email Signature**: Add "Free SEO Checker" link
5. **Paid Ads**: Use as landing page for PPC campaigns

### Content Marketing Ideas

- Blog post: "How to Interpret Your Flight School SEO Score"
- Case study: "How [School] Improved Their SEO Score from 45 to 92"
- Video tutorial: "Using Our Free SEO Checker"
- Email series: "7-Day SEO Improvement Challenge"

## Customization Options

### Adjust Scoring Weights

Edit `/src/pages/api/seo-check.ts` to change point values:

```typescript
// Example: Make title tag worth more points
if (title.length >= 30 && title.length <= 60) {
  score += 20; // Changed from 15
  // ...
}
```

### Add More Checks

Add custom checks in the `analyzeSEO` function:

```typescript
// Example: Check for specific aviation keywords
const hasAviationKeywords = /flight school|pilot training|aviation/i.test(html);
if (hasAviationKeywords) {
  score += 5;
  results.checks.push({
    category: "Aviation Keywords",
    status: "pass",
    message: "Aviation-specific keywords detected",
    impact: "medium",
  });
}
```

### Modify Email Gate Threshold

Currently shows preview immediately. To delay:

```javascript
// In SEOChecker.jsx, modify handleCheck:
if (data.score < 60) {
  // Only gate if score is poor
  setShowEmailGate(true);
} else {
  // Show full results for good scores
  setShowEmailGate(false);
}
```

## Analytics Tracking

### Google Analytics Events

Already tracked:

- `generate_lead` - Email capture completed

Add more tracking:

```javascript
// Track when check starts
gtag("event", "seo_check_started", {
  event_category: "SEO Checker",
  event_label: url,
});

// Track score ranges
gtag("event", "seo_score_received", {
  event_category: "SEO Checker",
  event_label: getScoreLabel(preview.level),
  value: preview.score,
});
```

### Facebook Pixel Events

Add to `SEOChecker.jsx`:

```javascript
// Track lead event
if (typeof window !== "undefined" && window.fbq) {
  window.fbq("track", "Lead", {
    content_name: "SEO Checker",
    value: fullResults.score,
    currency: "USD",
  });
}
```

## Performance Optimization

### Rate Limiting

Add to `/src/pages/api/seo-check.ts`:

```typescript
// Simple in-memory rate limiting
const rateLimitMap = new Map();

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || "unknown";
  const now = Date.now();
  const limit = 5; // requests per hour

  if (rateLimitMap.has(ip)) {
    const { count, timestamp } = rateLimitMap.get(ip);
    if (now - timestamp < 3600000 && count >= limit) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
        }),
        { status: 429 },
      );
    }
  }

  // Update rate limit
  rateLimitMap.set(ip, {
    count: (rateLimitMap.get(ip)?.count || 0) + 1,
    timestamp: now,
  });

  // Continue with existing logic...
};
```

### Caching Results

Cache results temporarily to avoid re-analyzing the same URL:

```typescript
const resultCache = new Map();

// In analyzeSEO or POST handler:
const cacheKey = url;
if (resultCache.has(cacheKey)) {
  const cached = resultCache.get(cacheKey);
  if (Date.now() - cached.timestamp < 300000) {
    // 5 min cache
    return cached.data;
  }
}

// After analysis:
resultCache.set(cacheKey, {
  data: analysis,
  timestamp: Date.now(),
});
```

## Troubleshooting

### Common Issues

**1. CORS Errors When Checking URLs**

- Some websites block scraping
- Solution: Add better error handling and user messaging

**2. Timeout on Large Pages**

- Large HTML files take time to fetch/parse
- Solution: Add timeout limit (30 seconds)

**3. Email Not Capturing**

- Check browser console for errors
- Verify CRM endpoint is accessible
- Test with network tab open

### Debug Mode

Add to component for debugging:

```javascript
const [debugMode, setDebugMode] = useState(false);

// Show raw API response
{
  debugMode && (
    <pre className="bg-gray-100 p-4 rounded overflow-auto">
      {JSON.stringify(fullResults, null, 2)}
    </pre>
  );
}
```

## Next Steps

1. **Integrate with CRM** - Choose your integration method
2. **Test Conversion Flow** - Ensure emails are captured correctly
3. **Add to Navigation** - Make tool discoverable
4. **Create Follow-up Sequence** - Email nurture campaign for leads
5. **Monitor Performance** - Track conversion rates and lead quality
6. **A/B Test** - Try different copy, form fields, score thresholds

## Support & Maintenance

### Regular Updates

- Review SEO best practices quarterly
- Update scoring criteria as Google algorithms change
- Add new checks based on industry trends

### Monitor Lead Quality

Track metrics:

- Conversion rate (visitors → email submissions)
- Lead-to-customer rate
- Average SEO score of submitted sites
- Most common issues found

## Legal Considerations

Add to page footer or near form:

- Privacy policy link
- Terms of service
- GDPR compliance statement if applicable
- CAN-SPAM compliance for email marketing

---

**Tool Created**: November 2025  
**Framework**: Astro 5.8+ with React  
**Maintained By**: Right Rudder Marketing
