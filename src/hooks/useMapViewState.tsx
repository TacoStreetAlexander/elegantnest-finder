
import { usePropertiesData } from './usePropertiesData';
import { useRegionSelection } from './useRegionSelection';
import { usePropertySelection } from './usePropertySelection';
import { useMapVisibility } from './useMapVisibility';

export const useMapViewState = () => {
  // Use our smaller, focused hooks
  const { properties, isLoading, error } = usePropertiesData();
  const { selectedRegion, metroRegions, filteredProperties, handleRegionChange } = useRegionSelection(properties);
  const { selectedProperty, listingRef, handlePropertySelect } = usePropertySelection();
  const { showMap, toggleMap } = useMapVisibility();
  
  return {
    properties,
    isLoading,
    error,
    selectedRegion,
    filteredProperties,
    selectedProperty,
    showMap,
    listingRef,
    metroRegions,
    handleRegionChange,
    handlePropertySelect,
    toggleMap
  };
};
