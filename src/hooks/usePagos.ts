'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Pago {
  id: string;
  user_id: string;
  boleto_id: string;
  monto: number;
  metodo: string;
  estado: string;
  created_at: string;
  nombres: string;
  numero: string;
  imagen: string;
}

export function usePagos() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [filteredPagos, setFilteredPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [estado, setEstado] = useState('todos');

  // Actualiza el estado de un pago en Supabase y refresca la lista
  const updateEstadoPago = async (id: string, nuevoEstado: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from('pagos').update({ estado: nuevoEstado }).eq('id', id);
    let success = false;
    if (!error) {
      success = true;
      // Refresca la lista de pagos
      const { data } = await supabase.from('pagos').select('*').order('created_at', { ascending: false });
      if (data) setPagos(data);
    }
    setLoading(false);
    return { success, error: error?.message };
  };

  useEffect(() => {
    const fetchPagos = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase.from('pagos').select('*').order('created_at', { ascending: false });

      if (data) setPagos(data);
      setLoading(false);
    };

    fetchPagos();
  }, []);

  useEffect(() => {
    const filtro = pagos.filter((p) => {
      const coincideNombre = p.nombres.toLowerCase().includes(search.toLowerCase());
      const coincideEstado = estado === 'todos' || p.estado === estado;
      return coincideNombre && coincideEstado;
    });

    setFilteredPagos(filtro);
  }, [search, estado, pagos]);

  return {
    pagos: filteredPagos,
    loading,
    search,
    setSearch,
    estado,
    setEstado,
    updateEstadoPago,
  };
}
