import { useEffect, useState } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';

export function useUserInfo(supabase: SupabaseClient) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        console.error('Error getting user:', authError);
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      const currentUser = authData.user;
      setUser(currentUser);

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (roleError) {
        console.error('Error fetching role:', roleError.message);
        setRole(null);
      } else {
        setRole(roleData?.role ?? null); // <-- Aquí se guarda el string del rol
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, [supabase]);

  return { user, role, loading };
}