import { LoginGradient } from '@/components/gradients/login-gradient';
import '../../styles/login.css';
import { SignupForm } from '@/components/authentication/sign-up-form';

export default function SignupPage() {
  return (
    <div className="signup-page-bg">
      <LoginGradient />
      <div className="signup-main-container">
        <SignupForm />
      </div>
    </div>
  );
}
