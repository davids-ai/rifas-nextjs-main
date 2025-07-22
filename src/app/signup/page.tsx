import { LoginGradient } from '@/components/gradients/login-gradient';
import '../../styles/login.css';
import { LoginCardGradient } from '@/components/gradients/login-card-gradient';
import { SignupForm } from '@/components/authentication/sign-up-form';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#007DFA] relative">
      <LoginGradient />

      <div className="flex flex-col items-center pt-[112px]">
        <div
          className="mx-auto bg-white/80 w-[343px] md:w-[488px] gap-5 flex-col rounded-lg rounded-b-none 
            login-card-border backdrop-blur-[6px]"
        >
          <LoginCardGradient />
          <SignupForm />
        </div>

        <div
          className="mx-auto w-[343px] md:w-[488px] bg-white/80 backdrop-blur-[6px] px-6 md:px-16 pt-0 py-8 
            gap-6 flex flex-col items-center justify-center rounded-b-lg"
        >
          <div className="text-center text-muted-foreground text-sm mt-4 font-medium">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-primary underline">
              Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
