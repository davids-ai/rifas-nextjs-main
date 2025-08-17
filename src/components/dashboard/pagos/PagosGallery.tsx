'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRifas } from '@/hooks/useRifas';
import React, { useState } from 'react';
import { useEliminarRifa } from '@/hooks/useEliminarRifa';

const SUPABASE_URL = 'https://ykadqjrmfioixplxvyfa.supabase.co/storage/v1/object/public/imagenes/';

export function PagosGallery() {
  const { rifas, loading } = useRifas();
  const [rifasLocal, setRifasLocal] = useState(rifas);
  const { eliminarRifa, eliminando, error } = useEliminarRifa();

  // Sincroniza rifas locales con las rifas del hook principal
  React.useEffect(() => {
    setRifasLocal(rifas);
  }, [rifas]);

  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta rifa?')) return;
    const ok = await eliminarRifa(id);
    if (ok) {
      setRifasLocal(rifasLocal.filter((r) => r.id !== id));
    }
  };

  if (loading) return <p>Cargando rifas...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {rifasLocal.map((rifa) => {
        const imageUrl = `${SUPABASE_URL}${rifa.imagen}`;
        return (
          <div key={rifa.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <div className="relative w-full h-64 mb-2">
              <Image src={imageUrl} alt={rifa.titulo} fill className="rounded-md object-cover" />
            </div>
            <h3 className="text-lg font-semibold">{rifa.titulo}</h3>
            <p className="text-sm text-gray-600">{rifa.descripcion}</p>
            <div className="flex gap-2 mt-4">
              <Link href={`/dashboard/pagos/${rifa.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver detalles</button>
              </Link>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleEliminar(rifa.id)}
                disabled={eliminando === rifa.id}
              >
                {eliminando === rifa.id ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        );
      })}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
}
