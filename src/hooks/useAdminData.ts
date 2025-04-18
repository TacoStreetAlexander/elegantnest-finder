
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
      const { data, error } = await supabase
        .from('saved_properties')
        .select(`
          property_id,
          "Senior Draft 3" (
            name,
            city
          ),
          count: property_id(count)
        `)
        .groupby('property_id, "Senior Draft 3".name, "Senior Draft 3".city')
        .order('count', { ascending: false });
      
      if (error) throw error;
      return data;
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
