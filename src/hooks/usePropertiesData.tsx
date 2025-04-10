
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { Property } from '@/types/property';
import { fetchAllProperties } from '@/utils/propertyQueries';

export const usePropertiesData = () => {
  // Get properties data from Supabase
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchAllProperties,
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
  
  // Log properties data for debugging
  useEffect(() => {
    console.log('Properties data:', properties);
    if (properties && properties.length === 0) {
      console.warn('No properties data returned from Supabase');
    }
  }, [properties]);

  return {
    properties: properties || [],
    isLoading,
    error
  };
};
