/**
 * Pricing package selection logic
 * Determines which marketing package to recommend based on business inputs
 */

/**
 * Package selection logic based on aircraft count and revenue
 * Primary criterion: Aircraft count (strict ranges)
 * Secondary criterion: Revenue level for edge cases
 */

/**
 * Converts revenue string to numeric value for comparison
 * @param {string} revenueRange - Revenue range string
 * @returns {number} - Numeric value in millions
 */
function parseRevenueValue(revenueRange) {
  const revenueMap = {
    '$0-$500k': 0.5,
    '$500k-$1M': 1,
    '$1M-$3M': 3,
    '$3M-$6M': 6,
    '$6M-$10M': 10,
    '$10M+': 15
  };
  
  return revenueMap[revenueRange] || 0.5;
}

/**
 * Selects the appropriate marketing package based on business inputs
 * @param {Object} businessData - Business information from form
 * @returns {Object} - Package recommendation with details
 */
export function selectPackage(businessData) {
  const {
    aircraft,
    currentRevenue,
    targetRevenue,
    additionalLocations = 0,
    leadsPerMonth = 0,
    newStudentsPerMonth = 0,
    desiredServices = []
  } = businessData;
  
  const aircraftCount = parseInt(aircraft);
  const currentRevenueValue = parseRevenueValue(currentRevenue);
  const targetRevenueValue = parseRevenueValue(targetRevenue);
  const higherRevenue = Math.max(currentRevenueValue, targetRevenueValue);
  const additionalLocationCount = parseInt(additionalLocations) || 0;
  
  let selectedPackage;
  let packageSlug;
  let baseMonthlyCost;
  let baseAnnualCost;
  let locationAddOnCost;
  let onboardingFee;
  let reasons = [];
  
  // Primary selection based on aircraft count
  if (aircraftCount <= 3) {
    selectedPackage = 'Stick and Rudder';
    packageSlug = 'stick-and-rudder';
    baseMonthlyCost = 2690;
    baseAnnualCost = 33780;
    locationAddOnCost = 200;
    onboardingFee = 1500;
    reasons.push(`Perfect fit for ${aircraftCount} aircraft`);
    
    // Edge case: High revenue with low aircraft count
    if (higherRevenue >= 3) {
      reasons.push(`Note: Your ${targetRevenue} revenue target suggests you may benefit from our Six Pack program as you grow`);
    }
  } 
  else if (aircraftCount <= 10) {
    selectedPackage = 'Six Pack';
    packageSlug = 'six-pack';
    baseMonthlyCost = 4090;
    baseAnnualCost = 50580;
    locationAddOnCost = 300;
    onboardingFee = 1500;
    reasons.push(`Ideal for ${aircraftCount} aircraft operations`);
    
    // Edge case: Very low revenue
    if (higherRevenue < 1 && aircraftCount <= 5) {
      reasons.push(`Consider starting with Stick and Rudder and upgrading as your revenue grows`);
    }
  } 
  else if (aircraftCount <= 20) {
    selectedPackage = 'Glass Cockpit';
    packageSlug = 'glass-cockpit';
    baseMonthlyCost = 6590;
    baseAnnualCost = 80580;
    locationAddOnCost = 400;
    onboardingFee = 1500;
    reasons.push(`Designed for ${aircraftCount} aircraft fleet management`);
    
    // Check for high lead volume indicating need for advanced features
    if (parseInt(leadsPerMonth) > 50) {
      reasons.push(`Your ${leadsPerMonth} leads per month volume makes this program essential`);
    }
  } 
  else if (aircraftCount <= 40) {
    selectedPackage = 'Fly by Wire';
    packageSlug = 'fly-by-wire';
    baseMonthlyCost = 10590;
    baseAnnualCost = 128580;
    locationAddOnCost = 500;
    onboardingFee = 1500;
    reasons.push(`Premium solution for ${aircraftCount} aircraft operation`);
    
    if (higherRevenue >= 6) {
      reasons.push(`Your ${targetRevenue} revenue target aligns perfectly with this program`);
    }
  } 
  else {
    selectedPackage = 'Supersonic';
    packageSlug = 'supersonic';
    baseMonthlyCost = 16800;
    baseAnnualCost = 204100;
    locationAddOnCost = 500;
    onboardingFee = 2500;
    reasons.push(`Enterprise solution for ${aircraftCount}+ aircraft fleet`);
    
    if (higherRevenue >= 10) {
      reasons.push(`Your ${targetRevenue} revenue target requires enterprise-level marketing`);
    }
  }
  
  // Calculate costs with additional locations
  const locationCosts = additionalLocationCount * locationAddOnCost * 12; // Annual location costs
  const totalMonthlyCost = baseMonthlyCost + (additionalLocationCount * locationAddOnCost);
  const totalAnnualCost = baseAnnualCost + locationCosts;
  
  // Add location-specific reasoning
  if (additionalLocationCount > 0) {
    reasons.push(`Includes optimization for ${additionalLocationCount} additional location${additionalLocationCount > 1 ? 's' : ''}`);
  }
  
  // Add service-specific recommendations
  if (desiredServices && desiredServices.length > 0) {
    const videoProductionNeeded = desiredServices.includes('Video Production');
    const socialMediaNeeded = desiredServices.includes('Social Media');
    const pressReleasesNeeded = desiredServices.includes('Press Releases');
    
    if (videoProductionNeeded && ['Stick and Rudder', 'Six Pack'].includes(selectedPackage)) {
      reasons.push('Video production available for additional $5,000 per session');
    }
    
    if (socialMediaNeeded && !['Glass Cockpit', 'Fly by Wire', 'Supersonic'].includes(selectedPackage)) {
      reasons.push('Social media management requires Glass Cockpit or higher');
    }
    
    if (pressReleasesNeeded && selectedPackage === 'Stick and Rudder') {
      reasons.push('Press releases available for $100 each');
    }
  }
  
  // Check for upgrade recommendations
  let upgradeRecommendation = null;
  if (parseInt(leadsPerMonth) > 100 && !['Fly by Wire', 'Supersonic'].includes(selectedPackage)) {
    upgradeRecommendation = 'Consider Fly by Wire for high lead volume management';
  }
  
  if (parseInt(newStudentsPerMonth) > 20 && !['Glass Cockpit', 'Fly by Wire', 'Supersonic'].includes(selectedPackage)) {
    upgradeRecommendation = 'Glass Cockpit or higher recommended for high student enrollment';
  }
  
  return {
    package: selectedPackage,
    packageSlug,
    redirectUrl: `/pricing/${packageSlug}`,
    monthlyCost: totalMonthlyCost,
    annualCost: totalAnnualCost,
    onboardingFee,
    additionalLocationCost: additionalLocationCount * locationAddOnCost,
    locationCount: additionalLocationCount,
    reasons,
    upgradeRecommendation,
    confidence: calculateConfidence(aircraftCount, higherRevenue, businessData)
  };
}

