"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const initialToken = searchParams.get("token") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState(initialToken);
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
      const response = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Unable to reset password.");
        return;
      }

      setMessage("Password reset successfully. Sign in now.");
      router.push("/auth/signin");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F4] dark:bg-[#081009] text-[#1C2B1F] dark:text-[#e2ede4] transition-colors duration-300">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <div className="rounded-[32px] border border-[#D9DFC8] dark:border-emerald-900/40 bg-white dark:bg-[#121c15] p-10 shadow-lg transition-colors duration-300">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[#00963F] dark:text-emerald-455 font-bold">
              Reset Password
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl text-gray-900 dark:text-white">
              Choose a new password
            </h1>
            <p className="mt-3 text-base leading-7 text-[#4B5A44] dark:text-gray-400">
              Enter your registered email, the reset code, and a strong new
              password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-[#e2ede4]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] dark:focus:ring-emerald-800/20 text-gray-800 dark:text-[#e2ede4]"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-[#e2ede4]">
                Reset token
              </span>
              <input
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] dark:focus:ring-emerald-800/20 text-gray-800 dark:text-[#e2ede4]"
                placeholder="Enter reset token"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-[#e2ede4]">
                New password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] dark:focus:ring-emerald-800/20 text-gray-800 dark:text-[#e2ede4]"
                placeholder="New password"
              />
            </label>

            {error ? <p className="text-sm text-destructive dark:text-red-400 font-semibold">{error}</p> : null}
            {message ? (
              <p className="text-sm text-[#00963F] dark:text-emerald-455">{message}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#00963E] dark:bg-emerald-600 hover:bg-[#007d2d] dark:hover:bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#E7E9E2] dark:border-emerald-900/10 pt-6 text-sm text-[#4B5A44] dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-semibold text-[#00963F] dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </p>
            <Link
              href="/auth/forgot-password"
              className="font-semibold text-[#00963F] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F8F4] dark:bg-[#081009] flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-emerald-500"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
