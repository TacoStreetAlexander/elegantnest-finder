
import mapboxgl from 'mapbox-gl';
import { Property } from '../../types/property';
import { createMarkerElement, createPropertyPopup } from './markerCreation';
import { isValidCoordinate } from './coordinateUtils';
import { createMarkerClusters } from './clusterUtils';

/**
 * Adds property markers to the map
 */
export const addPropertyMarkers = (
  map: mapboxgl.Map,
  properties: Property[],
  onPropertySelect: (id: number) => void,
  selectedPropertyId?: number | null
): {
  markers: { [key: number]: mapboxgl.Marker };
  popups: { [key: number]: mapboxgl.Popup };
  bounds: mapboxgl.LngLatBounds;
} => {
  const markers: { [key: number]: mapboxgl.Marker } = {};
  const popups: { [key: number]: mapboxgl.Popup } = {};
  const bounds = new mapboxgl.LngLatBounds();
  
  console.log(`Adding markers for ${properties?.length || 0} properties`);
  
  // Validate map is available and loaded
  if (!map) {
    console.error('Map is not available for adding markers');
    return { markers, popups, bounds };
  }
  
  if (!map.loaded()) {
    console.warn('Map not fully loaded, deferring marker creation');
    return { markers, popups, bounds };
  }
  
  // Validate properties array
  if (!properties || !Array.isArray(properties) || properties.length === 0) {
    console.warn('No valid properties array provided');
    return { markers, popups, bounds };
  }
  
  let validPropertiesCount = 0;
  
  // Try to create clusters if many properties
  if (properties.length > 15) {
    try {
      // Only create clusters if map is loaded and ready
      createMarkerClusters(map);
    } catch (err) {
      console.error('Error creating clusters:', err);
    }
  }
  
  // First pass - calculate valid bounds to ensure we're not trying to fit invalid coordinates
  properties.forEach(property => {
    // Skip invalid properties
    if (!property || typeof property !== 'object' || !property.id) {
      return;
    }
    
    // Skip properties without coordinates
    if (property.longitude === undefined || property.longitude === null || 
        property.latitude === undefined || property.latitude === null) {
      return;
    }
    
    // Convert latitude and longitude to numbers if they're strings
    const lat = typeof property.latitude === 'string' ? parseFloat(property.latitude) : property.latitude;
    const lng = typeof property.longitude === 'string' ? parseFloat(property.longitude) : property.longitude;
    
    // Skip if parsing resulted in NaN
    if (isNaN(lat) || isNaN(lng)) {
      return;
    }
    
    if (isValidCoordinate(lat, lng)) {
      bounds.extend([lng, lat]);
      validPropertiesCount++;
    }
  });
  
  // Second pass - create markers only for properties with valid coordinates
  properties.forEach(property => {
    try {
      // Skip invalid properties
      if (!property || typeof property !== 'object' || !property.id) {
        return;
      }
      
      // Skip properties without coordinates
      if (property.longitude === undefined || property.longitude === null || 
          property.latitude === undefined || property.latitude === null) {
        console.warn(`Missing coordinates for property ${property.id}`);
        return;
      }
      
      // Convert latitude and longitude to numbers if they're strings
      const lat = typeof property.latitude === 'string' ? parseFloat(property.latitude) : property.latitude;
      const lng = typeof property.longitude === 'string' ? parseFloat(property.longitude) : property.longitude;
      
      // Skip if parsing resulted in NaN
      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid coordinate format for property ${property.id}`);
        return;
      }
      
      // Skip invalid coordinates to prevent map errors
      if (!isValidCoordinate(lat, lng)) {
        console.warn(`Invalid coordinates for property ${property.id}: [${lng}, ${lat}]`);
        return;
      }
      
      // Create marker element with selected state if applicable
      const isSelected = selectedPropertyId === property.id;
      const el = createMarkerElement(property, isSelected);
      
      // Create a wrapper container for hover detection
      const container = document.createElement('div');
      container.className = 'marker-hover-container';
      container.appendChild(el);
      
      // Create popup
      const popup = createPropertyPopup(property);
      
      // Add marker to map using the container
      const marker = new mapboxgl.Marker(container)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
      
      // Store marker and popup references
      markers[property.id] = marker;
      popups[property.id] = popup;
      
      // Create state variables for hover management
      let hoverState = {
        isHovering: false,
        isPopupOpen: false,
        closeTimeout: null as number | null,
        isSelected: isSelected
      };
      
      // Get popup element for hover detection
      const popupElement = popup.getElement();
      
      // Add click event to marker
      el.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        onPropertySelect(property.id);
      });
      
      // Create bridge element to prevent hover flickering
      const createBridge = () => {
        const bridge = document.createElement('div');
        bridge.className = 'marker-popup-bridge';
        return bridge;
      };
      
      // Function to clear any existing close timeout
      const clearCloseTimeout = () => {
        if (hoverState.closeTimeout) {
          window.clearTimeout(hoverState.closeTimeout);
          hoverState.closeTimeout = null;
        }
      };
      
      // Function to handle opening popup with proper styling
      const openPopup = () => {
        if (!hoverState.isPopupOpen && !hoverState.isSelected) {
          popup.addTo(map);
          hoverState.isPopupOpen = true;
          
          // Add bridge element if it doesn't exist
          if (!popupElement.querySelector('.marker-popup-bridge')) {
            const bridge = createBridge();
            popupElement.appendChild(bridge);
            
            // Add event listeners to bridge
            bridge.addEventListener('mouseenter', () => {
              clearCloseTimeout();
            });
            
            bridge.addEventListener('mouseleave', () => {
              scheduleClose();
            });
          }
          
          // Style the marker
          el.classList.add('hover-active');
          el.style.filter = 'drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))';
          el.style.zIndex = '10';
        }
      };
      
      // Function to schedule popup closing with delay
      const scheduleClose = () => {
        clearCloseTimeout();
        
        if (!hoverState.isSelected) {
          hoverState.closeTimeout = window.setTimeout(() => {
            if (!hoverState.isHovering && !hoverState.isSelected) {
              popup.remove();
              hoverState.isPopupOpen = false;
              el.classList.remove('hover-active');
              el.style.filter = '';
              el.style.zIndex = '';
            }
            hoverState.closeTimeout = null;
          }, 300); // 300ms delay
        }
      };
      
      // Add mouseenter for marker
      el.addEventListener('mouseenter', () => {
        console.log(`Marker mouseenter: Property ${property.id}`);
        hoverState.isHovering = true;
        clearCloseTimeout();
        openPopup();
      });
      
      // Add mouseleave for marker
      el.addEventListener('mouseleave', () => {
        console.log(`Marker mouseleave: Property ${property.id}`);
        hoverState.isHovering = false;
        scheduleClose();
      });
      
      // Add mouseenter for popup
      if (popupElement) {
        popupElement.addEventListener('mouseenter', () => {
          console.log(`Popup mouseenter: Property ${property.id}`);
          hoverState.isHovering = true;
          clearCloseTimeout();
        });
        
        // Add mouseleave for popup
        popupElement.addEventListener('mouseleave', () => {
          console.log(`Popup mouseleave: Property ${property.id}`);
          hoverState.isHovering = false;
          scheduleClose();
        });
        
        // Make sure links inside popup work properly
        const links = popupElement.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', (e) => {
            e.stopPropagation();
            // Let the link's default action happen
          });
        });
      }
      
      // For touch devices, handle popup toggle
      if ('ontouchstart' in window) {
        let isPopupVisible = false;
        
        el.addEventListener('touchstart', (e) => {
          e.stopPropagation();
          
          if (isPopupVisible) {
            popup.remove();
            isPopupVisible = false;
          } else {
            // Close any other open popups first
            Object.values(popups).forEach(p => p.remove());
            
            // Open this popup
            popup.addTo(map);
            isPopupVisible = true;
          }
        });
        
        // Close popup when tapping elsewhere on the map
        map.on('click', () => {
          if (isPopupVisible && !hoverState.isSelected) {
            popup.remove();
            isPopupVisible = false;
          }
        });
        
        // Add touch event for popup to prevent it from closing
        if (popupElement) {
          popupElement.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            isPopupVisible = true;
          });
        }
      }
      
      // Update hover state when selection changes
      Object.defineProperty(marker, 'isSelected', {
        set: (value) => {
          hoverState.isSelected = value;
          if (value) {
            openPopup();
          } else {
            if (!hoverState.isHovering) {
              scheduleClose();
            }
          }
        },
        get: () => hoverState.isSelected
      });
    } catch (error) {
      console.error(`Error creating marker for property ${property?.id || 'unknown'}:`, error);
    }
  });
  
  console.log(`Added ${validPropertiesCount} valid markers out of ${properties.length} properties`);
  
  return { markers, popups, bounds };
};

/**
 * Updates a marker to show selected state
 */
export const updateMarkerState = (
  marker: mapboxgl.Marker,
  isSelected: boolean
): void => {
  if (!marker) return;
  
  try {
    const element = marker.getElement();
    
    if (isSelected) {
      element.style.filter = 'drop-shadow(0 0 8px rgba(205, 144, 50, 0.8))';
      element.style.transform = 'scale(1.2)';
      element.style.zIndex = '10';
    } else {
      element.style.filter = '';
      element.style.transform = '';
      element.style.zIndex = '';
    }
  } catch (error) {
    console.error('Error updating marker state:', error);
  }
};

/**
 * Animates the marker bouncing effect
 */
export const bounceMarker = (marker: mapboxgl.Marker): void => {
  if (!marker) return;
  
  try {
    const element = marker.getElement();
    
    element.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-20px)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 500,
      iterations: 1
    });
  } catch (error) {
    console.error('Error bouncing marker:', error);
  }
};

/**
 * Centers and zooms the map to a specific marker
 */
export const focusOnMarker = (
  map: mapboxgl.Map,
  marker: mapboxgl.Marker
): void => {
  if (!map || !marker) {
    console.warn('Map or marker not available for focus');
    return;
  }
  
  try {
    // Get marker location
    const lngLat = marker.getLngLat();
    
    // Check if map is ready
    if (!map.loaded()) {
      console.warn('Map not ready for focus');
      return;
    }
    
    // Fly to marker location
    map.flyTo({
      center: lngLat,
      zoom: 14,
      essential: true,
      duration: 1000
    });
    
    // Bounce the marker
    bounceMarker(marker);
  } catch (error) {
    console.error('Error focusing on marker:', error);
  }
};

/**
 * Fits the map to show all markers within the bounds
 */
export const fitMapToBounds = (
  map: mapboxgl.Map, 
  bounds: mapboxgl.LngLatBounds,
  isMobile: boolean
): void => {
  if (!map) {
    console.warn('Map not available for fitting bounds');
    return;
  }
  
  try {
    // Check if map is ready
    if (!map.loaded()) {
      console.warn('Map not ready for fitting bounds');
      return;
    }
    
    if (!bounds || bounds.isEmpty()) {
      // If no valid coordinates, center on a default location
      map.setCenter([-97.7431, 30.2672]); // Default to Austin, TX
      map.setZoom(4); // Zoom out to show more area
      console.warn('No valid coordinates found in properties. Using default center.');
      return;
    }
    
    // Add some padding to ensure all markers are visible
    const boundsPadding = isMobile ? 50 : 100;
    
    map.fitBounds(bounds, {
      padding: boundsPadding,
      maxZoom: 15,
      duration: 1000
    });
  } catch (err) {
    console.error('Error fitting bounds:', err);
    // Fallback to default center if fitBounds fails
    try {
      map.setCenter([-97.7431, 30.2672]);
      map.setZoom(4);
    } catch (centerError) {
      console.error('Error setting default center:', centerError);
    }
  }
};
