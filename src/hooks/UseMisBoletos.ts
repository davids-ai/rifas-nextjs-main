'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Boleto = {
  id: string;
  rifa_id: string;
  user_id: string;
  pagado: boolean;
  created_at: string;
  numeros_boletos: string[]; // asumiendo que es un array de strings
};

export function useMisBoletos(cedula: string | null) {
  const supabase = createClient();
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cedula) return;

    const fetchBoletos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('boletos')
        .select('*')
        .eq('cedula', cedula)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error cargando boletos:', error.message);
      } else {
        setBoletos(data || []);
      }
      setLoading(false);
    };

    fetchBoletos();
  }, [supabase, cedula]);

  return { boletos, loading };
}
