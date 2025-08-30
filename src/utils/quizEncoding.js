/**
 * Quiz encoding utilities for generating unique result URLs
 * Uses a cycling pattern to encode 30 answers into a 30-character string
 */

// Character sets for the cycling pattern
const CHARACTER_SETS = [
  ['a', 'b', 'c', 'd'],      // Set 1
  ['1', '2', '3', '4'],      // Set 2  
  ['e', 'f', 'g', 'h'],      // Set 3
  ['5', '6', '7', '8'],      // Set 4
  ['i', 'j', 'k', 'l'],      // Set 5
  ['9', '0', 'q', 'w'],      // Set 6
  ['m', 'n', 'o', 'p'],      // Set 7
  ['r', 's', 't', 'u'],      // Set 8
  ['v', 'x', 'y', 'z']       // Set 9
];

/**
 * Maps answer letter to array index
 * @param {string} answer - Answer letter (A, B, C, D)
 * @returns {number} - Index (0, 1, 2, 3)
 */
function answerToIndex(answer) {
  const mapping = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  return mapping[answer] ?? 0;
}

/**
 * Maps array index to answer letter
 * @param {number} index - Index (0, 1, 2, 3)
 * @returns {string} - Answer letter (A, B, C, D)
 */
function indexToAnswer(index) {
  const mapping = ['A', 'B', 'C', 'D'];
  return mapping[index] ?? 'A';
}

/**
 * Encodes 30 quiz answers into a 30-character string
 * @param {Array} answers - Array of 30 answers (A, B, C, D)
 * @returns {string} - 30-character encoded string
 */
export function encodeAnswers(answers) {
  if (!answers || answers.length !== 30) {
    throw new Error('Expected exactly 30 answers');
  }
  
  let encoded = '';
  
  for (let i = 0; i < 30; i++) {
    const answer = answers[i];
    const answerIndex = answerToIndex(answer);
    const setIndex = i % 9; // Cycle through 9 character sets
    const characterSet = CHARACTER_SETS[setIndex];
    
    encoded += characterSet[answerIndex];
  }
  
  return encoded;
}

/**
 * Decodes a 30-character string back to quiz answers
 * @param {string} encoded - 30-character encoded string
 * @returns {Array} - Array of 30 answers (A, B, C, D)
 */
export function decodeAnswers(encoded) {
  if (!encoded || encoded.length !== 30) {
    throw new Error('Expected exactly 30 characters');
  }
  
  const answers = [];
  
  for (let i = 0; i < 30; i++) {
    const character = encoded[i];
    const setIndex = i % 9; // Cycle through 9 character sets
    const characterSet = CHARACTER_SETS[setIndex];
    
    const answerIndex = characterSet.indexOf(character);
    if (answerIndex === -1) {
      throw new Error(`Invalid character '${character}' at position ${i}`);
    }
    
    answers.push(indexToAnswer(answerIndex));
  }
  
  return answers;
}

/**
 * Generates a complete result URL with encoded answers
 * @param {Array} answers - Array of 30 answers (A, B, C, D)
 * @param {string} baseUrl - Base URL (default: current location)
 * @returns {string} - Complete result URL
 */
export function generateResultUrl(answers, baseUrl = null) {
  const encoded = encodeAnswers(answers);
  const resultId = `mm83k${encoded}`;
  
  // Use provided base URL or construct from current location
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'localhost');
  
  return `${base}/personality-test-confirmation?r=${resultId}`;
}

/**
 * Extracts result ID from URL or query parameter
 * @param {string} url - URL or query parameter value
 * @returns {string|null} - Result ID or null if not found
 */
export function extractResultId(url) {
  if (!url) return null;
  
  // Handle full URL
  if (url.includes('?r=')) {
    const match = url.match(/[?&]r=([^&]+)/);
    return match ? match[1] : null;
  }
  
  // Handle direct parameter value
  if (url.startsWith('mm83k') && url.length === 35) {
    return url;
  }
  
  return null;
}

/**
 * Validates a result ID format
 * @param {string} resultId - Result ID to validate
 * @returns {boolean} - True if valid format
 */
export function validateResultId(resultId) {
  if (!resultId || typeof resultId !== 'string') {
    return false;
  }
  
  // Must start with 'mm83k' and be exactly 35 characters
  if (!resultId.startsWith('mm83k') || resultId.length !== 35) {
    return false;
  }
  
  // Try to decode the answer portion
  try {
    const encoded = resultId.substring(5); // Remove 'mm83k' prefix
    decodeAnswers(encoded);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Extracts answers from a result ID
 * @param {string} resultId - Result ID (mm83k + 30 characters)
 * @returns {Array} - Array of 30 answers (A, B, C, D)
 */
export function getAnswersFromResultId(resultId) {
  if (!validateResultId(resultId)) {
    throw new Error('Invalid result ID format');
  }
  
  const encoded = resultId.substring(5); // Remove 'mm83k' prefix
  return decodeAnswers(encoded);
}