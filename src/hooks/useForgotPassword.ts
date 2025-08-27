import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendResetEmail = async (email: string) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError('Hubo un error. Intenta de nuevo.');
      } else {
        setMessage('Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.');
      }
    } catch (err) {
      setError('Hubo un error inesperado.');
    }
    setLoading(false);
  };

  return { sendResetEmail, loading, message, error };
}
