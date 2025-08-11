'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRifas } from '@/hooks/useRifas';

const SUPABASE_URL = 'https://ykadqjrmfioixplxvyfa.supabase.co/storage/v1/object/public/imagenes/';

export function PagosGallery() {
  const { rifas, loading } = useRifas();

  if (loading) return <p>Cargando rifas...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {rifas.map((rifa) => {
        const imageUrl = `${SUPABASE_URL}${rifa.imagen}`;

        return (
          <div key={rifa.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <div className="relative w-full h-64 mb-2">
              <Image src={imageUrl} alt={rifa.titulo} fill className="rounded-md object-cover" />
            </div>
            <h3 className="text-lg font-semibold">{rifa.titulo}</h3>
            <p className="text-sm text-gray-600">{rifa.descripcion}</p>
            <Link href={`/dashboard/asignar_ganador/${rifa.id}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver detalles</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
