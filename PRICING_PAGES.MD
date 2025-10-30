# Pricing Estimator for Right Rudder Marketing

## Overview
This document outlines the requirements for a custom pricing estimator for Right Rudder Marketing (RRM), a pilot-owned digital marketing agency specializing in flight schools and aviation businesses. The estimator will allow prospects to input contact and business details, submit data to two GoHighLevel (GHL) webhooks (with the 1st just sending contact details (first part of the form) and second including all data to capture partial submissions for "abandoned checkout" to capture lost leads.), and be directed to a static package page (e.g., `/pricing/supersonic`) based on their inputs. The static pages are designed to replace existing program PDFs (e.g., "RRM-SticknRudder-Program 1.pdf") with web-optimized content. The solution will be built using RRM’s Astro-based infrastructure (`rrm-astro` repo) with Tailwind CSS for styling, avoiding external subscription services like PriceGuide.ai to minimize software expenses.

## Objectives
- Provide a user-friendly pricing estimator for aviation prospects (flight schools, charter operators with 1–70 aircraft).
- Capture leads via contact and business details, sending data to GHL webhooks, with partial data saved for abandoned submissions.
- Dynamically recommend one of five marketing packages (Stick and Rudder, Six Pack, Glass Cockpit, Fly by Wire, Supersonic) based on business inputs.
- Direct prospects to static package pages that replace existing PDFs, featuring pricing, FAQs, and calls-to-action, aligned with RRM’s brand voice.
- Leverage RRM’s existing Astro/Tailwind stack for cost-effective development and deployment.

## Tech Stack
- **Frontend**: Astro (static site generator, supports React/Vue components), Tailwind CSS for responsive, aviation-themed styling.
- **Backend**: JavaScript for form logic and webhook POST requests (Node.js or serverless functions if needed, integrated with RRM’s Ruby on Rails stack if applicable).
- **Lead Integration**: GoHighLevel (GHL) webhooks for contact and business data, integrated with RRM’s FSCRM.
- **Hosting**: Deployed on RRM’s existing infrastructure (e.g., AWS, Netlify) as part of `rightruddermarketing.com`.

## Pricing Packages (Reference)
Based on "Pricing Packages 2025 - Sheet1.csv":

- **Stick and Rudder**:
  - Estimated Aircraft: 1–3
  - Target Revenue: $500k
  - RRM Monthly Fee: $1,890
  - Google Ad Budget: $800
  - Other Platform Budget: $0
  - Total Monthly: $2,690
  - One-time Onboarding: $1,500
  - Total Annual: $33,780
  - Additional Companies: $1,500 one-time
  - Additional Locations: $200/month
  - Services:
    - Custom Software Dev: $1,000–$5,000
    - FSCRM Full Service: $350/month
    - Local and Industry Listings: Once a year
    - Blog Posting: 1/month
    - Press Releases: $100/ea
    - GMB Management: Yes
    - Google Ads Management: Yes
    - Meta Ads Management: No
    - Additional Ads Platforms (Hulu, Bing, Reddit, TV): No
    - SEO: Yes
    - Custom Web Dev: Yes
    - 1 Year Contract: Yes
    - Social Media Management: No
    - Video Production: $5k / session
    - Monthly Review: Yes

- **Six Pack**:
  - Estimated Aircraft: 3–10
  - Target Revenue: $1M
  - RRM Monthly Fee: $2,890
  - Google Ad Budget: $1,200
  - Other Platform Budget: $0
  - Total Monthly: $4,090
  - One-time Onboarding: $1,500
  - Total Annual: $50,580
  - Additional Companies: $1,500 one-time
  - Additional Locations: $300/month
  - Services:
    - Custom Software Dev: $1,000–$5,000
    - FSCRM Full Service: $175/month
    - Local and Industry Listings: Once a year
    - Blog Posting: 2/month
    - Press Releases: 2 / year
    - GMB Management: Yes
    - Google Ads Management: Yes
    - Meta Ads Management: No
    - Additional Ads Platforms (Hulu, Bing, Reddit, TV): No
    - SEO: Yes
    - Custom Web Dev: Yes
    - 1 Year Contract: Yes
    - Social Media Management: No
    - Video Production: $5k / session
    - Monthly Review: Yes

