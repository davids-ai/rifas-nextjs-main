'use client';

import Link from 'next/link';
import { useRifas } from '@/hooks/useRifas';
import Image from 'next/image';
import { CountdownTimer } from './countdown-timer';

const SUPABASE_URL = 'https://ykadqjrmfioixplxvyfa.supabase.co/storage/v1/object/public/imagenes/';

export function RifaGallery() {
  const { rifas, loading } = useRifas();

  if (loading) return <p>Cargando rifas...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {rifas.map((rifa) => {
        const imageUrl = `${SUPABASE_URL}${rifa.imagen}`;
        const esActiva = rifa.estado?.toLowerCase() === 'activa';
        const esCerrada = rifa.estado?.toLowerCase() === 'cerrada';

        return (
          <div
            key={rifa.id}
            className="border rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Imagen */}
            <div className="relative w-full h-48">
              <Image
                src={imageUrl}
                alt={rifa.titulo}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-gray-900">{rifa.titulo}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{rifa.descripcion}</p>

              {/* Estado */}
              <div className="flex items-center gap-2 mt-2 text-sm font-semibold">
                <span>Estado:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    esActiva
                      ? 'bg-green-100 text-green-700'
                      : esCerrada
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {rifa.estado}
                </span>
              </div>

              {/* Boleto ganador */}
              {rifa.boleto_ganador && (
                <p className="text-sm font-medium mt-2">
                  <span className="font-bold text-green-600">Boleto ganador:</span> {rifa.boleto_ganador}
                </p>
              )}

              {/* Temporizador */}
              {esActiva && rifa.fecha_fin && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Finaliza en:</p>
                  <CountdownTimer targetDate={new Date(rifa.fecha_fin)} />
                </div>
              )}

              {/* Botón */}
              <div className="mt-4">
                {esActiva ? (
                  <Link href={`/rifas/${rifa.id}`}>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                      Ver detalles
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Rifa cerrada
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
