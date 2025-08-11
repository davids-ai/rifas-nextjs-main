'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface FormData {
  email: string;
  password: string;
}

export async function login(data: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Detectar usuario no verificado
    if (
      error.message.toLowerCase().includes('email not confirmed') ||
      error.message.toLowerCase().includes('email not confirmed') // por seguridad
    ) {
      return { error: 'no_verified' };
    }

    return { error: 'invalid_credentials' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}
