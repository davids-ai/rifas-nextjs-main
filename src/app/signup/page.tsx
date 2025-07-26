import { LoginGradient } from '@/components/gradients/login-gradient';
import '../../styles/login.css';
import { LoginCardGradient } from '@/components/gradients/login-card-gradient';
import { SignupForm } from '@/components/authentication/sign-up-form';

export default function SignupPage() {
  return (
    <div className="signup-page-bg">
      <LoginGradient />
      <div className="signup-main-container">
        <SignupForm />
      </div>
      <div className="signup-login-link-container">
        <div className="signup-login-link-text">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="signup-login-link">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
