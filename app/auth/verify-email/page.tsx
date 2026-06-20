"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  useEffect(() => {
    // Email verification is bypassed in NextAuth production setup; redirect directly
    router.replace(`/auth/signin?email=${encodeURIComponent(email)}`);
  }, [router, email]);

  return (
    <div className="min-h-screen bg-[#F8F8F4] dark:bg-[#081009] flex flex-col items-center justify-center text-[#1C2B1F] dark:text-[#e2ede4] transition-colors duration-300">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-emerald-500 mb-4"></div>
      <p className="text-sm font-medium">Bypassing email verification. Redirecting you to sign in...</p>
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
