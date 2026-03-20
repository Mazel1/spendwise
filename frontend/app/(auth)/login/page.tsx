"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useFormError } from "@/hooks/useFormError";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";

export default function LoginPage() {
  const { login } = useAuth();
  const { error, handleError, clearError } = useFormError();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-bg flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / wordmark */}
        <div className="mb-12 animate-fade-up">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 mb-2">
            SpendWise
          </p>
          <h1
            className="text-4xl text-zinc-100 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome<br />
            <em>back.</em>
          </h1>
        </div>

        <AuthCard>
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">

            <div className="animate-fade-up animate-fade-up-delay-1">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="animate-fade-up animate-fade-up-delay-2">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="animate-fade-up rounded-none border border-red-800 bg-red-950/40 px-4 py-3">
                <p className="text-xs font-mono text-red-400">{error}</p>
              </div>
            )}

            <div className="animate-fade-up animate-fade-up-delay-3 pt-2">
              <Button type="submit" isLoading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>
        </AuthCard>

        {/* Footer link */}
        <p className="mt-8 text-center text-xs text-zinc-500 animate-fade-up animate-fade-up-delay-4">
          No account yet?{" "}
          <Link
            href="/register"
            className="text-amber-400 underline underline-offset-4 hover:text-amber-300 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
