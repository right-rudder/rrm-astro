/**
 * International Phone Number Validation and Formatting
 *
 * This script provides validation and formatting for international phone numbers.
 * It enforces minimum and maximum length requirements and handles proper formatting.
 */

// Configuration options
const PHONE_CONFIG = {
  minLength: 10, // Minimum valid length (excluding formatting characters)
  maxLength: 15, // Maximum valid length (excluding formatting characters, per E.164 standard)
  allowedChars: /^[0-9+\-\s()]*$/, // Only allow numbers, +, -, spaces, and parentheses
};

/**
 * Attaches phone validation and formatting to a phone input field
 *
 * @param {string} inputId - The ID of the input element to attach validation to
 */
function initPhoneValidation(inputId = "phone") {
  const phoneInput = document.getElementById(inputId);

  if (!phoneInput) {
    console.warn(`Phone input with id '${inputId}' not found.`);
    return;
  }

  // Store the last valid value
  let lastValidValue = "";

  phoneInput.addEventListener("input", function () {
    const input = this.value;

    // Check if input contains only allowed characters
    if (!PHONE_CONFIG.allowedChars.test(input)) {
      this.value = lastValidValue;
      this.setCustomValidity(
        "Please use only numbers, +, -, spaces, and parentheses."
      );
      return;
    }

    // Format the phone number
    const formatted = formatPhoneNumber(input);

    // Update the input with formatted value
    if (formatted !== input) {
      this.value = formatted;
    }

    // Validate length (strip non-numeric chars for validation)
    const digitsOnly = formatted.replace(/\D/g, "");

    if (digitsOnly.length < PHONE_CONFIG.minLength) {
      this.setCustomValidity(
        `Phone number must be at least ${PHONE_CONFIG.minLength} digits.`
      );
    } else if (digitsOnly.length > PHONE_CONFIG.maxLength) {
      this.setCustomValidity(
        `Phone number must not exceed ${PHONE_CONFIG.maxLength} digits.`
      );
    } else {
      this.setCustomValidity("");
      lastValidValue = formatted;
    }
  });

  // Also validate on blur to ensure proper validation state
  phoneInput.addEventListener("blur", function () {
    const digitsOnly = this.value.replace(/\D/g, "");

    if (digitsOnly.length < PHONE_CONFIG.minLength) {
      this.setCustomValidity(
        `Phone number must be at least ${PHONE_CONFIG.minLength} digits.`
      );
    } else if (digitsOnly.length > PHONE_CONFIG.maxLength) {
      this.setCustomValidity(
        `Phone number must not exceed ${PHONE_CONFIG.maxLength} digits.`
      );
    } else {
      this.setCustomValidity("");
    }
  });
}

/**
 * Formats a phone number with proper spacing and grouping
 *
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - The formatted phone number
 */
function formatPhoneNumber(phoneNumber) {
  // First, preserve the plus sign if it exists at the beginning
  let hasPlus = phoneNumber.startsWith("+");

  // Remove all non-digit characters for processing
  let digitsOnly = phoneNumber.replace(/\D/g, "");

  // Automatically add plus sign for numbers longer than 10 digits if not already there
  if (digitsOnly.length > 10 && !hasPlus) {
    hasPlus = true;
  }

  // Different formatting based on length and whether it has a country code
  if (hasPlus) {
    // Format with country code - use general international format
    // Add the plus sign back
    if (digitsOnly.length <= 3) {
      // Just the country code or part of it
      return "+" + digitsOnly;
    } else if (digitsOnly.length <= 6) {
      // Country code + first few digits
      return "+" + digitsOnly.substring(0, 3) + " " + digitsOnly.substring(3);
    } else if (digitsOnly.length <= 10) {
      // Full international format with spacing
      return (
        "+" +
        digitsOnly.substring(0, 3) +
        " " +
        digitsOnly.substring(3, 6) +
        " " +
        digitsOnly.substring(6)
      );
    } else {
      // Longer numbers - group in chunks of 3 or 4
      let formatted = "+" + digitsOnly.substring(0, 3) + " ";
      let remaining = digitsOnly.substring(3);

      // Group the remaining digits in chunks of 3
      while (remaining.length > 0) {
        if (remaining.length <= 3) {
          formatted += remaining;
          remaining = "";
        } else {
          formatted += remaining.substring(0, 3) + " ";
          remaining = remaining.substring(3);
        }
      }

      return formatted;
    }
  } else {
    // Format without country code - use more standard grouping
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 7) {
      return digitsOnly.substring(0, 3) + "-" + digitsOnly.substring(3);
    } else if (digitsOnly.length <= 10) {
      return (
        "(" +
        digitsOnly.substring(0, 3) +
        ") " +
        digitsOnly.substring(3, 6) +
        "-" +
        digitsOnly.substring(6)
      );
    } else {
      // This should not happen now with our new auto-plus logic,
      // but keeping as fallback
      let formatted = "+";
      let remaining = digitsOnly;

      // Group in chunks of 3
      while (remaining.length > 0) {
        if (remaining.length <= 3) {
          formatted += remaining;
          remaining = "";
        } else {
          formatted += remaining.substring(0, 3) + " ";
          remaining = remaining.substring(3);
        }
      }

      return formatted;
    }
  }
}

// Auto-initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initPhoneValidation();
});

// Export functions for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initPhoneValidation,
    formatPhoneNumber,
    PHONE_CONFIG,
  };
}
