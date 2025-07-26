import { RifaGallery } from '@/components/dashboard/rifas/RifaGallery';
import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';

export default function RifasPage() {
  return (
    <main className="dashboard-main-content flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 min-h-screen">
      <DashboardPageHeader pageTitle={'Todas las Rifas'} />
      <RifaGallery />
    </main>
  );
}
