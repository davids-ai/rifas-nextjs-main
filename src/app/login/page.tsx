import { LoginGradient } from '@/components/gradients/login-gradient';
import '../../styles/login.css';
import { LoginCardGradient } from '@/components/gradients/login-card-gradient';
import { LoginForm } from '@/components/authentication/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-blue-600 relative">
      <LoginGradient />
      <div className="flex flex-col">
        <div
          className="mx-auto mt-[112px] bg-blue-600/90 w-[343px] md:w-[488px] gap-5 flex-col 
          rounded-lg rounded-b-none backdrop-blur-[6px] border border-white/20 shadow-lg"
        >
          <LoginCardGradient />
          <LoginForm />
        </div>
        <div
          className="mx-auto w-[343px] md:w-[488px] bg-blue-600/90 backdrop-blur-[6px] 
          px-6 md:px-16 pt-0 py-8 gap-6 flex flex-col items-center justify-center rounded-b-lg 
          border border-t-0 border-white/20 shadow-lg"
        >
          <div className="text-center text-white text-sm mt-4 font-medium">
            ¿No tienes una cuenta?{' '}
            <a href="/signup" className="underline hover:text-blue-200 transition">
              Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
