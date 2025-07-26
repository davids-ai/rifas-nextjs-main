'use client';

import { useState } from 'react';
import { useCreateRaffle } from '@/hooks/useCreateRaffle';

export function RaffleForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: undefined as File | undefined,
    totalTickets: '',
    precio_boleto: '',
    endDate: '',
    startDate: '',
    forceDraw: false,
    showSold: false,
    sellAllTickets: false,
    showTickets: false,
    streamLink: '',
    status: 'activa',
  });

  const { handleSubmit, uploading } = useCreateRaffle(form);

  // Limpiar el formulario tras crear la rifa
  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      image: undefined,
      totalTickets: '',
      precio_boleto: '',
      endDate: '',
      startDate: '',
      forceDraw: false,
      showSold: false,
      sellAllTickets: false,
      showTickets: false,
      streamLink: '',
      status: 'activa',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files && files[0] : value,
    }));
  };

  return (
    <form
      onSubmit={async (e) => {
        await handleSubmit(e, resetForm);
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md text-black"
    >
      {/* Columna 1 */}
      <div className="space-y-6">
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="title">
            Título de la Rifa
          </label>
          <input
            id="title"
            name="title"
            placeholder="Ej: Rifa de Televisor"
            onChange={handleChange}
            required
            className="w-full border border-[#D1E9FF] rounded-md px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="description">
            Descripción del Premio
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe el premio aquí..."
            onChange={handleChange}
            required
            className="w-full border border-[#D1E9FF] rounded-md px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="precio_boleto">
            Precio por Boleto
          </label>
          <input
            id="precio_boleto"
            type="number"
            name="precio_boleto"
            placeholder="Ej: 10"
            onChange={handleChange}
            required
            className="w-full border border-[#D1E9FF] rounded-md px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="image">
            Imagen del Premio
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* Ícono de carga (SVG) */}
              <svg
                className="w-5 h-5 text-[#98A2B3]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </span>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full border border-[#D1E9FF] rounded-md pl-10 pr-3 py-2 placeholder-[#98A2B3] bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#D1E9FF] file:text-blue-700"
            />
          </div>
        </div>
      </div>

      {/* Columna 2 */}
      <div className="space-y-6">
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="totalTickets">
            Cantidad de Boletos
          </label>
          <input
            id="totalTickets"
            type="number"
            name="totalTickets"
            placeholder="Ej: 100"
            onChange={handleChange}
            required
            className="w-full border border-[#D1E9FF] rounded-md px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="endDate">
            Fecha del Sorteo
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            onChange={handleChange}
            required
            className="w-full border border-[#D1E9FF] rounded-md px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center text-[#000000] font-medium">
            <input type="checkbox" name="forceDraw" onChange={handleChange} className="mr-2 accent-blue-400" />
            ¿Se realiza el sorteo si no se venden todos los boletos?
          </label>
          <label className="flex items-center text-[#000000] font-medium">
            <input type="checkbox" name="showSold" onChange={handleChange} className="mr-2 accent-blue-400" />
            ¿Mostrar cantidad de boletos vendidos al público?
          </label>
        </div>
        <div>
          <label className="block text-[#000000] font-medium mb-1" htmlFor="streamLink">
            Redes / Transmisión
          </label>
          <input
            id="streamLink"
            name="streamLink"
            placeholder="Link de transmisión o redes sociales"
            onChange={handleChange}
            className="w-full border border-[#D1E9FF] rounded-md px-3 py-2 placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Botón en el pie, centrado en ambas columnas */}
      <div className="md:col-span-2 flex justify-center pt-4">
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-8 py-3 rounded-md font-semibold shadow hover:bg-blue-600 transition"
        >
          {uploading ? 'Agregando...' : 'Agregar nueva Rifa'}
        </button>
      </div>
    </form>
  );
}
