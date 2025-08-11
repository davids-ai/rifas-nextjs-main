'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { signup } from '@/app/signup/actions';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export function SignupForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!accepted) {
      toast({
        description: 'Debes aceptar la política de privacidad.',
        variant: 'destructive',
      });
      return;
    }
    signup({ email, password }).then((data: { error: boolean }) => {
      if (data?.error) {
        toast({
          description: 'Algo salió mal. Por favor intenta de nuevo.',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <div className="signup-columns-container">
      {/* Columna izquierda (visible solo en desktop) */}
      <div className="signup-left-column">
        <div className="signup-logo">
          <Link href="/">
            <Image
              src="/assets/icons/logo-white.svg"
              alt="AeroEdit"
              width={80}
              height={80}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="signup-info-text">
          Crea tu cuenta para empezar a participar en rifas y ganar premios increíbles. Solo toma un minuto.
        </div>
      </div>
      {/* Columna derecha */}
      <div className="signup-right-column">
        <div className="signup-header-mobile">
          <Link href="/">
            <button className="signup-back-btn" aria-label="Volver a inicio">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="#222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 12H5m7-7l-7 7 7 7"
                />
              </svg>
            </button>
          </Link>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="signup-title">Crea una cuenta</div>
          <div className="signup-inputs">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="signup-input"
              required
            />
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="signup-input"
                required
                style={{ paddingRight: '48px' }}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  height: '24px',
                  width: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="#98A2B3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z"
                    />
                    <circle cx="12" cy="12" r="3" stroke="#98A2B3" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="#98A2B3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z"
                    />
                    <circle cx="12" cy="12" r="3" stroke="#98A2B3" strokeWidth="2" />
                    <path
                      stroke="#98A2B3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 2l20 20"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="signup-checkbox-container">
            <input
              type="checkbox"
              id="privacy"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="signup-checkbox"
              required
            />
            <label htmlFor="privacy" className="signup-checkbox-label">
              He leído y acepto la{' '}
              <a href="/privacidad" target="_blank" className="signup-privacy-link">
                política de privacidad y protección de datos
              </a>
              .
            </label>
          </div>
          <Button type="submit" variant="default" className="signup-submit-btn">
            Registrarse
          </Button>
          <div className="signup-login-link-text signup-form-link">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="signup-login-link">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
