import { RaffleForm } from '@/components/dashboard/agregar_rifa/agregarRifaForm';
import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { Suspense } from 'react';

export default function AgregarRifaPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 min-h-screen">
      <DashboardPageHeader pageTitle={'Crear Nueva Rifa'} />
      <Suspense fallback={<LoadingScreen />}>
        <RaffleForm />
      </Suspense>
    </main>
  );
}
