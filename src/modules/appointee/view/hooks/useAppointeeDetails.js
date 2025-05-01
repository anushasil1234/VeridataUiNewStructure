import { useState, useEffect } from 'react';
import { getAppointeeDetails } from 'server/apis';
import { DDMMYYYY, filteredObjectProperty, NA, hasValue } from 'shared/utils';

export function useAppointeeDetails(appointeeId, relationList) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const response = await getAppointeeDetails(appointeeId);
      if (response) {
        const info = response.responseInfo;
        // You can add more processing here as needed
        setDetails(info);
      }
      setLoading(false);
    }
    if (appointeeId) fetchDetails();
  }, [appointeeId]);

  return { details, loading };
} 