'use client';

import { useEffect, useState } from 'react';
import { useMisBoletos } from '@/hooks/UseMisBoletos';
import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { LoadingScreen } from '@/components/dashboard/layout/loading-screen';
import { BoletoCard } from '@/components/dashboard/boletos/BoletoCard';
import { createClient } from '@/utils/supabase/client';

export default function MisBoletosClient() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
      setUserLoading(false);
    };
    fetchUser();
  }, []);

  const { boletos, loading } = useMisBoletos(userId);

  if (userLoading) return <LoadingScreen />;
  if (!userId) return <div>No user found.</div>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
      <DashboardPageHeader pageTitle={'Mis Boletos'} />
      {loading ? (
        <p>Cargando boletos...</p>
      ) : boletos.length === 0 ? (
        <p>No tienes boletos aún.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {boletos.map((boleto) => (
            <BoletoCard key={boleto.id} boleto={boleto} />
          ))}
        </div>
      )}
    </main>
  );
}
