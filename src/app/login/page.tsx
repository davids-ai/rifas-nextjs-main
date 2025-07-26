import '../../styles/login.css';
import { LoginForm } from '@/components/authentication/login-form';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen h-screen w-screen bg-[#1570EF] flex items-center justify-center overflow-hidden relative"
      style={{ minHeight: '100vh', height: '100vh', width: '100vw' }}
    >
      <LoginForm />
    </div>
  );
}
