
import { useState, useCallback } from 'react';

export const useMapVisibility = () => {
  const [showMap, setShowMap] = useState(true);
  
  // Toggle map visibility (for mobile)
  const toggleMap = useCallback(() => {
    setShowMap(prev => !prev);
  }, []);

  return {
    showMap,
    toggleMap
  };
};
