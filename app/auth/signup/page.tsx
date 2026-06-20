"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Unable to create account.");
        return;
      }

      setMessage("Account created successfully! Logging you in...");

      // Automatically sign in the user
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: email.toLowerCase(),
        password,
      });

      if (signInResult?.error) {
        // Fallback to signin page with pre-filled email if auto-signin fails
        router.push(`/auth/signin?email=${encodeURIComponent(email)}`);
      } else {
        router.push("/dashboard");
      }
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
              Sign Up
            </p>
            <h1 className="mt-4 text-3xl font-black sm:text-4xl text-gray-900 dark:text-white">
              Create your account
            </h1>
            <p className="mt-3 text-base leading-7 text-[#4B5A44] dark:text-gray-400">
              Use email or phone to join and get access to your dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-[#e2ede4]">
                Full name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] dark:focus:ring-emerald-800/20 text-gray-800 dark:text-[#e2ede4]"
                placeholder="Your full name"
              />
            </label>
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
                Phone (optional)
              </span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] dark:focus:ring-emerald-800/20 text-gray-800 dark:text-[#e2ede4]"
                placeholder="01XXXXXXXXX"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-[#1C2B1F] dark:text-[#e2ede4]">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-[#D7D7D7] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#081009] px-4 py-3 outline-none focus:border-[#00963F] dark:focus:border-emerald-500 focus:ring-2 focus:ring-[#B4E6B8] dark:focus:ring-emerald-800/20 text-gray-800 dark:text-[#e2ede4]"
                placeholder="At least 8 characters"
              />
            </label>

            {error ? <p className="text-sm text-destructive dark:text-red-400 font-semibold">{error}</p> : null}
            {message ? (
              <p className="text-sm text-[#00963F] dark:text-[#00963F]">{message}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#00963E] dark:bg-emerald-600 hover:bg-[#007d2d] dark:hover:bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 border-t border-[#E7E9E2] dark:border-emerald-900/10 pt-6 text-sm text-[#4B5A44] dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-[#00963F] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