- **Glass Cockpit**:
  - Estimated Aircraft: 10–20
  - Target Revenue: $3M
  - RRM Monthly Fee: $3,590
  - Google Ad Budget: $2,000
  - Other Platform Budget: $1,000
  - Total Monthly: $6,590
  - One-time Onboarding: $1,500
  - Total Annual: $80,580
  - Additional Companies: $1,500 one-time
  - Additional Locations: $400/month
  - Services:
    - Custom Software Dev: Included
    - FSCRM Full Service: Included
    - Local and Industry Listings: Twice a year
    - Blog Posting: 3/month
    - Press Releases: 1 quarterly
    - GMB Management: Yes
    - Google Ads Management: Yes
    - Meta Ads Management: Yes
    - Additional Ads Platforms (Hulu, Bing, Reddit, TV): No
    - SEO: Yes
    - Custom Web Dev: Yes
    - 1 Year Contract: Yes
    - Social Media Management: Yes
    - Video Production: 1 session yearly
    - Monthly Review: Yes

- **Fly by Wire**:
  - Estimated Aircraft: 20–40
  - Target Revenue: $6M
  - RRM Monthly Fee: $5,590
  - Google Ad Budget: $3,000
  - Other Platform Budget: $2,000
  - Total Monthly: $10,590
  - One-time Onboarding: $1,500
  - Total Annual: $128,580
  - Additional Companies: $1,500 one-time
  - Additional Locations: $500/month
  - Services:
    - Custom Software Dev: Included
    - FSCRM Full Service: Included
    - Local and Industry Listings: Twice a year + additional listings
    - Blog Posting: 4/month
    - Press Releases: max 2 quarter
    - GMB Management: Yes
    - Google Ads Management: Yes
    - Meta Ads Management: Yes
    - Additional Ads Platforms (Hulu, Bing, Reddit, TV): Yes
    - SEO: Yes
    - Custom Web Dev: Yes
    - 1 Year Contract: Yes
    - Social Media Management: Yes
    - Video Production: 2 sessions yearly
    - Monthly Review: Yes

- **Supersonic**:
  - Estimated Aircraft: 40–70
  - Target Revenue: $10M
  - RRM Monthly Fee: $8,300
  - Google Ad Budget: $4,500
  - Other Platform Budget: $4,000
  - Total Monthly: $16,800
  - One-time Onboarding: $2,500
  - Total Annual: $204,100
  - Additional Companies: $1,500 one-time
  - Additional Locations: $500/month
  - Services:
    - Custom Software Dev: Included
    - FSCRM Full Service: Included
    - Local and Industry Listings: Twice a year + additional listings
    - Blog Posting: 5/month
    - Press Releases: Unlimited - recommended one per month
    - GMB Management: Yes
    - Google Ads Management: Yes
    - Meta Ads Management: Yes
    - Additional Ads Platforms (Hulu, Bing, Reddit, TV): Yes
    - SEO: Yes
    - Custom Web Dev: Yes
    - 1 Year Contract: Yes
    - Social Media Management: Yes
    - Video Production: 3 sessions yearly
    - Monthly Review: Yes

## Requirements

### 1. Navigation Bar
- **Feature**: Add a "Pricing" link to the navigation bar on `rightruddermarketing.com`.
- **Implementation**:
  - Update `src/components/Nav.astro` (or equivalent in `rrm-astro`) to include: `<a href="/pricing" class="text-blue-800 hover:text-blue-600">Pricing</a>`.
  - Use Tailwind CSS for styling (e.g., `text-blue-800`, `hover:text-blue-600`, `font-bold`).
  - Ensure responsiveness (e.g., hamburger menu on mobile with `md:flex`).
  - Example:
    ```astro
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-800">Right Rudder Marketing</a>
        <div class="md:flex space-x-4">
          <a href="/services">Services</a>
          <a href="/pricing" class="text-blue-800 hover:text-blue-600">Pricing</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </nav>
    ```

