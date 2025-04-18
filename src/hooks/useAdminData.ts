
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAdminData() {
  // Query to fetch users
  const usersQuery = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_users_for_admin');
      if (error) throw error;
      return data;
    },
  });

  // Query to fetch most saved properties
  const savedPropertiesQuery = useQuery({
    queryKey: ['admin', 'saved-properties'],
    queryFn: async () => {
      // Get all saved properties
      const { data: savedData, error: savedError } = await supabase
        .from('saved_properties')
        .select('*');
      
      if (savedError) throw savedError;
      
      // Count occurrences of each property_id
      const propertyCounts = savedData.reduce((acc, item) => {
        acc[item.property_id] = (acc[item.property_id] || 0) + 1;
        return acc;
      }, {});
      
      // Convert to array and sort by count
      const sortedCounts = Object.entries(propertyCounts)
        .map(([property_id, count]) => ({ 
          property_id: parseInt(property_id), 
          count 
        }))
        .sort((a, b) => b.count - a.count);
      
      // If we have properties to look up
      if (sortedCounts.length > 0) {
        const propertyIds = sortedCounts.map(item => item.property_id);
        
        // Fetch property details
        const { data: propertyData, error: propertyError } = await supabase
          .from('Senior Draft 3')
          .select('id, name, city')
          .in('id', propertyIds);
        
        if (propertyError) throw propertyError;
        
        // Combine the count with property details
        return sortedCounts.map(countItem => {
          const property = propertyData?.find(p => p.id === countItem.property_id);
          return {
            property_id: countItem.property_id,
            count: countItem.count,
            "Senior Draft 3": property || { name: 'Unknown', city: 'Unknown' }
          };
        });
      }
      
      return [];
    },
  });

  // Query to fetch leads
  const leadsQuery = useQuery({
    queryKey: ['admin', 'leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return {
    users: usersQuery.data ?? [],
    savedProperties: savedPropertiesQuery.data ?? [],
    leads: leadsQuery.data ?? [],
    isLoading: usersQuery.isLoading || savedPropertiesQuery.isLoading || leadsQuery.isLoading,
    error: usersQuery.error || savedPropertiesQuery.error || leadsQuery.error,
  };
}
