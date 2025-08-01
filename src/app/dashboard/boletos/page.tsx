import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { Suspense } from 'react';
import MisBoletosClient from '@/components/dashboard/boletos/MisBoletosClient';

export default function MisBoletosPage() {
  return (
    <main className="dashboard-main-content flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 min-h-screen">
      <Suspense fallback={<LoadingScreen />}>
        <MisBoletosClient />
      </Suspense>
    </main>
  );
}