### 2. Pricing Estimator Form Page (`/pricing`)
- **URL**: `rightruddermarketing.com/pricing`
- **Purpose**: Collect contact and business details, submit to GHL webhooks, and redirect to a package page.
- **Structure**: Two-step form with Tailwind-styled UI, built as an Astro component with React for interactivity.
- **Implementation**:
  - Create `src/pages/pricing.astro` with a `<Client:load>` directive to render `src/components/EstimatorForm.jsx`.
  - Use Tailwind CSS for an aviation-themed design (e.g., `bg-gradient-to-r from-blue-600 to-blue-800`, `rounded-lg shadow-md`).
  - Form flow:
    1. **Step 1: Contact Details**
       - Fields:
         - Name (text, required)
         - Email (email, required)
         - Business Name (text, required)
         - Phone (tel, optional)
       - Validation: HTML5 validation (`required` attribute) or React state for Name, Email, Business Name.
       - Button: "Next" (`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`).
       - Action: On "Next" click, send POST request to GHL webhook 1 with contact data. Store contact data in React state for inclusion in Step 2 payload.
       - Example:
         ```jsx
         const [contactData, setContactData] = useState({});
         const handleContactSubmit = async (e) => {
           e.preventDefault();
           const data = { name, email, businessName, phone };
           setContactData(data);
           try {
             await fetch('[GHL Webhook URL 1]', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(data),
             });
             // Proceed to Step 2
           } catch (error) {
             console.error('Webhook 1 Error:', error);
             // Show error: <p class="text-red-500">Submission failed. Try again.</p>
           }
         };
         ```
    2. **Step 2: Business Details**
       - Fields:
         - Number of Aircraft (number, 1–100, required)
         - Current Annual Revenue (dropdown: $0–$500k, $500k–$1M, $1M–$3M, $3M–$6M, $6M–$10M, $10M+, required)
         - Target Annual Revenue (dropdown: same options, required)
         - Leads per Month (number, 0–500, optional)
         - New Students per Month (number, 0–100, optional, for flight schools)
         - Additional Locations (number, 0–10, optional)
         - Desired Services (checkboxes: SEO, Google Ads, Meta Ads, Social Media, Video Production, Press Releases, optional)
       - Validation: Ensure Aircraft and Current/Target Revenue are required.
       - Button: "Get Quote" (`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`).
       - Action: On "Get Quote" click, send POST request to GHL webhook 2 with contact + business data, then redirect to a static package page (e.g., `/pricing/supersonic`).
       - Abandoned Checkout: On field change or inactivity (30 seconds), send partial Step 2 data (combined with Step 1 contact data) to webhook 2 to capture incomplete submissions.
       - Example:
         ```jsx
         const [businessData, setBusinessData] = useState({});
         let timeout;
         const handleFieldChange = (field, value) => {
           setBusinessData({ ...businessData, [field]: value });
           clearTimeout(timeout);
           timeout = setTimeout(async () => {
             try {
               await fetch('[GHL Webhook URL 2]', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ ...contactData, ...businessData }),
               });
             } catch (error) {
               console.error('Webhook 2 Partial Error:', error);
             }
           }, 30000); // Send after 30s inactivity
         };
         const handleBusinessSubmit = async (e) => {
           e.preventDefault();
           try {
             await fetch('[GHL Webhook URL 2]', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ ...contactData, ...businessData }),
             });
             const { redirectUrl } = selectPackage(businessData);
             window.location.href = redirectUrl;
           } catch (error) {
             console.error('Webhook 2 Error:', error);
             // Show error: <p class="text-red-500">Submission failed. Try again.</p>
           }
         };
         ```

