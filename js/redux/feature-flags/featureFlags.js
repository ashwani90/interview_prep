// FeatureGate.js
import React from 'react';
import { useSelector } from 'react-redux';

export default function FeatureGate({
  flag,
  fallback = null,
  children,
  isEnabled = true // Default check is for truthy
}) {
  const flags = useSelector(state => state.featureFlags.flags);
  const flagValue = flags[flag];

  // Determine if feature is enabled based on flag value and check type
  const featureEnabled = isEnabled ? 
    Boolean(flagValue) : 
    flagValue === isEnabled;

  return featureEnabled ? children : fallback;
}