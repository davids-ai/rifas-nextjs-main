// src/hooks/useRifas.ts
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export interface Rifa {
  id: string;
  titulo: string;
  descripcion: string;
  cantidad_boletos: number;
  imagen: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
  creada_por: string;
  created_at: string;
  mostrar_boletos: boolean;
  mostrar_vendidos: boolean;
  enlace_transmision: string;
  sorteo_forzado: boolean;
  venden_todos_boletos: boolean;
}

export function useRifas() {
  const [rifas, setRifas] = useState<Rifa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRifas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('rifas')
        .select('*')
        .order('fecha_fin', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setRifas(data || []);
      }

      setLoading(false);
    };

    fetchRifas();
  }, []);

  return { rifas, loading, error };
}
