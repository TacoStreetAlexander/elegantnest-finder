
import { supabase } from '@/integrations/supabase/client';
import { Property } from '../types/property';
import { transformPropertyData } from './propertyTransform';
import { getMockProperties } from './mockProperties';

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
      console.warn('No featured properties found');
      return getMockProperties().slice(0, 3);
    }
    
    return data.map(item => transformPropertyData(item));
  } catch (error) {
    console.error('Exception in fetchFeaturedProperties:', error);
    return getMockProperties().slice(0, 3);
  }
};

export const fetchAllProperties = async (): Promise<Property[]> => {
  try {
    const { data, error } = await supabase
      .from('Senior Draft 3' as any)
      .select('*');
    
    if (error) {
      console.error('Error fetching all properties:', error);
      throw error;
    }
    
    console.log('Fetched properties from Supabase:', data?.length);
    
    if (!data || data.length === 0) {
      console.warn('No data returned from Supabase query');
      return getMockProperties();
    }
    
    return data.map(item => transformPropertyData(item));
  } catch (error) {
    console.error('Exception in fetchAllProperties:', error);
    return getMockProperties();
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
      console.warn(`No property found with slug: ${slug}`);
      return null;
    }
    
    return transformPropertyData(data);
  } catch (error) {
    console.error(`Exception in fetchPropertyBySlug for slug ${slug}:`, error);
    return null;
  }
};
