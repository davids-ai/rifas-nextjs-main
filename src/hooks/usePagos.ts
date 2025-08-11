'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function usePagos() {
  const supabase = createClient();
  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [estado, setEstado] = useState('todos');

  useEffect(() => {
    fetchPagos();
  }, [search, estado]);

  async function fetchPagos() {
    setLoading(true);
    let query = supabase.from('pagos').select('*, boletos:boleto_id(id, pagado)'); // Relación para traer info del boleto

    if (estado !== 'todos') {
      query = query.eq('estado', estado);
    }
    if (search.trim() !== '') {
      query = query.ilike('nombres', `%${search}%`);
    }

    const { data, error } = await query;
    if (!error) {
      setPagos(data);
    }
    setLoading(false);
  }

  async function updateEstadoPago(id: string, nuevoEstado: string) {
    try {
      const { data: pagoData, error: pagoError } = await supabase
        .from('pagos')
        .update({ estado: nuevoEstado })
        .eq('id', id)
        .select('boleto_id')
        .single();

      if (pagoError) throw pagoError;

      if (nuevoEstado === 'aprobado' && pagoData?.boleto_id) {
        const { error: boletoError } = await supabase
          .from('boletos')
          .update({ pagado: true })
          .eq('id', pagoData.boleto_id);

        if (boletoError) throw boletoError;
      }

      await fetchPagos();

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  return {
    pagos,
    loading,
    search,
    setSearch,
    estado,
    setEstado,
    updateEstadoPago,
  };
}
