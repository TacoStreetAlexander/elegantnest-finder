
import { useRef, useEffect, useMemo, useState } from 'react';
import { Property } from '../../types/property';
import PropertyMapView from './PropertyMapView';
import MapLoadingIndicator from './MapLoadingIndicator';
import MapErrorState from './MapErrorState';
import MapEmptyState from './MapEmptyState';
import { useIsMobile } from '../../hooks/use-mobile';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useSavedProperties } from '@/hooks/useSavedProperties';

interface PropertyMapProps {
  properties: Property[];
  selectedPropertyId: number | null;
  onPropertySelect: (id: number) => void;
}

const PropertyMapWrapper = ({ properties, selectedPropertyId, onPropertySelect }: PropertyMapProps) => {
  // Use a ref instead of state to prevent re-renders
  const isMountedRef = useRef(false);
  const isMobile = useIsMobile();
  
  // Get current filters
  const {
    metroRegion,
    selectedBedrooms,
    priceRange,
    selectedAmenities,
    showSavedOnly
  } = usePropertyFilters();
  
  // Get saved properties for the saved filter
  const { savedPropertyIds } = useSavedProperties();
  
  // Limit the number of markers shown on the map for performance
  const MAX_MARKERS = 50;
  
  // State to track if we're showing limited markers
  const [isLimited, setIsLimited] = useState(false);
  
  // Apply filters and limit the number of markers
  const optimizedProperties = useMemo(() => {
    // We don't need to apply filters here anymore since they're applied in the query
    // Just limit the number of markers for performance
    
    // Apply saved only filter (this is still done client-side)
    let filtered = [...properties];
    if (showSavedOnly) {
      filtered = filtered.filter(property => savedPropertyIds.includes(property.id));
    }
    
    // Check if we need to limit the markers
    if (filtered.length > MAX_MARKERS) {
      setIsLimited(true);
      return filtered.slice(0, MAX_MARKERS);
    } else {
      setIsLimited(false);
      return filtered;
    }
  }, [properties, showSavedOnly, savedPropertyIds]);
  
  // Set component as mounted immediately
  useEffect(() => {
    console.log('PropertyMapWrapper component mounted');
    // Set mounted immediately instead of using a timeout
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      console.log('PropertyMapWrapper component unmounted');
    };
  }, []);
  
  // Log filter changes for debugging
  useEffect(() => {
    console.log('Map filters applied:', {
      metroRegion,
      selectedBedrooms,
      priceRange,
      selectedAmenities,
      showSavedOnly,
      filteredCount: optimizedProperties.length,
      totalCount: properties.length,
      isLimited
    });
  }, [metroRegion, selectedBedrooms, priceRange, selectedAmenities, showSavedOnly, optimizedProperties.length, properties.length, isLimited]);
  
  // Show empty state if no properties available
  if (optimizedProperties.length === 0) {
    return <MapEmptyState />;
  }
  
  return (
    <PropertyMapView
      properties={optimizedProperties}
      selectedPropertyId={selectedPropertyId}
      onPropertySelect={onPropertySelect}
      isComponentMounted={isMountedRef.current}
      isMobile={isMobile}
      totalProperties={properties.length}
    />
  );
};

export default PropertyMapWrapper;
