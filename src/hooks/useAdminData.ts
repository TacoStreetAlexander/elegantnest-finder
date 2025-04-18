
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
      // Use a raw SQL query with the count aggregation and group by
      const { data: countData, error: countError } = await supabase
        .from('saved_properties')
        .select(`
          property_id,
          count:count(*)
        `)
        .order('count', { ascending: false });
      
      if (countError) throw countError;
      
      // Then, fetch the property details for each property_id
      if (countData && countData.length > 0) {
        const propertyIds = countData.map(item => item.property_id);
        
        const { data: propertyData, error: propertyError } = await supabase
          .from('Senior Draft 3')
          .select('id, name, city')
          .in('id', propertyIds);
        
        if (propertyError) throw propertyError;
        
        // Combine the count with property details
        return countData.map(countItem => {
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
