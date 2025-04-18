
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property } from '@/types/property';

interface FilterContextType {
  metroRegion: string;
  setMetroRegion: (region: string) => void;
  selectedBedrooms: string[];
  setSelectedBedrooms: (bedrooms: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function PropertyFiltersProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters
  const [metroRegion, setMetroRegion] = useState(searchParams.get('region') || '');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>(
    searchParams.get('bedrooms')?.split(',').filter(Boolean) || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get('minPrice') || '0'),
    parseInt(searchParams.get('maxPrice') || '10000')
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) || []
  );

  // Update URL when filters change
  const updateSearchParams = useCallback((
    region: string,
    bedrooms: string[],
    range: [number, number],
    amenities: string[]
  ) => {
    const params = new URLSearchParams(searchParams);
    
    if (region) {
      params.set('region', region);
    } else {
      params.delete('region');
    }
    
    if (bedrooms.length > 0) {
      params.set('bedrooms', bedrooms.join(','));
    } else {
      params.delete('bedrooms');
    }
    
    params.set('minPrice', range[0].toString());
    params.set('maxPrice', range[1].toString());
    
    if (amenities.length > 0) {
      params.set('amenities', amenities.join(','));
    } else {
      params.delete('amenities');
    }
    
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const handleSetMetroRegion = useCallback((region: string) => {
    setMetroRegion(region);
    updateSearchParams(region, selectedBedrooms, priceRange, selectedAmenities);
  }, [selectedBedrooms, priceRange, selectedAmenities, updateSearchParams]);

  const handleSetSelectedBedrooms = useCallback((bedrooms: string[]) => {
    setSelectedBedrooms(bedrooms);
    updateSearchParams(metroRegion, bedrooms, priceRange, selectedAmenities);
  }, [metroRegion, priceRange, selectedAmenities, updateSearchParams]);

  const handleSetPriceRange = useCallback((range: [number, number]) => {
    setPriceRange(range);
    updateSearchParams(metroRegion, selectedBedrooms, range, selectedAmenities);
  }, [metroRegion, selectedBedrooms, selectedAmenities, updateSearchParams]);

  const handleSetSelectedAmenities = useCallback((amenities: string[]) => {
    setSelectedAmenities(amenities);
    updateSearchParams(metroRegion, selectedBedrooms, priceRange, amenities);
  }, [metroRegion, selectedBedrooms, priceRange, updateSearchParams]);

  const clearFilters = useCallback(() => {
    setMetroRegion('');
    setSelectedBedrooms([]);
    setPriceRange([0, 10000]);
    setSelectedAmenities([]);
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return (
    <FilterContext.Provider
      value={{
        metroRegion,
        setMetroRegion: handleSetMetroRegion,
        selectedBedrooms,
        setSelectedBedrooms: handleSetSelectedBedrooms,
        priceRange,
        setPriceRange: handleSetPriceRange,
        selectedAmenities,
        setSelectedAmenities: handleSetSelectedAmenities,
        clearFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function usePropertyFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('usePropertyFilters must be used within a PropertyFiltersProvider');
  }
  return context;
}

export function filterProperties(
  properties: Property[],
  filters: {
    metroRegion: string;
    selectedBedrooms: string[];
    priceRange: [number, number];
    selectedAmenities: string[];
  }
): Property[] {
  return properties.filter(property => {
    // Metro region filter
    if (filters.metroRegion && property.metroRegion !== filters.metroRegion) {
      return false;
    }
    
    // Bedroom filter
    if (filters.selectedBedrooms.length > 0) {
      const hasMatchingBedroom = filters.selectedBedrooms.some(bedType => {
        if (bedType === 'Studio') {
          return property.floorPlans.some(plan => 
            plan.name.toLowerCase().includes('studio') || 
            (plan.bedrooms === 0)
          );
        }
        const numBedrooms = parseInt(bedType);
        return property.floorPlans.some(plan => plan.bedrooms === numBedrooms);
      });
      if (!hasMatchingBedroom) return false;
    }
    
    // Price range filter
    const propertyMinPrice = property.priceRange.min;
    if (propertyMinPrice < filters.priceRange[0] || propertyMinPrice > filters.priceRange[1]) {
      return false;
    }
    
    // Amenities filter
    if (filters.selectedAmenities.length > 0) {
      const hasAllAmenities = filters.selectedAmenities.every(amenity =>
        property.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }
    
    return true;
  });
}
