import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { Suspense } from 'react';
import MisBoletosClient from '@/components/dashboard/boletos/MisBoletosClient';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';

export default function MisBoletosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={null} />
      <main className="dashboard-main-content flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
        <Suspense fallback={<LoadingScreen />}>
          <MisBoletosClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
