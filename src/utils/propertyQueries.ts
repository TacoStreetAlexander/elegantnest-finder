
import { supabase } from '@/integrations/supabase/client';
import { Property } from '../types/property';
import { transformPropertyData } from './propertyTransform';

export const fetchFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const { data, error } = await supabase
      .from('Senior Draft 3' as any) // Type assertion needed since table isn't in generated types yet
      .select('*')
      .limit(3);
    
    if (error) {
      console.error('Error fetching featured properties:', error);
      throw error;
    }
    
    console.log('Raw Supabase data:', data);
    
    if (!data || data.length === 0) {
      console.error('No Supabase data returned for featured properties');
      console.log('Supabase returned empty array []');
      return [];
    }
    
    return data.map(item => transformPropertyData(item));
  } catch (error) {
    console.error('Exception in fetchFeaturedProperties:', error);
    return [];
  }
};

export const fetchAllProperties = async (
  limit: number = 20,
  page: number = 0,
  filters: {
    metroRegion?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number[];
    amenities?: string[];
  } = {}
): Promise<Property[]> => {
  try {
    // Start building the query
    let query = supabase
      .from('Senior Draft 3' as any)
      .select('*');
    
    // Apply filters if provided
    if (filters.metroRegion && filters.metroRegion !== 'all-regions') {
      query = query.eq('metroregion', filters.metroRegion);
    }
    
    if (filters.minPrice !== undefined) {
      query = query.gte('1brstart', filters.minPrice.toString());
    }
    
    if (filters.maxPrice !== undefined) {
      query = query.lte('2brstart', filters.maxPrice.toString());
    }
    
    // Apply pagination
    const offset = page * limit;
    query = query.range(offset, offset + limit - 1);
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
    
    console.log(`Fetched ${data?.length} properties from Supabase (page ${page}, limit ${limit})`);
    
    if (!data || data.length === 0) {
      console.error('No Supabase data returned from query', {
        filters,
        page,
        limit
      });
      console.log('Supabase returned empty array []');
      return [];
    }
    
    // Transform the data
    const properties = data.map(item => transformPropertyData(item));
    
    // Apply client-side filtering for complex filters that can't be done in the database
    let filteredProperties = properties;
    
    // Filter by bedrooms if specified
    if (filters.bedrooms && filters.bedrooms.length > 0) {
      filteredProperties = filteredProperties.filter(property => {
        return property.floorPlans.some(plan => {
          // Check for studio (0 bedrooms)
          if (filters.bedrooms.includes(0) && 
              (plan.bedrooms === 0 || plan.name.toLowerCase().includes('studio'))) {
            return true;
          }
          
          // Check for specific bedroom counts
          return filters.bedrooms.includes(plan.bedrooms);
        });
      });
    }
    
    // Filter by amenities if specified
    if (filters.amenities && filters.amenities.length > 0) {
      filteredProperties = filteredProperties.filter(property => {
        return filters.amenities!.every(amenity => 
          property.amenities.some(a => 
            a.toLowerCase().includes(amenity.toLowerCase())
          )
        );
      });
    }
    
    return filteredProperties;
  } catch (error) {
    console.error('Exception in fetchAllProperties:', error);
    return [];
  }
};

export const fetchPropertyBySlug = async (slug: string): Promise<Property | null> => {
  try {
    if (!slug) {
      console.error('Invalid slug provided:', slug);
      return null;
    }
    
    const { data, error } = await supabase
      .from('Senior Draft 3' as any)
      .select('*')
      .eq('url_slug', slug)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching property by slug:', error);
      throw error;
    }
    
    if (!data) {
      console.error(`No Supabase data returned for property with slug: ${slug}`);
      return null;
    }
    
    return transformPropertyData(data);
  } catch (error) {
    console.error(`Exception in fetchPropertyBySlug for slug ${slug}:`, error);
    return null;
  }
};
