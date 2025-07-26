'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

type RaffleForm = {
  title: string;
  description: string;
  image: File | undefined;
  totalTickets: string;
  precio_boleto: string;
  forceDraw: boolean;
  showSold: boolean;
  streamLink?: string;
  startDate?: string;
  endDate?: string;
  sellAllTickets: boolean;
  showTickets: boolean;
  status?: string;
};

export function useCreateRaffle(form: RaffleForm) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

  // TODO: Reemplaza 'unknown' por el tipo adecuado si es posible
  const handleSubmit = async (e: unknown, onSuccess?: () => void) => {
    (e as React.FormEvent).preventDefault();
    setUploading(true);

    const {
      title,
      description,
      image,
      totalTickets,
      precio_boleto,
      forceDraw,
      showSold,
      streamLink,
      startDate,
      endDate,
      sellAllTickets,
      showTickets,
      status, // <- opcionalmente puedes pasar estado ("activa", "cerrada", etc.)
    } = form;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const createdBy = user?.id;

    let filePath = uploadedImagePath;
    if (!filePath) {
      if (!image) {
        toast({
          title: 'Error',
          description: 'Debes seleccionar una imagen para la rifa.',
          variant: 'destructive',
        });
        setUploading(false);
        return;
      }
      const fileExt = image.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      filePath = `imagenes/${fileName}`;
      // Subir imagen al bucket
      const { error: uploadError } = await supabase.storage.from('imagenes').upload(filePath, image);
      if (uploadError) {
        console.error('Error al subir imagen:', uploadError.message);
        setUploading(false);
        return;
      }
      setUploadedImagePath(filePath);
    }

    // Crear UUID para el id de la rifa
    const raffleId = uuidv4();

    const { error: insertError } = await supabase.from('rifas').insert({
      id: raffleId,
      titulo: title,
      descripcion: description,
      cantidad_boletos: parseInt(totalTickets),
      precio_boleto: parseFloat(precio_boleto),
      imagen: filePath,
      estado: status || 'activa', // Valor por defecto si no se pasa
      fecha_inicio: startDate || new Date().toISOString(),
      fecha_fin: endDate || endDate,
      sorteo_forzado: forceDraw,
      mostrar_vendidos: showSold,
      mostrar_boletos: showTickets,
      venden_todos_boletos: sellAllTickets,
      enlace_transmision: streamLink || '',
      creada_por: createdBy,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Error al insertar rifa:', insertError.message);
      toast({
        title: 'Error',
        description: 'No se pudo crear la rifa. Intenta nuevamente.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '¡Rifa creada!',
        description: 'La rifa se agregó correctamente.',
        variant: 'default',
      });
      // Limpiar imagen subida para la próxima rifa
      setUploadedImagePath(null);
      if (onSuccess) onSuccess();
    }
    setUploading(false);
  };

  return { handleSubmit, uploading };
}
