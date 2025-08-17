import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useEliminarRifa() {
  const [eliminando, setEliminando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const eliminarRifa = async (id: string) => {
    setEliminando(id);
    setError(null);
    const { error } = await supabase.from('rifas').delete().eq('id', id);
    if (error) {
      setError('Error al eliminar la rifa: ' + error.message);
      setEliminando(null);
      return false;
    }
    setEliminando(null);
    return true;
  };

  return { eliminarRifa, eliminando, error };
}
