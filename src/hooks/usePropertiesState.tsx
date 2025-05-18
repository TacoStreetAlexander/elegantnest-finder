
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Property } from '@/types/property';
import { propertyData } from '@/data/propertyData';
import { fetchAllProperties } from '@/utils/propertyQueries';

export const usePropertiesState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const isInitialMount = useRef(true);
  
  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get('page') || '1');
  const propertiesPerPage = 6;
  
  // Extract filter parameters
  const regionFilter = searchParams.get('region') || '';
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') || '0') : 0;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') || '10000') : 10000;
  const selectedAmenities = searchParams.get('amenities')?.split(',').filter(Boolean) || [];
  const bedroomsFilter = searchParams.get('bedrooms') || '';
  
  // Create filters object for query
  const filters = {
    metroRegion: regionFilter || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    bedrooms: bedroomsFilter ? [parseInt(bedroomsFilter)] : undefined
  };
  
  // Fetch properties from Supabase using our updated query function
  const { data: supabaseProperties, isLoading, error } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchAllProperties(20, 0, filters),
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching properties:', err);
        toast({
          title: 'Error',
          description: 'Failed to fetch properties. Using static data instead.',
          variant: 'destructive'
        });
      }
    }
  });
  
  // Use memoized filter function to prevent unnecessary recalculations
  const filterProperties = useCallback(() => {
    if (!supabaseProperties) return [];
    
    let filtered = [...supabaseProperties];
    
    // Apply region filter (using metroRegion instead of city)
    if (regionFilter) {
      filtered = filtered.filter(property => 
        property.metroRegion?.toLowerCase() === regionFilter.toLowerCase());
    }
    
    // Apply price filter
    filtered = filtered.filter(property => {
      const propertyPrice = property.priceRange.min;
      return propertyPrice >= minPrice && propertyPrice <= maxPrice;
    });
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(property => 
        selectedAmenities.every(amenity => 
          property.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      );
    }
    
    // Apply bedrooms filter
    if (bedroomsFilter) {
      filtered = filtered.filter(property => 
        property.bedrooms.toString() === bedroomsFilter);
    }
    
    return filtered;
  }, [regionFilter, minPrice, maxPrice, selectedAmenities, bedroomsFilter, supabaseProperties]);

  // Apply filters immediately without artificial delay using useMemo
  const currentFilteredProperties = useMemo(() => 
    isLoading ? [] : filterProperties(), 
    [filterProperties, isLoading]
  );
  
  // Calculate pagination values derived from filteredProperties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = useMemo(() => 
    currentFilteredProperties.slice(indexOfFirstProperty, indexOfLastProperty),
    [currentFilteredProperties, indexOfFirstProperty, indexOfLastProperty]
  );
  const totalPages = Math.ceil(currentFilteredProperties.length / propertiesPerPage);
  
  // Only handle filtered properties updates
  useEffect(() => {
    setFilteredProperties(currentFilteredProperties);
  }, [currentFilteredProperties]);
  
  // Handle initial mount and page changes separately
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      window.scrollTo(0, 0);
    } else if (searchParams.get('page')) {
      // Only scroll to top for explicit page changes
      window.scrollTo(0, 0);
    }
  }, [searchParams]);
  
  // Change page
  const paginate = useCallback((pageNumber: number) => {
    searchParams.set('page', pageNumber.toString());
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return {
    isLoading,
    filteredProperties,
    currentProperties,
    totalPages,
    currentPage,
    supabaseProperties,
    paginate,
    searchParams,
    setSearchParams
  };
};
