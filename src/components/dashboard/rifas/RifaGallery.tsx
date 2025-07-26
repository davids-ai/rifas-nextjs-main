'use client';

import Link from 'next/link';
import { useRifas } from '@/hooks/useRifas';
import Image from 'next/image';

const SUPABASE_URL = 'https://ykadqjrmfioixplxvyfa.supabase.co/storage/v1/object/public/imagenes/';

export function RifaGallery() {
  const { rifas, loading } = useRifas();

  if (loading) return <p>Cargando rifas...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {rifas.map((rifa) => {
        const imageUrl = `${SUPABASE_URL}${rifa.imagen}`;

        return (
          <div key={rifa.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <Image src={imageUrl} alt={rifa.titulo} className="rounded-md object-cover mb-2 w-full h-auto" />
            <h3 className="text-lg font-semibold">{rifa.titulo}</h3>
            <p className="text-sm text-gray-600">{rifa.descripcion}</p>
            <Link href={`/dashboard/rifas/${rifa.id}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver detalles</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
