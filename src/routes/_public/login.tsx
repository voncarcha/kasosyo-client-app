import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const Route = createFileRoute('/_public/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <LoginForm />
    </div>
  );
}