### 3. GHL Webhook Integration
- **First Webhook (Contact Details)**:
  - **URL**: `[GHL Webhook URL 1]` (to be provided by RRM).
  - **Payload**: JSON with `{ name, email, businessName, phone }`.
  - **Example**:
    ```json
    {
      "name": "John Doe",
      "email": "john@flight.com",
      "businessName": "SkyHigh Aviation",
      "phone": "123-456-7890"
    }
    ```
  - **Purpose**: Capture initial lead data to ensure partial submissions are saved if Step 2 is abandoned.
  - **Implementation**: Send on "Next" click in Step 1.

- **Second Webhook (Contact + Business Details)**:
  - **URL**: `[GHL Webhook URL 2]` (to be provided by RRM).
  - **Payload**: JSON with all fields: `{ name, email, businessName, phone, aircraft, currentRevenue, targetRevenue, leadsPerMonth, newStudentsPerMonth, additionalLocations, desiredServices }`.
  - **Example**:
    ```json
    {
      "name": "John Doe",
      "email": "john@flight.com",
      "businessName": "SkyHigh Aviation",
      "phone": "123-456-7890",
      "aircraft": 10,
      "currentRevenue": "1M-3M",
      "targetRevenue": "3M-6M",
      "leadsPerMonth": 50,
      "newStudentsPerMonth": 10,
      "additionalLocations": 1,
      "desiredServices": ["SEO", "Google Ads", "Social Media"]
    }
    ```
  - **Purpose**: Capture full or partial data (for abandoned checkouts) to maximize lead retention.
  - **Implementation**:
    - Send full payload on "Get Quote" click.
    - Send partial payload (contact + any filled business fields) on inactivity (30 seconds) or field change to capture abandoned checkouts.
    - Use `onBlur` or `setTimeout` to trigger partial submissions:
      ```javascript
      // In EstimatorForm.jsx
      let timeout;
      const handleFieldChange = (field, value) => {
        setBusinessData({ ...businessData, [field]: value });
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          try {
            await fetch('[GHL Webhook URL 2]', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...contactData, ...businessData }),
            });
          } catch (error) {
            console.error('Webhook 2 Partial Error:', error);
          }
        }, 30000);
      };
      ```

### 4. Package Selection Logic
- **Purpose**: Map form inputs to one of five packages based on CSV data.
- **Logic** (in `src/lib/pricing.js`):
  - **Primary Criterion**: Number of aircraft (strict ranges per CSV).
  - **Secondary Criterion**: Higher of current or target revenue to handle edge cases.
  - **Additional Costs**: Include additional locations ($200–$500/month) and desired services (e.g., video production: $5,000/session for lower tiers).
  - **Example**:
    ```javascript
    function selectPackage({ aircraft, currentRevenue, targetRevenue, additionalLocations, desiredServices }) {
      const revenue = Math.max(parseRevenue(currentRevenue), parseRevenue(targetRevenue));
      let package, baseCost, locationAddOn, onboarding;

      if (aircraft <= 3) {
        package = 'stick-and-rudder';
        baseCost = 2690;
        locationAddOn = 200;
        onboarding = 1500;
      } else if (aircraft <= 10) {
        package = 'six-pack';
        baseCost = 4090;
        locationAddOn = 300;
        onboarding = 1500;
      } else if (aircraft <= 20) {
        package = 'glass-cockpit';
        baseCost = 6590;
        locationAddOn = 400;
        onboarding = 1500;
      } else if (aircraft <= 40) {
        package = 'fly-by-wire';
        baseCost = 10590;
        locationAddOn = 500;
        onboarding = 1500;
      } else {
        package = 'supersonic';
        baseCost = 16800;
        locationAddOn = 500;
        onboarding = 2500;
      }

      const totalMonthly = baseCost + additionalLocations * locationAddOn;
      const totalAnnual = totalMonthly * 12 + onboarding;
      let addOns = 0;
      if (desiredServices.includes('Video Production') && ['stick-and-rudder', 'six-pack'].includes(package)) {
        addOns += 5000;
      }
      if (desiredServices.includes('Press Releases') && package === 'stick-and-rudder') {
        addOns += 100; // Per press release
      }

      return {
        package,
        monthlyCost: totalMonthly,
        annualCost: totalAnnual + addOns,
        redirectUrl: `/pricing/${package}`
      };
    }

    function parseRevenue(revenue) {
      const ranges = {
        '0-500k': 0.5,
        '500k-1M': 1,
        '1M-3M': 3,
        '3M-6M': 6,
        '6M-10M': 10,
        '10M+': 15
      };
      return ranges[revenue] || 0.5;
    }
    ```
  - **Edge Cases**:
    - If aircraft = 3 but revenue = $6M, select Six Pack (3–10 aircraft) but note revenue mismatch in GHL data for follow-up.
    - If leadsPerMonth > 100 or newStudentsPerMonth > 20, suggest a higher package (e.g., Glass Cockpit over Six Pack) to match marketing needs.

