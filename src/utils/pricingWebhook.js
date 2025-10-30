/**
 * GoHighLevel webhook integration for pricing estimator
 * Handles two separate webhooks following the personality quiz pattern
 */

/**
 * Submits contact details to first GHL webhook (Step 1 completion)
 * @param {Object} contactData - Contact information from Step 1
 * @param {string} webhookUrl - The webhook URL to submit to
 * @returns {Promise<Object>} - Response from webhook
 */
export async function submitContactWebhook(contactData, webhookUrl) {
  if (!webhookUrl) {
    console.warn('Webhook URL not provided');
    return {
      success: false,
      error: 'Webhook URL not configured'
    };
  }
  
  try {
    const payload = {
      name: contactData.name,
      email: contactData.email,
      businessName: contactData.businessName,
      phone: contactData.phone || '',
      source: 'pricing_estimator_step1',
      timestamp: new Date().toISOString(),
      step: 1,
      formType: 'pricing_estimator'
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Contact webhook request failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json().catch(() => ({}));
    
    return {
      success: true,
      status: response.status,
      data: result
    };
    
  } catch (error) {
    console.error('Contact webhook submission error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Submits complete data to second GHL webhook (Step 2 completion or partial)
 * @param {Object} contactData - Contact information from Step 1
 * @param {Object} businessData - Business information from Step 2
 * @param {Object} packageRecommendation - Selected package details
 * @param {boolean} isPartial - Whether this is a partial submission (abandoned checkout)
 * @param {string} webhookUrl - The webhook URL to submit to
 * @returns {Promise<Object>} - Response from webhook
 */
export async function submitCompleteWebhook(contactData, businessData, packageRecommendation = null, isPartial = false, webhookUrl) {
  if (!webhookUrl) {
    console.warn('Webhook URL not provided');
    return {
      success: false,
      error: 'Webhook URL not configured'
    };
  }
  
  try {
    const payload = {
      // Contact information
      name: contactData.name,
      email: contactData.email,
      businessName: contactData.businessName,
      phone: contactData.phone || '',
      
      // Business information
      aircraft: businessData.aircraft || null,
      currentRevenue: businessData.currentRevenue || null,
      targetRevenue: businessData.targetRevenue || null,
      leadsPerMonth: businessData.leadsPerMonth || null,
      newStudentsPerMonth: businessData.newStudentsPerMonth || null,
      additionalLocations: businessData.additionalLocations || 0,
      desiredServices: businessData.desiredServices || [],
      
      // Package recommendation (if available)
      recommendedPackage: packageRecommendation ? {
        name: packageRecommendation.package,
        slug: packageRecommendation.packageSlug,
        monthlyCost: packageRecommendation.monthlyCost,
        annualCost: packageRecommendation.annualCost,
        onboardingFee: packageRecommendation.onboardingFee,
        confidence: packageRecommendation.confidence,
        reasons: packageRecommendation.reasons,
        upgradeRecommendation: packageRecommendation.upgradeRecommendation
      } : null,
      
      // Metadata
      source: 'pricing_estimator_step2',
      timestamp: new Date().toISOString(),
      step: 2,
      formType: 'pricing_estimator',
      isPartialSubmission: isPartial,
      completionStatus: isPartial ? 'partial' : 'complete'
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Complete webhook request failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json().catch(() => ({}));
    
    return {
      success: true,
      status: response.status,
      data: result,
      isPartial
    };
    
  } catch (error) {
    console.error('Complete webhook submission error:', error);
    return {
      success: false,
      error: error.message,
      isPartial
    };
  }
}

/**
 * Creates a complete submission with package recommendation
 * @param {Object} contactData - Contact information
 * @param {Object} businessData - Complete business information
 * @param {Object} packageRecommendation - Package selection result
 * @param {string} webhookUrl - The webhook URL to submit to
 * @returns {Promise<Object>} - Submission result with redirect URL
 */
export async function submitCompleteForm(contactData, businessData, packageRecommendation, webhookUrl) {
  const result = await submitCompleteWebhook(contactData, businessData, packageRecommendation, false, webhookUrl);

  if (result.success) {
    return {
      ...result,
      redirectUrl: packageRecommendation.redirectUrl,
      packageSlug: packageRecommendation.packageSlug
    };
  }

  return result;
}

/**
 * Utility function to format data for webhook display in GHL
 * @param {Object} data - Data to format
 * @returns {string} - Formatted string for display
 */
export function formatDataForDisplay(data) {
  const lines = [];
  
  if (data.aircraft) {
    lines.push(`Aircraft: ${data.aircraft}`);
  }
  
  if (data.currentRevenue) {
    lines.push(`Current Revenue: ${data.currentRevenue}`);
  }
  
  if (data.targetRevenue) {
    lines.push(`Target Revenue: ${data.targetRevenue}`);
  }
  
  if (data.leadsPerMonth) {
    lines.push(`Leads/Month: ${data.leadsPerMonth}`);
  }
  
  if (data.newStudentsPerMonth) {
    lines.push(`New Students/Month: ${data.newStudentsPerMonth}`);
  }
  
  if (data.additionalLocations && data.additionalLocations > 0) {
    lines.push(`Additional Locations: ${data.additionalLocations}`);
  }
  
  if (data.desiredServices && data.desiredServices.length > 0) {
    lines.push(`Desired Services: ${data.desiredServices.join(', ')}`);
  }
  
  if (data.recommendedPackage) {
    lines.push(`Recommended Package: ${data.recommendedPackage.name} (${data.recommendedPackage.monthlyCost}/month)`);
  }
  
  return lines.join('\n');
}

/**
 * Test function to verify webhook configuration
 * @returns {Object} - Configuration status
 */
export function getWebhookConfig() {
  const contactWebhook = import.meta.env.GHL_PRICING_CONTACT_WEBHOOK_URL || process.env.GHL_PRICING_CONTACT_WEBHOOK_URL;
  const completeWebhook = import.meta.env.GHL_PRICING_COMPLETE_WEBHOOK_URL || process.env.GHL_PRICING_COMPLETE_WEBHOOK_URL;
  
  return {
    contactWebhookConfigured: !!contactWebhook,
    completeWebhookConfigured: !!completeWebhook,
    contactWebhookUrl: contactWebhook ? 'Configured' : 'Missing',
    completeWebhookUrl: completeWebhook ? 'Configured' : 'Missing'
  };
}