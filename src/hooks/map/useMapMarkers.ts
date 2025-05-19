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
  const userTriggeredSelectionRef = useRef<boolean>(false);
  
  // State to manage hover timeouts
  const hoverTimeoutsRef = useRef<{ [key: number]: number }>({});
  const hoverStatesRef = useRef<{ [key: number]: { marker: boolean, popup: boolean } }>({});
  
  // Add a debug event listener to monitor popup interactions
  useEffect(() => {
    const handleDebugEvents = (e: MouseEvent) => {
      // Check if the event target is a marker or popup
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;
      
      // Log popup interactions
      if (target.closest('.property-popup')) {
        console.log(`Popup interaction: ${e.type} on popup`);
      }
      
      // Log marker interactions
      if (target.closest('.marker')) {
        const markerId = target.closest('.marker')?.getAttribute('data-property-id');
        console.log(`Marker interaction: ${e.type} on marker ${markerId}`);
      }
    };
    
    // Add listeners to document to catch all interactions
    document.addEventListener('mouseenter', handleDebugEvents, true);
    document.addEventListener('mouseleave', handleDebugEvents, true);
    document.addEventListener('mouseover', handleDebugEvents, true);
    document.addEventListener('mouseout', handleDebugEvents, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleDebugEvents, true);
      document.removeEventListener('mouseleave', handleDebugEvents, true);
      document.removeEventListener('mouseover', handleDebugEvents, true);
      document.removeEventListener('mouseout', handleDebugEvents, true);
    };
  }, []);
  
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
      
      // Clear any pending timeouts
      Object.values(hoverTimeoutsRef.current).forEach(timeoutId => {
        window.clearTimeout(timeoutId);
      });
    };
  }, [map, cleanupMarkers]);

  // Track properties changes with refs to optimize rerenders
  useEffect(() => {
    // Safely extract IDs, handling potential undefined properties
    const getPropertyIds = (props: Property[]) => {
      return props.map(p => p?.id).filter(id => id !== undefined);
    };
    
    // Compare current and previous properties
    const currentIds = getPropertyIds(properties);
    const previousIds = getPropertyIds(propertiesRef.current);
    
    // Check if the properties array has changed in any way
    // This will trigger a re-render of markers when filters are applied
    const propertiesChanged = 
      properties.length !== propertiesRef.current.length || 
      JSON.stringify(currentIds) !== JSON.stringify(previousIds);
    
    if (propertiesChanged) {
      console.log('Properties changed, refreshing markers', {
        prevCount: propertiesRef.current.length,
        newCount: properties.length,
        prevIds: previousIds.slice(0, 5),
        newIds: currentIds.slice(0, 5)
      });
      propertiesRef.current = [...properties];
      setHasAddedMarkers(false);
    }
  }, [properties]);
  
  // Improved hover state management for markers and popups
  const setupMarkerInteractions = useCallback((
    propertyId: number,
    marker: mapboxgl.Marker,
    popup: mapboxgl.Popup,
    isSelected: boolean
  ) => {
    if (!map) return;
    
    const el = marker.getElement();
    const popupElement = popup.getElement();
    
    // Initialize hover state for this property
    if (!hoverStatesRef.current[propertyId]) {
      hoverStatesRef.current[propertyId] = { marker: false, popup: false };
    }
    
    // Helper to check if currently hovered
    const isCurrentlyHovered = () => {
      const state = hoverStatesRef.current[propertyId];
      return state && (state.marker || state.popup);
    };
    
    // Helper to update hover state
    const updateHoverState = (source: 'marker' | 'popup', isHovered: boolean) => {
      if (!hoverStatesRef.current[propertyId]) {
        hoverStatesRef.current[propertyId] = { marker: false, popup: false };
      }
      
      hoverStatesRef.current[propertyId][source] = isHovered;
      
      // If marker or popup is hovered, clear any existing timeout
      if (isHovered) {
        if (hoverTimeoutsRef.current[propertyId]) {
          window.clearTimeout(hoverTimeoutsRef.current[propertyId]);
          hoverTimeoutsRef.current[propertyId] = 0;
        }
        
        // Show popup immediately if not already shown
        if (!popup.isOpen() && !isSelected) {
          popup.addTo(map);
        }
        
        // Add hover styling
        if (!isSelected) {
          el.classList.add('hover-active');
          el.style.filter = 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))';
          el.style.zIndex = '10';
        }
      } else {
        // Check if both marker and popup are no longer hovered
        if (!isCurrentlyHovered() && !isSelected) {
          // Start a timeout to remove the popup
          hoverTimeoutsRef.current[propertyId] = window.setTimeout(() => {
            // Double-check hover state before removing
            if (!isCurrentlyHovered() && !isSelected) {
              console.log(`Removing popup after delay: Property ${propertyId}`);
              popup.remove();
              el.classList.remove('hover-active');
              el.style.filter = '';
              el.style.zIndex = '';
            }
            
            // Clear the timeout reference
            hoverTimeoutsRef.current[propertyId] = 0;
          }, 300); // 300ms delay before closing popup
        }
      }
    };
    
    // Marker mouse events
    el.addEventListener('mouseenter', () => {
      console.log(`Marker mouseenter: Property ${propertyId}`);
      updateHoverState('marker', true);
    });
    
    el.addEventListener('mouseleave', () => {
      console.log(`Marker mouseleave: Property ${propertyId}`);
      updateHoverState('marker', false);
    });
    
    // Click events for touch devices and regular clicks
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // For touch devices, toggle popup
      if ('ontouchstart' in window) {
        if (!popup.isOpen()) {
          // Show popup for this marker, hide others
          Object.values(popupsRef.current).forEach(p => p.remove());
          popup.addTo(map);
        } else if (!isSelected) {
          // Hide popup if clicking on an unselected marker that has its popup open
          popup.remove();
        }
      }
      
      // Always trigger property selection
      onPropertySelect(propertyId);
    });
    
    // Add popup mouse events if the popup element exists
    if (popupElement) {
      popupElement.addEventListener('mouseenter', () => {
        console.log(`Popup mouseenter: Property ${propertyId}`);
        updateHoverState('popup', true);
      });
      
      popupElement.addEventListener('mouseleave', () => {
        console.log(`Popup mouseleave: Property ${propertyId}`);
        updateHoverState('popup', false);
      });
      
      // Ensure links in popup work by stopping event propagation
      const links = popupElement.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.stopPropagation();
          // Let the link's default action happen
        });
      });
      
      // For touch devices, prevent popup from closing when tapped
      if ('ontouchstart' in window) {
        popupElement.addEventListener('touchstart', (e) => {
          e.stopPropagation();
        });
      }
    }
    
    // Handle document click/touch to close popups on mobile
    if ('ontouchstart' in window) {
      const handleDocumentTouch = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        
        // Skip if touching a marker or popup
        if (target && (
          target.closest('.marker') || 
          target.closest('.mapboxgl-popup') ||
          target.closest('.property-popup') ||
          target.closest('.property-popup-content')
        )) {
          return;
        }
        
        // Close popup if open and not selected
        if (popup.isOpen() && !isSelected) {
          popup.remove();
        }
      };
      
      document.addEventListener('touchstart', handleDocumentTouch);
      
      // Return cleanup function for touch event
      return () => {
        document.removeEventListener('touchstart', handleDocumentTouch);
      };
    }
    
    // No cleanup needed for non-touch devices
    return undefined;
  }, [map, onPropertySelect]);
  
  // Memoized function to add markers to map
  const addMarkersToMap = useCallback(() => {
    if (!map || !map.loaded()) {
      console.log('Map not ready for markers');
      return false;
    }
    
    if (!properties || properties.length === 0) {
      console.log('No properties available for markers');
      return false;
    }
    
    console.log('Adding markers for', properties.length, 'properties');
    
    try {
      // Clear existing markers
      cleanupMarkers();
      
      // Clear any pending hover timeouts
      Object.values(hoverTimeoutsRef.current).forEach(timeoutId => {
        window.clearTimeout(timeoutId);
      });
      hoverTimeoutsRef.current = {};
      hoverStatesRef.current = {};
      
      // Add new markers with selected state
      const { markers, popups, bounds } = addPropertyMarkers(map, properties, onPropertySelect, selectedPropertyId);
      markersRef.current = markers;
      popupsRef.current = popups;
      
      // Set up improved hover interactions for each marker
      Object.entries(markers).forEach(([idStr, marker]) => {
        const id = parseInt(idStr, 10);
        const popup = popups[id];
        const isSelected = selectedPropertyId === id;
        
        setupMarkerInteractions(id, marker, popup, isSelected);
      });
      
      // Fit map to bounds
      fitMapToBounds(map, bounds, isMobile);
      
      // Add Map movement listener to fix popups
      map.on('move', () => {
        // Ensure popups stay with their markers during map movement
        if (selectedPropertyId && popupsRef.current[selectedPropertyId]) {
          const popup = popupsRef.current[selectedPropertyId];
          if (popup.isOpen()) {
            // Force popup to update position
            popup.addTo(map);
          }
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error adding markers:', error);
      return false;
    }
  }, [map, properties, selectedPropertyId, isMobile, onPropertySelect, cleanupMarkers, setupMarkerInteractions]);
  
  // Add markers when properties change and map is loaded
  useEffect(() => {
    // Skip if no map
    if (!map) {
      return;
    }
    
    // Safely extract IDs, handling potential undefined properties
    const getPropertyIds = (props: Property[]) => {
      return props.map(p => p?.id).filter(id => id !== undefined);
    };
    
    // Compare current and previous properties
    const currentIds = getPropertyIds(properties);
    const previousIds = getPropertyIds(propertiesRef.current);
    
    // Skip if markers already added and properties haven't changed
    if (hasAddedMarkers && 
        properties.length === propertiesRef.current.length && 
        JSON.stringify(currentIds) === JSON.stringify(previousIds)) {
      return;
    }
    
    // Update markers only once per property change
    const handleMarkersAddition = () => {
      if (addMarkersToMap()) {
        setHasAddedMarkers(true);
        console.log('Markers successfully added');
        
        // Add global styles for popups to fix z-index issues
        if (!document.getElementById('popup-styles')) {
          const styleEl = document.createElement('style');
          styleEl.id = 'popup-styles';
          styleEl.textContent = `
            .mapboxgl-popup {
              z-index: 20 !important;
            }
            .mapboxgl-popup-content {
              padding: 0 !important;
              overflow: visible !important;
            }
            .property-popup {
              pointer-events: auto !important;
            }
            .property-popup-content {
              pointer-events: auto !important;
            }
            .popup-link {
              pointer-events: auto !important;
            }
            .marker.hover-active {
              transform: scale(1.1);
            }
          `;
          document.head.appendChild(styleEl);
        }
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
    
  }, [map, properties, hasAddedMarkers]);
  
  // Update marker selection state when selectedPropertyId changes
  useEffect(() => {
    if (!map || !hasAddedMarkers) {
      return;
    }
    
    try {
      // Skip if selection hasn't changed to prevent loops
      if (prevSelectedProperty.current === selectedPropertyId) {
        return;
      }
      
      console.log('Selected property changed from:', prevSelectedProperty.current, 'to:', selectedPropertyId);
      
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
