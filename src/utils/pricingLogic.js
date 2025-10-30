/**
 * Pricing package selection logic
 * Determines which marketing package to recommend based on target revenue
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
 * Selects the appropriate marketing package based on target revenue only
 * @param {Object} businessData - Business information from form
 * @returns {Object} - Package recommendation with redirect URL
 */
export function selectPackage(businessData) {
  const { targetRevenue } = businessData;
  const targetRevenueValue = parseRevenueValue(targetRevenue);

  let packageSlug;

  // Package selection based purely on target revenue
  if (targetRevenueValue <= 0.5) {
    packageSlug = 'stick-and-rudder';
  }
  else if (targetRevenueValue <= 1) {
    packageSlug = 'six-pack';
  }
  else if (targetRevenueValue <= 3) {
    packageSlug = 'glass-cockpit';
  }
  else {
    packageSlug = 'fly-by-wire';
  }

  return {
    packageSlug,
    redirectUrl: `/pricing/${packageSlug}`
  };
}

