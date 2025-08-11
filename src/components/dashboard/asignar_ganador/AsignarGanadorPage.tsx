'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function AsignarGanadorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const [rifa, setRifa] = useState<any>(null);
  const [boletoGanador, setBoletoGanador] = useState<number>(0);
  const [enlaceTransmision, setEnlaceTransmision] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRifa() {
      const { data, error } = await supabase.from('rifas').select('*').eq('id', id).single();

      if (!error && data) {
        setRifa(data);
        setBoletoGanador(data.boleto_ganador ?? 0);
        setEnlaceTransmision(data.enlace_transmision ?? '');
      }
    }
    fetchRifa();
  }, [id, supabase]);

  const handleSave = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('rifas')
      .update({
        boleto_ganador: boletoGanador,
        enlace_transmision: enlaceTransmision,
        estado: 'cerrada',
      })
      .eq('id', id);

    setLoading(false);

    if (!error) {
      toast({
        title: 'Rifa actualizada',
        description: 'El ganador y el enlace de transmisión fueron asignados correctamente.',
      });
      router.push('/dashboard/rifas');
    } else {
      toast({
        title: 'Error al actualizar',
        description: error.message || 'No se pudo actualizar la rifa.',
        variant: 'destructive',
      });
    }
  };

  if (!rifa) return <p>Cargando rifa...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Asignar ganador - {rifa.titulo}</h1>

      <label className="block mb-2 font-medium">Número de boleto ganador</label>
      <input
        type="number"
        value={boletoGanador}
        onChange={(e) => setBoletoGanador(Number(e.target.value))}
        className="border rounded p-2 w-full mb-4"
      />

      <label className="block mb-2 font-medium">Enlace de transmisión</label>
      <input
        type="url"
        value={enlaceTransmision}
        onChange={(e) => setEnlaceTransmision(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  );
}
