import { createClient } from '@/utils/supabase/client';

interface CreateBoletoYPagoParams {
  rifa_id: string;
  user_id?: string; // Opcional si tienes autenticación
  numeros_boletos: number[];
  nombres: string;
  numero: string;
  imagen_pago: File;
  monto: number;
  metodo: string;
}

export async function createBoletoYPago({
  rifa_id,
  numeros_boletos,
  nombres,
  numero,
  imagen_pago,
  monto,
  metodo,
}: CreateBoletoYPagoParams): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;

  try {
    // Subir imagen
    const filename = `${Date.now()}_${imagen_pago.name}`;
    const { error: uploadError } = await supabase.storage.from('imagenes').upload(`pagos/${filename}`, imagen_pago);

    if (uploadError) return { success: false, error: uploadError.message };

    const imagePath = `pagos/${filename}`;

    // Insertar boleto
    const { data: boletoData, error: boletoError } = await supabase
      .from('boletos')
      .insert([
        {
          rifa_id,
          user_id,
          pagado: false,
          numeros_boletos,
          created_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

    if (boletoError || !boletoData)
      return { success: false, error: boletoError?.message || 'No se pudo crear el boleto.' };

    // Insertar pago
    const { error: pagoError } = await supabase.from('pagos').insert([
      {
        user_id,
        boleto_id: boletoData.id,
        monto,
        metodo,
        estado: 'pendiente',
        created_at: new Date().toISOString(),
        nombres,
        numero,
        imagen: imagePath,
      },
    ]);

    if (pagoError) return { success: false, error: pagoError.message };

    return { success: true };
  } catch (err) {
    return { success: false, error: 'Ocurrió un error inesperado.' };
  }
}
