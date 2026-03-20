"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useFormError } from "@/hooks/useFormError";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthCard from "@/components/ui/AuthCard";

export default function RegisterPage() {
  const { register } = useAuth();
  const { error, handleError, clearError } = useFormError();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setConfirmError("");

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, name, password);
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
            Start your<br />
            <em>journey.</em>
          </h1>
        </div>

        <AuthCard>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="animate-fade-up animate-fade-up-delay-1">
              <Input
                label="Full name"
                type="text"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="animate-fade-up animate-fade-up-delay-2">
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
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <div className="animate-fade-up animate-fade-up-delay-3">
              <Input
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                error={confirmError}
              />
            </div>

            {error && (
              <div className="animate-fade-up rounded-none border border-red-800 bg-red-950/40 px-4 py-3">
                <p className="text-xs font-mono text-red-400">{error}</p>
              </div>
            )}

            <div className="animate-fade-up animate-fade-up-delay-4 pt-2">
              <Button type="submit" isLoading={isLoading}>
                Create account
              </Button>
            </div>
          </form>
        </AuthCard>

        {/* Footer link */}
        <p className="mt-8 text-center text-xs text-zinc-500 animate-fade-up animate-fade-up-delay-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-amber-400 underline underline-offset-4 hover:text-amber-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
