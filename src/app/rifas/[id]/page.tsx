import { RifaDetail } from '@/components/dashboard/rifas/RifaDetail';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';

export default function RifaDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={null} />
      <main className="dashboard-main-content flex flex-col flex-1 p-6">
        <RifaDetail />
      </main>
      <Footer />
    </div>
  );
}
