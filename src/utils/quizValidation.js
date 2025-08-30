/**
 * Quiz-specific validation utilities for the personality test
 * These are separate from existing validation to avoid breaking current forms
 */

/**
 * Validates quiz phone number with strict country code requirement
 * @param {string} phone - Phone number to validate
 * @returns {Object} - {isValid: boolean, errorMessage: string}
 */
export function validateQuizPhone(phone) {
  const phoneRegex = /^\+\d{1,3}\d{6,14}$/;
  
  if (!phone) {
    return {
      isValid: false,
      errorMessage: "Phone number is required"
    };
  }
  
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      errorMessage: "Phone must include country code (e.g., +12025550123)"
    };
  }
  
  return {
    isValid: true,
    errorMessage: ""
  };
}

/**
 * Validates quiz email format
 * @param {string} email - Email to validate
 * @returns {Object} - {isValid: boolean, errorMessage: string}
 */
export function validateQuizEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return {
      isValid: false,
      errorMessage: "Email is required"
    };
  }
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid email address"
    };
  }
  
  return {
    isValid: true,
    errorMessage: ""
  };
}

/**
 * Validates birthday in YYYY-MM-DD format
 * @param {string} birthday - Birthday to validate
 * @returns {Object} - {isValid: boolean, errorMessage: string}
 */
export function validateQuizDate(birthday) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!birthday) {
    return {
      isValid: false,
      errorMessage: "Birthday is required"
    };
  }
  
  if (!dateRegex.test(birthday)) {
    return {
      isValid: false,
      errorMessage: "Please enter date in YYYY-MM-DD format"
    };
  }
  
  // Additional check for valid date
  const date = new Date(birthday);
  if (isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== birthday) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid date"
    };
  }
  
  return {
    isValid: true,
    errorMessage: ""
  };
}

/**
 * Validates required text fields
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of field for error message
 * @returns {Object} - {isValid: boolean, errorMessage: string}
 */
export function validateRequiredField(value, fieldName) {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: `${fieldName} is required`
    };
  }
  
  return {
    isValid: true,
    errorMessage: ""
  };
}

/**
 * Validates all quiz answers are completed
 * @param {Array} answers - Array of answers (should have 30 items)
 * @returns {Object} - {isValid: boolean, errorMessage: string}
 */
export function validateQuizAnswers(answers) {
  if (!answers || answers.length !== 30) {
    return {
      isValid: false,
      errorMessage: "Please answer all personality questions"
    };
  }
  
  for (let i = 0; i < answers.length; i++) {
    if (!answers[i] || !['A', 'B', 'C', 'D'].includes(answers[i])) {
      return {
        isValid: false,
        errorMessage: `Please answer question ${i + 1}`
      };
    }
  }
  
  return {
    isValid: true,
    errorMessage: ""
  };
}

/**
 * Validates all quiz form data
 * @param {Object} formData - Complete form data object
 * @returns {Object} - {isValid: boolean, errors: Object}
 */
export function validateQuizForm(formData) {
  const errors = {};
  let isValid = true;
  
  // Validate personality answers
  const answersValidation = validateQuizAnswers(formData.answers);
  if (!answersValidation.isValid) {
    errors.answers = answersValidation.errorMessage;
    isValid = false;
  }
  
  // Validate contact info
  const nameValidation = validateRequiredField(formData.name, "Name");
  if (!nameValidation.isValid) {
    errors.name = nameValidation.errorMessage;
    isValid = false;
  }
  
  const emailValidation = validateQuizEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.errorMessage;
    isValid = false;
  }
  
  const phoneValidation = validateQuizPhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.errorMessage;
    isValid = false;
  }
  
  const birthdayValidation = validateQuizDate(formData.birthday);
  if (!birthdayValidation.isValid) {
    errors.birthday = birthdayValidation.errorMessage;
    isValid = false;
  }
  
  const countryValidation = validateRequiredField(formData.country, "Country");
  if (!countryValidation.isValid) {
    errors.country = countryValidation.errorMessage;
    isValid = false;
  }
  
  const cityValidation = validateRequiredField(formData.city, "City");
  if (!cityValidation.isValid) {
    errors.city = cityValidation.errorMessage;
    isValid = false;
  }
  
  return {
    isValid,
    errors
  };
}