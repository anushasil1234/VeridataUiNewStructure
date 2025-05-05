import { useState } from 'react';

/**
 * Custom hook for managing grouped file upload state.
 * @param {object} initial - Initial state for file uploads.
 * @returns {[object, function, function]} [fileUploads, updateFileUpload, setFileUploads]
 */
export default function useFileUploads(initial = {}) {
  const [fileUploads, setFileUploads] = useState(initial);

  /**
   * Update a single file upload field.
   * @param {string} field - The field name to update.
   * @param {any} value - The new value for the field.
   */
  const updateFileUpload = (field, value) => {
    setFileUploads(prev => ({ ...prev, [field]: value }));
  };

  return [fileUploads, updateFileUpload, setFileUploads];
} 