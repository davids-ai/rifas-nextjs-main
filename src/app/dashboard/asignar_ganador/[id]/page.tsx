import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { AsignarGanadorPage } from '@/components/dashboard/asignar_ganador/AsignarGanadorPage';

export default function PagosPage() {
  return (
    <main className="dashboard-main-content flex flex-col min-h-screen gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle="Comprobantes de Pago" />
      <AsignarGanadorPage />
    </main>
  );
}
