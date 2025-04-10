
import { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { Property } from '../../types/property';
import { 
  addPropertyMarkers, 
  updateMarkerState, 
  bounceMarker,
  focusOnMarker,
  fitMapToBounds
} from '../../utils/map/markerUtils';

interface UseMapMarkersProps {
  map: mapboxgl.Map | null;
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
  isMobile: boolean;
}

interface UseMapMarkersResult {
  hasAddedMarkers: boolean;
}

export const useMapMarkers = ({
  map,
  properties,
  selectedPropertyId,
  onPropertySelect,
  isMobile
}: UseMapMarkersProps): UseMapMarkersResult => {
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const popupsRef = useRef<{ [key: number]: mapboxgl.Popup }>({});
  const prevSelectedProperty = useRef<number | null>(null);
  const [hasAddedMarkers, setHasAddedMarkers] = useState(false);
  const mapLoadListenerRef = useRef<((e: mapboxgl.MapboxEvent) => void) | null>(null);
  const propertiesRef = useRef<Property[]>([]);
  
  // Memoize marker cleanup to avoid creating new functions
  const cleanupMarkers = useCallback(() => {
    console.log('Cleaning up markers');
    Object.values(markersRef.current).forEach(marker => marker.remove());
    Object.values(popupsRef.current).forEach(popup => popup.remove());
    markersRef.current = {};
    popupsRef.current = {};
  }, []);
  
  // Clear all markers on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log('Cleaning up all markers and listeners');
      cleanupMarkers();
      
      // Remove any map load listeners
      if (map && mapLoadListenerRef.current) {
        map.off('load', mapLoadListenerRef.current);
      }
    };
  }, [map, cleanupMarkers]);

  // Track properties changes with refs to optimize rerenders
  useEffect(() => {
    const propertiesChanged = 
      properties.length !== propertiesRef.current.length || 
      JSON.stringify(properties.map(p => p.id)) !== JSON.stringify(propertiesRef.current.map(p => p.id));
    
    if (propertiesChanged) {
      propertiesRef.current = properties;
      setHasAddedMarkers(false);
    }
  }, [properties]);
  
  // Memoized function to add markers to map
  const addMarkersToMap = useCallback(() => {
    if (!map || !map.loaded()) {
      console.log('Map not ready for markers');
      return false;
    }
    
    if (properties.length === 0) {
      console.log('No properties available for markers');
      return false;
    }
    
    console.log('Adding markers for', properties.length, 'properties');
    
    try {
      // Clear existing markers
      cleanupMarkers();
      
      // Add new markers with selected state
      const { markers, popups, bounds } = addPropertyMarkers(map, properties, onPropertySelect, selectedPropertyId);
      markersRef.current = markers;
      popupsRef.current = popups;
      
      // Fit map to bounds
      fitMapToBounds(map, bounds, isMobile);
      
      return true;
    } catch (error) {
      console.error('Error adding markers:', error);
      return false;
    }
  }, [map, properties, selectedPropertyId, isMobile, onPropertySelect, cleanupMarkers]);
  
  // Add markers when properties change and map is loaded
  useEffect(() => {
    // Skip if no map or markers already added
    if (!map || hasAddedMarkers) {
      return;
    }
    
    const handleMarkersAddition = () => {
      if (addMarkersToMap()) {
        setHasAddedMarkers(true);
        console.log('Markers successfully added');
      }
    };
    
    // Check if map is already loaded
    if (map.loaded()) {
      console.log('Map is loaded and ready, adding markers now');
      // Short timeout to ensure the map is fully rendered
      setTimeout(handleMarkersAddition, 100);
    } else {
      console.log('Map not fully loaded yet for markers, adding load listener');
      
      // Remove any existing listener to prevent duplicates
      if (mapLoadListenerRef.current) {
        map.off('load', mapLoadListenerRef.current);
      }
      
      // Store the listener reference so we can clean it up later
      mapLoadListenerRef.current = () => {
        console.log('Map load event fired, now adding markers');
        setTimeout(handleMarkersAddition, 100);
      };
      
      map.on('load', mapLoadListenerRef.current);
    }
    
    // Fallback timer for maps that might silently fail the load event
    const renderTimeout = setTimeout(() => {
      if (!hasAddedMarkers && map) {
        console.log('Fallback: Adding markers after timeout');
        handleMarkersAddition();
      }
    }, 2000);
    
    // Only clean up the timeout, not the map or markers
    return () => {
      clearTimeout(renderTimeout);
      
      // Remove the load listener if it exists, but don't clean up markers
      if (mapLoadListenerRef.current && map) {
        map.off('load', mapLoadListenerRef.current);
      }
    };
    
  }, [map, properties, hasAddedMarkers, addMarkersToMap]);
  
  // Update marker selection state when selectedPropertyId changes
  useEffect(() => {
    if (!map || !hasAddedMarkers) {
      return;
    }
    
    try {
      // Deselect previous property marker
      if (prevSelectedProperty.current && markersRef.current[prevSelectedProperty.current]) {
        updateMarkerState(markersRef.current[prevSelectedProperty.current], false);
      }
      
      // Select new property marker if it exists
      if (selectedPropertyId && markersRef.current[selectedPropertyId]) {
        // Update marker styling
        updateMarkerState(markersRef.current[selectedPropertyId], true);
        
        // Close all popups
        Object.values(popupsRef.current).forEach(popup => {
          popup.remove();
        });
        
        // Get the marker for the selected property
        const marker = markersRef.current[selectedPropertyId];
        
        // Open popup for the selected property
        marker.togglePopup();
        
        // Focus on the selected marker with a slight delay
        setTimeout(() => {
          focusOnMarker(map, marker);
        }, 100);
      }
      
      // Update ref for next comparison
      prevSelectedProperty.current = selectedPropertyId;
    } catch (error) {
      console.error('Error updating selected property:', error);
    }
  }, [selectedPropertyId, map, hasAddedMarkers]);
  
  return { hasAddedMarkers };
};
