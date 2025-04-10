
import { useCallback } from 'react';

// Default token (public demo token with limited usage)
const DEFAULT_TOKEN = 'pk.eyJ1IjoidGFjb3N0cmVldGFsZXgiLCJhIjoiY205OXgxOGxkMGh1dDJwcTRycHhhYmhhNCJ9.IFmgJlA7D7O6qlwxmOXS1Q';

export const useMapToken = () => {
  // Get token from localStorage if available or use provided token
  const getMapboxToken = useCallback((customToken?: string) => {
    const storedToken = localStorage.getItem('mapbox-token');
    return customToken || storedToken || DEFAULT_TOKEN;
  }, []);
  
  // Update token in localStorage
  const updateMapboxToken = useCallback((token: string) => {
    if (!token || token.trim() === '') {
      return;
    }
    
    localStorage.setItem('mapbox-token', token);
    console.log('Token updated, reloading page...');
    window.location.reload(); // Reload to apply new token
  }, []);
  
  return {
    getMapboxToken,
    updateMapboxToken
  };
};
