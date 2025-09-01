import { RifaGallery } from '@/components/dashboard/rifas/RifaGallery';
import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';

export default function RifasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={null} />
      <main className="dashboard-main-content flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
        <DashboardPageHeader pageTitle={'Todas las Rifas'} />
        <RifaGallery />
      </main>
      <Footer />
    </div>
  );
}
