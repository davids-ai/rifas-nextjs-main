'use client';

import { Album, CreditCard, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Mis Boletos',
    icon: <Home className="h-5 w-5" />,
    href: '/dashboard',
  },
  {
    title: 'Mis Rifas',
    icon: <Album className="h-5 w-5" />,
    href: '/dashboard/subscriptions',
  },
  {
    title: 'Agregar Rifa',
    icon: <CreditCard className="h-5 w-5" />,
    href: '/dashboard/payments',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-6 items-center">
      {sidebarItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            'flex items-center gap-2 px-2 py-1 text-sm font-medium hover:text-blue-300 transition',
            {
              'text-blue-300 font-semibold':
                item.href === '/dashboard' ? pathname === item.href : pathname.includes(item.href),
              'text-white': pathname !== item.href,
            }
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}