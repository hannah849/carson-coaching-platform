"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";
type State = "idle" | "submitting" | "error";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError("");

    const supabase = createClient();

    const { error: authError } =
      mode === "sign-in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setState("error");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex items-start justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <h1 className="font-serif text-4xl text-[var(--foreground)] mb-2">
            {mode === "sign-in" ? "Sign in" : "Create account"}
          </h1>
          <p className="text-sm text-[var(--foreground)] mb-10">
            {mode === "sign-in"
              ? "Access your purchased meditations and session packages."
              : "Create an account to access your purchases."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[var(--foreground)] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--heading)] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--foreground)] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--heading)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {state === "error" && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full py-3 bg-accent text-white text-base rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {state === "submitting"
                ? "Please wait…"
                : mode === "sign-in"
                ? "Sign in"
                : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--foreground)] text-center">
            {mode === "sign-in" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => { setMode("sign-up"); setError(""); }}
                  className="text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--muted)] transition-colors"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("sign-in"); setError(""); }}
                  className="text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--muted)] transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="mt-4 text-center">
            <Link
              href="/store"
              className="text-xs text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
            >
              Browse meditations without an account →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
