import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useBoletosOcupados(rifaId: string) {
  const [ocupados, setOcupados] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rifaId) return;
    const supabase = createClient();
    const fetchBoletos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('boletos')
        .select('numeros_boletos')
        .eq('rifa_id', rifaId);
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      // Unir todos los arrays de numeros_boletos en uno solo
      const allNumbers: number[] = [];
      for (const row of data) {
        if (Array.isArray(row.numeros_boletos)) {
          allNumbers.push(...row.numeros_boletos);
        }
      }
      setOcupados(allNumbers);
      setLoading(false);
    };
    fetchBoletos();
  }, [rifaId]);

  return { ocupados, loading, error };
}
