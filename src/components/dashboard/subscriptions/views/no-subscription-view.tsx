import { DashboardPageHeader } from '@/components/dashboard/layout/dashboard-page-header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NoSubscriptionView() {
  return (
    <>
      <DashboardPageHeader pageTitle={'Mis Rifas'} />
    </>
  );
}
