/**
 * Pricing form validation utilities
 * Based on personality quiz validation patterns but adapted for pricing form needs
 */

/**
 * Validates email format using the same regex as personality quiz
 * @param {string} email - Email address to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email.trim())) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }
  
  return {
    isValid: true,
    error: ''
  };
}

/**
 * Validates US phone number format (XXX-XXX-XXXX)
 * @param {string} phone - Phone number to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateUSPhone(phone) {
  if (!phone || phone.trim() === '') {
    return {
      isValid: false,
      error: 'Phone number is required'
    };
  }
  
  // Remove all non-numeric characters for validation
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's exactly 10 digits
  if (cleanPhone.length !== 10) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number (XXX-XXX-XXXX)'
    };
  }
  
  // Check if it starts with 1 (which would make it 11 digits with country code)
  if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
    return {
      isValid: false,
      error: 'Please enter phone number without country code (XXX-XXX-XXXX)'
    };
  }
  
  return {
    isValid: true,
    error: ''
  };
}

/**
 * Validates required text fields
 * @param {string} value - Field value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }
  
  return {
    isValid: true,
    error: ''
  };
}

/**
 * Validates aircraft count
 * @param {number|string} aircraft - Number of aircraft
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateAircraft(aircraft) {
  const num = parseInt(aircraft);
  
  if (!aircraft || isNaN(num)) {
    return {
      isValid: false,
      error: 'Number of aircraft is required'
    };
  }
  
  if (num < 1 || num > 100) {
    return {
      isValid: false,
      error: 'Please enter a valid number of aircraft (1-100)'
    };
  }
  
  return {
    isValid: true,
    error: ''
  };
}

/**
 * Validates revenue selection
 * @param {string} revenue - Selected revenue range
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateRevenue(revenue) {
  const validRanges = [
    '$0-$500k',
    '$500k-$1M',
    '$1M-$3M',
    '$3M-$6M',
    '$6M-$10M',
    '$10M+'
  ];
  
  if (!revenue || !validRanges.includes(revenue)) {
    return {
      isValid: false,
      error: 'Please select your revenue range'
    };
  }
  
  return {
    isValid: true,
    error: ''
  };
}

/**
 * Validates optional numeric field
 * @param {number|string} value - Numeric value to validate
 * @param {string} fieldName - Name of the field
 * @param {number} max - Maximum allowed value
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateOptionalNumeric(value, fieldName, max = 1000) {
  // Optional field - empty is valid
  if (!value || value === '') {
    return {
      isValid: true,
      error: ''
    };
  }
  
  const num = parseInt(value);
  
  if (isNaN(num)) {
    return {
      isValid: false,
      error: `${fieldName} must be a valid number`
    };
  }
  
  if (num < 0 || num > max) {
    return {
      isValid: false,
      error: `${fieldName} must be between 0 and ${max}`
    };
  }
  
  return {
    isValid: true,
    error: ''
  };
}

/**
 * Validates all Step 1 contact fields
 * @param {Object} contactData - Contact form data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateStep1(contactData) {
  const errors = {};
  let isValid = true;
  
  // Validate name
  const nameValidation = validateRequired(contactData.name, 'Name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
    isValid = false;
  }
  
  // Validate email
  const emailValidation = validateEmail(contactData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  }
  
  // Validate business name
  const businessValidation = validateRequired(contactData.businessName, 'Business name');
  if (!businessValidation.isValid) {
    errors.businessName = businessValidation.error;
    isValid = false;
  }
  
  // Validate phone (required)
  const phoneValidation = validateUSPhone(contactData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
    isValid = false;
  }
  
  return {
    isValid,
    errors
  };
}

/**
 * Validates all Step 2 business fields
 * @param {Object} businessData - Business form data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateStep2(businessData) {
  const errors = {};
  let isValid = true;
  
  // Validate aircraft count (required)
  const aircraftValidation = validateAircraft(businessData.aircraft);
  if (!aircraftValidation.isValid) {
    errors.aircraft = aircraftValidation.error;
    isValid = false;
  }
  
  // Validate current revenue (required)
  const currentRevenueValidation = validateRevenue(businessData.currentRevenue);
  if (!currentRevenueValidation.isValid) {
    errors.currentRevenue = currentRevenueValidation.error;
    isValid = false;
  }
  
  // Validate target revenue (required)
  const targetRevenueValidation = validateRevenue(businessData.targetRevenue);
  if (!targetRevenueValidation.isValid) {
    errors.targetRevenue = targetRevenueValidation.error;
    isValid = false;
  }
  
  // Validate optional fields
  const leadsValidation = validateOptionalNumeric(businessData.leadsPerMonth, 'Leads per month', 500);
  if (!leadsValidation.isValid) {
    errors.leadsPerMonth = leadsValidation.error;
    isValid = false;
  }
  
  const studentsValidation = validateOptionalNumeric(businessData.newStudentsPerMonth, 'New students per month', 100);
  if (!studentsValidation.isValid) {
    errors.newStudentsPerMonth = studentsValidation.error;
    isValid = false;
  }
  
  const locationsValidation = validateOptionalNumeric(businessData.additionalLocations, 'Additional locations', 10);
  if (!locationsValidation.isValid) {
    errors.additionalLocations = locationsValidation.error;
    isValid = false;
  }
  
  return {
    isValid,
    errors
  };
}

/**
 * Formats phone number to XXX-XXX-XXXX format
 * @param {string} phone - Raw phone input
 * @returns {string} - Formatted phone number
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  return phone; // Return original if not 10 digits
}