'use client';

import { Album, CreditCard, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUserInfo } from '@/hooks/useUserRole';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export function Sidebar() {
  const { role, loading } = useUserInfo(supabase);
  const pathname = usePathname();

  if (loading) return null;

  // Declarar todos los ítems primero
  const baseItems = [
    {
      title: 'Tablero Informativo',
      icon: <Home className="h-5 w-5" />,
      href: '/dashboard',
    },
    {
      title: 'Mis Boletos',
      icon: <Album className="h-5 w-5" />,
      href: '/dashboard/boletos',
    },
    {
      title: 'Rifas',
      icon: <Album className="h-5 w-5" />,
      href: '/dashboard/rifas',
    },
  ];

  const adminItems = [
    {
      title: 'Agregar Rifa',
      icon: <CreditCard className="h-5 w-5" />,
      href: '/dashboard/agregar_rifa',
    },
    {
      title: 'Pagos',
      icon: <CreditCard className="h-5 w-5" />,
      href: '/dashboard/pagos',
    },
  ];

  const sidebarItems = [...baseItems, ...(role === 'admin' ? adminItems : [])];
  return (
    <nav className="flex gap-6 items-center">
      {sidebarItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn('flex items-center gap-2 px-2 py-1 text-sm font-medium hover:text-blue-300 transition', {
            'text-blue-300 font-semibold':
              item.href === '/dashboard' ? pathname === item.href : pathname.includes(item.href),
            'text-white': pathname !== item.href,
          })}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
