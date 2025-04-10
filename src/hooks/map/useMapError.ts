
import { useState, useCallback } from 'react';

export const useMapError = () => {
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Set map error message
  const setMapErrorMessage = useCallback((errorMessage: string | null) => {
    setMapError(errorMessage);
  }, []);
  
  return {
    mapError,
    setMapError: setMapErrorMessage
  };
};
