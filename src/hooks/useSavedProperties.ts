import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function useSavedProperties() {
  const { isLoggedIn, userId } = useAuth();
  const [savedPropertyIds, setSavedPropertyIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch saved properties when user logs in
  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!isLoggedIn || !userId) {
        setSavedPropertyIds([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_properties')
          .select('property_id')
          .eq('user_id', userId);

        if (error) {
          throw error;
        }

        const propertyIds = data.map(item => item.property_id);
        setSavedPropertyIds(propertyIds);
      } catch (error) {
        console.error('Error fetching saved properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, [isLoggedIn, userId]);

  // Check if a property is saved
  const isPropertySaved = (propertyId: number): boolean => {
    return savedPropertyIds.includes(propertyId);
  };

  // Toggle save/unsave property
  const toggleSaveProperty = async (propertyId: number): Promise<{ success: boolean; message: string }> => {
    if (!isLoggedIn) {
      return { success: false, message: 'Please log in to save listings.' };
    }

    try {
      const isSaved = isPropertySaved(propertyId);

      if (isSaved) {
        // Remove from saved properties
        const { error } = await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', userId)
          .eq('property_id', propertyId);

        if (error) throw error;

        setSavedPropertyIds(savedPropertyIds.filter(id => id !== propertyId));
        return { success: true, message: 'Property removed from saved listings.' };
      } else {
        // Add to saved properties
        const { error } = await supabase
          .from('saved_properties')
          .insert([{ user_id: userId, property_id: propertyId }]);

        if (error) throw error;

        setSavedPropertyIds([...savedPropertyIds, propertyId]);
        return { success: true, message: 'Property saved successfully.' };
      }
    } catch (error) {
      console.error('Error toggling saved property:', error);
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  return {
    savedPropertyIds,
    isPropertySaved,
    toggleSaveProperty,
    loading,
  };
}
