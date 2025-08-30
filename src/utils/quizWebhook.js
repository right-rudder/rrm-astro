/**
 * GoHighLevel webhook integration for personality quiz submissions
 */

/**
 * Submits quiz results to GoHighLevel webhook
 * @param {Object} submissionData - Complete submission data
 * @returns {Promise<Object>} - Response from webhook
 */
export async function submitToWebhook(submissionData) {
  const webhookUrl = import.meta.env.GHL_PERSONALITY_QUIZ_WEBHOOK_URL || process.env.GHL_PERSONALITY_QUIZ_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('GHL_PERSONALITY_QUIZ_WEBHOOK_URL environment variable is not configured');
  }
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });
    
    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json().catch(() => ({}));
    
    return {
      success: true,
      status: response.status,
      data: result
    };
    
  } catch (error) {
    console.error('Webhook submission error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Formats quiz results for webhook submission
 * @param {Object} contactInfo - Contact information
 * @param {Object} results - Quiz results from scoring
 * @param {string} resultsUrl - URL to results page
 * @returns {Object} - Formatted payload for webhook
 */
export function formatWebhookPayload(contactInfo, results, resultsUrl) {
  return {
    name: contactInfo.name,
    phone: contactInfo.phone,
    email: contactInfo.email,
    birthday: contactInfo.birthday,
    country: contactInfo.country,
    city: contactInfo.city,
    results: {
      kolbe: {
        dominant: results.kolbe.dominant,
        percentages: results.kolbe.percentages
      },
      mbti: {
        type: results.mbti.type,
        percentages: results.mbti.percentages
      },
      disc: {
        primary: results.disc.primaryLetter,
        percentages: results.disc.percentages
      }
    },
    results_url: resultsUrl
  };
}

/**
 * Complete submission process - format data and send to webhook
 * @param {Object} formData - All form data including contact info and answers
 * @param {Object} quizResults - Calculated quiz results
 * @param {string} resultsUrl - URL to results page
 * @returns {Promise<Object>} - Submission result
 */
export async function submitQuizResults(formData, quizResults, resultsUrl) {
  const contactInfo = {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    birthday: formData.birthday,
    country: formData.country,
    city: formData.city
  };
  
  const payload = formatWebhookPayload(contactInfo, quizResults, resultsUrl);
  
  return await submitToWebhook(payload);
}