### 5. Static Package Pages
- **URLs**:
  - `/pricing/stick-and-rudder`
  - `/pricing/six-pack`
  - `/pricing/glass-cockpit`
  - `/pricing/fly-by-wire`
  - `/pricing/supersonic`
- **Purpose**: Display package details, pricing, FAQs, and a call-to-action, replacing existing PDFs (e.g., "RRM-SticknRudder-Program 1.pdf") with web-optimized content.
- **Implementation**:
  - Create `src/pages/pricing/[package].astro` using Astro’s dynamic routing.
  - Content:
    - Package name, monthly/annual cost, onboarding fee.
    - Services (e.g., “3 blogs/month, 1 video session/year” for Glass Cockpit).
    - FAQs (e.g., “What does SEO include?”, “Why a 1-year contract?”).
    - Contact form or button linking to GHL scheduling.
  - Example (`src/pages/pricing/stick-and-rudder.astro`):
    ```astro
    ---
    const packageData = {
      name: 'Stick and Rudder',
      monthlyCost: '$2,690',
      annualCost: '$33,780',
      onboarding: '$1,500',
      aircraft: '1–3',
      revenue: '$500k',
      services: ['Custom Software Dev: $1,000–$5,000', 'FSCRM Full Service: $350/month', 'Local and Industry Listings: Once a year', 'Blog Posting: 1/month', 'Press Releases: $100/ea', 'GMB Management', 'Google Ads Management', 'SEO', 'Custom Web Dev', '1 Year Contract', 'Video Production: $5k/session', 'Monthly Review'],
      faqs: [
        { q: 'What does GMB Management include?', a: 'Optimizing your Google My Business profile for local visibility.' },
        { q: 'Why a 1-year contract?', a: 'Ensures time for marketing efforts to deliver results.' }
      ]
    };
    ---
    <html lang="en">
      <head>
        <title>{packageData.name} Program | Right Rudder Marketing</title>
        <meta name="description" content="Marketing program for flight schools with 1–3 aircraft and under $500k revenue." />
      </head>
      <body class="bg-gray-100">
        <section class="container mx-auto py-8">
          <h1 class="text-3xl font-bold text-blue-800">{packageData.name}</h1>
          <p class="text-xl">For {packageData.aircraft} aircraft, targeting {packageData.revenue} revenue</p>
          <p>Monthly: {packageData.monthlyCost} | Annual: {packageData.annualCost}</p>
          <p>Onboarding: {packageData.onboarding}</p>
          <h2 class="text-2xl mt-4">Services</h2>
          <ul class="list-disc pl-6">
            {packageData.services.map(service => <li>{service}</li>)}
          </ul>
          <h2 class="text-2xl mt-4">FAQs</h2>
          {packageData.faqs.map(faq => (
            <div class="my-4">
              <h3 class="text-lg font-semibold">{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
          <a href="/contact" class="bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block">Schedule a Consultation</a>
        </section>
      </body>
    </html>
    ```
  - **Styling**: Tailwind CSS (e.g., `container mx-auto`, `bg-blue-600` buttons).

