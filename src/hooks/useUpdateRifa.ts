import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface UpdateRifaData {
  boleto_ganador: number;
  enlace_transmision: string;
  estado: string;
}

export function useUpdateRifa() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRifa = async (id: string, data: UpdateRifaData) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('rifas').update(data).eq('id', id);

    setLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  return { updateRifa, loading, error };
}
