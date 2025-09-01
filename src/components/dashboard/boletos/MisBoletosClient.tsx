'use client';

import { useEffect, useState } from 'react';
import { useMisBoletos } from '@/hooks/UseMisBoletos';
import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { BoletoCard } from '@/components/dashboard/boletos/BoletoCard';
import { createClient } from '@/utils/supabase/client';

export default function MisBoletosClient() {
  const [cedula, setCedula] = useState<string>('');
  const [searchCedula, setSearchCedula] = useState<string | null>(null);
  const { boletos, loading } = useMisBoletos(searchCedula);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cedula.trim()) {
      setSearchCedula(cedula.trim());
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Consultar Boletos por Cédula'} />
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Ingrese su cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Consultar
        </button>
      </form>
      {searchCedula && loading ? (
        <p>Cargando boletos...</p>
      ) : searchCedula && boletos.length === 0 ? (
        <p>No se encontraron boletos para la cédula ingresada.</p>
      ) : searchCedula ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {boletos.map((boleto) => (
            <BoletoCard key={boleto.id} boleto={boleto} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
