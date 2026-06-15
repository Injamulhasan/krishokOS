"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";

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
    <div className="min-h-screen bg-[#F8F8F4] text-[#1C2B1F]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <div className="rounded-[32px] border border-[#D9DFC8] bg-white p-10 shadow-lg">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#00963F]">
              Verify Email
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              Confirm your account
            </h1>
            <p className="mt-3 text-base leading-7 text-[#4B5A44]">
              Enter the verification code from your signup step to continue.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] bg-[#F8F8F4] px-4 py-3 outline-none focus:border-[#00963F] focus:ring-2 focus:ring-[#B4E6B8]"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F]">
                Verification code
              </span>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] bg-[#F8F8F4] px-4 py-3 outline-none focus:border-[#00963F] focus:ring-2 focus:ring-[#B4E6B8]"
                placeholder="Enter code"
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
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="mt-6 border-t border-[#E7E9E2] pt-6 text-sm text-[#4B5A44]">
            <Link
              href="/auth/signin"
              className="font-semibold text-[#00963F] hover:underline"
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
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
