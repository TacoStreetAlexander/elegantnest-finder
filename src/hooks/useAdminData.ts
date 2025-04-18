
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

  // Query to fetch saved properties for all users
  const userSavedPropertiesQuery = useQuery({
    queryKey: ['admin', 'user-saved-properties'],
    queryFn: async () => {
      const { data: savedData, error: savedError } = await supabase
        .from('saved_properties')
        .select(`
          user_id,
          property_id,
          "Senior Draft 3" (
            id,
            name,
            city
          )
        `);
      
      if (savedError) throw savedError;
      
      // Group properties by user_id
      const userProperties = savedData.reduce((acc: Record<string, any[]>, item) => {
        if (!acc[item.user_id]) {
          acc[item.user_id] = [];
        }
        acc[item.user_id].push({
          property_id: item.property_id,
          name: item["Senior Draft 3"]?.name || 'Unknown',
          city: item["Senior Draft 3"]?.city || 'Unknown'
        });
        return acc;
      }, {});
      
      return userProperties;
    },
  });

  // Query to fetch most saved properties
  const mostSavedPropertiesQuery = useQuery({
    queryKey: ['admin', 'most-saved-properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_properties')
        .select(`
          property_id,
          "Senior Draft 3" (
            id,
            name,
            city
          )
        `);
      
      if (error) throw error;
      
      // Count properties by property_id
      const propertyCounts = data.reduce((acc: Record<number, any>, item) => {
        const propertyId = item.property_id as number;
        if (!acc[propertyId]) {
          acc[propertyId] = {
            property_id: propertyId,
            "Senior Draft 3": item["Senior Draft 3"],
            count: 0
          };
        }
        acc[propertyId].count += 1;
        return acc;
      }, {});
      
      // Convert to array and sort by count
      return Object.values(propertyCounts).sort((a: any, b: any) => 
        (b.count as number) - (a.count as number)
      );
    },
  });

  // Query to fetch contact form submissions (leads)
  const leadsQuery = useQuery({
    queryKey: ['admin', 'leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return {
    users: usersQuery.data ?? [],
    userSavedProperties: userSavedPropertiesQuery.data ?? {},
    mostSavedProperties: mostSavedPropertiesQuery.data ?? [],
    leads: leadsQuery.data ?? [],
    isLoading: usersQuery.isLoading || userSavedPropertiesQuery.isLoading || 
               mostSavedPropertiesQuery.isLoading || leadsQuery.isLoading,
    error: usersQuery.error || userSavedPropertiesQuery.error || 
           mostSavedPropertiesQuery.error || leadsQuery.error,
  };
}
