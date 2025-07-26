'use client';

import { usePagos } from '@/hooks/usePagos';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';

export function PagosList() {
  const {
    pagos,
    loading,
    search,
    setSearch,
    estado,
    setEstado,
    updateEstadoPago,
  } = usePagos();
  const { toast } = useToast();

  // Nueva función para manejar la actualización y mostrar notificación
  const handleUpdateEstado = async (id: string, nuevoEstado: string) => {
    const result = await updateEstadoPago(id, nuevoEstado);
    if (result.success) {
      toast({
        title: 'Éxito',
        description: `Pago ${nuevoEstado} correctamente.`,
      });
    } else {
      toast({
        title: 'Error',
        description: result.error ? result.error : 'No se pudo actualizar el estado.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-1/2"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border p-2 rounded-md sm:w-1/3"
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>

      {loading ? (
        <p>Cargando pagos...</p>
      ) : pagos.length === 0 ? (
        <p>No se encontraron pagos.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pagos.map((pago) => (
            <div key={pago.id} className="border p-4 rounded-md shadow-sm space-y-2 bg-white">
              <div className="font-bold">{pago.nombres}</div>
              <div>Monto: ${pago.monto}</div>
              <div>Método: {pago.metodo}</div>
              <div>Estado:
                <span className={`ml-2 font-semibold ${pago.estado === 'aprobado' ? 'text-green-600' : pago.estado === 'pendiente' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {pago.estado}
                </span>
              </div>
              <div className="text-sm text-gray-500">Número: {pago.numero}</div>
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src={`https://ykadqjrmfioixplxvyfa.supabase.co/storage/v1/object/public/imagenes${pago.imagen.startsWith('/') ? pago.imagen : '/' + pago.imagen}`}
                  alt={`Comprobante de ${pago.nombres}`}
                  fill
                  className="object-cover"
                />
              </div>
              {pago.estado === 'pendiente' && (
                <div className="flex justify-between gap-2 pt-2">
                  <button
                    onClick={() => handleUpdateEstado(pago.id, 'aprobado')}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleUpdateEstado(pago.id, 'rechazado')}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
