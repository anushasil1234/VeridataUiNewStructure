import { useState } from 'react';

/**
 * Custom hook for managing grouped personal details state.
 * @param {object} initial - Initial state for personal details.
 * @returns {[object, function, function]} [personalDetails, updatePersonalDetail, setPersonalDetails]
 */
export default function usePersonalDetails(initial = {}) {
  const [personalDetails, setPersonalDetails] = useState(initial);

  /**
   * Update a single field in personal details.
   * @param {string} field - The field name to update.
   * @param {any} value - The new value for the field.
   */
  const updatePersonalDetail = (field, value) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
  };

  return [personalDetails, updatePersonalDetail, setPersonalDetails];
} 