
import { useRef, useEffect, useMemo } from 'react';
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
  
  // Apply filters to properties
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];
    
    // Apply metro region filter
    if (metroRegion && metroRegion !== 'all-regions') {
      filtered = filtered.filter(property => 
        property.metroRegion?.toLowerCase() === metroRegion.toLowerCase());
    }
    
    // Apply bedroom type filter
    if (selectedBedrooms.length > 0) {
      filtered = filtered.filter(property => {
        // Check if property has any of the selected bedroom types
        return selectedBedrooms.some(bedroomType => {
          if (bedroomType === 'Studio') {
            return property.floorPlans.some(plan => 
              plan.name.toLowerCase().includes('studio') || 
              (plan.bedrooms === 0));
          } else {
            const bedroomCount = parseInt(bedroomType);
            return property.floorPlans.some(plan => plan.bedrooms === bedroomCount);
          }
        });
      });
    }
    
    // Apply price range filter
    filtered = filtered.filter(property => {
      const propertyMinPrice = property.priceRange.min;
      return propertyMinPrice >= priceRange[0] && propertyMinPrice <= priceRange[1];
    });
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(property => 
        selectedAmenities.every(amenity => 
          property.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    
    // Apply saved only filter
    if (showSavedOnly) {
      filtered = filtered.filter(property => savedPropertyIds.includes(property.id));
    }
    
    return filtered;
  }, [
    properties, 
    metroRegion, 
    selectedBedrooms, 
    priceRange, 
    selectedAmenities, 
    showSavedOnly,
    savedPropertyIds
  ]);
  
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
      filteredCount: filteredProperties.length,
      totalCount: properties.length
    });
  }, [metroRegion, selectedBedrooms, priceRange, selectedAmenities, showSavedOnly, filteredProperties.length, properties.length]);
  
  // Show empty state if no properties available after filtering
  if (filteredProperties.length === 0) {
    return <MapEmptyState />;
  }
  
  return (
    <PropertyMapView
      properties={filteredProperties}
      selectedPropertyId={selectedPropertyId}
      onPropertySelect={onPropertySelect}
      isComponentMounted={isMountedRef.current}
      isMobile={isMobile}
    />
  );
};

export default PropertyMapWrapper;
