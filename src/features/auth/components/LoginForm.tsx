import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { UserIcon, LockIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "../store/auth-store";
import { LoginTransition } from "./LoginTransition";

export function LoginForm() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { login, loginStep } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      addToast("error", "Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate({ to: "/home" });
      } else {
        addToast("error", "Invalid credentials");
      }
    } catch {
      addToast("error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loginStep !== "idle" && loginStep !== "success") {
    return <LoginTransition step={loginStep} />;
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Kasosyo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium text-foreground"
          >
            Username
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            leftIcon={<UserIcon className="h-4 w-4" />}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<LockIcon className="h-4 w-4" />}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
