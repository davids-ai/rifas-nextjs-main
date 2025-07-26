'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Rifa {
  id: string;
  titulo: string;
  descripcion: string;
  cantidad_boletos: number;
  precio_boleto: number;
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

export function useRifaById(id: string) {
  const [rifa, setRifa] = useState<Rifa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const supabase = createClient();

    const fetchRifa = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('rifas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setRifa(data as Rifa);
      }

      setLoading(false);
    };

    fetchRifa();
  }, [id]);

  return { rifa, loading, error };
}