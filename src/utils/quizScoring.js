/**
 * Quiz scoring utilities for Kolbe, MBTI, and DISC personality assessments
 */

/**
 * Calculates Kolbe scores from quiz answers
 * @param {Array} answers - Array of 30 answers (A, B, C, D)
 * @param {Array} questions - Array of question objects with scoring data
 * @returns {Object} - Kolbe results with dominant type and percentages
 */
export function calculateKolbeScores(answers, questions) {
  const scores = { FF: 0, FT: 0, QS: 0, IM: 0 };
  
  answers.forEach((answer, index) => {
    const question = questions[index];
    const option = question.options.find(opt => opt.letter === answer);
    
    if (option && option.scores.kolbe) {
      Object.entries(option.scores.kolbe).forEach(([type, points]) => {
        scores[type] += points;
      });
    }
  });
  
  // Calculate percentages (total possible points = 480)
  const totalPoints = 480;
  const percentages = {};
  Object.entries(scores).forEach(([type, score]) => {
    percentages[type] = parseFloat(((score / totalPoints) * 100).toFixed(2));
  });
  
  // Find dominant type
  const dominant = Object.entries(scores).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )[0];
  
  const typeNames = {
    FF: "Fact Finder",
    FT: "Follow Thru", 
    QS: "Quick Start",
    IM: "Implementor"
  };
  
  return {
    dominant: typeNames[dominant],
    percentages,
    rawScores: scores
  };
}

/**
 * Calculates MBTI scores from quiz answers
 * @param {Array} answers - Array of 30 answers (A, B, C, D)
 * @param {Array} questions - Array of question objects with scoring data
 * @returns {Object} - MBTI results with type and percentages
 */
export function calculateMBTIScores(answers, questions) {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach((answer, index) => {
    const question = questions[index];
    const option = question.options.find(opt => opt.letter === answer);
    
    if (option && option.scores.mbti) {
      Object.entries(option.scores.mbti).forEach(([type, points]) => {
        scores[type] += points;
      });
    }
  });
  
  // Calculate percentages for each dichotomy
  const percentages = {};
  const dichotomies = [
    ['E', 'I'],
    ['S', 'N'], 
    ['T', 'F'],
    ['J', 'P']
  ];
  
  dichotomies.forEach(([first, second]) => {
    const total = scores[first] + scores[second];
    if (total > 0) {
      percentages[first] = parseFloat(((scores[first] / total) * 100).toFixed(2));
      percentages[second] = parseFloat(((scores[second] / total) * 100).toFixed(2));
    } else {
      percentages[first] = 50.0;
      percentages[second] = 50.0;
    }
  });
  
  // Determine 4-letter type
  const type = dichotomies.map(([first, second]) => 
    scores[first] >= scores[second] ? first : second
  ).join('');
  
  return {
    type,
    percentages,
    rawScores: scores
  };
}

/**
 * Calculates DISC scores from quiz answers
 * @param {Array} answers - Array of 30 answers (A, B, C, D)
 * @param {Array} questions - Array of question objects with scoring data
 * @returns {Object} - DISC results with primary type and percentages
 */
export function calculateDISCScores(answers, questions) {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  
  answers.forEach((answer, index) => {
    const question = questions[index];
    const option = question.options.find(opt => opt.letter === answer);
    
    if (option && option.scores.disc) {
      Object.entries(option.scores.disc).forEach(([type, points]) => {
        scores[type] += points;
      });
    }
  });
  
  // Calculate percentages (total possible points = 480)
  const totalPoints = 480;
  const percentages = {};
  Object.entries(scores).forEach(([type, score]) => {
    percentages[type] = parseFloat(((score / totalPoints) * 100).toFixed(2));
  });
  
  // Find primary type
  const primary = Object.entries(scores).reduce((max, current) => 
    current[1] > max[1] ? current : max
  )[0];
  
  const typeNames = {
    D: "Dominance",
    I: "Influence",
    S: "Steadiness", 
    C: "Conscientiousness"
  };
  
  return {
    primary: typeNames[primary],
    primaryLetter: primary,
    percentages,
    rawScores: scores
  };
}

/**
 * Calculates all personality assessment scores
 * @param {Array} answers - Array of 30 answers (A, B, C, D)
 * @param {Array} questions - Array of question objects with scoring data
 * @returns {Object} - Complete results for all three assessments
 */
export function calculateAllScores(answers, questions) {
  return {
    kolbe: calculateKolbeScores(answers, questions),
    mbti: calculateMBTIScores(answers, questions),
    disc: calculateDISCScores(answers, questions)
  };
}