'use client';

import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const useInsertRifa = () => {
  const insertRifa = async (data: {
    titulo: string;
    descripcion: string;
    precio: number;
    fecha_sorteo: string;
  }) => {
    const { error } = await supabase.from('rifas').insert([data]);

    if (error) {
      console.error('Error insertando rifa:', error.message);
      return { success: false, error };
    }

    return { success: true };
  };

  return { insertRifa };
};
