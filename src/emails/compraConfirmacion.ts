interface CompraConfirmacionParams {
  nombre: string;
  boletos: number[];
  metodoPago: string;
}

export function compraConfirmacionEmail({ nombre, boletos, metodoPago }: CompraConfirmacionParams) {
  return {
    subject: '🎟️ Confirmación de tu compra en RIFAS',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fefefe; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <h2 style="color: #2c3e50;">¡Gracias por tu compra, ${nombre}!</h2>
        <p style="font-size: 16px; color: #333;">
          Hemos registrado con éxito tu participación en la rifa.
        </p>
        
        <h3 style="color: #4CAF50;">Detalles de tu compra:</h3>
        <ul style="font-size: 15px; color: #444;">
          <li><strong>Boletos adquiridos:</strong> ${boletos.join(', ')}</li>
          <li><strong>Método de pago:</strong> ${metodoPago}</li>
        </ul>

        <p style="margin-top: 20px; font-size: 15px; color: #555;">
          Conserva este correo como comprobante de tu compra. Te notificaremos por este medio si resultas ganador.
        </p>

        <p style="font-size: 14px; color: #888; margin-top: 30px;">
          Si tienes alguna duda, no dudes en responder este mensaje.
        </p>

        <hr style="margin: 40px 0;" />
        <p style="text-align: center; font-size: 12px; color: #aaa;">
          © 2025 RIFAS · Todos los derechos reservados.
        </p>
      </div>
    `
  };
}
