
import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property } from '@/types/property';

export const useRegionSelection = (properties: Property[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all-regions');
  
  // Extract all metro regions from property data
  const metroRegions = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    const regions = Array.from(new Set(properties.map(property => property.metroRegion))).filter(Boolean);
    return regions.sort();
  }, [properties]);
  
  // Filter properties based on selected region
  const filteredProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    if (!selectedRegion || selectedRegion === 'all-regions') return properties;
    
    return properties.filter(property => 
      property.metroRegion?.toLowerCase() === selectedRegion.toLowerCase()
    );
  }, [properties, selectedRegion]);
  
  // Handle region change
  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region);
    const newParams = new URLSearchParams(searchParams);
    
    if (region && region !== 'all-regions') {
      newParams.set('region', region);
    } else {
      newParams.delete('region');
    }
    
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  return {
    selectedRegion,
    metroRegions,
    filteredProperties,
    handleRegionChange
  };
};
