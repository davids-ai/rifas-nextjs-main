import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { Footer } from '@/components/home/footer/footer';
import { PagosGallery } from '@/components/dashboard/pagos/PagosGallery';

export default function RifasPage() {
  return (
    <main className="dashboard-main-content flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 min-h-screen">
      <DashboardPageHeader pageTitle={'Pagos de las Rifas'} />
      <PagosGallery />
    </main>
  );
}
