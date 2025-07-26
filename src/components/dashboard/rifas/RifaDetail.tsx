'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useRifaById } from '@/hooks/useRifaById';
import { BoletoForm } from './BoletoForm';

const SUPABASE_IMAGE_URL = 'https://ykadqjrmfioixplxvyfa.supabase.co/storage/v1/object/public/imagenes/';

export function RifaDetail() {
  const { id } = useParams();
  const { rifa, loading, error } = useRifaById(id as string);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!rifa) return <p>No se encontró la rifa.</p>;

  const fullImageUrl = SUPABASE_IMAGE_URL + rifa.imagen;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Información de la rifa */}
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow p-6 mb-8">
        {/* Columna Izquierda: Imagen */}
        <div className="flex-1 flex justify-center items-center mb-6 md:mb-0">
          <Image
            src={fullImageUrl}
            alt={rifa.titulo}
            width={400}
            height={300}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Columna Derecha: Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{rifa.titulo}</h1>
            <p className="text-gray-700 mb-4">{rifa.descripcion}</p>
            <ul className="space-y-2 text-sm">
              <li><strong>Cantidad de boletos:</strong> {rifa.cantidad_boletos}</li>
              <li><strong>Fecha del sorteo:</strong> {new Date(rifa.fecha_fin).toLocaleString()}</li>
              <li>
                <strong>Transmisión en vivo:</strong>{' '}
                <a href={rifa.enlace_transmision} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                  Ver transmisión
                </a>
              </li>
              <li><strong>Boletos vendidos:</strong> {rifa.mostrar_vendidos ? 'Sí' : 'No'}</li>
              <li><strong>Sorteo forzado:</strong> {rifa.sorteo_forzado ? 'Sí' : 'No'}</li>
              <li><strong>¿Deben venderse todos?:</strong> {rifa.venden_todos_boletos ? 'Sí' : 'No'}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Formulario de participación separado */}
      <div className="max-w-4xl mx-auto">
        <BoletoForm rifaId={rifa.id} cantidadBoletos={rifa.cantidad_boletos} valorBoleto={rifa.precio_boleto} />
      </div>
    </div>
  );
}