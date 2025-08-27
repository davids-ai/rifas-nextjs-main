'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface FormData {
  email: string;
  password: string;
}

export async function signup(data: FormData) {
  const supabase = await createClient();
  const { error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (signUpError) {
    return { error: true, message: signUpError.message };
  }

  // Iniciar sesión automáticamente después de registrarse
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (signInError) {
    return { error: true, message: signInError.message };
  }

  // El frontend se encarga de redirigir al dashboard
  return { error: false };
}

export async function login(data: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: true, message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}