### 6. Copywriting Guidance for Static Package Pages
- **Purpose**: Ensure static package pages replace existing PDFs (e.g., "RRM-SticknRudder-Program 1.pdf") with content that maintains RRM’s brand voice, structure, and intent, optimized for web delivery.
- **General Guidelines**:
  - **Tone**: Use a professional yet approachable tone, reflecting the PDF’s emphasis on partnership (e.g., “We’re in this together like two best friends in business”). Incorporate aviation-inspired language (e.g., “take flight,” “navigate growth”) to align with RRM’s pilot-owned identity.
  - **Structure**: Mirror the PDF’s sections (e.g., Expectations, Onboarding, Additional Growth, New Customer Acquisition, Pricing & Fees) to provide a familiar flow for prospects transitioning from the PDF.
  - **Length**: Keep content concise (300–500 words per page) to suit web reading, summarizing PDF details while linking to deeper resources (e.g., contact page for details).
  - **Call-to-Action (CTA)**: Include a prominent CTA (e.g., “Schedule a Consultation”) with a GHL-integrated link, as per the PDF’s focus on direct engagement.

- **Specific Guidance by Section** (Based on Stick & Rudder PDF, adaptable to other packages):
  1. **Header and Introduction**:
     - Use the package name as the H1 (e.g., “Stick & Rudder Program”).
     - Summarize the PDF’s opening pitch: “Struggling to manage marketing while running your flight school? Right Rudder’s Stick & Rudder Program takes the lead, handling new customer acquisition, upselling, and talent attraction so you can focus on growth. With our expert team and monthly reviews, we’re your partner in scaling to $1M+ revenue.”
     - Include RRM contact info (4411 Woodson Rd. Suite 101A, St. Louis, MO 63134, (314) 804-1200, info@rightruddermarketing.com) in a footer or sidebar.

  2. **Expectations**:
     - Adapt the PDF’s “Understanding How It Works”: “Unlike traditional agencies, Right Rudder acts as your consulting marketing partner. For flight schools with 1–3 aircraft and under $500k revenue, the Stick & Rudder Program is your tailored growth path. Expect us to lead with a strategy based on aviation expertise, requiring a 12-month commitment and an upgrade to the Six Pack Program once revenue hits $500k.”
     - Emphasize partnership: “We’ll collaborate closely, guiding your team and measuring results to ensure success.”

  3. **Onboarding**:
     - Reflect the PDF’s details: “Our 30-day onboarding includes a 3–4 hour Business Deep-Dive call to understand your brand, access setup for online accounts and assets, and weekly checkpoints to kickstart your marketing.”
     - Use bullet points for clarity (e.g., “✔ Business Deep-Dive,” “✔ Weekly Checkpoints”).

  4. **Additional Growth**:
     - Summarize: “Post-onboarding, enjoy monthly review calls to refine your marketing plan, plus data tracking and reporting with basic training provided during onboarding.”
     - Highlight value: “Stay on track with actionable insights from our aviation experts.”

  5. **New Customer Acquisition**:
     - Detail services: “Get a free, technically sound website with 8 core pages, 12 annual content pieces (blogs, case studies), Google My Business optimization, quarterly customer review requests, and updated local business listings to boost visibility.”
     - Focus on flight school benefits: “Attract more student pilots with a strong online presence.”

  6. **Pricing & Fees**:
     - List exactly as in the PDF: “Service Fee: $14,400 annually ($1,200/month). Onboarding Fee: $1,500 one-time. Ad Spend Budget: $9,600 annually ($800/month), paid directly to ad platforms. Minimum Commitment: 12 months.”
     - Clarify: “Ad spend is your investment in platforms like Google Ads, managed by RRM.”

  7. **FAQs**:
     - Include PDF-inspired questions: “What’s included in onboarding?” (Answer: 3–4 hour deep-dive, access setup, weekly calls). “How fast will I grow?” (Answer: Aimed at $1M revenue within 12 months).
     - Add web-specific FAQs: “Can I add locations?” (Answer: Yes, $200/month per additional location).

- **Adaptation for Other Packages**:
  - **Six Pack**: Adjust aircraft (3–10), revenue ($1M), and services (e.g., 2 blogs/month, 2 press releases/year).
  - **Glass Cockpit**: Update for 10–20 aircraft, $3M revenue, and added social media/Meta Ads.
  - **Fly by Wire**: Reflect 20–40 aircraft, $6M revenue, and additional ad platforms.
  - **Supersonic**: Tailor for 40–70 aircraft, $10M revenue, and unlimited press releases.
  - Scale onboarding, growth, and acquisition details (e.g., more video sessions, blogs) based on CSV services.

