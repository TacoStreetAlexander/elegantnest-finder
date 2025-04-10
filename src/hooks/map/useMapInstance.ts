
import { useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapOptions } from '../../types/map';
import { getDefaultMapOptions } from '../../utils/map/mapOptions';

export const useMapInstance = (options?: MapOptions) => {
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  
  // Initialize map with container and token
  const initializeMap = useCallback((container: HTMLDivElement, token: string) => {
    // Set the access token
    mapboxgl.accessToken = token;
    
    // Combine default options with user-provided options
    const mapOptions = getDefaultMapOptions(options);
    
    console.log("Creating map with options:", mapOptions);
    
    // Create the map instance
    const map = new mapboxgl.Map({
      container,
      style: mapOptions.style,
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      minZoom: mapOptions.minZoom,
      maxZoom: mapOptions.maxZoom,
      pitch: mapOptions.pitch,
      bearing: mapOptions.bearing,
      projection: mapOptions.projection as any,
      interactive: mapOptions.interactive,
      attributionControl: mapOptions.attributionControl,
      antialias: true, // Enable antialiasing for smoother rendering
      failIfMajorPerformanceCaveat: false // Try to render map even on low-end devices
    });
    
    // Add navigation controls if map is interactive
    if (mapOptions.interactive !== false) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
    
    // Store the map instance
    mapInstance.current = map;
    
    return map;
  }, [options]);
  
  return { mapInstance, initializeMap };
};
