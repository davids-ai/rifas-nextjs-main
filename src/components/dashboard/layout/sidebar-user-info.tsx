'use client';

import { Separator } from '@/components/ui/separator';
import { LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { MouseEvent } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';

export function SidebarUserInfo() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  async function handleLogout(e: MouseEvent) {
    e.preventDefault();
    await supabase.auth.signOut();
    location.reload();
  }

  return (
    <div className={'flex flex-col items-start pb-8 px-2 text-sm font-medium lg:px-4'}>
      <div className={'flex w-full flex-row mt-6 items-center justify-between'}>
          <div className={'text-sm leading-5 text-muted-foreground w-full overflow-hidden text-ellipsis'}>
            {user?.email}
        </div>
        <div>
          <LogOut onClick={handleLogout} className={'h-6 w-6 text-muted-foreground cursor-pointer'} />
        </div>
      </div>
    </div>
  );
}
