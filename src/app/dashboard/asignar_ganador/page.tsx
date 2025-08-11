import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { PagosGallery } from '@/components/dashboard/asignar_ganador/RifasGallery';

export default function RifasPage() {
  return (
    <main className="dashboard-main-content flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 min-h-screen">
      <DashboardPageHeader pageTitle={'Asignar ganador de Rifa'} />
      <PagosGallery />
    </main>
  );
}
