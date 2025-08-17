'use client';

import { useState } from 'react';
import { createBoletoYPago } from '@/hooks/useCreateBoletoYPago';
import { useBoletosOcupados } from '@/hooks/useBoletosOcupados';
import { toast } from '@/components/ui/use-toast';
import { compraConfirmacionEmail } from '@/emails/compraConfirmacion';

const paymentMethods = [
  {
    name: 'Nequi',
    accountNumber: '3001234567',
    accountHolder: 'Juan Pérez',
    logo: '/assets/icons/logo/nequi.png',
  },
  {
    name: 'Daviplata',
    accountNumber: '3209876543',
    accountHolder: 'María Gómez',
    logo: '/assets/icons/logo/daviplata.png',
  },
];

interface BoletoFormProps {
  rifaId: string;
  cantidadBoletos: number;
  valorBoleto: number;
  userId?: string; // Si tienes autenticación, pásalo como prop
}

export function BoletoForm({ rifaId, cantidadBoletos, valorBoleto, userId }: BoletoFormProps) {
  const { ocupados, loading: loadingOcupados } = useBoletosOcupados(rifaId);
  const [cantidad, setCantidad] = useState(1);
  const [selectedBoletos, setSelectedBoletos] = useState<string[]>([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [metodoPago, setMetodoPago] = useState(paymentMethods[0].name);
  const [imagenPago, setImagenPago] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  // Genera los boletos con ceros a la izquierda según la cantidad total
  const numDigits = cantidadBoletos.toString().length;
  const boletosDisponibles = Array.from({ length: cantidadBoletos }, (_, i) =>
    (i + 1).toString().padStart(numDigits, '0'),
  );

  const handleToggleBoleto = (num: string) => {
    if (selectedBoletos.includes(num)) {
      setSelectedBoletos(selectedBoletos.filter((n) => n !== num));
    } else if (selectedBoletos.length < cantidad) {
      setSelectedBoletos([...selectedBoletos, num]);
    }
  };

  const handleCantidadChange = (delta: number) => {
    let nuevaCantidad = cantidad + delta;
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    if (nuevaCantidad > 10) nuevaCantidad = 10; // Limita a 10 por ejemplo
    setCantidad(nuevaCantidad);
    setSelectedBoletos([]);
  };

  const selectedMethod = paymentMethods.find((m) => m.name === metodoPago);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    if (selectedBoletos.length !== cantidad || !nombre || !telefono || !imagenPago) {
      setMensaje('Por favor completa todos los campos y selecciona los boletos.');
      return;
    }
    setCargando(true);

    // Llama al hook para guardar en Supabase
    const result = await createBoletoYPago({
      rifa_id: rifaId,
      user_id: userId,
      numeros_boletos: selectedBoletos.map((n) => Number(n)),
      nombres: nombre,
      numero: telefono,
      imagen_pago: imagenPago,
      monto: cantidad * 1, // Ajusta el precio si tienes el valor por boleto
      metodo: metodoPago,
    });

    if (result.success) {
      // Enviar correo de confirmación usando estructura externa
      try {
        const { subject, html } = compraConfirmacionEmail({
          nombre,
          boletos: selectedBoletos.map((n) => Number(n)),
          metodoPago,
        });
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: telefono.includes('@') ? telefono : 'dsrojaslop@gmail.com', // fallback si no es email
            subject,
            html,
          }),
        });
      } catch (e) {
        // No interrumpe el flujo si falla el correo
      }
      setMensaje('¡Participación registrada con éxito!');
      toast({
        title: '¡Compra exitosa!',
        description: `Tus boletos: ${selectedBoletos.join(', ')}`,
      });
      setSelectedBoletos([]);
      setNombre('');
      setTelefono('');
      setImagenPago(null);
      setCantidad(1);
    } else {
      setMensaje(result.error || 'Ocurrió un error al registrar la participación.');
      toast({
        title: 'Error',
        description: result.error || 'Ocurrió un error al registrar la participación.',
      });
    }
    setCargando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-8">
      {/* 1. Selección de Boletos */}
      <section>
        <h2 className="text-lg font-semibold mb-2">1. Selección de Boletos</h2>
        <div className="flex items-center gap-2 mb-4">
          <button type="button" onClick={() => handleCantidadChange(-1)} className="px-2 py-1 bg-gray-200 rounded">
            -
          </button>
          <span className="font-bold">{cantidad}</span>
          <button type="button" onClick={() => handleCantidadChange(1)} className="px-2 py-1 bg-gray-200 rounded">
            +
          </button>
          <span className="ml-2 text-sm text-gray-500">Cantidad de boletos</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2">
          {boletosDisponibles.map((num) => {
            // Convertir ocupados a string con ceros a la izquierda para comparar correctamente
            const ocupado = ocupados.map((n) => n.toString().padStart(numDigits, '0')).includes(num);
            return (
              <button
                key={num}
                type="button"
                className={`border rounded px-2 py-1 text-sm ${ocupado ? 'bg-gray-400 text-white cursor-not-allowed' : selectedBoletos.includes(num) ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                onClick={() => !ocupado && handleToggleBoleto(num)}
                disabled={ocupado || (selectedBoletos.length >= cantidad && !selectedBoletos.includes(num))}
              >
                {num}
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-sm">
          <strong>Seleccionados:</strong> {selectedBoletos.join(', ') || 'Ninguno'}
        </div>
        <div className="mt-2 text-base font-semibold text-blue-700">
          <strong>Total a pagar:</strong> ${cantidad * valorBoleto}
        </div>
      </section>

      {/* 2. Datos Personales */}
      <section>
        <h2 className="text-lg font-semibold mb-2">2. Datos Personales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-black text-sm font-medium">Nombres y Apellidos</label>
            <input
              type="text"
              placeholder="Nombres y Apellidos"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-[#D1E9FF] rounded-lg px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-black text-sm font-medium">Teléfono</label>
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="border border-[#D1E9FF] rounded-lg px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </section>

      {/* 3. Métodos de Pago */}
      <section>
        <h2 className="text-lg font-semibold mb-2">3. Método de Pago</h2>
        <div className="flex gap-4 mb-2">
          {paymentMethods.map((method) => (
            <button
              key={method.name}
              type="button"
              className={`flex items-center gap-2 border border-[#D1E9FF] px-4 py-2 rounded-lg transition-colors duration-150 ${metodoPago === method.name ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setMetodoPago(method.name)}
            >
              <img src={method.logo} alt={method.name} className="w-7 h-7 object-contain" />
              <span>{method.name}</span>
            </button>
          ))}
        </div>
        {selectedMethod && (
          <div className="text-sm bg-gray-50 rounded p-2">
            <div>
              <strong>Número:</strong> {selectedMethod.accountNumber}
            </div>
            <div>
              <strong>Titular:</strong> {selectedMethod.accountHolder}
            </div>
          </div>
        )}
      </section>

      {/* 4. Comprobante de Pago */}
      <section>
        <h2 className="text-lg font-semibold mb-2">4. Comprobante de Pago</h2>
        <label className="relative w-full flex flex-col items-center justify-center cursor-pointer">
          <span className="text-black text-sm font-medium mb-1">Subir comprobante</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagenPago(e.target.files?.[0] || null)}
            className="border border-[#D1E9FF] rounded-lg px-3 py-2 w-full placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200 file:hidden"
            style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
          />
          <div className="flex items-center justify-center w-full h-12 border border-dashed border-[#D1E9FF] rounded-lg bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#98A2B3"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-8m0 0l-3 3m3-3l3 3m-9 4v4a2 2 0 002 2h10a2 2 0 002-2v-4M7 16h10"
              />
            </svg>
            <span className="text-[#98A2B3]">{imagenPago ? imagenPago.name : 'Selecciona o arrastra un archivo'}</span>
          </div>
        </label>
      </section>

      {/* 5. Confirmación */}
      <section>
        <p className="text-xs text-gray-600 mb-4">
          Al confirmar, autorizo el uso de mis datos personales conforme a la Ley de Protección de Datos.
        </p>
        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
        >
          {cargando ? 'Enviando...' : 'Confirmar participación'}
        </button>
        {mensaje && <p className="mt-2 text-center text-green-600">{mensaje}</p>}
      </section>
    </form>
  );
}
