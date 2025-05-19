
import { usePropertiesData } from './usePropertiesData';
import { useRegionSelection } from './useRegionSelection';
import { usePropertySelection } from './usePropertySelection';
import { useMapVisibility } from './useMapVisibility';
import { useEffect, useState, useRef } from 'react';
import { Property } from '@/types/property';

export const useMapViewState = () => {
  // Use our smaller, focused hooks
  const { properties, isLoading, error, hasMore, loadMore } = usePropertiesData();
  const { selectedRegion, metroRegions, handleRegionChange } = useRegionSelection(properties);
  const { selectedProperty, listingRef, handlePropertySelect, initialSelectionMadeRef } = usePropertySelection();
  const { showMap, toggleMap } = useMapVisibility();
  
  // Track if we're loading more properties
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const previousPropertiesLength = useRef<number>(0);
  
  // Handle scroll events to load more properties
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isLoading || isLoadingMore || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Load more when user scrolls to 80% of the list
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setIsLoadingMore(true);
      loadMore();
    }
  };
  
  // Reset loading more state when properties change
  useEffect(() => {
    setIsLoadingMore(false);
  }, [properties]);
  
  // Only auto-select a property on initial load if none is already selected
  useEffect(() => {
    // Only act if we have properties and haven't made an initial selection yet
    if (
      !initialSelectionMadeRef.current && 
      properties.length > 0 && 
      !selectedProperty && 
      !isLoading &&
      properties.length !== previousPropertiesLength.current
    ) {
      // Mark that we've made our initial selection
      initialSelectionMadeRef.current = true;
      
      // Select the first property
      handlePropertySelect(properties[0].id);
      
      // Log that we've done the initial selection
      console.log('Made initial property selection:', properties[0].id);
    }
    
    // Update the reference to current properties length
    previousPropertiesLength.current = properties.length;
  }, [properties, selectedProperty, handlePropertySelect, isLoading]);
  
  return {
    properties,
    isLoading,
    error,
    selectedRegion,
    filteredProperties: properties, // We're now filtering in the query
    selectedProperty,
    showMap,
    listingRef,
    metroRegions,
    handleRegionChange,
    handlePropertySelect,
    toggleMap,
    hasMore,
    isLoadingMore,
    handleScroll
  };
};
