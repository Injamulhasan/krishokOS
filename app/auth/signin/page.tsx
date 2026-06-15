"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SigninPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.needsVerification) {
          router.push(
            `/auth/verify-email?email=${encodeURIComponent(identifier)}`,
          );
          return;
        }

        setError(result.error || "Invalid credentials.");
        return;
      }

      setMessage("Signed in successfully. Redirecting...");
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4] text-[#1C2B1F]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <div className="rounded-[32px] border border-[#D9DFC8] bg-white p-10 shadow-lg">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#00963F]">
              Sign In
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Access your account
            </h1>
            <p className="mt-3 text-base leading-7 text-[#4B5A44]">
              Sign in with your email or phone and continue to your dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F]">
                Email or phone
              </span>
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] bg-[#F8F8F4] px-4 py-3 outline-none focus:border-[#00963F] focus:ring-2 focus:ring-[#B4E6B8]"
                placeholder="you@example.com or 01XXXXXXXXX"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F]">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] bg-[#F8F8F4] px-4 py-3 outline-none focus:border-[#00963F] focus:ring-2 focus:ring-[#B4E6B8]"
                placeholder="Your password"
              />
            </label>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {message ? (
              <p className="text-sm text-[#00963F]">{message}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#00963E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007d2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#E7E9E2] pt-6 text-sm text-[#4B5A44] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Need a new account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-[#00963F] hover:underline"
              >
                Sign up
              </Link>
            </p>
            <Link
              href="/auth/forgot-password"
              className="font-semibold text-[#00963F] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
