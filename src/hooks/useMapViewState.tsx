
import { usePropertiesData } from './usePropertiesData';
import { useRegionSelection } from './useRegionSelection';
import { usePropertySelection } from './usePropertySelection';
import { useMapVisibility } from './useMapVisibility';
import { useEffect, useState } from 'react';
import { Property } from '@/types/property';

export const useMapViewState = () => {
  // Use our smaller, focused hooks
  const { properties, isLoading, error, hasMore, loadMore } = usePropertiesData();
  const { selectedRegion, metroRegions, handleRegionChange } = useRegionSelection(properties);
  const { selectedProperty, listingRef, handlePropertySelect } = usePropertySelection();
  const { showMap, toggleMap } = useMapVisibility();
  
  // Track if we're loading more properties
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
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
