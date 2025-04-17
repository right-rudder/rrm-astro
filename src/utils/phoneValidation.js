/**
 * React-specific phone validation utilities
 */

// Configuration options
export const PHONE_CONFIG = {
  minLength: 10, // Minimum valid length (excluding formatting characters)
  maxLength: 15, // Maximum valid length (excluding formatting characters, per E.164 standard)
  allowedChars: /^[0-9+\-\s()]*$/, // Only allow numbers, +, -, spaces, and parentheses
};

/**
 * Formats a phone number with proper spacing and grouping
 *
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - The formatted phone number
 */
export function formatPhoneNumber(phoneNumber) {
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

/**
 * Validates a phone number
 *
 * @param {string} phoneNumber - The phone number to validate
 * @returns {Object} - Validation result with isValid and errorMessage properties
 */
export function validatePhoneNumber(phoneNumber) {
  if (!PHONE_CONFIG.allowedChars.test(phoneNumber)) {
    return {
      isValid: false,
      errorMessage: "Please use only numbers, +, -, spaces, and parentheses.",
    };
  }

  // Validate length (strip non-numeric chars for validation)
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  if (digitsOnly.length < PHONE_CONFIG.minLength) {
    return {
      isValid: false,
      errorMessage: `Phone number must be at least ${PHONE_CONFIG.minLength} digits.`,
    };
  } else if (digitsOnly.length > PHONE_CONFIG.maxLength) {
    return {
      isValid: false,
      errorMessage: `Phone number must not exceed ${PHONE_CONFIG.maxLength} digits.`,
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
}

/**
 * React hook for phone input handling
 *
 * @returns {Object} - Phone input handling methods and state
 */
export function usePhoneInput(initialValue = "") {
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const input = e.target.value;

    // Check if input contains only allowed characters
    if (!PHONE_CONFIG.allowedChars.test(input)) {
      return;
    }

    // Format the phone number
    const formatted = formatPhoneNumber(input);

    // Update the input with formatted value
    setValue(formatted);

    // Validate and set error if needed
    const validation = validatePhoneNumber(formatted);
    setError(validation.isValid ? "" : validation.errorMessage);
  };

  return {
    value,
    setValue,
    error,
    setError,
    handleChange,
    isValid: error === "",
  };
}
