
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

  return {
    users: usersQuery.data ?? [],
    userSavedProperties: userSavedPropertiesQuery.data ?? {},
    isLoading: usersQuery.isLoading || userSavedPropertiesQuery.isLoading,
    error: usersQuery.error || userSavedPropertiesQuery.error,
  };
}
