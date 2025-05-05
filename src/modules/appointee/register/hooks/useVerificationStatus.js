import { useState } from 'react';

/**
 * Custom hook for managing grouped verification status state.
 * @param {object} initial - Initial state for verification statuses.
 * @returns {[object, function, function]} [verificationStatus, updateVerificationStatus, setVerificationStatus]
 */
export default function useVerificationStatus(initial = {}) {
  const [verificationStatus, setVerificationStatus] = useState(initial);

  /**
   * Update a single verification status field.
   * @param {string} field - The field name to update.
   * @param {any} value - The new value for the field.
   */
  const updateVerificationStatus = (field, value) => {
    setVerificationStatus(prev => ({ ...prev, [field]: value }));
  };

  return [verificationStatus, updateVerificationStatus, setVerificationStatus];
} 