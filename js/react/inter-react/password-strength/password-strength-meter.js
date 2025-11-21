import React from 'react';
import PasswordSuggestions from './PasswordSuggestions';
import './styles/PasswordMeter.css';

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (pwd) => {
    let score = 0;
    const suggestions = [];
    
    // Criteria checks
    const hasMinLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const hasNoSequences = !/(abc|123|qwerty|password)/i.test(pwd);
    const hasNoRepetition = !/(.)\1{2,}/.test(pwd);

    // Calculate score
    if (hasMinLength) score += 1;
    if (hasUpperCase) score += 1;
    if (hasLowerCase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChars) score += 2;
    if (hasNoSequences) score += 1;
    if (hasNoRepetition) score += 1;

    // Generate suggestions
    if (!hasMinLength) suggestions.push("Use at least 8 characters");
    if (!hasUpperCase) suggestions.push("Add uppercase letters");
    if (!hasLowerCase) suggestions.push("Add lowercase letters");
    if (!hasNumbers) suggestions.push("Include numbers");
    if (!hasSpecialChars) suggestions.push("Add special characters");
    if (!hasNoSequences) suggestions.push("Avoid common sequences");
    if (!hasNoRepetition) suggestions.push("Avoid repeated characters");

    // Determine strength level
    let strength = 'Weak';
    if (score >= 6) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';

    return {
      score: Math.min(score, 8), // Max score is 8
      strength,
      suggestions
    };
  };

  const { score, strength, suggestions } = calculateStrength(password);
  const percentage = (score / 8) * 100;

  return (
    <div className="password-meter">
      <div className="strength-bar">
        <div 
          className={`strength-indicator ${strength.toLowerCase()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="strength-text">
        {password ? (
          <>
            Strength: <span className={strength.toLowerCase()}>{strength}</span>
            <PasswordSuggestions suggestions={suggestions} />
          </>
        ) : (
          'Enter a password to check strength'
        )}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;