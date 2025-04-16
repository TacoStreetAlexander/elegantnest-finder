
import { useEffect, useState, RefObject } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapInstance } from './useMapInstance';
import { useMapError } from './useMapError';
import { useMapToken } from './useMapToken';
import { MapOptions } from '../../types/map';

interface MapInitializationResult {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
  mapError: string | null;
  isInitializing: boolean;
  updateMapboxToken: (token: string) => void;
}

export const useMapInitialization = (
  mapContainerRef: RefObject<HTMLDivElement> | null,
  options?: MapOptions
): MapInitializationResult => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { mapInstance, initializeMap } = useMapInstance(options);
  const { mapError, setMapError } = useMapError();
  const { getMapboxToken, updateMapboxToken } = useMapToken();
  
  // Initialize map
  useEffect(() => {
    // Skip initialization if mapContainerRef is null or undefined
    if (!mapContainerRef) {
      console.log("Map container ref is null - skipping initialization");
      return;
    }
    
    // Check if we can initialize the map
    if (!mapContainerRef.current) {
      console.log("Map container ref target is not available yet");
      return;
    }
    
    // Check if map is already initialized
    if (mapInstance.current) {
      console.log("Map instance already exists");
      return;
    }
    
    console.log("Initializing map...");
    console.log("Map container element:", mapContainerRef.current);
    setIsInitializing(true);
    setMapError(null);
    
    // Add a small delay to ensure DOM is fully ready
    const initTimer = setTimeout(() => {
      try {
        // Get token from localStorage or use custom token from options
        const token = getMapboxToken(options?.customMapboxToken);
        
        // Don't initialize map if no token is available
        if (!token) {
          setMapError('Please enter a valid Mapbox access token to view the map.');
          setIsInitializing(false);
          console.error("No mapbox token available");
          return;
        }
        
        if (!mapContainerRef.current) {
          console.error("Map container still not available after delay");
          setMapError('Map container not available. Please try refreshing the page.');
          setIsInitializing(false);
          return;
        }
        
        // Set map container dimensions explicitly to ensure proper rendering
        mapContainerRef.current.style.width = '100%';
        mapContainerRef.current.style.height = '100%';
        mapContainerRef.current.style.minHeight = '500px';
        
        // Check container's computed dimensions
        const rect = mapContainerRef.current.getBoundingClientRect();
        console.log(`Map container dimensions: ${rect.width}x${rect.height}`);
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Map container has zero width or height');
        }
        
        console.log("Setting mapbox access token and creating map");
        
        // Initialize map with token and container
        const map = initializeMap(mapContainerRef.current, token);
        
        // Map load event
        map.on('load', () => {
          console.log('Map loaded successfully');
          setMapLoaded(true);
          setIsInitializing(false);
        });
        
        // Map error event
        map.on('error', (e) => {
          console.error('Map error:', e);
          
          // Check for authentication errors
          if (e.error && typeof e.error === 'object' && 'status' in e.error && e.error.status === 401) {
            setMapError('Invalid Mapbox access token. Please enter a valid token below.');
          } else {
            setMapError('An error occurred loading the map. Please try again later.');
          }
          
          setIsInitializing(false);
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setMapError('Failed to initialize map. Please try again later.');
        setIsInitializing(false);
      }
    }, 500); // Longer delay to ensure DOM is ready
    
    // Cleanup function - only run when component unmounts or mapContainerRef changes
    return () => {
      clearTimeout(initTimer);
    };
  }, [
    mapContainerRef, 
    mapInstance, 
    initializeMap, 
    getMapboxToken, 
    setMapError, 
    options?.customMapboxToken
  ]);
  
  // Separate cleanup effect to prevent map from being removed during re-renders
  useEffect(() => {
    // Store the current map instance for cleanup
    const currentMapInstance = mapInstance.current;
    
    return () => {
      // Only clean up the map when the component is unmounting
      // Check if the current instance is still the same as when the effect was created
      if (currentMapInstance && currentMapInstance === mapInstance.current) {
        console.log("Cleaning up map instance on unmount");
        currentMapInstance.remove();
        mapInstance.current = null;
        setMapLoaded(false);
      }
    };
  }, []);
  
  // Prevent unnecessary re-renders by stabilizing the return value
  const stableMap = mapInstance.current;
  
  return { 
    map: stableMap, 
    mapLoaded, 
    mapError, 
    isInitializing,
    updateMapboxToken 
  };
};