- **SEO Optimization**:
  - Use keywords from the PDF (e.g., “flight school marketing,” “student pilot acquisition”) in titles, meta descriptions, and headers.
  - Example meta: `<meta name="description" content="Stick & Rudder Program for flight schools with 1–3 aircraft, offering website development and Google My Business optimization." />`

- **Visual Design**:
  - Use Tailwind classes (e.g., `text-blue-800`, `bg-gray-100`) to match the PDF’s clean, professional look.
  - Add aviation-themed icons (e.g., airplane emojis: 🚀) sparingly, as in the PDF.

### 7. User Flow
1. User clicks “Pricing” in nav bar (`/pricing`).
2. User completes Step 1 (contact details), submits to GHL webhook 1, proceeds to Step 2.
3. User starts Step 2 (business details). Partial data is sent to GHL webhook 2 on inactivity (30 seconds) or field change. On “Get Quote,” full data is sent to webhook 2, and user is redirected to a package page (e.g., `/pricing/glass-cockpit`).
4. User views package details, FAQs, and contacts RRM via a GHL-linked form.

### 8. Abandoned Checkout Handling
- **Purpose**: Capture partial Step 2 data to retain leads if prospects abandon the form.
- **Implementation**:
  - Store contact data (Step 1) in React state to include in all webhook 2 payloads.
  - Trigger partial webhook 2 submissions on:
    - Field change (`onBlur` event for each input).
    - Inactivity (30-second timeout after last input).
  - Ensure partial payloads include all available data (e.g., contact + any filled business fields).
  - Example: If a user enters 10 aircraft and stops, send:
    ```json
    {
      "name": "John Doe",
      "email": "john@flight.com",
      "businessName": "SkyHigh Aviation",
      "phone": "123-456-7890",
      "aircraft": 10
    }
    ```

### 9. Additional Considerations
- **Performance**: Astro’s static generation ensures fast load times. Use `<Client:load>` only for the form to keep `/pricing` lightweight.
- **Analytics**: Track form submissions, partial submissions, and redirects using GHL or Google Analytics (e.g., events for “Step 1 Submitted,” “Partial Step 2 Sent”).
- **Testing**: Test scenarios:
  - Small school: 2 aircraft, $500k revenue, 1 location → `/pricing/stick-and-rudder`.
  - Large school: 50 aircraft, $10M revenue, 3 locations → `/pricing/supersonic`.
  - Partial submission: Enter contact details + 5 aircraft, abandon → Webhook 2 captures partial data.
- **Accessibility**: Add ARIA labels (e.g., `aria-label="Number of aircraft"`) and ensure keyboard navigation.
- **Error Handling**: Display messages for webhook failures or invalid inputs (e.g., `text-red-500`: “Please enter a valid email”).

## Deliverables
- Updated `Nav.astro` with “Pricing” link.
- `pricing.astro` page with two-step form (`EstimatorForm.jsx`).
- `pricing.js` for package selection logic.
- Static package pages (`/pricing/[package].astro`) replacing PDFs.
- Webhook integration scripts for GHL (full and partial submissions).
- Tailwind-styled, aviation-themed UI with copywriting guidance.

## Timeline
- **Week 1**: Update nav, design form UI, implement webhook 1.
- **Week 2**: Add Step 2 form, webhook 2 (full + partial), package selection logic.
- **Week 3**: Create static package pages with copywriting, test redirects and partial submissions.
- **Week 4**: Final testing, UI refinements, deployment.

## Notes
- **GHL Webhooks**: RRM must provide webhook URLs for both submissions.
- **Package Appeal**: Consider a “Basic Aviator” package ($1,000–$1,500/month) for smaller schools to broaden appeal.
- **ROI Transparency**: Add metrics to package pages (e.g., “20% more inquiries for Glass Cockpit”).
- **Abandoned Checkout**: Partial submissions ensure lead capture, enhancing GHL integration.
- **Astro Structure**: Use `rrm-astro`’s `src/components`, `src/pages` for consistency.