/**
 * Calculates confidence score for the recommendation
 * @param {number} aircraftCount - Number of aircraft
 * @param {number} revenueValue - Revenue value in millions
 * @param {Object} businessData - Complete business data
 * @returns {string} - Confidence level (high/medium/low)
 */
function calculateConfidence(aircraftCount, revenueValue, businessData) {
  let score = 0;
  
  // Aircraft and revenue alignment
  if (aircraftCount <= 3 && revenueValue <= 1) score += 3;
  else if (aircraftCount <= 10 && revenueValue <= 3) score += 3;
  else if (aircraftCount <= 20 && revenueValue <= 6) score += 3;
  else if (aircraftCount <= 40 && revenueValue <= 10) score += 3;
  else if (aircraftCount > 40 && revenueValue >= 10) score += 3;
  else score += 1; // Misalignment
  
  // Additional data points increase confidence
  if (businessData.leadsPerMonth && businessData.leadsPerMonth > 0) score += 1;
  if (businessData.newStudentsPerMonth && businessData.newStudentsPerMonth > 0) score += 1;
  if (businessData.desiredServices && businessData.desiredServices.length > 0) score += 1;
  
  if (score >= 5) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

/**
 * Gets all available packages for comparison
 * @returns {Array} - Array of all package options
 */
export function getAllPackages() {
  return [
    {
      name: 'Stick and Rudder',
      slug: 'stick-and-rudder',
      aircraftRange: '1-3',
      targetRevenue: '$500k',
      monthlyCost: 2690,
      annualCost: 33780
    },
    {
      name: 'Six Pack',
      slug: 'six-pack',
      aircraftRange: '3-10',
      targetRevenue: '$1M',
      monthlyCost: 4090,
      annualCost: 50580
    },
    {
      name: 'Glass Cockpit',
      slug: 'glass-cockpit',
      aircraftRange: '10-20',
      targetRevenue: '$3M',
      monthlyCost: 6590,
      annualCost: 80580
    },
    {
      name: 'Fly by Wire',
      slug: 'fly-by-wire',
      aircraftRange: '20-40',
      targetRevenue: '$6M',
      monthlyCost: 10590,
      annualCost: 128580
    },
    {
      name: 'Supersonic',
      slug: 'supersonic',
      aircraftRange: '40-70',
      targetRevenue: '$10M+',
      monthlyCost: 16800,
      annualCost: 204100
    }
  ];
}

/**
 * Validates business data for package selection
 * @param {Object} businessData - Business form data
 * @returns {Object} - Validation result
 */
export function validateBusinessData(businessData) {
  const errors = [];
  
  if (!businessData.aircraft || isNaN(parseInt(businessData.aircraft))) {
    errors.push('Aircraft count is required');
  }
  
  if (!businessData.currentRevenue) {
    errors.push('Current revenue is required');
  }
  
  if (!businessData.targetRevenue) {
    errors.push('Target revenue is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}