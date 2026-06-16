"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";
import ThemeToggle from "@/components/ThemeToggle";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const initialCode = searchParams.get("code") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Unable to verify email.");
        return;
      }

      setMessage("Email verified. Sign in to continue.");
      router.push(`/auth/signin?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4] dark:bg-[#081009] text-[#1C2B1F] dark:text-[#e2ede4] transition-colors duration-300">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        {/* Floating ThemeToggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="rounded-[32px] border border-[#D9DFC8] dark:border-emerald-900/40 bg-white dark:bg-[#121c15] p-10 shadow-lg transition-colors duration-300">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#00963F] dark:text-emerald-400 font-bold">
              Verify Email
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl text-[#1C2B1F] dark:text-[#e2ede4]">
              Confirm your account
            </h1>
            <p className="mt-3 text-base leading-7 text-[#4B5A44] dark:text-gray-400">
              Enter the verification code from your signup step to continue.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-emerald-400 font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] dark:text-[#e2ede4] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] focus:dark:ring-emerald-950/60"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-emerald-400 font-semibold">
                Verification code
              </span>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] dark:text-[#e2ede4] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] focus:dark:ring-emerald-950/60"
                placeholder="Enter code"
              />
            </label>

            {error ? <p className="text-sm text-destructive dark:text-red-400 font-semibold">{error}</p> : null}
            {message ? (
              <p className="text-sm text-[#00963F] dark:text-emerald-400 font-semibold">{message}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#00963E] dark:bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007d2d] dark:hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-6 border-t border-[#E7E9E2] dark:border-emerald-900/40 pt-6 text-sm text-[#4B5A44] dark:text-gray-400">
            <Link
              href="/auth/signin"
              className="font-semibold text-[#00963F] dark:text-emerald-400 hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F8F4] dark:bg-[#081009] flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-emerald-500"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