## Next Steps
- Provide GHL webhook URLs.
- Confirm additional form fields or copywriting tweaks.
- Assign developer to prototype `EstimatorForm.jsx`.
- Review package pricing for alignment with PDF (e.g., Stick & Rudder service fee vs. CSV total).



Here is Claude's plan:                                                                                           │
│ ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────╮ │
│ │ Pricing Estimator Implementation Plan                                                                        │ │
│ │                                                                                                              │ │
│ │ Phase 1: Static Infrastructure Setup                                                                         │ │
│ │                                                                                                              │ │
│ │ 1. Navigation Setup                                                                                          │ │
│ │   - Add "Pricing" link to src/data/navbarLinks.js and src/data/mobileNavbarLinks.js                          │ │
│ │   - Create placeholder /pricing page (empty, just functional nav link)                                       │ │
│ │ 2. Static Package Pages                                                                                      │ │
│ │   - Create 5 package pages using dynamic routing src/pages/pricing/[package].astro:                          │ │
│ │       - /pricing/stick-and-rudder (1-3 aircraft, $500k revenue)                                              │ │
│ │     - /pricing/six-pack (3-10 aircraft, $1M revenue)                                                         │ │
│ │     - /pricing/glass-cockpit (10-20 aircraft, $3M revenue)                                                   │ │
│ │     - /pricing/fly-by-wire (20-40 aircraft, $6M revenue)                                                     │ │
│ │     - /pricing/supersonic (40-70 aircraft, $10M revenue)                                                     │ │
│ │   - Each page includes: pricing details, service breakdowns, aviation-themed FAQs, "Schedule a Consultation" │ │
│ │  CTA                                                                                                         │ │
│ │   - Use Tailwind styling consistent with your aviation brand                                                 │ │
│ │                                                                                                              │ │
│ │ Phase 2: Form System Development                                                                             │ │
│ │                                                                                                              │ │
│ │ 3. Utility Functions (following personality quiz patterns)                                                   │ │
│ │   - src/utils/pricingValidation.js - Real-time validation with immediate error feedback:                     │ │
│ │       - validateEmail() - same regex as personality quiz                                                     │ │
│ │     - validateUSPhone() - XXX-XXX-XXXX pattern (US-only, no country codes)                                   │ │
│ │     - validateRequired() - non-empty field validation                                                        │ │
│ │     - validateBusinessInputs() - aircraft count, revenue ranges                                              │ │
│ │   - src/utils/pricingLogic.js - Package selection based on aircraft count + revenue                          │ │
│ │   - src/utils/pricingWebhook.js - GHL integration (2 separate webhooks)                                      │ │
│ │ 4. Interactive Pricing Form at /pricing                                                                      │ │
│ │   - Two-step form with real-time validation:                                                                 │ │
│ │       - Step 1: Contact details (name, email, business, phone) → GHL webhook 1                               │ │
│ │     - Step 2: Business details (aircraft, revenue, leads/month, etc.) → GHL webhook 2                        │ │
│ │   - Abandoned checkout tracking (30s timeout sends partial data to webhook 2)                                │ │
│ │   - Auto-redirect to appropriate package page based on form inputs                                           │ │
│ │                                                                                                              │ │
│ │ Phase 3: Integration & Testing                                                                               │ │
│ │                                                                                                              │ │
│ │ 5. Final Integration                                                                                         │ │
│ │   - Connect form selection logic to static package pages                                                     │ │
│ │   - Test both GHL webhooks and abandoned checkout functionality                                              │ │
│ │   - Verify redirects work correctly for all package combinations                                             │ │
│ │   - Final UX polish and styling                                                                              │ │
│ │                                                                                                              │ │
│ │ This approach provides immediate value with shareable static pages while building toward the full            │ │
│ │ interactive pricing experience.   