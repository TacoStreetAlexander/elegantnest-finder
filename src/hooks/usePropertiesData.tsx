
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Property } from '@/types/property';
import { fetchAllProperties } from '@/utils/propertyQueries';
import { usePropertyFilters } from './usePropertyFilters';

export const usePropertiesData = () => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const ITEMS_PER_PAGE = 20;
  
  // Get current filters
  const {
    metroRegion,
    selectedBedrooms,
    priceRange,
    selectedAmenities
  } = usePropertyFilters();
  
  // Convert selected bedrooms from string[] to number[]
  const bedroomNumbers = selectedBedrooms.map(bed => 
    bed === 'Studio' ? 0 : parseInt(bed, 10)
  );
  
  // Create a query key that includes all filters
  const queryKey = [
    'properties', 
    page, 
    metroRegion, 
    priceRange[0], 
    priceRange[1], 
    bedroomNumbers.join(','),
    selectedAmenities.join(',')
  ];
  
  // Get properties data from Supabase with pagination and filters
  const { data: paginatedProperties, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: async ({ queryKey }) => {
      // Only include filters that are actually selected by the user
      const filtersParam = {
        // Only include metroRegion if it's not the default
        metroRegion: metroRegion !== 'all-regions' ? metroRegion : undefined,
        // Only include price filters if they're different from the defaults
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 10000 ? priceRange[1] : undefined,
        // Only include bedrooms if there are any selected
        bedrooms: bedroomNumbers.length > 0 ? bedroomNumbers : undefined,
        // Only include amenities if there are any selected
        amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined
      };
      
      return fetchAllProperties(ITEMS_PER_PAGE, page, filtersParam);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching properties:', err);
        toast({
          title: 'Error',
          description: 'Failed to fetch properties.',
          variant: 'destructive'
        });
      }
    }
  });
  
  // Update all properties when paginated data changes
  useEffect(() => {
    if (paginatedProperties) {
      if (page === 0) {
        // Reset properties when filters change (page is reset to 0)
        setAllProperties(paginatedProperties);
      } else {
        // Append new properties for pagination
        setAllProperties(prev => [...prev, ...paginatedProperties]);
      }
      
      // Check if we've reached the end
      setHasMore(paginatedProperties.length === ITEMS_PER_PAGE);
    }
  }, [paginatedProperties, page]);
  
  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [metroRegion, priceRange, selectedBedrooms, selectedAmenities]);
  
  // Function to load more properties
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading, hasMore]);
  
  // Log properties data for debugging
  useEffect(() => {
    console.log('Properties data:', {
      total: allProperties.length,
      currentPage: page,
      hasMore,
      filters: {
        metroRegion,
        priceRange,
        bedrooms: bedroomNumbers,
        amenities: selectedAmenities
      }
    });
    
    if (allProperties.length === 0 && !isLoading) {
      console.log('No properties returned. This could be because no properties match the filters, or there was an error fetching data.');
    }
  }, [allProperties, page, hasMore, metroRegion, priceRange, bedroomNumbers, selectedAmenities, isLoading]);

  return {
    properties: allProperties,
    isLoading,
    error,
    hasMore,
    loadMore
  };
};
